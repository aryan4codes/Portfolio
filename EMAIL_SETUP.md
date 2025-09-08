# Email System Setup Guide

This portfolio includes a complete email system using Nodemailer that handles contact form submissions with professional email templates and auto-replies.

## Features

✅ **Professional Email Templates** - Beautiful HTML emails with responsive design  
✅ **Auto-Reply System** - Users receive instant confirmation emails  
✅ **Enhanced Validation** - Client and server-side form validation  
✅ **Loading States** - Smooth UX with loading animations  
✅ **Error Handling** - Comprehensive error messages and fallbacks  
✅ **Mobile Responsive** - Works perfectly on all devices  

## Setup Instructions

### 1. Environment Variables

Copy the example environment file and configure your email settings:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your email configuration:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_TO=av.rajpurkar@gmail.com
```

### 2. Gmail Setup (Recommended)

For Gmail, you need to use an **App Password** instead of your regular password:

1. Enable 2-Factor Authentication on your Google Account
2. Go to [Google Account Security](https://myaccount.google.com/security)
3. Under "2-Step Verification", click on "App passwords"
4. Generate a new app password for "Mail"
5. Use this 16-character password in `EMAIL_PASSWORD`

### 3. Alternative Email Providers

#### Outlook/Hotmail
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
```

#### Yahoo Mail
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
```

#### Custom Domain
```env
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=587
```

### 4. Deployment

For Vercel deployment, add environment variables in your project settings:

1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add each environment variable from your `.env.local` file

### 5. Testing

Test the contact form by:

1. Running your development server: `npm run dev`
2. Navigate to the contact section
3. Fill out and submit the form
4. Check both your inbox and the sender's email for confirmation

## Email Templates

The system includes two email templates:

### 1. Inquiry Email (sent to you)
- Professional design with gradient headers
- Contact details prominently displayed
- Message content in a readable format
- Direct reply button
- Timestamp for tracking

### 2. Auto-Reply Email (sent to sender)
- Friendly confirmation message
- Includes their original message
- Response time expectations
- Your contact information
- Professional signature

## API Endpoint

The contact form uses `/api/contact` endpoint which:

- Validates form data server-side
- Sends inquiry email to you
- Sends auto-reply to the user
- Returns appropriate success/error responses
- Includes comprehensive error logging

## Security Features

- Server-side validation
- Email format verification
- Message length requirements
- Error handling without exposing sensitive data
- Environment variable protection

## Troubleshooting

### Common Issues

1. **"Authentication failed"**
   - Check if you're using an App Password (not regular password)
   - Verify 2FA is enabled for Gmail

2. **"Connection refused"**
   - Verify SMTP host and port settings
   - Check firewall/network restrictions

3. **"Email not received"**
   - Check spam/junk folders
   - Verify EMAIL_TO address is correct
   - Check email provider limits

### Debug Mode

Add console logging to the API endpoint for debugging:

```javascript
console.log('SMTP Config:', {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  user: process.env.EMAIL_HOST_USER ? 'Set' : 'Not set'
});
```

## Support

If you encounter any issues:

1. Check the browser console for client-side errors
2. Check server logs for API errors
3. Verify all environment variables are set
4. Test with a simple email client first

For additional support, feel free to reach out at av.rajpurkar@gmail.com