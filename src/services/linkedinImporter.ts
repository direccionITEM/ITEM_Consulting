/**
 * Servicio para importar posts de LinkedIn
 * Usa r.jina.ai para extraer contenido de URLs de LinkedIn Pulse
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
 * jina.ai extrae el contenido limpio de artículos
 */
export async function importFromLinkedIn(url: string): Promise<LinkedInPostData> {
  if (!url.includes('linkedin.com')) {
    throw new Error('La URL debe ser de LinkedIn (linkedin.com)');
  }

  try {
    // Usar r.jina.ai/http:// para obtener HTML en lugar de markdown
    const cleanUrl = url.replace(/^https?:\/\//, '');
    const jinaUrl = `https://r.jina.ai/http://${cleanUrl}`;
    
    console.log('Fetching from:', jinaUrl);
    
    const response = await fetch(jinaUrl, {
      headers: {
        'Accept': 'text/html,application/xhtml+xml'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Error al acceder al contenido: ${response.status}`);
    }
    
    const rawText = await response.text();
    console.log('Raw response length:', rawText.length);
    console.log('First 500 chars:', rawText.substring(0, 500));
    
    // Parsear la respuesta de jina.ai
    // El formato es: "Title: ...\nURL Source: ...\nMarkdown Content: ..."
    let title = '';
    let author = '';
    let content = '';
    let imageUrl = '/images/5.png';
    
    // Extraer título
    const titleMatch = rawText.match(/Title:\s*(.+?)(?:\n|$)/);
    if (titleMatch) {
      title = titleMatch[1].replace(/\|?\s*LinkedIn$/i, '').trim();
    }
    
    // Extraer URL de imagen del contenido markdown
    const imageMatch = rawText.match(/!\[.*?\]\((https:\/\/[^\)]+)\)/);
    if (imageMatch && imageMatch[1]) {
      imageUrl = imageMatch[1];
      console.log('Found image in markdown:', imageUrl);
    }
    
    // Extraer el contenido markdown
    const contentMatch = rawText.match(/Markdown Content:\s*([\s\S]+?)(?=\n\n(?:https?:|\n*$)|$)/);
    if (contentMatch) {
      let markdownContent = contentMatch[1].trim();
      
      // Limpiar líneas de ruido conocidas
      const lines = markdownContent.split('\n');
      const cleanLines: string[] = [];
      
      for (const line of lines) {
        const trimmed = line.trim();
        
        // Saltar líneas de UI/login
        if (trimmed.includes('Aceptar y unirse a LinkedIn')) continue;
        if (trimmed.includes('Al hacer clic en')) continue;
        if (trimmed.includes('aceptas las Condiciones de uso')) continue;
        if (trimmed.includes('Pasar al contenido principal')) continue;
        if (trimmed.includes('Ver todo')) continue;
        if (trimmed.includes('Ver temas')) continue;
        if (trimmed.includes('Acerca de')) continue;
        if (trimmed.includes('Condiciones de uso')) continue;
        if (trimmed.includes('Política de privacidad')) continue;
        if (trimmed.includes('Política de cookies')) continue;
        if (trimmed.includes('Inicia sesión para ver')) continue;
        if (trimmed.includes('Crea tu cuenta gratuita')) continue;
        if (trimmed.includes('Más artículos de')) continue;
        if (trimmed.includes('=== Initialize ===')) continue;
        if (trimmed.startsWith('===')) continue;
        if (trimmed.startsWith('!Image')) continue;
        
        // Detectar autor (línea antes de "###" o similar)
        if (trimmed.startsWith('### ')) {
          author = trimmed.replace('### ', '').trim();
          continue;
        }
        
        cleanLines.push(line);
      }
      
      // Convertir markdown a HTML
      content = markdownToHtml(cleanLines.join('\n'));
      
      console.log('Clean content length:', content.length);
    }
    
    // Si no hay título, usar el de la URL
    if (!title) {
      title = 'Artículo de LinkedIn';
    }
    
    // Generar excerpt del contenido limpio (sin HTML)
    const textContent = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const excerpt = textContent.substring(0, 200) + (textContent.length > 200 ? '...' : '');
    
    return {
      title,
      content,
      excerpt,
      imageUrl,
      url,
      author: author || undefined,
    };
    
  } catch (error) {
    console.error('Error importing from LinkedIn:', error);
    throw new Error('No se pudo importar el artículo. Verifica que la URL sea pública.');
  }
}

/**
 * Convierte markdown básico a HTML preservando estructura
 */
function markdownToHtml(text: string): string {
  // Dividir en párrafos primero
  const paragraphs = text.split('\n\n').filter(p => p.trim());
  
  return paragraphs.map(p => {
    let html = p.trim();
    
    // Saltar líneas vacías
    if (!html) return '';
    
    // Convertir **texto** a <strong>
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    
    // Convertir *texto* a <em>
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    
    // Convertir links [texto](url) a <a>
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline">$1</a>');
    
    // Convertir saltos de línea internos a <br>
    html = html.replace(/\n/g, '<br>');
    
    // Envolver en párrafo
    return `<p>${html}</p>`;
  }).join('\n');
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
