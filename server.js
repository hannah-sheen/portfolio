import 'dotenv/config'; // Automatically loads your .env variables during local testing
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer'; 
import { GoogleGenAI } from '@google/genai'; 

const app = express();

// 💡 PRODUCTION CORS CONFIGURATION:
// This authenticates your live frontend URL and allows local development sync
app.use(cors({
  origin: [
    'http://localhost:5173', 
    'https://portfolio-lyart-nu-79.vercel.app'
  ],
  credentials: true
}));

app.use(express.json());

// Initialize AI securely using your hidden system environment variable
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// System Constraints and highly-natural personality context injection payload
const SYSTEM_INSTRUCTION = `
You are Hannah's exclusive portfolio assistant and Info Hub. Your goal is to represent her professionally but with a natural, conversational, and welcoming human tone—not sounding like a rigid robot or list generator.

TONE & BEHAVIORAL BLUEPRINT:
1. Speak like a polished, helpful tech collaborator or peer. Be concise, organic, and direct. 
2. Instead of repeating data word-for-word, weave the facts naturally into comfortable sentences (e.g., instead of "STAGE: Junior Developer", say "Hannah is currently navigating her journey as a junior developer based in the Philippines...").
3. Use bullet points when it makes reading clean, but avoid overusing them for simple thoughts.
4. CRITICAL: If a user asks something completely unrelated to Hannah, her work, skills, history, or portfolio, decline politely and casually (e.g., "I'd love to chat about that, but as Hannah's portfolio assistant, I'm here to answer questions specifically about her backend work, projects, and tech background!").
5. Do not make up facts. Stay strictly within this dataset.

---
AUTHORIZED DATASET MATRIX:

PROFILE META:
- Full Name: Hannah Sheen Obejero
- Stage: Junior Developer
- Current Base / Location: Philippines
- Core Philosophy & Focus: She naturally gravitates toward backend logic. She loves diving into server architectures, engineering logic, and mapping out seamless structured data pipelines behind the scenes. She looks at the frontend as a clean wrapper designed to elegantly display the complex logic she builds underneath.

1. TECHNICAL ARSENAL:
- Languages she writes: Python, Java, JavaScript, TypeScript, SQL, NoSQL, Pascal, HTML, and CSS.
- Frameworks ecosystem: React, Django, Node.js, Flask, and TailwindCSS.
- Databases she manages: PostgreSQL, MySQL, SSMS (Microsoft SQL Server Management Studio), Supabase, and MongoDB.
- Dev Tools: Git, GitHub, and VS Code.

2. CERTIFICATIONS & CREDENTIALS:
- ASEAN AI MAPUA Workshop (Focused on "Human-Centric AI and Regional Problem Solving" 2026 at Mapua MCL Global Classroom alongside Arizona State University, PUP, and Duy Tan University).
- Google Foundations of UX Design (via Coursera).
- GitHub Version Control credential from Google Developer Groups on Campus-CTU.
- NASA Space Apps Challenge (Earned the Galactic Problem Solver award in the 2024 International challenge).
- Networking Basics from the Cisco Networking Academy.

3. PROFESSIONAL TIMELINE & EXPERIENCE:
- Project Management Lead at Cebu Technological University (2025): Led the infrastructure development for the BARIOS system, successfully optimizing administrative processes and slashing manual workflows by 90%.
- Technical Instructor at Brgy. San Roque (2025): Delivered critical hands-on digital literacy and systems training to local government staff in partnership with the CTU Main CCICT extension team (featured in official university press).
- Back End Intern at Camtastic Philippines Corp. (2026): Engineered secure core backend structural logic utilizing legacy Pascal environments integrated with standalone SQL database engines.
- IT Intern at Lifewood Data Technology PH (2026): Immersed in corporate enterprise workflows, mastering prompt engineering, writing highly optimized source code patterns, and scaling systems using modern AI developer suites.

4. FLAGSHIP PROJECT ARTIFACTS:
- CIUDAD (BARIOS) for Brgy. San Roque: A robust full-stack administrative platform featuring real-time data orchestration and automated document lifecycles built with Django, React, React Native, and PostgreSQL. It tackled tough concurrency and sync issues in low-coverage zones, reducing processing times by 80%.
- The Archivist's Silence: A 2D isometric tactical puzzle game built using Godot and GDScript. Hannah handled dynamic tile layout generation with graph-traversal cellular automata and seeded items using Gemini AI.
- Quiz Odyssey: An AI-powered educational application built with HTML, CSS, JavaScript, and Gemini AI. She engineered defensive JSON schema parsers to guarantee reliable client-side quiz generation.
- Lifewood Website: A premium enterprise landing interface engineered using React, Tailwind CSS, and localized Supabase edge storage routers to maximize core web vital load speeds.
- PFC System (People Fitness Center): A specialized management database system built using Python to cleanly track scheduling metrics, check-ins, and ensure clean relational data integrity without row query locking.

5. PORTFOLIO CHANNELS & INTERNALS:
- Contact Channel Routing: The site is equipped with a contact form that routes incoming messages via a secure REST payload pipeline straight to an internal node endpoint ("http://localhost:5000/api/contact"). Ready for backend, cloud database, or full-stack pipeline talk.

6. SOCIAL MEDIA & DIRECT CHANNELS:
- Direct Email: hannahsheen12@gmail.com
- GitHub: https://github.com/hannah-sheen
- LinkedIn: https://www.linkedin.com/in/hannah-sheen-obejero-8a44b63a4
- Instagram: https://www.instagram.com/haruuxnna_/
- Facebook: https://www.facebook.com/missmaem
`;

// Reusable Transporter setup
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: process.env.MAIL_PORT === '465',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// AI Knowledge Engine Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message body cannot be empty.' });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.15,
      },
    });

    const replyText = response.text || "Connection signal lost. Please query again.";
    return res.status(200).json({ reply: replyText });

  } catch (error) {
    console.error('Gemini Knowledge Matrix Handshake Failure:', error);
    return res.status(500).json({ error: 'Internal system processing error.' });
  }
});

// Email Contact Pipeline Endpoint
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

// 💡 Local environment development runner option
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Backend tracking local runtime on port ${PORT}`));
}

// Export the module application layout directly for Vercel
export default app;