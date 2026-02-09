import { useState, useEffect, useCallback } from 'react';
import type { User, Project, NewsItem } from '@/types';
import { 
  loginWithEmail, 
  loginWithGoogle, 
  logoutUser, 
  onAuthChange,
  getProjects,
  getNews,
  addProject as addProjectFB,
  updateProject as updateProjectFB,
  deleteProject as deleteProjectFB,
  addNewsItem as addNewsItemFB,
  updateNewsItem as updateNewsItemFB,
  deleteNewsItem as deleteNewsItemFB,
  uploadImage,
} from '@/lib/firebase';
import type { FirebaseUser } from '@/lib/firebase';

// ====================
// HOOK DE AUTENTICACIÓN CON FIREBASE
// ====================

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange((firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const newUser: User = {
          username: firebaseUser.email || 'admin',
          isAuthenticated: true,
        };
        setUser(newUser);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      await loginWithEmail(email, password);
      return true;
    } catch (error) {
      console.error('Error de login:', error);
      return false;
    }
  }, []);

  // Lista de correos autorizados para login con Google
  const ALLOWED_GOOGLE_EMAILS = [
    'rayengea@gmail.com',
    'direccion@itemconsulting.es'
  ];

  const loginGoogle = useCallback(async (): Promise<{ success: boolean; error?: string }> => {
    try {
      const result = await loginWithGoogle();
      const userEmail = result.user.email;
      
      if (userEmail && !ALLOWED_GOOGLE_EMAILS.includes(userEmail)) {
        await logoutUser();
        return { 
          success: false, 
          error: 'Este correo no tiene permiso para acceder. Contacta al administrador.' 
        };
      }
      
      return { success: true };
    } catch (error: any) {
      console.error('Error de login con Google:', error);
      
      let errorMessage = 'Error al iniciar sesión con Google';
      
      if (error.code === 'auth/popup-blocked') {
        errorMessage = 'El popup fue bloqueado. Por favor, permite ventanas emergentes para este sitio.';
      } else if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Ventana cerrada antes de completar el inicio de sesión.';
      } else if (error.code === 'auth/unauthorized-domain') {
        errorMessage = 'Este dominio no está autorizado. Agrega el dominio en Firebase Console > Authentication > Settings > Authorized domains.';
      } else if (error.code === 'auth/cancelled-popup-request') {
        errorMessage = 'Operación cancelada. Solo se permite un popup a la vez.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      return { success: false, error: errorMessage };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutUser();
      setUser(null);
    } catch (error) {
      console.error('Error de logout:', error);
    }
  }, []);

  return { user, isLoading, login, loginGoogle, logout };
}

// ====================
// HOOK DE PROYECTOS CON FIREBASE
// ====================

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setIsLoading(true);
      const data = await getProjects();
      setProjects(data as Project[]);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addProject = useCallback(async (project: Omit<Project, 'id'>, imageFile?: File) => {
    try {
      let imageUrl = project.imageUrl;
      
      if (imageFile) {
        imageUrl = await uploadImage(imageFile, 'projects');
      }

      const newProject = await addProjectFB({
        ...project,
        imageUrl,
      });
      
      setProjects(prev => [newProject as Project, ...prev]);
      return true;
    } catch (error) {
      console.error('Error adding project:', error);
      return false;
    }
  }, []);

  const updateProject = useCallback(async (id: string, project: Partial<Project>, imageFile?: File) => {
    try {
      let imageUrl = project.imageUrl;
      
      if (imageFile) {
        imageUrl = await uploadImage(imageFile, 'projects');
      }

      await updateProjectFB(id, {
        ...project,
        ...(imageUrl && { imageUrl }),
      });
      
      setProjects(prev => prev.map(p => 
        p.id === id ? { ...p, ...project, ...(imageUrl && { imageUrl }) } : p
      ));
      return true;
    } catch (error) {
      console.error('Error updating project:', error);
      return false;
    }
  }, []);

  const deleteProject = useCallback(async (id: string) => {
    try {
      await deleteProjectFB(id);
      setProjects(prev => prev.filter(p => p.id !== id));
      return true;
    } catch (error) {
      console.error('Error deleting project:', error);
      return false;
    }
  }, []);

  return { projects, isLoading, addProject, updateProject, deleteProject, refresh: loadProjects };
}

// ====================
// HOOK DE NOTICIAS CON FIREBASE
// ====================

export function useNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      setIsLoading(true);
      const data = await getNews();
      setNews(data as NewsItem[]);
    } catch (error) {
      console.error('Error loading news:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addNews = useCallback(async (item: Omit<NewsItem, 'id'>, imageFile?: File) => {
    try {
      let imageUrl = item.imageUrl;
      
      if (imageFile) {
        imageUrl = await uploadImage(imageFile, 'news');
      }

      const newItem = await addNewsItemFB({
        ...item,
        imageUrl,
      });
      
      setNews(prev => [newItem as NewsItem, ...prev]);
      return true;
    } catch (error) {
      console.error('Error adding news:', error);
      return false;
    }
  }, []);

  const updateNews = useCallback(async (id: string, item: Partial<NewsItem>, imageFile?: File) => {
    try {
      let imageUrl = item.imageUrl;
      
      if (imageFile) {
        imageUrl = await uploadImage(imageFile, 'news');
      }

      await updateNewsItemFB(id, {
        ...item,
        ...(imageUrl && { imageUrl }),
      });
      
      setNews(prev => prev.map(n => 
        n.id === id ? { ...n, ...item, ...(imageUrl && { imageUrl }) } : n
      ));
      return true;
    } catch (error) {
      console.error('Error updating news:', error);
      return false;
    }
  }, []);

  const deleteNews = useCallback(async (id: string) => {
    try {
      await deleteNewsItemFB(id);
      setNews(prev => prev.filter(n => n.id !== id));
      return true;
    } catch (error) {
      console.error('Error deleting news:', error);
      return false;
    }
  }, []);

  return { news, isLoading, addNews, updateNews, deleteNews, refresh: loadNews };
}
