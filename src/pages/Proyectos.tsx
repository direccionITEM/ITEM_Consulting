import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Trash2, FolderOpen, Calendar, ArrowRight, Lock, Eye, EyeOff, Pencil } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { Project } from '@/types';
import { useAuth } from '@/hooks/useAuth';

interface ProyectosProps {
  projects: Project[];
  isLoading: boolean;
  isAuthenticated: boolean;
  onAddProject: (project: Omit<Project, 'id'>, imageFile?: File) => Promise<boolean>;
  onUpdateProject: (id: string, project: Partial<Project>, imageFile?: File) => Promise<boolean>;
  onDeleteProject: (id: string) => Promise<boolean>;
}

export default function Proyectos({
  projects,
  isLoading,
  isAuthenticated,
  onAddProject,
  onUpdateProject,
  onDeleteProject,
}: ProyectosProps) {
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPasswordVisibility, setShowPasswordVisibility] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    content: '',
    imageUrl: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { login, loginGoogle } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const success = await login(email, password);
    if (success) {
      setShowLoginDialog(false);
      setEmail('');
      setPassword('');
    } else {
      setLoginError('Email o contraseña incorrectos');
    }
  };

  const handleGoogleLogin = async () => {
    setLoginError('');
    const result = await loginGoogle();
    if (result.success) {
      setShowLoginDialog(false);
    } else {
      setLoginError(result.error || 'Error al iniciar sesión con Google');
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await onAddProject(newProject, selectedImage || undefined);
    if (success) {
      setShowAddDialog(false);
      setNewProject({
        title: '',
        description: '',
        content: '',
        imageUrl: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
      });
      setSelectedImage(null);
    }
  };

  const handleEditProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    
    const success = await onUpdateProject(
      editingProject.id,
      {
        title: editingProject.title,
        description: editingProject.description,
        content: editingProject.content,
        imageUrl: editingProject.imageUrl,
        category: editingProject.category,
        date: editingProject.date,
      },
      selectedImage || undefined
    );
    
    if (success) {
      setShowEditDialog(false);
      setEditingProject(null);
      setSelectedImage(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este proyecto?')) {
      await onDeleteProject(id);
    }
  };

  const startEdit = (project: Project) => {
    setEditingProject(project);
    setSelectedImage(null);
    setShowEditDialog(true);
  };

  const categories = [...new Set(projects.map(p => p.category))];

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nuestros Proyectos
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre algunos de los proyectos de movilidad sostenible que hemos desarrollado
            para ayuntamientos, empresas y entidades públicas.
          </p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button className="px-6 py-2 bg-item-blue text-white rounded-full font-medium">
            Todos
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className="px-6 py-2 bg-white text-gray-700 rounded-full font-medium hover:bg-gray-100 transition-colors"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-item-blue mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando proyectos...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-item-blue text-white text-sm rounded-full">
                      {project.category}
                    </span>
                  </div>
                  
                  {/* Admin buttons - only show if authenticated */}
                  {isAuthenticated && (
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button
                        onClick={() => startEdit(project)}
                        className="p-2 bg-white rounded-full shadow-md hover:bg-blue-50 text-blue-600"
                        title="Editar"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="p-2 bg-white rounded-full shadow-md hover:bg-red-50 text-red-600"
                        title="Eliminar"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                    <Calendar size={16} />
                    <span>{new Date(project.date).toLocaleDateString('es-ES')}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <Link
                    to={`/proyectos/${project.id}`}
                    className="inline-flex items-center gap-2 text-item-blue font-medium hover:gap-3 transition-all"
                  >
                    Ver proyecto
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Project Button - only show if authenticated */}
        {isAuthenticated && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowAddDialog(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-item-blue text-white rounded-lg font-medium hover:bg-item-blue/90 transition-colors"
            >
              <Plus size={20} />
              Añadir nuevo proyecto
            </button>
          </div>
        )}

        {/* Admin Login Button - Bottom Right */}
        {!isAuthenticated && (
          <div className="fixed bottom-6 right-6 z-40">
            <button
              onClick={() => setShowLoginDialog(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800/80 hover:bg-gray-800 text-white text-sm rounded-full shadow-lg transition-all hover:scale-105"
            >
              <Lock size={14} />
              Admin
            </button>
          </div>
        )}
      </div>

      {/* Login Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock size={20} />
              Acceso de administración
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <Input
                  type={showPasswordVisibility ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordVisibility(!showPasswordVisibility)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  tabIndex={-1}
                >
                  {showPasswordVisibility ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            {loginError && (
              <p className="text-red-500 text-sm">{loginError}</p>
            )}
            <Button
              type="submit"
              className="w-full bg-item-blue hover:bg-item-blue/90 text-white"
            >
              Iniciar sesión
            </Button>

            {/* Separador */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">O continuar con</span>
              </div>
            </div>

            {/* Botón de Google */}
            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-50"
              onClick={handleGoogleLogin}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add Project Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus size={20} />
              Añadir nuevo proyecto
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddProject} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título
              </label>
              <Input
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                placeholder="Título del proyecto"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoría
              </label>
              <Input
                value={newProject.category}
                onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                placeholder="Ej: PMUS, Estudios de Tráfico, etc."
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha
              </label>
              <Input
                type="date"
                value={newProject.date}
                onChange={(e) => setNewProject({ ...newProject, date: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción corta
              </label>
              <Textarea
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                placeholder="Descripción breve del proyecto"
                rows={3}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contenido completo (Markdown soportado)
              </label>
              <Textarea
                value={newProject.content}
                onChange={(e) => setNewProject({ ...newProject, content: e.target.value })}
                placeholder="Contenido detallado del proyecto"
                rows={8}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Imagen
              </label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
              />
              <p className="text-xs text-gray-500 mt-1">
                O usa URL: <Input
                  value={newProject.imageUrl}
                  onChange={(e) => setNewProject({ ...newProject, imageUrl: e.target.value })}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  className="mt-1"
                />
              </p>
            </div>
            <Button
              type="submit"
              className="w-full bg-item-blue hover:bg-item-blue/90 text-white"
            >
              Guardar proyecto
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Project Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Pencil size={20} />
              Editar proyecto
            </DialogTitle>
          </DialogHeader>
          {editingProject && (
            <form onSubmit={handleEditProject} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título
                </label>
                <Input
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  placeholder="Título del proyecto"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoría
                </label>
                <Input
                  value={editingProject.category}
                  onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                  placeholder="Ej: PMUS, Estudios de Tráfico, etc."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha
                </label>
                <Input
                  type="date"
                  value={editingProject.date}
                  onChange={(e) => setEditingProject({ ...editingProject, date: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción corta
                </label>
                <Textarea
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  placeholder="Descripción breve del proyecto"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contenido completo
                </label>
                <Textarea
                  value={editingProject.content}
                  onChange={(e) => setEditingProject({ ...editingProject, content: e.target.value })}
                  placeholder="Contenido detallado del proyecto"
                  rows={8}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nueva imagen (opcional)
                </label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Imagen actual: {editingProject.imageUrl}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowEditDialog(false)}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-item-blue hover:bg-item-blue/90 text-white"
                >
                  Guardar cambios
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
