import { useState } from 'react';
import { Plus, LogIn, Trash2, Newspaper } from 'lucide-react';
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
    imageUrl: '',
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

  const handleAddNews = (e: React.FormEvent) => {
    e.preventDefault();
    onAddNews(newItem);
    setNewItem({
      title: '',
      excerpt: '',
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
      <section id="noticias" className="section-padding bg-item-blue-light">
        <div className="container-custom">
          <div className="text-center">Cargando noticias...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="noticias" className="section-padding bg-item-blue-light">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Noticias</h2>
            <div className="w-20 h-1 bg-item-blue rounded-full" />
          </div>
          <Button
            onClick={handleAddClick}
            className="bg-item-blue hover:bg-item-blue/90 text-white flex items-center gap-2"
          >
            {isAuthenticated ? <Plus size={18} /> : <LogIn size={18} />}
            {isAuthenticated ? 'Añadir noticia' : 'Iniciar sesión para añadir'}
          </Button>
        </div>

        {/* News Grid */}
        {news.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl">
            <Newspaper className="mx-auto text-item-blue/50 mb-4" size={64} />
            <p className="text-gray-600">No hay noticias disponibles</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow card-hover group"
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
                  <p className="text-item-blue text-sm font-medium mb-2">
                    {new Date(item.date).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3">{item.excerpt}</p>
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

        {/* Add News Dialog */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent className="sm:max-w-lg">
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
    </section>
  );
}
