import { Link } from "wouter";
import { Bot, Twitter, Facebook, Instagram, Mail, Phone, MapPin, Globe, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center ai-glow">
                <Bot className="text-white text-lg" />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Smart Deals AI
                </h3>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">
              AI-powered affiliate marketing platform helping you find the best deals across India's top e-commerce sites.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="social-twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="social-facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="social-instagram">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors" data-testid="footer-home">Home</Link></li>
              <li><Link href="/products" className="text-muted-foreground hover:text-primary transition-colors" data-testid="footer-products">Products</Link></li>
              <li><Link href="#categories" className="text-muted-foreground hover:text-primary transition-colors" data-testid="footer-categories">Categories</Link></li>
              <li><Link href="#about" className="text-muted-foreground hover:text-primary transition-colors" data-testid="footer-about">About Us</Link></li>
            </ul>
          </div>
          
          {/* Legal Pages */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors" data-testid="footer-privacy">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="text-muted-foreground hover:text-primary transition-colors" data-testid="footer-terms">Terms of Service</Link></li>
              <li><Link href="/affiliate-disclosure" className="text-muted-foreground hover:text-primary transition-colors" data-testid="footer-affiliate">Affiliate Disclosure</Link></li>
              <li><Link href="/refund-policy" className="text-muted-foreground hover:text-primary transition-colors" data-testid="footer-refund">Refund Policy</Link></li>
              <li><Link href="/cookie-policy" className="text-muted-foreground hover:text-primary transition-colors" data-testid="footer-cookies">Cookie Policy</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="text-primary mr-3 w-4 h-4" />
                <a href="mailto:afarenziya@gmail.com" className="text-muted-foreground hover:text-primary transition-colors" data-testid="footer-email">
                  afarenziya@gmail.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="text-primary mr-3 w-4 h-4" />
                <a href="tel:+919315869313" className="text-muted-foreground hover:text-primary transition-colors" data-testid="footer-phone">
                  +91 9315869313
                </a>
              </div>
              <div className="flex items-center">
                <MapPin className="text-primary mr-3 w-4 h-4" />
                <span className="text-muted-foreground">Noida, India</span>
              </div>
              <div className="flex items-center">
                <Globe className="text-primary mr-3 w-4 h-4" />
                <span className="text-muted-foreground">iajaykumar.com</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
            <div className="text-muted-foreground text-xs sm:text-sm mb-2 sm:mb-0">
              © 2024 Smart Deals AI by Ajay Kumar. All rights reserved.
            </div>
            <div className="text-muted-foreground text-xs sm:text-sm flex items-center justify-center">
              Made with <Heart className="text-red-500 mx-1 w-3 h-3 sm:w-4 sm:h-4" /> for smart shoppers in India
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
