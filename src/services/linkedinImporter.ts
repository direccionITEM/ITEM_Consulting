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

// Elementos de UI/login de LinkedIn que deben ser filtrados
const LINKEDIN_NOISE_PATTERNS = [
  'Aceptar y unirse a LinkedIn',
  'Al hacer clic en',
  'aceptas las Condiciones de uso',
  'Pasar al contenido principal',
  'Unirse ahora',
  'Iniciar sesión',
  'Denunciar este artículo',
  'Más artículos de',
  'See all articles',
  'Ver temas',
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
];

/**
 * Extrae el contenido de una URL de LinkedIn usando jina.ai
 */
export async function importFromLinkedIn(url: string): Promise<LinkedInPostData> {
  if (!url.includes('linkedin.com')) {
    throw new Error('La URL debe ser de LinkedIn (linkedin.com)');
  }

  try {
    const cleanUrl = url.replace(/^https?:\/\//, '');
    const jinaUrl = `https://r.jina.ai/http://${cleanUrl}`;
    
    console.log('Fetching from:', jinaUrl);
    
    const response = await fetch(jinaUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Error al acceder al contenido: ${response.status}`);
    }
    
    const text = await response.text();
    console.log('Response preview:', text.substring(0, 800));
    
    // Parsear la respuesta
    const lines = text.split('\n').map(l => l.trim());
    
    // Extraer título
    let title = '';
    const titleLine = lines.find(l => l.startsWith('Title:'));
    if (titleLine) {
      title = titleLine.replace('Title:', '').trim().replace(/\|?\s*LinkedIn$/i, '');
    }
    
    // Extraer autor
    let author = '';
    for (let i = 0; i < Math.min(lines.length, 30); i++) {
      const line = lines[i];
      // Buscar patrón: "### Nombre Apellido" o línea que parezca nombre seguido de "Seguir"
      if (line.startsWith('### ')) {
        author = line.replace('### ', '').trim();
        break;
      }
      // O buscar nombre en línea con patrón específico
      if (line.match(/^[A-Z][a-záéíóúÁÉÍÓÚñÑ]+\s+[A-Z][a-záéíóúÁÉÍÓÚñÑ]+/)) {
        const nextLine = lines[i + 1];
        if (nextLine && (nextLine.includes('Seguir') || nextLine.includes('Fecha'))) {
          author = line;
          break;
        }
      }
    }
    
    // Encontrar imagen
    let imageUrl = '/images/5.png';
    
    // 1. Buscar en el markdown de jina.ai
    const imageMatch = text.match(/!\[.*?\]\((https:\/\/[^\)]+)\)/);
    if (imageMatch) {
      imageUrl = imageMatch[1];
      console.log('Image from markdown:', imageUrl);
    }
    
    // 2. Si no, buscar con Open Graph
    if (imageUrl === '/images/5.png') {
      imageUrl = await fetchOpenGraphImage(url);
    }
    
    // Extraer contenido - encontrar después de "Markdown Content:"
    const markdownIndex = lines.findIndex(l => l === 'Markdown Content:');
    let content = '';
    
    if (markdownIndex !== -1 && markdownIndex < lines.length - 1) {
      const contentLines = lines.slice(markdownIndex + 1);
      content = processContent(contentLines);
    } else {
      // Fallback: procesar todo
      content = processContent(lines);
    }
    
    // Generar excerpt
    const textContent = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const excerpt = textContent.substring(0, 200) + (textContent.length > 200 ? '...' : '');
    
    return {
      title: title || 'Artículo de LinkedIn',
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
 * Procesa las líneas de contenido y convierte a HTML
 */
function processContent(lines: string[]): string {
  const paragraphs: string[] = [];
  let currentParagraph: string[] = [];
  
  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(' ').trim();
      if (text) {
        paragraphs.push(convertToHtml(text));
      }
      currentParagraph = [];
    }
  };
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    // Saltar líneas vacías
    if (!trimmed) {
      flushParagraph();
      continue;
    }
    
    // Saltar líneas de ruido
    if (isNoiseLine(trimmed)) continue;
    
    // Saltar separadores
    if (/^={3,}$/.test(trimmed) || /^-{3,}$/.test(trimmed)) {
      flushParagraph();
      continue;
    }
    
    // Saltar imágenes markdown
    if (trimmed.startsWith('![') || trimmed.startsWith('!Image')) continue;
    
    // Saltar headers de jina.ai
    if (trimmed.match(/^(URL Source|Markdown Content|Title):/)) continue;
    
    // Saltar autor (ya lo extrajimos)
    if (trimmed.startsWith('### ')) continue;
    
    // Saltar URLs de LinkedIn
    if (trimmed.match(/^https?:\/\/.*linkedin\.com/)) continue;
    
    // Detectar fin del artículo
    if (trimmed.startsWith('Más artículos de') ||
        trimmed.startsWith('Ver temas') ||
        trimmed.includes('Inicia sesión para ver') ||
        trimmed.includes('Al hacer clic en')) {
      break;
    }
    
    currentParagraph.push(trimmed);
  }
  
  flushParagraph();
  
  return paragraphs.join('\n');
}

/**
 * Verifica si una línea es ruido
 */
function isNoiseLine(line: string): boolean {
  if (!line) return true;
  return LINKEDIN_NOISE_PATTERNS.some(pattern => 
    line.includes(pattern) || line.toLowerCase().includes(pattern.toLowerCase())
  );
}

/**
 * Convierte markdown a HTML
 */
function convertToHtml(text: string): string {
  // Convertir **texto** a <strong>
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Convertir *texto* a <em>
  text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
  // Convertir links
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="text-blue-600 underline">$1</a>');
  // Envolver en párrafo
  return `<p>${text}</p>`;
}

/**
 * Intenta obtener la imagen Open Graph
 */
async function fetchOpenGraphImage(url: string): Promise<string> {
  const proxies = [
    (u: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
    (u: string) => `https://corsproxy.io/?${encodeURIComponent(u)}`,
  ];
  
  for (const proxyFn of proxies) {
    try {
      const proxyUrl = proxyFn(url);
      const response = await fetch(proxyUrl, { 
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        signal: AbortSignal.timeout(8000)
      });
      
      if (!response.ok) continue;
      
      const html = await response.text();
      
      // Buscar og:image
      const patterns = [
        /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i,
        /<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i,
        /<meta[^>]*property=["']og:image:secure_url["'][^>]*content=["']([^"']+)["']/i,
      ];
      
      for (const pattern of patterns) {
        const match = html.match(pattern);
        if (match && match[1]) {
          console.log('Image from Open Graph:', match[1]);
          return match[1];
        }
      }
    } catch (e) {
      continue;
    }
  }
  
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
