import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Grid, List } from "lucide-react";
import type { Product } from "@shared/schema";

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", { platform: selectedPlatform, category: selectedCategory, search: searchQuery }],
  });

  const handleSearch = () => {
    // Search is handled by the query key dependencies
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedPlatform("");
    setSelectedCategory("");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-bg py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="products-hero-title">
            All Products & Deals
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="products-hero-description">
            Browse through our complete collection of AI-curated deals from Amazon, Flipkart, and Myntra
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-card/30 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Input
                  type="text" 
                  placeholder="Search products..."
                  className="w-full pl-10 bg-background border-border"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  data-testid="search-input"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              <Select value={selectedPlatform || "all"} onValueChange={(value) => setSelectedPlatform(value === "all" ? "" : value)} data-testid="filter-platform">
                <SelectTrigger className="w-40 bg-background border-border">
                  <SelectValue placeholder="Platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  <SelectItem value="Amazon">Amazon</SelectItem>
                  <SelectItem value="Flipkart">Flipkart</SelectItem>
                  <SelectItem value="Myntra">Myntra</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedCategory || "all"} onValueChange={(value) => setSelectedCategory(value === "all" ? "" : value)} data-testid="filter-category">
                <SelectTrigger className="w-40 bg-background border-border">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Fashion">Fashion</SelectItem>
                  <SelectItem value="Home & Garden">Home & Garden</SelectItem>
                  <SelectItem value="Books">Books</SelectItem>
                  <SelectItem value="Sports">Sports</SelectItem>
                </SelectContent>
              </Select>

              <Button 
                variant="outline" 
                onClick={clearFilters}
                className="border-border"
                data-testid="clear-filters-button"
              >
                Clear Filters
              </Button>

              {/* View Mode Toggle */}
              <div className="flex border border-border rounded-lg overflow-hidden">
                <Button 
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-none"
                  data-testid="view-grid-button"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button 
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-none"
                  data-testid="view-list-button"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Results Summary */}
          <div className="flex justify-between items-center mb-8">
            <div className="text-muted-foreground" data-testid="results-summary">
              {isLoading ? "Loading..." : `Showing ${products.length} products`}
            </div>
            <div className="text-sm text-muted-foreground">
              {(searchQuery || selectedPlatform || selectedCategory) && (
                <span data-testid="active-filters">
                  Filters: {[searchQuery, selectedPlatform, selectedCategory].filter(Boolean).join(", ")}
                </span>
              )}
            </div>
          </div>

          {/* Products Grid/List */}
          {isLoading ? (
            <div className="text-center py-20">
              <div className="text-muted-foreground text-lg">Loading products...</div>
            </div>
          ) : products.length > 0 ? (
            <div 
              className={
                viewMode === "grid" 
                  ? "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
                  : "space-y-6"
              }
              data-testid="products-container"
            >
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20" data-testid="no-products">
              <div className="text-2xl font-semibold mb-4">No products found</div>
              <div className="text-muted-foreground mb-8">
                Try adjusting your search terms or filters to find what you're looking for.
              </div>
              <Button onClick={clearFilters} data-testid="clear-filters-no-results">
                Clear All Filters
              </Button>
            </div>
          )}

          {/* Load More (placeholder for pagination) */}
          {products.length > 0 && !isLoading && (
            <div className="text-center mt-12">
              <Button 
                className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white px-8 py-3 rounded-xl font-medium transition-all duration-300"
                data-testid="load-more-button"
              >
                Load More Products
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
