
import { Project, Experience, Education, SkillCategory, ContactInfo } from './types';

export const CONTACT_INFO: ContactInfo = {
  phone: "+91 7736472576",
  email: "vijaymartin72@gmail.com",
  location: "Kochi, Kerala, India",
  linkedin: "https://linkedin.com/in/vijay-martin-86b430232",
  github: "https://github.com/Vijayleo46",
};

export const ABOUT_ME = `I am a Software Developer with strong expertise in Python, Django, and Flutter. I recently completed a Flutter Developer internship at Spectrum Softtech Solutions, gaining hands-on experience in building end-to-end mobile applications. I thrive in collaborative environments, enjoy bringing innovative ideas to the table, and am committed to taking ownership of tasks to achieve ambitious goals. I am passionate about problem-solving and building scalable systems.`;

const getLogo = (name: string) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-original.svg`;

export const SKILLS: SkillCategory[] = [
  {
    name: "Languages",
    skills: [
      { name: "Python", logo: getLogo("python") },
      { name: "Dart", logo: getLogo("dart") },
      { name: "C++", logo: getLogo("cplusplus") },
      { name: "Java", logo: getLogo("java") },
      { name: "JavaScript", logo: getLogo("javascript") },
      { name: "SQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    ],
  },
  {
    name: "Frameworks & Tech",
    skills: [
      { name: "Django", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
      { name: "Flutter", logo: getLogo("flutter") },
      { name: "React", logo: getLogo("react") },
      { name: "Next.js", logo: getLogo("nextjs") },
      { name: "Node.js", logo: getLogo("nodejs") },
      { name: "Three.js", logo: getLogo("threejs") },
      { name: "Tailwind", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    ],
  },
  {
    name: "Databases & Cloud",
    skills: [
      { name: "Supabase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" },
      { name: "MySQL", logo: getLogo("mysql") },
      { name: "SQLite", logo: getLogo("sqlite") },
      { name: "Firebase", logo: getLogo("firebase") },
    ],
  },
  {
    name: "Tools",
    skills: [
      { name: "Git", logo: getLogo("git") },
      { name: "Figma", logo: getLogo("figma") },
    ],
  },
];

export const PROJECTS: Project[] = [
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
    image: "https://images.unsplash.com/photo-1550966871-3ed3c6227b3c?q=80&w=2070&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1583912267670-652149e72c7e?q=80&w=1974&auto=format&fit=crop",
    features: [
      "Role-based system for Admin, Shops, and Users.",
      "Secure shop registration and product management.",
    ],
  },
  {
    title: "AgriNova",
    description: "Cross-platform Agricultural Marketplace.",
    technologies: ["Flutter", "Python"],
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop",
    features: [
      "Integrated secure payments, order tracking, and delivery management.",
      "Admin dashboard for managing users, farmers, and reports.",
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
    role: "AI Software Developer",
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
    role: "Flutter Developer Advance",
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
