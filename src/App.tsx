import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { useAuth, useProjects, useNews } from '@/hooks/useAuth';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';

// Lazy loading de páginas para optimizar rendimiento
const Home = lazy(() => import('@/pages/Home'));
const Empresa = lazy(() => import('@/pages/Empresa'));
const EstudiosTrafico = lazy(() => import('@/pages/EstudiosTrafico'));
const ConsultoriaMovilidad = lazy(() => import('@/pages/ConsultoriaMovilidad'));
const PTT = lazy(() => import('@/pages/PTT'));
const Proyectos = lazy(() => import('@/pages/Proyectos'));
const ProyectoDetalle = lazy(() => import('@/pages/ProyectoDetalle'));
const Noticias = lazy(() => import('@/pages/Noticias'));
const NoticiaDetalle = lazy(() => import('@/pages/NoticiaDetalle'));
const Contacto = lazy(() => import('@/pages/Contacto'));

// Componente de carga
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-item-blue"></div>
  </div>
);

function App() {
  const { user, logout } = useAuth();
  const { projects, isLoading: projectsLoading, addProject, updateProject, deleteProject } = useProjects();
  const { news, isLoading: newsLoading, addNews, updateNews, deleteNews } = useNews();

  const isAuthenticated = user?.isAuthenticated ?? false;

  return (
    <Layout isAuthenticated={isAuthenticated} onLogout={logout}>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={
            <>
              <SEO 
                title="Inicio" 
                description="ITEM Consulting - Ingeniería especializada en infraestructuras del transporte, economía y movilidad. Planes PMUS, estudios de tráfico y consultoría."
                canonical="/"
              />
              <Home />
            </>
          } />
          <Route path="/empresa" element={
            <>
              <SEO 
                title="La Empresa" 
                description="Conoce ITEM Consulting. Expertos en ingeniería de transporte, economía y movilidad urbana sostenible."
                canonical="/empresa"
              />
              <Empresa />
            </>
          } />
          <Route path="/estudios-trafico" element={
            <>
              <SEO 
                title="Estudios de Tráfico" 
                description="Estudios de tráfico y análisis de movilidad. Microsimulación, aforos, estudio de origen-destino y auditorías de seguridad vial."
                canonical="/estudios-trafico"
              />
              <EstudiosTrafico />
            </>
          } />
          <Route path="/consultoria-movilidad" element={
            <>
              <SEO 
                title="Consultoría de Movilidad" 
                description="Consultoría especializada en movilidad urbana sostenible. Transporte público, carriles bici, peatonalización y seguridad vial."
                canonical="/consultoria-movilidad"
              />
              <ConsultoriaMovilidad />
            </>
          } />
          <Route path="/ptt" element={
            <>
              <SEO 
                title="Plan de Transporte al Trabajo (PTT)" 
                description="Planes de Transporte al Trabajo (PTT) conforme a la Ley 9/2025. Cumple la obligatoriedad para empresas con más de 200 trabajadores."
                canonical="/ptt"
              />
              <PTT />
            </>
          } />
          <Route 
            path="/proyectos" 
            element={
              <>
                <SEO 
                  title="Proyectos" 
                  description="Proyectos de movilidad sostenible desarrollados por ITEM Consulting. PMUS, estudios de tráfico y consultoría para ayuntamientos y empresas."
                  canonical="/proyectos"
                />
                <Proyectos
                  projects={projects}
                  isLoading={projectsLoading}
                  isAuthenticated={isAuthenticated}
                  onAddProject={addProject}
                  onUpdateProject={updateProject}
                  onDeleteProject={deleteProject}
                />
              </>
            } 
          />
          <Route 
            path="/proyectos/:id" 
            element={
              <>
                <SEO title="Proyecto" />
                <ProyectoDetalle projects={projects} />
              </>
            } 
          />
          <Route 
            path="/noticias" 
            element={
              <>
                <SEO 
                  title="Noticias" 
                  description="Últimas noticias sobre movilidad sostenible, planes PMUS, estudios de tráfico y proyectos de ITEM Consulting."
                  canonical="/noticias"
                />
                <Noticias
                  news={news}
                  isLoading={newsLoading}
                  isAuthenticated={isAuthenticated}
                  onAddNews={addNews}
                  onUpdateNews={updateNews}
                  onDeleteNews={deleteNews}
                />
              </>
            } 
          />
          <Route 
            path="/noticias/:id" 
            element={
              <>
                <SEO title="Noticia" />
                <NoticiaDetalle news={news} />
              </>
            } 
          />
          <Route path="/contacto" element={
            <>
              <SEO 
                title="Contacto" 
                description="Contacta con ITEM Consulting. Estamos en Murcia y trabajamos en toda España. Teléfono: 619 620 268."
                canonical="/contacto"
              />
              <Contacto />
            </>
          } />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
