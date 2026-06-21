// api/contact.ts
import type { IncomingMessage, ServerResponse } from 'http';
import nodemailer from 'nodemailer';

// Quick utility to parse the JSON body without external middleware
const getBody = (req: IncomingMessage): Promise<any> => {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try { resolve(JSON.parse(body)); } 
      catch { resolve({}); }
    });
  });
};

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT || 587),
  secure: process.env.MAIL_PORT === '465',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  // 1. Enforce POST requests
  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json', 'Allow': 'POST' });
    return res.end(JSON.stringify({ error: 'Method not allowed' }));
  }

  try {
    // 2. Parse the body manually since we aren't using Vercel's wrappers
    const body = await getBody(req);
    const { email, subject, message } = body;

    // 3. Validate incoming fields
    if (!email || !subject || !message) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Missing required fields.' }));
    }

    // 4. Dispatch the Email
    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_USER, 
      replyTo: email,            
      subject: subject, 
      html: `
        <div style="background-color: #030712; padding: 60px 40px; font-family: 'Manrope', sans-serif; min-height: 100vh; width: 100%; box-sizing: border-box; margin: 0;">
          <div style="width: 100%; margin: 0 auto;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 70px;">
              <tr>
                <td style="font-size: 13px; font-weight: 500; color: #818cf8; letter-spacing: 4px; text-transform: uppercase; padding-bottom: 20px;">Message</td>
                <td align="right" style="font-size: 11px; font-weight: 300; color: #475569; letter-spacing: 1px; padding-bottom: 20px;">Portfolio Submission</td>
              </tr>
              <tr>
                <td colspan="2" style="height: 1px; background: linear-gradient(to right, #4f46e5, rgba(79, 70, 229, 0.3), transparent);">&nbsp;</td>
              </tr>
            </table>
            <div style="margin-bottom: 90px; padding: 0 4px;">
              <div style="margin-bottom: 48px;">
                <span style="font-size: 10px; font-weight: 500; color: #4f46e5; letter-spacing: 2px; display: block; margin-bottom: 8px; text-transform: uppercase;">Sender</span>
                <a href="mailto:${email}" style="font-size: 16px; color: #e2e8f0; font-weight: 400; text-decoration: none;">${email}</a>
              </div>
              <div style="border-left: 1px solid rgba(79, 70, 229, 0.2); padding-left: 24px;">
                <span style="font-size: 10px; font-weight: 500; color: #475569; letter-spacing: 2px; display: block; margin-bottom: 16px; text-transform: uppercase;">Message Body</span>
                <div style="font-size: 16px; line-height: 1.9; color: #f1f5f9; font-weight: 300; white-space: pre-wrap;">
                  ${message.replace(/\n/g, '<br>')}
                </div>
              </div>
            </div>
            <div style="border-top: 1px solid rgba(255, 255, 255, 0.03); padding-top: 24px;">
              <p style="font-size: 11px; color: #334155; margin: 0; font-weight: 300; letter-spacing: 0.5px;">Sent directly from your portfolio workspace.</p>
            </div>
          </div>
        </div>
      `,
    });

    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ success: true }));
  } catch (error) {
    console.error('Mail delivery failure:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'System processing error.' }));
  }
}