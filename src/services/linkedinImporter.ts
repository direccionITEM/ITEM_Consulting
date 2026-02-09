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
  let passedLoginWall = false;
  let foundContent = false;
  
  const flushPara = () => {
    if (currentPara.length > 0) {
      const text = currentPara.join(' ').trim();
      if (text && text.length > 10) {
        paragraphs.push(convertLineToHtml(text));
        foundContent = true;
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
    
    // Detectar que pasamos el muro de login
    if (line.includes('Inicia sesión para ver más contenido') ||
        line.includes('Crea tu cuenta gratuita')) {
      passedLoginWall = true;
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
    
    // Saltar ruido de LinkedIn UI
    if (isLinkedInNoise(line)) {
      // Pero si ya pasamos el login wall, algunas líneas pueden ser contenido real
      if (!passedLoginWall) continue;
    }
    
    // Detectar fin del artículo
    if (line.includes('Más artículos de') || 
        line.includes('Ver temas')) {
      break;
    }
    
    // Saltar URLs solitarias
    if (line.match(/^https?:\/\//)) continue;
    
    // Acumular línea
    currentPara.push(line);
  }
  
  flushPara();
  
  // Si no encontramos contenido sustancial, puede que el artículo requiera login
  if (!foundContent || paragraphs.length < 2) {
    console.warn('Poco contenido encontrado - el artículo puede requerir login');
  }
  
  return paragraphs.join('\n');
}

/**
 * Verifica si es ruido de UI de LinkedIn (antes del contenido real)
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
    '¿Estás empezando a usar LinkedIn?',
    'Únete ahora',
    'Crea tu cuenta gratuita',
    'Inicia sesión para ver',
    '¿Has olvidado tu contraseña?',
    'Iniciar sesión con el email',
    'o',
    'Mostrar',
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
 * Valida URL de LinkedIn
 */
export function isValidLinkedInUrl(url: string): boolean {
  if (!url) return false;
  return /linkedin\.com\/(feed\/update|posts|in\/[^/]+\/activity|pulse|detail\/activity)/i.test(url);
}
