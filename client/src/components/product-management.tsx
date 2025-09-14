import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Edit2, Trash2, Package, Star, ExternalLink, Search } from "lucide-react";
import type { Product, InsertProduct } from "@shared/schema";

export default function ProductManagement() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    if (!searchQuery.trim()) return products;
    
    return products.filter(product => 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [products, searchQuery]);

  const deleteProductMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Product Deleted",
        description: "The product has been successfully deleted.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      queryClient.invalidateQueries({ queryKey: ["/api/analytics/overview"] });
    },
    onError: () => {
      toast({
        title: "Failed to Delete",
        description: "Unable to delete the product. Please try again.",
        variant: "destructive",
      });
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertProduct> }) => {
      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to update product");
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Product Updated",
        description: "The product has been successfully updated.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      queryClient.invalidateQueries({ queryKey: ["/api/analytics/overview"] });
      setEditingProduct(null);
    },
    onError: () => {
      toast({
        title: "Failed to Update",
        description: "Unable to update the product. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
  };

  const handleSaveEdit = () => {
    if (!editingProduct) return;
    
    const { id, createdAt, updatedAt, ...productData } = editingProduct;
    updateProductMutation.mutate({ id, data: productData });
  };

  const handleDeleteProduct = () => {
    if (productToDelete && deleteConfirmation === "DELETE") {
      deleteProductMutation.mutate(productToDelete.id);
      setProductToDelete(null);
      setDeleteConfirmation("");
    }
  };

  const openDeleteDialog = (product: Product) => {
    setProductToDelete(product);
    setDeleteConfirmation("");
  };

  const closeDeleteDialog = () => {
    setProductToDelete(null);
    setDeleteConfirmation("");
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Manage Products</h3>
        </div>
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="glass-effect">
              <CardContent className="p-6">
                <div className="h-20 bg-muted animate-pulse rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold flex items-center">
            <Package className="text-primary mr-2 w-4 h-4 sm:w-5 sm:h-5" />
            Manage Products
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Edit or remove existing products from the catalog
          </p>
        </div>
        <Badge variant="secondary" className="text-xs sm:text-sm">
          {filteredProducts.length} of {products?.length || 0} Products
        </Badge>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search products by name, platform, or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 text-sm"
          data-testid="input-search-products"
        />
      </div>

      {!products || products.length === 0 ? (
        <Card className="glass-effect border-border">
          <CardContent className="p-6 text-center">
            <Package className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
            <h4 className="text-base font-semibold mb-2">No Products Found</h4>
            <p className="text-sm text-muted-foreground">Add some products to get started with product management.</p>
          </CardContent>
        </Card>
      ) : filteredProducts.length === 0 ? (
        <Card className="glass-effect border-border">
          <CardContent className="p-6 text-center">
            <Search className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
            <h4 className="text-base font-semibold mb-2">No Products Match Your Search</h4>
            <p className="text-sm text-muted-foreground">Try adjusting your search terms or clear the search to see all products.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-2 sm:gap-3">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="glass-effect border-border">
              <CardContent className="p-2 sm:p-3">
                {/* Mobile Layout - Clean Minimal Style */}
                <div className="block sm:hidden">
                  <div className="flex items-center gap-3 py-2">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      {product.imageUrl ? (
                        <img 
                          src={product.imageUrl} 
                          alt={product.title}
                          className="w-14 h-14 rounded-lg object-cover bg-muted"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center">
                          <Package className="w-6 h-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      {/* Brand/Platform */}
                      <div className="text-xs font-medium text-muted-foreground uppercase mb-0.5">
                        {product.platform}
                      </div>
                      
                      {/* Product Title */}
                      <h4 className="font-medium text-sm text-foreground line-clamp-2 mb-1">
                        {product.title}
                      </h4>
                      
                      {/* Discount and Pricing */}
                      <div className="flex items-center gap-2">
                        {/* Discount Percentage */}
                        {product.discountPercentage && (
                          <div className="flex items-center text-chart-2 text-xs font-medium">
                            <span className="mr-1">↓</span>{product.discountPercentage}%
                          </div>
                        )}
                        
                        {/* Original Price */}
                        {product.originalPrice && product.discountedPrice && (
                          <span className="text-xs text-muted-foreground line-through">
                            ₹{product.originalPrice}
                          </span>
                        )}
                        
                        {/* Discounted Price */}
                        {product.discountedPrice && (
                          <span className="font-semibold text-sm text-primary">
                            ₹{product.discountedPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons - Clean Icons */}
                    <div className="flex flex-col gap-1 flex-shrink-0">
                      {product.affiliateLink && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => window.open(product.affiliateLink, '_blank')}
                          className="h-8 w-8 p-0 hover:bg-muted"
                          title="View Product"
                        >
                          <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-primary" />
                        </Button>
                      )}
                      
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditProduct(product)}
                        className="h-8 w-8 p-0 hover:bg-muted"
                        title="Edit Product"
                        data-testid={`button-edit-${product.id}`}
                      >
                        <Edit2 className="w-4 h-4 text-muted-foreground hover:text-secondary" />
                      </Button>

                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 hover:bg-muted"
                        title="Delete Product"
                        onClick={() => openDeleteDialog(product)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive hover:text-destructive/80" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout - Mobile Style Design */}
                <div className="hidden sm:block">
                  <div className="flex items-center gap-3 py-2">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      {product.imageUrl ? (
                        <img 
                          src={product.imageUrl} 
                          alt={product.title}
                          className="w-14 h-14 rounded-lg object-cover bg-muted"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center">
                          <Package className="w-6 h-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      {/* Brand/Platform */}
                      <div className="text-xs font-medium text-muted-foreground uppercase mb-0.5">
                        {product.platform}
                      </div>
                      
                      {/* Product Title */}
                      <h4 className="font-medium text-sm text-foreground line-clamp-2 mb-1">
                        {product.title}
                      </h4>
                      
                      {/* Discount and Pricing */}
                      <div className="flex items-center gap-2">
                        {/* Discount Percentage */}
                        {product.discountPercentage && (
                          <div className="flex items-center text-chart-2 text-xs font-medium">
                            <span className="mr-1">↓</span>{product.discountPercentage}%
                          </div>
                        )}
                        
                        {/* Original Price */}
                        {product.originalPrice && product.discountedPrice && (
                          <span className="text-xs text-muted-foreground line-through">
                            ₹{product.originalPrice}
                          </span>
                        )}
                        
                        {/* Discounted Price */}
                        {product.discountedPrice && (
                          <span className="font-semibold text-sm text-primary">
                            ₹{product.discountedPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons - Clean Icons */}
                    <div className="flex flex-col gap-1 flex-shrink-0">
                      {product.affiliateLink && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => window.open(product.affiliateLink, '_blank')}
                          className="h-8 w-8 p-0 hover:bg-muted"
                          title="View Product"
                        >
                          <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-primary" />
                        </Button>
                      )}
                      
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditProduct(product)}
                        className="h-8 w-8 p-0 hover:bg-muted"
                        title="Edit Product"
                        data-testid={`button-edit-${product.id}`}
                      >
                        <Edit2 className="w-4 h-4 text-muted-foreground hover:text-secondary" />
                      </Button>

                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 hover:bg-muted"
                        title="Delete Product"
                        onClick={() => openDeleteDialog(product)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive hover:text-destructive/80" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Product Dialog */}
      <Dialog open={editingProduct !== null} onOpenChange={(open) => !open && setEditingProduct(null)}>
        <DialogContent className="w-[95vw] max-w-2xl max-h-[85vh] overflow-y-auto mx-auto my-4 sm:mx-4">
          <DialogHeader className="pb-4">
            <DialogTitle className="text-base sm:text-lg">Edit Product</DialogTitle>
            <DialogDescription className="text-sm">
              Update the product information below.
            </DialogDescription>
          </DialogHeader>
          
          {editingProduct && (
            <div className="space-y-3 sm:space-y-4">
              <div>
                <Label htmlFor="edit-title" className="text-sm">Product Title</Label>
                <Input
                  id="edit-title"
                  value={editingProduct.title}
                  onChange={(e) => setEditingProduct({
                    ...editingProduct,
                    title: e.target.value
                  })}
                  className="text-sm"
                  data-testid="input-edit-title"
                />
              </div>
              
              <div>
                <Label htmlFor="edit-description" className="text-sm">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingProduct.description || ""}
                  onChange={(e) => setEditingProduct({
                    ...editingProduct,
                    description: e.target.value || null
                  })}
                  className="text-sm"
                  rows={3}
                  data-testid="input-edit-description"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <Label htmlFor="edit-original-price" className="text-sm">Original Price</Label>
                  <Input
                    id="edit-original-price"
                    type="number"
                    value={editingProduct.originalPrice || ""}
                    onChange={(e) => setEditingProduct({
                      ...editingProduct,
                      originalPrice: e.target.value || null
                    })}
                    className="text-sm"
                    data-testid="input-edit-original-price"
                  />
                </div>
                
                <div>
                  <Label htmlFor="edit-discounted-price" className="text-sm">Discounted Price</Label>
                  <Input
                    id="edit-discounted-price"
                    type="number"
                    value={editingProduct.discountedPrice || ""}
                    onChange={(e) => setEditingProduct({
                      ...editingProduct,
                      discountedPrice: e.target.value || null
                    })}
                    className="text-sm"
                    data-testid="input-edit-discounted-price"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="edit-image-url" className="text-sm">Image URL</Label>
                <Input
                  id="edit-image-url"
                  value={editingProduct.imageUrl || ""}
                  onChange={(e) => setEditingProduct({
                    ...editingProduct,
                    imageUrl: e.target.value || null
                  })}
                  className="text-sm"
                  data-testid="input-edit-image-url"
                />
              </div>
              
              <div>
                <Label htmlFor="edit-affiliate-link" className="text-sm">Affiliate Link</Label>
                <Input
                  id="edit-affiliate-link"
                  value={editingProduct.affiliateLink}
                  onChange={(e) => setEditingProduct({
                    ...editingProduct,
                    affiliateLink: e.target.value
                  })}
                  className="text-sm"
                  data-testid="input-edit-affiliate-link"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <Label htmlFor="edit-platform" className="text-sm">Platform</Label>
                  <Input
                    id="edit-platform"
                    value={editingProduct.platform}
                    onChange={(e) => setEditingProduct({
                      ...editingProduct,
                      platform: e.target.value
                    })}
                    className="text-sm"
                    data-testid="input-edit-platform"
                  />
                </div>
                
                <div>
                  <Label htmlFor="edit-category" className="text-sm">Category</Label>
                  <Input
                    id="edit-category"
                    value={editingProduct.category || ""}
                    onChange={(e) => setEditingProduct({
                      ...editingProduct,
                      category: e.target.value || null
                    })}
                    className="text-sm"
                    data-testid="input-edit-category"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <Switch
                  id="edit-featured"
                  checked={editingProduct.featured || false}
                  onCheckedChange={(checked) => setEditingProduct({
                    ...editingProduct,
                    featured: checked
                  })}
                  data-testid="switch-edit-featured"
                />
                <Label htmlFor="edit-featured" className="text-sm">Featured Product</Label>
              </div>
            </div>
          )}
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2 pt-4">
            <Button 
              variant="outline" 
              onClick={() => setEditingProduct(null)}
              disabled={updateProductMutation.isPending}
              className="text-sm"
              data-testid="button-cancel-edit"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveEdit}
              disabled={updateProductMutation.isPending}
              className="text-sm"
              data-testid="button-save-edit"
            >
              {updateProductMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={productToDelete !== null} onOpenChange={(open) => !open && closeDeleteDialog()}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <Trash2 className="w-5 h-5" />
              Delete Product - Confirmation Required
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-3">
              <div className="text-foreground font-medium">
                You are about to permanently delete:
              </div>
              <div className="p-3 bg-muted rounded-lg border-l-4 border-destructive">
                <div className="font-semibold text-sm">{productToDelete?.title}</div>
                <div className="text-xs text-muted-foreground">Platform: {productToDelete?.platform}</div>
              </div>
              <div className="text-destructive font-medium">
                ⚠️ This action cannot be undone. All product data will be permanently lost.
              </div>
              <div className="space-y-2">
                <Label htmlFor="delete-confirmation" className="text-sm font-medium">
                  To confirm deletion, type <strong className="text-destructive">DELETE</strong> in the box below:
                </Label>
                <Input
                  id="delete-confirmation"
                  value={deleteConfirmation}
                  onChange={(e) => setDeleteConfirmation(e.target.value)}
                  placeholder="Type DELETE to confirm"
                  className="font-mono"
                  autoComplete="off"
                />
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={closeDeleteDialog}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteProduct}
              disabled={deleteConfirmation !== "DELETE" || deleteProductMutation.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {deleteProductMutation.isPending ? "Deleting..." : "Delete Product"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}