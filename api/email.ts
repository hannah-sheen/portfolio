import type { IncomingMessage, ServerResponse } from 'http';
import nodemailer from 'nodemailer';

// Helper to parse JSON body since we aren't using Express middleware
function getRequestBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch {
        resolve({});
      }
    });
  });
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  // 1. Handle CORS manually (no 'cors' package needed)
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  // 2. Parse the body using our helper
  const body = await getRequestBody(req);
  const { email, subject, message } = body;

  // Simple validation
  if (!email || !subject || !message) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'All fields are required.' }));
    return;
  }

  // 3. Configure Nodemailer transporter (process.env works out of the box on Vercel)
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.MAIL_PORT || '587', 10),
    secure: false, 
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS, 
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.MAIL_FROM, 
      to: process.env.MAIL_USER, 
      subject: `[Portfolio Contact Form] ${subject}`,
      replyTo: email, 
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

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: true, message: 'Email dispatched safely!' }));
  } catch (error) {
    console.error('Nodemailer error:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'System failure to send email.' }));
  }
}