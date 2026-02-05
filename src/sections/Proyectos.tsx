import { useState } from 'react';
import { Plus, LogIn, Trash2, FolderOpen } from 'lucide-react';
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
  onAddProject: (project: Omit<Project, 'id'>) => void;
  onDeleteProject: (id: string) => void;
}

export default function Proyectos({
  projects,
  isLoading,
  isAuthenticated,
  onLogin,
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
    imageUrl: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
  });

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
      <section id="proyectos" className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center">Cargando proyectos...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="proyectos" className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Proyectos</h2>
            <div className="w-20 h-1 bg-item-blue rounded-full" />
          </div>
          <Button
            onClick={handleAddClick}
            className="bg-item-blue hover:bg-item-blue/90 text-white flex items-center gap-2"
          >
            {isAuthenticated ? <Plus size={18} /> : <LogIn size={18} />}
            {isAuthenticated ? 'Añadir proyecto' : 'Iniciar sesión para añadir'}
          </Button>
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-16 bg-item-blue-light rounded-2xl">
            <FolderOpen className="mx-auto text-item-blue/50 mb-4" size={64} />
            <p className="text-gray-600">No hay proyectos disponibles</p>
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow card-hover group"
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
                  <p className="text-item-blue text-sm font-medium mb-2">
                    {new Date(project.date).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-3">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Login Dialog */}
        <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <LogIn size={20} />
                Iniciar sesión
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Usuario
                </label>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Usuario"
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
            </form>
          </DialogContent>
        </Dialog>

        {/* Add Project Dialog */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent className="sm:max-w-lg">
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
                  Descripción
                </label>
                <Textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  placeholder="Descripción del proyecto"
                  rows={3}
                  required
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
    </section>
  );
}
