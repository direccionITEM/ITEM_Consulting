import { Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'La empresa', href: '#la-empresa' },
  { label: 'Estudios de tráfico', href: '#estudios-trafico' },
  { label: 'Consultoría de movilidad', href: '#consultoria-movilidad' },
  { label: 'PTT', href: '#ptt' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Noticias', href: '#noticias' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-16">
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
                <MapPin size={18} className="text-item-blue" />
                <span>Calle Cuartel 41, Santo Ángel, Murcia 30151</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone size={18} className="text-item-blue" />
                <a href="tel:+34619620268" className="hover:text-white transition-colors">
                  619 620 268
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Mail size={18} className="text-item-blue" />
                <a
                  href="mailto:informacion@itemconsulting.es"
                  className="hover:text-white transition-colors"
                >
                  informacion@itemconsulting.es
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces rápidos</h4>
            <ul className="space-y-2">
              {navLinks.slice(0, 5).map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Más información</h4>
            <ul className="space-y-2">
              {navLinks.slice(5).map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-4">Síguenos</h4>
              <a
                href="https://www.linkedin.com/company/item-consulting-engineering-s-l"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin size={20} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} ITEM Consulting Engineering S.L. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span>CNAE: 7112 - Servicios técnicos de ingeniería</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
