// import 'dotenv/config'; // Automatically loads your .env variables
// import express from 'express';
// import cors from 'cors';
// import nodemailer from 'nodemailer'; 

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Reusable Transporter from your nodemailer-setup.md
// const transporter = nodemailer.createTransport({
//   host: process.env.MAIL_HOST,
//   port: Number(process.env.MAIL_PORT),
//   secure: process.env.MAIL_PORT === '465',
//   auth: {
//     user: process.env.MAIL_USER,
//     pass: process.env.MAIL_PASS,
//   },
// });

// // Verify mail server connection on startup
// transporter.verify((err) => {
//   if (err) console.error('Mail server connection failed:', err);
//   else console.log('Mail server ready to send emails');
// });

// // The API endpoint your Vite contact form will send data to
// app.post('/api/contact', async (req, res) => {
//   try {
//     const { email, subject, message } = req.body;

//     if (!email || !subject || !message) {
//       return res.status(400).json({ error: 'Missing required fields.' });
//     }

//     await transporter.sendMail({
//       from: process.env.MAIL_FROM,
//       to: process.env.MAIL_USER, 
//       replyTo: email,            
//       subject: subject, 
//       html: `
//         <div style="background-color: #030712; padding: 60px 40px; font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; min-height: 100vh; width: 100%; box-sizing: border-box; margin: 0;">
//           <div style="width: 100%; margin: 0 auto;">
            
//             <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 70px;">
//               <tr>
//                 <td style="font-size: 13px; font-weight: 500; color: #818cf8; letter-spacing: 4px; font-family: 'Manrope', sans-serif; text-transform: uppercase; padding-bottom: 20px;">
//                   Message
//                 </td>
//                 <td align="right" style="font-size: 11px; font-weight: 300; color: #475569; font-family: 'Manrope', sans-serif; letter-spacing: 1px; padding-bottom: 20px;">
//                   Portfolio Submission
//                 </td>
//               </tr>
//               <tr>
//                 <td colspan="2" style="height: 1px; background: linear-gradient(to right, #4f46e5, rgba(79, 70, 229, 0.3), transparent); font-size: 0; line-height: 0;">&nbsp;</td>
//               </tr>
//             </table>

//             <div style="margin-bottom: 90px; padding: 0 4px;">
              
//               <div style="margin-bottom: 48px;">
//                 <span style="font-size: 10px; font-weight: 500; color: #4f46e5; letter-spacing: 2px; display: block; margin-bottom: 8px; font-family: 'Manrope', sans-serif; text-transform: uppercase;">Sender</span>
//                 <a href="mailto:${email}" style="font-size: 16px; color: #e2e8f0; font-weight: 400; text-decoration: none; font-family: 'Manrope', sans-serif; letter-spacing: -0.01em;">${email}</a>
//               </div>

//               <div style="border-left: 1px solid rgba(79, 70, 229, 0.2); padding-left: 24px;">
//                 <span style="font-size: 10px; font-weight: 500; color: #475569; letter-spacing: 2px; display: block; margin-bottom: 16px; font-family: 'Manrope', sans-serif; text-transform: uppercase;">Message Body</span>
//                 <div style="font-size: 16px; line-height: 1.9; color: #f1f5f9; font-weight: 300; white-space: pre-wrap; font-family: 'Manrope', sans-serif; letter-spacing: -0.01em;">
//                   ${message.replace(/\n/g, '<br>')}
//                 </div>
//               </div>

//             </div>

//             <div style="border-top: 1px solid rgba(255, 255, 255, 0.03); padding-top: 24px;">
//               <p style="font-size: 11px; color: #334155; margin: 0; font-weight: 300; font-family: 'Manrope', sans-serif; letter-spacing: 0.5px;">
//                 Sent directly from your portfolio workspace.
//               </p>
//             </div>

//           </div>
//         </div>
//       `,
//     });

//     return res.status(200).json({ success: true });
//   } catch (error) {
//     console.error('Mail delivery failure:', error);
//     return res.status(500).json({ error: 'System processing error.' });
//   }
// });

// // Start the server on port 5000
// const PORT = 5000;
// app.listen(PORT, () => console.log(`Backend server running on http://localhost:${PORT}`));

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer'; 
import { getChatResponse } from './src/utils/chatHelper.js'; // Import from chatHelper

const app = express();
app.use(cors());
app.use(express.json());

// Reusable Transporter from your nodemailer-setup.md
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: process.env.MAIL_PORT === '465',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// Verify mail server connection on startup
transporter.verify((err) => {
  if (err) console.error('Mail server connection failed:', err);
  else console.log('Mail server ready to send emails');
});

// The API endpoint your Vite contact form will send data to
app.post('/api/contact', async (req, res) => {
  try {
    const { email, subject, message } = req.body;

    if (!email || !subject || !message) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_USER, 
      replyTo: email,            
      subject: subject, 
      html: `
        <div style="background-color: #030712; padding: 60px 40px; font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; min-height: 100vh; width: 100%; box-sizing: border-box; margin: 0;">
          <div style="width: 100%; margin: 0 auto;">
            
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 70px;">
              <tr>
                <td style="font-size: 13px; font-weight: 500; color: #818cf8; letter-spacing: 4px; font-family: 'Manrope', sans-serif; text-transform: uppercase; padding-bottom: 20px;">
                  Message
                </td>
                <td align="right" style="font-size: 11px; font-weight: 300; color: #475569; font-family: 'Manrope', sans-serif; letter-spacing: 1px; padding-bottom: 20px;">
                  Portfolio Submission
                </td>
              </tr>
              <tr>
                <td colspan="2" style="height: 1px; background: linear-gradient(to right, #4f46e5, rgba(79, 70, 229, 0.3), transparent); font-size: 0; line-height: 0;">&nbsp;</td>
              </tr>
            </table>

            <div style="margin-bottom: 90px; padding: 0 4px;">
              
              <div style="margin-bottom: 48px;">
                <span style="font-size: 10px; font-weight: 500; color: #4f46e5; letter-spacing: 2px; display: block; margin-bottom: 8px; font-family: 'Manrope', sans-serif; text-transform: uppercase;">Sender</span>
                <a href="mailto:${email}" style="font-size: 16px; color: #e2e8f0; font-weight: 400; text-decoration: none; font-family: 'Manrope', sans-serif; letter-spacing: -0.01em;">${email}</a>
              </div>

              <div style="border-left: 1px solid rgba(79, 70, 229, 0.2); padding-left: 24px;">
                <span style="font-size: 10px; font-weight: 500; color: #475569; letter-spacing: 2px; display: block; margin-bottom: 16px; font-family: 'Manrope', sans-serif; text-transform: uppercase;">Message Body</span>
                <div style="font-size: 16px; line-height: 1.9; color: #f1f5f9; font-weight: 300; white-space: pre-wrap; font-family: 'Manrope', sans-serif; letter-spacing: -0.01em;">
                  ${message.replace(/\n/g, '<br>')}
                </div>
              </div>

            </div>

            <div style="border-top: 1px solid rgba(255, 255, 255, 0.03); padding-top: 24px;">
              <p style="font-size: 11px; color: #334155; margin: 0; font-weight: 300; font-family: 'Manrope', sans-serif; letter-spacing: 0.5px;">
                Sent directly from your portfolio workspace.
              </p>
            </div>

          </div>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Mail delivery failure:', error);
    return res.status(500).json({ error: 'System processing error.' });
  }
});

// =============================================
// CHATBOT API ENDPOINT (Using chatHelper)
// =============================================

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    // Validate input
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ 
        error: 'Message is required and must be a string' 
      });
    }

    // Use the chat helper from utils
    const reply = await getChatResponse(message);
    
    return res.status(200).json({ reply });

  } catch (error) {
    console.error('Chat API Error:', error);
    return res.status(500).json({ 
      reply: "Systems offline. Unable to reach the knowledge matrix." 
    });
  }
});

// Start the server on port 5000
const PORT = 5000;
app.listen(PORT, () => console.log(`Backend server running on http://localhost:${PORT}`));