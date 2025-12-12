
import { Project, Experience, Education, SkillCategory, ContactInfo } from './types';

export const CONTACT_INFO: ContactInfo = {
  phone: "+91 7736472576",
  email: "vijaymartin72@gmail.com",
  location: "Kochi, Kerala, India",
  linkedin: "https://linkedin.com/in/vijay-martin-86b430232",
  github: "https://github.com/Vijayleo46",
  twitter: "https://twitter.com/vijaymartin",
  dribbble: "https://dribbble.com/vijaymartin",
};

export const ABOUT_ME = `I am a Flutter Developer and Full-Stack Software Engineer with expertise in Dart, Flutter, Python, and modern web technologies. With hands-on experience from Spectrum Software Solutions, I specialize in building cross-platform mobile applications and scalable web solutions. I excel in collaborative environments, bringing innovative ideas to life while taking ownership of complex technical challenges. I am passionate about creating seamless user experiences across mobile and web platforms.`;

const getLogo = (name: string) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-original.svg`;

export const SKILLS: SkillCategory[] = [
  {
    name: "Languages",
    skills: [
      { name: "Python", logo: getLogo("python"), level: 90, desc: "Expert in Django, Flask, AI/ML libraries, and automation scripts." },
      { name: "Dart", logo: getLogo("dart"), level: 88, desc: "Advanced Flutter development with state management and native integrations." },
      { name: "C++", logo: getLogo("cplusplus"), level: 75, desc: "Strong foundation in algorithms, data structures, and system programming." },
      { name: "Java", logo: getLogo("java"), level: 70, desc: "Object-oriented programming and Android development experience." },
      { name: "JavaScript", logo: getLogo("javascript"), level: 85, desc: "Modern ES6+, async programming, and full-stack JavaScript development." },
      { name: "SQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", level: 80, desc: "Database design, complex queries, optimization, and stored procedures." },
    ],
  },
  {
    name: "Frameworks & Tech",
    skills: [
      { name: "Django", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg", level: 88, desc: "Full-stack web development with REST APIs, authentication, and deployment." },
      { name: "Flutter", logo: getLogo("flutter"), level: 92, desc: "Cross-platform mobile apps with Firebase, state management, and native features." },
      { name: "React", logo: getLogo("react"), level: 87, desc: "Modern React with hooks, context, and component-based architecture." },
      { name: "Next.js", logo: getLogo("nextjs"), level: 82, desc: "Server-side rendering, static generation, and API routes for production apps." },
      { name: "Node.js", logo: getLogo("nodejs"), level: 83, desc: "Backend APIs, Express.js, real-time applications, and microservices." },
      { name: "Three.js", logo: getLogo("threejs"), level: 72, desc: "3D graphics, WebGL, interactive visualizations, and animations." },
      { name: "Tailwind", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", level: 90, desc: "Utility-first CSS, responsive design, and custom component styling." },
    ],
  },
  {
    name: "Databases & Cloud",
    skills: [
      { name: "Supabase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg", level: 85, desc: "PostgreSQL backend, real-time subscriptions, authentication, and storage." },
      { name: "MySQL", logo: getLogo("mysql"), level: 82, desc: "Relational database design, indexing, transactions, and performance tuning." },
      { name: "SQLite", logo: getLogo("sqlite"), level: 78, desc: "Embedded databases for mobile and desktop applications." },
      { name: "Firebase", logo: getLogo("firebase"), level: 88, desc: "Real-time database, authentication, cloud functions, and hosting." },
    ],
  },
  {
    name: "Tools",
    skills: [
      { name: "Git", logo: getLogo("git"), level: 90, desc: "Version control, branching strategies, collaboration, and CI/CD workflows." },
      { name: "Figma", logo: getLogo("figma"), level: 80, desc: "UI/UX design, prototyping, design systems, and developer handoff." },
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    title: "Future Assistant",
    description: "AI-Powered Virtual Assistant with Voice Recognition.",
    technologies: ["Python", "AI", "Speech Recognition", "NLP"],
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2006&auto=format&fit=crop",
    demoUrl: "https://future-assistant.vercel.app/",
    githubUrl: "https://github.com/Vijayleo46/Future-Assistant",
    features: [
      "Voice-activated AI assistant with natural language processing.",
      "Performs tasks like web searches, weather updates, and automation.",
      "Live demo available with interactive voice commands.",
    ],
  },
  {
    title: "MindCanvas",
    description: "Time Memory Engine & Prediction System.",
    technologies: ["AI", "React", "Node.js"],
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop",
    features: [
      "Store, explore, and predict memories across a 300-year timeline.",
      "Unique interface for memory visualization and time travel.",
    ],
  },
  {
    title: "IntelliMeal",
    description: "AI-Powered Food Recognition & Calorie Tracker.",
    technologies: ["AI", "Computer Vision", "React"],
    image: "https://images.unsplash.com/photo-1543362906-acfc16c67564?q=80&w=1965&auto=format&fit=crop",
    features: [
      "Upload food photos to instantly recognize dishes.",
      "Smart calorie breakdown (Protein, Fat, Carbs) and tracking.",
    ],
  },
  {
    title: "Bun & Chai Hub",
    description: "Platform for Kerala's Café Culture.",
    technologies: ["React", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1974&auto=format&fit=crop",
    features: [
      "Discover Bun Maska, Irani Chai, and trending spots in Kerala.",
      "Explore cafes and trending food items near you.",
    ],
  },
  {
    title: "Restaurant Menu System",
    description: "Modern Online Menu & Cart System.",
    technologies: ["React", "Stripe Integration"],
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
    features: [
      "Responsive digital menu with category filtering.",
      "Full cart functionality with total calculation and checkout UI.",
    ],
  },
  {
    title: "DreamRoom AI",
    description: "AI-Driven 3D Room Visualization.",
    technologies: ["Stable Diffusion", "LoRA", "Python"],
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
    features: [
      "Generates 3D room layouts from text and floor plans.",
      "Used Diffusion Models + LoRA for realistic designs.",
    ],
  },
  {
    title: "VitalMed",
    description: "Medical Equipment E-Commerce.",
    technologies: ["Python", "Django"],
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=2091&auto=format&fit=crop",
    features: [
      "Role-based system for Admin, Shops, and Users.",
      "Secure shop registration and product management.",
    ],
  },
  {
    title: "AgriNova",
    description: "Cross-platform Agricultural Marketplace built with Flutter & Dart.",
    technologies: ["Flutter", "Dart", "Firebase"],
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop",
    features: [
      "Native performance on both iOS and Android using Flutter framework.",
      "Real-time data synchronization with Firebase backend.",
      "Integrated secure payments, order tracking, and delivery management.",
    ],
  },
  {
    title: "CivicConnect",
    description: "Public Complaint Management System.",
    technologies: ["Python", "Django"],
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2070&auto=format&fit=crop",
    features: [
      "Admin panel to manage places, departments, and complaints.",
      "Public module for citizens to register and track complaints.",
    ],
  },
];

export const EXPERIENCE: Experience[] = [
  {
    role: "AI Software Developer Intern",
    company: "AIXE Labs Private Limited",
    period: "Oct 2025 - Present",
    details: [
      "Developing creative, intelligent, and scalable solutions for Artograph AI.",
      "Working on a next-generation AI platform utilizing React.js and modern web stacks.",
      "Collaborating in a remote environment to deliver innovative AI-driven features.",
    ],
  },
  {
    role: "Full Stack Developer Intern",
    company: "NoviTech R&D Pvt Ltd, Chennai",
    period: "May 2025 – June 2025",
    details: [
      "Gained hands-on experience in frontend, backend, and database integration.",
      "Built and deployed end-to-end web applications using modern frameworks.",
    ],
  },
  {
    role: "Flutter Developer Advance Intern",
    company: "Spectrum Software Solutions, Kochi",
    period: "July 2024 – Aug 2024",
    details: [
      "Developed and optimized cross-platform apps with Flutter & Firebase.",
      "Implemented UI/UX enhancements, authentication, and API integrations.",
    ],
  },
  {
    role: "Flutter Developer Intern",
    company: "Spectrum Software Solutions, Kochi",
    period: "Jun 2023 – Jul 2023",
    details: [
      "Built responsive mobile apps with Flutter for both Android and iOS platforms.",
      "Reduced development time by using a single codebase across platforms.",
    ],
  },
];

export const EDUCATION: Education[] = [
  {
    degree: "B.E. Computer Science Engineering",
    institution: "Anna University",
    period: "Sep 2021 - June 2025",
    details: [
      "Specialized in software development and AI integration.",
      "Focused on system architecture and scalable solutions.",
    ],
  },
  {
    degree: "Vocational Higher Secondary",
    institution: "Higher Secondary School",
    period: "June 2019 - Mar 2021",
    details: [
      "Focused on programming fundamentals (CS & IT).",
    ],
  },
];
