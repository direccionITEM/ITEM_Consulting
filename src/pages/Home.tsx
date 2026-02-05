import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, AlertTriangle, TrendingUp, Users, Award, Leaf, Lightbulb, Target, Shield } from 'lucide-react';

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/1.png')`,
          }}
        >
          <div className="hero-overlay absolute inset-0" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-3xl animate-fade-in">
            {/* Nuevo encabezado principal */}
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-light text-white/90 mb-2">
                ITEM Consulting
              </h2>
              <p className="text-lg text-item-blue font-medium">
                Ingeniería, Transporte, Economía y Movilidad
              </p>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Especialistas en{' '}
              <span className="text-item-blue">infraestructuras del transporte</span>{' '}
              y movilidad sostenible
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Soluciones innovadoras para la planificación, gestión y análisis de 
              sistemas de transporte y movilidad urbana. Transformamos ciudades hacia 
              un modelo de movilidad más eficiente, seguro y respetuoso con el medio ambiente.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contacto"
                className="btn-primary flex items-center gap-2"
              >
                Contactar
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Alert Banner - Ley 9/2025 */}
      <section className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="alert-banner rounded-xl p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-item-blue rounded-full flex items-center justify-center">
                  <AlertTriangle className="text-white" size={24} />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Ley de Movilidad Sostenible
                </h3>
                <p className="text-gray-700 mb-3">
                  Las empresas y entidades públicas con centros de trabajo de <strong>más de 200 personas trabajadoras</strong> 
                  están obligadas a implantar un <strong>Plan de Movilidad Sostenible al Trabajo (PTT)</strong>.
                </p>
                <p className="text-gray-600 text-sm">
                  El incumplimiento puede derivar en sanciones. ITEM Consulting te ayuda a diseñar e implantar 
                  tu PTT cumpliendo con toda la normativa.
                </p>
              </div>
              <div className="flex-shrink-0">
                <Link
                  to="/ptt"
                  className="btn-primary whitespace-nowrap"
                >
                  Plan de Transporte al Trabajo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="relative py-16">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url('/images/2.png')` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              ITEM Consulting
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Somos una consultora de ingeniería especializada en infraestructuras del transporte, 
              economía y movilidad. Proporcionamos soluciones integrales para el asesoramiento en 
              planificación, gestión y análisis de sistemas de transporte, ayudando a ayuntamientos 
              y organismos públicos a transformar sus ciudades hacia un modelo de movilidad más sostenible, 
              eficiente y seguro.
            </p>
            <p className="text-gray-600 mb-10">
              Nuestro equipo multidisciplinar combina conocimientos técnicos en ingeniería de transporte, 
              urbanismo, economía y medio ambiente para ofrecer soluciones integrales que respondan 
              a los desafíos complejos de la movilidad contemporánea.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      </section>

      {/* Services Section */}
      <section className="relative py-16">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-5"
          style={{ backgroundImage: `url('/images/amsterdam-2261212_960_720.jpg')` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestros servicios</h2>
            <div className="w-20 h-1 bg-item-blue mx-auto rounded-full mb-6" />
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ofrecemos soluciones integrales en materia de movilidad y transporte, 
              desde el diagnóstico hasta la implementación y seguimiento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-item-blue-light rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-item-blue rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Estudios de tráfico</h3>
              <p className="text-gray-600 mb-4">
                Análisis exhaustivo de flujos vehiculares mediante aforos, microsimulación 
                y modelización del tráfico para optimizar la circulación y reducir emisiones.
              </p>
              <Link to="/estudios-trafico" className="text-item-blue font-medium hover:underline flex items-center gap-1">
                Saber más <ArrowRight size={16} />
              </Link>
            </div>

            {/* Service 2 */}
            <div className="bg-item-blue-light rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-item-blue rounded-lg flex items-center justify-center mb-4">
                <Leaf className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Consultoría de movilidad</h3>
              <p className="text-gray-600 mb-4">
                Diseño de Planes de Movilidad Urbana Sostenible (PMUS), optimización de 
                redes de transporte público y asesoramiento a administraciones públicas.
              </p>
              <Link to="/consultoria-movilidad" className="text-item-blue font-medium hover:underline flex items-center gap-1">
                Saber más <ArrowRight size={16} />
              </Link>
            </div>

            {/* Service 3 */}
            <div className="bg-item-blue-light rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-item-blue rounded-lg flex items-center justify-center mb-4">
                <Award className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Plan de Transporte al Trabajo</h3>
              <p className="text-gray-600 mb-4">
                Elaboración e implantación de PTT conforme a la normativa vigente, incluyendo 
                diagnóstico, medidas, negociación y registro en el EDIM.
              </p>
              <Link to="/ptt" className="text-item-blue font-medium hover:underline flex items-center gap-1">
                Saber más <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative py-16">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url('/images/4.png')` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Por qué elegir ITEM Consulting?</h2>
            <div className="w-20 h-1 bg-item-blue mx-auto rounded-full mb-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 bg-item-blue-light rounded-lg flex items-center justify-center flex-shrink-0">
                <Lightbulb className="text-item-blue" size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Innovación</h4>
                <p className="text-gray-600 text-sm">Aplicamos I+D+i en cada proyecto, utilizando las últimas tecnologías para la modelización y análisis del transporte.</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 bg-item-blue-light rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="text-item-blue" size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Fiabilidad</h4>
                <p className="text-gray-600 text-sm">Garantizamos soluciones técnicas sólidas basadas en análisis rigurosos y metodologías contrastadas.</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 bg-item-blue-light rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="text-item-blue" size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Talento multidisciplinar</h4>
                <p className="text-gray-600 text-sm">Equipo altamente cualificado con formación universitaria variada que aporta diversas disciplinas.</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 bg-item-blue-light rounded-lg flex items-center justify-center flex-shrink-0">
                <Target className="text-item-blue" size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Eficacia</h4>
                <p className="text-gray-600 text-sm">Nos enfocamos en conseguir resultados tangibles que superen las expectativas de nuestros clientes.</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 bg-item-blue-light rounded-lg flex items-center justify-center flex-shrink-0">
                <Award className="text-item-blue" size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Calidad de resultados</h4>
                <p className="text-gray-600 text-sm">Trabajo cercano y personalizado con Administraciones Públicas para servicios de consultoría de excelencia.</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 bg-item-blue-light rounded-lg flex items-center justify-center flex-shrink-0">
                <Leaf className="text-item-blue" size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Compromiso medioambiental</h4>
                <p className="text-gray-600 text-sm">Análisis social, económico y medioambiental integrado en todas nuestras soluciones de movilidad.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-item-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Necesitas asesoramiento en movilidad sostenible?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Contacta con nosotros y descubre cómo podemos ayudarte a transformar 
            la movilidad de tu municipio o empresa.
          </p>
          <Link
            to="/contacto"
            className="inline-block bg-white text-item-blue px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Contactar ahora
          </Link>
        </div>
      </section>
    </div>
  );
}
