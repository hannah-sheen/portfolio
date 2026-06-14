import nodemailer from 'nodemailer';

// Create a singleton transporter instance using your .md file's logic
export const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT || 587),
  // Secure is true ONLY if you are using port 465
  secure: process.env.MAIL_PORT === '465', 
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// Optional: Light verification check in terminal during local development
if (process.env.NODE_ENV === 'development') {
  transporter.verify((err) => {
    if (err) console.error('🚫 Mail server connection failed:', err);
    else console.log('✅ Mail server is ready to dispatch messages');
  });
}