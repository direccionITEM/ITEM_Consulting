import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Users, Calendar, FileText, CheckCircle, Bike, Bus, Car, Home, Leaf, Shield, TrendingUp, Euro, Building, Heart, Star } from 'lucide-react';

const obligaciones = [
  {
    icon: Users,
    title: 'Empresas obligadas',
    description: 'Empresas y entidades del sector público con centros de trabajo de más de 200 personas trabajadoras o 100 por turno.',
  },
  {
    icon: Calendar,
    title: 'Plazo de implantación',
    description: 'Las empresas disponen de un plazo razonable para elaborar e implantar su Plan de Movilidad Sostenible al Trabajo.',
  },
  {
    icon: FileText,
    title: 'Negociación obligatoria',
    description: 'El plan debe ser objeto de negociación con la representación legal de las personas trabajadoras o comisión sindical.',
  },
];

const medidas = [
  {
    icon: Bike,
    title: 'Movilidad activa',
    description: 'Fomento del desplazamiento a pie y en bicicleta con infraestructuras seguras, aparcabicis y duchas en el centro de trabajo.',
    ejemplos: ['Carriles bici seguros hasta el centro', 'Aparcamientos cubiertos para bicicletas', 'Vestuarios y duchas para ciclistas', 'Programa de bicicleta eléctrica'],
  },
  {
    icon: Bus,
    title: 'Transporte colectivo',
    description: 'Impulso del uso de autobuses, microbuses y transporte público organizado mediante acuerdos con operadores.',
    ejemplos: ['Acuerdos con empresas de transporte', 'Lanzaderas desde puntos de interés', 'Subvención de abonos de transporte', 'Horarios adaptados a turnos'],
  },
  {
    icon: Car,
    title: 'Movilidad compartida',
    description: 'Carsharing, motosharing y carpooling entre empleados para reducir el número de vehículos privados.',
    ejemplos: ['Plataforma de carpooling interna', 'Plazas de parking preferentes para compartidos', 'Incentivos económicos al carpooling', 'Vehículos compartidos de empresa'],
  },
  {
    icon: Home,
    title: 'Teletrabajo',
    description: 'Medidas de teletrabajo y flexibilidad horaria cuando sea posible, reduciendo desplazamientos innecesarios.',
    ejemplos: ['Días de teletrabajo semanales', 'Horarios flexibles de entrada/salida', 'Jornada intensiva en verano', 'Reuniones online vs. presenciales'],
  },
  {
    icon: Leaf,
    title: 'Vehículos de bajas emisiones',
    description: 'Facilitar el uso y recarga de vehículos eléctricos e híbridos enchufables mediante infraestructura adecuada.',
    ejemplos: ['Puntos de recarga en parking', 'Plazas preferentes VEH', 'Subvención a compra de VEH', 'Flota empresarial electrificada'],
  },
  {
    icon: Shield,
    title: 'Seguridad vial',
    description: 'Medidas para mejorar la seguridad y prevenir accidentes in itinere, incluyendo formación específica.',
    ejemplos: ['Formación en conducción segura', 'Campañas de seguridad vial', 'Mantenimiento preventivo de vehículos', 'Rutas seguras al trabajo'],
  },
];

const proceso = [
  {
    step: '1',
    title: 'Diagnóstico',
    description: 'Análisis de la situación actual de movilidad mediante encuestas a trabajadores, recopilación de datos de accesos y estudio de las infraestructuras existentes.',
  },
  {
    step: '2',
    title: 'Diseño',
    description: 'Definición de objetivos y paquete de medidas ajustadas al centro de trabajo, con estimación de costes y beneficios.',
  },
  {
    step: '3',
    title: 'Negociación',
    description: 'Tramitación del plan ante la representación de los trabajadores, recogiendo aportaciones y consensuando medidas.',
  },
  {
    step: '4',
    title: 'Implantación',
    description: 'Puesta en marcha de las medidas definidas en el plan, con comunicación a la plantilla y seguimiento inicial.',
  },
  {
    step: '5',
    title: 'Seguimiento',
    description: 'Evaluación periódica con informes de implantación, indicadores de cumplimiento y actualización del plan.',
  },
];

const beneficiosEmpresa = [
  { icon: Euro, title: 'Ahorro económico', desc: 'Reducción de costes de aparcamiento, seguros y mantenimiento de flotas' },
  { icon: Leaf, title: 'Huella de carbono', desc: 'Contribución a los objetivos ESG y reducción de Alcance 3' },
  { icon: Users, title: 'Bienestar laboral', desc: 'Mejora de la satisfacción y retención del talento' },
  { icon: TrendingUp, title: 'Productividad', desc: 'Menos estrés por atascos y desplazamientos más eficientes' },
  { icon: Building, title: 'Imagen corporativa', desc: 'Posicionamiento como empresa sostenible y responsable' },
  { icon: FileText, title: 'Acceso a subvenciones', desc: 'Posibilidad de financiación para medidas de movilidad' },
];

const motivaciones = [
  {
    icon: CheckCircle,
    title: 'Cumplimiento normativo',
    description: 'Adoptar un PTT garantiza el cumplimiento de la legislación vigente en materia de movilidad sostenible, evitando posibles sanciones y demostrando el compromiso de tu empresa con las normativas ambientales y de seguridad laboral.',
  },
  {
    icon: Star,
    title: 'Ventaja competitiva',
    description: 'Las empresas con planes de movilidad sostenible se posicionan como líderes en innovación y responsabilidad corporativa, mejorando su reputación ante clientes, inversores y partners comerciales que valoran cada vez más la sostenibilidad.',
  },
  {
    icon: Heart,
    title: 'Bienestar laboral',
    description: 'Un PTT bien diseñado mejora significativamente la calidad de vida de los empleados, reduciendo el estrés asociado a los desplazamientos, promoviendo hábitos saludables y aumentando la satisfacción y retención del talento.',
  },
  {
    icon: Leaf,
    title: 'Responsabilidad social',
    description: 'Contribuir activamente a la reducción de emisiones de CO2 y la mejora de la calidad del aire en tu entorno demuestra un genuino compromiso con la sociedad y el medio ambiente, alineándose con los Objetivos de Desarrollo Sostenible.',
  },
];

export default function PTT() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="relative bg-item-blue py-20">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('/images/bike-3854437_960_720.jpg')` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <AlertCircle size={16} />
            Obligación legal por Ley 9/2025
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Plan de Transporte al Trabajo
          </h1>
          <div className="w-20 h-1 bg-white mx-auto rounded-full mb-6" />
          <p className="text-white/90 max-w-3xl mx-auto text-lg">
            La <strong>Ley de Movilidad Sostenible</strong> establece 
            la obligatoriedad de implantar Planes de Movilidad Sostenible al Trabajo para determinados 
            centros de trabajo.
          </p>
        </div>
      </section>

      {/* Obligaciones */}
      <section className="relative py-16">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url('/images/6.png')` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Quién está obligado?</h2>
            <div className="w-20 h-1 bg-item-blue mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {obligaciones.map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm">
                <div className="w-14 h-14 bg-item-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="text-white" size={28} />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Motivaciones - Texto persuasivo */}
      <section className="relative py-16">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-5"
          style={{ backgroundImage: `url('/images/bike-1208309_960_720.jpg')` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Por qué implementar un PTT?</h2>
            <div className="w-20 h-1 bg-item-blue mx-auto rounded-full" />
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Más allá del cumplimiento normativo, implantar un Plan de Transporte al Trabajo 
              aporta múltiples beneficios a tu empresa y a tus empleados.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {motivaciones.map((motivacion, index) => (
              <div key={index} className="bg-item-blue-light rounded-xl p-6 flex items-start gap-4">
                <div className="w-12 h-12 bg-item-blue rounded-lg flex items-center justify-center flex-shrink-0">
                  <motivacion.icon className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{motivacion.title}</h4>
                  <p className="text-gray-600 text-sm">{motivacion.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Medidas */}
      <section className="relative py-16">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url('/images/9.png')` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Medidas que debe incluir un PTT</h2>
            <div className="w-20 h-1 bg-item-blue mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {medidas.map((medida, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-item-blue rounded-lg flex items-center justify-center mb-4">
                  <medida.icon className="text-white" size={24} />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{medida.title}</h4>
                <p className="text-gray-600 text-sm mb-3">{medida.description}</p>
                <ul className="space-y-1">
                  {medida.ejemplos.map((ejemplo, i) => (
                    <li key={i} className="text-gray-500 text-xs flex items-center gap-1">
                      <CheckCircle className="text-item-blue" size={12} />
                      {ejemplo}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section className="relative py-16">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-5"
          style={{ backgroundImage: `url('/images/11.png')` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Cómo elaboramos tu PTT</h2>
            <div className="w-20 h-1 bg-item-blue mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {proceso.map((paso, index) => (
              <div key={index} className="bg-item-blue-light rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-item-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl font-bold">{paso.step}</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{paso.title}</h4>
                <p className="text-gray-600 text-sm">{paso.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="relative py-16">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url('/images/13.png')` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Beneficios para tu empresa</h2>
            <div className="w-20 h-1 bg-item-blue mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beneficiosEmpresa.map((beneficio, index) => (
              <div key={index} className="bg-white rounded-xl p-6 flex items-start gap-4 shadow-sm">
                <div className="w-12 h-12 bg-item-blue rounded-lg flex items-center justify-center flex-shrink-0">
                  <beneficio.icon className="text-white" size={24} />
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

      {/* EDIM */}
      <section className="relative py-16">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-5"
          style={{ backgroundImage: `url('/images/14.png')` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Registro en el EDIM
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                El <strong>EDIM (Espacio de Datos Integrado de Movilidad)</strong> es una plataforma digital 
                gestionada por el Ministerio de Transportes y Movilidad Sostenible que centraliza todos 
                los datos relacionados con los planes de movilidad en España.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Las empresas y administraciones deberán enviar al EDIM:
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="text-item-blue flex-shrink-0 mt-1" size={18} />
                  El documento del plan aprobado
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="text-item-blue flex-shrink-0 mt-1" size={18} />
                  Los informes de seguimiento periódicos
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="text-item-blue flex-shrink-0 mt-1" size={18} />
                  Los indicadores clave de movilidad y emisiones
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                El registro se realiza a través de la autoridad competente en movilidad (autonómica o local), 
                que transmitirá la información al sistema estatal.
              </p>
            </div>
            <div className="bg-item-blue-light rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Indicadores de seguimiento</h3>
              <ul className="space-y-3">
                {[
                  'Número de desplazamientos por modo de transporte',
                  'Emisiones de CO2 evitadas (tCO2e/año)',
                  'Porcentaje de trabajadores en modos sostenibles',
                  'Consumo energético por km recorrido',
                  'Nivel de satisfacción de la plantilla',
                  'Coste por desplazamiento',
                  'Tasa de ocupación de vehículos compartidos',
                  'Uso de infraestructuras (aparcabicis, puntos de recarga)',
                ].map((indicador, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-600 text-sm">
                    <TrendingUp className="text-item-blue" size={16} />
                    {indicador}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo ayudamos */}
      <section className="py-16 bg-item-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                ¿Cómo puede ayudarte ITEM Consulting?
              </h2>
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
                  'Informes de evaluación periódicos',
                  'Registro en el EDIM',
                  'Cálculo de huella de carbono (Alcance 3)',
                  'Asesoramiento en financiación',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-white/90">
                    <CheckCircle size={20} className="text-white/80" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center lg:text-right">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 inline-block">
                <div className="text-6xl font-bold text-white mb-2">24</div>
                <div className="text-white/80 text-lg mb-4">meses de plazo</div>
                <div className="text-white/60 text-sm mb-6">Para elaborar e implantar tu PTT</div>
                <div className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium">
                  ¡No esperes al último momento!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            ¿Tu empresa necesita un PTT?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Contacta con nosotros y te ayudaremos a diseñar e implantar tu Plan de Transporte 
            al Trabajo, cumpliendo con la normativa y maximizando los beneficios para tu empresa.
          </p>
          <Link
            to="/contacto"
            className="inline-block bg-item-blue text-white px-8 py-3 rounded-lg font-medium hover:bg-item-blue/90 transition-colors"
          >
            Solicitar información
          </Link>
        </div>
      </section>
    </div>
  );
}
