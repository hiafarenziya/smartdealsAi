import { ExternalLink, Star, StarHalf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  viewMode?: "grid" | "list";
}

export default function ProductCard({ product, viewMode = "grid" }: ProductCardProps) {
  const handleAffiliateClick = () => {
    window.open(product.affiliateLink, '_blank', 'noopener,noreferrer');
  };

  const renderStars = (rating: string) => {
    const numRating = parseFloat(rating);
    const fullStars = Math.floor(numRating);
    const hasHalfStar = numRating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="w-3 h-3 fill-yellow-400 text-yellow-400" />);
    }

    const remainingStars = 5 - Math.ceil(numRating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-3 h-3 text-yellow-400" />);
    }

    return stars;
  };


  const getPlatformButtonText = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'amazon':
        return 'View On Amazon';
      case 'flipkart':
        return 'View On Flipkart';
      case 'myntra':
        return 'View On Myntra';
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

  if (viewMode === "list") {
    // Single amount display - use discounted price if available, otherwise original price
    const amount = product.discountedPrice || product.originalPrice;
    
    return (
      <div className="product-card bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-all duration-300 group flex items-stretch" data-testid={`product-card-${product.id}`}>
        {/* Left: Product Image - Full Height Down to Up */}
        <div className="w-28 md:w-32 flex-shrink-0 bg-muted/20 dark:bg-muted/10">
          <img 
            src={product.imageUrl || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800&q=80"} 
            alt={product.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            data-testid={`product-image-${product.id}`}
            loading="lazy"
          />
        </div>
        
        {/* Right: Product Details */}
        <div className="flex-1 flex flex-col justify-between p-3 min-w-0">
          <div className="space-y-2">
            {/* Title */}
            <h3 className="font-medium text-sm line-clamp-2 text-foreground leading-tight" data-testid={`product-title-${product.id}`}>
              {product.title}
            </h3>
            
            {/* Rating Section */}
            {product.rating && (
              <div className="flex items-center gap-1">
                <div className="flex" data-testid={`product-rating-${product.id}`}>
                  {renderStars(product.rating)}
                </div>
                {product.reviewCount && (
                  <span className="text-[10px] text-muted-foreground" data-testid={`review-count-${product.id}`}>
                    ({product.reviewCount})
                  </span>
                )}
              </div>
            )}
            
            {/* Prices */}
            <div className="space-y-1">
              {product.discountedPrice && (
                <div className="text-lg font-bold text-foreground" data-testid={`discounted-price-${product.id}`}>
                  ₹{parseFloat(product.discountedPrice).toLocaleString('en-IN')}
                </div>
              )}
              {product.originalPrice && product.discountedPrice !== product.originalPrice && (
                <div className="text-xs text-muted-foreground line-through" data-testid={`original-price-${product.id}`}>
                  ₹{parseFloat(product.originalPrice).toLocaleString('en-IN')}
                </div>
              )}
            </div>
          </div>
          
          {/* Action Button */}
          <div className="flex justify-end mt-2">
            <Button 
              size="sm"
              className={`${getPlatformButtonStyle(product.platform)} h-8 px-3 rounded-md text-xs font-medium shadow-sm hover:shadow-md`}
              onClick={handleAffiliateClick}
              data-testid={`view-deal-button-${product.id}`}
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              <span className="hidden sm:inline">{getPlatformButtonText(product.platform).replace('View On ', '')}</span>
              <span className="sm:hidden">View</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  // Grid View (Default)
  return (
    <div className="product-card bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group" data-testid={`product-card-${product.id}`}>
      <div className="relative bg-muted/20 dark:bg-muted/10 pt-3 md:pt-4">
        <div className="aspect-square bg-background/80 dark:bg-muted/20 flex items-center justify-center p-2 md:p-4 overflow-hidden rounded-xl m-0.5 md:m-1">
          <img 
            src={product.imageUrl || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800&q=80"} 
            alt={product.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-lg shadow-sm"
            data-testid={`product-image-${product.id}`}
            loading="lazy"
          />
        </div>
        {product.discountPercentage && (
          <Badge className="absolute top-1 left-1 bg-green-600 text-white border-0 text-xs font-semibold px-2 py-1 rounded-lg shadow-md" data-testid={`discount-badge-${product.id}`}>
            {product.discountPercentage} OFF
          </Badge>
        )}
      </div>
      
      <div className="p-3 md:p-4">
        <h3 className="font-normal text-xs md:text-sm mb-1.5 line-clamp-2 text-foreground leading-tight" data-testid={`product-title-${product.id}`}>
          {product.title}
        </h3>
        
        {product.rating && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex" data-testid={`product-rating-${product.id}`}>
              {renderStars(product.rating)}
            </div>
            {product.reviewCount && (
              <span className="text-[10px] text-muted-foreground" data-testid={`review-count-${product.id}`}>
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
          <span className="whitespace-nowrap truncate">{getPlatformButtonText(product.platform)}</span>
        </Button>
      </div>
    </div>
  );
}
