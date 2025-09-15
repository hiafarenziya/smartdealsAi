import Header from "@/components/header";
import Footer from "@/components/footer";
import SEO from "@/components/seo";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, Target, Users, Zap, Heart, Star } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO 
        title="About Us - Smart Deals AI | AI-Powered Deal Discovery"
        description="Learn about Smart Deals AI - your trusted AI-powered platform for discovering the best deals from Amazon, Flipkart, and Myntra. Powered by intelligent algorithms to save you money."
        keywords="about smart deals ai, deal discovery, amazon deals, flipkart offers, myntra discounts, ai shopping assistant"
      />
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-bg py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full ai-glow mb-6">
            <Bot className="text-white text-3xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="about-hero-title">
            About Smart Deals AI
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="about-hero-description">
            Your intelligent shopping companion that discovers the best deals across India's top e-commerce platforms using advanced AI technology.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="mission-title">
              Our Mission
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed" data-testid="mission-description">
              We believe shopping should be smart, not hard. Our mission is to revolutionize online shopping in India by using artificial intelligence to find the best deals, compare prices, and help you make informed purchasing decisions across Amazon, Flipkart, and Myntra.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="glass-effect border-border hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                  <Target className="text-primary w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">Smart Discovery</h3>
                <p className="text-sm text-muted-foreground">
                  AI-powered algorithms find the best deals tailored to your preferences.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect border-border hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-lg mb-4">
                  <Zap className="text-secondary w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">Real-Time Updates</h3>
                <p className="text-sm text-muted-foreground">
                  Get the latest deals and price updates as they happen.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect border-border hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mb-4">
                  <Users className="text-accent w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">User-Focused</h3>
                <p className="text-sm text-muted-foreground">
                  Every feature is designed with your shopping experience in mind.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect border-border hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500/10 rounded-lg mb-4">
                  <Heart className="text-green-500 w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">Trusted Platform</h3>
                <p className="text-sm text-muted-foreground">
                  Reliable, secure, and transparent deal recommendations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" data-testid="how-it-works-title">
              How Smart Deals AI Works
            </h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">AI-Powered Scanning</h3>
                  <p className="text-muted-foreground">
                    Our advanced algorithms continuously scan thousands of products across Amazon, Flipkart, and Myntra to identify the best deals and discounts.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white font-bold text-sm">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Smart Curation</h3>
                  <p className="text-muted-foreground">
                    We analyze price trends, user ratings, and product quality to curate only the most valuable deals that offer genuine savings.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white font-bold text-sm">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Personalized Recommendations</h3>
                  <p className="text-muted-foreground">
                    Based on your preferences and shopping behavior, we present deals that are most relevant to your needs and interests.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Seamless Shopping</h3>
                  <p className="text-muted-foreground">
                    Click through to your preferred platform and complete your purchase with confidence, knowing you've got the best available deal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2" data-testid="stat-products">
                1000+
              </div>
              <p className="text-muted-foreground">Products Tracked Daily</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-secondary mb-2" data-testid="stat-savings">
                ₹50L+
              </div>
              <p className="text-muted-foreground">Total Savings Generated</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2" data-testid="stat-platforms">
                3
              </div>
              <p className="text-muted-foreground">Major Platforms Covered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" data-testid="why-choose-title">
              Why Choose Smart Deals AI?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="glass-effect border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Star className="text-yellow-500 w-6 h-6" />
                    <h3 className="text-lg font-semibold">Verified Deals Only</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Every deal is verified for authenticity. We ensure all offers are genuine and currently available on the respective platforms.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-effect border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Zap className="text-blue-500 w-6 h-6" />
                    <h3 className="text-lg font-semibold">Lightning Fast Updates</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Our AI works 24/7 to bring you the latest deals as soon as they become available, so you never miss out on savings.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-effect border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="text-green-500 w-6 h-6" />
                    <h3 className="text-lg font-semibold">Smart Filtering</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Advanced filters help you find exactly what you're looking for, whether by category, price range, or specific brand.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-effect border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="text-purple-500 w-6 h-6" />
                    <h3 className="text-lg font-semibold">Community Driven</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Built with feedback from real shoppers, our platform continuously evolves to serve your needs better.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="contact-title">
            Get in Touch
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Have questions or suggestions? We'd love to hear from you. Our team is always working to improve your shopping experience.
          </p>
          <a 
            href="mailto:afarenziya@gmail.com" 
            className="inline-flex items-center bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
            data-testid="contact-email-button"
          >
            <Bot className="mr-3 w-5 h-5" />
            Contact Smart Deals AI
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}