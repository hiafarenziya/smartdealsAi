import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft, Bot } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-2xl mx-auto text-center glass-effect border-border">
          <CardContent className="pt-12 pb-8 px-6 sm:px-8">
            {/* Error Icon */}
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-8 ai-glow">
              <Bot className="text-white text-4xl" />
            </div>

            {/* Error Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              Oops! Page Not Found
            </h1>
            
            {/* Friendly Message */}
            <p className="text-muted-foreground text-lg sm:text-xl mb-2">
              हम आपके द्वारा खोजे गए page को नहीं ढूंढ सके।
            </p>
            <p className="text-muted-foreground text-base sm:text-lg mb-8">
              Don't worry! Let's get you back to finding amazing deals.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/" data-testid="button-home">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                >
                  <Home className="mr-2 w-5 h-5" />
                  Go to Home Page
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => window.history.back()}
                className="border-border hover:bg-muted px-8 py-3 rounded-xl w-full sm:w-auto"
                data-testid="button-back"
              >
                <ArrowLeft className="mr-2 w-5 h-5" />
                Go Back
              </Button>
            </div>

            {/* Additional Help */}
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">
                Looking for something specific? Try these popular pages:
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Link href="/products" data-testid="link-products">
                  <Button variant="ghost" size="sm" className="text-xs">
                    All Products
                  </Button>
                </Link>
                <Link href="/about" data-testid="link-about">
                  <Button variant="ghost" size="sm" className="text-xs">
                    About Us
                  </Button>
                </Link>
                <a href="mailto:afarenziya@gmail.com" data-testid="link-contact">
                  <Button variant="ghost" size="sm" className="text-xs">
                    Contact Support
                  </Button>
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
