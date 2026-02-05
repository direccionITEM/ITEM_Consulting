import { AlertCircle, Users, Calendar, FileText, CheckCircle, Bike, Bus, Car, Home, Leaf, Shield } from 'lucide-react';

const obligaciones = [
  {
    icon: Users,
    title: 'Empresas obligadas',
    description: 'Empresas y entidades del sector público con centros de trabajo de más de 200 personas trabajadoras o 100 por turno.',
  },
  {
    icon: Calendar,
    title: 'Plazo de implantación',
    description: '24 meses desde la entrada en vigor de la ley (5 de diciembre de 2025) → Fecha límite: 5 de diciembre de 2027.',
  },
  {
    icon: FileText,
    title: 'Negociación obligatoria',
    description: 'El plan debe ser objeto de negociación con la representación legal de las personas trabajadoras.',
  },
];

const medidas = [
  {
    icon: Bike,
    title: 'Movilidad activa',
    description: 'Fomento del desplazamiento a pie y en bicicleta con infraestructuras seguras.',
  },
  {
    icon: Bus,
    title: 'Transporte colectivo',
    description: 'Impulso del uso de autobuses, microbuses y transporte público organizado.',
  },
  {
    icon: Car,
    title: 'Movilidad compartida',
    description: 'Carsharing, motosharing y carpooling entre empleados.',
  },
  {
    icon: Home,
    title: 'Teletrabajo',
    description: 'Medidas de teletrabajo y flexibilidad horaria cuando sea posible.',
  },
  {
    icon: Leaf,
    title: 'Vehículos de bajas emisiones',
    description: 'Facilitar el uso y recarga de vehículos eléctricos e híbridos.',
  },
  {
    icon: Shield,
    title: 'Seguridad vial',
    description: 'Medidas para mejorar la seguridad y prevenir accidentes in itinere.',
  },
];

const proceso = [
  {
    step: '1',
    title: 'Diagnóstico',
    description: 'Análisis de la situación actual de movilidad mediante encuestas y recopilación de datos.',
  },
  {
    step: '2',
    title: 'Diseño',
    description: 'Definición de objetivos y paquete de medidas ajustadas al centro de trabajo.',
  },
  {
    step: '3',
    title: 'Negociación',
    description: 'Tramitación del plan ante la representación de los trabajadores.',
  },
  {
    step: '4',
    title: 'Implantación',
    description: 'Puesta en marcha de las medidas definidas en el plan.',
  },
  {
    step: '5',
    title: 'Seguimiento',
    description: 'Evaluación bianual con informes de implantación y actualización del plan.',
  },
];

export default function PTT() {
  return (
    <section id="ptt" className="section-padding bg-item-blue-light">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <AlertCircle size={16} />
            Obligación legal - Ley 9/2025
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Plan de Transporte al Trabajo | PTT
          </h2>
          <div className="w-20 h-1 bg-item-blue mx-auto rounded-full mb-6" />
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            La nueva <strong>Ley 9/2025, de 3 de diciembre, de Movilidad Sostenible</strong> establece 
            la obligatoriedad de implantar Planes de Movilidad Sostenible al Trabajo para determinados 
            centros de trabajo.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-4 mb-12">
          <p className="text-amber-800 text-sm">
            <strong>Nota informativa:</strong> Este contenido tiene carácter divulgativo y no sustituye 
            al asesoramiento legal especializado. Para información específica sobre su situación, 
            consulte con profesionales cualificados.
          </p>
        </div>

        {/* Obligaciones */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm mb-12">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            ¿Quién está obligado?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {obligaciones.map((item, index) => (
              <div
                key={index}
                className="text-center p-6 bg-item-blue-light rounded-xl"
              >
                <div className="w-14 h-14 bg-item-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="text-white" size={28} />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 bg-red-50 rounded-lg text-center">
            <p className="text-red-800 font-medium">
              <AlertCircle className="inline mr-2" size={18} />
              Sanciones por incumplimiento: multas de 101 a 2.000 euros
            </p>
          </div>
        </div>

        {/* Medidas */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Medidas que debe incluir un PTT
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {medidas.map((medida, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-item-blue-light rounded-lg flex items-center justify-center mb-4">
                  <medida.icon className="text-item-blue" size={24} />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{medida.title}</h4>
                <p className="text-gray-600 text-sm">{medida.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Proceso */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm mb-12">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Cómo elaboramos tu PTT
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {proceso.map((paso, index) => (
              <div
                key={index}
                className="text-center relative"
              >
                <div className="w-12 h-12 bg-item-blue text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {paso.step}
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{paso.title}</h4>
                <p className="text-gray-600 text-sm">{paso.description}</p>
                {index < proceso.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[60%] w-[80%] h-0.5 bg-item-blue-light" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Cómo ayudamos */}
        <div className="bg-item-blue rounded-2xl p-8 md:p-12 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                ¿Cómo puede ayudarte ITEM Consulting?
              </h3>
              <p className="text-white/90 mb-6 leading-relaxed">
                En ITEM Consulting acompañamos a las empresas en todo el proceso de elaboración, 
                implantación y seguimiento del Plan de Transporte al Trabajo, garantizando el 
                cumplimiento de la normativa y maximizando los beneficios de la movilidad sostenible.
              </p>
              <ul className="space-y-3">
                {[
                  'Diagnóstico completo de la movilidad actual',
                  'Diseño de medidas personalizadas',
                  'Gestión de la negociación con representantes',
                  'Implantación y seguimiento del plan',
                  'Informes bianuales de evaluación',
                  'Registro en el EDIM',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-white/80" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center lg:text-right">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 inline-block">
                <p className="text-4xl font-bold mb-2">24</p>
                <p className="text-white/80">meses de plazo</p>
                <p className="text-sm text-white/60 mt-2">Hasta el 5 de diciembre de 2027</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
