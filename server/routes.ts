import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProductSchema, insertContactSchema, insertCategorySchema, insertPlatformSchema, type Product } from "@shared/schema";
import { sendEmail } from "./services/email";
import bcrypt from "bcrypt";

// Admin credentials for Smart Deals AI
const ADMIN_USERNAME = "afarenziya@gmail.com";
const ADMIN_PASSWORD_HASH = "$2b$10$LXoeQkAOr//rbDsRGHj2qO7twRNN3HLVjRS.oQYZFPY38gdmC4W3."; // Hash for secure password

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Products routes
  app.get("/api/products", async (req, res) => {
    try {
      const { platform, category, search, featured, minPrice, maxPrice, sortBy } = req.query;
      
      // If no filters provided, get all products
      if (!platform && !category && !search && !featured && !minPrice && !maxPrice && !sortBy) {
        const products = await storage.getAllProducts();
        return res.json(products);
      }
      
      // Use the enhanced filtering system
      const filters = {
        platform: platform as string,
        category: category as string,
        search: search as string,
        featured: featured === 'true' ? true : featured === 'false' ? false : undefined,
        minPrice: minPrice ? parseFloat(minPrice as string) : undefined,
        maxPrice: maxPrice ? parseFloat(maxPrice as string) : undefined,
        sortBy: sortBy as 'price_low' | 'price_high' | 'rating' | 'newest' | 'popular'
      };
      
      const products = await storage.getProductsWithFilters(filters);
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  app.post("/api/products", async (req, res) => {
    try {
      const validatedProduct = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(validatedProduct);
      res.status(201).json(product);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(400).json({ 
        message: "Invalid product data", 
        details: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });

  app.put("/api/products/:id", async (req, res) => {
    try {
      const validatedProduct = insertProductSchema.partial().parse(req.body);
      const product = await storage.updateProduct(req.params.id, validatedProduct);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(400).json({ 
        message: "Invalid product data", 
        details: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });

  app.delete("/api/products/:id", async (req, res) => {
    try {
      const success = await storage.deleteProduct(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ message: "Failed to delete product" });
    }
  });

  // Analytics endpoints
  app.get("/api/analytics/overview", async (req, res) => {
    try {
      const products = await storage.getAllProducts();
      
      const totalProducts = products.length;
      const featuredProducts = products.filter((p: Product) => p.featured).length;
      const avgDiscount = products
        .filter((p: Product) => p.originalPrice && p.discountedPrice)
        .reduce((sum: number, p: Product) => {
          const originalPrice = parseFloat(p.originalPrice!);
          const discountedPrice = parseFloat(p.discountedPrice!);
          return sum + ((originalPrice - discountedPrice) / originalPrice) * 100;
        }, 0) / products.filter((p: Product) => p.originalPrice && p.discountedPrice).length || 0;
      
      const platformStats = products.reduce((acc: Record<string, number>, product: Product) => {
        acc[product.platform] = (acc[product.platform] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const categoryStats = products.reduce((acc: Record<string, number>, product: Product) => {
        if (product.category) {
          acc[product.category] = (acc[product.category] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);
      
      res.json({
        totalProducts,
        featuredProducts,
        averageDiscount: Math.round(avgDiscount * 100) / 100,
        platformDistribution: Object.entries(platformStats).map(([name, value]) => ({ name, value })),
        categoryDistribution: Object.entries(categoryStats).map(([name, value]) => ({ name, value })),
        recentlyAdded: products.slice(-5).reverse()
      });
    } catch (error) {
      console.error("Error fetching analytics:", error);
      res.status(500).json({ message: "Failed to fetch analytics data" });
    }
  });

  // Admin authentication
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      
      if (username !== ADMIN_USERNAME) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // For production, use the actual hash comparison
      // For development, allow both the hashed password and a simple "admin123" password
      const isValidPassword = await bcrypt.compare(password, ADMIN_PASSWORD_HASH) || 
                             (process.env.NODE_ENV === 'development' && password === 'admin123');
      
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      res.json({ 
        message: "Login successful", 
        authenticated: true,
        user: { username: ADMIN_USERNAME }
      });
    } catch (error) {
      console.error("Authentication error:", error);
      res.status(500).json({ message: "Authentication failed" });
    }
  });

  // Admin logout (for session management if needed)
  app.post("/api/admin/logout", async (req, res) => {
    try {
      res.json({ message: "Logout successful", authenticated: false });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({ message: "Logout failed" });
    }
  });

  // Contact form
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedContact = insertContactSchema.parse(req.body);
      
      // Save contact to storage
      const contact = await storage.createContact(validatedContact);
      
      // Send email notification if SendGrid is configured
      const sendGridApiKey = process.env.SENDGRID_API_KEY;
      let emailSent = false;
      
      if (sendGridApiKey) {
        try {
          emailSent = await sendEmail({
            to: "afarenziya@gmail.com",
            from: "noreply@iajaykumar.com", // Make sure this is verified in SendGrid
            subject: `New Contact Form Submission: ${validatedContact.subject}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #8b5cf6; border-bottom: 2px solid #8b5cf6; padding-bottom: 10px;">
                  New Contact Form Submission
                </h2>
                
                <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <p><strong>Name:</strong> ${validatedContact.name}</p>
                  <p><strong>Email:</strong> ${validatedContact.email}</p>
                  <p><strong>Subject:</strong> ${validatedContact.subject}</p>
                </div>
                
                <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px;">
                  <h3 style="margin-top: 0; color: #475569;">Message:</h3>
                  <p style="white-space: pre-wrap; line-height: 1.6;">${validatedContact.message}</p>
                </div>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 14px;">
                  <p>This message was sent from Smart Deals AI contact form at ${new Date().toLocaleString()}.</p>
                  <p>Reply directly to this email to respond to ${validatedContact.name}.</p>
                </div>
              </div>
            `,
            text: `
New Contact Form Submission

Name: ${validatedContact.name}
Email: ${validatedContact.email}
Subject: ${validatedContact.subject}

Message:
${validatedContact.message}

---
Sent from Smart Deals AI contact form at ${new Date().toLocaleString()}
            `
          });
        } catch (emailError) {
          console.error("Failed to send email notification:", emailError);
        }
      }
      
      res.status(201).json({ 
        message: "Contact form submitted successfully",
        emailSent,
        id: contact.id
      });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(400).json({ 
        message: "Invalid contact data", 
        details: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development"
    });
  });

  // Get contact messages (admin only - would need auth middleware in production)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });

  // Categories routes
  app.get("/api/categories", async (req, res) => {
    try {
      const activeOnly = req.query.active === 'true';
      const categories = activeOnly 
        ? await storage.getActiveCategories()
        : await storage.getAllCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  app.get("/api/categories/:id", async (req, res) => {
    try {
      const category = await storage.getCategory(req.params.id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      console.error("Error fetching category:", error);
      res.status(500).json({ message: "Failed to fetch category" });
    }
  });

  app.post("/api/categories", async (req, res) => {
    try {
      const validatedCategory = insertCategorySchema.parse(req.body);
      const category = await storage.createCategory(validatedCategory);
      res.status(201).json(category);
    } catch (error) {
      console.error("Error creating category:", error);
      res.status(400).json({ 
        message: "Invalid category data", 
        details: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });

  app.put("/api/categories/:id", async (req, res) => {
    try {
      const validatedCategory = insertCategorySchema.partial().parse(req.body);
      const category = await storage.updateCategory(req.params.id, validatedCategory);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      console.error("Error updating category:", error);
      res.status(400).json({ 
        message: "Invalid category data", 
        details: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });

  app.delete("/api/categories/:id", async (req, res) => {
    try {
      const success = await storage.deleteCategory(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json({ message: "Category deleted successfully" });
    } catch (error) {
      console.error("Error deleting category:", error);
      res.status(500).json({ message: "Failed to delete category" });
    }
  });

  // Platforms routes
  app.get("/api/platforms", async (req, res) => {
    try {
      const activeOnly = req.query.active === 'true';
      const platforms = activeOnly 
        ? await storage.getActivePlatforms()
        : await storage.getAllPlatforms();
      res.json(platforms);
    } catch (error) {
      console.error("Error fetching platforms:", error);
      res.status(500).json({ message: "Failed to fetch platforms" });
    }
  });

  app.get("/api/platforms/:id", async (req, res) => {
    try {
      const platform = await storage.getPlatform(req.params.id);
      if (!platform) {
        return res.status(404).json({ message: "Platform not found" });
      }
      res.json(platform);
    } catch (error) {
      console.error("Error fetching platform:", error);
      res.status(500).json({ message: "Failed to fetch platform" });
    }
  });

  app.post("/api/platforms", async (req, res) => {
    try {
      const validatedPlatform = insertPlatformSchema.parse(req.body);
      const platform = await storage.createPlatform(validatedPlatform);
      res.status(201).json(platform);
    } catch (error) {
      console.error("Error creating platform:", error);
      res.status(400).json({ 
        message: "Invalid platform data", 
        details: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });

  app.put("/api/platforms/:id", async (req, res) => {
    try {
      const validatedPlatform = insertPlatformSchema.partial().parse(req.body);
      const platform = await storage.updatePlatform(req.params.id, validatedPlatform);
      if (!platform) {
        return res.status(404).json({ message: "Platform not found" });
      }
      res.json(platform);
    } catch (error) {
      console.error("Error updating platform:", error);
      res.status(400).json({ 
        message: "Invalid platform data", 
        details: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });

  app.delete("/api/platforms/:id", async (req, res) => {
    try {
      const success = await storage.deletePlatform(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Platform not found" });
      }
      res.json({ message: "Platform deleted successfully" });
    } catch (error) {
      console.error("Error deleting platform:", error);
      res.status(500).json({ message: "Failed to delete platform" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
