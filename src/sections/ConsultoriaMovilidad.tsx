import { Bus, Building2, TreePine, Shield, Zap, FileCheck } from 'lucide-react';

const areas = [
  {
    icon: Bus,
    title: 'Transporte Urbano',
    items: [
      'Planes de Movilidad Urbana Sostenible (PMUS)',
      'Optimización de redes de tráfico',
      'Análisis de peatonalizaciones',
      'Diseño de carriles bici',
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
    ],
  },
  {
    icon: TreePine,
    title: 'Contaminación',
    items: [
      'Estudios medioambientales',
      'Diseño de rutas sostenibles',
      'Restricciones de tráfico por contaminación',
      'Reducción del impacto ambiental',
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
    ],
  },
];

const proyectosDestacados = [
  {
    title: 'PMUS de Alcantarilla',
    description: 'Plan de Movilidad Urbana Sostenible completo para el municipio.',
    year: '2021',
  },
  {
    title: 'Proyecto Integral de Ceutí',
    description: 'Transformación integral de la movilidad urbana del municipio.',
    year: '2022',
  },
  {
    title: 'Plan Estratégico de Alguazas',
    description: 'Redacción del PMUS con enfoque en sostenibilidad.',
    year: '2022',
  },
  {
    title: 'Plan Integral de Santomera',
    description: 'Plan estratégico de movilidad urbana sostenible.',
    year: '2022',
  },
  {
    title: 'Consultoría Next Generation EU - Yecla',
    description: 'Asesoramiento técnico para fondos europeos.',
    year: '2023',
  },
  {
    title: 'Consultoría Next Generation EU - Molina de Segura',
    description: 'Servicios de consultoría en materia de movilidad.',
    year: '2023',
  },
  {
    title: 'Movilidad Eléctrica Murcia',
    description: 'Estudio integral de soluciones de movilidad eléctrica.',
    year: '2023',
  },
  {
    title: 'Servicio MUyBICI',
    description: 'Optimización del servicio de bicicleta pública de Murcia.',
    year: '2023',
  },
];

export default function ConsultoriaMovilidad() {
  return (
    <section id="consultoria-movilidad" className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Consultoría de movilidad</h2>
          <div className="w-20 h-1 bg-item-blue mx-auto rounded-full mb-6" />
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Transformando ciudades hacia un futuro sostenible. Somos expertos en consultoría 
            de movilidad, ofreciendo planes y soluciones innovadoras para ayuntamientos 
            y organismos públicos.
          </p>
        </div>

        {/* Main Description */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Diseñando el futuro de la movilidad
            </h3>
            <p className="text-gray-700 leading-relaxed">
              En un mundo en constante evolución, la movilidad se convierte en un desafío creciente. 
              En ITEM Consulting, nos enorgullece ofrecer servicios de consultoría en movilidad que 
              van más allá de lo convencional. Nuestro equipo de expertos se sumerge en el 
              <strong> análisis exhaustivo</strong> de las necesidades específicas de cada ayuntamiento, 
              creando planes estratégicos que transforman la movilidad de manera integral.
            </p>
            <p className="text-gray-700 leading-relaxed">
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
              src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop"
              alt="Consultoría de movilidad urbana"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Areas de Especialización */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Áreas de especialización
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {areas.map((area, index) => (
              <div
                key={index}
                className="bg-item-blue-light rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-item-blue rounded-lg flex items-center justify-center mb-4">
                  <area.icon className="text-white" size={24} />
                </div>
                <h4 className="font-semibold text-gray-900 mb-3">{area.title}</h4>
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

        {/* Proyectos Destacados */}
        <div className="bg-item-blue-light rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Experiencia comprobada - Proyectos destacados
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {proyectosDestacados.map((proyecto, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-item-blue text-sm font-medium mb-2">
                  {proyecto.year}
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{proyecto.title}</h4>
                <p className="text-gray-600 text-sm">{proyecto.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
