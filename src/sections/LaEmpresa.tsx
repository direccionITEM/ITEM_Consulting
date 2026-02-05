import { Lightbulb, Shield, Users, Target, Award, Leaf } from 'lucide-react';

const valores = [
  {
    icon: Lightbulb,
    title: 'Innovación',
    description: 'Aplicamos I+D+i en cada proyecto, utilizando las últimas tecnologías para la modelización y análisis del transporte.',
  },
  {
    icon: Shield,
    title: 'Fiabilidad',
    description: 'Garantizamos soluciones técnicas sólidas basadas en análisis rigurosos y metodologías contrastadas.',
  },
  {
    icon: Users,
    title: 'Talento multidisciplinar',
    description: 'Equipo altamente cualificado con formación universitaria variada que aporta diversas disciplinas a nuestros servicios.',
  },
  {
    icon: Target,
    title: 'Eficacia',
    description: 'Nos enfocamos en conseguir resultados tangibles que superen las expectativas de nuestros clientes.',
  },
  {
    icon: Award,
    title: 'Calidad de resultados',
    description: 'Trabajo cercano y personalizado con Administraciones Públicas para servicios de consultoría de excelencia.',
  },
  {
    icon: Leaf,
    title: 'Compromiso medioambiental',
    description: 'Análisis social, económico y medioambiental integrado en todas nuestras soluciones de movilidad.',
  },
];

export default function LaEmpresa() {
  return (
    <section id="la-empresa" className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">La empresa</h2>
          <div className="w-20 h-1 bg-item-blue mx-auto rounded-full" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Text Content */}
          <div className="space-y-8">
            {/* Orígenes */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-item-blue rounded-lg flex items-center justify-center">
                  <Users className="text-white" size={18} />
                </span>
                Nuestros orígenes
              </h3>
              <p className="text-gray-700 leading-relaxed">
                ITEM Consulting nace tras años de trabajo en investigación de transportes y movilidad 
                en diferentes universidades. Con una contrastada producción científica, decidimos 
                dar el salto a la consultoría y asesoría técnica, manteniendo siempre nuestra 
                <strong> vocación innovadora</strong> y apostando por los medios tecnológicos más avanzados.
              </p>
            </div>

            {/* Enfoque */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-item-blue rounded-lg flex items-center justify-center">
                  <Target className="text-white" size={18} />
                </span>
                Nuestro enfoque
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Aplicamos la <strong>Innovación, Desarrollo e Investigación (I+D+i)</strong> en cada uno 
                de los trabajos realizados. Nuestro equipo ofrece más de 10 años de experiencia ejerciendo 
                labores de consultoría y asesoría técnica en la planificación del transporte, movilidad 
                y accesibilidad. Utilizamos herramientas de última generación como la microsimulación 
                para modelizar con precisión los flujos de tráfico.
              </p>
            </div>

            {/* Objetivos */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-item-blue rounded-lg flex items-center justify-center">
                  <Award className="text-white" size={18} />
                </span>
                Nuestros objetivos
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Proporcionar asesoramiento y apoyo a Administraciones y Organismos Multilaterales en 
                planificación, gestión y análisis de sistemas de transporte y movilidad. A través de 
                un continuo acompañamiento, informes técnicos y auditorías, buscamos obtener una 
                planificación urbana e integración medioambiental y territorial de las infraestructuras 
                de transporte.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop"
                alt="Equipo de trabajo ITEM Consulting"
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Stats overlay */}
            <div className="absolute -bottom-6 -left-6 bg-item-blue text-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl font-bold">2014</div>
              <div className="text-sm opacity-90">Año de fundación</div>
            </div>
          </div>
        </div>

        {/* Valores */}
        <div className="bg-item-blue-light rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Nuestros valores
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {valores.map((valor, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-item-blue-light rounded-lg flex items-center justify-center mb-4">
                  <valor.icon className="text-item-blue" size={24} />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{valor.title}</h4>
                <p className="text-gray-600 text-sm">{valor.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
