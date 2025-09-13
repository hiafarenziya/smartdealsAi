import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ProductCard from "@/components/product-card";
import ContactForm from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Search, Brain, Zap, Target, Rocket, Mail, ShoppingCart, Shirt } from "lucide-react";
import type { Product } from "@shared/schema";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const { data: featuredProducts = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", { featured: true }],
  });

  const handleSearch = () => {
    // In a real app, this would trigger a search
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20"></div>
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* AI Badge */}
            <Badge className="inline-flex items-center px-4 py-2 bg-card/50 border border-border rounded-full mb-8 glass-effect" data-testid="ai-badge">
              <Sparkles className="text-primary mr-2 w-4 h-4 animate-pulse-slow" />
              <span className="text-sm font-medium">AI-Powered Product Discovery</span>
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Find the <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Best Deals</span> with Smart AI
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed" data-testid="hero-description">
              Discover exclusive offers and discounts on Amazon, Flipkart, Myntra with our AI-powered search engine. 
              Get the best products at the best prices, curated just for you.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <Input
                  type="text" 
                  placeholder="Search for products, brands, or categories..."
                  className="w-full px-6 py-4 pl-14 bg-card border border-border rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  data-testid="hero-search-input"
                />
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Button 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg transition-all"
                  onClick={handleSearch}
                  data-testid="hero-search-button"
                >
                  <Sparkles className="mr-2 w-4 h-4" />
                  Search
                </Button>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2" data-testid="stat-products">10K+</div>
                <div className="text-muted-foreground">Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-secondary mb-2" data-testid="stat-savings">50%</div>
                <div className="text-muted-foreground">Avg. Savings</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2" data-testid="stat-monitoring">24/7</div>
                <div className="text-muted-foreground">AI Monitoring</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2" data-testid="stat-users">5K+</div>
                <div className="text-muted-foreground">Happy Users</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/30" id="about">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="features-title">How Our AI Finds the Best Deals</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="features-description">
              Our advanced AI algorithms continuously monitor prices across multiple platforms to bring you the best offers
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-card border border-border glass-effect" data-testid="feature-analysis">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 ai-glow">
                <Brain className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Smart Analysis</h3>
              <p className="text-muted-foreground">AI analyzes millions of products across Amazon, Flipkart, and Myntra to identify the best deals</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-card border border-border glass-effect" data-testid="feature-updates">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6 ai-glow">
                <Zap className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Real-time Updates</h3>
              <p className="text-muted-foreground">Get instant notifications when prices drop or new deals become available</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-card border border-border glass-effect" data-testid="feature-personalized">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mx-auto mb-6 ai-glow">
                <Target className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Personalized Results</h3>
              <p className="text-muted-foreground">Tailored recommendations based on your preferences and shopping history</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20" id="products">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="products-title">Trending Deals</h2>
              <p className="text-xl text-muted-foreground" data-testid="products-subtitle">Hand-picked by our AI for maximum savings</p>
            </div>
            
            {/* Filter Controls */}
            <div className="flex flex-wrap gap-4 mt-6 md:mt-0">
              <Select value={selectedCategory || "all"} onValueChange={(value) => setSelectedCategory(value === "all" ? "" : value)} data-testid="filter-category">
                <SelectTrigger className="bg-card border border-border w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Fashion">Fashion</SelectItem>
                  <SelectItem value="Home & Garden">Home & Garden</SelectItem>
                  <SelectItem value="Books">Books</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedPlatform || "all"} onValueChange={(value) => setSelectedPlatform(value === "all" ? "" : value)} data-testid="filter-platform">
                <SelectTrigger className="bg-card border border-border w-48">
                  <SelectValue placeholder="All Platforms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  <SelectItem value="Amazon">Amazon</SelectItem>
                  <SelectItem value="Flipkart">Flipkart</SelectItem>
                  <SelectItem value="Myntra">Myntra</SelectItem>
                </SelectContent>
              </Select>
              
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" data-testid="apply-filters-button">
                <Search className="mr-2 w-4 h-4" />
                Apply
              </Button>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-testid="products-grid">
            {isLoading ? (
              <div className="col-span-full text-center py-12">
                <div className="text-muted-foreground">Loading featured products...</div>
              </div>
            ) : featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-muted-foreground">No featured products available at the moment.</div>
              </div>
            )}
          </div>
          
          <div className="text-center mt-12">
            <Button className="bg-gradient-to-r from-secondary to-primary hover:from-primary hover:to-secondary text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl" data-testid="explore-more-button">
              <Search className="mr-2 w-5 h-5" />
              Explore More Products
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-card/30" id="categories">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="categories-title">Shop by Platform</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="categories-description">
              Access the best deals from India's top e-commerce platforms
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Amazon */}
            <div className="group bg-card border border-border rounded-2xl p-8 text-center glass-effect hover:border-accent transition-all duration-300" data-testid="platform-amazon">
              <div className="w-20 h-20 bg-gradient-to-br from-accent to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <ShoppingCart className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Amazon</h3>
              <p className="text-muted-foreground mb-6">Discover millions of products with exclusive Amazon deals and lightning offers</p>
              <div className="text-3xl font-bold text-accent mb-4">2.5K+ Deals</div>
              <Button className="w-full bg-accent hover:bg-accent/90 text-white">
                Browse Amazon Deals
              </Button>
            </div>
            
            {/* Flipkart */}
            <div className="group bg-card border border-border rounded-2xl p-8 text-center glass-effect hover:border-secondary transition-all duration-300" data-testid="platform-flipkart">
              <div className="w-20 h-20 bg-gradient-to-br from-secondary to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <ShoppingCart className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Flipkart</h3>
              <p className="text-muted-foreground mb-6">Shop from India's largest online marketplace with guaranteed best prices</p>
              <div className="text-3xl font-bold text-secondary mb-4">1.8K+ Deals</div>
              <Button className="w-full bg-secondary hover:bg-secondary/90 text-white">
                Browse Flipkart Deals
              </Button>
            </div>
            
            {/* Myntra */}
            <div className="group bg-card border border-border rounded-2xl p-8 text-center glass-effect hover:border-primary transition-all duration-300" data-testid="platform-myntra">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Shirt className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Myntra</h3>
              <p className="text-muted-foreground mb-6">Fashion and lifestyle products with the latest trends and brand collections</p>
              <div className="text-3xl font-bold text-primary mb-4">950+ Deals</div>
              <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                Browse Myntra Deals
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="contact-title">Get in Touch</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="contact-description">
              Have questions or suggestions? We'd love to hear from you!
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="cta-title">Ready to Save Big with AI?</h2>
            <p className="text-xl text-muted-foreground mb-8" data-testid="cta-description">
              Join thousands of smart shoppers who save money every day with our AI-powered deal discovery
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-accent to-orange-500 hover:from-orange-500 hover:to-accent text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl" data-testid="cta-start-button">
                <Rocket className="mr-2 w-5 h-5" />
                Start Finding Deals
              </Button>
              
              <a 
                href="mailto:afarenziya@gmail.com" 
                className="bg-card border border-border hover:border-primary text-foreground px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 glass-effect inline-flex items-center justify-center"
                data-testid="cta-contact-button"
              >
                <Mail className="mr-2 w-5 h-5" />
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
