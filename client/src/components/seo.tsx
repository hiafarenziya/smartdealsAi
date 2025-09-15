import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  keywords?: string;
  type?: string;
}

const DEFAULT_DESCRIPTION = "Discover exclusive deals and discounts on Amazon, Flipkart, Myntra with our AI-powered search engine. Get the best products at the best prices, curated just for you.";
const SITE_NAME = "Smart Deals AI";
const BASE_URL = "https://smart-deals-ai.replit.app";

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  canonical,
  ogTitle,
  ogDescription,
  twitterTitle,
  twitterDescription,
  keywords,
  type = "website"
}: SEOProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} - AI-Powered Deal Discovery Platform`;
  const pageCanonical = canonical || `${BASE_URL}${window.location.pathname}`;
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Canonical */}
      <link rel="canonical" href={pageCanonical} />
      
      {/* Open Graph */}
      <meta property="og:title" content={ogTitle || fullTitle} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:url" content={pageCanonical} />
      <meta property="og:type" content={type} />
      
      {/* Twitter */}
      <meta property="twitter:title" content={twitterTitle || fullTitle} />
      <meta property="twitter:description" content={twitterDescription || description} />
    </Helmet>
  );
}