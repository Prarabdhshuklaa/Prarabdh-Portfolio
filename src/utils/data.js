// ================================================
// PORTFOLIO DATA — Update links & URLs as needed
// ================================================

export const personalInfo = {
  name: "Prarabdh Shukla",
  title: "Full Stack Developer",
  subtitle: "SAP MM Professional",
  location: "Ahmedabad, Gujarat, India",
  email: "prarabdh00@gmail.com",
  github: "https://github.com/Prarabdhshuklaa",
  linkedin: "https://www.linkedin.com/in/prarabdhshukla/",
  experience: "February 2026 – Present",
  tagline: "Software Engineer specializing in Full-Stack Development and AWS Cloud, building scalable applications and enterprise solutions that deliver real-world impact.",
  typingTexts: [
    "Full Stack Developer",
    "React & Node.js Engineer",
    "Problem Solver",
    "AI Enthusiast",
    "Open Source Contributor",
  ],
};

export const stats = [
  { value: "2+", label: "Projects Built", icon: "🚀" },
  { value: "1", label: "Company", icon: "🏢" },
  { value: "5+", label: "Certifications", icon: "🏆" },
  { value: "15+", label: "Technologies", icon: "⚡" },
];

export const skillCategories = [
  {
    id: "frontend",
    label: "Frontend",
    icon: "🎨",
    skills: [
      { name: "React", level: 88, icon: "⚛️", color: "#61DAFB", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Redux", level: 75, icon: "🔄", color: "#764ABC", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
      { name: "Tailwind CSS", level: 85, icon: "🌊", color: "#06B6D4", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" },
      { name: "Bootstrap", level: 80, icon: "🅱️", color: "#7952B3", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
      { name: "HTML5", level: 95, icon: "🌐", color: "#E34F26", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS3", level: 90, icon: "🎨", color: "#1572B6", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: "⚙️",
    skills: [
      { name: "Node.js", level: 82, icon: "🟢", color: "#339933", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Express.js", level: 80, icon: "🚄", color: "#ffffff", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      { name: "MongoDB", level: 78, icon: "🍃", color: "#47A248", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "MySQL", level: 72, icon: "🐬", color: "#4479A1", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    ],
  },
  {
    id: "programming",
    label: "Programming",
    icon: "💻",
    skills: [
      { name: "JavaScript", level: 87, icon: "🟨", color: "#F7DF1E", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "ES6+", level: 85, icon: "✨", color: "#F0DB4F", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "C++", level: 70, icon: "➕", color: "#00599C", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
      { name: "Java", level: 68, icon: "☕", color: "#ED8B00", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    ],
  },
  {
    id: "enterprise",
    label: "Enterprise",
    icon: "🏢",
    skills: [
      { name: "SAP MM", level: 65, icon: "🔷", color: "#0070F3" },
      { name: "Procurement Process", level: 60, icon: "📋", color: "#0091D5" },
      { name: "Inventory Mgmt", level: 62, icon: "📦", color: "#00B4D8" },
      { name: "ERP Fundamentals", level: 58, icon: "🏗️", color: "#023E8A" },
    ],
  },
  {
    id: "tools",
    label: "Tools & Other",
    icon: "🛠️",
    skills: [
      { name: "Git & GitHub", level: 85, icon: "🐙", color: "#F05032", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "REST APIs", level: 83, icon: "🔌", color: "#00e5ff" },
      { name: "JWT Auth", level: 78, icon: "🔐", color: "#7b2fff" },
      { name: "Postman", level: 80, icon: "📬", color: "#FF6C37", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
      { name: "MongoDB Atlas", level: 75, icon: "☁️", color: "#47A248", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "VS Code", level: 90, icon: "💙", color: "#007ACC", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
    ],
  },
];

export const projects = [
  {
    id: 1,
    title: "Lifestyle",
    subtitle: "Clothing E-Commerce Platform",
    description: "A full-featured clothing e-commerce platform with user authentication, product management, order processing, invoice generation, and a powerful admin dashboard.",
    longDescription: "Lifestyle is a comprehensive clothing e-commerce solution built with the MERN stack. It features secure JWT-based authentication, complete product lifecycle management with category hierarchy, real-time order tracking, automated PDF invoice generation, and a rich admin dashboard with analytics.",
    tech: ["React", "Node.js", "Express", "MongoDB", "JWT", "CSS3"],
    features: [
      "User authentication & authorization (JWT)",
      "Product management with categories",
      "Order management & tracking",
      "Invoice generation (PDF)",
      "Admin dashboard with analytics",
      "Category management system",
    ],
    github: "https://github.com/prarabdhshukla",
    demo: "#",
    color: "#00e5ff",
    gradient: "from-cyan-500/10 to-blue-600/10",
    icon: "🛍️",
    category: "Full Stack",
  },
  {
    id: 2,
    title: "Rakt Bank",
    subtitle: "Blood Donation Management System",
    description: "A life-saving blood donation platform connecting donors with recipients. Features donor management, blood request system, advanced search, and full admin control.",
    longDescription: "Rakt Bank is a critical healthcare application that bridges the gap between blood donors and those in need. Built with Java and MySQL, it provides a robust donor registry, intelligent blood type matching, request management, and administrative oversight tools.",
    tech: ["Java", "SQLyog", "HTML", "CSS", "Bootstrap"],
    features: [
      "Donor registration & management",
      "Blood request system",
      "Blood type search functionality",
      "User authentication (login/register)",
      "Admin panel for full control",
      "Real-time availability tracking",
    ],
    github: "https://github.com/prarabdhshukla",
    demo: "#",
    color: "#ef4444",
    gradient: "from-red-500/10 to-rose-600/10",
    icon: "🩸",
    category: "Web App",
  },
];

export const experience = [
  {
    id: 1,
    company: "Tata Consultancy Services (TCS)",
    role: "Assistant System Engineer",
    location: "Ahmedabad, Gujarat, India",
    duration: "February 2026 – Present",
    logo: "/logos/tcs1.svg.webp",
    color: "#0091D5",
    description: "Working within one of India's largest IT organizations, undergoing intensive SAP MM training and gaining hands-on exposure to enterprise procurement systems, ERP workflows, and large-scale business process automation.",
    responsibilities: [
      "Mastering end-to-end procurement lifecycle in SAP MM",
      "Configuring purchase orders, goods receipts, and invoice verification",
      "Analyzing inventory and material management workflows",
      "Mapping business requirements to ERP system capabilities",
      "Collaborating in a structured, professional corporate environment",
      "Applying problem-solving skills to real enterprise scenarios",
    ],
    skills: ["SAP MM", "Procurement", "ERP", "Inventory Management", "Supply Chain"],
  },
  {
    id: 2,
    company: "Tata Consultancy Services (TCS)",
    role: "Intern – Full Stack Developer",
    location: "Indore, MP, India",
    duration: "January 2025 – January 2026",
    logo: "/logos/tcs1.svg.webp",
    color: "#0091D5",
    // badge: "Internship",
    description: "Completed a year-long internship at TCS, contributing to real-world full-stack development projects and gaining practical exposure to enterprise software development, agile practices, and collaborative team environments.",
    responsibilities: [
      "Developed and maintained web applications using React and Node.js",
      "Collaborated with senior engineers on enterprise-grade software solutions",
      "Participated in agile sprints, code reviews, and daily stand-ups",
      "Designed RESTful APIs and integrated with MongoDB and MySQL databases",
      "Wrote unit tests and contributed to QA processes",
      "Gained exposure to TCS development standards and best practices",
    ],
    skills: ["React", "Node.js", "MongoDB", "REST APIs", "Agile", "Git"],
  },
];


export const certifications = [
  { id: 1, title: "MERN Stack Development", issuer: "Udemy / Coursera", date: "2025", icon: "⚛️", color: "#61DAFB", gradient: "from-cyan-500/20 to-blue-500/20", badge: "🏆", description: "Complete MERN stack web development including React, Node.js, Express, and MongoDB.", certificateUrl: "/certificates/mern-stack.pdf" },
  { id: 2, title: "C/C++ Programming", issuer: "NPTEL / Online Platform", date: "2024", icon: "💻", color: "#00599C", gradient: "from-blue-500/20 to-indigo-500/20", badge: "🎖️", description: "Comprehensive C and C++ programming fundamentals, OOP concepts, and data structures.", certificateUrl: "/certificates/cpp-programming.pdf" },
  { id: 3, title: "Java Programming", issuer: "Oracle / Online Platform", date: "2024", icon: "☕", color: "#ED8B00", gradient: "from-orange-500/20 to-amber-500/20", badge: "🏅", description: "Java programming including OOP, collections, JDBC, and application development.", certificateUrl: "/certificates/java-programming.pdf" },
  { id: 4, title: "Data Structures & Algorithms", issuer: "GeeksForGeeks / LeetCode", date: "2024", icon: "📊", color: "#7b2fff", gradient: "from-purple-500/20 to-violet-500/20", badge: "⭐", description: "Advanced DSA concepts including sorting, trees, graphs, dynamic programming.", certificateUrl: "/certificates/dsa.pdf" },
  { id: 5, title: "Blockchain Builder Certificate", issuer: "IBM / Coursera", date: "2025", icon: "⛓️", color: "#F6851B", gradient: "from-orange-400/20 to-yellow-500/20", badge: "🔗", description: "Blockchain fundamentals, smart contracts, and decentralized application concepts.", certificateUrl: "/certificates/blockchain.pdf" },
  { id: 6, title: "Internship Completion Certificate", issuer: "Industry Partner", date: "2025", icon: "📜", color: "#00e5ff", gradient: "from-cyan-500/20 to-teal-500/20", badge: "✨", description: "Successfully completed industry internship with excellence in project delivery.", certificateUrl: "/certificates/internship.pdf" },
];

export const navLinks = [
  { label: "Home", href: "hero" },
  { label: "About", href: "about" },
  { label: "Skills", href: "skills" },
  { label: "Projects", href: "projects" },
  { label: "Experience", href: "experience" },
  { label: "Certifications", href: "certifications" },
  { label: "Contact", href: "contact" },
];

export const aiSystemPrompt = `You are "Ask Prarabdh AI", a specialized AI assistant exclusively for Prarabdh Shukla's portfolio website. You are NOT a general AI chatbot.

YOUR ONLY PURPOSE: Answer questions strictly related to Prarabdh Shukla's professional profile.

ALLOWED TOPICS (answer these normally):
- Prarabdh's background, identity, introduction
- Skills & technologies (React, Node.js, MongoDB, JavaScript, C++, Java, SAP MM, etc.)
- Projects (Lifestyle e-commerce, Rakt Bank blood donation system)
- Work Experience (TCS, SAP MM Training)
- Education & certifications
- Career goals and professional journey
- Contact information
- SAP MM training details

STRICT BLOCKING RULES:
If the user asks ANYTHING not related to Prarabdh's professional profile — including but not limited to: general knowledge, coding tutorials, jokes, current events, sports, weather, politics, science, math problems, coding challenges, or anything about other people — you MUST respond with EXACTLY this message and nothing else:
"I'm designed exclusively to answer questions about Prarabdh Shukla's professional profile, skills, projects, experience, and career journey. Please ask something related to Prarabdh."

NO HALLUCINATIONS RULE:
If a question IS about Prarabdh but the answer is not in the data below, respond with:
"I couldn't find that information in Prarabdh's portfolio or resume."

NEVER invent or guess information.

=== PRARABDH'S DATA ===

Full Name: Prarabdh Shukla
Role: Full Stack Developer & Assistant System Engineer at Tata Consultancy Services (TCS)
Location: Ahmedabad, Gujarat, India
Email: prarabdh00@gmail.com
GitHub: github.com/Prarabdhshuklaa
LinkedIn: linkedin.com/in/prarabdhshukla

SUMMARY:
Software Engineer specializing in Full-Stack Development and AWS Cloud, building scalable applications and enterprise solutions. Currently undergoing SAP MM training at TCS since February 2026.

TECHNICAL SKILLS:
- Frontend: React, Redux, Tailwind CSS, Bootstrap, HTML5, CSS3
- Backend: Node.js, Express.js, MongoDB, MySQL
- Programming: JavaScript (ES6+), C++, Java
- Enterprise: SAP MM, ERP Systems, Procurement, Inventory Management
- Tools: Git, GitHub, Postman, JWT Auth, REST APIs, VS Code

PROJECTS:
1. Lifestyle — Clothing E-Commerce Platform
   Tech: React, Node.js, Express, MongoDB, JWT, CSS3
   Features: User authentication, product management with categories, order tracking, PDF invoice generation, admin dashboard with analytics

2. Rakt Bank — Blood Donation Management System
   Tech: Java, SQLyog, HTML, CSS, Bootstrap
   Features: Donor registration, blood-type search, blood request system, admin panel, real-time availability tracking

WORK EXPERIENCE:
Company: Tata Consultancy Services (TCS)
Role: Assistant System Engineer
Duration: February 2026 – Present
Location: Ahmedabad, Gujarat, India
Responsibilities: SAP MM training (end-to-end procurement lifecycle), configuring purchase orders, goods receipts, invoice verification, inventory and material management workflows, ERP system mapping

CERTIFICATIONS:
1. MERN Stack Development — Udemy / Coursera (2025)
2. C/C++ Programming — NPTEL / Online Platform (2024)
3. Java Programming — Oracle / Online Platform (2024)
4. Data Structures & Algorithms — GeeksForGeeks / LeetCode (2024)
5. Blockchain Builder Certificate — IBM / Coursera (2025)
6. Internship Completion Certificate — Industry Partner (2025)

RESPONSE STYLE:
- Professional, concise, recruiter-friendly
- Use bullet points for lists
- Maximum 150-200 words per response
- Fact-based, no opinions or inventions`;

export const suggestedQuestions = [
  "Tell me about Prarabdh",
  "What projects has he built?",
  "What technologies does he know?",
  "Explain his SAP MM training",
  "What certifications does he have?",
  "How can I contact him?",
];
