import { GoogleGenerativeAI } from "@google/generative-ai";
import { aiSystemPrompt } from "./data";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
let genAI = null;
let model = null;

if (API_KEY) {
  genAI = new GoogleGenerativeAI(API_KEY);
  model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
}

const fallbackResponses = {
  skills: `Prarabdh has a diverse tech stack:\n\n**Frontend:** React, Redux, Tailwind CSS, Bootstrap, HTML5, CSS3\n**Backend:** Node.js, Express.js, MongoDB, MySQL\n**Programming:** JavaScript, C++, Java\n**Enterprise:** SAP MM, Procurement, ERP\n**Tools:** Git, Postman, JWT Auth, REST APIs`,
  projects: `Prarabdh has built two notable projects:\n\n🛍️ **Lifestyle** — A full-stack clothing e-commerce platform with user auth, product management, order system, invoice generation, and admin dashboard. Built with React + Node.js + MongoDB.\n\n🩸 **Rakt Bank** — A blood donation management system. Built with Java + MySQL.`,
  sap: `Prarabdh is currently undergoing **SAP MM training at TCS** since February 2026 in Ahmedabad. Learning:\n\n• Procurement lifecycle\n• Inventory and material management\n• ERP fundamentals and SAP architecture\n• Supply chain management concepts`,
  mern: `Prarabdh is proficient in the **MERN Stack**:\n\n• **MongoDB** — Database design, Mongoose ODM\n• **Express.js** — RESTful API development, MVC architecture\n• **React** — Component design, Redux, Hooks\n• **Node.js** — Server development, JWT authentication`,
  contact: `You can reach Prarabdh at:\n\n📧 **Email:** prarabdh@example.com\n🔗 **LinkedIn:** linkedin.com/in/prarabdh-shukla\n💻 **GitHub:** github.com/prarabdhshukla\n📍 **Location:** Ahmedabad, Gujarat, India`,
  certifications: `Prarabdh holds these certifications:\n\n🏆 MERN Stack Development\n💻 C/C++ Programming\n☕ Java Programming\n📊 Data Structures & Algorithms\n⛓️ Blockchain Builder Certificate\n📜 Internship Completion Certificate`,
  default: `I'm Prarabdh's AI assistant! Ask me about:\n\n• His **skills** and tech stack\n• His **projects** (Lifestyle, Rakt Bank)\n• His **SAP MM training** at TCS\n• His **certifications**\n• **Contact** information`,
};

function getFallback(q) {
  const ql = q.toLowerCase();
  if (ql.includes('skill') || ql.includes('tech') || ql.includes('know')) return fallbackResponses.skills;
  if (ql.includes('project') || ql.includes('lifestyle') || ql.includes('rakt')) return fallbackResponses.projects;
  if (ql.includes('sap') || ql.includes('training') || ql.includes('tcs')) return fallbackResponses.sap;
  if (ql.includes('mern') || ql.includes('react') || ql.includes('node')) return fallbackResponses.mern;
  if (ql.includes('contact') || ql.includes('email') || ql.includes('reach')) return fallbackResponses.contact;
  if (ql.includes('certif')) return fallbackResponses.certifications;
  if (ql.includes('experience') || ql.includes('work') || ql.includes('job') || ql.includes('company')) return fallbackResponses.sap;
  if (ql.includes('who') || ql.includes('prarabdh') || ql.includes('about')) return fallbackResponses.default;
  return fallbackResponses.default;
}

export async function askAboutPortfolio(question, chatHistory = []) {
  if (!model) {
    await new Promise(r => setTimeout(r, 800));
    return getFallback(question);
  }
  try {
    const chat = model.startChat({
      history: [
        { role: 'user', parts: [{ text: `System context: ${aiSystemPrompt}` }] },
        { role: 'model', parts: [{ text: "Understood! I'm Prarabdh's AI assistant. I'll answer questions about him professionally." }] },
        ...chatHistory.map(m => ({ role: m.role, parts: [{ text: m.content }] })),
      ],
    });
    const result = await chat.sendMessage(question);
    return result.response.text();
  } catch (error) {
    console.error('Gemini API error:', error);
    return getFallback(question);
  }
}

export async function analyzeProject(project) {
  const prompt = `Analyze this portfolio project in detail:\n\nProject: ${project.title}\nDescription: ${project.longDescription}\nTech Stack: ${project.tech.join(', ')}\nFeatures: ${project.features.join(', ')}\n\nProvide:\n1. **Architecture Overview**\n2. **Tech Stack Rationale**\n3. **Key Features Breakdown**\n4. **Challenges Solved**\n5. **Scalability Potential**\n\nKeep it concise and impressive for a recruiter.`;

  if (!model) {
    await new Promise(r => setTimeout(r, 1200));
    return `**Architecture Overview**\n${project.title} follows a modern ${project.tech.includes('Node.js') ? 'MVC' : 'layered'} architecture with clear separation of concerns.\n\n**Tech Stack Rationale**\n${project.tech.join(', ')} were chosen for performance and ecosystem maturity.\n\n**Key Features**\n${project.features.slice(0,2).join(' and ')} demonstrate solid full-stack skills.\n\n**Challenges Solved**\nSecure authentication flow and state management were handled efficiently.\n\n**Scalability**\nModular architecture allows horizontal scaling with caching strategies.`;
  }
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Gemini API error:', error);
    return `**${project.title} Analysis**\n\nTech: ${project.tech.join(', ')}\n\nFeatures: ${project.features.slice(0,3).join(', ')}`;
  }
}

export async function analyzeResume(resumeText) {
  const prompt = `Analyze this resume for a Full Stack Developer and SAP MM Trainee. Return JSON only:\n\n${resumeText}\n\nJSON format:\n{\n  "atsScore": <number 0-100>,\n  "strengths": ["s1", "s2", "s3"],\n  "improvements": ["i1", "i2", "i3"],\n  "careerPaths": ["p1", "p2", "p3"],\n  "summary": "2-3 sentence assessment"\n}`;

  if (!model) {
    await new Promise(r => setTimeout(r, 1500));
    return {
      atsScore: 78,
      strengths: ["Strong MERN stack expertise with practical project experience", "Enterprise SAP MM training at TCS", "Diverse skill set spanning frontend, backend, and enterprise"],
      improvements: ["Add quantifiable achievements (e.g., 'reduced load time by 40%')", "Include more keywords aligned with target job descriptions", "Add a professional summary section"],
      careerPaths: ["Full Stack Developer at product-based companies", "SAP Functional Consultant after completing MM training", "MERN Stack Lead / Technical Architect"],
      summary: "Prarabdh shows a solid foundation in full stack development with MERN stack expertise complemented by enterprise SAP MM training. Well-rounded profile for both software development and ERP roles."
    };
  }
  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const match = text.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw new Error('Invalid JSON');
  } catch (error) {
    return { atsScore: 78, strengths: ["MERN skills", "SAP training", "Projects"], improvements: ["Add metrics", "More keywords", "Stronger summary"], careerPaths: ["Full Stack Dev", "SAP Consultant", "Tech Lead"], summary: "Well-rounded developer profile." };
  }
}
