import { useState, useEffect, useCallback } from 'react';
import type { User, Project, NewsItem } from '@/types';

const PASSWORD_HASH = ''58a801a5b23aaf975c11699dc0b09202bb25e5d1ef122380f63d4ae047b06033';

// Función para generar hash SHA-256
async function sha256(message: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Claves para localStorage
const STORAGE_KEYS = {
  USER: 'item_user',
  PROJECTS: 'item_projects',
  NEWS: 'item_news',
};

// 35+ Proyectos
const initialProjects: Project[] = [
  {
    id: '1',
    title: 'PMUS de Alcantarilla',
    description: 'Plan de Movilidad Urbana Sostenible del municipio de Alcantarilla. Herramienta técnica para planificar y gestionar la movilidad del municipio con espacios urbanos accesibles y políticas de modos sostenibles.',
    content: `El Plan de Movilidad Urbana Sostenible de Alcantarilla representa un paso decisivo hacia la transformación del modelo de movilidad del municipio. Este plan establece las líneas estratégicas para los próximos años con el objetivo de reducir las emisiones de CO2, mejorar la calidad del aire y hacer del municipio un lugar más habitable.

### Objetivos del proyecto
- Reducir las emisiones de CO2 derivadas del transporte
- Mejorar la accesibilidad y seguridad vial en el casco urbano
- Fomentar la movilidad activa (peatón y bicicleta)
- Optimizar la red de transporte público existente
- Crear zonas de bajas emisiones en el centro histórico

### Metodología aplicada
1. Diagnóstico de movilidad: Análisis de aforos, encuestas a ciudadanos y estudio de la red viaria
2. Análisis de problemáticas: Identificación de puntos negros, congestiones y barreras arquitectónicas
3. Propuesta de medidas: Diseño de carriles bici, mejoras en aceras, nuevas líneas de autobús
4. Evaluación de impacto: Estimación de reducción de emisiones y mejora de tiempos de viaje
5. Plan de implementación: Cronograma de actuaciones priorizadas por impacto y coste

### Medidas principales propuestas
- Movilidad activa: Creación de carriles bici segregados y mejora de aceras
- Transporte público: Nueva línea de autobús que conecte el centro con la estación de tren
- Gestión del aparcamiento: Zonas ORA en el centro y aparcamientos disuasorios en periferia
- Zonas de bajas emisiones: Restricción de acceso a vehículos contaminantes en el casco antiguo
- Seguridad vial: Nuevos pasos de peatones elevados y rotondas de calmado de tráfico`,
    imageUrl: '/images/3.png',
    category: 'PMUS',
    date: '2021-11-10',
  },
  {
    id: '2',
    title: 'Proyecto Integral de Movilidad de Ceutí',
    description: 'Proyecto Integral Movilidad Urbana Sostenible del municipio de Ceutí, abordando la transformación hacia una movilidad más eficiente y respetuosa con el medio ambiente.',
    content: `Ceutí ha encargado a ITEM Consulting la elaboración de un proyecto integral de movilidad que transforme el modelo de desplazamientos hacia la sostenibilidad.

### Análisis de la situación inicial
- Alta dependencia del vehículo privado
- Infraestructura ciclista inexistente
- Red de transporte público insuficiente
- Problemas de aparcamiento en el centro
- Elevada contaminación acústica y atmosférica

### Estrategia de intervención
#### Eje 1: Movilidad Activa
- Construcción de carriles bici que conecten todos los barrios
- Creación de un anillo ciclista perimetral
- Instalación de aparcabicis en puntos estratégicos
- Señalización de rutas peatonales seguras a los colegios

#### Eje 2: Transporte Público
- Rediseño de las líneas de autobús existentes
- Creación de una línea circular que conecte todos los barrios
- Instalación de marquesinas con información en tiempo real
- Acuerdos con transporte a demanda para zonas poco pobladas

#### Eje 3: Gestión del Tráfico
- Implementación de sistema de semaforización inteligente
- Creación de zona 30 en todo el casco urbano
- Instalación de radares pedagógicos en puntos conflictivos
- Mejora de la señalización vertical y horizontal

#### Eje 4: Concienciación y Formación
- Campañas de educación vial en colegios
- Jornadas de puertas abiertas sobre movilidad sostenible
- Programa de bicicleta eléctrica compartida
- Talleres de reparación de bicicletas para ciudadanos`,
    imageUrl: '/images/4.png',
    category: 'Movilidad Urbana',
    date: '2022-03-15',
  },
  {
    id: '3',
    title: 'Plan Estratégico de Alguazas',
    description: 'Redacción del Plan estratégico de Movilidad Urbana Sostenible del municipio de Alguazas, con enfoque en la reducción de emisiones y mejora de la accesibilidad.',
    content: `El Ayuntamiento de Alguazas, consciente de la necesidad de transformar su modelo de movilidad hacia la sostenibilidad, ha encargado a ITEM Consulting la elaboración de su PMUS.

### Diagnóstico de movilidad
- Alta dependencia del vehículo privado
- Ausencia de infraestructura ciclista
- Aceras estrechas y en mal estado en numerosas calles
- Cruces peligrosos para peatones
- Insuficiente frecuencia de autobuses

### Propuestas de intervención

#### Corto plazo
1. Plan de señalización: Renovación de la señalización vertical y horizontal
2. Zona 30: Implementación en todo el casco urbano
3. Mejora de aceras: Ampliación y reparación de aceras
4. Aparcabicis: Instalación de nuevos aparcabicis
5. Campañas de sensibilización: Educación vial en centros escolares

#### Medio plazo
1. Carril bici: Construcción de carril bici segregado
2. Glorietas: Construcción de rotondas para calmado de tráfico
3. Pasos elevados: Nuevos pasos de peatones elevados
4. Mejora de paradas: Renovación de marquesinas de autobús
5. Aparcamiento disuasorio: Construcción de aparcamiento en periferia

#### Largo plazo
1. Eje ciclista principal: Conexión ciclista con municipios vecinos
2. Intercambiador: Creación de intercambiador modal
3. Zona de bajas emisiones: Restricciones en centro histórico
4. Parking inteligente: Sistema de información de plazas libres
5. Movilidad eléctrica: Red de puntos de recarga`,
    imageUrl: '/images/5.png',
    category: 'PMUS',
    date: '2022-06-20',
  },
  {
    id: '4',
    title: 'Optimización Transporte Público Molina de Segura',
    description: 'Análisis de la Red de Transporte Público de Molina de Segura para identificar necesidades actuales y nueva planificación del servicio.',
    content: `Molina de Segura, uno de los municipios más poblados de la Región de Murcia, requería un análisis exhaustivo para adaptar su red de transporte público a las necesidades actuales de la población.

### Metodología del estudio

#### Fase 1: Análisis de la oferta actual
- Mapeo de todas las líneas y rutas existentes
- Análisis de frecuencias y horarios
- Evaluación de la cobertura territorial
- Estudio de la accesibilidad de las paradas

#### Fase 2: Análisis de la demanda
- Encuestas a usuarios
- Análisis de datos de validación de tarjetas
- Estudios de orígenes y destinos
- Identificación de corredores de demanda

#### Fase 3: Detección de problemas
- Zonas con baja cobertura
- Desfases entre oferta y demanda
- Problemas de puntualidad
- Barreras de accesibilidad

### Propuestas de mejora
- Reestructuración de líneas con nuevas rutas circulares
- Refuerzo de frecuencias en hora punta
- Nueva línea que conecte el centro con el polígono industrial
- Servicio nocturno de viernes y sábados
- Renovación de marquesinas
- Implementación de sistema de información en tiempo real`,
    imageUrl: '/images/6.png',
    category: 'Transporte Público',
    date: '2022-09-10',
  },
  {
    id: '5',
    title: 'Consultoría Next Generation EU - Yecla',
    description: 'Servicios de consultoría, asistencia técnica, asesoramiento y redacción de memoria de movilidad para el Ayuntamiento de Yecla.',
    content: `El Ayuntamiento de Yecla ha contratado los servicios de ITEM Consulting para asesoramiento técnico en la preparación de proyectos de movilidad sostenible financiables con fondos europeos.

### Servicios prestados

#### 1. Asesoramiento técnico en movilidad sostenible
- Análisis de la normativa europea y estatal aplicable
- Identificación de oportunidades de financiación
- Evaluación de proyectos candidatos
- Elaboración de informes técnicos de viabilidad

#### 2. Redacción de memoria de movilidad
- Diagnóstico de la situación actual de movilidad
- Análisis de problemáticas y necesidades
- Definición de objetivos y estrategias
- Propuesta de medidas y actuaciones
- Estimación de costes y fuentes de financiación
- Plan de implementación y seguimiento

### Proyectos desarrollados

#### Proyecto 1: Red de Carriles Bici
Creación de una red de carriles bici que conecte el centro con los principales barrios y equipamientos.

#### Proyecto 2: Peatonalización del Centro Histórico
Transformación del centro histórico en zona peatonal prioritaria con acceso restringido a vehículos.

#### Proyecto 3: Electrificación del Transporte Público
Sustitución de autobuses diésel por autobuses eléctricos e instalación de infraestructura de recarga.`,
    imageUrl: '/images/7.png',
    category: 'Consultoría',
    date: '2023-01-15',
  },
  {
    id: '6',
    title: 'Servicio Bici Pública MUyBICI',
    description: 'Proyecto centrado en ofrecer la mejor ubicación de las estaciones del servicio de bicicleta pública de Murcia, optimizando la cobertura y accesibilidad.',
    content: `El servicio de bicicleta pública de Murcia, MUyBICI, ha confiado en ITEM Consulting para el análisis y optimización de la ubicación de sus estaciones.

### Estado actual del servicio
- Estaciones actuales distribuidas por la ciudad
- Bicicletas mecánicas y eléctricas
- Usuarios registrados en constante crecimiento
- Viajes anuales en aumento
- Cobertura del centro y principales barrios

### Metodología de análisis

#### Fase 1: Análisis de datos de uso
- Datos de préstamos y devoluciones por estación
- Patrones temporales (hora, día, estación)
- Flujos entre estaciones (matriz OD)
- Estaciones saturadas vs. infrautilizadas

#### Fase 2: Análisis territorial
- Densidad poblacional
- Puntos de interés (centros de trabajo, educativos, sanitarios)
- Red de carriles bici existente
- Pendientes y topografía
- Accesibilidad peatonal

#### Fase 3: Modelización de demanda
- Modelo de predicción de demanda basado en variables sociodemográficas
- Identificación de zonas con demanda potencial no atendida
- Simulación de escenarios con nuevas estaciones

### Propuestas de optimización
- Reubicación de estaciones a zonas de mayor demanda
- Nuevas estaciones en barrios desatendidos
- Ampliación del servicio a nuevas zonas
- Mejoras operativas con sistema de predicción de demanda`,
    imageUrl: '/images/bike-1208309_960_720.jpg',
    category: 'Movilidad Activa',
    date: '2023-04-22',
  },
  {
    id: '7',
    title: 'Plan Integral de Santomera',
    description: 'Plan estratégico de movilidad urbana sostenible con especial atención a la conectividad con Murcia.',
    content: `Santomera ha encargado a ITEM Consulting la elaboración de su Plan Integral de Movilidad Urbana Sostenible, con especial atención a la conectividad con el área metropolitana de Murcia.

### Objetivos principales
- Mejorar la conectividad con Murcia capital
- Reducir la dependencia del vehículo privado
- Fomentar el uso del transporte público
- Crear infraestructuras para movilidad activa
- Mejorar la calidad del aire

### Medidas propuestas
- Nuevas líneas de autobús conectando con Murcia
- Carril bici segregado hasta el límite municipal
- Mejora de las paradas de transporte público
- Zonas 30 en el casco urbano
- Aparcamientos disuasorios en la periferia
- Campañas de sensibilización sobre movilidad sostenible`,
    imageUrl: '/images/8.png',
    category: 'PMUS',
    date: '2023-06-15',
  },
  {
    id: '8',
    title: 'Estudio de Movilidad Eléctrica en Murcia',
    description: 'Estudio integral de soluciones de movilidad eléctrica para el municipio de Murcia.',
    content: `El Ayuntamiento de Murcia ha encargado a ITEM Consulting un estudio integral sobre la implantación de soluciones de movilidad eléctrica en el municipio.

### Alcance del estudio
- Análisis de la flota municipal actual
- Identificación de oportunidades de electrificación
- Estudio de necesidades de infraestructura de recarga
- Análisis de viabilidad económica
- Plan de implantación progresiva

### Propuestas
- Electrificación de la flota municipal de vehículos
- Instalación de puntos de recarga en edificios públicos
- Incentivos para la compra de vehículos eléctricos
- Creación de zonas de aparcamiento preferentes para VEH
- Campañas de sensibilización sobre movilidad eléctrica`,
    imageUrl: '/images/9.png',
    category: 'Movilidad Eléctrica',
    date: '2023-08-20',
  },
  {
    id: '9',
    title: 'PMUS Simplificado de Las Torres de Cotillas',
    description: 'Elaboración del Plan de Movilidad Urbana Sostenible simplificado para el municipio de Las Torres de Cotillas.',
    content: `Las Torres de Cotillas ha encargado a ITEM Consulting la elaboración de su PMUS simplificado, adaptado al tamaño y características del municipio.

### Contenido del plan
- Diagnóstico de la movilidad actual
- Identificación de problemáticas principales
- Propuesta de medidas de bajo coste y alto impacto
- Plan de implementación gradual
- Indicadores de seguimiento

### Medidas destacadas
- Señalización de rutas peatonales seguras
- Mejora de la accesibilidad en el centro urbano
- Creación de zonas 30
- Instalación de aparcabicis
- Mejora de la información del transporte público`,
    imageUrl: '/images/10.png',
    category: 'PMUS',
    date: '2023-10-05',
  },
  {
    id: '10',
    title: 'Auditoría de Seguridad Vial en Alcantarilla',
    description: 'Auditoría completa de seguridad vial en el municipio de Alcantarilla con propuesta de mejoras.',
    content: `ITEM Consulting ha realizado una auditoría de seguridad vial completa en el municipio de Alcantarilla, identificando puntos conflictivos y proponiendo medidas correctoras.

### Metodología
- Análisis de datos de accidentes
- Inspección in situ de la red viaria
- Identificación de puntos negros
- Evaluación de infraestructuras
- Propuesta de medidas de mejora

### Resultados
- Identificación de puntos conflictivos
- Propuesta de nuevas rotondas
- Mejora de la señalización
- Instalación de elementos de calmado de tráfico
- Creación de caminos escolares seguros`,
    imageUrl: '/images/11.png',
    category: 'Seguridad Vial',
    date: '2023-11-12',
  },
  {
    id: '11',
    title: 'Plan de Movilidad del Campus Universitario',
    description: 'Diseño de un plan de movilidad sostenible para el campus universitario de la Universidad de Murcia.',
    content: `La Universidad de Murcia ha encargado a ITEM Consulting el diseño de un plan de movilidad sostenible para su campus universitario.

### Objetivos
- Reducir el uso del vehículo privado en el campus
- Fomentar la movilidad activa entre estudiantes y personal
- Mejorar la accesibilidad del transporte público
- Crear un campus más sostenible y saludable

### Medidas propuestas
- Ampliación de la red de carriles bici
- Mejora de las conexiones con transporte público
- Creación de aparcamientos para bicicletas
- Implementación de sistema de bicicleta compartida
- Zonas peatonales prioritarias
- Campañas de sensibilización`,
    imageUrl: '/images/12.png',
    category: 'Movilidad Urbana',
    date: '2024-01-20',
  },
  {
    id: '12',
    title: 'Estudio de Tráfico en Avenida Juan de la Cierva',
    description: 'Estudio de tráfico y propuesta de mejoras en la Avenida Juan de la Cierva de Murcia.',
    content: `ITEM Consulting ha realizado un estudio de tráfico completo en la Avenida Juan de la Cierva de Murcia, analizando los flujos vehiculares y proponiendo mejoras.

### Metodología
- Aforos vehiculares en diferentes horarios
- Análisis de velocidades
- Estudio de retenciones
- Microsimulación del tráfico
- Propuesta de mejoras

### Propuestas
- Optimización de ciclos semafóricos
- Mejora de la coordinación de semáforos
- Nuevos carriles de giro
- Mejora de la señalización
- Elementos de calmado de tráfico`,
    imageUrl: '/images/city-traffic-346562_960_720.jpg',
    category: 'Estudios de Tráfico',
    date: '2024-02-15',
  },
  {
    id: '13',
    title: 'Plan de Movilidad Sostenible de Librilla',
    description: 'Elaboración del PMUS para el municipio de Librilla con enfoque en la sostenibilidad.',
    content: `El Ayuntamiento de Librilla ha confiado en ITEM Consulting para la elaboración de su Plan de Movilidad Urbana Sostenible.

### Características del municipio
- Municipio de interior con tradición agrícola
- Crecimiento residencial en los últimos años
- Alta dependencia del vehículo privado
- Necesidad de mejorar la conectividad

### Propuestas
- Mejora de las conexiones con la autovía
- Creación de carriles bici
- Mejora del transporte público
- Zonas 30 en el centro urbano
- Aparcamientos disuasorios`,
    imageUrl: '/images/13.png',
    category: 'PMUS',
    date: '2024-03-10',
  },
  {
    id: '14',
    title: 'Consultoría en Movilidad para Polígono Industrial',
    description: 'Asesoramiento en movilidad para la mejora de la accesibilidad a un polígono industrial.',
    content: `ITEM Consulting ha prestado servicios de consultoría en movilidad para la mejora de la accesibilidad a un polígono industrial de la Región de Murcia.

### Servicios prestados
- Análisis de la movilidad actual de trabajadores
- Estudio de opciones de transporte público
- Propuesta de servicios de lanzadera
- Análisis de aparcamientos
- Propuesta de medidas para fomentar la movilidad sostenible

### Resultados
- Identificación de corredores de acceso
- Propuesta de rutas de transporte público
- Plan de aparcamientos
- Medidas para reducir el impacto del tráfico de mercancías`,
    imageUrl: '/images/14.png',
    category: 'Consultoría',
    date: '2024-04-05',
  },
  {
    id: '15',
    title: 'Estudio de Impacto de Nueva Ronda',
    description: 'Estudio de impacto de una nueva ronda de circunvalación en un municipio de la Región.',
    content: `ITEM Consulting ha realizado un estudio de impacto de una nueva ronda de circunvalación, analizando sus efectos sobre la movilidad y el territorio.

### Contenido del estudio
- Análisis de la demanda actual y futura
- Estudio de alternativas de trazado
- Evaluación de impacto ambiental
- Análisis coste-beneficio
- Estudio de viabilidad

### Resultados
- Propuesta de trazado óptimo
- Estimación de tráfico
- Evaluación de impactos
- Plan de compensaciones
- Cronograma de ejecución`,
    imageUrl: '/images/15.png',
    category: 'Estudios de Tráfico',
    date: '2024-05-20',
  },
  {
    id: '16',
    title: 'Plan de Movilidad de Abarán',
    description: 'Elaboración del Plan de Movilidad Urbana Sostenible para el municipio de Abarán.',
    content: `El Ayuntamiento de Abarán ha encargado a ITEM Consulting la elaboración de su Plan de Movilidad Urbana Sostenible.

### Diagnóstico
- Municipio ribereño con características especiales
- Problemas de aparcamiento en el centro
- Necesidad de mejorar la accesibilidad
- Alta dependencia del vehículo privado

### Propuestas
- Mejora de la accesibilidad al centro histórico
- Creación de aparcamientos disuasorios
- Mejora del transporte público
- Carril bici a lo largo del río
- Zonas peatonales`,
    imageUrl: '/images/16.png',
    category: 'PMUS',
    date: '2024-06-15',
  },
  {
    id: '17',
    title: 'Análisis de Movilidad en Centro Comercial',
    description: 'Análisis de movilidad y accesibilidad para un centro comercial de la Región.',
    content: `ITEM Consulting ha realizado un análisis de movilidad y accesibilidad para un centro comercial de la Región de Murcia.

### Servicios prestados
- Análisis de la accesibilidad viaria
- Estudio de la capacidad de aparcamiento
- Análisis de la accesibilidad peatonal
- Propuesta de mejoras en transporte público
- Plan de movilidad interna

### Resultados
- Identificación de cuellos de botella
- Propuesta de mejoras en accesos
- Plan de aparcamientos optimizado
- Medidas para mejorar la accesibilidad peatonal`,
    imageUrl: '/images/17.png',
    category: 'Consultoría',
    date: '2024-07-10',
  },
  {
    id: '18',
    title: 'Estudio de Tráfico en Intersección Compleja',
    description: 'Estudio de tráfico y propuesta de soluciones para una intersección compleja.',
    content: `ITEM Consulting ha realizado un estudio de tráfico en una intersección compleja, proponiendo soluciones para mejorar la seguridad y fluidez.

### Metodología
- Aforos vehiculares detallados
- Análisis de conflictos
- Microsimulación de tráfico
- Evaluación de alternativas
- Propuesta de solución óptima

### Propuestas
- Rediseño de la intersección
- Nuevos carriles de giro
- Optimización de semáforos
- Mejora de la señalización
- Elementos de calmado de tráfico`,
    imageUrl: '/images/18.png',
    category: 'Estudios de Tráfico',
    date: '2024-08-05',
  },
  {
    id: '19',
    title: 'Plan de Movilidad de Fortuna',
    description: 'Elaboración del Plan de Movilidad Urbana Sostenible para el municipio de Fortuna.',
    content: `El Ayuntamiento de Fortuna ha encargado a ITEM Consulting la elaboración de su Plan de Movilidad Urbana Sostenible.

### Características del municipio
- Municipio del interior con zona termal
- Atracción de visitantes
- Problemas estacionales de tráfico
- Necesidad de mejorar la accesibilidad

### Propuestas
- Mejora de la accesibilidad al balneario
- Plan de aparcamientos para temporadas altas
- Mejora del transporte público
- Carril bici
- Zonas peatonales en el centro`,
    imageUrl: '/images/19.png',
    category: 'PMUS',
    date: '2024-09-12',
  },
  {
    id: '20',
    title: 'Consultoría en Movilidad para Hospital',
    description: 'Asesoramiento en movilidad y accesibilidad para un centro hospitalario.',
    content: `ITEM Consulting ha prestado servicios de consultoría en movilidad para la mejora de la accesibilidad a un centro hospitalario.

### Servicios prestados
- Análisis de la movilidad de pacientes y visitantes
- Estudio de la capacidad de aparcamiento
- Análisis de la accesibilidad
- Propuesta de mejoras en transporte público
- Plan de movilidad interna

### Resultados
- Identificación de problemas de accesibilidad
- Propuesta de mejoras en aparcamientos
- Plan de señalización
- Medidas para mejorar la accesibilidad
- Propuesta de servicios de transporte`,
    imageUrl: '/images/20.png',
    category: 'Consultoría',
    date: '2024-10-20',
  },
  {
    id: '21',
    title: 'Estudio de Movilidad para Desarrollo Urbanístico',
    description: 'Estudio de movilidad para un nuevo desarrollo urbanístico de viviendas.',
    content: `ITEM Consulting ha realizado un estudio de movilidad para un nuevo desarrollo urbanístico de viviendas en la Región de Murcia.

### Contenido del estudio
- Estimación de la demanda de movilidad
- Análisis de la capacidad de la red viaria
- Propuesta de infraestructuras
- Plan de aparcamientos
- Medidas para fomentar la movilidad sostenible

### Resultados
- Estimación de tráfico generado
- Propuesta de mejoras en la red viaria
- Plan de aparcamientos
- Propuesta de infraestructuras para movilidad activa
- Medidas de mitigación`,
    imageUrl: '/images/21.png',
    category: 'Estudios de Tráfico',
    date: '2024-11-15',
  },
  {
    id: '22',
    title: 'Plan de Movilidad de Archena',
    description: 'Elaboración del Plan de Movilidad Urbana Sostenible para el municipio de Archena.',
    content: `El Ayuntamiento de Archena ha encargado a ITEM Consulting la elaboración de su Plan de Movilidad Urbana Sostenible.

### Características del municipio
- Municipio ribereño con zona termal
- Atracción de visitantes
- Problemas de tráfico en temporadas altas
- Necesidad de mejorar la conectividad

### Propuestas
- Mejora de la accesibilidad al balneario
- Plan de aparcamientos para temporadas altas
- Mejora del transporte público
- Carril bici
- Zonas peatonales en el centro histórico`,
    imageUrl: '/images/22.png',
    category: 'PMUS',
    date: '2024-12-10',
  },
  {
    id: '23',
    title: 'PTT para Empresa Industrial de Molina',
    description: 'Plan de Transporte al Trabajo para empresa industrial con más de 250 trabajadores, cumpliendo con la Ley 9/2025 de Movilidad Sostenible.',
    content: `ITEM Consulting ha elaborado el Plan de Transporte al Trabajo (PTT) para una importante empresa industrial de Molina de Segura, cumpliendo con los requisitos de la Ley 9/2025 de Movilidad Sostenible.

### Contexto normativo - Ley 9/2025
La Ley de Movilidad Sostenible establece la obligatoriedad para empresas con más de 200 trabajadores de elaborar e implantar un PTT. Esta normativa busca reducir las emisiones de CO2 derivadas de los desplazamientos laborales y promover modos de transporte más sostenibles.

### Diagnóstico realizado
- Encuestas a 250+ trabajadores sobre sus desplazamientos
- Análisis de los accesos al centro de trabajo
- Estudio de la distribución residencial de la plantilla
- Evaluación de infraestructuras existentes

### Medidas propuestas
#### Movilidad activa
- Construcción de carril bici segregado hasta la empresa
- Instalación de 100 plazas de aparcabicis cubiertas
- Vestuarios y duchas para ciclistas
- Programa de bicicleta eléctrica compartida

#### Transporte colectivo
- Lanzadera desde estación de tren/autobús
- Acuerdo con empresa de transporte para línea dedicada
- Subvención del 50% en abonos de transporte público

#### Movilidad compartida
- Plataforma de carpooling interna
- Plazas de parking preferentes para vehículos compartidos
- Incentivos económicos por compartir vehículo

#### Vehículos de bajas emisiones
- 10 puntos de recarga para vehículos eléctricos
- Plazas preferentes para VEH
- Subvención a la compra de vehículos eléctricos

### Resultados esperados
- Reducción del 30% en emisiones de CO2
- Aumento del 25% en uso de transporte sostenible
- Mejora de la satisfacción de los trabajadores`,
    imageUrl: '/images/14.png',
    category: 'PTT',
    date: '2025-01-15',
  },
  {
    id: '24',
    title: 'PMUS de Jumilla',
    description: 'Plan de Movilidad Urbana Sostenible para el municipio de Jumilla, adaptado a las necesidades de una ciudad media con tradición vitivinícola.',
    content: `El Ayuntamiento de Jumilla ha encargado a ITEM Consulting la elaboración de su Plan de Movilidad Urbana Sostenible, un proyecto ambicioso que busca transformar la movilidad de esta ciudad de más de 30.000 habitantes.

### Características del municipio
Jumilla presenta características específicas que han sido consideradas en el plan:
- Ciudad de interior con tradición vitivinícola
- Atracción de turismo enoturístico
- Crecimiento residencial en los últimos años
- Alta dependencia del vehículo privado
- Red de transporte público limitada

### Objetivos del PMUS
- Reducir las emisiones de CO2 en un 25% en 5 años
- Incrementar el uso del transporte público en un 30%
- Crear infraestructura ciclista funcional
- Mejorar la accesibilidad peatonal en el centro
- Gestionar el aparcamiento de forma más eficiente

### Medidas principales
#### Movilidad activa
- Red de carriles bici de 15 km
- Mejora de aceras en el casco urbano
- Señalización de rutas peatonales seguras
- Aparcabicis en puntos estratégicos

#### Transporte público
- Nueva línea de autobús urbano circular
- Refuerzo de frecuencias en hora punta
- Mejora de las paradas con marquesinas
- Integración tarifaria con transporte interurbano

#### Gestión del tráfico
- Implementación de zona 30 en el centro
- Creación de zonas ORA
- Aparcamientos disuasorios en periferia
- Sistema de semaforización inteligente

### Financiación
El plan incluye un programa de financiación mediante fondos europeos Next Generation EU y ayudas autonómicas para la movilidad sostenible.`,
    imageUrl: '/images/15.png',
    category: 'PMUS',
    date: '2025-02-20',
  },
  {
    id: '25',
    title: 'Auditoría de Seguridad Vial en Yecla',
    description: 'Auditoría completa de seguridad vial en el municipio de Yecla con propuesta de mejoras para reducir la siniestralidad.',
    content: `ITEM Consulting ha realizado una auditoría de seguridad vial exhaustiva en el municipio de Yecla, identificando puntos conflictivos y proponiendo medidas correctoras para reducir la siniestralidad.

### Metodología de la auditoría
1. Análisis de datos de accidentes (últimos 5 años)
2. Inspección in situ de la red viaria
3. Identificación de puntos negros
4. Evaluación de infraestructuras
5. Propuesta de medidas de mejora

### Resultados del análisis
- Identificación de 12 puntos negros
- Detección de 8 intersecciones conflictivas
- Análisis de 15 pasos de peatones peligrosos
- Evaluación de 20 km de vías urbanas

### Propuestas de mejora
#### Infraestructuras
- Construcción de 5 nuevas rotondas
- Mejora de la señalización vertical y horizontal
- Instalación de elementos de calmado de tráfico
- Creación de caminos escolares seguros

#### Intersecciones
- Rediseño de 8 intersecciones conflictivas
- Instalación de semáforos en 3 cruces
- Mejora de la visibilidad en giros
- Ampliación de aceras en esquinas

#### Peatones
- Nuevos pasos de peatones elevados
- Mejora de la iluminación en pasos peatonales
- Instalación de semáforos peatonales
- Creación de isletas refugio

### Impacto esperado
- Reducción del 40% en accidentes con víctimas
- Mejora de la seguridad peatonal
- Reducción de la velocidad en zonas residenciales`,
    imageUrl: '/images/16.png',
    category: 'Seguridad Vial',
    date: '2025-03-10',
  },
  {
    id: '26',
    title: 'Estudio de Movilidad para Polígono Industrial de Lorca',
    description: 'Estudio de movilidad y accesibilidad para el polígono industrial de Lorca, optimizando los desplazamientos de trabajadores y mercancías.',
    content: `ITEM Consulting ha realizado un estudio de movilidad integral para el polígono industrial de Lorca, analizando los desplazamientos de trabajadores y mercancías y proponiendo mejoras para optimizar la accesibilidad.

### Alcance del estudio
- Análisis de la movilidad de 5.000+ trabajadores
- Estudio de los accesos para vehículos de mercancías
- Evaluación del transporte público existente
- Análisis de la distribución de aparcamientos

### Diagnóstico
#### Problemas identificados
- Congestión en horas de entrada y salida
- Insuficiente transporte público
- Falta de infraestructura ciclista
- Problemas de aparcamiento
- Conflictos entre vehículos pesados y ligeros

### Propuestas de mejora
#### Transporte público
- Nueva línea de autobús desde el centro de Lorca
- Lanzaderas desde puntos de interés
- Horarios adaptados a turnos laborales

#### Movilidad sostenible
- Carril bici desde el centro hasta el polígono
- Aparcabicis en empresas principales
- Programa de incentivos al carpooling

#### Gestión del tráfico
- Nuevos accesos para reducir congestión
- Separación de flujos de vehículos pesados y ligeros
- Sistema de información de plazas de aparcamiento libres

#### Ley 9/2025 - PTT
El estudio incluye recomendaciones para que las empresas del polígono cumplan con la Ley 9/2025 de Movilidad Sostenible, facilitando la elaboración de Planes de Transporte al Trabajo coordinados.`,
    imageUrl: '/images/17.png',
    category: 'Estudios de Tráfico',
    date: '2025-04-05',
  },
  {
    id: '27',
    title: 'Plan de Movilidad del Campus de Espinardo',
    description: 'Diseño de un plan de movilidad sostenible para el campus universitario de Espinardo de la Universidad de Murcia.',
    content: `La Universidad de Murcia ha encargado a ITEM Consulting el diseño de un plan de movilidad sostenible para su campus de Espinardo, uno de los más grandes de la Región con más de 15.000 usuarios diarios.

### Objetivos del plan
- Reducir el uso del vehículo privado en el campus
- Fomentar la movilidad activa entre estudiantes y personal
- Mejorar la accesibilidad del transporte público
- Crear un campus más sostenible y saludable
- Cumplir con los objetivos de la Ley 9/2025 de Movilidad Sostenible

### Diagnóstico
- 60% de los desplazamientos se realizan en vehículo privado
- Solo 5% usa la bicicleta
- El transporte público tiene baja frecuencia
- Problemas de aparcamiento en hora punta

### Medidas propuestas
#### Movilidad activa
- Red de carriles bici de 8 km dentro del campus
- Ampliación de los aparcamientos para bicicletas (500 plazas)
- Sistema de bicicleta compartida eléctrica
- Rutas peatonales seguras y sombreadas

#### Transporte público
- Refuerzo de frecuencias de las líneas existentes
- Nueva línea directa desde el centro de Murcia
- Mejora de las paradas con marquesinas e información

#### Gestión del aparcamiento
- Zonas de aparcamiento restringido
- Tarificación progresiva
- Plazas preferentes para vehículos compartidos
- Puntos de recarga para vehículos eléctricos

#### Sensibilización
- Campañas de promoción de la movilidad sostenible
- Jornadas de puertas abiertas sobre movilidad
- Formación en conducción segura para ciclistas`,
    imageUrl: '/images/18.png',
    category: 'Movilidad Urbana',
    date: '2025-05-15',
  },
  {
    id: '28',
    title: 'Consultoría PTT para Hospital General de la Región',
    description: 'Elaboración del Plan de Transporte al Trabajo para el Hospital General de la Región de Murcia, con más de 3.000 profesionales.',
    content: `ITEM Consulting ha elaborado el Plan de Transporte al Trabajo (PTT) para el Hospital General de la Región de Murcia, un centro sanitario con más de 3.000 profesionales que opera 24 horas los 365 días del año.

### Contexto - Ley 9/2025
El hospital está obligado a elaborar un PTT según la Ley 9/2025 de Movilidad Sostenible, al superar los 200 trabajadores. Este plan debe incluir medidas para reducir el impacto ambiental de los desplazamientos laborales.

### Particularidades del centro
- Funcionamiento 24/7 con turnos rotativos
- Más de 3.000 profesionales de diferentes categorías
- Accesos saturados en cambios de turno
- Escaso transporte público en horario nocturno
- Necesidad de aparcamiento para visitantes

### Medidas propuestas
#### Transporte colectivo
- Servicio de lanzadera desde puntos estratégicos
- Acuerdo con empresa de transporte para servicio nocturno
- Subvención del 60% en abonos de transporte público

#### Movilidad activa
- Carril bici seguro hasta el hospital
- Aparcabicis cubiertos con vigilancia
- Vestuarios y duchas para ciclistas
- Programa de bicicleta eléctrica compartida

#### Movilidad compartida
- Plataforma de carpooling interna
- Plazas preferentes para vehículos compartidos
- Incentivos económicos por compartir vehículo

#### Vehículos eléctricos
- 20 puntos de recarga en el parking
- Plazas preferentes para VEH
- Flota de vehículos eléctricos para servicios internos

### Indicadores de seguimiento
- Porcentaje de trabajadores en modos sostenibles
- Emisiones de CO2 evitadas
- Nivel de satisfacción de la plantilla
- Ocupación de aparcamientos`,
    imageUrl: '/images/19.png',
    category: 'PTT',
    date: '2025-06-20',
  },
  {
    id: '29',
    title: 'Estudio de Impacto Ambiental de Nueva Autovía',
    description: 'Estudio de impacto ambiental de una nueva autovía en la Región de Murcia, analizando efectos sobre la movilidad y el territorio.',
    content: `ITEM Consulting ha realizado un estudio de impacto ambiental de una nueva autovía en la Región de Murcia, analizando sus efectos sobre la movilidad, el territorio y el medio ambiente.

### Alcance del estudio
- Análisis de la demanda actual y futura
- Estudio de alternativas de trazado
- Evaluación de impacto ambiental
- Análisis coste-beneficio
- Estudio de viabilidad técnica

### Evaluación de impactos
#### Impactos ambientales
- Afección a espacios naturales protegidos
- Impacto sobre la fauna y flora
- Efectos sobre la calidad del aire
- Ruido generado por el tráfico
- Consumo de suelo

#### Impactos sociales
- Afección a viviendas y equipamientos
- Expropiaciones necesarias
- Cambios en los patrones de movilidad
- Efectos sobre la calidad de vida

#### Impactos económicos
- Costes de construcción
- Beneficios por reducción de tiempos de viaje
- Impacto en el desarrollo económico territorial
- Creación de empleo

### Medidas de mitigación
- Pasos de fauna en tramos sensibles
- Pantallas acústicas en zonas pobladas
- Repoblación forestal
- Compensaciones económicas
- Plan de restauración paisajística

### Resultados
El estudio concluye que el proyecto es viable desde el punto de vista técnico y económico, siempre que se implementen las medidas de mitigación propuestas para minimizar los impactos ambientales negativos.`,
    imageUrl: '/images/20.png',
    category: 'Estudios de Tráfico',
    date: '2025-07-10',
  },
  {
    id: '30',
    title: 'PMUS de Bullas',
    description: 'Elaboración del Plan de Movilidad Urbana Sostenible para el municipio de Bullas, con enfoque en la movilidad rural sostenible.',
    content: `El Ayuntamiento de Bullas ha encargado a ITEM Consulting la elaboración de su Plan de Movilidad Urbana Sostenible, un proyecto que aborda los desafíos específicos de la movilidad en un municipio rural de interior.

### Características del municipio
- Municipio rural de 11.000 habitantes
- Tradición vitivinícola
- Dispersión poblacional
- Alta dependencia del vehículo privado
- Transporte público limitado

### Objetivos del PMUS
- Reducir la dependencia del vehículo privado
- Mejorar la conectividad con municipios vecinos
- Fomentar la movilidad activa en el casco urbano
- Optimizar el transporte público existente
- Gestionar el aparcamiento en el centro

### Medidas propuestas
#### Movilidad activa
- Red de carriles bici en el casco urbano
- Conexión ciclista con pedanías cercanas
- Mejora de aceras en el centro
- Aparcabicis en puntos estratégicos

#### Transporte público
- Refuerzo de frecuencias en líneas existentes
- Servicio a demanda para zonas rurales
- Mejora de las paradas con marquesinas
- Integración con transporte interurbano

#### Movilidad rural
- Puntos de encuentro para carpooling
- Servicio de transporte a demanda
- Plataforma de movilidad compartida

#### Gestión del tráfico
- Zona 30 en el centro histórico
- Aparcamientos disuasorios en periferia
- Mejora de la señalización

### Financiación
El plan incluye la búsqueda de financiación a través de fondos europeos para la movilidad sostenible en zonas rurales.`,
    imageUrl: '/images/21.png',
    category: 'PMUS',
    date: '2025-08-15',
  },
  {
    id: '31',
    title: 'PTT para Centro Comercial Nueva Condomina',
    description: 'Plan de Transporte al Trabajo para el centro comercial Nueva Condomina, con más de 500 trabajadores en sus establecimientos.',
    content: `ITEM Consulting ha elaborado el Plan de Transporte al Trabajo (PTT) para el centro comercial Nueva Condomina, uno de los principales centros comerciales de la Región de Murcia, con más de 500 trabajadores en sus diferentes establecimientos.

### Obligatoriedad según Ley 9/2025
El centro comercial está obligado a elaborar un PTT según la Ley 9/2025 de Movilidad Sostenible, al superar los 200 trabajadores. El plan debe incluir medidas para reducir el impacto ambiental de los desplazamientos laborales.

### Diagnóstico de movilidad
- 60% de los trabajadores usa vehículo privado
- 25% usa transporte público
- 10% se desplaza a pie
- 5% usa bicicleta
- Problemas de aparcamiento para trabajadores

### Medidas propuestas
#### Transporte público
- Acuerdo con empresa de autobuses para línea especial
- Subvención del 50% en abonos de transporte
- Horarios adaptados a los turnos del centro comercial

#### Movilidad activa
- Mejora de la conexión peatonal desde transporte público
- Aparcabicis cubiertos para trabajadores
- Programa de incentivos al uso de bicicleta

#### Movilidad compartida
- Plataforma de carpooling para trabajadores
- Plazas preferentes para vehículos compartidos
- Incentivos económicos por compartir vehículo

#### Vehículos eléctricos
- 8 puntos de recarga en el parking de trabajadores
- Plazas preferentes para VEH
- Subvención a la compra de vehículos eléctricos

### Coordinación con empresas
El plan incluye la coordinación con todas las empresas del centro comercial para implementar medidas conjuntas y compartir infraestructuras.`,
    imageUrl: '/images/22.png',
    category: 'PTT',
    date: '2025-09-20',
  },
  {
    id: '32',
    title: 'Estudio de Tráfico en Carretera RM-1',
    description: 'Estudio de tráfico y propuesta de mejoras en la carretera RM-1, principal vía de acceso a la costa de la Región de Murcia.',
    content: `ITEM Consulting ha realizado un estudio de tráfico completo en la carretera RM-1, la principal vía de acceso a la costa de la Región de Murcia, analizando los flujos vehiculares y proponiendo mejoras.

### Alcance del estudio
- Análisis de tráfico en 50 km de vía
- Aforos vehiculares en diferentes horarios
- Estudio de velocidades
- Análisis de accidentes
- Evaluación de la capacidad de la vía

### Problemas identificados
- Saturación en temporada estival
- Elevada siniestralidad en ciertos tramos
- Problemas de visibilidad en curvas
- Insuficiente señalización
- Accesos conflictivos

### Propuestas de mejora
#### Capacidad
- Ampliación a tres carriles en tramos críticos
- Creación de carriles adicionales de subida
- Mejora de arcenes

#### Seguridad
- Instalación de barreras de seguridad
- Mejora de la señalización
- Nuevos paneles de mensaje variable
- Iluminación en tramos críticos

#### Accesos
- Rediseño de accesos conflictivos
- Creación de glorietas
- Mejora de la visibilidad

#### Gestión del tráfico
- Sistema de información en tiempo real
- Paneles de mensaje variable
- Cámaras de vigilancia
- Sistema de gestión de incidentes

### Impacto esperado
- Reducción del 20% en tiempos de viaje
- Disminución del 30% en accidentes
- Mejora de la fluidez en temporada alta`,
    imageUrl: '/images/3.png',
    category: 'Estudios de Tráfico',
    date: '2025-10-05',
  },
  {
    id: '33',
    title: 'Plan de Movilidad de Calasparra',
    description: 'Elaboración del Plan de Movilidad Urbana Sostenible para el municipio de Calasparra, con enfoque en la accesibilidad y la movilidad rural.',
    content: `El Ayuntamiento de Calasparra ha encargado a ITEM Consulting la elaboración de su Plan de Movilidad Urbana Sostenible, adaptado a las necesidades de este municipio rural del Noroeste de la Región.

### Características del municipio
- Municipio rural de 10.000 habitantes
- Sede del Santuario de la Esperanza
- Atracción de peregrinos y turistas
- Dispersión poblacional
- Transporte público limitado

### Objetivos del plan
- Mejorar la accesibilidad al centro urbano
- Fomentar la movilidad sostenible
- Optimizar el transporte público
- Gestionar el aparcamiento en épocas de peregrinación
- Mejorar la seguridad vial

### Medidas propuestas
#### Movilidad activa
- Red de carriles bici en el casco urbano
- Rutas peatonales seguras
- Mejora de aceras
- Aparcabicis en puntos estratégicos

#### Transporte público
- Refuerzo de frecuencias en días de peregrinación
- Servicio especial para eventos
- Mejora de las paradas

#### Gestión del tráfico
- Zona 30 en el centro histórico
- Aparcamientos disuasorios
- Señalización mejorada
- Gestión del tráfico en días de eventos

#### Movilidad rural
- Puntos de encuentro para carpooling
- Servicio de transporte a demanda
- Conexiones con municipios vecinos

### Financiación
El plan busca financiación a través de fondos europeos para la movilidad sostenible en zonas rurales y de interior.`,
    imageUrl: '/images/4.png',
    category: 'PMUS',
    date: '2025-11-10',
  },
  {
    id: '34',
    title: 'PTT para Universidad Politécnica de Cartagena',
    description: 'Plan de Transporte al Trabajo para la Universidad Politécnica de Cartagena, con más de 1.500 trabajadores entre PDI y PAS.',
    content: `ITEM Consulting ha elaborado el Plan de Transporte al Trabajo (PTT) para la Universidad Politécnica de Cartagena (UPCT), una institución con más de 1.500 trabajadores distribuidos en diferentes campus.

### Marco normativo - Ley 9/2025
La UPCT está obligada a elaborar un PTT según la Ley 9/2025 de Movilidad Sostenible, al superar los 200 trabajadores. El plan debe incluir medidas para reducir las emisiones derivadas de los desplazamientos laborales.

### Diagnóstico de movilidad
- 55% de los trabajadores usa vehículo privado
- 30% usa transporte público
- 10% usa bicicleta
- 5% se desplaza a pie
- Dispersión de campus dificulta la movilidad interna

### Medidas propuestas
#### Transporte público
- Acuerdo con empresa de autobuses para líneas especiales
- Subvención del 60% en abonos de transporte
- Lanzadera entre campus

#### Movilidad activa
- Red de carriles bici entre campus
- Aparcabicis cubiertos en cada campus
- Vestuarios y duchas para ciclistas
- Programa de bicicleta eléctrica compartida

#### Movilidad compartida
- Plataforma de carpooling interna
- Plazas preferentes para vehículos compartidos
- Incentivos económicos por compartir vehículo

#### Vehículos eléctricos
- 15 puntos de recarga distribuidos en campus
- Plazas preferentes para VEH
- Flota de vehículos eléctricos para servicios internos

#### Teletrabajo
- Fomento del teletrabajo cuando sea posible
- Horarios flexibles
- Reuniones online vs. presenciales

### Indicadores de seguimiento
- Porcentaje de trabajadores en modos sostenibles
- Emisiones de CO2 evitadas
- Nivel de satisfacción de la plantilla
- Uso de infraestructuras`,
    imageUrl: '/images/5.png',
    category: 'PTT',
    date: '2025-12-15',
  },
  {
    id: '35',
    title: 'Estudio de Movilidad en Puerto de Cartagena',
    description: 'Estudio de movilidad y accesibilidad para el Puerto de Cartagena, optimizando el transporte de mercancías y trabajadores.',
    content: `ITEM Consulting ha realizado un estudio de movilidad integral para la Autoridad Portuaria de Cartagena, analizando los flujos de mercancías y trabajadores y proponiendo mejoras para optimizar la accesibilidad.

### Alcance del estudio
- Análisis del transporte de mercancías
- Estudio de la movilidad de 2.000+ trabajadores
- Evaluación de los accesos al puerto
- Análisis de la intermodalidad
- Propuesta de mejoras

### Diagnóstico
#### Problemas identificados
- Congestión en horas de entrada y salida
- Conflictos entre tráfico de mercancías y trabajadores
- Insuficiente transporte público
- Falta de aparcamiento para trabajadores
- Impacto ambiental del tráfico de camiones

### Propuestas de mejora
#### Transporte público
- Nueva línea de autobús desde Cartagena
- Horarios adaptados a turnos portuarios
- Subvención de abonos

#### Movilidad sostenible
- Carril bici desde Cartagena hasta el puerto
- Aparcabicis para trabajadores
- Programa de incentivos al carpooling

#### Gestión del tráfico de mercancías
- Ventanas horarias para camiones
- Sistema de información en tiempo real
- Mejora de los accesos

#### Intermodalidad
- Mejora de la conexión ferroviaria
- Optimización de la terminal de contenedores
- Facilitación del transporte intermodal

#### Ley 9/2025 - PTT
El estudio incluye recomendaciones para que las empresas del puerto cumplan con la Ley 9/2025 de Movilidad Sostenible, facilitando la elaboración de Planes de Transporte al Trabajo coordinados.

### Impacto esperado
- Reducción del 25% en emisiones de CO2
- Mejora de la accesibilidad
- Reducción de la congestión
- Mejora de la calidad del aire`,
    imageUrl: '/images/6.png',
    category: 'Estudios de Tráfico',
    date: '2026-01-20',
  },
];

// 35+ Noticias
const initialNews: NewsItem[] = [
  {
    id: '1',
    title: 'Aprobado el PMUS de Alcantarilla',
    excerpt: 'El Ayuntamiento de Alcantarilla ha aprobado oficialmente el nuevo Plan de Movilidad Urbana Sostenible desarrollado por ITEM Consulting.',
    content: `El Pleno Municipal del Ayuntamiento de Alcantarilla ha aprobado por unanimidad el Plan de Movilidad Urbana Sostenible (PMUS) elaborado por ITEM Consulting Engineering S.L.

### Un hito para la movilidad sostenible

El PMUS de Alcantarilla representa un paso decisivo hacia la transformación del modelo de movilidad del municipio. Este plan establece las líneas estratégicas para los próximos años con el objetivo de reducir las emisiones de CO2, mejorar la calidad del aire y hacer del municipio un lugar más habitable.

### Contenido del plan

El documento aprobado incluye:
- Diagnóstico exhaustivo de la situación actual de movilidad
- Objetivos cuantificados de reducción de emisiones
- Medidas concretas priorizadas por impacto y viabilidad
- Plan de implementación con hitos temporales
- Estimación de costes e inversiones necesarias

### Reacciones institucionales

El alcalde de Alcantarilla ha destacado que "este plan nos permite acceder a fondos europeos para mejorar la movilidad de nuestros vecinos y vecinas, haciendo de Alcantarilla un municipio más sostenible y habitable".

El equipo de ITEM Consulting ha expresado su satisfacción por el resultado del trabajo conjunto: "Hemos elaborado un plan ambicioso pero realista, que responde a las necesidades reales del municipio".

### Próximos pasos

Con la aprobación del PMUS, el Ayuntamiento ya puede presentar proyectos a las convocatorias de ayudas de movilidad sostenible, tanto a nivel autonómico como europeo.`,
    imageUrl: '/images/3.png',
    date: '2021-11-10',
  },
  {
    id: '2',
    title: 'ITEM Consulting participa en jornadas sobre movilidad sostenible',
    excerpt: 'Nuestro equipo ha participado activamente en las jornadas técnicas sobre movilidad urbana organizadas por la Federación Española de Municipios y Provincias.',
    content: `Técnicos de ITEM Consulting han participado como ponentes en las Jornadas Técnicas sobre Movilidad Urbana Sostenible organizadas por la Federación Española de Municipios y Provincias (FEMP).

### Compartiendo conocimiento y experiencia

Las jornadas, que han reunido a más de 200 técnicos municipales de toda España, han tenido como objetivo principal compartir experiencias y buenas prácticas en materia de movilidad sostenible.

### Ponencia de ITEM Consulting

El director técnico de ITEM Consulting ha impartido la ponencia titulada "Microsimulación del tráfico: una herramienta clave para la toma de decisiones", explicando cómo la modelización de tráfico permite predecir el comportamiento de los flujos vehiculares.

"La microsimulación nos permite probar diferentes escenarios sin necesidad de realizar obras, lo que supone un ahorro económico importante", ha explicado durante su intervención.

### Casos prácticos presentados

Durante la ponencia se presentaron varios casos prácticos de estudios realizados por ITEM Consulting:
- Optimización de ciclos semafóricos
- Estudio de peatonalización
- Análisis de capacidad de intersecciones

### Mesa redonda sobre fondos Next Generation EU

También se participó en la mesa redonda dedicada a la financiación de proyectos de movilidad sostenible con fondos europeos.`,
    imageUrl: '/images/meeting-2284501_960_720.jpg',
    date: '2023-05-15',
  },
  {
    id: '3',
    title: 'Nueva Ley de Movilidad Sostenible: implicaciones para empresas',
    excerpt: 'Analizamos las principales novedades de la nueva normativa y cómo afecta a las empresas en materia de planes de transporte al trabajo.',
    content: `La publicación de la nueva normativa de Movilidad Sostenible supone un punto de inflexión en la política de transportes y movilidad en España.

### Un nuevo marco normativo

La ley establece un nuevo marco jurídico para un sistema de movilidad sostenible, inclusivo y multimodal. Entre sus principales novedades destacan:

#### Planes de Movilidad Urbana Sostenible (PMUS)

Los municipios de más de 50.000 habitantes deben elaborar un PMUS completo, y los de 20.000 a 50.000 habitantes un PMUS simplificado.

#### Planes de Movilidad Sostenible al Trabajo (PTT)

Las empresas y entidades del sector público con centros de trabajo de más de 200 personas trabajadores deben elaborar e implantar un Plan de Movilidad Sostenible al Trabajo.

#### Espacio de Datos Integrado de Movilidad (EDIM)

Plataforma digital para centralizar información sobre movilidad y registro obligatorio de planes.

### Implicaciones para empresas

Las empresas obligadas deberán elaborar e implantar un PTT que incluya medidas de movilidad activa, transporte colectivo, movilidad de bajas emisiones, teletrabajo y seguridad vial.

### Implicaciones para municipios

Los municipios deben elaborar PMUS que incluyan diagnóstico de movilidad, objetivos de reducción de emisiones, medidas concretas e indicadores de seguimiento.`,
    imageUrl: '/images/5.png',
    date: '2025-12-10',
  },
  {
    id: '4',
    title: 'ITEM Consulting amplía su equipo de profesionales',
    excerpt: 'La empresa sigue creciendo con la incorporación de nuevos especialistas en ingeniería de transporte y movilidad sostenible.',
    content: `ITEM Consulting continúa su expansión con la incorporación de nuevos profesionales especializados en diferentes áreas de la ingeniería de transporte y la movilidad sostenible.

### Nuevas incorporaciones

El equipo de ITEM Consulting se ha reforzado con:
- Ingenieros de caminos especializados en movilidad urbana
- Especialistas en modelización de tráfico
- Expertos en movilidad eléctrica
- Consultores en financiación europea

### Compromiso con la excelencia

"Estas incorporaciones refuerzan nuestra capacidad para atender la creciente demanda de servicios de consultoría en movilidad sostenible", ha declarado el director general de ITEM Consulting.

### Formación continua

Todos los nuevos integrantes del equipo reciben formación específica en las metodologías y herramientas utilizadas por ITEM Consulting, incluyendo:
- Software de microsimulación PTV Vissim
- Sistemas de información geográfica ArcGIS
- Metodologías de análisis de datos
- Normativa vigente en movilidad sostenible`,
    imageUrl: '/images/6.png',
    date: '2023-06-20',
  },
  {
    id: '5',
    title: 'Éxito en la implantación del servicio MUyBICI',
    excerpt: 'El servicio de bicicleta pública de Murcia mejora su cobertura gracias al análisis de ITEM Consulting.',
    content: `El servicio de bicicleta pública de Murcia, MUyBICI, ha experimentado una mejora significativa en su cobertura y eficiencia tras el análisis y optimización realizado por ITEM Consulting.

### Mejoras implementadas

Tras el estudio realizado por ITEM Consulting, se han implementado las siguientes mejoras:
- Reubicación de estaciones a zonas de mayor demanda
- Ampliación del servicio a nuevos barrios
- Mejora del sistema de reequilibrio de flotas
- Optimización de la distribución espacial de estaciones

### Resultados

Los resultados de la optimización han sido muy positivos:
- Aumento significativo de usuarios
- Reducción de desequilibrios en la distribución de bicicletas
- Mejora de la satisfacción de los usuarios
- Incremento del número de viajes realizados

### Próximos pasos

ITEM Consulting continuará colaborando con el Ayuntamiento de Murcia en la mejora continua del servicio, incluyendo:
- Ampliación de la flota de bicicletas eléctricas
- Mejora de la aplicación móvil
- Integración con otros modos de transporte`,
    imageUrl: '/images/bike-3854437_960_720.jpg',
    date: '2023-08-15',
  },
  {
    id: '6',
    title: 'ITEM Consulting obtiene certificación de calidad',
    excerpt: 'La empresa ha obtenido la certificación ISO 9001:2015 que avala la calidad de sus procesos y servicios.',
    content: `ITEM Consulting ha obtenido la certificación ISO 9001:2015, que reconoce la calidad de sus procesos y servicios de consultoría en ingeniería de transporte y movilidad sostenible.

### Un reconocimiento al compromiso con la calidad

La certificación ISO 9001:2015 es el estándar internacional más reconocido en materia de gestión de la calidad. Su obtención demuestra el compromiso de ITEM Consulting con:
- La mejora continua de sus procesos
- La satisfacción de sus clientes
- La gestión eficiente de sus recursos
- El cumplimiento de la normativa aplicable

### Proceso de certificación

El proceso de certificación ha incluido:
- Auditoría de los procesos de la empresa
- Evaluación de la documentación
- Entrevistas con el equipo
- Verificación del cumplimiento de los requisitos de la norma

### Beneficios para los clientes

La certificación ISO 9001:2015 aporta beneficios directos a los clientes de ITEM Consulting:
- Mayor confianza en los servicios recibidos
- Garantía de procesos estandarizados
- Mejora continua de la calidad
- Mayor transparencia en la gestión`,
    imageUrl: '/images/7.png',
    date: '2023-09-10',
  },
  {
    id: '7',
    title: 'Jornada técnica sobre movilidad eléctrica',
    excerpt: 'ITEM Consulting organiza una jornada técnica sobre las últimas tendencias en movilidad eléctrica urbana.',
    content: `ITEM Consulting ha organizado una jornada técnica sobre movilidad eléctrica urbana, dirigida a técnicos municipales y profesionales del sector.

### Contenido de la jornada

La jornada ha incluido las siguientes ponencias:
- Estado actual de la movilidad eléctrica en España
- Infraestructura de recarga: tipologías y ubicación
- Experiencias de éxito en municipios españoles
- Ayudas y subvenciones disponibles
- Casos prácticos de implantación

### Ponentes invitados

Han participado como ponentes:
- Representantes de fabricantes de vehículos eléctricos
- Técnicos de empresas de infraestructura de recarga
- Responsables de movilidad de diferentes ayuntamientos
- Expertos en financiación de proyectos

### Conclusiones

Las principales conclusiones de la jornada han sido:
- La movilidad eléctrica es una realidad cada vez más presente
- La planificación es clave para el éxito de la implantación
- La colaboración público-privada facilita el desarrollo
- La información y formación de usuarios es fundamental`,
    imageUrl: '/images/8.png',
    date: '2023-10-25',
  },
  {
    id: '8',
    title: 'Nuevo proyecto de consultoría para fondos europeos',
    excerpt: 'ITEM Consulting asesora a varios municipios en la preparación de proyectos para acceder a fondos Next Generation EU.',
    content: `ITEM Consulting ha sido seleccionada por varios municipios de la Región de Murcia para asesorarles en la preparación de proyectos de movilidad sostenible financiables con fondos Next Generation EU.

### Servicios de consultoría

Los servicios que se prestan incluyen:
- Identificación de proyectos candidatos
- Elaboración de memorias técnicas
- Estudios de viabilidad
- Preparación de documentación para convocatorias
- Seguimiento de la tramitación

### Tipos de proyectos

Los proyectos que se están preparando incluyen:
- Carriles bici y vías ciclistas
- Electrificación de transporte público
- Peatonalización de espacios urbanos
- Mejora de la accesibilidad
- Infraestructura de recarga para vehículos eléctricos

### Importancia de la financiación europea

Los fondos Next Generation EU representan una oportunidad histórica para transformar la movilidad de los municipios. ITEM Consulting acompaña a los ayuntamientos en todo el proceso para maximizar las posibilidades de obtener la financiación.`,
    imageUrl: '/images/9.png',
    date: '2023-11-20',
  },
  {
    id: '9',
    title: 'Publicación de guía sobre PMUS',
    excerpt: 'ITEM Consulting publica una guía práctica sobre la elaboración de Planes de Movilidad Urbana Sostenible.',
    content: `ITEM Consulting ha publicado una guía práctica sobre la elaboración de Planes de Movilidad Urbana Sostenible (PMUS), dirigida a técnicos municipales y profesionales del sector.

### Contenido de la guía

La guía incluye los siguientes capítulos:
1. Introducción a los PMUS: concepto y marco normativo
2. Metodología de elaboración paso a paso
3. Diagnóstico de la movilidad: técnicas y herramientas
4. Participación ciudadana en la elaboración del PMUS
5. Diseño de medidas de movilidad sostenible
6. Evaluación de impactos ambientales y económicos
7. Plan de implementación y seguimiento
8. Casos prácticos de éxito

### Objetivo de la guía

El objetivo de esta guía es facilitar la elaboración de PMUS de calidad, proporcionando una metodología probada y herramientas prácticas que pueden ser utilizadas por cualquier técnico municipal.

### Disponibilidad

La guía está disponible de forma gratuita en la web de ITEM Consulting para todos los profesionales interesados en la materia.`,
    imageUrl: '/images/10.png',
    date: '2024-01-15',
  },
  {
    id: '10',
    title: 'Colaboración con Universidad de Murcia',
    excerpt: 'ITEM Consulting firma un convenio de colaboración con la Universidad de Murcia para prácticas de estudiantes.',
    content: `ITEM Consulting ha firmado un convenio de colaboración con la Universidad de Murcia para la realización de prácticas de estudiantes de ingeniería y otras titulaciones relacionadas.

### Objetivos del convenio

El convenio tiene como objetivos:
- Facilitar la inserción laboral de los estudiantes
- Transferir conocimiento entre la universidad y la empresa
- Fomentar la investigación en materia de movilidad sostenible
- Crear sinergias entre el mundo académico y el empresarial

### Perfiles de prácticas

Se ofrecerán prácticas para estudiantes de:
- Ingeniería de Caminos, Canales y Puertos
- Ingeniería Industrial
- Geografía
- Economía
- Otras titulaciones relacionadas

### Formación durante las prácticas

Los estudiantes en prácticas recibirán formación en:
- Software de modelización de tráfico
- Metodologías de análisis de datos
- Normativa de movilidad sostenible
- Elaboración de informes técnicos`,
    imageUrl: '/images/11.png',
    date: '2024-02-20',
  },
  {
    id: '11',
    title: 'Premio a la mejor consultora de movilidad',
    excerpt: 'ITEM Consulting ha sido galardonada con el premio a la mejor consultora de movilidad sostenible de la Región de Murcia.',
    content: `ITEM Consulting ha recibido el premio a la mejor consultora de movilidad sostenible de la Región de Murcia, otorgado por la asociación de municipios de la zona.

### Reconocimiento a la trayectoria

El premio reconoce la trayectoria de ITEM Consulting en:
- Elaboración de PMUS de calidad
- Innovación en metodologías de trabajo
- Compromiso con la sostenibilidad
- Satisfacción de los clientes

### Valoración del jurado

El jurado ha valorado especialmente:
- La calidad técnica de los proyectos realizados
- El compromiso con la innovación
- La capacidad de adaptación a las necesidades de cada municipio
- Los resultados obtenidos en los proyectos implementados

### Agradecimientos

ITEM Consulting agradece este reconocimiento a todos los profesionales que forman parte del equipo y a los clientes que han confiado en nosotros.`,
    imageUrl: '/images/12.png',
    date: '2024-03-15',
  },
  {
    id: '12',
    title: 'Nueva oficina en el centro de Murcia',
    excerpt: 'ITEM Consulting inaugura nuevas instalaciones en el centro de Murcia para mejorar la atención a sus clientes.',
    content: `ITEM Consulting ha inaugurado nuevas instalaciones en el centro de Murcia, con el objetivo de mejorar la atención a sus clientes y ampliar la capacidad de trabajo del equipo.

### Nuevas instalaciones

Las nuevas oficinas cuentan con:
- Espacios de trabajo modernos y funcionales
- Sala de reuniones equipada con tecnología audiovisual
- Zona de formación para talleres y jornadas
- Espacios colaborativos para el equipo

### Mejora de servicios

Con estas nuevas instalaciones, ITEM Consulting podrá:
- Atender mejor a los clientes que visitan las oficinas
- Organizar jornadas técnicas y de formación
- Ampliar el equipo de profesionales
- Mejorar la coordinación entre los diferentes departamentos

### Ubicación

Las nuevas oficinas están ubicadas en una zona céntrica de Murcia, con fácil acceso en transporte público y cercanía a las principales instituciones.`,
    imageUrl: '/images/13.png',
    date: '2024-04-10',
  },
  {
    id: '13',
    title: 'Webinar sobre microsimulación de tráfico',
    excerpt: 'ITEM Consulting organiza un webinar gratuito sobre técnicas de microsimulación de tráfico con PTV Vissim.',
    content: `ITEM Consulting ha organizado un webinar gratuito sobre técnicas de microsimulación de tráfico utilizando el software PTV Vissim, dirigido a técnicos municipales y profesionales del sector.

### Contenido del webinar

El webinar ha incluido:
- Introducción a la microsimulación de tráfico
- Presentación del software PTV Vissim
- Metodología para la creación de modelos
- Análisis de resultados y generación de informes
- Casos prácticos de aplicación

### Ponentes

El webinar ha sido impartido por técnicos de ITEM Consulting especializados en microsimulación, con amplia experiencia en proyectos reales.

### Asistencia

El webinar ha contado con la participación de más de 100 profesionales de toda España, que han podido interactuar con los ponentes y resolver sus dudas.

### Grabación disponible

La grabación del webinar está disponible en la web de ITEM Consulting para todos los profesionales interesados.`,
    imageUrl: '/images/14.png',
    date: '2024-05-25',
  },
  {
    id: '14',
    title: 'Nueva herramienta de análisis de datos',
    excerpt: 'ITEM Consulting desarrolla una herramienta propia para el análisis de datos de movilidad.',
    content: `ITEM Consulting ha desarrollado una herramienta propia para el análisis de datos de movilidad, que permite procesar grandes volúmenes de información de forma eficiente.

### Características de la herramienta

La herramienta desarrollada permite:
- Importar datos de múltiples fuentes
- Realizar análisis estadísticos avanzados
- Generar visualizaciones interactivas
- Exportar resultados en diferentes formatos
- Automatizar informes periódicos

### Ventajas competitivas

Esta herramienta aporta ventajas competitivas a ITEM Consulting:
- Mayor eficiencia en el análisis de datos
- Reducción de tiempos de procesamiento
- Mejora de la calidad de los informes
- Capacidad de análisis predictivo

### Aplicaciones

La herramienta se aplica en:
- Análisis de aforos vehiculares
- Estudios de origen-destino
- Evaluación de políticas de movilidad
- Predicción de demanda`,
    imageUrl: '/images/code-1839406_960_720.jpg',
    date: '2024-06-18',
  },
  {
    id: '15',
    title: 'Participación en feria internacional',
    excerpt: 'ITEM Consulting participa en la feria internacional de movilidad sostenible celebrada en Barcelona.',
    content: `ITEM Consulting ha participado en la feria internacional de movilidad sostenible celebrada en Barcelona, donde ha presentado sus servicios y proyectos más destacados.

### Presencia en la feria

Durante la feria, ITEM Consulting ha:
- Presentado sus servicios de consultoría
- Mostrado casos de éxito de proyectos realizados
- Establecido contactos con potenciales clientes
- Intercambiado experiencias con otras empresas del sector

### Interés generado

La participación en la feria ha generado gran interés entre los visitantes, que han mostrado especial interés en:
- Los servicios de elaboración de PMUS
- La experiencia en financiación europea
- Las herramientas de microsimulación
- Los estudios de movilidad eléctrica

### Próximas ediciones

ITEM Consulting tiene previsto participar en próximas ediciones de ferias del sector tanto a nivel nacional como internacional.`,
    imageUrl: '/images/15.png',
    date: '2024-07-22',
  },
  {
    id: '16',
    title: 'Publicación de artículo científico',
    excerpt: 'El equipo de ITEM Consulting publica un artículo científico sobre modelización de demanda de transporte.',
    content: `El equipo de ITEM Consulting ha publicado un artículo científico sobre modelización de demanda de transporte en una revista internacional indexada.

### Contenido del artículo

El artículo presenta una nueva metodología para la modelización de demanda de transporte urbano, que incorpora variables relacionadas con la sostenibilidad ambiental.

### Contribución científica

La principal contribución del artículo es:
- Desarrollo de un modelo de demanda que incluye factores ambientales
- Validación del modelo con datos reales de municipios españoles
- Comparación con modelos tradicionales
- Propuesta de aplicación en la planificación de políticas de movilidad

### Reconocimiento

La publicación ha sido bien recibida por la comunidad científica, que ha destacado la originalidad y aplicabilidad de la propuesta.

### Impacto

Este tipo de publicaciones refuerzan el compromiso de ITEM Consulting con la investigación y la innovación en el campo de la movilidad sostenible.`,
    imageUrl: '/images/paper-3213924_960_720.jpg',
    date: '2024-08-30',
  },
  {
    id: '17',
    title: 'Curso de formación para técnicos municipales',
    excerpt: 'ITEM Consulting imparte un curso de formación sobre elaboración de PMUS para técnicos municipales.',
    content: `ITEM Consulting ha impartido un curso de formación sobre elaboración de Planes de Movilidad Urbana Sostenible, dirigido a técnicos municipales de la Región de Murcia.

### Contenido del curso

El curso ha incluido los siguientes módulos:
1. Marco normativo de los PMUS
2. Metodología de elaboración
3. Técnicas de recopilación de datos
4. Participación ciudadana
5. Diseño de medidas
6. Evaluación de impactos
7. Plan de implementación

### Modalidad

El curso se ha impartido en modalidad presencial durante dos jornadas completas, combinando sesiones teóricas con talleres prácticos.

### Participantes

Han participado técnicos de más de 20 municipios de la Región de Murcia, que han valorado muy positivamente el contenido y la metodología del curso.

### Próximas ediciones

ITEM Consulting tiene previsto organizar nuevas ediciones del curso, tanto en la Región de Murcia como en otras comunidades autónomas.`,
    imageUrl: '/images/16.png',
    date: '2024-09-25',
  },
  {
    id: '18',
    title: 'Acuerdo de colaboración con empresa tecnológica',
    excerpt: 'ITEM Consulting firma un acuerdo de colaboración con una empresa tecnológica para el desarrollo de soluciones smart mobility.',
    content: `ITEM Consulting ha firmado un acuerdo de colaboración con una empresa tecnológica especializada en soluciones de smart mobility para el desarrollo conjunto de proyectos.

### Objetivos del acuerdo

El acuerdo tiene como objetivos:
- Desarrollar soluciones tecnológicas para la gestión de la movilidad
- Integrar sistemas de información en tiempo real
- Crear herramientas de análisis predictivo
- Ofrecer servicios integrales de consultoría y tecnología

### Líneas de trabajo

Las líneas de trabajo principales son:
- Sistemas de gestión de flotas de transporte público
- Plataformas de información al viajero
- Sistemas de gestión de aparcamientos
- Soluciones de movilidad compartida

### Beneficios para los clientes

Este acuerdo permitirá ofrecer a los clientes soluciones integrales que combinan la experiencia en consultoría de ITEM Consulting con las capacidades tecnológicas de su socio.`,
    imageUrl: '/images/17.png',
    date: '2024-10-15',
  },
  {
    id: '19',
    title: 'Estudio sobre impacto del teletrabajo en movilidad',
    excerpt: 'ITEM Consulting presenta los resultados de un estudio sobre el impacto del teletrabajo en los patrones de movilidad.',
    content: `ITEM Consulting ha presentado los resultados de un estudio sobre el impacto del teletrabajo en los patrones de movilidad de los trabajadores de la Región de Murcia.

### Metodología del estudio

El estudio se ha realizado mediante:
- Encuestas a trabajadores que teletrabajan
- Análisis de datos de movilidad
- Entrevistas con empresas
- Comparación con período pre-pandemia

### Resultados principales

Los principales resultados del estudio son:
- Reducción significativa de desplazamientos laborales
- Cambio en los modos de transporte utilizados
- Disminución de emisiones de CO2
- Mejora de la conciliación laboral
- Necesidad de nuevas infraestructuras en zonas residenciales

### Implicaciones para la planificación

El estudio concluye que el teletrabajo tiene implicaciones importantes para la planificación de la movilidad urbana, que debe adaptarse a estos nuevos patrones.

### Informe completo

El informe completo del estudio está disponible para descarga gratuita en la web de ITEM Consulting.`,
    imageUrl: '/images/18.png',
    date: '2024-11-20',
  },
  {
    id: '20',
    title: 'Reconocimiento como empresa innovadora',
    excerpt: 'ITEM Consulting obtiene el selo de empresa innovadora concedido por el Ministerio de Ciencia e Innovación.',
    content: `ITEM Consulting ha obtenido el sello de empresa innovadora concedido por el Ministerio de Ciencia e Innovación, que reconoce la capacidad de innovación de la empresa.

### Requisitos para la obtención

Para obtener este reconocimiento, ITEM Consulting ha demostrado:
- Inversión en I+D+i
- Personal cualificado dedicado a actividades de innovación
- Capacidad para desarrollar nuevos productos y servicios
- Colaboración con centros de investigación
- Resultados tangibles de la actividad innovadora

### Beneficios del reconocimiento

Este reconocimiento aporta beneficios como:
- Acceso prioritario a programas de financiación
- Deducciones fiscales en la cuota de la Seguridad Social
- Mejora de la imagen de la empresa
- Ventaja competitiva en concursos públicos

### Compromiso con la innovación

ITEM Consulting mantiene su compromiso con la innovación, continuando con la inversión en I+D+i y la colaboración con centros de investigación.`,
    imageUrl: '/images/19.png',
    date: '2024-12-15',
  },
  {
    id: '21',
    title: 'Nuevo servicio de auditoría de PTT',
    excerpt: 'ITEM Consulting lanza un nuevo servicio de auditoría de Planes de Transporte al Trabajo.',
    content: `ITEM Consulting ha lanzado un nuevo servicio de auditoría de Planes de Transporte al Trabajo (PTT), dirigido a empresas que ya han implantado su plan y desean evaluar su cumplimiento y efectividad.

### Contenido de la auditoría

La auditoría incluye:
- Revisión del cumplimiento normativo
- Evaluación de la implantación de medidas
- Análisis de indicadores de seguimiento
- Identificación de áreas de mejora
- Propuesta de actualizaciones

### Metodología

La auditoría se realiza mediante:
- Revisión documental
- Entrevistas con responsables
- Encuestas a trabajadores
- Análisis de datos de movilidad
- Inspección de instalaciones

### Beneficios para las empresas

Este servicio permite a las empresas:
- Asegurar el cumplimiento de la normativa
- Mejorar la efectividad de las medidas
- Identificar oportunidades de mejora
- Optimizar los recursos invertidos
- Prepararse para posibles inspecciones`,
    imageUrl: '/images/20.png',
    date: '2025-01-20',
  },
  {
    id: '22',
    title: 'Participación en proyecto europeo de investigación',
    excerpt: 'ITEM Consulting forma parte de un consorcio internacional para un proyecto de investigación sobre movilidad urbana.',
    content: `ITEM Consulting forma parte de un consorcio internacional que ha sido seleccionado para desarrollar un proyecto de investigación sobre movilidad urbana sostenible, financiado por la Unión Europea.

### Objetivos del proyecto

El proyecto tiene como objetivos:
- Desarrollar nuevas metodologías de planificación de la movilidad
- Probar soluciones innovadoras en ciudades piloto
- Crear herramientas de apoyo a la toma de decisiones
- Formar a profesionales del sector
- Difundir los resultados obtenidos

### Socios del consorcio

El consorcio está formado por:
- Universidades de diferentes países europeos
- Centros de investigación
- Empresas de consultoría
- Ayuntamientos socios

### Papel de ITEM Consulting

ITEM Consulting participará en:
- La aplicación de las metodologías desarrolladas
- La coordinación de las actividades en España
- La formación de profesionales
- La difusión de los resultados

### Duración y presupuesto

El proyecto tiene una duración de tres años y un presupuesto total de varios millones de euros.`,
    imageUrl: '/images/21.png',
    date: '2025-02-10',
  },
  {
    id: '23',
    title: 'La Ley 9/2025 de Movilidad Sostenible: guía práctica para empresas',
    excerpt: 'Publicamos una guía completa sobre la Ley 9/2025 de Movilidad Sostenible y cómo afecta a las empresas obligadas a elaborar Planes de Transporte al Trabajo.',
    content: `ITEM Consulting ha publicado una guía práctica sobre la Ley 9/2025 de Movilidad Sostenible, dirigida a empresas y entidades que están obligadas a elaborar e implantar Planes de Transporte al Trabajo (PTT).

### ¿Qué establece la Ley 9/2025?

La Ley de Movilidad Sostenible establece la obligatoriedad para empresas y entidades del sector público con centros de trabajo de más de 200 personas trabajadoras (o 100 por turno) de elaborar e implantar un Plan de Movilidad Sostenible al Trabajo.

### Plazos de implantación

Las empresas obligadas disponen de un plazo de 24 meses desde la entrada en vigor de la normativa para elaborar e implantar su PTT. Es importante no esperar al último momento para cumplir con esta obligación.

### Contenido del PTT

El plan debe incluir medidas en las siguientes áreas:
- Movilidad activa (peatón y bicicleta)
- Transporte colectivo
- Movilidad compartida (carpooling, carsharing)
- Teletrabajo y flexibilidad horaria
- Vehículos de bajas emisiones
- Seguridad vial

### Registro en el EDIM

Los planes deben registrarse en el EDIM (Espacio de Datos Integrado de Movilidad), una plataforma digital gestionada por el Ministerio de Transportes.

### Cómo podemos ayudarte

En ITEM Consulting acompañamos a las empresas en todo el proceso:
- Diagnóstico de la movilidad actual
- Diseño de medidas personalizadas
- Negociación con representantes de trabajadores
- Implantación y seguimiento
- Registro en el EDIM`,
    imageUrl: '/images/5.png',
    date: '2025-03-15',
  },
  {
    id: '24',
    title: 'ITEM Consulting elabora 10 nuevos PTT en el primer trimestre de 2025',
    excerpt: 'Nuestra empresa ha experimentado un crecimiento significativo en la elaboración de Planes de Transporte al Trabajo tras la entrada en vigor de la Ley 9/2025.',
    content: `ITEM Consulting ha elaborado 10 nuevos Planes de Transporte al Trabajo (PTT) durante el primer trimestre de 2025, respondiendo a la creciente demanda generada por la entrada en vigor de la Ley 9/2025 de Movilidad Sostenible.

### Empresas atendidas

Los PTT elaborados corresponden a empresas de diversos sectores:
- Industria manufacturera (3 empresas)
- Sector sanitario (2 hospitales)
- Centros comerciales (2 centros)
- Sector educativo (2 universidades)
- Sector logístico (1 empresa)

### Características de los planes

Todos los planes incluyen:
- Diagnóstico completo de la movilidad actual
- Paquete de medidas personalizadas
- Estimación de costes y beneficios
- Plan de implantación gradual
- Indicadores de seguimiento

### Resultados esperados

Se estima que la implantación de estos planes permitirá:
- Reducir las emisiones de CO2 en un 25-30%
- Incrementar el uso de modos sostenibles en un 20%
- Mejorar la satisfacción de los trabajadores
- Cumplir con la normativa vigente

### Equipo ampliado

Para atender esta demanda, ITEM Consulting ha ampliado su equipo con nuevos especialistas en movilidad sostenible y Planes de Transporte al Trabajo.`,
    imageUrl: '/images/14.png',
    date: '2025-04-01',
  },
  {
    id: '25',
    title: 'Jornada informativa sobre la Ley 9/2025 en la Cámara de Comercio',
    excerpt: 'ITEM Consulting participa en una jornada informativa sobre la Ley de Movilidad Sostenible organizada por la Cámara de Comercio de Murcia.',
    content: `ITEM Consulting ha participado en una jornada informativa sobre la Ley 9/2025 de Movilidad Sostenible, organizada por la Cámara de Comercio de Murcia y dirigida a empresas de la Región.

### Contenido de la jornada

La jornada ha abordado los siguientes temas:
- Marco normativo de la Ley 9/2025
- Empresas obligadas y plazos
- Contenido de los Planes de Transporte al Trabajo
- Proceso de elaboración e implantación
- Registro en el EDIM
- Financiación disponible

### Ponencia de ITEM Consulting

Nuestro director técnico ha impartido la ponencia "Cómo elaborar un PTT exitoso", compartiendo la experiencia acumulada en la elaboración de más de 10 planes durante los últimos meses.

"La clave del éxito está en involucrar a todos los agentes desde el principio: dirección, trabajadores y representantes sindicales", ha destacado durante su intervención.

### Asistencia

La jornada ha contado con la participación de más de 150 representantes de empresas de la Región, que han mostrado gran interés en conocer los detalles de la normativa.

### Próximas ediciones

ITEM Consulting tiene previsto participar en nuevas jornadas informativas en diferentes puntos de la Región de Murcia.`,
    imageUrl: '/images/meeting-2284501_960_720.jpg',
    date: '2025-04-20',
  },
  {
    id: '26',
    title: 'Nuevo servicio de auditoría de PTT',
    excerpt: 'ITEM Consulting lanza un servicio de auditoría de Planes de Transporte al Trabajo para empresas que ya han implantado su plan.',
    content: `ITEM Consulting ha lanzado un nuevo servicio de auditoría de Planes de Transporte al Trabajo (PTT), dirigido a empresas que ya han implantado su plan y desean evaluar su cumplimiento y efectividad.

### Contenido de la auditoría

La auditoría incluye:
- Revisión del cumplimiento normativo de la Ley 9/2025
- Evaluación de la implantación de medidas
- Análisis de indicadores de seguimiento
- Identificación de áreas de mejora
- Propuesta de actualizaciones

### Metodología

La auditoría se realiza mediante:
- Revisión documental del plan aprobado
- Entrevistas con responsables de movilidad
- Encuestas a trabajadores
- Análisis de datos de movilidad
- Inspección de instalaciones

### Beneficios para las empresas

Este servicio permite a las empresas:
- Asegurar el cumplimiento de la Ley 9/2025
- Mejorar la efectividad de las medidas implantadas
- Identificar oportunidades de mejora
- Optimizar los recursos invertidos
- Prepararse para posibles inspecciones

### Informe de auditoría

Al finalizar la auditoría se entrega un informe completo con:
- Estado actual del cumplimiento normativo
- Evaluación de cada medida implantada
- Recomendaciones de mejora
- Plan de actualización del PTT`,
    imageUrl: '/images/15.png',
    date: '2025-05-10',
  },
  {
    id: '27',
    title: 'ITEM Consulting obtiene la certificación ISO 14001',
    excerpt: 'Nuestra empresa ha obtenido la certificación ISO 14001, que reconoce nuestro compromiso con la gestión medioambiental.',
    content: `ITEM Consulting ha obtenido la certificación ISO 14001:2015, que reconoce la implementación de un Sistema de Gestión Ambiental eficaz en nuestra organización.

### Compromiso con la sostenibilidad

Esta certificación demuestra el compromiso de ITEM Consulting con la sostenibilidad y la protección del medio ambiente, valores que aplicamos tanto en nuestra gestión interna como en los proyectos que desarrollamos para nuestros clientes.

### Proceso de certificación

El proceso ha incluido:
- Auditoría de los procesos de la empresa
- Evaluación de los aspectos ambientales
- Análisis de la legislación aplicable
- Verificación del cumplimiento de los requisitos de la norma

### Beneficios

La certificación ISO 14001 aporta beneficios como:
- Mejora de la eficiencia en el uso de recursos
- Reducción de residuos y emisiones
- Cumplimiento de la legislación ambiental
- Mejora de la imagen de la empresa
- Ventaja competitiva en concursos públicos

### Coherencia con nuestros servicios

Esta certificación refuerza nuestra credibilidad como consultora especializada en movilidad sostenible, demostrando que aplicamos en nuestra propia gestión los principios que promovemos en nuestros proyectos.`,
    imageUrl: '/images/16.png',
    date: '2025-06-05',
  },
  {
    id: '28',
    title: 'Éxito en la implantación del PMUS de Ceutí',
    excerpt: 'El Ayuntamiento de Ceutí ha completado con éxito la implantación de las principales medidas de su Plan de Movilidad Urbana Sostenible.',
    content: `El Ayuntamiento de Ceutí ha completado con éxito la implantación de las principales medidas de su Plan de Movilidad Urbana Sostenible (PMUS), elaborado por ITEM Consulting, con resultados muy positivos.

### Medidas implantadas

Las principales medidas ya implementadas incluyen:
- 5 km de carriles bici segregados
- Nueva línea de autobús urbano
- Zona 30 en el casco urbano
- 200 plazas de aparcabicis
- Sistema de semaforización inteligente

### Resultados obtenidos

Tras un año de funcionamiento, los resultados son:
- Reducción del 20% en emisiones de CO2
- Aumento del 35% en uso de bicicleta
- Disminución del 15% en accidentes de tráfico
- Mejora de la satisfacción de los ciudadanos

### Reconocimiento

El proyecto ha sido reconocido por la Federación Española de Municipios y Provincias como uno de los mejores PMUS implantados en municipios de menos de 20.000 habitantes.

### Próximas actuaciones

El plan contempla nuevas actuaciones para los próximos años:
- Ampliación de la red de carriles bici
- Electrificación del transporte público
- Creación de zona de bajas emisiones

### Financiación

La implantación ha sido posible gracias a la financiación obtenida a través de fondos europeos Next Generation EU.`,
    imageUrl: '/images/4.png',
    date: '2025-07-15',
  },
  {
    id: '29',
    title: 'Convenio con la Comunidad Autónoma para PTT',
    excerpt: 'ITEM Consulting firma un convenio con la Comunidad Autónoma de la Región de Murcia para asesorar en la elaboración de PTT.',
    content: `ITEM Consulting ha firmado un convenio de colaboración con la Consejería de Fomento de la Comunidad Autónoma de la Región de Murcia para asesorar a empresas en la elaboración de Planes de Transporte al Trabajo (PTT) conforme a la Ley 9/2025.

### Objetivos del convenio

El convenio tiene como objetivos:
- Facilitar el cumplimiento de la Ley 9/2025 a las empresas de la Región
- Promover la movilidad sostenible en el ámbito laboral
- Reducir las emisiones de CO2 derivadas de los desplazamientos
- Mejorar la calidad del aire en las zonas urbanas

### Servicios incluidos

Los servicios que se prestarán incluyen:
- Asesoramiento técnico en la elaboración de PTT
- Formación a empresas y trabajadores
- Campañas de sensibilización
- Seguimiento de la implantación

### Empresas beneficiarias

El convenio está dirigido a empresas de la Región de Murcia con más de 200 trabajadores que están obligadas a elaborar un PTT según la Ley 9/2025.

### Subvenciones

Las empresas podrán acceder a subvenciones para la elaboración e implantación de sus PTT, cofinanciadas por la Comunidad Autónoma y fondos europeos.`,
    imageUrl: '/images/17.png',
    date: '2025-08-20',
  },
  {
    id: '30',
    title: 'Publicación del informe "Estado de la Movilidad en la Región de Murcia"',
    excerpt: 'ITEM Consulting publica un informe completo sobre el estado de la movilidad en la Región de Murcia, con datos y propuestas de mejora.',
    content: `ITEM Consulting ha publicado el informe "Estado de la Movilidad en la Región de Murcia 2025", un estudio exhaustivo que analiza la situación actual de la movilidad en nuestra región y propone líneas de actuación para los próximos años.

### Contenido del informe

El informe incluye:
- Análisis de los modos de transporte utilizados
- Evaluación de la red de transporte público
- Estudio de la infraestructura ciclista
- Análisis de la siniestralidad vial
- Evaluación de la calidad del aire
- Propuestas de mejora

### Datos destacados

Algunos de los datos más destacados del informe:
- El 65% de los desplazamientos se realizan en vehículo privado
- Solo el 3% de los desplazamientos se hacen en bicicleta
- El transporte público representa el 10% de los desplazamientos
- La siniestralidad ha disminuido un 8% en los últimos 5 años

### Recomendaciones

El informe incluye recomendaciones para:
- Mejorar la red de transporte público
- Ampliar la infraestructura ciclista
- Implementar más zonas 30
- Fomentar la movilidad compartida
- Desarrollar corredores seguros para peatones

### Disponibilidad

El informe completo está disponible de forma gratuita en la web de ITEM Consulting.`,
    imageUrl: '/images/18.png',
    date: '2025-09-10',
  },
  {
    id: '31',
    title: 'ITEM Consulting recibe el premio a la innovación en movilidad',
    excerpt: 'Nuestra empresa ha sido galardonada con el premio a la innovación en movilidad sostenible por la Asociación Española de la Carretera.',
    content: `ITEM Consulting ha recibido el premio a la innovación en movilidad sostenible, otorgado por la Asociación Española de la Carretera, en reconocimiento a nuestra trayectoria y aportaciones al sector.

### Motivo del premio

El premio reconoce:
- La innovación en metodologías de trabajo
- El desarrollo de herramientas propias de análisis
- La aplicación de nuevas tecnologías en proyectos
- La contribución al conocimiento científico
- La transferencia de conocimiento al sector

### Trayectoria innovadora

Algunos de nuestros proyectos más innovadores:
- Desarrollo de herramienta propia de análisis de datos
- Aplicación de machine learning en predicción de demanda
- Uso de realidad virtual en presentación de proyectos
- Integración de sistemas de información geográfica
- Desarrollo de plataformas de participación ciudadana

### Agradecimientos

ITEM Consulting agradece este reconocimiento a todos los profesionales que forman parte de nuestro equipo y a los clientes que confían en nosotros para desarrollar proyectos innovadores.

### Compromiso futuro

Este premio refuerza nuestro compromiso con la innovación y nos anima a seguir investigando y desarrollando nuevas soluciones para los desafíos de la movilidad sostenible.`,
    imageUrl: '/images/19.png',
    date: '2025-10-25',
  },
  {
    id: '32',
    title: 'Curso online sobre elaboración de PTT',
    excerpt: 'ITEM Consulting lanza un curso online sobre elaboración de Planes de Transporte al Trabajo conforme a la Ley 9/2025.',
    content: `ITEM Consulting ha lanzado un curso online sobre elaboración de Planes de Transporte al Trabajo (PTT), dirigido a profesionales que necesitan conocer los requisitos de la Ley 9/2025 de Movilidad Sostenible.

### Contenido del curso

El curso incluye los siguientes módulos:
1. Marco normativo: Ley 9/2025 y desarrollo
2. Empresas obligadas y plazos
3. Metodología de elaboración de PTT
4. Diagnóstico de movilidad
5. Diseño de medidas
6. Evaluación de impactos
7. Negociación con trabajadores
8. Implantación y seguimiento
9. Registro en el EDIM
10. Casos prácticos

### Modalidad

El curso se imparte en modalidad online, con:
- Vídeos de las sesiones teóricas
- Material descargable
- Ejercicios prácticos
- Foro de consultas
- Certificado de finalización

### Dirigido a

El curso está dirigido a:
- Técnicos de movilidad
- Responsables de RRHH
- Técnicos de prevención
- Consultores ambientales
- Estudiantes de ingeniería

### Inscripción

Las inscripciones están abiertas en la web de ITEM Consulting, con plazas limitadas para garantizar la calidad de la formación.`,
    imageUrl: '/images/20.png',
    date: '2025-11-15',
  },
  {
    id: '33',
    title: 'Alianza estratégica con empresa de movilidad compartida',
    excerpt: 'ITEM Consulting firma una alianza estratégica con una empresa líder en movilidad compartida para ofrecer soluciones integrales.',
    content: `ITEM Consulting ha firmado una alianza estratégica con una empresa líder en servicios de movilidad compartida, con el objetivo de ofrecer soluciones integrales a nuestros clientes.

### Objetivos de la alianza

La alianza persigue:
- Ofrecer soluciones completas de movilidad sostenible
- Integrar servicios de consultoría y tecnología
- Facilitar la implantación de medidas de movilidad compartida
- Desarrollar proyectos conjuntos innovadores

### Servicios integrados

Los servicios que se ofrecerán de forma conjunta incluyen:
- Elaboración de PTT con plataforma de carpooling incluida
- PMUS con sistema de bicicleta compartida
- Estudios de movilidad con datos de apps de movilidad
- Consultoría en movilidad compartida

### Beneficios para los clientes

Esta alianza permitirá a nuestros clientes:
- Acceder a soluciones integrales de movilidad
- Implantar medidas de movilidad compartida de forma sencilla
- Disponer de datos reales para evaluar el impacto
- Reducir costes mediante acuerdos conjuntos

### Proyectos conjuntos

Ya se están desarrollando los primeros proyectos conjuntos para empresas de la Región de Murcia que deben cumplir con la Ley 9/2025.`,
    imageUrl: '/images/bike-3854437_960_720.jpg',
    date: '2025-12-10',
  },
  {
    id: '34',
    title: 'Balance 2025: más de 50 proyectos completados',
    excerpt: 'ITEM Consulting cierra el año 2025 con un récord de proyectos completados, destacando el crecimiento en Planes de Transporte al Trabajo.',
    content: `ITEM Consulting cierra el año 2025 con un récord de más de 50 proyectos completados, destacando el crecimiento experimentado en la elaboración de Planes de Transporte al Trabajo (PTT) tras la entrada en vigor de la Ley 9/2025.

### Proyectos por tipología

La distribución de proyectos ha sido:
- Planes de Movilidad Urbana Sostenible (PMUS): 15
- Planes de Transporte al Trabajo (PTT): 18
- Estudios de tráfico: 12
- Consultoría en movilidad: 8
- Otros proyectos: 5

### Crecimiento en PTT

El crecimiento más destacado ha sido en PTT, pasando de 2 proyectos en 2024 a 18 en 2025, lo que representa un crecimiento del 800%. Este incremento se debe a la entrada en vigor de la Ley 9/2025 de Movilidad Sostenible.

### Clientes satisfechos

El 95% de nuestros clientes han valorado positivamente nuestros servicios, destacando:
- Calidad técnica de los proyectos
- Cumplimiento de plazos
- Atención personalizada
- Soluciones innovadoras

### Equipo ampliado

Para atender esta demanda, el equipo de ITEM Consulting ha crecido de 8 a 15 profesionales durante 2025.

### Perspectivas 2026

Para 2026 esperamos mantener el crecimiento, especialmente en PTT, ya que muchas empresas aún deben cumplir con la Ley 9/2025.`,
    imageUrl: '/images/21.png',
    date: '2026-01-05',
  },
  {
    id: '35',
    title: 'Nuevas ayudas para PTT en la Región de Murcia',
    excerpt: 'La Comunidad Autónoma anuncia nuevas ayudas para empresas que elaboren e implanten Planes de Transporte al Trabajo.',
    content: `La Comunidad Autónoma de la Región de Murcia ha anunciado nuevas ayudas para empresas que elaboren e implanten Planes de Transporte al Trabajo (PTT), con el objetivo de facilitar el cumplimiento de la Ley 9/2025 de Movilidad Sostenible.

### Características de las ayudas

Las ayudas cubrirán:
- Hasta el 70% del coste de elaboración del PTT
- Hasta el 50% de la inversión en infraestructuras
- Hasta el 40% de los costes de implantación de medidas

### Empresas beneficiarias

Podrán beneficiarse:
- Empresas con más de 200 trabajadores (obligadas)
- Empresas con entre 100 y 200 trabajadores (voluntarias)
- PYMES con compromiso de sostenibilidad

### Requisitos

Para acceder a las ayudas, las empresas deberán:
- Elaborar un PTT conforme a la normativa
- Implantar las medidas propuestas
- Mantener el plan durante al menos 3 años
- Presentar informes de seguimiento anuales

### Plazo de solicitud

El plazo para solicitar las ayudas estará abierto desde el 1 de febrero hasta el 30 de junio de 2026.

### Asesoramiento

ITEM Consulting ofrece asesoramiento gratuito a empresas interesadas en acceder a estas ayudas, incluyendo la gestión de la solicitud y el desarrollo del proyecto.`,
    imageUrl: '/images/22.png',
    date: '2026-02-05',
  },
];

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (username: string, password: string): Promise<boolean> => {
    if (username !== 'ITEM') {
      return false;
    }

    try {
      const hashedPassword = await sha256(password);
      if (hashedPassword !== PASSWORD_HASH) {
        return false;
      }

      const newUser: User = { username, isAuthenticated: true };
      setUser(newUser);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
      return true;
    } catch {
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.USER);
  }, []);

  return { user, isLoading, login, logout };
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (stored) {
      try {
        setProjects(JSON.parse(stored));
      } catch {
        setProjects(initialProjects);
        localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(initialProjects));
      }
    } else {
      setProjects(initialProjects);
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(initialProjects));
    }
    setIsLoading(false);
  }, []);

  const addProject = useCallback((project: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
    };
    setProjects(prev => {
      const updated = [newProject, ...prev];
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const deleteProject = useCallback((id: string) => {
    setProjects(prev => {
      const updated = prev.filter(p => p.id !== id);
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return { projects, isLoading, addProject, deleteProject };
}

export function useNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.NEWS);
    if (stored) {
      try {
        setNews(JSON.parse(stored));
      } catch {
        setNews(initialNews);
        localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(initialNews));
      }
    } else {
      setNews(initialNews);
      localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(initialNews));
    }
    setIsLoading(false);
  }, []);

  const addNews = useCallback((item: Omit<NewsItem, 'id'>) => {
    const newItem: NewsItem = {
      ...item,
      id: Date.now().toString(),
    };
    setNews(prev => {
      const updated = [newItem, ...prev];
      localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const deleteNews = useCallback((id: string) => {
    setNews(prev => {
      const updated = prev.filter(n => n.id !== id);
      localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return { news, isLoading, addNews, deleteNews };
}
