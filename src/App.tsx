import { Routes, Route } from 'react-router-dom';
import { useAuth, useProjects, useNews } from '@/hooks/useAuth';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Empresa from '@/pages/Empresa';
import EstudiosTrafico from '@/pages/EstudiosTrafico';
import ConsultoriaMovilidad from '@/pages/ConsultoriaMovilidad';
import PTT from '@/pages/PTT';
import Proyectos from '@/pages/Proyectos';
import ProyectoDetalle from '@/pages/ProyectoDetalle';
import Noticias from '@/pages/Noticias';
import NoticiaDetalle from '@/pages/NoticiaDetalle';
import Contacto from '@/pages/Contacto';

function App() {
  const { user, logout } = useAuth();
  const { projects, isLoading: projectsLoading, addProject, updateProject, deleteProject } = useProjects();
  const { news, isLoading: newsLoading, addNews, updateNews, deleteNews } = useNews();

  const isAuthenticated = user?.isAuthenticated ?? false;

  return (
    <Layout isAuthenticated={isAuthenticated} onLogout={logout}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/empresa" element={<Empresa />} />
        <Route path="/estudios-trafico" element={<EstudiosTrafico />} />
        <Route path="/consultoria-movilidad" element={<ConsultoriaMovilidad />} />
        <Route path="/ptt" element={<PTT />} />
        <Route 
          path="/proyectos" 
          element={
            <Proyectos
              projects={projects}
              isLoading={projectsLoading}
              isAuthenticated={isAuthenticated}
              onAddProject={addProject}
              onUpdateProject={updateProject}
              onDeleteProject={deleteProject}
            />
          } 
        />
        <Route 
          path="/proyectos/:id" 
          element={<ProyectoDetalle projects={projects} />} 
        />
        <Route 
          path="/noticias" 
          element={
            <Noticias
              news={news}
              isLoading={newsLoading}
              isAuthenticated={isAuthenticated}
              onAddNews={addNews}
              onUpdateNews={updateNews}
              onDeleteNews={deleteNews}
            />
          } 
        />
        <Route 
          path="/noticias/:id" 
          element={<NoticiaDetalle news={news} />} 
        />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </Layout>
  );
}

export default App;
