import { useState } from "react";
import { Link } from "wouter";
import { Menu, X, Bot, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3" data-testid="logo-link">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center ai-glow">
              <Bot className="text-white text-lg" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Smart Deals AI
              </h1>
              <p className="text-xs text-muted-foreground">Powered by iajaykumar.com</p>
            </div>
          </Link>
          
          {/* Desktop Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors font-medium" data-testid="nav-home">
              Home
            </Link>
            <Link href="/products" className="text-foreground hover:text-primary transition-colors font-medium" data-testid="nav-products">
              Products
            </Link>
            <Link href="#categories" className="text-foreground hover:text-primary transition-colors font-medium" data-testid="nav-categories">
              Categories
            </Link>
            <Link href="#about" className="text-foreground hover:text-primary transition-colors font-medium" data-testid="nav-about">
              About
            </Link>
            <Link href="/admin" className="text-muted-foreground hover:text-primary transition-colors text-sm" data-testid="nav-admin">
              Admin
            </Link>
          </nav>
          
          {/* Contact Button */}
          <div className="flex items-center space-x-4">
            <a 
              href="mailto:afarenziya@gmail.com" 
              className="bg-gradient-to-r from-accent to-orange-500 hover:from-orange-500 hover:to-accent text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
              data-testid="contact-button"
            >
              <Mail className="inline mr-2 w-4 h-4" />
              Contact Us
            </a>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="mobile-menu-button"
            >
              {isMenuOpen ? <X className="text-xl" /> : <Menu className="text-xl" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-foreground hover:text-primary transition-colors font-medium" data-testid="mobile-nav-home">
                Home
              </Link>
              <Link href="/products" className="text-foreground hover:text-primary transition-colors font-medium" data-testid="mobile-nav-products">
                Products
              </Link>
              <Link href="#categories" className="text-foreground hover:text-primary transition-colors font-medium" data-testid="mobile-nav-categories">
                Categories
              </Link>
              <Link href="#about" className="text-foreground hover:text-primary transition-colors font-medium" data-testid="mobile-nav-about">
                About
              </Link>
              <Link href="/admin" className="text-muted-foreground hover:text-primary transition-colors text-sm" data-testid="mobile-nav-admin">
                Admin
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
