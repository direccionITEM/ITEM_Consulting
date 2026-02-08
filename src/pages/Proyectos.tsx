import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Trash2, FolderOpen, Calendar, ArrowRight, Lock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { Project } from '@/types';

interface ProyectosProps {
  projects: Project[];
  isLoading: boolean;
  isAuthenticated: boolean;
  onLogin: (username: string, password: string) => Promise<boolean>;
  onLoginGoogle: () => Promise<boolean>;
  onAddProject: (project: Omit<Project, 'id'>) => void;
  onDeleteProject: (id: string) => void;
}

export default function Proyectos({
  projects,
  isLoading,
  isAuthenticated,
  onLogin,
  onLoginGoogle,
  onAddProject,
  onDeleteProject,
}: ProyectosProps) {
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    content: '',
    imageUrl: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const success = await onLogin(username, password);
    if (success) {
      setShowLoginDialog(false);
      setUsername('');
      setPassword('');
      setShowAddDialog(true);
    } else {
      setLoginError('Usuario o contraseña incorrectos');
    }
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProject(newProject);
    setNewProject({
      title: '',
      description: '',
      content: '',
      imageUrl: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
    });
    setShowAddDialog(false);
  };

  const handleAddClick = () => {
    if (isAuthenticated) {
      setShowAddDialog(true);
    } else {
      setShowLoginDialog(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          Cargando proyectos...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="relative bg-item-blue py-20">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('/images/3.png')` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Proyectos</h1>
              <div className="w-20 h-1 bg-white rounded-full" />
            </div>
            <button
              onClick={handleAddClick}
              className="bg-white/10 backdrop-blur-sm text-white border border-white/30 px-4 py-2 rounded-lg text-sm hover:bg-white/20 transition-colors flex items-center gap-2"
            >
              {isAuthenticated ? <Plus size={16} /> : <Lock size={14} />}
              {isAuthenticated ? 'Añadir proyecto' : 'Admin'}
            </button>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {projects.length === 0 ? (
            <div className="text-center py-16 bg-item-blue-light rounded-2xl">
              <FolderOpen className="mx-auto text-item-blue/50 mb-4" size={64} />
              <p className="text-gray-600">No hay proyectos disponibles</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.imageUrl || 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&h=400&fit=crop'}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-item-blue text-white text-xs font-medium px-3 py-1 rounded-full">
                        {project.category || 'Proyecto'}
                      </span>
                    </div>
                    {isAuthenticated && (
                      <button
                        onClick={() => onDeleteProject(project.id)}
                        className="absolute top-4 right-4 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                      <Calendar size={14} />
                      <span>
                        {new Date(project.date).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">{project.description}</p>
                    <Link
                      to={`/proyectos/${project.id}`}
                      className="text-item-blue font-medium text-sm hover:underline flex items-center gap-1"
                    >
                      Leer más <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="tu@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                required
              />
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
              onClick={async () => {
                setLoginError('');
                const success = await onLoginGoogle();
                if (success) {
                  setShowLoginDialog(false);
                  setUsername('');
                  setPassword('');
                } else {
                  setLoginError('Error al iniciar sesión con Google');
                }
              }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
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
                type="text"
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                placeholder="Título del proyecto"
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
                placeholder="Breve descripción del proyecto"
                rows={2}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contenido completo
              </label>
              <Textarea
                value={newProject.content}
                onChange={(e) => setNewProject({ ...newProject, content: e.target.value })}
                placeholder="Contenido detallado del proyecto (puede incluir markdown)"
                rows={6}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL de imagen
              </label>
              <Input
                type="url"
                value={newProject.imageUrl}
                onChange={(e) => setNewProject({ ...newProject, imageUrl: e.target.value })}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoría
                </label>
                <Input
                  type="text"
                  value={newProject.category}
                  onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                  placeholder="PMUS, Estudio..."
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
    </div>
  );
}
