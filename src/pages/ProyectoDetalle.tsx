import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Tag } from 'lucide-react';
import type { Project } from '@/types';

interface ProyectoDetalleProps {
  projects: Project[];
}

export default function ProyectoDetalle({ projects }: ProyectoDetalleProps) {
  const { id } = useParams<{ id: string }>();
  
  const project = projects.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Proyecto no encontrado</h2>
          <p className="text-gray-600 mb-6">El proyecto que buscas no existe o ha sido eliminado.</p>
          <Link
            to="/proyectos"
            className="inline-block bg-item-blue text-white px-6 py-3 rounded-lg font-medium hover:bg-item-blue/90 transition-colors"
          >
            Volver a proyectos
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
          src={project.imageUrl || 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&h=600&fit=crop'}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              to="/proyectos"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft size={20} />
              Volver a proyectos
            </Link>
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-item-blue text-white text-sm font-medium px-3 py-1 rounded-full">
                {project.category || 'Proyecto'}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">{project.title}</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-8 pb-8 border-b border-gray-200">
            {project.category && (
              <div className="flex items-center gap-2">
                <Tag size={18} />
                <span className="text-item-blue font-medium">{project.category}</span>
              </div>
            )}
          </div>

          {/* Description */}
          {project.description && (
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-xl text-gray-700 leading-relaxed">{project.description}</p>
            </div>
          )}

          {/* Full Content */}
          {project.content ? (
            <div className="prose prose-lg max-w-none ql-content-output">
              <div 
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: project.content
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
              to="/proyectos"
              className="inline-flex items-center gap-2 text-item-blue hover:underline font-medium"
            >
              <ArrowLeft size={20} />
              Volver a proyectos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
