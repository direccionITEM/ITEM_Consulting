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
      // PRIORIDAD 1: Imágenes del CDN de LinkedIn (media.licdn.com)
      for (const img of images) {
        const imgUrl = img[2];
        if (imgUrl.includes('media.licdn.com') || imgUrl.includes('licdn.com')) {
          imageUrl = imgUrl;
          console.log('Selected image (LinkedIn CDN):', imageUrl);
          break;
        }
      }
      
      // PRIORIDAD 2: Otras imágenes HTTPS que NO sean la misma página
      if (imageUrl === '/images/5.png') {
        for (const img of images) {
          const imgUrl = img[2];
          // Evitar URLs que sean la misma página o muy cortas
          if (imgUrl.startsWith('https://') && 
              !imgUrl.includes('/pulse/') && 
              imgUrl.length > 50) {
            imageUrl = imgUrl;
            console.log('Selected image (other):', imageUrl);
            break;
          }
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
    let content = processMarkdownToHtml(markdownContent, author);
    console.log('Processed content length:', content.length);
    
    // Si no hay contenido sustancial, es porque LinkedIn bloquea el artículo tras login
    // En ese caso, al menos extraemos el primer párrafo (que suele ser el título repetido o un resumen)
    if (!content || content.length < 100) {
      console.log('Limited content detected - LinkedIn login wall active');
      // Extraer cualquier texto que no sea UI antes del login wall
      const beforeLogin = markdownContent.split('Aceptar y unirse a LinkedIn')[0];
      const fallbackContent = extractFallbackContent(beforeLogin, author);
      if (fallbackContent) {
        content = fallbackContent;
      }
    }
    
    // Generar excerpt
    const textContent = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const excerpt = textContent.substring(0, 200) + (textContent.length > 200 ? '...' : '');
    
    console.log('=== Import Result ===');
    console.log('Title:', title);
    console.log('Author:', author);
    console.log('Image:', imageUrl);
    console.log('Content length:', content.length);
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
 * ESTRATEGIA: Extraer TODO el contenido antes del muro de login
 */
function processMarkdownToHtml(markdown: string, authorName: string): string {
  // Dividir en el muro de login - TODO antes de esto es contenido potencial
  const loginWallMarkers = [
    'Aceptar y unirse a LinkedIn',
    'Inicia sesión para ver más contenido',
    'Crea tu cuenta gratuita o inicia sesión',
  ];
  
  let contentBeforeLogin = markdown;
  for (const marker of loginWallMarkers) {
    const idx = contentBeforeLogin.indexOf(marker);
    if (idx !== -1) {
      contentBeforeLogin = contentBeforeLogin.substring(0, idx);
      console.log('Found login wall marker:', marker);
      break;
    }
  }
  
  const lines = contentBeforeLogin.split('\n');
  const paragraphs: string[] = [];
  let currentPara: string[] = [];
  
  const flushPara = () => {
    if (currentPara.length > 0) {
      const text = currentPara.join(' ').trim();
      if (text && text.length > 10 && !isLoginFormText(text)) {
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
    
    // Saltar el título si está repetido al inicio
    if (i === 0 && line.includes('Movilidad sostenible')) {
      // Verificar si la siguiente línea es separador
      if (lines[i + 1] && lines[i + 1].includes('===')) {
        i++; // Saltar también el separador
        continue;
      }
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
    
    // Saltar ruido de LinkedIn UI
    if (isLinkedInNoise(line)) continue;
    
    // Saltar URLs solitarias
    if (line.match(/^https?:\/\//)) continue;
    
    // Acumular línea
    currentPara.push(line);
  }
  
  flushPara();
  
  return paragraphs.join('\n');
}

/**
 * Detecta si el texto es parte de un formulario de login
 * Solo detecta si el texto ES exactamente eso, no si lo contiene
 */
function isLoginFormText(text: string): boolean {
  const loginPatterns = [
    /^Email o teléfono$/i,
    /^Contraseña$/i,
    /^Mostrar$/i,
    /^¿Has olvidado tu contraseña\?$/i,
    /^Iniciar sesión$/i,
    /^Iniciar sesión con el email$/i,
    /^Crea tu cuenta gratuita$/i,
    /^Únete ahora$/i,
    /^¿Estás empezando a usar LinkedIn\?$/i,
    /^o$/i, // La línea que solo dice "o" entre opciones de login
  ];
  
  return loginPatterns.some(pattern => pattern.test(text.trim()));
}

/**
 * Verifica si es ruido de UI de LinkedIn
 */
function isLinkedInNoise(line: string): boolean {
  const noise = [
    'Aceptar y unirse a LinkedIn',
    'Al hacer clic en «Continuar»',
    'Al hacer clic en',
    'aceptas las Condiciones de uso',
    'Pasar al contenido principal',
    'Denunciar este artículo',
    'Unirse ahora',
    'Únete ahora',
    '[Pasar al contenido principal]',
  ];
  
  return noise.some(n => line.includes(n));
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
 * Extrae contenido fallback cuando LinkedIn bloquea con login
 * Busca texto útil antes del muro de login
 */
function extractFallbackContent(text: string, authorName: string): string | null {
  const lines = text.split('\n').map(l => l.trim()).filter(l => l);
  const paragraphs: string[] = [];
  
  for (const line of lines) {
    // Saltar el título repetido
    if (line.includes('===============')) continue;
    if (/^={3,}$/.test(line)) continue;
    if (/^-{3,}$/.test(line)) continue;
    
    // Saltar autor
    if (line === authorName || line === `### ${authorName}`) continue;
    
    // Saltar imágenes
    if (line.startsWith('![')) continue;
    
    // Saltar líneas muy cortas
    if (line.length < 20) continue;
    
    // Saltar URLs
    if (line.match(/^https?:\/\//)) continue;
    
    // Saltar ruido de UI
    if (isLinkedInNoise(line)) continue;
    
    // Si llegamos aquí, es contenido potencial
    paragraphs.push(convertLineToHtml(line));
    
    // Limitar a los primeros párrafos relevantes
    if (paragraphs.length >= 3) break;
  }
  
  return paragraphs.length > 0 ? paragraphs.join('\n') : null;
}

/**
 * Valida URL de LinkedIn
 */
export function isValidLinkedInUrl(url: string): boolean {
  if (!url) return false;
  return /linkedin\.com\/(feed\/update|posts|in\/[^/]+\/activity|pulse|detail\/activity)/i.test(url);
}
