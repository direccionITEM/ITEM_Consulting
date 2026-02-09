// Tipos para el sistema de gestión de contenidos

export interface Project {
  id: string;
  title: string;
  description?: string;
  content?: string;
  imageUrl: string;
  category: string;
  date?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt?: string;
  content?: string;
  imageUrl: string;
  date: string;
}

export interface User {
  username: string;
  isAuthenticated: boolean;
}

export type ContentType = 'project' | 'news';
