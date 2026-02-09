import { Routes, Route, useLocation } from 'react-router-dom';
import { Suspense, lazy, useState } from 'react';
import { useAuth, useProjects, useNews } from '@/hooks/useAuth';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, Eye, EyeOff } from 'lucide-react';

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

// Login Dialog Component
function LoginDialog({ 
  isOpen, 
  onClose, 
  login, 
  loginGoogle 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  login: (email: string, password: string) => Promise<boolean>;
  loginGoogle: () => Promise<{ success: boolean; error?: string }>;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoading(true);
    
    const success = await login(email, password);
    if (success) {
      setEmail('');
      setPassword('');
      onClose();
    } else {
      setLoginError('Email o contraseña incorrectos');
    }
    setIsLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoginError('');
    setIsLoading(true);
    const result = await loginGoogle();
    if (result.success) {
      setEmail('');
      setPassword('');
      onClose();
    } else {
      setLoginError(result.error || 'Error al iniciar sesión con Google');
    }
    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock size={20} />
            Acceso de administración
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          {loginError && (
            <p className="text-red-500 text-sm">{loginError}</p>
          )}
          <Button
            type="submit"
            className="w-full bg-item-blue hover:bg-item-blue/90 text-white"
            disabled={isLoading}
          >
            {isLoading ? 'Iniciando...' : 'Iniciar sesión'}
          </Button>

          {/* Separador */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">O continuar con</span>
            </div>
          </div>

          {/* Botón de Google */}
          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-50"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Google
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function App() {
  const { user, login, loginGoogle, logout } = useAuth();
  const { projects, isLoading: projectsLoading, addProject, updateProject, deleteProject } = useProjects();
  const { news, isLoading: newsLoading, addNews, updateNews, deleteNews } = useNews();
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const location = useLocation();

  const isAuthenticated = user?.isAuthenticated ?? false;

  // Determinar si estamos en página de proyectos o noticias
  const isProjectsPage = location.pathname === '/proyectos' || location.pathname.startsWith('/proyectos/');
  const isNewsPage = location.pathname === '/noticias' || location.pathname.startsWith('/noticias/');
  const shouldShowAdminButton = isProjectsPage || isNewsPage;

  return (
    <>
      <Layout 
        isAuthenticated={isAuthenticated} 
        onLogout={logout}
        onAdminClick={shouldShowAdminButton ? () => setShowLoginDialog(true) : undefined}
        showAdminButton={shouldShowAdminButton}
      >
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

      {/* Login Dialog Global */}
      <LoginDialog 
        isOpen={showLoginDialog} 
        onClose={() => setShowLoginDialog(false)}
        login={login}
        loginGoogle={loginGoogle}
      />
    </>
  );
}

export default App;
