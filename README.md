# 🌌 Prarabdh Shukla — Personal Portfolio & AI Hub

A premium, interactive developer portfolio showcasing **Prarabdh Shukla's** software engineering profile, certifications, projects, and enterprise experience. Built using **React**, **Vite**, **Framer Motion**, **Three.js**, and powered by **Google Gemini AI**.

---

## 🌟 Key Features

* **🤖 Ask Prarabdh (AI Chatbot):** An intelligent, conversational AI assistant trained on Prarabdh's professional profile. Includes speech-to-text input, and smart filters to stay on topic.
* **📊 AI Resume Analyzer:** An interactive tool that evaluates any pasted resume or profile using Gemini AI. It provides an ATS compatibility score, details key strengths, lists areas of improvement, and maps out potential career paths.
* **🧠 AI Project Analyzer:** Provides deep technical analysis for each project—generating recruiter-focused breakdowns of architecture, design choices, challenges solved, and scalability.
* **🌌 Interactive Particle Canvas:** A fluid, interactive particle system built with **Three.js** that responds to cursor movement for a premium aesthetic.
* **✨ Smooth Micro-Animations:** Combined GSAP and Framer Motion transitions for scroll effects, progress loaders, and elegant entry animations.
* **📧 Fully Functional Contact Form:** Direct email submission powered by **EmailJS**.
* **⚡ Serverless Backend:** Integrated with **Netlify Functions** to proxy Gemini AI requests, keeping the API key secure from the client side.

---

## 🛠️ Tech Stack & Integration

| Layer | Technologies |
| :--- | :--- |
| **Frontend Core** | React 18, Vite |
| **Styling & Theme** | Tailwind CSS, CSS3, Space Grotesk & Fira Code Fonts |
| **Animations** | Framer Motion, GSAP |
| **3D Elements** | Three.js |
| **AI Processing** | `@google/generative-ai` (Gemini 1.5 Flash) |
| **Serverless Functions** | Netlify Functions |
| **Services** | EmailJS, React Icons, React Toastify |

---

## 📂 Project Structure

```bash
prarabdh-portfolio/
├── netlify/
│   └── functions/
│       └── gemini.js            # Serverless function proxying Gemini API requests
├── public/                      # Static assets & documentations (certificates, logos)
├── src/
│   ├── assets/                  # Images and static assets
│   ├── components/              # React components
│   │   ├── AIAssistant.jsx      # Chatbot interface with speech/text inputs
│   │   ├── AIProjectAnalyzer.jsx# Project modal with dynamic AI architecture analysis
│   │   ├── AIResumeAnalyzer.jsx # Resume analyzer & ATS scorer UI
│   │   ├── ParticleBackground.jsx# Three.js interactive background canvas
│   │   ├── Hero.jsx             # Headline intro with stats & custom typing text
│   │   ├── Experience.jsx       # Interactive work timeline (TCS, Elanco SAP Project)
│   │   └── ...                  # About, Navbar, Certifications, Contact, Footer
│   ├── utils/
│   │   ├── data.js              # All static info (skills, projects, experiences)
│   │   └── gemini.js            # Frontend utility function invoking the API / netlify wrapper
│   ├── App.css                  # App-wide custom utility styles
│   ├── App.jsx                  # Main router/orchestrator of sections
│   ├── index.css                # Base Tailwind classes, glassmorphism config, and keyframes
│   └── main.jsx                 # Entrypoint
├── index.html                   # HTML document with custom SEO tags, Open Graph metadata, & JSON-LD
├── netlify.toml                 # Netlify deployment configuration for redirect routes & build settings
├── package.json                 # Dependency list
└── tailwind.config.js           # Tailwind utility customization
```

---

## 🚀 Installation & Local Setup

Follow these steps to run the portfolio locally.

### 1. Prerequisites
Ensure you have **Node.js** (v18 or higher) and **npm** installed on your system.

### 2. Clone the Repository
```bash
git clone https://github.com/Prarabdhshuklaa/Prarabdh-Portfolio.git
cd Prarabdh-Portfolio
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env` file in the root directory:
```env
# For local client-side fallback testing
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# For Netlify serverless functions locally (via Netlify CLI)
GEMINI_API_KEY=your_gemini_api_key_here
```
*Note: Get a free Gemini API key from Google AI Studio.*

### 5. Start the Local Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 6. Running Serverless Functions Locally (Optional)
To run Netlify Functions locally along with the frontend, use the Netlify CLI:
```bash
# Install Netlify CLI globally if you haven't
npm install -g netlify-cli

# Run local development with Netlify dev server proxy
netlify dev
```

---

## ☁️ Production Deployment (Netlify)

This project is configured out-of-the-box for seamless Netlify deployment.

1. Create a new site on Netlify importing your Git repository.
2. In the **Site Settings** under **Environment variables**, define:
   * Key: `GEMINI_API_KEY`
   * Value: `your-api-key-from-google-ai-studio`
3. Netlify will automatically detect the `netlify.toml` configuration and set up the functions directory at `/.netlify/functions/gemini`.

---

## 🔗 Connect with Prarabdh

* **LinkedIn:** [Prarabdh Shukla](https://www.linkedin.com/in/prarabdhshukla/)
* **GitHub:** [@Prarabdhshuklaa](https://github.com/Prarabdhshuklaa)
* **Email:** [prarabdh00@gmail.com](mailto:prarabdh00@gmail.com)
