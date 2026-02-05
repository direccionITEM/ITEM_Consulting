import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bus, Building2, TreePine, Shield, Zap, FileCheck, CheckCircle, Leaf, Users, MapPin, TrendingUp, Lightbulb } from 'lucide-react';

const areas = [
  {
    icon: Bus,
    title: 'Transporte Urbano',
    items: [
      'Planes de Movilidad Urbana Sostenible (PMUS)',
      'Optimización de redes de tráfico',
      'Análisis de peatonalizaciones',
      'Diseño de carriles bici',
      'Planificación de transporte público',
      'Modelos de demanda de transporte',
    ],
  },
  {
    icon: Building2,
    title: 'Urbanismo y Sostenibilidad',
    items: [
      'Adaptación de infraestructuras al cambio climático',
      'Plan de recuperación de espacios públicos',
      'Peatonalización de zonas urbanas',
      'Intermodalidad',
      'Diseño urbano sostenible',
      'Integración territorial',
    ],
  },
  {
    icon: TreePine,
    title: 'Contaminación y Medio Ambiente',
    items: [
      'Estudios medioambientales',
      'Diseño de rutas sostenibles',
      'Restricciones de tráfico por contaminación',
      'Reducción del impacto ambiental',
      'Cálculo de emisiones de CO2',
      'Evaluación de calidad del aire',
    ],
  },
  {
    icon: Shield,
    title: 'Seguridad Vial',
    items: [
      'Disminución de puntos conflictivos',
      'Creación de itinerarios seguros',
      'Evaluación de impacto en seguridad vial',
      'Planes Locales de Seguridad Vial',
      'Auditorías de seguridad vial',
      'Caminos escolares seguros',
    ],
  },
];

const proyectosDestacados = [
  {
    title: 'PMUS de Alcantarilla',
    description: 'Plan de Movilidad Urbana Sostenible completo para el municipio.',
    resultados: ['Reducción de emisiones prevista', 'Carril bici implementado', 'Zona 30 en centro'],
  },
  {
    title: 'Proyecto Integral de Ceutí',
    description: 'Transformación integral de la movilidad urbana del municipio.',
    resultados: ['Infraestructura ciclista', 'Rediseño de transporte público', 'Aparcamientos disuasorios'],
  },
  {
    title: 'Plan Estratégico de Alguazas',
    description: 'Redacción del PMUS con enfoque en la reducción de emisiones.',
    resultados: ['Plan simplificado adaptado', 'Medidas de bajo coste', 'Financiación europea'],
  },
  {
    title: 'Plan Integral de Santomera',
    description: 'Plan estratégico de movilidad urbana sostenible.',
    resultados: ['Conexión ciclista', 'Mejora de frecuencias de bus', 'Intermodalidad'],
  },
  {
    title: 'Consultoría Next Generation EU - Yecla',
    description: 'Asesoramiento técnico para la preparación de proyectos financiables.',
    resultados: ['Proyectos aprobados', 'Financiación conseguida', 'Carril bici y peatonalización'],
  },
  {
    title: 'Consultoría Next Generation EU - Molina',
    description: 'Servicios de consultoría en materia de movilidad.',
    resultados: ['Optimización de transporte público', 'Electrificación de flota', 'Puntos de recarga'],
  },
  {
    title: 'Movilidad Eléctrica Murcia',
    description: 'Estudio integral de soluciones de movilidad eléctrica.',
    resultados: ['Plan de electrificación', 'Red de puntos de recarga', 'Flota municipal eléctrica'],
  },
  {
    title: 'Servicio MUyBICI',
    description: 'Optimización del servicio de bicicleta pública de Murcia.',
    resultados: ['Nuevas estaciones', 'Más usuarios', 'Reducción de desequilibrios'],
  },
];

const pmusInfo = [
  {
    title: '¿Qué es un PMUS?',
    content: 'El Plan de Movilidad Urbana Sostenible (PMUS) es un instrumento de planificación que define las líneas estratégicas para organizar y gestionar la movilidad de un municipio de forma sostenible, eficiente y segura.',
  },
  {
    title: '¿Quién está obligado?',
    content: 'Según la normativa vigente, los municipios de más de 50.000 habitantes deben elaborar un PMUS completo, y los de 20.000 a 50.000 habitantes un PMUS simplificado.',
  },
  {
    title: '¿Cuál es el plazo?',
    content: 'Los municipios tienen un plazo establecido para aprobar su PMUS, con revisiones periódicas e informes de seguimiento.',
  },
  {
    title: '¿Qué incluye?',
    content: 'Un PMUS incluye diagnóstico de movilidad, objetivos de reducción de emisiones, medidas concretas, indicadores de seguimiento y plan de implementación.',
  },
];

export default function ConsultoriaMovilidad() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="relative bg-item-blue py-20">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('/images/amsterdam-2261212_960_720.jpg')` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Consultoría de movilidad</h1>
          <div className="w-20 h-1 bg-white mx-auto rounded-full mb-6" />
          <p className="text-white/90 max-w-3xl mx-auto text-lg">
            Transformando ciudades hacia un futuro sostenible. Somos expertos en consultoría 
            de movilidad, ofreciendo planes y soluciones innovadoras para ayuntamientos 
            y organismos públicos.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Diseñando el futuro de la movilidad
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                En un mundo en constante evolución, la movilidad se convierte en un desafío creciente. 
                En ITEM Consulting, nos enorgullece ofrecer servicios de consultoría en movilidad que 
                van más allá de lo convencional. Nuestro equipo de expertos se sumerge en el 
                <strong> análisis exhaustivo</strong> de las necesidades específicas de cada ayuntamiento, 
                creando planes estratégicos que transforman la movilidad de manera integral.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                La <strong>sostenibilidad</strong> es el núcleo de nuestras propuestas. Nos esforzamos por 
                integrar soluciones que no solo optimicen la eficiencia del transporte, sino que también 
                reduzcan la huella ambiental. Desde la implementación de sistemas de transporte público 
                ecoamigables hasta la promoción del transporte no motorizado.
              </p>
              <div className="flex items-center gap-4 pt-4">
                <div className="flex items-center gap-2 text-item-blue">
                  <Zap size={20} />
                  <span className="font-medium">Tecnología de vanguardia</span>
                </div>
                <div className="flex items-center gap-2 text-item-blue">
                  <FileCheck size={20} />
                  <span className="font-medium">Colaboración transparente</span>
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/images/6.png"
                alt="Consultoría de movilidad urbana"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PMUS Info */}
      <section className="relative py-16">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url('/images/4.png')` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Planes de Movilidad Urbana Sostenible (PMUS)</h2>
            <div className="w-20 h-1 bg-item-blue mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pmusInfo.map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-3 text-item-blue">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.content}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-4">
            <p className="text-amber-800 text-sm">
              <strong>Nota importante:</strong> Sin un PMUS aprobado, los municipios <strong>no podrán acceder a subvenciones</strong> de movilidad o sostenibilidad. 
              <Link to="/contacto" className="text-item-blue hover:underline ml-1">Contacta con nosotros</Link> para más información.
            </p>
          </div>
        </div>
      </section>

      {/* Áreas de Especialización */}
      <section className="relative py-16">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-5"
          style={{ backgroundImage: `url('/images/8.png')` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Áreas de especialización</h2>
            <div className="w-20 h-1 bg-item-blue mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {areas.map((area, index) => (
              <div key={index} className="bg-item-blue-light rounded-xl p-6">
                <div className="w-12 h-12 bg-item-blue rounded-lg flex items-center justify-center mb-4">
                  <area.icon className="text-white" size={24} />
                </div>
                <h4 className="font-semibold text-gray-900 mb-3 text-lg">{area.title}</h4>
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

      {/* Metodología PMUS */}
      <section className="relative py-16">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url('/images/10.png')` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Metodología para la elaboración de PMUS</h2>
            <div className="w-20 h-1 bg-item-blue mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { paso: '1', titulo: 'Diagnóstico', descripcion: 'Análisis de la situación actual de movilidad, recopilación de datos y encuestas' },
              { paso: '2', titulo: 'Participación', descripcion: 'Procesos de participación ciudadana para recoger propuestas y demandas' },
              { paso: '3', titulo: 'Propuesta', descripcion: 'Diseño de medidas y estrategias de movilidad sostenible' },
              { paso: '4', titulo: 'Evaluación', descripcion: 'Análisis de impacto ambiental y económico de las medidas propuestas' },
              { paso: '5', titulo: 'Aprobación', descripcion: 'Tramitación administrativa y aprobación del plan' },
            ].map((paso, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-item-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">{paso.paso}</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{paso.titulo}</h4>
                <p className="text-gray-600 text-sm">{paso.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proyectos Destacados */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Experiencia comprobada - Proyectos destacados</h2>
            <div className="w-20 h-1 bg-item-blue mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {proyectosDestacados.map((proyecto, index) => (
              <div key={index} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-gray-900 mb-2">{proyecto.title}</h4>
                <p className="text-gray-600 text-sm mb-3">{proyecto.description}</p>
                <div className="space-y-1">
                  {proyecto.resultados.map((resultado, i) => (
                    <div key={i} className="flex items-center gap-1 text-xs text-gray-500">
                      <CheckCircle className="text-item-blue" size={12} />
                      {resultado}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-16 bg-item-blue-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Beneficios de contratar nuestros servicios</h2>
            <div className="w-20 h-1 bg-item-blue mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Leaf, title: 'Cumplimiento normativo', desc: 'Cumple con la normativa vigente y accede a financiación europea' },
              { icon: TrendingUp, title: 'Reducción de emisiones', desc: 'Disminuye la huella de carbono de tu municipio' },
              { icon: Users, title: 'Mejora de calidad de vida', desc: 'Espacios más habitables y seguros para los ciudadanos' },
              { icon: MapPin, title: 'Optimización del espacio', desc: 'Mejor aprovechamiento del espacio público' },
              { icon: Lightbulb, title: 'Innovación', desc: 'Soluciones basadas en las últimas tecnologías' },
              { icon: FileCheck, title: 'Trazabilidad', desc: 'Informes listos para auditoría y seguimiento' },
            ].map((beneficio, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 bg-item-blue-light rounded-lg flex items-center justify-center flex-shrink-0">
                  <beneficio.icon className="text-item-blue" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{beneficio.title}</h4>
                  <p className="text-gray-600 text-sm">{beneficio.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-item-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Necesitas elaborar un PMUS?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Contacta con nosotros y te ayudaremos a diseñar e implementar tu Plan de Movilidad 
            Urbana Sostenible, cumpliendo con toda la normativa y accediendo a financiación europea.
          </p>
          <Link
            to="/contacto"
            className="inline-block bg-white text-item-blue px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Solicitar información
          </Link>
        </div>
      </section>
    </div>
  );
}
