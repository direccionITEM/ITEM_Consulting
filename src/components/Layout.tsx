import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Lock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LayoutProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  onLogin: (email: string, password: string) => Promise<boolean>;
  onLoginGoogle: () => Promise<boolean>;
  onLogout: () => void;
}

const navItems = [
  { label: 'Inicio', href: '/' },
  { label: 'La empresa', href: '/empresa' },
  { label: 'Estudios de tráfico', href: '/estudios-trafico' },
  { label: 'Consultoría de movilidad', href: '/consultoria-movilidad' },
  { label: 'Plan de transporte al trabajo', href: '/ptt' },
  { label: 'Proyectos', href: '/proyectos' },
  { label: 'Noticias', href: '/noticias' },
  { label: 'Contacto', href: '/contacto' },
];

export default function Layout({ children, isAuthenticated, onLogin, onLoginGoogle, onLogout }: LayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const success = await onLogin(email, password);
    if (success) {
      setShowLoginDialog(false);
      setEmail('');
      setPassword('');
    } else {
      setLoginError('Email o contraseña incorrectos');
    }
  };

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar - SIEMPRE VISIBLE con fondo */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white shadow-lg py-2'
            : 'bg-white/95 backdrop-blur-sm shadow-md py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/images/logo.png" 
                alt="Mi Empresa" 
                className="h-16 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`nav-link text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-item-blue'
                      : 'text-gray-700 hover:text-item-blue'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Login/Logout Button - Pequeño y discreto */}
              {isAuthenticated ? (
                <button
                  onClick={onLogout}
                  className="text-xs px-2 py-1 rounded border border-gray-300 text-gray-500 hover:border-item-blue hover:text-item-blue transition-colors"
                >
                  Cerrar sesión
                </button>
              ) : (
                <button
                  onClick={() => setShowLoginDialog(true)}
                  className="flex items-center gap-1 text-xs px-2 py-1 rounded border border-gray-300 text-gray-500 hover:border-item-blue hover:text-item-blue transition-colors"
                >
                  <Lock size={12} />
                  Admin
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed inset-0 top-16 bg-white shadow-xl transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ zIndex: 40 }}
        >
          <div className="flex flex-col p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-item-blue text-white'
                    : 'text-gray-700 hover:bg-item-blue-light hover:text-item-blue'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setShowLoginDialog(true);
              }}
              className="px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-item-blue-light hover:text-item-blue flex items-center gap-2"
            >
              <Lock size={16} />
              {isAuthenticated ? 'Cerrar sesión' : 'Acceso admin'}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="text-2xl font-bold mb-4">
                ITEM<span className="font-light">Consulting</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Ingeniería especializada en infraestructuras del transporte, economía y movilidad. 
                Proporcionamos soluciones innovadoras para la planificación, gestión y análisis 
                de sistemas de transporte y movilidad urbana sostenible.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-400">
                  <span className="text-item-blue">📍</span>
                  <span>Murcia, España</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <span className="text-item-blue">📞</span>
                  <a href="tel:+34619620268" className="hover:text-white transition-colors">
                    619 620 268
                  </a>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <span className="text-item-blue">✉️</span>
                  <a href="mailto:informacion@itemconsulting.es" className="hover:text-white transition-colors">
                    informacion@itemconsulting.es
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Enlaces rápidos</h4>
              <ul className="space-y-2">
                {navItems.slice(0, 5).map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* More Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Más información</h4>
              <ul className="space-y-2">
                {navItems.slice(5).map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm">
                © ITEM Consulting Engineering S.L. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Login Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
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
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                required
              />
            </div>
            {loginError && (
              <p className="text-red-500 text-sm">{loginError}</p>
            )}
            <Button
              type="submit"
              className="w-full bg-item-blue hover:bg-item-blue/90 text-white"
            >
              Iniciar sesión
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
              onClick={async () => {
                setLoginError('');
                const success = await onLoginGoogle();
                if (success) {
                  setShowLoginDialog(false);
                  setEmail('');
                  setPassword('');
                } else {
                  setLoginError('Error al iniciar sesión con Google');
                }
              }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
