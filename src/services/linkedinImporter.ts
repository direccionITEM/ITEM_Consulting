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
 */
export async function importFromLinkedIn(url: string): Promise<LinkedInPostData> {
  console.log('=== LinkedIn Import Start ===');
  console.log('Input URL:', url);
  
  if (!url.includes('linkedin.com')) {
    throw new Error('La URL debe ser de LinkedIn (linkedin.com)');
  }

  try {
    // Limpiar URL - asegurar https y quitar parámetros
    let cleanUrl = url.trim();
    cleanUrl = cleanUrl.replace(/^http:\/\//, 'https://');
    cleanUrl = cleanUrl.split('?')[0]; // Quitar query params
    
    console.log('Clean URL:', cleanUrl);
    
    // Usar r.jina.ai/http:// (no https) - esto es importante
    const jinaUrl = `https://r.jina.ai/http://${cleanUrl.replace(/^https?:\/\//, '')}`;
    
    console.log('Fetching from jina:', jinaUrl);
    
    const response = await fetch(jinaUrl);
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    const text = await response.text();
    console.log('=== RAW RESPONSE ===');
    console.log(text.substring(0, 2000));
    console.log('=== END RAW RESPONSE ===');
    
    // Parsear componentes
    let title = '';
    let author = '';
    let markdownContent = '';
    let imageUrl = '/images/5.png';
    
    // Extraer título
    const titleMatch = text.match(/^Title:\s*(.+)$/m);
    if (titleMatch) {
      title = titleMatch[1].replace(/\|\s*LinkedIn$/i, '').trim();
      console.log('Found title:', title);
    }
    
    // Extraer URL Source
    const urlMatch = text.match(/^URL Source:\s*(.+)$/m);
    if (urlMatch) {
      console.log('Found URL source:', urlMatch[1]);
    }
    
    // Extraer imagen - buscar TODAS las imágenes en el markdown
    console.log('=== SEARCHING FOR IMAGES ===');
    const imageMatches = text.matchAll(/!\[([^\]]*)\]\((https?:\/\/[^\)]+)\)/g);
    const images = Array.from(imageMatches);
    console.log('Found', images.length, 'images:');
    images.forEach((img, i) => {
      console.log(`  Image ${i}:`, img[2]);
    });
    
    if (images.length > 0) {
      // Usar la primera imagen que sea de LinkedIn
      for (const img of images) {
        const imgUrl = img[2];
        if (imgUrl.includes('licdn.com') || imgUrl.includes('linkedin.com')) {
          imageUrl = imgUrl;
          console.log('Selected image:', imageUrl);
          break;
        }
      }
    }
    
    // Extraer contenido markdown
    const contentMatch = text.match(/Markdown Content:\s*([\s\S]+)$/);
    if (contentMatch) {
      markdownContent = contentMatch[1].trim();
      console.log('Markdown content length:', markdownContent.length);
    }
    
    // Extraer autor del contenido markdown
    const authorMatch = markdownContent.match(/^###\s*(.+)$/m);
    if (authorMatch) {
      author = authorMatch[1].trim();
      console.log('Found author:', author);
    }
    
    // Procesar contenido - filtrar y convertir a HTML
    const content = processMarkdownToHtml(markdownContent, author);
    console.log('Processed content length:', content.length);
    
    // Generar excerpt
    const textContent = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const excerpt = textContent.substring(0, 200) + (textContent.length > 200 ? '...' : '');
    
    console.log('=== Import Result ===');
    console.log('Title:', title);
    console.log('Author:', author);
    console.log('Image:', imageUrl);
    console.log('Content preview:', content.substring(0, 200));
    
    return {
      title: title || 'Artículo de LinkedIn',
      content,
      excerpt,
      imageUrl,
      url: cleanUrl,
      author: author || undefined,
    };
    
  } catch (error) {
    console.error('=== Import Error ===', error);
    throw error;
  }
}

/**
 * Procesa markdown y convierte a HTML limpio
 */
function processMarkdownToHtml(markdown: string, authorName: string): string {
  const lines = markdown.split('\n');
  const paragraphs: string[] = [];
  let currentPara: string[] = [];
  let inArticle = false;
  
  const flushPara = () => {
    if (currentPara.length > 0) {
      const text = currentPara.join(' ').trim();
      if (text && text.length > 5) {
        paragraphs.push(convertLineToHtml(text));
      }
      currentPara = [];
    }
  };
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    
    // Saltar líneas vacías
    if (!line) {
      flushPara();
      continue;
    }
    
    // Saltar autor
    if (line === `### ${authorName}` || line === authorName) {
      continue;
    }
    
    // Saltar imágenes markdown
    if (line.startsWith('![')) continue;
    
    // Saltar separadores
    if (/^={3,}$/.test(line) || /^-{3,}$/.test(line)) {
      flushPara();
      continue;
    }
    
    // Saltar ruido de LinkedIn
    if (isLinkedInNoise(line)) continue;
    
    // Detectar fin del artículo
    if (line.includes('Más artículos de') || 
        line.includes('Ver temas') ||
        line.includes('Inicia sesión') ||
        line.includes('Al hacer clic en')) {
      break;
    }
    
    // Saltar URLs solitarias
    if (line.match(/^https?:\/\//)) continue;
    
    currentPara.push(line);
  }
  
  flushPara();
  
  return paragraphs.join('\n');
}

/**
 * Verifica si es ruido de LinkedIn
 */
function isLinkedInNoise(line: string): boolean {
  const noise = [
    'Aceptar y unirse',
    'Al hacer clic',
    'Condiciones de uso',
    'Política de privacidad',
    'Política de cookies',
    'Pasar al contenido principal',
    'Denunciar este artículo',
    'Unirse ahora',
    'Iniciar sesión',
    'Ver todo',
    'Ver temas',
    'Acerca de',
    'Accesibilidad',
    'Centro de Ayuda',
    'Privacidad',
    'Condiciones',
  ];
  
  const lower = line.toLowerCase();
  return noise.some(n => lower.includes(n.toLowerCase()));
}

/**
 * Convierte una línea de markdown a HTML
 */
function convertLineToHtml(text: string): string {
  // **negrita**
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // *cursiva*
  text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
  // [texto](url)
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="text-blue-600 underline">$1</a>');
  
  return `<p>${text}</p>`;
}

/**
 * Valida URL de LinkedIn
 */
export function isValidLinkedInUrl(url: string): boolean {
  if (!url) return false;
  return /linkedin\.com\/(feed\/update|posts|in\/[^/]+\/activity|pulse|detail\/activity)/i.test(url);
}
