const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async (event, context) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method Not Allowed" })
    };
  }

  try {
    const { action, payload } = JSON.parse(event.body);
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "Gemini API key is not configured on the server." })
      };
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    if (action === "chat") {
      const { question, history, systemPrompt } = payload;
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const chat = model.startChat({
        history: [
          { role: "user", parts: [{ text: `System context: ${systemPrompt}` }] },
          { role: "model", parts: [{ text: "Understood! I'm Prarabdh's AI assistant. I'll answer questions about him professionally." }] },
          ...history.map(m => ({ role: m.role, parts: [{ text: m.content }] })),
        ],
      });
      const result = await chat.sendMessage(question);
      const text = result.response.text();
      return { statusCode: 200, headers, body: JSON.stringify({ text }) };
    }
    
    if (action === "analyzeProject") {
      const { prompt } = payload;
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      return { statusCode: 200, headers, body: JSON.stringify({ text }) };
    }
    
    if (action === "analyzeResume") {
      const { prompt } = payload;
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      return { statusCode: 200, headers, body: JSON.stringify({ text }) };
    }

    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Invalid Action" })
    };
  } catch (error) {
    console.error("Netlify function error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message || "Internal Server Error" })
    };
  }
};
