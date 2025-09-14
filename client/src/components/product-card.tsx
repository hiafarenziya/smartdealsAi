import { ExternalLink, Star, StarHalf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const handleAffiliateClick = () => {
    window.open(product.affiliateLink, '_blank', 'noopener,noreferrer');
  };

  const renderStars = (rating: string) => {
    const numRating = parseFloat(rating);
    const fullStars = Math.floor(numRating);
    const hasHalfStar = numRating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }

    const remainingStars = 5 - Math.ceil(numRating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-yellow-400" />);
    }

    return stars;
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'amazon':
        return '🛒';
      case 'flipkart':
        return '🛍️';
      case 'myntra':
        return '👕';
      default:
        return '🏪';
    }
  };

  const getPlatformButtonText = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'amazon':
        return 'View Deal On Amazon';
      case 'flipkart':
        return 'View Deal On Flipkart';
      case 'myntra':
        return 'View Deal On Myntra';
      default:
        return 'View Deal';
    }
  };


  const getPlatformButtonStyle = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'amazon':
        return 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white';
      case 'flipkart':
        return 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white';
      case 'myntra':
        return 'bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white';
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white';
    }
  };

  return (
    <div className="product-card bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group" data-testid={`product-card-${product.id}`}>
      <div className="relative bg-muted/50">
        <div className="aspect-[4/3] md:aspect-square bg-background flex items-center justify-center p-1 md:p-2 overflow-hidden rounded-lg m-1 md:m-2">
          <img 
            src={product.imageUrl || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800&q=80"} 
            alt={product.title} 
            className="w-full h-full object-contain max-w-[95%] max-h-[95%] group-hover:scale-105 transition-transform duration-300 rounded-md"
            data-testid={`product-image-${product.id}`}
            loading="lazy"
          />
        </div>
        {product.discountPercentage && (
          <Badge className="absolute top-2 left-2 bg-green-600 text-white border-0 text-xs font-semibold px-1.5 py-0.5 rounded" data-testid={`discount-badge-${product.id}`}>
            {product.discountPercentage} OFF
          </Badge>
        )}
        <div className="absolute top-2 right-2 bg-card/80 backdrop-blur-sm rounded-full p-1 shadow-sm">
          <span className="text-xs" data-testid={`platform-icon-${product.id}`}>
            {getPlatformIcon(product.platform)}
          </span>
        </div>
      </div>
      
      <div className="p-2 md:p-3">
        <h3 className="font-normal text-xs md:text-sm mb-1.5 line-clamp-2 text-foreground leading-tight" data-testid={`product-title-${product.id}`}>
          {product.title}
        </h3>
        
        {product.rating && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex" data-testid={`product-rating-${product.id}`}>
              {renderStars(product.rating)}
            </div>
            {product.reviewCount && (
              <span className="text-xs text-muted-foreground" data-testid={`review-count-${product.id}`}>
                ({product.reviewCount})
              </span>
            )}
          </div>
        )}
        
        <div className="flex flex-col gap-0.5 mb-2">
          {product.discountedPrice && (
            <span className="text-sm md:text-base font-bold text-foreground" data-testid={`discounted-price-${product.id}`}>
              ₹{parseFloat(product.discountedPrice).toLocaleString('en-IN')}
            </span>
          )}
          {product.originalPrice && product.discountedPrice !== product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through" data-testid={`original-price-${product.id}`}>
              ₹{parseFloat(product.originalPrice).toLocaleString('en-IN')}
            </span>
          )}
        </div>
        
        <Button 
          className={`w-full ${getPlatformButtonStyle(product.platform)} h-8 md:h-9 px-2 md:px-3 rounded-md text-[11px] md:text-sm leading-none gap-1 font-medium shadow-sm hover:shadow-md`}
          onClick={handleAffiliateClick}
          data-testid={`view-deal-button-${product.id}`}
        >
          <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
          <span className="whitespace-nowrap truncate">View On Amazon, Flipkart, Myntra</span>
        </Button>
      </div>
    </div>
  );
}
