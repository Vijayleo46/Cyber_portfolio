export interface Project {
  title: string;
  description: string;
  technologies: string[];
  features: string[];
  image: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  details: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  details: string[];
}

export interface SkillItem {
  name: string;
  logo: string;
}

export interface SkillCategory {
  name: string;
  skills: SkillItem[];
}

export interface ContactInfo {
  phone: string;
  email: string;
  location: string;
  linkedin: string;
  github: string;
}