import { type User, type InsertUser, type Product, type InsertProduct, type Contact, type InsertContact } from "@shared/schema";
import { randomUUID } from "crypto";

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
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<boolean>;
  getFeaturedProducts(): Promise<Product[]>;
  
  // Contact methods
  createContact(contact: InsertContact): Promise<Contact>;
  getAllContacts(): Promise<Contact[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private products: Map<string, Product>;
  private contacts: Map<string, Contact>;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.contacts = new Map();
    
    // Initialize with sample products
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
        affiliateLink: "https://amazon.in/smartphone-pro-max",
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
        affiliateLink: "https://myntra.com/winter-jacket",
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
        affiliateLink: "https://flipkart.com/air-fryer-digital",
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
        affiliateLink: "https://amazon.in/book-collection-set",
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
}

export const storage = new MemStorage();
