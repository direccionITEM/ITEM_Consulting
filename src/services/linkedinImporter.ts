/**
 * Servicio para importar posts de LinkedIn
 * Usa r.jina.ai (API gratuita) para extraer contenido de URLs
 * También intenta extraer Open Graph metadata como fallback
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
 * Extrae el contenido de una URL de LinkedIn usando jina.ai
 * jina.ai es un servicio gratuito que extrae contenido limpio de artículos
 */
export async function importFromLinkedIn(url: string): Promise<LinkedInPostData> {
  // Validar URL
  if (!url.includes('linkedin.com')) {
    throw new Error('La URL debe ser de LinkedIn (linkedin.com)');
  }

  try {
    // Usar r.jina.ai para extraer el contenido
    // Este servicio extrae el texto limpio de cualquier URL
    const jinaUrl = `https://r.jina.ai/http://${url.replace(/^https?:\/\//, '')}`;
    
    const response = await fetch(jinaUrl);
    if (!response.ok) {
      throw new Error('No se pudo acceder al post de LinkedIn');
    }
    
    const text = await response.text();
    
    // Parsear el contenido devuelto por jina.ai
    // El formato es: "Título\n\nContenido" o "Autor: X\nTítulo\n\nContenido"
    const lines = text.split('\n').filter(line => line.trim());
    
    let title = '';
    let content = '';
    let author = '';
    
    // Intentar detectar el autor (formato típico: "Roberto José Liñán Ruiz: ...")
    if (lines[0]?.includes(':')) {
      const colonIndex = lines[0].indexOf(':');
      author = lines[0].substring(0, colonIndex).trim();
      title = lines[0].substring(colonIndex + 1).trim();
      content = lines.slice(1).join('\n\n').trim();
    } else {
      title = lines[0] || 'Post de LinkedIn';
      content = lines.slice(1).join('\n\n').trim();
    }
    
    // Limpiar el título (LinkedIn a veces añade "| LinkedIn")
    title = title.replace(/\s*\|\s*LinkedIn$/i, '').trim();
    
    // Generar excerpt (primeros 200 caracteres del contenido)
    const excerpt = content.substring(0, 200).replace(/\s+/g, ' ').trim() + (content.length > 200 ? '...' : '');
    
    // Intentar obtener imagen mediante Open Graph
    const imageUrl = await fetchOpenGraphImage(url);
    
    return {
      title: title || 'Post de LinkedIn',
      content,
      excerpt,
      imageUrl,
      url,
      author,
    };
  } catch (error) {
    console.error('Error importing from LinkedIn:', error);
    throw new Error('No se pudo importar el post. Verifica que la URL sea pública y accesible.');
  }
}

/**
 * Intenta obtener la imagen Open Graph de una URL
 * Usa un proxy CORS para evitar bloqueos
 */
async function fetchOpenGraphImage(url: string): Promise<string> {
  try {
    // Lista de proxies CORS públicos (fallback)
    const proxies = [
      `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
      `https://corsproxy.io/?${encodeURIComponent(url)}`,
    ];
    
    for (const proxyUrl of proxies) {
      try {
        const response = await fetch(proxyUrl, { 
          method: 'GET',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });
        
        if (!response.ok) continue;
        
        const html = await response.text();
        
        // Buscar meta tag Open Graph image
        const ogImageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/i) ||
                            html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["'][^>]*>/i);
        
        if (ogImageMatch && ogImageMatch[1]) {
          return ogImageMatch[1];
        }
        
        break; // Si obtuvimos HTML pero no hay imagen, no intentar más proxies
      } catch (e) {
        continue; // Intentar siguiente proxy
      }
    }
  } catch (error) {
    console.warn('Could not fetch Open Graph image:', error);
  }
  
  // Imagen por defecto si no se encuentra
  return '/images/5.png';
}

/**
 * Valida si una URL parece ser un post de LinkedIn válido
 */
export function isValidLinkedInUrl(url: string): boolean {
  if (!url) return false;
  
  const linkedInPatterns = [
    /linkedin\.com\/feed\/update\//i,
    /linkedin\.com\/posts\//i,
    /linkedin\.com\/in\/[^/]+\/activity\//i,
    /linkedin\.com\/pulse\//i,
    /linkedin\.com\/detail\/activity\//i,
  ];
  
  return linkedInPatterns.some(pattern => pattern.test(url));
}
