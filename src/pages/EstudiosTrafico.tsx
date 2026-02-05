import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, TrafficCone, Zap, TrendingDown, CheckCircle, MapPin, FileText, Calculator, Eye } from 'lucide-react';

const servicios = [
  {
    icon: BarChart3,
    title: 'Aforos y conteos',
    description: 'Recopilación de datos de tráfico mediante aforos vehiculares, conteos de peatones y análisis de ocupación de aparcamientos para obtener una visión completa de la movilidad.',
    detalles: [
      'Aforos vehiculares clasificados por tipo de vehículo',
      'Conteos de peatones en pasos peatonales',
      'Estudios de origen-destino',
      'Análisis de ocupación de aparcamientos',
      'Estudios de velocidad',
    ],
  },
  {
    icon: TrafficCone,
    title: 'Microsimulación del tráfico',
    description: 'Modelización precisa de flujos de tráfico con software especializado PTV Vissim para predecir comportamientos y evaluar diferentes escenarios antes de su implementación.',
    detalles: [
      'Modelización de intersecciones complejas',
      'Simulación de escenarios de peatonalización',
      'Evaluación de impacto de nuevas infraestructuras',
      'Análisis de capacidad de redes viarias',
      'Simulación de eventos especiales',
    ],
  },
  {
    icon: Zap,
    title: 'Optimización semafórica',
    description: 'Ajuste de ciclos semafóricos para mejorar la fluidez del tráfico, reducir tiempos de espera y minimizar las emisiones de gases contaminantes.',
    detalles: [
      'Cálculo de tiempos de ciclo óptimos',
      'Coordinación de semáforos en corredores',
      'Implementación de semáforos actuados',
      'Análisis de tiempos de verde',
      'Evaluación de nivel de servicio',
    ],
  },
  {
    icon: TrendingDown,
    title: 'Análisis de capacidad',
    description: 'Evaluación de la capacidad de intersecciones y vías para identificar cuellos de botella y proponer soluciones de mejora basadas en estándares internacionales.',
    detalles: [
      'Análisis HCM (Highway Capacity Manual)',
      'Cálculo de nivel de servicio',
      'Identificación de puntos conflictivos',
      'Propuestas de mejora de capacidad',
      'Dimensionamiento de intersecciones',
    ],
  },
];

const beneficios = [
  { title: 'Reducción de congestiones', description: 'Disminución de atascos y mejora de la fluidez del tráfico' },
  { title: 'Menores emisiones', description: 'Reducción de emisiones de CO2 y contaminantes atmosféricos' },
  { title: 'Mayor seguridad', description: 'Mejora de la seguridad vial para todos los usuarios' },
  { title: 'Tiempos de viaje', description: 'Optimización de tiempos de desplazamiento' },
  { title: 'Decisiones basadas en datos', description: 'Información objetiva para la toma de decisiones' },
  { title: 'Propuestas fundamentadas', description: 'Medidas de mejora basadas en evidencia científica' },
];

const metodologia = [
  {
    paso: '1',
    titulo: 'Recopilación de datos',
    descripcion: 'Realizamos aforos, encuestas y análisis de la situación actual para obtener una imagen completa del tráfico en la zona de estudio.',
    icon: Eye,
  },
  {
    paso: '2',
    titulo: 'Análisis y diagnóstico',
    descripcion: 'Procesamos los datos recopilados para identificar problemáticas, cuellos de botella y oportunidades de mejora.',
    icon: BarChart3,
  },
  {
    paso: '3',
    titulo: 'Modelización',
    descripcion: 'Creamos modelos de tráfico que nos permiten simular diferentes escenarios y predecir el comportamiento de los usuarios.',
    icon: Calculator,
  },
  {
    paso: '4',
    titulo: 'Propuesta de medidas',
    descripcion: 'Diseñamos soluciones específicas adaptadas a las necesidades detectadas, con estimación de costes y beneficios.',
    icon: FileText,
  },
  {
    paso: '5',
    titulo: 'Seguimiento',
    descripcion: 'Evaluamos los resultados tras la implementación para verificar el cumplimiento de los objetivos establecidos.',
    icon: CheckCircle,
  },
];

export default function EstudiosTrafico() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="relative bg-item-blue py-20">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('/images/city-traffic-346562_960_720.jpg')` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Estudios de tráfico</h1>
          <div className="w-20 h-1 bg-white mx-auto rounded-full mb-6" />
          <p className="text-white/90 max-w-3xl mx-auto text-lg">
            Diseñamos e implementamos estrategias que mejoran la movilidad, ofreciendo 
            soluciones a medida para ayuntamientos y organismos públicos basadas en datos objetivos.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Transformación urbana basada en datos
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                En la era digital, la toma de decisiones fundamentada en datos es esencial. 
                Nuestros estudios de tráfico no solo se limitan a recopilar información; 
                van más allá. Utilizamos <strong>análisis avanzados</strong> para identificar patrones, 
                evaluar puntos críticos y proponer soluciones específicas.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Esta base sólida nos permite crear <strong>strategias personalizadas</strong> que aborden 
                los desafíos únicos de cada municipio, optimizando la circulación vial y 
                mejorando la calidad de vida de los ciudadanos.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Nuestro equipo utiliza herramientas de última generación como <strong>PTV Vissim</strong> para 
                la microsimulación del tráfico, lo que nos permite modelizar con precisión los flujos 
                vehiculares y evaluar el impacto de diferentes medidas antes de su implementación.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/images/2.png"
                alt="Estudio de tráfico"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="relative py-16">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url('/images/3.png')` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestros servicios</h2>
            <div className="w-20 h-1 bg-item-blue mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {servicios.map((servicio, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-14 h-14 bg-item-blue rounded-lg flex items-center justify-center mb-4">
                  <servicio.icon className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{servicio.title}</h3>
                <p className="text-gray-600 mb-4">{servicio.description}</p>
                <ul className="space-y-2">
                  {servicio.detalles.map((detalle, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                      <CheckCircle className="text-item-blue flex-shrink-0 mt-0.5" size={16} />
                      {detalle}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metodología */}
      <section className="relative py-16">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-5"
          style={{ backgroundImage: `url('/images/5.png')` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestra metodología</h2>
            <div className="w-20 h-1 bg-item-blue mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {metodologia.map((paso, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-item-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <paso.icon className="text-white" size={28} />
                </div>
                <div className="text-item-blue font-bold text-lg mb-2">Paso {paso.paso}</div>
                <h4 className="font-semibold text-gray-900 mb-2">{paso.titulo}</h4>
                <p className="text-gray-600 text-sm">{paso.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-16 bg-item-blue-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Beneficios para ayuntamientos</h2>
            <div className="w-20 h-1 bg-item-blue mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beneficios.map((beneficio, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm flex items-start gap-4">
                <CheckCircle className="text-item-blue flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{beneficio.title}</h4>
                  <p className="text-gray-600 text-sm">{beneficio.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Casos de éxito */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Casos de éxito</h2>
            <div className="w-20 h-1 bg-item-blue mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <img
                src="/images/3.png"
                alt="Estudio de tráfico en Murcia"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-2 text-item-blue mb-2">
                  <MapPin size={18} />
                  <span className="font-medium">Murcia - Entrada A-30</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Optimización de entrada a Murcia</h3>
                <p className="text-gray-600 mb-4">Estudio de tráfico en la entrada por A-30 con optimización de ciclos semafóricos.</p>
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-semibold">
                    -15% CO2
                  </div>
                  <p className="text-gray-600 text-sm">
                    Reducción de emisiones mediante optimización
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <img
                src="/images/4.png"
                alt="Análisis de capacidad"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-2 text-item-blue mb-2">
                  <MapPin size={18} />
                  <span className="font-medium">Alcantarilla</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Análisis de capacidad en centro urbano</h3>
                <p className="text-gray-600 mb-4">Evaluación de la capacidad de las principales intersecciones del centro urbano.</p>
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-semibold">
                    -20% accidentes
                  </div>
                  <p className="text-gray-600 text-sm">
                    Reducción estimada de accidentes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tecnología */}
      <section className="relative py-16">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url('/images/9.png')` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Tecnología de microsimulación
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                La microsimulación del tráfico se ha convertido en una herramienta fundamental para el 
                análisis y optimización de la movilidad urbana. Mediante software especializado como 
                <strong> PTV Vissim</strong>, podemos modelizar con precisión los flujos de tráfico a nivel 
                individual, simulando el comportamiento de cada vehículo y peatón.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Esto nos permite:
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="text-item-blue flex-shrink-0 mt-1" size={18} />
                  Evaluar el impacto de nuevas infraestructuras antes de su construcción
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="text-item-blue flex-shrink-0 mt-1" size={18} />
                  Optimizar ciclos semafóricos para mejorar la fluidez
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="text-item-blue flex-shrink-0 mt-1" size={18} />
                  Simular escenarios de peatonalización y restricciones de tráfico
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="text-item-blue flex-shrink-0 mt-1" size={18} />
                  Calcular emisiones de contaminantes y consumo energético
                </li>
              </ul>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/images/5.png"
                alt="Microsimulación de tráfico"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-item-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Necesitas un estudio de tráfico?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Contacta con nosotros y te ayudaremos a analizar y optimizar la movilidad 
            de tu municipio con herramientas de vanguardia.
          </p>
          <Link
            to="/contacto"
            className="inline-block bg-white text-item-blue px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Solicitar presupuesto
          </Link>
        </div>
      </section>
    </div>
  );
}
