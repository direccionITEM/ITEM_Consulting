import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Trash2, FolderOpen, ArrowRight, Pencil } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import RichTextEditor from '@/components/RichTextEditor';
import type { Project } from '@/types';

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
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    content: '',
    imageUrl: '',
    category: '',
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Validar campos requeridos
      if (!newProject.title.trim()) {
        setSubmitError('El título es obligatorio');
        setIsSubmitting(false);
        return;
      }
      if (!newProject.content.trim()) {
        setSubmitError('El contenido es obligatorio');
        setIsSubmitting(false);
        return;
      }
      
      const success = await onAddProject(newProject, selectedImage || undefined);
      if (success) {
        setShowAddDialog(false);
        setNewProject({
          title: '',
          description: '',
          content: '',
          imageUrl: '',
          category: '',
        });
        setSelectedImage(null);
      } else {
        setSubmitError('Error al guardar el proyecto. Verifica que estés autenticado.');
      }
    } catch (error: any) {
      console.error('Error adding project:', error);
      setSubmitError(error.message || 'Error inesperado al guardar');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const success = await onUpdateProject(
        editingProject.id,
        {
          title: editingProject.title,
          description: editingProject.description,
          content: editingProject.content,
          imageUrl: editingProject.imageUrl,
          category: editingProject.category,
        },
        selectedImage || undefined
      );
      
      if (success) {
        setShowEditDialog(false);
        setEditingProject(null);
        setSelectedImage(null);
      } else {
        setSubmitError('Error al actualizar el proyecto');
      }
    } catch (error: any) {
      console.error('Error updating project:', error);
      setSubmitError(error.message || 'Error inesperado al actualizar');
    } finally {
      setIsSubmitting(false);
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
    setSubmitError('');
    setShowEditDialog(true);
  };

  const categories = [...new Set(projects.map(p => p.category))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <section className="relative bg-item-blue py-24">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('/images/3.png')` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nuestros Proyectos
          </h1>
          <div className="w-20 h-1 bg-white mx-auto rounded-full mb-6" />
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Descubre algunos de los proyectos de movilidad sostenible que hemos desarrollado
            para ayuntamientos, empresas y entidades públicas.
          </p>
        </div>
      </section>

      <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

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
                    loading="lazy"
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
                  {project.category && (
                    <div className="flex items-center gap-2 text-item-blue text-sm mb-3">
                      <span className="px-3 py-1 bg-item-blue/10 rounded-full font-medium">
                        {project.category}
                      </span>
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {project.title}
                  </h3>
                  {project.description && (
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {project.description}
                    </p>
                  )}
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

      </div>

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
                Descripción corta <span className="text-gray-400 font-normal">(opcional)</span>
              </label>
              <Textarea
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                placeholder="Descripción breve del proyecto (aparecerá en la tarjeta preview)"
                rows={3}
              />
            </div>
            <div className="pt-2">
              <RichTextEditor
                label="Contenido completo"
                value={newProject.content}
                onChange={(value) => setNewProject({ ...newProject, content: value })}
                placeholder="Escribe el contenido detallado del proyecto..."
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
            {submitError && (
              <p className="text-red-500 text-sm">{submitError}</p>
            )}
            <Button
              type="submit"
              className="w-full bg-item-blue hover:bg-item-blue/90 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Guardando...' : 'Guardar proyecto'}
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
                  Descripción corta <span className="text-gray-400 font-normal">(opcional)</span>
                </label>
                <Textarea
                  value={editingProject.description || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  placeholder="Descripción breve del proyecto"
                  rows={3}
                />
              </div>
              <div className="pt-2">
                <RichTextEditor
                  label="Contenido completo"
                  value={editingProject.content || ''}
                  onChange={(value) => setEditingProject({ ...editingProject, content: value })}
                  placeholder="Escribe el contenido detallado del proyecto..."
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
              {submitError && (
                <p className="text-red-500 text-sm">{submitError}</p>
              )}
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowEditDialog(false)}
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-item-blue hover:bg-item-blue/90 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Guardando...' : 'Guardar cambios'}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
