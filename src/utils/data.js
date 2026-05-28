// ================================================
// PORTFOLIO DATA — Update links & URLs as needed
// ================================================

export const personalInfo = {
  name: "Prarabdh Shukla",
  title: "Full Stack Developer",
  subtitle: "SAP MM Trainee @ TCS",
  location: "Ahmedabad, Gujarat, India",
  email: "prarabdh00@gmail.com",
  github: "https://github.com/Prarabdhshuklaa",
  linkedin: "https://www.linkedin.com/in/prarabdhshukla/",
  experience: "February 2026 – Present",
  tagline: "Building scalable web applications and exploring enterprise solutions with SAP & AI.",
  about: `I'm a passionate Full Stack Developer with expertise in MERN stack development and modern web technologies. Currently, I am undergoing SAP MM training at TCS Ahmedabad, where I am learning enterprise resource planning and supply chain management solutions. I enjoy building scalable applications, solving real-world problems, and exploring AI-powered systems.`,
  typingTexts: [
    "Full Stack Developer",
    "SAP MM Trainee @ TCS",
    "MERN Stack Engineer",
    "Problem Solver",
    "AI Enthusiast",
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
    role: "SAP MM Trainee",
    location: "Ahmedabad, Gujarat, India",
    duration: "February 2026 – Present",
    type: "Training",
    logo: "TCS",
    color: "#0091D5",
    description: "Currently undergoing intensive SAP MM (Materials Management) training at one of India's largest IT corporations. Gaining hands-on experience with enterprise-level ERP systems and procurement processes.",
    responsibilities: [
      "Undergoing comprehensive SAP MM training program",
      "Learning end-to-end procurement lifecycle management",
      "Studying inventory and material management processes",
      "Understanding enterprise business process automation",
      "Exploring ERP fundamentals and SAP system architecture",
      "Working in a structured corporate training environment",
    ],
    skills: ["SAP MM", "Procurement", "ERP", "Inventory Management", "Supply Chain"],
  },
];

export const certifications = [
  { id: 1, title: "MERN Stack Development", issuer: "Udemy / Coursera", date: "2025", icon: "⚛️", color: "#61DAFB", gradient: "from-cyan-500/20 to-blue-500/20", badge: "🏆", description: "Complete MERN stack web development including React, Node.js, Express, and MongoDB." },
  { id: 2, title: "C/C++ Programming", issuer: "NPTEL / Online Platform", date: "2024", icon: "💻", color: "#00599C", gradient: "from-blue-500/20 to-indigo-500/20", badge: "🎖️", description: "Comprehensive C and C++ programming fundamentals, OOP concepts, and data structures." },
  { id: 3, title: "Java Programming", issuer: "Oracle / Online Platform", date: "2024", icon: "☕", color: "#ED8B00", gradient: "from-orange-500/20 to-amber-500/20", badge: "🏅", description: "Java programming including OOP, collections, JDBC, and application development." },
  { id: 4, title: "Data Structures & Algorithms", issuer: "GeeksForGeeks / LeetCode", date: "2024", icon: "📊", color: "#7b2fff", gradient: "from-purple-500/20 to-violet-500/20", badge: "⭐", description: "Advanced DSA concepts including sorting, trees, graphs, dynamic programming." },
  { id: 5, title: "Blockchain Builder Certificate", issuer: "IBM / Coursera", date: "2025", icon: "⛓️", color: "#F6851B", gradient: "from-orange-400/20 to-yellow-500/20", badge: "🔗", description: "Blockchain fundamentals, smart contracts, and decentralized application concepts." },
  { id: 6, title: "Internship Completion Certificate", issuer: "Industry Partner", date: "2025", icon: "📜", color: "#00e5ff", gradient: "from-cyan-500/20 to-teal-500/20", badge: "✨", description: "Successfully completed industry internship with excellence in project delivery." },
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

export const aiSystemPrompt = `You are "Prarabdh AI", a helpful AI assistant on Prarabdh Shukla's portfolio website.
You answer questions about Prarabdh in first person on his behalf.

Key information:
- Full Name: Prarabdh Shukla
- Role: Full Stack Developer and SAP MM Trainee at TCS
- Location: Ahmedabad, Gujarat, India
- Currently undergoing SAP MM training at TCS since February 2026

Skills: React, Redux, Tailwind CSS, Bootstrap, HTML5, CSS3, JavaScript, ES6+, Node.js, Express.js, MongoDB, MySQL, C++, Java, SAP MM, Git, Postman, JWT Auth, REST APIs

Projects:
1. Lifestyle - Clothing E-Commerce (React, Node.js, Express, MongoDB, JWT) - user auth, product management, orders, invoices, admin dashboard
2. Rakt Bank - Blood Donation System (Java, SQLyog, HTML, CSS, Bootstrap) - donor management, blood requests, search, admin

Experience: SAP MM Trainee at TCS Ahmedabad since February 2026 - learning procurement, inventory management, ERP

Certifications: MERN Stack, C/C++, Java, DSA, Blockchain Builder, Internship Completion

Keep answers concise, professional, and enthusiastic. Use bullet points for lists.`;

export const suggestedQuestions = [
  "What technologies does Prarabdh know?",
  "Tell me about his projects",
  "Explain his SAP MM training",
  "What is his MERN stack experience?",
  "What certifications does he have?",
  "How can I contact Prarabdh?",
];
