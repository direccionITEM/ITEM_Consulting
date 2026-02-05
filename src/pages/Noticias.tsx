import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Trash2, Newspaper, Calendar, ArrowRight, Lock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { NewsItem } from '@/types';

interface NoticiasProps {
  news: NewsItem[];
  isLoading: boolean;
  isAuthenticated: boolean;
  onLogin: (username: string, password: string) => Promise<boolean>;
  onAddNews: (item: Omit<NewsItem, 'id'>) => void;
  onDeleteNews: (id: string) => void;
}

export default function Noticias({
  news,
  isLoading,
  isAuthenticated,
  onLogin,
  onAddNews,
  onDeleteNews,
}: NoticiasProps) {
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [newItem, setNewItem] = useState({
    title: '',
    excerpt: '',
    content: '',
    imageUrl: '',
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

  const handleAddNews = (e: React.FormEvent) => {
    e.preventDefault();
    onAddNews(newItem);
    setNewItem({
      title: '',
      excerpt: '',
      content: '',
      imageUrl: '',
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
          Cargando noticias...
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
          style={{ backgroundImage: `url('/images/5.png')` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Noticias</h1>
              <div className="w-20 h-1 bg-white rounded-full" />
            </div>
{/*            <button
              onClick={handleAddClick}
              className="bg-white/10 backdrop-blur-sm text-white border border-white/30 px-4 py-2 rounded-lg text-sm hover:bg-white/20 transition-colors flex items-center gap-2"
            >
              {isAuthenticated ? <Plus size={16} /> : <Lock size={14} />}
              {isAuthenticated ? 'Añadir noticia' : 'Admin'}
            </button>
          </div>
        </div>
      </section>*/}

      {/* News Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {news.length === 0 ? (
            <div className="text-center py-16 bg-item-blue-light rounded-2xl">
              <Newspaper className="mx-auto text-item-blue/50 mb-4" size={64} />
              <p className="text-gray-600">No hay noticias disponibles</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.imageUrl || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=400&fit=crop'}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {isAuthenticated && (
                      <button
                        onClick={() => onDeleteNews(item.id)}
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
                        {new Date(item.date).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">{item.excerpt}</p>
                    <Link
                      to={`/noticias/${item.id}`}
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

      {/* Add News Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
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
                type="text"
                value={newItem.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                placeholder="Título de la noticia"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Extracto
              </label>
              <Textarea
                value={newItem.excerpt}
                onChange={(e) => setNewItem({ ...newItem, excerpt: e.target.value })}
                placeholder="Breve descripción de la noticia"
                rows={2}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contenido completo
              </label>
              <Textarea
                value={newItem.content}
                onChange={(e) => setNewItem({ ...newItem, content: e.target.value })}
                placeholder="Contenido detallado de la noticia"
                rows={6}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL de imagen
              </label>
              <Input
                type="url"
                value={newItem.imageUrl}
                onChange={(e) => setNewItem({ ...newItem, imageUrl: e.target.value })}
                placeholder="https://ejemplo.com/imagen.jpg"
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
            <Button
              type="submit"
              className="w-full bg-item-blue hover:bg-item-blue/90 text-white"
            >
              Guardar noticia
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
