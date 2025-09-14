import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import AdminLogin from "@/components/admin-login";
import AddProductForm from "@/components/add-product-form";
import AnalyticsDashboard from "@/components/analytics-dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Plus, Settings } from "lucide-react";

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-bg py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="admin-title">
            Admin Panel
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="admin-description">
            Manage products and affiliate links for Smart Deals AI
          </p>
        </div>
      </section>

      {/* Admin Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {!isLoggedIn ? (
              <AdminLogin onLoginSuccess={handleLoginSuccess} />
            ) : (
              <div data-testid="admin-dashboard" className="w-full">
                <div className="mb-6 sm:mb-8 text-center">
                  <h2 className="text-xl sm:text-2xl font-semibold text-green-500 mb-2">✓ Admin Access Granted</h2>
                  <p className="text-sm sm:text-base text-muted-foreground">Welcome to the Smart Deals AI admin dashboard</p>
                </div>
                
                <Tabs defaultValue="analytics" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6 sm:mb-8 max-w-md mx-auto">
                    <TabsTrigger value="analytics" className="flex items-center gap-2" data-testid="tab-analytics">
                      <BarChart3 className="w-4 h-4" />
                      <span className="hidden sm:inline">Analytics</span>
                      <span className="sm:hidden">Stats</span>
                    </TabsTrigger>
                    <TabsTrigger value="products" className="flex items-center gap-2" data-testid="tab-products">
                      <Plus className="w-4 h-4" />
                      <span className="hidden sm:inline">Add Product</span>
                      <span className="sm:hidden">Add</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="analytics" className="mt-0" data-testid="analytics-tab-content">
                    <AnalyticsDashboard />
                  </TabsContent>
                  
                  <TabsContent value="products" className="mt-0" data-testid="products-tab-content">
                    <AddProductForm />
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
