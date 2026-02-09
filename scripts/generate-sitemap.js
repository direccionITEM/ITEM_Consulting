/**
 * Script para generar sitemap.xml estático durante el build
 * Este script se ejecuta antes del build de Vite
 */

import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const baseUrl = 'https://item-consulting.vercel.app';
const today = new Date().toISOString().split('T')[0];

// Rutas estáticas
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

staticRoutes.forEach(route => {
  sitemap += `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>
`;
});

sitemap += '</urlset>';

// Escribir archivo
const publicDir = join(__dirname, '..', 'public');
writeFileSync(join(publicDir, 'sitemap.xml'), sitemap);

console.log('✅ Sitemap generado correctamente en public/sitemap.xml');
