import { useEffect } from 'react';
import { Lightbulb, Shield, Users, Target, Award, Leaf, TrendingUp, MapPin } from 'lucide-react';

const valores = [
  {
    icon: Lightbulb,
    title: 'Innovación',
    description: 'Aplicamos I+D+i en cada proyecto, utilizando las últimas tecnologías para la modelización y análisis del transporte. Nuestro compromiso con la innovación nos lleva a estar siempre a la vanguardia de las herramientas y metodologías del sector.',
  },
  {
    icon: Shield,
    title: 'Fiabilidad',
    description: 'Garantizamos soluciones técnicas sólidas basadas en análisis rigurosos y metodologías contrastadas. Cada proyecto que realizamos cumple con los más altos estándares de calidad y precisión técnica.',
  },
  {
    icon: Users,
    title: 'Talento multidisciplinar',
    description: 'Equipo altamente cualificado con formación universitaria variada que aporta diversas disciplinas a nuestros servicios. Ingenieros, economistas, urbanistas y especialistas en medio ambiente trabajan conjuntamente.',
  },
  {
    icon: Target,
    title: 'Eficacia',
    description: 'Nos enfocamos en conseguir resultados tangibles que superen las expectativas de nuestros clientes. Cada propuesta está diseñada para maximizar el impacto positivo y minimizar los costes.',
  },
  {
    icon: Award,
    title: 'Calidad de resultados',
    description: 'Trabajo cercano y personalizado con Administraciones Públicas para servicios de consultoría de excelencia. Nuestros clientes nos avalan con su repetida confianza en nuevos proyectos.',
  },
  {
    icon: Leaf,
    title: 'Compromiso medioambiental',
    description: 'Análisis social, económico y medioambiental integrado en todas nuestras soluciones de movilidad. Creemos firmemente en la necesidad de transformar las ciudades hacia modelos de movilidad sostenible.',
  },
];

const areasEspecializacion = [
  {
    icon: TrendingUp,
    title: 'Planificación del Transporte',
    items: [
      'Modelos de demanda de transporte',
      'Estimaciones de tráfico y proyecciones',
      'Planificación estratégica de infraestructuras',
      'Evaluación de políticas de transporte',
      'Análisis de corredores y rutas',
      'Optimización de redes de transporte público',
      'Diseño de carriles bici y vías ciclistas',
      'Planificación de infraestructuras peatonales',
      'Estudios de accesibilidad y movilidad reducida',
      'Análisis de intermodalidad',
    ],
  },
  {
    icon: TrendingUp,
    title: 'Análisis Económico',
    items: [
      'Análisis coste-beneficio de proyectos',
      'Evaluación de impacto económico territorial',
      'Estudios de viabilidad financiera',
      'Búsqueda y gestión de financiación',
      'Análisis de rentabilidad social',
      'Evaluación de externalidades',
      'Estudios de eficiencia económica',
      'Presupuestación y control de costes',
      'Análisis de retorno de inversión',
      'Optimización de recursos',
    ],
  },
  {
    icon: MapPin,
    title: 'Urbanismo y Territorio',
    items: [
      'Ordenación del territorio y planificación urbanística',
      'Diseño urbano sostenible',
      'Recuperación y mejora de espacios públicos',
      'Integración territorial de infraestructuras',
      'Estudios de impacto urbanístico',
      'Planificación de usos del suelo',
      'Diseño de entornos urbanos seguros',
      'Análisis de calidad del espacio público',
      'Planificación de equipamientos',
      'Gestión del paisaje urbano',
    ],
  },
];

export default function Empresa() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="relative bg-item-blue py-20">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('/images/2.png')` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">La empresa</h1>
          <div className="w-20 h-1 bg-white mx-auto rounded-full" />
        </div>
      </section>

      {/* Intro */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                De la investigación universitaria a la consultoría de excelencia
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                ITEM Consulting nace tras años de trabajo en investigación de transportes y movilidad 
                en diferentes universidades. Con una contrastada producción científica, decidimos 
                dar el salto a la consultoría y asesoría técnica, manteniendo siempre nuestra 
                <strong> vocación innovadora</strong> y apostando por los medios tecnológicos más avanzados.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Nuestro equipo está formado por profesionales altamente cualificados con formación 
                universitaria variada que aporta diversas disciplinas a nuestros servicios. Ingenieros, 
                economistas, urbanistas y especialistas en medio ambiente trabajan conjuntamente para 
                ofrecer soluciones integrales.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Aplicamos la <strong>Innovación, Desarrollo e Investigación (I+D+i)</strong> en cada uno 
                de los trabajos realizados. Nuestro equipo ofrece experiencia ejerciendo 
                labores de consultoría y asesoría técnica en la planificación del transporte, movilidad 
                y accesibilidad.
              </p>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/images/meeting-2284501_960_720.jpg"
                  alt="Equipo ITEM Consulting"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Objetivos */}
      <section className="relative py-16">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url('/images/3.png')` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestros objetivos</h2>
            <div className="w-20 h-1 bg-item-blue mx-auto rounded-full" />
          </div>
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-700 leading-relaxed text-center mb-8">
              Proporcionar asesoramiento y apoyo a Administraciones y Organismos Multilaterales en 
              planificación, gestión y análisis de sistemas de transporte y movilidad. A través de 
              un continuo acompañamiento, informes técnicos y auditorías, buscamos obtener una 
              planificación urbana e integración medioambiental y territorial de las infraestructuras 
              de transporte.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                <div className="w-16 h-16 bg-item-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">1</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Planificación</h4>
                <p className="text-gray-600 text-sm">Diseñar estrategias de movilidad a largo plazo adaptadas a cada territorio</p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                <div className="w-16 h-16 bg-item-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">2</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Gestión</h4>
                <p className="text-gray-600 text-sm">Optimizar los sistemas de transporte existentes para mejorar su eficiencia</p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                <div className="w-16 h-16 bg-item-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">3</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Análisis</h4>
                <p className="text-gray-600 text-sm">Evaluar el impacto de las políticas de movilidad con rigor técnico</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="relative py-16">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-5"
          style={{ backgroundImage: `url('/images/7.png')` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestros valores</h2>
            <div className="w-20 h-1 bg-item-blue mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {valores.map((valor, index) => (
              <div
                key={index}
                className="bg-item-blue-light rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-item-blue rounded-lg flex items-center justify-center mb-4">
                  <valor.icon className="text-white" size={24} />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{valor.title}</h4>
                <p className="text-gray-600 text-sm">{valor.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Áreas de especialización */}
      <section className="relative py-16">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url('/images/8.png')` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Áreas de especialización</h2>
            <div className="w-20 h-1 bg-item-blue mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {areasEspecializacion.map((area, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-item-blue rounded-lg flex items-center justify-center">
                    <area.icon className="text-white" size={24} />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-lg">{area.title}</h4>
                </div>
                <ul className="space-y-2">
                  {area.items.map((item, i) => (
                    <li key={i} className="text-gray-600 text-sm flex items-start gap-2">
                      <span className="text-item-blue mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tecnología */}
      <section className="relative py-16">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-5"
          style={{ backgroundImage: `url('/images/code-1839406_960_720.jpg')` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Tecnología de vanguardia
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                En ITEM Consulting utilizamos las herramientas tecnológicas más avanzadas para el 
                análisis y modelización del transporte. Nuestro software principal incluye:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-gray-600">
                  <span className="text-item-blue font-bold">PTV Vissim</span>
                  <span>- Microsimulación del tráfico a nivel vehicular y peatonal</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <span className="text-item-blue font-bold">PTV Visum</span>
                  <span>- Modelos macroscópicos de demanda de transporte</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <span className="text-item-blue font-bold">ArcGIS</span>
                  <span>- Sistemas de información geográfica</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <span className="text-item-blue font-bold">Python/R</span>
                  <span>- Análisis de datos y machine learning</span>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/images/code-1839406_960_720.jpg"
                alt="Tecnología de análisis de datos"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
