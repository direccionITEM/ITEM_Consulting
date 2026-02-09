import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
}

const defaultDescription = 'ITEM Consulting - Ingeniería especializada en infraestructuras del transporte, economía y movilidad. Planes de Movilidad Urbana Sostenible (PMUS), estudios de tráfico y consultoría de movilidad en Murcia y toda España.';

const defaultKeywords = 'PMUS, Plan de Movilidad Urbana Sostenible, estudios de tráfico, consultoría de movilidad, transporte, ingeniería, Murcia, España, carriles bici, peatonalización, seguridad vial';

export default function SEO({ 
  title, 
  description = defaultDescription,
  keywords = defaultKeywords,
  ogImage = '/images/logo.png',
  canonical
}: SEOProps) {
  const siteTitle = title ? `${title} | ITEM Consulting` : 'ITEM Consulting | Ingeniería de Movilidad Sostenible';
  const siteUrl = 'https://item-consulting.vercel.app';
  
  return (
    <Helmet>
      {/* Título */}
      <title>{siteTitle}</title>
      
      {/* Meta básicos */}
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="ITEM Consulting Engineering S.L." />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      
      {/* Canonical */}
      {canonical && <link rel="canonical" href={`${siteUrl}${canonical}`} />}
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="ITEM Consulting" />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:url" content={canonical ? `${siteUrl}${canonical}` : siteUrl} />
      <meta property="og:locale" content="es_ES" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
      
      {/* Localización */}
      <meta name="geo.region" content="ES-MU" />
      <meta name="geo.placename" content="Murcia" />
      <meta name="geo.position" content="37.9922;-1.1307" />
      <meta name="ICBM" content="37.9922, -1.1307" />
      
      {/* Idioma */}
      <html lang="es" />
    </Helmet>
  );
}
