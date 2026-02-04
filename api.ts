import axios from 'axios';
import type { Project, Experience, Education, SkillCategory, ContactInfo } from './types.ts';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const portfolioApi = {
    getProjects: () => api.get<Project[]>(`/projects/`).then(res => res.data),
    getExperience: () => api.get<Experience[]>(`/experience/`).then(res => res.data),
    getEducation: () => api.get<Education[]>(`/education/`).then(res => res.data),
    getSkills: () => api.get<SkillCategory[]>(`/skills/`).then(res => res.data),
    sendMessageToChatbot: (text: string) => api.post(`/chatbot/`, { text }).then(res => res.data),
    sendContactMessage: (data: { name: string; email: string; subject?: string; message: string }) => api.post(`/contact-message/`, data).then(res => res.data),
    getContact: () => api.get<ContactInfo[]>(`/contact/`).then(res => res.data[0]),
};

export default api;
