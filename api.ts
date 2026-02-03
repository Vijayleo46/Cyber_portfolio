import axios from 'axios';
import { Project, Experience, Education, SkillCategory, ContactInfo } from './types';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const portfolioApi = {
    getProjects: () => api.get<Project[]>(`/projects/`).then(res => res.data),
    getExperience: () => api.get<Experience[]>(`/experience/`).then(res => res.data),
    getEducation: () => api.get<Education[]>(`/education/`).then(res => res.data),
    getSkills: () => api.get<SkillCategory[]>(`/skills/`).then(res => res.data),
    getContact: () => api.get<ContactInfo[]>(`/contact/`).then(res => res.data[0]),
};

export default api;
