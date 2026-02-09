/**
 * Servicio para importar posts de LinkedIn
 * Solo extrae título e imagen (el contenido está protegido por login)
 */

export interface LinkedInPostData {
  title: string;
  content: string;
  excerpt: string;
  imageUrl: string;
  url: string;
  author?: string;
}

/**
 * Extrae título e imagen de una URL de LinkedIn
 * NOTA: LinkedIn bloquea el contenido del artículo, solo título/imagen son públicos
 */
export async function importFromLinkedIn(url: string): Promise<LinkedInPostData> {
  if (!url.includes('linkedin.com')) {
    throw new Error('La URL debe ser de LinkedIn (linkedin.com)');
  }

  try {
    // Limpiar URL
    let cleanUrl = url.trim();
    cleanUrl = cleanUrl.replace(/^http:\/\//, 'https://');
    cleanUrl = cleanUrl.split('?')[0];
    
    // Usar jina.ai
    const jinaUrl = `https://r.jina.ai/http://${cleanUrl.replace(/^https?:\/\//, '')}`;
    
    const response = await fetch(jinaUrl);
    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }
    
    const text = await response.text();
    
    // Extraer título
    let title = '';
    const titleMatch = text.match(/^Title:\s*(.+)$/m);
    if (titleMatch) {
      title = titleMatch[1].replace(/\|\s*LinkedIn$/i, '').trim();
    }
    
    // Extraer autor
    let author = '';
    const authorMatch = text.match(/^###\s*(.+)$/m);
    if (authorMatch) {
      author = authorMatch[1].trim();
    }
    
    // Extraer imagen del CDN de LinkedIn
    let imageUrl = '/images/5.png';
    const imageMatches = text.matchAll(/!\[.*?\]\((https?:\/\/[^\)]+)\)/g);
    for (const match of imageMatches) {
      const imgUrl = match[1];
      if (imgUrl.includes('media.licdn.com') || imgUrl.includes('licdn.com')) {
        imageUrl = imgUrl;
        break;
      }
    }
    
    // Crear contenido con enlace al artículo original
    const content = `<p>Artículo publicado originalmente en <a href="${cleanUrl}" target="_blank" rel="noopener noreferrer">LinkedIn</a>.</p>
<p><a href="${cleanUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-block; background-color: #0A66C2; color: white; padding: 12px 24px; border-radius: 24px; text-decoration: none; font-weight: 500;">Ver artículo completo en LinkedIn →</a></p>`;
    
    return {
      title: title || 'Artículo de LinkedIn',
      content,
      excerpt: `Artículo de ${author || 'LinkedIn'}: ${title}`,
      imageUrl,
      url: cleanUrl,
      author: author || undefined,
    };
    
  } catch (error) {
    console.error('Error importing from LinkedIn:', error);
    throw new Error('No se pudo importar el artículo. Verifica que la URL sea pública.');
  }
}

/**
 * Valida URL de LinkedIn
 */
export function isValidLinkedInUrl(url: string): boolean {
  if (!url) return false;
  return /linkedin\.com\/(feed\/update|posts|in\/[^/]+\/activity|pulse|detail\/activity)/i.test(url);
}
