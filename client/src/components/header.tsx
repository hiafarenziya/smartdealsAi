import { useState } from "react";
import { Link } from "wouter";
import { Menu, X, Bot, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3" data-testid="logo-link">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center ai-glow">
              <Bot className="text-white text-sm sm:text-lg" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent truncate">
                Smart Deals AI
              </h1>
              <p className="text-xs sm:text-xs text-muted-foreground">Powered by iajaykumar.com</p>
            </div>
          </Link>
          
          {/* Desktop Navigation Menu */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors font-medium text-sm xl:text-base" data-testid="nav-home">
              Home
            </Link>
            <Link href="/products" className="text-foreground hover:text-primary transition-colors font-medium text-sm xl:text-base" data-testid="nav-products">
              Products
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors font-medium text-sm xl:text-base" data-testid="nav-about">
              About
            </Link>
            <Link href="/admin" className="text-muted-foreground hover:text-primary transition-colors text-xs xl:text-sm" data-testid="nav-admin">
              Admin
            </Link>
          </nav>
          
          {/* Desktop Contact Button & Mobile Menu */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Desktop Contact Button */}
            <a 
              href="mailto:afarenziya@gmail.com" 
              className="hidden lg:flex items-center bg-gradient-to-r from-accent to-orange-500 hover:from-orange-500 hover:to-accent text-white px-4 xl:px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl text-sm xl:text-base"
              data-testid="contact-button"
            >
              <Mail className="mr-1 xl:mr-2 w-3 h-3 xl:w-4 xl:h-4" />
              <span className="hidden xl:inline">Contact Us</span>
              <span className="xl:hidden">Contact</span>
            </a>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-foreground h-8 w-8 sm:h-10 sm:w-10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="mobile-menu-button"
            >
              {isMenuOpen ? <X className="text-lg sm:text-xl" /> : <Menu className="text-lg sm:text-xl" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-foreground hover:text-primary transition-colors font-medium py-2 px-2 rounded-lg hover:bg-muted/50" 
                data-testid="mobile-nav-home"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/products" 
                className="text-foreground hover:text-primary transition-colors font-medium py-2 px-2 rounded-lg hover:bg-muted/50" 
                data-testid="mobile-nav-products"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                href="/about" 
                className="text-foreground hover:text-primary transition-colors font-medium py-2 px-2 rounded-lg hover:bg-muted/50" 
                data-testid="mobile-nav-about"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/admin" 
                className="text-muted-foreground hover:text-primary transition-colors text-sm py-2 px-2 rounded-lg hover:bg-muted/50" 
                data-testid="mobile-nav-admin"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
              
              {/* Mobile Contact Us */}
              <a 
                href="mailto:afarenziya@gmail.com" 
                className="flex items-center bg-gradient-to-r from-accent to-orange-500 hover:from-orange-500 hover:to-accent text-white px-4 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl mt-2"
                data-testid="mobile-contact-button"
                onClick={() => setIsMenuOpen(false)}
              >
                <Mail className="mr-2 w-4 h-4" />
                Contact Us
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
