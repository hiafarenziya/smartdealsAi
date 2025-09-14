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
    <div className="product-card bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group" data-testid={`product-card-${product.id}`}>
      <div className="relative bg-background">
        <div className="aspect-square bg-gradient-to-br from-muted/30 to-muted/60 flex items-center justify-center p-4 overflow-hidden">
          <img 
            src={product.imageUrl || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800&q=80"} 
            alt={product.title} 
            className="w-full h-full object-contain max-w-[90%] max-h-[90%] group-hover:scale-105 transition-transform duration-300 rounded-xl"
            data-testid={`product-image-${product.id}`}
            loading="lazy"
          />
        </div>
        {product.discountPercentage && (
          <Badge className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white border-0 text-xs font-semibold px-2 py-1" data-testid={`discount-badge-${product.id}`}>
            {product.discountPercentage} OFF
          </Badge>
        )}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-sm">
          <span className="text-sm" data-testid={`platform-icon-${product.id}`}>
            {getPlatformIcon(product.platform)}
          </span>
        </div>
      </div>
      
      <div className="p-4 lg:p-5">
        <h3 className="font-medium text-sm lg:text-base mb-2 line-clamp-2 text-foreground leading-tight" data-testid={`product-title-${product.id}`}>
          {product.title}
        </h3>
        
        {product.rating && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex" data-testid={`product-rating-${product.id}`}>
              {renderStars(product.rating)}
            </div>
            {product.reviewCount && (
              <span className="text-xs lg:text-sm text-muted-foreground" data-testid={`review-count-${product.id}`}>
                ({product.reviewCount} reviews)
              </span>
            )}
          </div>
        )}
        
        <div className="flex flex-col gap-1 mb-4">
          {product.discountedPrice && (
            <span className="text-lg lg:text-xl font-bold text-foreground" data-testid={`discounted-price-${product.id}`}>
              ₹{parseFloat(product.discountedPrice).toLocaleString('en-IN')}
            </span>
          )}
          {product.originalPrice && product.discountedPrice !== product.originalPrice && (
            <span className="text-sm lg:text-base text-muted-foreground line-through" data-testid={`original-price-${product.id}`}>
              ₹{parseFloat(product.originalPrice).toLocaleString('en-IN')}
            </span>
          )}
        </div>
        
        <Button 
          className={`w-full ${getPlatformButtonStyle(product.platform)} py-2.5 lg:py-3 rounded-lg font-medium transition-all duration-300 shadow-sm hover:shadow-md text-sm lg:text-base`}
          onClick={handleAffiliateClick}
          data-testid={`view-deal-button-${product.id}`}
        >
          <ExternalLink className="mr-2 w-3 h-3 lg:w-4 lg:h-4" />
          {getPlatformButtonText(product.platform)}
        </Button>
      </div>
    </div>
  );
}
