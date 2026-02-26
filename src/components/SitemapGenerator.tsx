import { useEffect } from 'react';

/**
 * Genera sitemap.xml dinámico con las rutas de la aplicación
 * Este componente no renderiza nada, solo genera el sitemap
 */
export function generateSitemap(projects: { id: string; date?: string }[], news: { id: string; date: string }[]) {
  const baseUrl = 'https://www.itemconsulting.es';
  const today = new Date().toISOString().split('T')[0];

  // Rutas estáticas con prioridad y frecuencia de cambio
  const staticRoutes = [
    { path: '', priority: '1.0', changefreq: 'weekly' },
    { path: '/empresa', priority: '0.8', changefreq: 'monthly' },
    { path: '/estudios-trafico', priority: '0.8', changefreq: 'monthly' },
    { path: '/consultoria-movilidad', priority: '0.8', changefreq: 'monthly' },
    { path: '/ptt', priority: '0.9', changefreq: 'weekly' },
    { path: '/proyectos', priority: '0.8', changefreq: 'weekly' },
    { path: '/noticias', priority: '0.7', changefreq: 'daily' },
    { path: '/contacto', priority: '0.8', changefreq: 'monthly' },
  ];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  // Rutas estáticas
  staticRoutes.forEach(route => {
    sitemap += `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>
`;
  });

  // Proyectos
  projects.forEach(project => {
    sitemap += `  <url>
    <loc>${baseUrl}/proyectos/${project.id}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`;
  });

  // Noticias
  news.forEach(item => {
    sitemap += `  <url>
    <loc>${baseUrl}/noticias/${item.id}</loc>
    <lastmod>${item.date || today}</lastmod>
    <changefreq>never</changefreq>
    <priority>0.5</priority>
  </url>
`;
  });

  sitemap += '</urlset>';
  return sitemap;
}

/**
 * Componente que actualiza el sitemap cuando cambian los datos
 */
export function useSitemap(projects: { id: string; date?: string }[], news: { id: string; date: string }[]) {
  useEffect(() => {
    // Generar y guardar sitemap
    const sitemap = generateSitemap(projects, news);

    // Crear blob y URL
    const blob = new Blob([sitemap], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);

    // Actualizar meta tag para sitemap
    let sitemapLink = document.querySelector('link[rel="sitemap"]') as HTMLLinkElement;
    if (!sitemapLink) {
      sitemapLink = document.createElement('link');
      sitemapLink.rel = 'sitemap';
      sitemapLink.type = 'application/xml';
      document.head.appendChild(sitemapLink);
    }
    sitemapLink.href = url;

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [projects, news]);
}

export default function SitemapGenerator({ projects, news }: { projects: { id: string; date?: string }[]; news: { id: string; date: string }[] }) {
  useSitemap(projects, news);
  return null;
}
