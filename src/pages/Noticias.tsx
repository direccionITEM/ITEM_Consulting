import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Trash2, Newspaper, Calendar, ArrowRight, Pencil, Linkedin, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import RichTextEditor from '@/components/RichTextEditor';
import type { NewsItem } from '@/types';
import { importFromLinkedIn, isValidLinkedInUrl, type LinkedInPostData } from '@/services/linkedinImporter';

interface NoticiasProps {
  news: NewsItem[];
  isLoading: boolean;
  isAuthenticated: boolean;
  onAddNews: (item: Omit<NewsItem, 'id'>, imageFile?: File) => Promise<boolean>;
  onUpdateNews: (id: string, item: Partial<NewsItem>, imageFile?: File) => Promise<boolean>;
  onDeleteNews: (id: string) => Promise<boolean>;
}

export default function Noticias({
  news,
  isLoading,
  isAuthenticated,
  onAddNews,
  onUpdateNews,
  onDeleteNews,
}: NoticiasProps) {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [newItem, setNewItem] = useState({
    title: '',
    excerpt: '',
    content: '',
    imageUrl: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  // LinkedIn import states
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [linkedInUrl, setLinkedInUrl] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState('');
  const [importedData, setImportedData] = useState<LinkedInPostData | null>(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddNews = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Validar campos requeridos
      if (!newItem.title.trim()) {
        setSubmitError('El título es obligatorio');
        setIsSubmitting(false);
        return;
      }
      if (!newItem.content.trim()) {
        setSubmitError('El contenido es obligatorio');
        setIsSubmitting(false);
        return;
      }
      
      const success = await onAddNews(newItem, selectedImage || undefined);
      if (success) {
        setShowAddDialog(false);
        setNewItem({
          title: '',
          excerpt: '',
          content: '',
          imageUrl: '',
          date: new Date().toISOString().split('T')[0],
        });
        setSelectedImage(null);
      } else {
        setSubmitError('Error al guardar la noticia. Verifica que estés autenticado.');
      }
    } catch (error: any) {
      console.error('Error adding news:', error);
      setSubmitError(error.message || 'Error inesperado al guardar');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNews) return;
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const success = await onUpdateNews(
        editingNews.id,
        {
          title: editingNews.title,
          excerpt: editingNews.excerpt,
          content: editingNews.content,
          imageUrl: editingNews.imageUrl,
          date: editingNews.date,
        },
        selectedImage || undefined
      );
      
      if (success) {
        setShowEditDialog(false);
        setEditingNews(null);
        setSelectedImage(null);
      } else {
        setSubmitError('Error al actualizar la noticia');
      }
    } catch (error: any) {
      console.error('Error updating news:', error);
      setSubmitError(error.message || 'Error inesperado al actualizar');
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta noticia?')) {
      await onDeleteNews(id);
    }
  };

  // LinkedIn import handlers
  const handleImportFromLinkedIn = async () => {
    if (!isValidLinkedInUrl(linkedInUrl)) {
      setImportError('URL de LinkedIn no válida. Ejemplo: https://www.linkedin.com/posts/roberto-josé-liñán-ruiz_xxxx');
      return;
    }
    
    setIsImporting(true);
    setImportError('');
    
    try {
      const data = await importFromLinkedIn(linkedInUrl);
      setImportedData(data);
    } catch (error: any) {
      console.error('Import error:', error);
      setImportError(error.message || 'Error al importar. Asegúrate de que el post sea público.');
    } finally {
      setIsImporting(false);
    }
  };

  const handleConfirmImport = async () => {
    if (!importedData) return;
    
    setIsSubmitting(true);
    try {
      const success = await onAddNews({
        title: importedData.title,
        excerpt: importedData.excerpt,
        content: importedData.content + `\n\n---\n[Original en LinkedIn](${importedData.url})`,
        imageUrl: importedData.imageUrl,
        date: new Date().toISOString().split('T')[0],
      });
      
      if (success) {
        setShowImportDialog(false);
        setLinkedInUrl('');
        setImportedData(null);
      } else {
        setImportError('Error al guardar la noticia');
      }
    } catch (error: any) {
      setImportError(error.message || 'Error al guardar');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetImport = () => {
    setImportedData(null);
    setImportError('');
  };

  const startEdit = (item: NewsItem) => {
    setEditingNews(item);
    setSelectedImage(null);
    setSubmitError('');
    setShowEditDialog(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <section className="relative bg-item-blue py-24">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('/images/5.png')` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Noticias
          </h1>
          <div className="w-20 h-1 bg-white mx-auto rounded-full mb-6" />
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Mantente informado sobre las últimas novedades en movilidad sostenible
            y proyectos de ITEM Consulting.
          </p>
        </div>
      </section>

      <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* News Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-item-blue mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando noticias...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Admin buttons - only show if authenticated */}
                  {isAuthenticated && (
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button
                        onClick={() => startEdit(item)}
                        className="p-2 bg-white rounded-full shadow-md hover:bg-blue-50 text-blue-600"
                        title="Editar"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
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
                    <span>{new Date(item.date).toLocaleDateString('es-ES')}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {item.title}
                  </h3>
                  {item.excerpt ? (
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {item.excerpt}
                    </p>
                  ) : (
                    <div 
                      className="text-gray-600 mb-4 line-clamp-3 text-sm"
                      dangerouslySetInnerHTML={{ 
                        __html: item.content?.replace(/<[^>]*>/g, '').substring(0, 150) + '...' || '' 
                      }}
                    />
                  )}
                  <Link
                    to={`/noticias/${item.id}`}
                    className="inline-flex items-center gap-2 text-item-blue font-medium hover:gap-3 transition-all"
                  >
                    Leer más
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Add News Buttons - only show if authenticated */}
        {isAuthenticated && (
          <div className="mt-12 text-center flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setShowAddDialog(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-item-blue text-white rounded-lg font-medium hover:bg-item-blue/90 transition-colors"
            >
              <Plus size={20} />
              Añadir nueva noticia
            </button>
            <button
              onClick={() => {
                setShowImportDialog(true);
                resetImport();
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A66C2] text-white rounded-lg font-medium hover:bg-[#0A66C2]/90 transition-colors"
            >
              <Linkedin size={20} />
              Importar de LinkedIn
            </button>
          </div>
        )}

      </div>

      {/* Add News Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus size={20} />
              Añadir nueva noticia
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddNews} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título
              </label>
              <Input
                value={newItem.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                placeholder="Título de la noticia"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha
              </label>
              <Input
                type="date"
                value={newItem.date}
                onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Resumen <span className="text-gray-400 font-normal">(opcional)</span>
              </label>
              <Textarea
                value={newItem.excerpt}
                onChange={(e) => setNewItem({ ...newItem, excerpt: e.target.value })}
                placeholder="Breve resumen de la noticia (aparecerá en la tarjeta preview)"
                rows={3}
              />
            </div>
            <div className="pt-2">
              <RichTextEditor
                label="Contenido completo"
                value={newItem.content}
                onChange={(value) => setNewItem({ ...newItem, content: value })}
                placeholder="Escribe el contenido completo de la noticia..."
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
                  value={newItem.imageUrl}
                  onChange={(e) => setNewItem({ ...newItem, imageUrl: e.target.value })}
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
              {isSubmitting ? 'Guardando...' : 'Guardar noticia'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit News Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Pencil size={20} />
              Editar noticia
            </DialogTitle>
          </DialogHeader>
          {editingNews && (
            <form onSubmit={handleEditNews} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título
                </label>
                <Input
                  value={editingNews.title}
                  onChange={(e) => setEditingNews({ ...editingNews, title: e.target.value })}
                  placeholder="Título de la noticia"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha
                </label>
                <Input
                  type="date"
                  value={editingNews.date}
                  onChange={(e) => setEditingNews({ ...editingNews, date: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Resumen <span className="text-gray-400 font-normal">(opcional)</span>
                </label>
                <Textarea
                  value={editingNews.excerpt || ''}
                  onChange={(e) => setEditingNews({ ...editingNews, excerpt: e.target.value })}
                  placeholder="Breve resumen de la noticia"
                  rows={3}
                />
              </div>
              <div className="pt-2">
                <RichTextEditor
                  label="Contenido completo"
                  value={editingNews.content || ''}
                  onChange={(value) => setEditingNews({ ...editingNews, content: value })}
                  placeholder="Escribe el contenido completo de la noticia..."
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
                  Imagen actual: {editingNews.imageUrl}
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

      {/* Import from LinkedIn Dialog */}
      <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Linkedin size={20} className="text-[#0A66C2]" />
              Importar de LinkedIn
            </DialogTitle>
          </DialogHeader>
          
          {!importedData ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Pega la URL de un post público de LinkedIn para importarlo como noticia.
              </p>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL del post de LinkedIn
                </label>
                <Input
                  value={linkedInUrl}
                  onChange={(e) => setLinkedInUrl(e.target.value)}
                  placeholder="https://www.linkedin.com/posts/roberto-jose-linan-ruiz_xxxx"
                  disabled={isImporting}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Ejemplo: https://www.linkedin.com/posts/tu-perfil_activity-123456...
                </p>
              </div>
              
              {importError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-600 text-sm">{importError}</p>
                </div>
              )}
              
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowImportDialog(false)}
                  disabled={isImporting}
                >
                  Cancelar
                </Button>
                <Button
                  type="button"
                  className="flex-1 bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white"
                  onClick={handleImportFromLinkedIn}
                  disabled={isImporting || !linkedInUrl.trim()}
                >
                  {isImporting ? (
                    <>
                      <Loader2 size={16} className="mr-2 animate-spin" />
                      Importando...
                    </>
                  ) : (
                    <>
                      <Linkedin size={16} className="mr-2" />
                      Importar
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-green-700 text-sm font-medium">✓ Importado correctamente</p>
                <p className="text-green-600 text-xs">Revisa los datos y confirma para publicar</p>
              </div>
              
              <div className="border rounded-lg p-4 space-y-3 bg-gray-50">
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">Título</label>
                  <p className="text-gray-900">{importedData.title}</p>
                </div>
                
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">Resumen</label>
                  <p className="text-gray-700 text-sm">{importedData.excerpt}</p>
                </div>
                
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">Contenido</label>
                  <p className="text-gray-700 text-sm line-clamp-6 whitespace-pre-wrap">{importedData.content}</p>
                </div>
                
                {importedData.imageUrl && importedData.imageUrl !== '/images/5.png' && (
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">Imagen detectada</label>
                    <img 
                      src={importedData.imageUrl} 
                      alt="Preview" 
                      className="mt-1 max-h-32 rounded-lg object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
                
                {importedData.author && (
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">Autor</label>
                    <p className="text-gray-700 text-sm">{importedData.author}</p>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={resetImport}
                  disabled={isSubmitting}
                >
                  ← Volver
                </Button>
                <Button
                  type="button"
                  className="flex-1 bg-item-blue hover:bg-item-blue/90 text-white"
                  onClick={handleConfirmImport}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="mr-2 animate-spin" />
                      Guardando...
                    </>
                  ) : (
                    'Confirmar y publicar'
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
