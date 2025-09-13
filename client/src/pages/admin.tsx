import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import AdminLogin from "@/components/admin-login";
import AddProductForm from "@/components/add-product-form";

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
              <div data-testid="admin-dashboard">
                <div className="mb-8 text-center">
                  <h2 className="text-2xl font-semibold text-green-500 mb-2">✓ Admin Access Granted</h2>
                  <p className="text-muted-foreground">Welcome to the product management dashboard</p>
                </div>
                <AddProductForm />
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
