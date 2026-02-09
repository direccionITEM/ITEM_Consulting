import { ArrowRight, AlertTriangle, FileText } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function Hero() {
  const [showVideo, setShowVideo] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Determinar la ruta base del video según el entorno
  const getVideoPath = () => {
    // En desarrollo local, usar ruta relativa
    if (import.meta.env.DEV) {
      return '/videos/video1.mp4';
    }
    // En producción, ruta absoluta
    return '/videos/video1.mp4';
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    // Intentar cargar el video manualmente
    video.src = getVideoPath();
    video.load();
    
    const playVideo = async () => {
      try {
        await video.play();
        console.log('Video reproduciendose');
      } catch (err) {
        console.log('Autoplay bloqueado, esperando interaccion');
      }
    };
    
    playVideo();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="relative min-h-screen flex flex-col">
      {/* Hero Background */}
      <div 
        className="relative flex-1 flex items-center"
        style={{ minHeight: '600px' }}
      >
        {/* Contenedor de fondo */}
        <div className="absolute inset-0 overflow-hidden">
          
          {/* Video */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className={`absolute inset-0 w-full h-full object-cover ${
              showVideo ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transition: 'opacity 0.5s ease' }}
            onLoadedData={() => {
              console.log('Video cargado');
              setShowVideo(true);
            }}
            onCanPlay={() => {
              setShowVideo(true);
            }}
            onError={(e) => {
              console.error('Error video:', e);
              setVideoError(true);
            }}
          >
            <source src={getVideoPath()} type="video/mp4" />
          </video>
          
          {/* Fallback - visible cuando video no carga */}
          {(!showVideo || videoError) && (
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('/images/1.png')` }}
            />
          )}
          
          {/* Overlay */}
          <div className="hero-overlay absolute inset-0" />
        </div>

        {/* Contenido */}
        <div className="container-custom relative w-full py-32" style={{ zIndex: 10 }}>
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Ingeniería especializada en{' '}
              <span className="text-item-blue">infraestructuras del transporte</span>{' '}
              y movilidad sostenible
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Soluciones innovadoras para la planificación, gestión y análisis de 
              sistemas de transporte y movilidad urbana.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection('#contacto')}
                className="btn-primary flex items-center gap-2"
              >
                Contactar
                <ArrowRight size={20} />
              </button>
              <button
                onClick={() => scrollToSection('#ptt')}
                className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-white/20 flex items-center gap-2"
              >
                <FileText size={20} />
                Ver Plan de Transporte al Trabajo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Banner */}
      <div className="bg-white relative z-20">
        <div className="container-custom py-8">
          <div className="alert-banner rounded-xl p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-item-blue rounded-full flex items-center justify-center">
                  <AlertTriangle className="text-white" size={24} />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Nueva Ley 9/2025 de Movilidad Sostenible
                </h3>
                <p className="text-gray-700 mb-3">
                  A partir del 5 de diciembre de 2025, las empresas y entidades públicas 
                  con centros de trabajo de <strong>más de 200 personas trabajadoras</strong> (o 
                  100 por turno) están obligadas a implantar un <strong>Plan de Movilidad 
                  Sostenible al Trabajo (PTT)</strong> en un plazo de 24 meses.
                </p>
                <p className="text-gray-600 text-sm">
                  El incumplimiento puede derivar en sanciones de 101 a 2.000 euros. 
                  ITEM Consulting te ayuda a diseñar e implantar tu PTT.
                </p>
              </div>
              <div className="flex-shrink-0">
                <button
                  onClick={() => scrollToSection('#ptt')}
                  className="btn-primary whitespace-nowrap"
                >
                  Más información
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Intro Section */}
      <div className="bg-item-blue-light py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              ITEM Consulting
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Somos una consultora de ingeniería especializada en infraestructuras del transporte, 
              economía y movilidad. Con más de 10 años de experiencia, proporcionamos soluciones 
              integrales para el asesoramiento en planificación, gestión y análisis de sistemas 
              de transporte.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-item-blue rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">10+</span>
                </div>
                <h3 className="font-semibold text-gray-900">Años de experiencia</h3>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-item-blue rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">50+</span>
                </div>
                <h3 className="font-semibold text-gray-900">Proyectos realizados</h3>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-item-blue rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">15+</span>
                </div>
                <h3 className="font-semibold text-gray-900">Municipios</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
