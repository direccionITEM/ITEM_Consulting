/**
 * Servicio para importar posts de LinkedIn
 * Usa r.jina.ai para extraer contenido de URLs de LinkedIn Pulse
 * Implementa limpieza de contenido para eliminar elementos de UI/login
 */

export interface LinkedInPostData {
  title: string;
  content: string;
  excerpt: string;
  imageUrl: string;
  url: string;
  author?: string;
}

// Elementos de UI/login de LinkedIn que deben ser filtrados
const LINKEDIN_NOISE_PATTERNS = [
  'Aceptar y unirse a LinkedIn',
  'Al hacer clic en',
  'aceptas las Condiciones de uso',
  'Pasar al contenido principal',
  'Artículos',
  'Personas',
  'Learning',
  'Empleos',
  'Juegos',
  'Unirse ahora',
  'Iniciar sesión',
  'Denunciar este artículo',
  'Seguir',
  'Recomendar',
  'Celebrar',
  'Apoyar',
  'Encantar',
  'Interesar',
  'Hacer gracia',
  'Comentar',
  'Compartir',
  'Copiar',
  'LinkedIn',
  'Facebook',
  'Más artículos de',
  'See all articles',
  'Ver temas',
  'Ventas',
  'Marketing',
  'Servicios de TI',
  'Administración de empresas',
  'Gestión de recursos humanos',
  'Ingeniería',
  'Competencias transversales',
  'Ver todo',
  'Acerca de',
  'Accesibilidad',
  'Condiciones de uso',
  'Política de privacidad',
  'Política de cookies',
  'Inicia sesión para ver más contenido',
  'Crea tu cuenta gratuita',
  '¿Has olvidado tu contraseña?',
  '¿Estás empezando a usar LinkedIn?',
  'Fecha de publicación:',
  'Show more',
  // Nuevos patrones basados en las capturas
  '===',
  '!Image',
  'Image:',
  'Image 2:',
  'Markdown Content:',
  'URL Source:',
  'Title:',
  'Al hacer clic en «Continuar»',
  'Continuar',
  '[Condiciones de uso]',
  '[Política de privacidad]',
  '[Política de cookies]',
  '[Pasar al contenido principal]',
  'Fecha de publicación',
  '### Roberto José Liñán Ruiz', // Esto va al autor, no al contenido
  'Roberto José Liñán Ruiz', // Nombre del autor
];

// Patrones regex para limpiar contenido
const CLEANUP_PATTERNS = [
  /!\[Image \d+\]\([^)]+\)/g,  // Imágenes markdown ![Image N](url)
  /!Image \d+:[^\n]*/g,         // !Image 2: Movilidad sostenible...
  /Image \d+:[^\n]*/g,          // Image 2: ...
  /={5,}/g,                      // Separadores de línea como =====
];

/**
 * Limpia el contenido extraído y convierte a HTML para el editor
 * Preserva la estructura de párrafos y formato markdown básico
 */
function cleanLinkedInContent(text: string): string {
  const lines = text.split('\n');
  const paragraphs: string[] = [];
  let currentParagraph: string[] = [];
  let inArticleContent = false;
  
  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(' ').trim();
      if (text) {
        // Convertir markdown a HTML
        let html = markdownToHtml(text);
        paragraphs.push(html);
      }
      currentParagraph = [];
    }
  };
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    
    // Saltar líneas vacías al inicio
    if (!inArticleContent && line === '') continue;
    
    // Detectar líneas que son solo separadores visuales
    if (/^={3,}$/.test(line) || /^-{3,}$/.test(line)) {
      flushParagraph();
      continue;
    }
    
    // Detectar líneas que contienen markdown de imágenes
    if (line.includes('!Image') || line.match(/^!\[.*\]\(/)) continue;
    
    // Detectar líneas que parecen headers de jina.ai
    if (line.match(/^URL Source:/) || line.match(/^Markdown Content:/) || line.match(/^Title:/)) continue;
    
    // Detectar inicio del contenido real
    if (!inArticleContent && line.length > 50 && !isNoiseLine(line)) {
      inArticleContent = true;
    }
    if (!inArticleContent && currentParagraph.length > 0 && line.length > 20 && !isNoiseLine(line)) {
      inArticleContent = true;
    }
    
    // Detectar fin del contenido
    if (inArticleContent && (
      line.startsWith('Más artículos de') ||
      line.startsWith('Ver temas') ||
      line.startsWith('LinkedIn ©') ||
      line.startsWith('Inicia sesión para ver') ||
      line === 'Show more' ||
      line.startsWith('See all articles') ||
      line.includes('Al hacer clic en')
    )) {
      break;
    }
    
    // Filtrar líneas de ruido
    if (isNoiseLine(line)) continue;
    
    // Filtrar líneas muy cortas (menos de 3 caracteres sin letras)
    if (line.length < 3 && !line.match(/[a-zA-ZáéíóúÁÉÍÓÚñÑ]/)) continue;
    
    // Filtrar líneas que son solo números
    if (/^\d+$/.test(line)) continue;
    
    // Filtrar URLs de LinkedIn
    if (line.match(/^https?:\/\/.*linkedin\.com/)) continue;
    
    // Si la línea está vacía, guardar el párrafo actual
    if (line === '') {
      flushParagraph();
    } else {
      currentParagraph.push(line);
    }
  }
  
  // No olvidar el último párrafo
  flushParagraph();
  
  // Unir párrafos con etiquetas <p>
  return paragraphs.map(p => `<p>${p}</p>`).join('\n');
}

/**
 * Convierte markdown básico a HTML
 */
function markdownToHtml(text: string): string {
  // Preservar doble asterisco (negrita)
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  
  // Preservar asterisco simple (cursiva)
  text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
  
  // Convertir links markdown a HTML
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
  
  // Limpiar múltiples espacios
  text = text.replace(/\s+/g, ' ');
  
  return text.trim();
}

/**
 * Verifica si una línea es "ruido" (UI/login de LinkedIn)
 */
function isNoiseLine(line: string): boolean {
  if (!line || line.length === 0) return true;
  
  return LINKEDIN_NOISE_PATTERNS.some(pattern => 
    line.includes(pattern) || 
    line.toLowerCase().includes(pattern.toLowerCase())
  );
}

/**
 * Extrae información del autor del contenido
 */
function extractAuthorInfo(lines: string[]): { author: string; authorLineIndex: number } {
  // Buscar el nombre del autor en las primeras líneas
  for (let i = 0; i < Math.min(lines.length, 30); i++) {
    const line = lines[i];
    
    // Buscar el patrón específico de nombre de autor en LinkedIn Pulse
    // Ejemplo: "Roberto José Liñán Ruiz" seguido de "Seguir" o similar
    if (line && 
        line.length > 10 && 
        line.length < 60 &&
        !line.includes('http') &&
        !line.includes('LinkedIn') &&
        !line.includes('Artículos') &&
        !line.includes('Fecha') &&
        !line.includes('Title:') &&
        !line.includes('URL Source:') &&
        !line.includes('!Image') &&
        line.match(/^[A-Z][a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/) // Solo letras y espacios, empieza con mayúscula
    ) {
      // Verificar que la siguiente línea tenga "Seguir", "###" o similar (indica autor)
      const nextLine = lines[i + 1];
      if (nextLine && (
          nextLine.includes('Seguir') || 
          nextLine.includes('Fecha de publicación') ||
          nextLine.startsWith('###') ||
          nextLine.includes('aceptas las')
      )) {
        return { author: line.trim(), authorLineIndex: i };
      }
    }
  }
  return { author: '', authorLineIndex: -1 };
}

/**
 * Extrae el contenido de una URL de LinkedIn usando jina.ai
 */
export async function importFromLinkedIn(url: string): Promise<LinkedInPostData> {
  // Validar URL
  if (!url.includes('linkedin.com')) {
    throw new Error('La URL debe ser de LinkedIn (linkedin.com)');
  }

  try {
    // Usar r.jina.ai para extraer el contenido
    const cleanUrl = url.replace(/^https?:\/\//, '');
    const jinaUrl = `https://r.jina.ai/http://${cleanUrl}`;
    
    const response = await fetch(jinaUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Error al acceder al contenido: ${response.status}`);
    }
    
    const text = await response.text();
    
    // Verificar si es página de login (no hay contenido accesible)
    if (text.includes('Inicia sesión para ver') && 
        text.includes('Crea tu cuenta gratuita') &&
        !text.includes('Fecha de publicación')) {
      throw new Error('Este artículo requiere inicio de sesión en LinkedIn y no puede ser importado');
    }
    
    // Parsear el formato de jina.ai: "Title: ...\n\nURL Source: ...\n\nMarkdown Content:"
    const lines = text.split('\n').map(l => l.trim()).filter(l => l);
    
    // Extraer título
    let title = '';
    const titleLine = lines.find(l => l.startsWith('Title:'));
    if (titleLine) {
      title = titleLine.replace('Title:', '').trim();
    }
    
    // Limpiar el título
    title = title.replace(/\s*\|\s*LinkedIn$/i, '').trim();
    if (!title) title = 'Artículo de LinkedIn';
    
    // Extraer autor
    const { author, authorLineIndex } = extractAuthorInfo(lines);
    
    // Encontrar el inicio del contenido Markdown
    const markdownIndex = lines.findIndex(l => l === 'Markdown Content:');
    let content = '';
    
    if (markdownIndex !== -1 && markdownIndex < lines.length - 1) {
      // El contenido está después de "Markdown Content:"
      const contentLines = lines.slice(markdownIndex + 1);
      content = cleanLinkedInContent(contentLines.join('\n'));
    } else {
      // Fallback: buscar el contenido después del título
      const titleIndex = lines.findIndex(l => l.includes(title));
      if (titleIndex !== -1) {
        const contentLines = lines.slice(titleIndex + 1);
        content = cleanLinkedInContent(contentLines.join('\n'));
      } else {
        content = cleanLinkedInContent(text);
      }
    }
    
    // Si el contenido comienza con el título, quitarlo
    if (content.toLowerCase().startsWith(title.toLowerCase())) {
      content = content.substring(title.length).trim();
    }
    
    // Limpiar cualquier "Seguir" o "Fecha de publicación" al inicio
    content = content.replace(/^(Seguir\s*)?Fecha de publicación:[^\n]*\n*/i, '').trim();
    
    // Generar excerpt
    const excerpt = content.substring(0, 200).replace(/\s+/g, ' ').trim() + 
                    (content.length > 200 ? '...' : '');
    
    // Obtener imagen - pasar el texto raw de jina.ai para extraer imágenes
    const imageUrl = await fetchOpenGraphImage(url, text);
    
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
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('No se pudo importar el artículo. Verifica que la URL sea pública y accesible.');
  }
}

/**
 * Extrae la URL de la imagen del contenido markdown de jina.ai
 */
function extractImageFromJinaContent(text: string): string | null {
  // Buscar patrones de imagen markdown: ![alt](url) o ![Image N](url)
  const imagePatterns = [
    /!\[([^\]]*)\]\((https:\/\/[^\)]+)\)/,
    /!\[Image \d+\]\((https:\/\/[^\)]+)\)/,
    /!Image \d+:\s*(https:\/\/[^\s]+)/,
  ];
  
  for (const pattern of imagePatterns) {
    const match = text.match(pattern);
    if (match && match[2]) {
      const url = match[2];
      // Verificar que sea URL de LinkedIn CDN
      if (url.includes('licdn.com') || url.includes('linkedin.com')) {
        return url;
      }
    }
    // Para el tercer patrón, el grupo es diferente
    if (match && match[1] && pattern.source.includes('!Image')) {
      const url = match[1];
      if (url.includes('licdn.com') || url.includes('linkedin.com')) {
        return url;
      }
    }
  }
  
  return null;
}

/**
 * Intenta obtener la imagen Open Graph de una URL
 * Usa múltiples proxies CORS como fallback
 * También intenta extraer del contenido jina.ai directamente
 */
async function fetchOpenGraphImage(url: string, jinaContent?: string): Promise<string> {
  // Primero intentar extraer del contenido de jina.ai (más confiable)
  if (jinaContent) {
    const jinaImage = extractImageFromJinaContent(jinaContent);
    if (jinaImage) {
      console.log('Imagen extraída de jina.ai:', jinaImage);
      return jinaImage;
    }
  }
  
  // Intentar con jina.ai directamente para obtener el HTML
  try {
    const jinaHtmlUrl = `https://r.jina.ai/http://cc.bingj.com/cache.aspx?d=504-4280-4056&w=${encodeURIComponent(url)}`;
    const jinaResponse = await fetch(`https://r.jina.ai/http://${url.replace(/^https?:\/\//, '')}`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    });
    
    if (jinaResponse.ok) {
      const text = await jinaResponse.text();
      const jinaImage = extractImageFromJinaContent(text);
      if (jinaImage) {
        console.log('Imagen extraída de jina.ai (2do intento):', jinaImage);
        return jinaImage;
      }
    }
  } catch (e) {
    console.warn('Error obteniendo imagen de jina.ai:', e);
  }
  
  // Fallback a proxies CORS
  const proxies = [
    (u: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
    (u: string) => `https://corsproxy.io/?${encodeURIComponent(u)}`,
  ];
  
  for (const proxyFn of proxies) {
    try {
      const proxyUrl = proxyFn(url);
      const response = await fetch(proxyUrl, { 
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        },
        signal: AbortSignal.timeout(10000)
      });
      
      if (!response.ok) continue;
      
      const html = await response.text();
      
      // Buscar meta tags de imagen
      const ogImagePatterns = [
        /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/i,
        /<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["'][^>]*>/i,
        /<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["'][^>]*>/i,
        /<meta[^>]*content=["']([^"']+)["'][^>]*name=["']twitter:image["'][^>]*>/i,
        /<meta[^>]*property=["']og:image:secure_url["'][^>]*content=["']([^"']+)["'][^>]*>/i,
      ];
      
      for (const pattern of ogImagePatterns) {
        const match = html.match(pattern);
        if (match && match[1]) {
          const imageUrl = match[1];
          // Aceptar URLs de LinkedIn CDN o cualquier HTTPS
          if (imageUrl.startsWith('https://') && (
            imageUrl.includes('licdn.com') || 
            imageUrl.includes('linkedin.com') ||
            imageUrl.includes('media-exp')
          )) {
            console.log('Imagen extraída de Open Graph:', imageUrl);
            return imageUrl;
          }
        }
      }
      
    } catch (e) {
      console.warn('Error con proxy:', e);
      continue;
    }
  }
  
  console.warn('No se pudo extraer imagen, usando default');
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
