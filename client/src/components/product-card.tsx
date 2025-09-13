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

  return (
    <div className="product-card bg-card border border-border rounded-2xl overflow-hidden" data-testid={`product-card-${product.id}`}>
      <div className="relative">
        <img 
          src={product.imageUrl || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"} 
          alt={product.title} 
          className="w-full h-48 object-cover"
          data-testid={`product-image-${product.id}`}
        />
        {product.discountPercentage && (
          <Badge className="absolute top-4 left-4 bg-gradient-to-r from-accent to-orange-500 text-white border-0" data-testid={`discount-badge-${product.id}`}>
            {product.discountPercentage} OFF
          </Badge>
        )}
        <div className="absolute top-4 right-4 bg-card/80 backdrop-blur-sm rounded-full p-2">
          <span className="text-lg" data-testid={`platform-icon-${product.id}`}>
            {getPlatformIcon(product.platform)}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2" data-testid={`product-title-${product.id}`}>
          {product.title}
        </h3>
        
        {product.rating && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex" data-testid={`product-rating-${product.id}`}>
              {renderStars(product.rating)}
            </div>
            {product.reviewCount && (
              <span className="text-sm text-muted-foreground" data-testid={`review-count-${product.id}`}>
                ({product.reviewCount} reviews)
              </span>
            )}
          </div>
        )}
        
        <div className="flex items-center gap-3 mb-4">
          {product.discountedPrice && (
            <span className="text-2xl font-bold text-primary" data-testid={`discounted-price-${product.id}`}>
              ₹{parseFloat(product.discountedPrice).toLocaleString('en-IN')}
            </span>
          )}
          {product.originalPrice && product.discountedPrice !== product.originalPrice && (
            <span className="text-lg text-muted-foreground line-through" data-testid={`original-price-${product.id}`}>
              ₹{parseFloat(product.originalPrice).toLocaleString('en-IN')}
            </span>
          )}
        </div>
        
        <Button 
          className="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
          onClick={handleAffiliateClick}
          data-testid={`view-deal-button-${product.id}`}
        >
          <ExternalLink className="mr-2 w-4 h-4" />
          View Deal
        </Button>
      </div>
    </div>
  );
}
