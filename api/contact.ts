import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Import nodemailer using ES Module dynamic import
  const nodemailer = await import('nodemailer');
  
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

  // Create transporter using the proper nodemailer import
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: Number(smtpPort),
    secure: Number(smtpPort) === 465, 
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  // Email to you (the recipient)
  const mailOptions = {
    from: `"${name} - Portfolio Contact" <${smtpUser}>`,
    to: emailToReceive,
    replyTo: email,
    subject: `🚀 New Portfolio Inquiry from ${name}`,
    text: `
      You have a new message from your portfolio website:

      Name: ${name}
      Email: ${email}
      Message:
      ${message}

      ---
      Sent from your portfolio contact form
    `,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>New Portfolio Inquiry</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">🚀 New Portfolio Inquiry</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Someone wants to connect with you!</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <div style="margin-bottom: 25px;">
              <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea;">
                <h3 style="color: #334155; margin: 0 0 15px 0; font-size: 18px;">Contact Details</h3>
                <p style="margin: 8px 0; color: #475569;"><strong style="color: #1e293b;">Name:</strong> ${name}</p>
                <p style="margin: 8px 0; color: #475569;"><strong style="color: #1e293b;">Email:</strong> <a href="mailto:${email}" style="color: #667eea; text-decoration: none; font-weight: 500;">${email}</a></p>
              </div>
            </div>
            
            <div style="margin-bottom: 25px;">
              <h3 style="color: #334155; margin: 0 0 15px 0; font-size: 18px;">Message</h3>
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
                <p style="color: #475569; line-height: 1.6; margin: 0; white-space: pre-line;">${message}</p>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="mailto:${email}?subject=Re: Your Portfolio Inquiry" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">Reply to ${name}</a>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px;">
            <p style="color: #64748b; font-size: 14px; margin: 0;">
              This message was sent from your portfolio contact form<br>
              <span style="color: #94a3b8;">Timestamp: ${new Date().toLocaleString()}</span>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  // Auto-reply email to the sender
  const autoReplyOptions = {
    from: `"Aryan Rajpurkar" <${smtpUser}>`,
    to: email,
    subject: `✅ Thanks for reaching out, ${name}!`,
    text: `
      Hi ${name},

      Thank you for reaching out through my portfolio! I've received your message and will get back to you as soon as possible.

      Your message:
      "${message}"

      I typically respond within 24-48 hours. Looking forward to connecting with you!

      Best regards,
      Aryan Rajpurkar
      
      ---
      This is an automated response. Please do not reply to this email.
    `,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Thanks for reaching out!</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">✅ Message Received!</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Thanks for reaching out, ${name}!</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
              Hi <strong>${name}</strong>,
            </p>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
              Thank you for reaching out through my portfolio! I've received your message and will get back to you as soon as possible.
            </p>
            
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin: 20px 0;">
              <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0; font-weight: 600;">Your message:</p>
              <p style="color: #374151; margin: 0; font-style: italic; line-height: 1.5;">"${message}"</p>
            </div>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 20px 0;">
              I typically respond within <strong>24-48 hours</strong>. Looking forward to connecting with you!
            </p>
            
            <div style="margin: 30px 0; padding: 20px; background: #f0f9ff; border-radius: 8px; text-align: center;">
              <p style="color: #0369a1; margin: 0; font-size: 14px;">
                📧 <strong>av.rajpurkar@gmail.com</strong><br>
                🔗 <a href="https://linkedin.com/in/aryan-rajpurkar" style="color: #0369a1; text-decoration: none;">LinkedIn</a> | 
                <a href="https://github.com/aryan4codes" style="color: #0369a1; text-decoration: none;">GitHub</a>
              </p>
            </div>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 20px 0 0 0;">
              Best regards,<br>
              <strong style="color: #10b981;">Aryan Rajpurkar</strong>
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              This is an automated response. Please do not reply to this email.<br>
              <span style="color: #d1d5db;">Sent on ${new Date().toLocaleString()}</span>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    // Send the inquiry email to you
    await transporter.sendMail(mailOptions);
    
    // Send auto-reply confirmation to the sender
    await transporter.sendMail(autoReplyOptions);
    
    return res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully! You will receive a confirmation email shortly.' 
    });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to send message. Please try again later.', 
      details: error.message 
    });
  }
}