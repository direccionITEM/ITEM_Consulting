import { BarChart3, TrafficCone, Zap, TrendingDown, CheckCircle, MapPin } from 'lucide-react';

const servicios = [
  {
    icon: BarChart3,
    title: 'Aforos y conteos',
    description: 'Recopilación de datos de tráfico mediante aforos vehiculares y conteos de peatones para análisis exhaustivos.',
  },
  {
    icon: TrafficCone,
    title: 'Microsimulación',
    description: 'Modelización precisa de flujos de tráfico con software especializado como PTV Vissim para predecir comportamientos.',
  },
  {
    icon: Zap,
    title: 'Optimización semafórica',
    description: 'Ajuste de ciclos semafóricos para mejorar la fluidez del tráfico y reducir tiempos de espera.',
  },
  {
    icon: TrendingDown,
    title: 'Análisis de capacidad',
    description: 'Evaluación de la capacidad de intersecciones y vías para identificar cuellos de botella.',
  },
];

const beneficios = [
  'Reducción de congestiones y atascos',
  'Disminución de emisiones de CO2',
  'Mejora de la seguridad vial',
  'Optimización de tiempos de viaje',
  'Datos objetivos para la toma de decisiones',
  'Propuestas de mejora basadas en evidencia',
];

export default function EstudiosTrafico() {
  return (
    <section id="estudios-trafico" className="section-padding bg-item-blue-light">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Estudios de tráfico</h2>
          <div className="w-20 h-1 bg-item-blue mx-auto rounded-full mb-6" />
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Diseñamos e implementamos estrategias que mejoran la movilidad, ofreciendo 
            soluciones a medida para ayuntamientos y organismos públicos.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Description */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Transformación urbana basada en datos
            </h3>
            <p className="text-gray-700 leading-relaxed">
              En la era digital, la toma de decisiones fundamentada en datos es esencial. 
              Nuestros estudios de tráfico no solo se limitan a recopilar información; 
              van más allá. Utilizamos <strong>análisis avanzados</strong> para identificar patrones, 
              evaluar puntos críticos y proponer soluciones específicas.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Esta base sólida nos permite crear <strong>strategias personalizadas</strong> que aborden 
              los desafíos únicos de cada municipio, optimizando la circulación vial y 
              mejorando la calidad de vida de los ciudadanos.
            </p>

            {/* Servicios Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {servicios.map((servicio, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 bg-item-blue-light rounded-lg flex items-center justify-center mb-3">
                    <servicio.icon className="text-item-blue" size={20} />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">{servicio.title}</h4>
                  <p className="text-gray-600 text-sm">{servicio.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Case Study */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=800&h=500&fit=crop"
                alt="Estudio de tráfico en Murcia"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-2 text-item-blue mb-3">
                  <MapPin size={18} />
                  <span className="font-medium text-sm">Murcia - Entrada A-30</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  Caso de éxito: Estudio de tráfico en Murcia
                </h4>
                <p className="text-gray-700 mb-4">
                  Con la finalidad de mejorar el tránsito de vehículos dentro del municipio 
                  de Murcia, analizamos la movilidad en la entrada por A-30 en la salida 142 
                  y la intersección con Calle Pintor Sobejano y Avenida Juan de la Cierva.
                </p>
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-semibold">
                    -15% CO2
                  </div>
                  <p className="text-gray-600 text-sm">
                    Reducción de emisiones mediante optimización de ciclos semafóricos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Beneficios */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Beneficios para ayuntamientos y administraciones
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {beneficios.map((beneficio, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-item-blue-light rounded-lg"
              >
                <CheckCircle className="text-item-blue flex-shrink-0" size={20} />
                <span className="text-gray-700">{beneficio}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
