import { aiSystemPrompt } from "./data";

const isLocalDevWithKey = import.meta.env.VITE_GEMINI_API_KEY;

const fallbackResponses = {
  skills: `Prarabdh has a diverse tech stack:\n\n**Frontend:** React, Redux, Tailwind CSS, Bootstrap, HTML5, CSS3\n**Backend:** Node.js, Express.js, MongoDB, MySQL\n**Programming:** JavaScript, C++, Java\n**SAP / Enterprise:** SAP ABAP, ABAP RAP, CDS Views, SAP S/4HANA, OData, SAP BTP\n**Tools:** Git, Postman, JWT Auth, REST APIs`,
  projects: `Prarabdh has built two notable projects:\n\n🛍️ **Lifestyle** — A full-stack clothing e-commerce platform with user auth, product management, order system, invoice generation, and admin dashboard. Built with React + Node.js + MongoDB.\n\n🩸 **Rakt Bank** — A blood donation management system. Built with Java + MySQL.`,
  sap: `Prarabdh is an **SAP Certified Back-End Developer – ABAP Cloud** working at TCS since February 2026. His ABAP expertise includes:\n\n• ABAP RESTful Application Programming Model (RAP)\n• CDS (Core Data Services) views for data modeling\n• Custom extensions in SAP S/4HANA using Clean Core principles\n• OData services development\n• SAP Business Technology Platform (BTP)`,
  mern: `Prarabdh is proficient in the **MERN Stack**:\n\n• **MongoDB** — Database design, Mongoose ODM\n• **Express.js** — RESTful API development, MVC architecture\n• **React** — Component design, Redux, Hooks\n• **Node.js** — Server development, JWT authentication`,
  contact: `You can reach Prarabdh at:\n\n📧 **Email:** prarabdh00@gmail.com\n🔗 **LinkedIn:** linkedin.com/in/prarabdhshukla\n💻 **GitHub:** github.com/Prarabdhshuklaa\n📍 **Location:** Ahmedabad, Gujarat, India`,
  certifications: `Prarabdh holds these certifications:\n\n🔹 SAP Certified – Back-End Developer (ABAP Cloud) — SAP (Jun 2026)\n🏆 MERN Stack Development\n💻 C/C++ Programming\n☕ Java Programming\n📊 Data Structures & Algorithms\n⛓️ Blockchain Builder Certificate\n📜 Internship Completion Certificate`,
  default: `I'm Prarabdh's AI assistant! Ask me about:\n\n• His **skills** and tech stack\n• His **projects** (Lifestyle, Rakt Bank)\n• His **SAP ABAP Developer** role at TCS\n• His **certifications**\n• **Contact** information`,
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

async function callSecureApi(action, payload) {
  try {
    const response = await fetch("/.netlify/functions/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ action, payload })
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    if (!data.text) {
      throw new Error("No text returned from API function.");
    }
    return data.text;
  } catch (err) {
    console.warn("Secure backend API unavailable, checking client-side fallback:", err);
    if (isLocalDevWithKey) {
      return callClientSideApi(action, payload);
    }
    throw err;
  }
}

// Client-side execution as fallback for local development if VITE_GEMINI_API_KEY is present
async function callClientSideApi(action, payload) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const { GoogleGenerativeAI } = await import("@google/generative-ai");
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  if (action === "chat") {
    const chat = model.startChat({
      history: [
        { role: 'user', parts: [{ text: `System context: ${aiSystemPrompt}` }] },
        { role: 'model', parts: [{ text: "Understood! I'm Prarabdh's AI assistant. I'll answer questions about him professionally." }] },
        ...payload.history.map(m => ({ role: m.role, parts: [{ text: m.content }] })),
      ],
    });
    const result = await chat.sendMessage(payload.question);
    return result.response.text();
  }
  
  if (action === "analyzeProject" || action === "analyzeResume") {
    const result = await model.generateContent(payload.prompt);
    return result.response.text();
  }
}

export async function askAboutPortfolio(question, chatHistory = []) {
  try {
    return await callSecureApi("chat", { question, history: chatHistory, systemPrompt: aiSystemPrompt });
  } catch (error) {
    console.error("Failed to fetch from API, using static fallbacks:", error);
    return getFallback(question);
  }
}

export async function analyzeProject(project) {
  const prompt = `Analyze this portfolio project in detail:\n\nProject: ${project.title}\nDescription: ${project.longDescription}\nTech Stack: ${project.tech.join(', ')}\nFeatures: ${project.features.join(', ')}\n\nProvide:\n1. **Architecture Overview**\n2. **Tech Stack Rationale**\n3. **Key Features Breakdown**\n4. **Challenges Solved**\n5. **Scalability Potential**\n\nKeep it concise and impressive for a recruiter.`;

  try {
    return await callSecureApi("analyzeProject", { prompt });
  } catch (error) {
    console.error("Failed to analyze project via API:", error);
    return `**Architecture Overview**\n${project.title} follows a modern ${project.tech.includes('Node.js') ? 'MVC' : 'layered'} architecture with clear separation of concerns.\n\n**Tech Stack Rationale**\n${project.tech.join(', ')} were chosen for performance and ecosystem maturity.\n\n**Key Features**\n${project.features.slice(0,2).join(' and ')} demonstrate solid full-stack skills.\n\n**Challenges Solved**\nSecure authentication flow and state management were handled efficiently.\n\n**Scalability**\nModular architecture allows horizontal scaling with caching strategies.`;
  }
}

export async function analyzeResume(resumeText) {
  const prompt = `Analyze this resume for a Full Stack Developer and SAP ABAP Developer. Return JSON only:\n\n${resumeText}\n\nJSON format:\n{\n  "atsScore": <number 0-100>,\n  "strengths": ["s1", "s2", "s3"],\n  "improvements": ["i1", "i2", "i3"],\n  "careerPaths": ["p1", "p2", "p3"],\n  "summary": "2-3 sentence assessment"\n}`;

  try {
    const text = await callSecureApi("analyzeResume", { prompt });
    const match = text.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw new Error('Invalid JSON');
  } catch (error) {
    console.error("Failed to analyze resume via API:", error);
    return {
      atsScore: 82,
      strengths: ["Strong MERN stack expertise with practical project experience", "SAP ABAP Developer at TCS (Certified Back-End Developer – ABAP Cloud)", "Diverse skill set spanning frontend, backend, and SAP enterprise"],
      improvements: ["Add quantifiable achievements (e.g., 'reduced load time by 40%')", "Include more keywords aligned with target job descriptions", "Add a professional summary section"],
      careerPaths: ["Full Stack Developer at product-based companies", "SAP ABAP Developer / Consultant", "MERN Stack Lead / Technical Architect"],
      summary: "Prarabdh shows a solid foundation in full stack development with MERN stack expertise complemented by a verified SAP ABAP certification. Well-rounded profile for both software development and SAP enterprise roles."
    };
  }
}
