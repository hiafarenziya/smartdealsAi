import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import type { Category, Platform } from "@shared/schema";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Search, Filter, Grid, List, SlidersHorizontal, X } from "lucide-react";
import type { Product } from "@shared/schema";

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [showFilters, setShowFilters] = useState(false);

  // Debounce search query to prevent excessive API calls
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

  const queryParams = useMemo(() => {
    const params: Record<string, any> = {};
    
    if (debouncedSearchQuery) params.search = debouncedSearchQuery;
    if (selectedPlatform) params.platform = selectedPlatform;
    if (selectedCategory) params.category = selectedCategory;
    if (sortBy) params.sortBy = sortBy;
    if (priceRange[0] > 0) params.minPrice = priceRange[0];
    if (priceRange[1] < 100000) params.maxPrice = priceRange[1];
    
    return params;
  }, [debouncedSearchQuery, selectedPlatform, selectedCategory, sortBy, priceRange]);

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", queryParams],
  });

  // Fetch active categories and platforms for filters
  const { data: categories = [], isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories", { active: true }]
  });
  
  const { data: platforms = [], isLoading: platformsLoading } = useQuery<Platform[]>({
    queryKey: ["/api/platforms", { active: true }]
  });

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedPlatform("");
    setSelectedCategory("");
    setSortBy("");
    setPriceRange([0, 100000]);
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchQuery) count++;
    if (selectedPlatform) count++;
    if (selectedCategory) count++;
    if (sortBy) count++;
    if (priceRange[0] > 0 || priceRange[1] < 100000) count++;
    return count;
  }, [searchQuery, selectedPlatform, selectedCategory, sortBy, priceRange]);

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
      <section className="py-6 bg-card/30 border-b border-border">
        <div className="container mx-auto px-4">
          {/* Main Search and Quick Actions */}
          <div className="flex flex-col lg:flex-row gap-4 items-center mb-4">
            {/* Search Bar */}
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <Input
                  type="text" 
                  placeholder="Search products, brands, categories..."
                  className="w-full pl-10 pr-4 py-3 bg-background border-border rounded-xl text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  data-testid="search-input"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-6 w-6"
                    data-testid="clear-search"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3 items-center">
              {/* Sort Dropdown */}
              <Select value={sortBy || "newest"} onValueChange={setSortBy} data-testid="sort-select">
                <SelectTrigger className="w-44 bg-background border-border">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price_low">Price: Low to High</SelectItem>
                  <SelectItem value="price_high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>

              {/* Advanced Filters Toggle */}
              <Button 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
                className="border-border relative"
                data-testid="toggle-filters"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="destructive" className="ml-2 px-1.5 py-0.5 text-xs min-w-[20px] h-5">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>

              {/* View Mode Toggle */}
              <div className="flex border border-border rounded-lg overflow-hidden">
                <Button 
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-none px-3"
                  data-testid="view-grid-button"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button 
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-none px-3"
                  data-testid="view-list-button"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <Card className="mt-4 border-border bg-card/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span className="flex items-center">
                    <Filter className="w-5 h-5 mr-2" />
                    Advanced Filters
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={clearFilters}
                    className="text-sm"
                    data-testid="clear-all-filters"
                  >
                    Clear All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Platform Filter */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Platform</label>
                    <Select value={selectedPlatform || "all"} onValueChange={(value) => setSelectedPlatform(value === "all" ? "" : value)} data-testid="filter-platform">
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue placeholder="All Platforms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Platforms</SelectItem>
                        {platformsLoading ? (
                          <div className="p-2 text-sm text-muted-foreground">Loading platforms...</div>
                        ) : (
                          platforms.map((platform) => (
                            <SelectItem key={platform.id} value={platform.name}>
                              {platform.icon && <span className="mr-2">{platform.icon}</span>}
                              {platform.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Category Filter */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Category</label>
                    <Select value={selectedCategory || "all"} onValueChange={(value) => setSelectedCategory(value === "all" ? "" : value)} data-testid="filter-category">
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categoriesLoading ? (
                          <div className="p-2 text-sm text-muted-foreground">Loading categories...</div>
                        ) : (
                          categories.map((category) => (
                            <SelectItem key={category.id} value={category.name}>
                              {category.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Range */}
                  <div className="md:col-span-2 space-y-3">
                    <label className="text-sm font-medium">Price Range</label>
                    <div className="px-4">
                      <Slider
                        value={priceRange}
                        onValueChange={(value) => setPriceRange([value[0], value[1]])}
                        max={100000}
                        min={0}
                        step={500}
                        className="w-full"
                        data-testid="price-range-slider"
                      />
                      <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                        <span>₹{priceRange[0].toLocaleString()}</span>
                        <span>₹{priceRange[1].toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Active Filters Display */}
                {activeFiltersCount > 0 && (
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                    <span className="text-sm font-medium text-muted-foreground mr-2">Active filters:</span>
                    {searchQuery && (
                      <Badge variant="secondary" className="flex items-center gap-1" data-testid="active-filter-search">
                        Search: "{searchQuery}"
                        <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery("")} />
                      </Badge>
                    )}
                    {selectedPlatform && (
                      <Badge variant="secondary" className="flex items-center gap-1" data-testid="active-filter-platform">
                        Platform: {selectedPlatform}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedPlatform("")} />
                      </Badge>
                    )}
                    {selectedCategory && (
                      <Badge variant="secondary" className="flex items-center gap-1" data-testid="active-filter-category">
                        Category: {selectedCategory}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory("")} />
                      </Badge>
                    )}
                    {(priceRange[0] > 0 || priceRange[1] < 100000) && (
                      <Badge variant="secondary" className="flex items-center gap-1" data-testid="active-filter-price">
                        Price: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => setPriceRange([0, 100000])} />
                      </Badge>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
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
                  ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4" 
                  : "space-y-4"
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
