import { type User, type InsertUser, type Product, type InsertProduct, type Contact, type InsertContact, type Category, type InsertCategory, type Platform, type InsertPlatform, users, products, contacts, categories, platforms } from "@shared/schema";
import { randomUUID } from "crypto";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { eq, and, or, ilike, desc, asc } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Product methods
  getAllProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  getProductsByPlatform(platform: string): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
  getProductsWithFilters(filters: {
    platform?: string;
    category?: string;
    search?: string;
    featured?: boolean;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: 'price_low' | 'price_high' | 'rating' | 'newest' | 'popular';
  }): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<boolean>;
  getFeaturedProducts(): Promise<Product[]>;
  
  // Contact methods
  createContact(contact: InsertContact): Promise<Contact>;
  getAllContacts(): Promise<Contact[]>;
  
  // Category methods
  getAllCategories(): Promise<Category[]>;
  getActiveCategories(): Promise<Category[]>;
  getCategory(id: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategory(id: string, category: Partial<InsertCategory>): Promise<Category | undefined>;
  deleteCategory(id: string): Promise<boolean>;
  
  // Platform methods
  getAllPlatforms(): Promise<Platform[]>;
  getActivePlatforms(): Promise<Platform[]>;
  getPlatform(id: string): Promise<Platform | undefined>;
  createPlatform(platform: InsertPlatform): Promise<Platform>;
  updatePlatform(id: string, platform: Partial<InsertPlatform>): Promise<Platform | undefined>;
  deletePlatform(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private products: Map<string, Product>;
  private contacts: Map<string, Contact>;
  private categories: Map<string, Category>;
  private platforms: Map<string, Platform>;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.contacts = new Map();
    this.categories = new Map();
    this.platforms = new Map();
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Initialize categories
    const sampleCategories: Category[] = [
      {
        id: "1",
        name: "Electronics",
        description: "Mobile phones, laptops, and electronic gadgets",
        isActive: true,
        createdAt: new Date()
      },
      {
        id: "2", 
        name: "Fashion",
        description: "Clothing, accessories, and fashion items",
        isActive: true,
        createdAt: new Date()
      },
      {
        id: "3",
        name: "Home & Garden",
        description: "Home appliances, furniture, and garden items",
        isActive: true,
        createdAt: new Date()
      },
      {
        id: "4",
        name: "Books",
        description: "Books, eBooks, and educational materials",
        isActive: true,
        createdAt: new Date()
      },
      {
        id: "5",
        name: "Sports",
        description: "Sports equipment and fitness gear",
        isActive: true,
        createdAt: new Date()
      }
    ];

    // Initialize platforms
    const samplePlatforms: Platform[] = [
      {
        id: "1",
        name: "Amazon",
        icon: "🛒",
        color: "#FF9900",
        isActive: true,
        createdAt: new Date()
      },
      {
        id: "2",
        name: "Flipkart", 
        icon: "🛍️",
        color: "#2874F0",
        isActive: true,
        createdAt: new Date()
      },
      {
        id: "3",
        name: "Myntra",
        icon: "👕",
        color: "#FF3F6C",
        isActive: true,
        createdAt: new Date()
      }
    ];

    sampleCategories.forEach(category => {
      this.categories.set(category.id, category);
    });

    samplePlatforms.forEach(platform => {
      this.platforms.set(platform.id, platform);
    });

    this.initializeSampleProducts();
  }

  private initializeSampleProducts() {
    const sampleProducts: Product[] = [
      {
        id: "1",
        title: "Latest Smartphone Pro Max 256GB",
        description: "Latest flagship smartphone with advanced features and high-performance processor",
        originalPrice: "99999",
        discountedPrice: "54999",
        imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        affiliateLink: "https://www.amazon.in/s?k=smartphone+pro+max&tag=smartdealsai-21",
        platform: "Amazon",
        category: "Electronics",
        featured: true,
        autoFetchPrice: true,
        rating: "4.5",
        reviewCount: "4500",
        discountPercentage: "45%",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "2",
        title: "Premium Winter Jacket - Unisex",
        description: "High-quality winter jacket with thermal insulation",
        originalPrice: "4999",
        discountedPrice: "1999",
        imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        affiliateLink: "https://www.myntra.com/jackets?src=search&utm_source=smartdealsai",
        platform: "Myntra",
        category: "Fashion",
        featured: true,
        autoFetchPrice: false,
        rating: "4.0",
        reviewCount: "2100",
        discountPercentage: "60%",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "3",
        title: "Digital Air Fryer 5L Capacity",
        description: "Energy-efficient air fryer for healthy cooking",
        originalPrice: "12999",
        discountedPrice: "8499",
        imageUrl: "https://images.unsplash.com/photo-1586362777494-0de0fb439ea8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        affiliateLink: "https://www.flipkart.com/search?q=air+fryer&affid=smartdealsai",
        platform: "Flipkart",
        category: "Home & Garden",
        featured: true,
        autoFetchPrice: true,
        rating: "5.0",
        reviewCount: "5800",
        discountPercentage: "35%",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "4",
        title: "Bestseller Book Collection (Set of 5)",
        description: "Collection of popular fiction and non-fiction bestsellers",
        originalPrice: "1999",
        discountedPrice: "1499",
        imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        affiliateLink: "https://www.amazon.in/s?k=book+collection&tag=smartdealsai-21",
        platform: "Amazon",
        category: "Books",
        featured: false,
        autoFetchPrice: false,
        rating: "4.5",
        reviewCount: "1200",
        discountPercentage: "25%",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    sampleProducts.forEach(product => {
      this.products.set(product.id, product);
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Product methods
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).sort((a, b) => 
      new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByPlatform(platform: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.platform.toLowerCase() === platform.toLowerCase()
    );
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.category?.toLowerCase() === category.toLowerCase()
    );
  }

  async searchProducts(query: string): Promise<Product[]> {
    const searchTerm = query.toLowerCase();
    return Array.from(this.products.values()).filter(product =>
      product.title.toLowerCase().includes(searchTerm) ||
      product.description?.toLowerCase().includes(searchTerm) ||
      product.category?.toLowerCase().includes(searchTerm) ||
      product.platform.toLowerCase().includes(searchTerm)
    );
  }

  async getProductsWithFilters(filters: {
    platform?: string;
    category?: string;
    search?: string;
    featured?: boolean;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: 'price_low' | 'price_high' | 'rating' | 'newest' | 'popular';
  }): Promise<Product[]> {
    let products = Array.from(this.products.values());

    // Apply filters
    if (filters.platform) {
      products = products.filter(p => p.platform.toLowerCase() === filters.platform!.toLowerCase());
    }

    if (filters.category) {
      products = products.filter(p => p.category?.toLowerCase() === filters.category!.toLowerCase());
    }

    if (filters.featured !== undefined) {
      products = products.filter(p => p.featured === filters.featured);
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      products = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.description?.toLowerCase().includes(searchTerm) ||
        product.category?.toLowerCase().includes(searchTerm) ||
        product.platform.toLowerCase().includes(searchTerm)
      );
    }

    // Price filtering
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      products = products.filter(product => {
        const price = parseFloat(product.discountedPrice || product.originalPrice || "0");
        if (filters.minPrice !== undefined && price < filters.minPrice) return false;
        if (filters.maxPrice !== undefined && price > filters.maxPrice) return false;
        return true;
      });
    }

    // Sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price_low':
          products.sort((a, b) => {
            const priceA = parseFloat(a.discountedPrice || a.originalPrice || "0");
            const priceB = parseFloat(b.discountedPrice || b.originalPrice || "0");
            return priceA - priceB;
          });
          break;
        case 'price_high':
          products.sort((a, b) => {
            const priceA = parseFloat(a.discountedPrice || a.originalPrice || "0");
            const priceB = parseFloat(b.discountedPrice || b.originalPrice || "0");
            return priceB - priceA;
          });
          break;
        case 'rating':
          products.sort((a, b) => {
            const ratingA = parseFloat(a.rating || "0");
            const ratingB = parseFloat(b.rating || "0");
            return ratingB - ratingA;
          });
          break;
        case 'popular':
          products.sort((a, b) => {
            const reviewsA = parseInt(a.reviewCount || "0");
            const reviewsB = parseInt(b.reviewCount || "0");
            return reviewsB - reviewsA;
          });
          break;
        case 'newest':
        default:
          products.sort((a, b) => 
            new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
          );
          break;
      }
    }

    return products;
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const now = new Date();
    const product: Product = { 
      ...insertProduct,
      description: insertProduct.description || null,
      originalPrice: insertProduct.originalPrice || null,
      discountedPrice: insertProduct.discountedPrice || null,
      imageUrl: insertProduct.imageUrl || null,
      category: insertProduct.category || null,
      featured: insertProduct.featured || false,
      autoFetchPrice: insertProduct.autoFetchPrice || false,
      rating: insertProduct.rating || null,
      reviewCount: insertProduct.reviewCount || null,
      discountPercentage: insertProduct.discountPercentage || null,
      id,
      createdAt: now,
      updatedAt: now
    };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(id: string, updateData: Partial<InsertProduct>): Promise<Product | undefined> {
    const existing = this.products.get(id);
    if (!existing) return undefined;
    
    const updated: Product = {
      ...existing,
      ...updateData,
      updatedAt: new Date()
    };
    this.products.set(id, updated);
    return updated;
  }

  async deleteProduct(id: string): Promise<boolean> {
    return this.products.delete(id);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.featured);
  }

  // Contact methods
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = {
      ...insertContact,
      id,
      createdAt: new Date()
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getAllContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort((a, b) => 
      new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );
  }

  // Category methods
  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categories.values()).sort((a, b) => a.name.localeCompare(b.name));
  }

  async getActiveCategories(): Promise<Category[]> {
    return Array.from(this.categories.values())
      .filter(category => category.isActive)
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  async getCategory(id: string): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = randomUUID();
    const category: Category = {
      ...insertCategory,
      description: insertCategory.description || null,
      isActive: insertCategory.isActive ?? true,
      id,
      createdAt: new Date()
    };
    this.categories.set(id, category);
    return category;
  }

  async updateCategory(id: string, updateData: Partial<InsertCategory>): Promise<Category | undefined> {
    const existing = this.categories.get(id);
    if (!existing) return undefined;
    
    const updated: Category = {
      ...existing,
      ...updateData
    };
    this.categories.set(id, updated);
    return updated;
  }

  async deleteCategory(id: string): Promise<boolean> {
    return this.categories.delete(id);
  }

  // Platform methods
  async getAllPlatforms(): Promise<Platform[]> {
    return Array.from(this.platforms.values()).sort((a, b) => a.name.localeCompare(b.name));
  }

  async getActivePlatforms(): Promise<Platform[]> {
    return Array.from(this.platforms.values())
      .filter(platform => platform.isActive)
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  async getPlatform(id: string): Promise<Platform | undefined> {
    return this.platforms.get(id);
  }

  async createPlatform(insertPlatform: InsertPlatform): Promise<Platform> {
    const id = randomUUID();
    const platform: Platform = {
      ...insertPlatform,
      icon: insertPlatform.icon || null,
      color: insertPlatform.color || null,
      isActive: insertPlatform.isActive ?? true,
      id,
      createdAt: new Date()
    };
    this.platforms.set(id, platform);
    return platform;
  }

  async updatePlatform(id: string, updateData: Partial<InsertPlatform>): Promise<Platform | undefined> {
    const existing = this.platforms.get(id);
    if (!existing) return undefined;
    
    const updated: Platform = {
      ...existing,
      ...updateData
    };
    this.platforms.set(id, updated);
    return updated;
  }

  async deletePlatform(id: string): Promise<boolean> {
    return this.platforms.delete(id);
  }
}

// Database Storage Implementation
export class DatabaseStorage implements IStorage {
  private db: any;

  constructor() {
    const pool = new Pool({ 
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL?.includes('localhost') ? false : { rejectUnauthorized: false }
    });
    this.db = drizzle(pool);
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await this.db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // Product methods
  async getAllProducts(): Promise<Product[]> {
    return await this.db.select().from(products).orderBy(desc(products.createdAt));
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const result = await this.db.select().from(products).where(eq(products.id, id)).limit(1);
    return result[0];
  }

  async getProductsByPlatform(platform: string): Promise<Product[]> {
    return await this.db.select().from(products).where(ilike(products.platform, platform));
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return await this.db.select().from(products).where(ilike(products.category, category));
  }

  async searchProducts(query: string): Promise<Product[]> {
    const searchPattern = `%${query}%`;
    return await this.db.select().from(products).where(
      or(
        ilike(products.title, searchPattern),
        ilike(products.description, searchPattern),
        ilike(products.category, searchPattern),
        ilike(products.platform, searchPattern)
      )
    );
  }

  async getProductsWithFilters(filters: {
    platform?: string;
    category?: string;
    search?: string;
    featured?: boolean;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: 'price_low' | 'price_high' | 'rating' | 'newest' | 'popular';
  }): Promise<Product[]> {
    let query = this.db.select().from(products);
    const conditions = [];

    if (filters.platform) {
      conditions.push(ilike(products.platform, filters.platform));
    }

    if (filters.category) {
      conditions.push(ilike(products.category, filters.category));
    }

    if (filters.featured !== undefined) {
      conditions.push(eq(products.featured, filters.featured));
    }

    if (filters.search) {
      const searchPattern = `%${filters.search}%`;
      conditions.push(
        or(
          ilike(products.title, searchPattern),
          ilike(products.description, searchPattern),
          ilike(products.category, searchPattern),
          ilike(products.platform, searchPattern)
        )
      );
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'price_low':
        query = query.orderBy(asc(products.discountedPrice));
        break;
      case 'price_high':
        query = query.orderBy(desc(products.discountedPrice));
        break;
      case 'rating':
        query = query.orderBy(desc(products.rating));
        break;
      case 'newest':
      default:
        query = query.orderBy(desc(products.createdAt));
        break;
    }

    const results = await query;

    // Apply price filtering (post-query for decimal comparison)
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      return results.filter(product => {
        const price = parseFloat(product.discountedPrice || product.originalPrice || "0");
        if (filters.minPrice !== undefined && price < filters.minPrice) return false;
        if (filters.maxPrice !== undefined && price > filters.maxPrice) return false;
        return true;
      });
    }

    return results;
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const result = await this.db.insert(products).values(insertProduct).returning();
    return result[0];
  }

  async updateProduct(id: string, updateData: Partial<InsertProduct>): Promise<Product | undefined> {
    const result = await this.db.update(products)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(products.id, id))
      .returning();
    return result[0];
  }

  async deleteProduct(id: string): Promise<boolean> {
    const result = await this.db.delete(products).where(eq(products.id, id));
    return result.rowCount > 0;
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return await this.db.select().from(products).where(eq(products.featured, true));
  }

  // Contact methods
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const result = await this.db.insert(contacts).values(insertContact).returning();
    return result[0];
  }

  async getAllContacts(): Promise<Contact[]> {
    return await this.db.select().from(contacts).orderBy(desc(contacts.createdAt));
  }

  // Category methods
  async getAllCategories(): Promise<Category[]> {
    return await this.db.select().from(categories).orderBy(asc(categories.name));
  }

  async getActiveCategories(): Promise<Category[]> {
    return await this.db.select().from(categories)
      .where(eq(categories.isActive, true))
      .orderBy(asc(categories.name));
  }

  async getCategory(id: string): Promise<Category | undefined> {
    const result = await this.db.select().from(categories).where(eq(categories.id, id)).limit(1);
    return result[0];
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const result = await this.db.insert(categories).values(insertCategory).returning();
    return result[0];
  }

  async updateCategory(id: string, updateData: Partial<InsertCategory>): Promise<Category | undefined> {
    const result = await this.db.update(categories)
      .set(updateData)
      .where(eq(categories.id, id))
      .returning();
    return result[0];
  }

  async deleteCategory(id: string): Promise<boolean> {
    const result = await this.db.delete(categories).where(eq(categories.id, id));
    return result.rowCount > 0;
  }

  // Platform methods
  async getAllPlatforms(): Promise<Platform[]> {
    return await this.db.select().from(platforms).orderBy(asc(platforms.name));
  }

  async getActivePlatforms(): Promise<Platform[]> {
    return await this.db.select().from(platforms)
      .where(eq(platforms.isActive, true))
      .orderBy(asc(platforms.name));
  }

  async getPlatform(id: string): Promise<Platform | undefined> {
    const result = await this.db.select().from(platforms).where(eq(platforms.id, id)).limit(1);
    return result[0];
  }

  async createPlatform(insertPlatform: InsertPlatform): Promise<Platform> {
    const result = await this.db.insert(platforms).values(insertPlatform).returning();
    return result[0];
  }

  async updatePlatform(id: string, updateData: Partial<InsertPlatform>): Promise<Platform | undefined> {
    const result = await this.db.update(platforms)
      .set(updateData)
      .where(eq(platforms.id, id))
      .returning();
    return result[0];
  }

  async deletePlatform(id: string): Promise<boolean> {
    const result = await this.db.delete(platforms).where(eq(platforms.id, id));
    return result.rowCount > 0;
  }

  // Initialize sample data if tables are empty
  async initializeSampleData(): Promise<void> {
    const existingProducts = await this.db.select().from(products).limit(1);
    if (existingProducts.length > 0) return; // Data already exists

    // Initialize categories
    const sampleCategories = [
      {
        name: "Electronics",
        description: "Mobile phones, laptops, and electronic gadgets",
        isActive: true
      },
      {
        name: "Fashion",
        description: "Clothing, accessories, and fashion items", 
        isActive: true
      },
      {
        name: "Home & Garden",
        description: "Home appliances, furniture, and garden items",
        isActive: true
      },
      {
        name: "Books",
        description: "Books, eBooks, and educational materials",
        isActive: true
      },
      {
        name: "Sports",
        description: "Sports equipment and fitness gear",
        isActive: true
      }
    ];

    // Initialize platforms
    const samplePlatforms = [
      {
        name: "Amazon",
        icon: "🛒",
        color: "#FF9900",
        isActive: true
      },
      {
        name: "Flipkart",
        icon: "🛍️",
        color: "#2874F0",
        isActive: true
      },
      {
        name: "Myntra",
        icon: "👕",
        color: "#FF3F6C",
        isActive: true
      }
    ];

    await this.db.insert(categories).values(sampleCategories);
    await this.db.insert(platforms).values(samplePlatforms);

    // Initialize sample products
    const sampleProducts = [
      {
        title: "Latest Smartphone Pro Max 256GB",
        description: "Latest flagship smartphone with advanced features and high-performance processor",
        originalPrice: "99999",
        discountedPrice: "54999",
        imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        affiliateLink: "https://www.amazon.in/s?k=smartphone+pro+max&tag=smartdealsai-21",
        platform: "Amazon",
        category: "Electronics",
        featured: true,
        autoFetchPrice: true,
        rating: "4.5",
        reviewCount: "4500",
        discountPercentage: "45%"
      },
      {
        title: "Premium Winter Jacket - Unisex",
        description: "High-quality winter jacket with thermal insulation",
        originalPrice: "4999",
        discountedPrice: "1999",
        imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        affiliateLink: "https://www.myntra.com/jackets?src=search&utm_source=smartdealsai",
        platform: "Myntra",
        category: "Fashion",
        featured: true,
        autoFetchPrice: false,
        rating: "4.0",
        reviewCount: "2100",
        discountPercentage: "60%"
      },
      {
        title: "Digital Air Fryer 5L Capacity",
        description: "Energy-efficient air fryer for healthy cooking",
        originalPrice: "12999",
        discountedPrice: "8499",
        imageUrl: "https://images.unsplash.com/photo-1586362777494-0de0fb439ea8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        affiliateLink: "https://www.flipkart.com/search?q=air+fryer&affid=smartdealsai",
        platform: "Flipkart",
        category: "Home & Garden",
        featured: true,
        autoFetchPrice: true,
        rating: "5.0",
        reviewCount: "5800",
        discountPercentage: "35%"
      },
      {
        title: "Bestseller Book Collection (Set of 5)",
        description: "Collection of popular fiction and non-fiction bestsellers",
        originalPrice: "1999",
        discountedPrice: "1499",
        imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        affiliateLink: "https://www.amazon.in/s?k=book+collection&tag=smartdealsai-21",
        platform: "Amazon",
        category: "Books",
        featured: false,
        autoFetchPrice: false,
        rating: "4.5",
        reviewCount: "1200",
        discountPercentage: "25%"
      }
    ];

    await this.db.insert(products).values(sampleProducts);
  }
}

// Use database storage in production, memory storage in development if needed
const storage = new DatabaseStorage();

// Initialize sample data on startup
storage.initializeSampleData().catch(console.error);

export { storage };
