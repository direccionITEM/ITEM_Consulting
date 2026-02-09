import { ArrowRight, AlertTriangle, FileText } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

export default function Hero() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('loadeddata', () => {
        console.log('Video cargado');
        setVideoLoaded(true);
      });
      video.addEventListener('error', (e) => {
        console.error('Error video:', e);
      });
      video.play().catch(err => console.log('Autoplay bloqueado:', err));
    }
  }, []);

  return (
    <section id="inicio" className="relative min-h-screen flex flex-col">
      {/* Hero Background */}
      <div className="relative flex-1 flex items-center overflow-hidden">
        
        {/* CAPA 1: Imagen de fallback (siempre visible como fondo) */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1920&h=1080&fit=crop')`,
            zIndex: 0
          }}
        />
        
        {/* CAPA 2: Video (encima de la imagen) */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ 
            zIndex: 1,
            opacity: videoLoaded ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out'
          }}
        >
          <source src="./videos/video1.mp4" type="video/mp4" />
        </video>
        
        {/* CAPA 3: Overlay oscuro (encima de todo) */}
        <div 
          className="hero-overlay absolute inset-0" 
          style={{ zIndex: 2 }}
        />

        {/* CAPA 4: Contenido (encima del overlay) */}
        <div className="container-custom relative z-10 py-32">
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

      {/* Alert Banner - Ley 9/2025 */}
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
                  ITEM Consulting te ayuda a diseñar e implantar tu PTT cumpliendo con 
                  toda la normativa.
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
              de transporte, ayudando a ayuntamientos y organismos públicos a transformar sus 
              ciudades hacia un modelo de movilidad más sostenible, eficiente y seguro.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-item-blue rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">10+</span>
                </div>
                <h3 className="font-semibold text-gray-900">Años de experiencia</h3>
                <p className="text-gray-600 text-sm mt-2">En consultoría y asesoría técnica</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-item-blue rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">50+</span>
                </div>
                <h3 className="font-semibold text-gray-900">Proyectos realizados</h3>
                <p className="text-gray-600 text-sm mt-2">PMUS, estudios de tráfico y consultorías</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-item-blue rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">15+</span>
                </div>
                <h3 className="font-semibold text-gray-900">Municipios</h3>
                <p className="text-gray-600 text-sm mt-2">Han confiado en nosotros</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
