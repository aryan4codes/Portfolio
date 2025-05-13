import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const nodemailer = (await import('nodemailer')).default;
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { name, email, message } = req.body;

  // Basic server-side validation
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Name, email, and message are required.' });
  }
  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
    return res.status(400).json({ success: false, error: 'Invalid data types for fields.' });
  }
  if (!email.includes('@')) { // Simple email format check
    return res.status(400).json({ success: false, error: 'Invalid email format.' });
  }

  // Ensure environment variables are loaded
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.EMAIL_HOST_USER;
  const smtpPass = process.env.EMAIL_PASSWORD;
  const emailToReceive = process.env.EMAIL_TO;

  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass || !emailToReceive) {
    return res.status(500).json({ success: false, error: 'Server configuration error. Email environment variables missing.' });
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: Number(smtpPort),
    secure: Number(smtpPort) === 465, 
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },

  });

  const mailOptions = {
    from: `"${name} - Portfolio Contact" <${smtpUser}>`,
    
    to: emailToReceive,
    
    // User's email, so you can reply directly to them
    replyTo: email,
    
    subject: `New Portfolio Contact Form Submission from ${name}`,
    
    text: `
      You have a new message from your portfolio website:

      Name: ${name}
      Email: ${email}
      Message:
      ${message}
    `,
    
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
        <h2 style="color: #333; border-bottom: 1px solid #eaeaea; padding-bottom: 10px;">New Contact Form Submission</h2>
        
        <div style="margin: 20px 0;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #0070f3; text-decoration: none;">${email}</a></p>
          
          <div style="margin-top: 20px;">
            <p><strong>Message:</strong></p>
            <p style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; white-space: pre-line;">${message.replace(/\n/g, '<br>')}</p>
          </div>
        </div>
        
        <p style="font-size: 12px; color: #666; margin-top: 30px; text-align: center;">
          This message was sent from your portfolio contact form.
        </p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: 'Email sent successfully!' });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error sending email:', error);
    return res.status(500).json({ success: false, error: 'Failed to send message. Please try again later.', details: error.message });
  }
}