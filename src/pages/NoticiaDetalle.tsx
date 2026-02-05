import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import type { NewsItem } from '@/types';

interface NoticiaDetalleProps {
  news: NewsItem[];
}

export default function NoticiaDetalle({ news }: NoticiaDetalleProps) {
  const { id } = useParams<{ id: string }>();
  
  const item = news.find(n => n.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!item) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Noticia no encontrada</h2>
          <p className="text-gray-600 mb-6">La noticia que buscas no existe o ha sido eliminada.</p>
          <Link
            to="/noticias"
            className="inline-block bg-item-blue text-white px-6 py-3 rounded-lg font-medium hover:bg-item-blue/90 transition-colors"
          >
            Volver a noticias
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Image */}
      <div className="relative h-96">
        <img
          src={item.imageUrl || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=600&fit=crop'}
          alt={item.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              to="/noticias"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft size={20} />
              Volver a noticias
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-white">{item.title}</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>
                {new Date(item.date).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <User size={18} />
              <span>ITEM Consulting</span>
            </div>
          </div>

          {/* Excerpt */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-gray-700 leading-relaxed font-medium">{item.excerpt}</p>
          </div>

          {/* Full Content */}
          {item.content ? (
            <div className="prose prose-lg max-w-none">
              <div 
                className="text-gray-700 leading-relaxed whitespace-pre-line"
                dangerouslySetInnerHTML={{ 
                  __html: item.content
                    .replace(/## (.*)/g, '<h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">$1</h2>')
                    .replace(/### (.*)/g, '<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">$1</h3>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/- (.*)/g, '<li class="ml-4 mb-1">$1</li>')
                    .replace(/<li/g, '<li class="flex items-start gap-2"><span class="text-item-blue mt-1">•</span><span>')
                    .replace(/<\/li>/g, '</span></li>')
                }}
              />
            </div>
          ) : (
            <div className="bg-item-blue-light rounded-xl p-8 text-center">
              <p className="text-gray-600">Contenido detallado próximamente...</p>
            </div>
          )}

          {/* Back button */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              to="/noticias"
              className="inline-flex items-center gap-2 text-item-blue hover:underline font-medium"
            >
              <ArrowLeft size={20} />
              Volver a noticias
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
