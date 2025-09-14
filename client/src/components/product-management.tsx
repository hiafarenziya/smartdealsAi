import { useState } from "react";
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
import { Edit2, Trash2, Package, Star, ExternalLink } from "lucide-react";
import type { Product, InsertProduct } from "@shared/schema";

export default function ProductManagement() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

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
      setIsEditDialogOpen(false);
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
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingProduct) return;
    
    const { id, createdAt, updatedAt, ...productData } = editingProduct;
    updateProductMutation.mutate({ id, data: productData });
  };

  const handleDeleteProduct = (id: string) => {
    deleteProductMutation.mutate(id);
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold flex items-center">
            <Package className="text-primary mr-2 sm:mr-3 w-5 h-5 sm:w-6 sm:h-6" />
            Manage Products
          </h3>
          <p className="text-muted-foreground mt-1">
            Edit or remove existing products from the catalog
          </p>
        </div>
        <Badge variant="secondary" className="text-sm">
          {products?.length || 0} Products
        </Badge>
      </div>

      {!products || products.length === 0 ? (
        <Card className="glass-effect border-border">
          <CardContent className="p-8 text-center">
            <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h4 className="text-lg font-semibold mb-2">No Products Found</h4>
            <p className="text-muted-foreground">Add some products to get started with product management.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {products.map((product) => (
            <Card key={product.id} className="glass-effect border-border">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    {product.imageUrl ? (
                      <img 
                        src={product.imageUrl} 
                        alt={product.title}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover bg-muted"
                      />
                    ) : (
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-muted flex items-center justify-center">
                        <Package className="w-6 h-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-base sm:text-lg line-clamp-2 mb-2">
                          {product.title}
                        </h4>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {product.platform}
                          </Badge>
                          {product.category && (
                            <Badge variant="secondary" className="text-xs">
                              {product.category}
                            </Badge>
                          )}
                          {product.featured && (
                            <Badge variant="default" className="text-xs">
                              <Star className="w-3 h-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>
                        
                        {/* Pricing */}
                        <div className="flex items-center gap-2 mb-2">
                          {product.discountedPrice && (
                            <span className="font-semibold text-primary">₹{product.discountedPrice}</span>
                          )}
                          {product.originalPrice && product.discountedPrice && (
                            <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
                          )}
                          {product.discountPercentage && (
                            <Badge variant="destructive" className="text-xs">
                              {product.discountPercentage}% OFF
                            </Badge>
                          )}
                        </div>

                        {/* Rating */}
                        {product.rating && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{product.rating}</span>
                            {product.reviewCount && (
                              <span>({product.reviewCount} reviews)</span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-2 sm:mt-0">
                        {product.affiliateLink && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => window.open(product.affiliateLink, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        )}
                        
                        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEditProduct(product)}
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Edit Product</DialogTitle>
                              <DialogDescription>
                                Update the product information below.
                              </DialogDescription>
                            </DialogHeader>
                            
                            {editingProduct && (
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor="edit-title">Product Title</Label>
                                  <Input
                                    id="edit-title"
                                    value={editingProduct.title}
                                    onChange={(e) => setEditingProduct({
                                      ...editingProduct,
                                      title: e.target.value
                                    })}
                                  />
                                </div>
                                
                                <div>
                                  <Label htmlFor="edit-description">Description</Label>
                                  <Textarea
                                    id="edit-description"
                                    value={editingProduct.description || ""}
                                    onChange={(e) => setEditingProduct({
                                      ...editingProduct,
                                      description: e.target.value || null
                                    })}
                                  />
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label htmlFor="edit-original-price">Original Price</Label>
                                    <Input
                                      id="edit-original-price"
                                      type="number"
                                      value={editingProduct.originalPrice || ""}
                                      onChange={(e) => setEditingProduct({
                                        ...editingProduct,
                                        originalPrice: e.target.value || null
                                      })}
                                    />
                                  </div>
                                  
                                  <div>
                                    <Label htmlFor="edit-discounted-price">Discounted Price</Label>
                                    <Input
                                      id="edit-discounted-price"
                                      type="number"
                                      value={editingProduct.discountedPrice || ""}
                                      onChange={(e) => setEditingProduct({
                                        ...editingProduct,
                                        discountedPrice: e.target.value || null
                                      })}
                                    />
                                  </div>
                                </div>
                                
                                <div>
                                  <Label htmlFor="edit-image-url">Image URL</Label>
                                  <Input
                                    id="edit-image-url"
                                    value={editingProduct.imageUrl || ""}
                                    onChange={(e) => setEditingProduct({
                                      ...editingProduct,
                                      imageUrl: e.target.value || null
                                    })}
                                  />
                                </div>
                                
                                <div>
                                  <Label htmlFor="edit-affiliate-link">Affiliate Link</Label>
                                  <Input
                                    id="edit-affiliate-link"
                                    value={editingProduct.affiliateLink}
                                    onChange={(e) => setEditingProduct({
                                      ...editingProduct,
                                      affiliateLink: e.target.value
                                    })}
                                  />
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label htmlFor="edit-platform">Platform</Label>
                                    <Input
                                      id="edit-platform"
                                      value={editingProduct.platform}
                                      onChange={(e) => setEditingProduct({
                                        ...editingProduct,
                                        platform: e.target.value
                                      })}
                                    />
                                  </div>
                                  
                                  <div>
                                    <Label htmlFor="edit-category">Category</Label>
                                    <Input
                                      id="edit-category"
                                      value={editingProduct.category || ""}
                                      onChange={(e) => setEditingProduct({
                                        ...editingProduct,
                                        category: e.target.value || null
                                      })}
                                    />
                                  </div>
                                </div>
                                
                                <div className="flex items-center space-x-2">
                                  <Switch
                                    id="edit-featured"
                                    checked={editingProduct.featured || false}
                                    onCheckedChange={(checked) => setEditingProduct({
                                      ...editingProduct,
                                      featured: checked
                                    })}
                                  />
                                  <Label htmlFor="edit-featured">Featured Product</Label>
                                </div>
                              </div>
                            )}
                            
                            <DialogFooter>
                              <Button 
                                variant="outline" 
                                onClick={() => setIsEditDialogOpen(false)}
                                disabled={updateProductMutation.isPending}
                              >
                                Cancel
                              </Button>
                              <Button 
                                onClick={handleSaveEdit}
                                disabled={updateProductMutation.isPending}
                              >
                                {updateProductMutation.isPending ? "Saving..." : "Save Changes"}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Product</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{product.title}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDeleteProduct(product.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}