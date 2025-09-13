import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertProductSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PlusCircle, Download, Loader2 } from "lucide-react";
import type { InsertProduct } from "@shared/schema";

export default function AddProductForm() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const form = useForm<InsertProduct>({
    resolver: zodResolver(insertProductSchema),
    defaultValues: {
      title: "",
      description: null,
      originalPrice: null,
      discountedPrice: null,
      imageUrl: null,
      affiliateLink: "",
      platform: "",
      category: null,
      featured: false,
      autoFetchPrice: false,
      rating: null,
      reviewCount: null,
      discountPercentage: null,
    },
  });

  const addProductMutation = useMutation({
    mutationFn: async (data: InsertProduct) => {
      return await apiRequest("POST", "/api/products", data);
    },
    onSuccess: () => {
      toast({
        title: "Product Added Successfully",
        description: "The product has been added to the catalog.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
    },
    onError: () => {
      toast({
        title: "Failed to Add Product",
        description: "Please check all fields and try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertProduct) => {
    addProductMutation.mutate(data);
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-8 glass-effect">
      <h3 className="text-2xl font-semibold mb-6 flex items-center">
        <PlusCircle className="text-primary mr-3" />
        Add New Product
      </h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="add-product-form">
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Title *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter product title" 
                      className="bg-background border-border"
                      data-testid="input-title"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="platform"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Platform</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} data-testid="select-platform">
                    <FormControl>
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue placeholder="Select Platform" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Amazon">Amazon</SelectItem>
                      <SelectItem value="Flipkart">Flipkart</SelectItem>
                      <SelectItem value="Myntra">Myntra</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="originalPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Original Price</FormLabel>
                  <FormControl>
                    <Input 
                      type="number"
                      placeholder="0.00" 
                      className="bg-background border-border"
                      data-testid="input-original-price"
                      value={field.value || ""}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="discountedPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discounted Price</FormLabel>
                  <FormControl>
                    <Input 
                      type="number"
                      placeholder="0.00" 
                      className="bg-background border-border"
                      data-testid="input-discounted-price"
                      value={field.value || ""}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Image URL</FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <Input 
                      type="url"
                      placeholder="https://example.com/image.jpg" 
                      className="flex-1 bg-background border-border"
                      data-testid="input-image-url"
                      value={field.value || ""}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <Button 
                    type="button" 
                    variant="secondary"
                    className="px-6 py-3"
                    data-testid="fetch-image-button"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="affiliateLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Affiliate Link</FormLabel>
                <FormControl>
                  <Input 
                    type="url"
                    placeholder="https://affiliate-link.com" 
                    className="bg-background border-border"
                    data-testid="input-affiliate-link"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value || ""} data-testid="select-category">
                    <FormControl>
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Fashion">Fashion</SelectItem>
                      <SelectItem value="Home & Garden">Home & Garden</SelectItem>
                      <SelectItem value="Books">Books</SelectItem>
                      <SelectItem value="Sports">Sports</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="discountPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Percentage</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="45%" 
                      className="bg-background border-border"
                      data-testid="input-discount-percentage"
                      value={field.value || ""}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter product description (optional)" 
                    className="bg-background border-border h-24"
                    data-testid="input-description"
                    value={field.value || ""}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex items-center gap-6">
            <FormField
              control={form.control}
              name="autoFetchPrice"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value || false}
                      onCheckedChange={field.onChange}
                      data-testid="checkbox-auto-fetch"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Auto-fetch live price updates</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value || false}
                      onCheckedChange={field.onChange}
                      data-testid="checkbox-featured"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Featured product</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>
          
          <div className="flex gap-4">
            <Button 
              type="submit" 
              className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white py-3 rounded-lg font-medium transition-all duration-300"
              disabled={addProductMutation.isPending}
              data-testid="submit-product-button"
            >
              {addProductMutation.isPending ? (
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              ) : (
                <PlusCircle className="mr-2 w-4 h-4" />
              )}
              Add Product
            </Button>
            
            <Button 
              type="button" 
              variant="secondary"
              className="px-8 py-3"
              onClick={() => form.reset()}
              data-testid="cancel-button"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
