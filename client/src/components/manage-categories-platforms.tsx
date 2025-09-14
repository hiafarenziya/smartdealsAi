import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { insertCategorySchema, insertPlatformSchema, type Category, type Platform } from "@shared/schema";
import { Trash2, Edit, Plus, Tag, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ManageCategoriesPlatforms() {
  const { toast } = useToast();
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingPlatform, setEditingPlatform] = useState<Platform | null>(null);

  // Fetch categories and platforms
  const { data: categories = [], isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"]
  });

  const { data: platforms = [], isLoading: platformsLoading } = useQuery<Platform[]>({
    queryKey: ["/api/platforms"]
  });

  // Category mutations
  const createCategoryMutation = useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/categories", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/categories"] });
      toast({ title: "Category created successfully" });
      categoryForm.reset();
    },
    onError: (error: any) => {
      toast({ 
        title: "Failed to create category", 
        description: error.message,
        variant: "destructive" 
      });
    }
  });

  const updateCategoryMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => apiRequest("PUT", `/api/categories/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/categories"] });
      toast({ title: "Category updated successfully" });
      setEditingCategory(null);
      categoryForm.reset();
    },
    onError: (error: any) => {
      toast({ 
        title: "Failed to update category", 
        description: error.message,
        variant: "destructive" 
      });
    }
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/categories/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/categories"] });
      toast({ title: "Category deleted successfully" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Failed to delete category", 
        description: error.message,
        variant: "destructive" 
      });
    }
  });

  // Platform mutations
  const createPlatformMutation = useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/platforms", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/platforms"] });
      toast({ title: "Platform created successfully" });
      platformForm.reset();
    },
    onError: (error: any) => {
      toast({ 
        title: "Failed to create platform", 
        description: error.message,
        variant: "destructive" 
      });
    }
  });

  const updatePlatformMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => apiRequest("PUT", `/api/platforms/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/platforms"] });
      toast({ title: "Platform updated successfully" });
      setEditingPlatform(null);
      platformForm.reset();
    },
    onError: (error: any) => {
      toast({ 
        title: "Failed to update platform", 
        description: error.message,
        variant: "destructive" 
      });
    }
  });

  const deletePlatformMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/platforms/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/platforms"] });
      toast({ title: "Platform deleted successfully" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Failed to delete platform", 
        description: error.message,
        variant: "destructive" 
      });
    }
  });

  // Category form
  const categoryForm = useForm({
    resolver: zodResolver(insertCategorySchema),
    defaultValues: {
      name: "",
      description: "",
      isActive: true
    }
  });

  // Platform form
  const platformForm = useForm({
    resolver: zodResolver(insertPlatformSchema),
    defaultValues: {
      name: "",
      icon: "",
      color: "",
      isActive: true
    }
  });

  const handleCategorySubmit = (data: any) => {
    if (editingCategory) {
      updateCategoryMutation.mutate({ id: editingCategory.id, data });
    } else {
      createCategoryMutation.mutate(data);
    }
  };

  const handlePlatformSubmit = (data: any) => {
    if (editingPlatform) {
      updatePlatformMutation.mutate({ id: editingPlatform.id, data });
    } else {
      createPlatformMutation.mutate(data);
    }
  };

  const startEditingCategory = (category: Category) => {
    setEditingCategory(category);
    categoryForm.reset({
      name: category.name,
      description: category.description || "",
      isActive: category.isActive || false
    });
  };

  const startEditingPlatform = (platform: Platform) => {
    setEditingPlatform(platform);
    platformForm.reset({
      name: platform.name,
      icon: platform.icon || "",
      color: platform.color || "",
      isActive: platform.isActive || false
    });
  };

  const cancelCategoryEditing = () => {
    setEditingCategory(null);
    categoryForm.reset({
      name: "",
      description: "",
      isActive: true
    });
  };

  const cancelPlatformEditing = () => {
    setEditingPlatform(null);
    platformForm.reset({
      name: "",
      icon: "",
      color: "",
      isActive: true
    });
  };

  if (categoriesLoading || platformsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Globe className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Manage Categories & Platforms</h1>
      </div>

      <Tabs defaultValue="categories" className="space-y-6">
        <TabsList>
          <TabsTrigger value="categories" data-testid="tab-categories">
            <Tag className="h-4 w-4 mr-2" />
            Categories
          </TabsTrigger>
          <TabsTrigger value="platforms" data-testid="tab-platforms">
            <Globe className="h-4 w-4 mr-2" />
            Platforms
          </TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                {editingCategory ? "Edit Category" : "Add New Category"}
              </CardTitle>
              <CardDescription>
                {editingCategory ? "Update category information" : "Create a new product category"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...categoryForm}>
                <form onSubmit={categoryForm.handleSubmit(handleCategorySubmit)} className="space-y-4">
                  <FormField
                    control={categoryForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., Electronics, Fashion, Sports" 
                            {...field} 
                            data-testid="input-category-name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={categoryForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Brief description of this category"
                            rows={3}
                            {...field}
                            data-testid="input-category-description"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={categoryForm.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel>Active</FormLabel>
                          <FormDescription>
                            Active categories will appear in product filters and forms
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="switch-category-active"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-2">
                    <Button 
                      type="submit" 
                      disabled={createCategoryMutation.isPending || updateCategoryMutation.isPending}
                      data-testid="button-save-category"
                    >
                      {editingCategory ? "Update Category" : "Create Category"}
                    </Button>
                    {editingCategory && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={cancelCategoryEditing}
                        data-testid="button-cancel-category"
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Existing Categories</CardTitle>
              <CardDescription>
                Manage your product categories. Active categories will appear in filters.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categories.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No categories found</p>
                ) : (
                  categories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                      data-testid={`card-category-${category.id}`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium" data-testid={`text-category-name-${category.id}`}>
                            {category.name}
                          </h3>
                          <Badge variant={category.isActive ? "default" : "secondary"}>
                            {category.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        {category.description && (
                          <p className="text-sm text-muted-foreground">
                            {category.description}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => startEditingCategory(category)}
                          data-testid={`button-edit-category-${category.id}`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteCategoryMutation.mutate(category.id)}
                          disabled={deleteCategoryMutation.isPending}
                          data-testid={`button-delete-category-${category.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="platforms" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                {editingPlatform ? "Edit Platform" : "Add New Platform"}
              </CardTitle>
              <CardDescription>
                {editingPlatform ? "Update platform information" : "Add a new e-commerce platform"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...platformForm}>
                <form onSubmit={platformForm.handleSubmit(handlePlatformSubmit)} className="space-y-4">
                  <FormField
                    control={platformForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Platform Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., Amazon, Flipkart, Myntra" 
                            {...field} 
                            data-testid="input-platform-name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={platformForm.control}
                    name="icon"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Icon (Emoji)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="🛒 🛍️ 👕" 
                            {...field} 
                            data-testid="input-platform-icon"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={platformForm.control}
                    name="color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brand Color</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="#FF9900" 
                            {...field} 
                            data-testid="input-platform-color"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={platformForm.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel>Active</FormLabel>
                          <FormDescription>
                            Active platforms will appear in product filters and forms
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="switch-platform-active"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-2">
                    <Button 
                      type="submit" 
                      disabled={createPlatformMutation.isPending || updatePlatformMutation.isPending}
                      data-testid="button-save-platform"
                    >
                      {editingPlatform ? "Update Platform" : "Create Platform"}
                    </Button>
                    {editingPlatform && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={cancelPlatformEditing}
                        data-testid="button-cancel-platform"
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Existing Platforms</CardTitle>
              <CardDescription>
                Manage your e-commerce platforms. Active platforms will appear in filters.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {platforms.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No platforms found</p>
                ) : (
                  platforms.map((platform) => (
                    <div
                      key={platform.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                      data-testid={`card-platform-${platform.id}`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {platform.icon && <span className="text-lg">{platform.icon}</span>}
                          <h3 className="font-medium" data-testid={`text-platform-name-${platform.id}`}>
                            {platform.name}
                          </h3>
                          <Badge variant={platform.isActive ? "default" : "secondary"}>
                            {platform.isActive ? "Active" : "Inactive"}
                          </Badge>
                          {platform.color && (
                            <div 
                              className="w-4 h-4 rounded-full border"
                              style={{ backgroundColor: platform.color }}
                            />
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => startEditingPlatform(platform)}
                          data-testid={`button-edit-platform-${platform.id}`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deletePlatformMutation.mutate(platform.id)}
                          disabled={deletePlatformMutation.isPending}
                          data-testid={`button-delete-platform-${platform.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}