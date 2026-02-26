import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Lock } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  onLogout: () => void;
  onAdminClick?: () => void;
  showAdminButton?: boolean;
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

export default function Layout({
  children,
  isAuthenticated,
  onLogout,
  onAdminClick,
  showAdminButton = false
}: LayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  // Determinar si estamos en página de proyectos o noticias
  const isProjectsPage = location.pathname === '/proyectos' || location.pathname.startsWith('/proyectos/');
  const isNewsPage = location.pathname === '/noticias' || location.pathname.startsWith('/noticias/');
  const shouldShowAdminButton = showAdminButton || isProjectsPage || isNewsPage;

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
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
                alt="ITEM Consulting"
                className="h-16 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`nav-link text-sm font-medium transition-colors ${isActive(item.href)
                      ? 'text-item-blue'
                      : 'text-gray-700 hover:text-item-blue'
                    }`}
                >
                  {item.label}
                </Link>
              ))}

              {/* Solo mostrar Cerrar sesión si está autenticado */}
              {isAuthenticated && (
                <button
                  onClick={onLogout}
                  className="text-xs px-2 py-1 rounded border border-gray-300 text-gray-500 hover:border-item-blue hover:text-item-blue transition-colors"
                >
                  Cerrar sesión
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
          className={`lg:hidden fixed inset-0 top-16 bg-white shadow-xl transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          style={{ zIndex: 40 }}
        >
          <div className="flex flex-col p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${isActive(item.href)
                    ? 'bg-item-blue text-white'
                    : 'text-gray-700 hover:bg-item-blue-light hover:text-item-blue'
                  }`}
              >
                {item.label}
              </Link>
            ))}
            {isAuthenticated && (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onLogout();
                }}
                className="px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-item-blue-light hover:text-item-blue flex items-center gap-2"
              >
                Cerrar sesión
              </button>
            )}
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

              {/* Admin Button - Solo icono, al final del footer */}
              {!isAuthenticated && shouldShowAdminButton && onAdminClick && (
                <button
                  onClick={onAdminClick}
                  className="p-2 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-lg transition-colors"
                  title="Acceso de administración"
                >
                  <Lock size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
