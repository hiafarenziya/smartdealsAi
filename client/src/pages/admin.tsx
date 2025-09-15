import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import AdminLogin from "@/components/admin-login";
import AddProductForm from "@/components/add-product-form";
import AnalyticsDashboard from "@/components/analytics-dashboard";
import ProductManagement from "@/components/product-management";
import { ManageCategoriesPlatforms } from "@/components/manage-categories-platforms";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BarChart3, Plus, Settings, Tags, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth";

export default function Admin() {
  const { isAuthenticated, logout } = useAuth();
  const [localLoginSuccess, setLocalLoginSuccess] = useState(false);

  const handleLoginSuccess = () => {
    setLocalLoginSuccess(true);
  };

  const handleLogout = () => {
    logout();
    setLocalLoginSuccess(false);
  };

  // Show admin dashboard if user is authenticated OR if they just logged in locally
  const showAdminDashboard = isAuthenticated || localLoginSuccess;
  
  console.log('🏛️ Admin page render - isAuthenticated:', isAuthenticated, 'localLoginSuccess:', localLoginSuccess, 'showAdminDashboard:', showAdminDashboard);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-bg py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4" data-testid="admin-title">
            Admin Panel
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="admin-description">
            Manage products and affiliate links for Smart Deals AI
          </p>
        </div>
      </section>

      {/* Admin Content */}
      <section className="py-8 sm:py-12 lg:py-20">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="max-w-7xl mx-auto">
            {!showAdminDashboard ? (
              <AdminLogin onLoginSuccess={handleLoginSuccess} />
            ) : (
              <div data-testid="admin-dashboard" className="w-full">
                <div className="mb-4 sm:mb-6 lg:mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-center flex-1">
                      <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-green-500 mb-2">✓ Admin Access Granted</h2>
                      <p className="text-xs sm:text-sm lg:text-base text-muted-foreground">Welcome to the Smart Deals AI admin dashboard</p>
                    </div>
                    <Button
                      onClick={handleLogout}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 text-red-600 border-red-600 hover:bg-red-600 hover:text-white transition-colors"
                      data-testid="logout-button"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </Button>
                  </div>
                </div>
                
                <Tabs defaultValue="analytics" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 mb-4 sm:mb-6 lg:mb-8 max-w-4xl mx-auto h-auto p-1">
                    <TabsTrigger value="analytics" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 sm:py-3 text-xs sm:text-sm" data-testid="tab-analytics">
                      <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="sm:hidden">Stats</span>
                      <span className="hidden sm:inline">Analytics</span>
                    </TabsTrigger>
                    <TabsTrigger value="add-products" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 sm:py-3 text-xs sm:text-sm" data-testid="tab-add-products">
                      <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="sm:hidden">Add</span>
                      <span className="hidden sm:inline">Add Product</span>
                    </TabsTrigger>
                    <TabsTrigger value="manage-products" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 sm:py-3 text-xs sm:text-sm" data-testid="tab-manage-products">
                      <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="sm:hidden">Manage</span>
                      <span className="hidden sm:inline">Manage Products</span>
                    </TabsTrigger>
                    <TabsTrigger value="categories-platforms" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 sm:py-3 text-xs sm:text-sm" data-testid="tab-categories-platforms">
                      <Tags className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="sm:hidden text-center leading-tight">Cat/Plat</span>
                      <span className="hidden sm:inline">Categories & Platforms</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="analytics" className="mt-0" data-testid="analytics-tab-content">
                    <AnalyticsDashboard />
                  </TabsContent>
                  
                  <TabsContent value="add-products" className="mt-0" data-testid="add-products-tab-content">
                    <AddProductForm />
                  </TabsContent>
                  
                  <TabsContent value="manage-products" className="mt-0" data-testid="manage-products-tab-content">
                    <ProductManagement />
                  </TabsContent>
                  
                  <TabsContent value="categories-platforms" className="mt-0" data-testid="categories-platforms-tab-content">
                    <ManageCategoriesPlatforms />
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
