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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { insertCategorySchema, insertPlatformSchema, type Category, type Platform } from "@shared/schema";
import { Trash2, Edit, Plus, Tag, Globe, Smile } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";

// Common ecommerce and shopping emojis
const PLATFORM_EMOJIS = [
  "🛒", "🛍️", "👕", "👔", "👗", "👠", "👜", "💍", "📱", "💻", 
  "🏪", "🏬", "🎁", "📦", "🚚", "💳", "💰", "🛎️", "🏷️", "🎯",
  "📚", "🍔", "☕", "🍕", "🥘", "🎮", "🏠", "⚽", "🎵", "🌟",
  "🔥", "⭐", "✨", "💫", "🎪", "🎨", "📸", "🎬", "🔊", "⚡",
];

// Category specific emojis
const CATEGORY_EMOJIS = [
  "📱", "💻", "⌚", "🎧", "📸", "🖥️", "⌨️", "🖱️", "📺", "📻",
  "👕", "👔", "👗", "👠", "👜", "👞", "🧥", "👖", "👟", "🕶️",
  "🍔", "🍕", "☕", "🍩", "🧁", "🍰", "🥤", "🍪", "🥗", "🍎",
  "🏠", "🛋️", "🛏️", "🚿", "🔧", "🔨", "🧽", "🪴", "🕯️", "💡",
  "🎮", "🎯", "⚽", "🏀", "🎾", "🏓", "🎲", "🎪", "🎨", "🎵",
  "📚", "✏️", "🖊️", "📝", "📄", "📋", "🎒", "📐", "🖍️", "📖",
  "🩺", "💊", "🧴", "🧼", "🪥", "🧽", "🧻", "🌡️", "💉", "🩹",
  "🚗", "🏍️", "🚴", "🛴", "🚂", "✈️", "🚁", "⛽", "🔧", "🛞",
  "💍", "💎", "⌚", "👑", "💄", "💅", "🪞", "🎀", "🌹", "💐",
  "🧸", "👶", "🍼", "🎈", "🎁", "🧷", "👕", "🧦", "👒", "🎪",
];

// Helper function to render icon (emoji or image URL)
const IconRenderer = ({ icon, className = "text-lg", alt = "Icon" }: { 
  icon?: string; 
  className?: string; 
  alt?: string; 
}) => {
  if (!icon) return null;
  
  const isUrl = icon.startsWith('https://');
  
  if (isUrl) {
    return (
      <img 
        src={icon} 
        alt={alt}
        className={`w-5 h-5 object-contain ${className}`}
        onError={(e) => {
          // Fallback to first letter if image fails to load
          e.currentTarget.style.display = 'none';
          (e.currentTarget.nextElementSibling as HTMLElement)!.style.display = 'inline-block';
        }}
        loading="lazy"
        referrerPolicy="no-referrer"
      />
    );
  }
  
  return <span className={className}>{icon}</span>;
};

export function ManageCategoriesPlatforms() {
  const { toast } = useToast();
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingPlatform, setEditingPlatform] = useState<Platform | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showCategoryEmojiPicker, setShowCategoryEmojiPicker] = useState(false);
  const [categoryIconType, setCategoryIconType] = useState<'emoji' | 'url'>('emoji');
  const [platformIconType, setPlatformIconType] = useState<'emoji' | 'url'>('emoji');

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
      icon: "",
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
      icon: category.icon || "",
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
      icon: "",
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
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center gap-2 px-1">
        <Globe className="h-5 w-5 sm:h-6 sm:w-6" />
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold">Manage Categories & Platforms</h1>
      </div>

      <Tabs defaultValue="categories" className="space-y-4 sm:space-y-6">
        <TabsList className="grid w-full grid-cols-2 h-auto">
          <TabsTrigger value="categories" data-testid="tab-categories" className="flex items-center gap-1 sm:gap-2 py-2 sm:py-3">
            <Tag className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-xs sm:text-sm">Categories</span>
          </TabsTrigger>
          <TabsTrigger value="platforms" data-testid="tab-platforms" className="flex items-center gap-1 sm:gap-2 py-2 sm:py-3">
            <Globe className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-xs sm:text-sm">Platforms</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="flex items-center gap-2 text-sm sm:text-base lg:text-lg">
                <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                {editingCategory ? "Edit Category" : "Add New Category"}
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                {editingCategory ? "Update category information" : "Create a new product category"}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Form {...categoryForm}>
                <form onSubmit={categoryForm.handleSubmit(handleCategorySubmit)} className="space-y-3 sm:space-y-4">
                  <FormField
                    control={categoryForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Category Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., Electronics, Fashion, Sports" 
                            {...field} 
                            data-testid="input-category-name"
                            className="text-sm"
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
                        <FormLabel className="text-sm">Description (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Brief description of this category"
                            rows={2}
                            {...field}
                            data-testid="input-category-description"
                            className="text-sm"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={categoryForm.control}
                    name="icon"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Category Icon</FormLabel>
                        <FormControl>
                          <div className="space-y-3">
                            {/* Icon Type Toggle */}
                            <RadioGroup
                              value={categoryIconType}
                              onValueChange={(value: 'emoji' | 'url') => {
                                setCategoryIconType(value);
                                if (value !== categoryIconType) {
                                  field.onChange(''); // Clear current value when switching
                                }
                              }}
                              className="flex gap-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="emoji" id="category-emoji" />
                                <label htmlFor="category-emoji" className="text-sm font-medium">
                                  Emoji
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="url" id="category-url" />
                                <label htmlFor="category-url" className="text-sm font-medium">
                                  Image URL
                                </label>
                              </div>
                            </RadioGroup>

                            {/* Conditional Input Based on Type */}
                            {categoryIconType === 'emoji' ? (
                              <div className="flex gap-2">
                                <Input 
                                  placeholder="📱 👕 🍔" 
                                  {...field} 
                                  data-testid="input-category-icon"
                                  className="text-sm flex-1"
                                />
                                <Popover open={showCategoryEmojiPicker} onOpenChange={setShowCategoryEmojiPicker}>
                                  <PopoverTrigger asChild>
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      className="px-3"
                                      title="Choose Emoji"
                                    >
                                      <Smile className="w-4 h-4" />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-80 p-2">
                                    <div className="grid grid-cols-8 gap-1">
                                      {CATEGORY_EMOJIS.map((emoji, index) => (
                                        <Button
                                          key={index}
                                          type="button"
                                          variant="ghost"
                                          size="sm"
                                          className="h-8 w-8 p-0 hover:bg-accent text-lg"
                                          onClick={() => {
                                            field.onChange(emoji);
                                            setShowCategoryEmojiPicker(false);
                                          }}
                                        >
                                          {emoji}
                                        </Button>
                                      ))}
                                    </div>
                                    <div className="mt-2 pt-2 border-t text-xs text-muted-foreground text-center">
                                      Click an emoji to select it
                                    </div>
                                  </PopoverContent>
                                </Popover>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                <Input 
                                  placeholder="https://example.com/icon.png" 
                                  {...field} 
                                  data-testid="input-category-icon-url"
                                  className="text-sm"
                                />
                                <FormDescription className="text-xs text-muted-foreground">
                                  Use HTTPS URLs only. Supported: PNG, JPG, SVG, WebP
                                </FormDescription>
                                {/* Live Preview */}
                                {field.value && field.value.startsWith('https://') && (
                                  <div className="mt-2 p-2 border rounded-lg bg-muted/50">
                                    <p className="text-xs font-medium mb-1">Preview:</p>
                                    <img 
                                      src={field.value} 
                                      alt="Icon preview" 
                                      className="w-8 h-8 object-contain rounded"
                                      onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                        (e.currentTarget.nextElementSibling as HTMLElement)!.style.display = 'block';
                                      }}
                                      onLoad={(e) => {
                                        e.currentTarget.style.display = 'block';
                                        (e.currentTarget.nextElementSibling as HTMLElement)!.style.display = 'none';
                                      }}
                                    />
                                    <div className="text-xs text-red-500 hidden">
                                      ❌ Failed to load image
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
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
                        <div className="space-y-0.5 flex-1 min-w-0">
                          <FormLabel className="text-sm">Active</FormLabel>
                          <FormDescription className="text-xs">
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

                  <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    <Button 
                      type="submit" 
                      disabled={createCategoryMutation.isPending || updateCategoryMutation.isPending}
                      data-testid="button-save-category"
                      className="text-sm"
                    >
                      {editingCategory ? "Update Category" : "Create Category"}
                    </Button>
                    {editingCategory && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={cancelCategoryEditing}
                        data-testid="button-cancel-category"
                        className="text-sm"
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
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="text-sm sm:text-base lg:text-lg">Existing Categories</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Manage your product categories. Active categories will appear in filters.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3 sm:space-y-4">
                {categories.length === 0 ? (
                  <p className="text-center text-muted-foreground py-6 sm:py-8 text-sm">No categories found</p>
                ) : (
                  categories.map((category) => (
                    <div
                      key={category.id}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border rounded-lg gap-3 sm:gap-0"
                      data-testid={`card-category-${category.id}`}
                    >
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <IconRenderer 
                            icon={category.icon || undefined} 
                            alt={`${category.name} icon`}
                            className="text-lg"
                          />
                          <span className="hidden text-xs bg-muted px-1 rounded">
                            {category.name.charAt(0).toUpperCase()}
                          </span>
                          <h3 className="font-medium text-sm sm:text-base" data-testid={`text-category-name-${category.id}`}>
                            {category.name}
                          </h3>
                          <Badge variant={category.isActive ? "default" : "secondary"} className="text-xs">
                            {category.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        {category.description && (
                          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                            {category.description}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2 self-start sm:self-center flex-shrink-0">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => startEditingCategory(category)}
                          data-testid={`button-edit-category-${category.id}`}
                        >
                          <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteCategoryMutation.mutate(category.id)}
                          disabled={deleteCategoryMutation.isPending}
                          data-testid={`button-delete-category-${category.id}`}
                        >
                          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="platforms" className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="flex items-center gap-2 text-sm sm:text-base lg:text-lg">
                <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                {editingPlatform ? "Edit Platform" : "Add New Platform"}
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                {editingPlatform ? "Update platform information" : "Add a new e-commerce platform"}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Form {...platformForm}>
                <form onSubmit={platformForm.handleSubmit(handlePlatformSubmit)} className="space-y-3 sm:space-y-4">
                  <FormField
                    control={platformForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Platform Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., Amazon, Flipkart, Myntra" 
                            {...field} 
                            data-testid="input-platform-name"
                            className="text-sm"
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
                        <FormLabel className="text-sm">Platform Icon</FormLabel>
                        <FormControl>
                          <div className="space-y-3">
                            {/* Icon Type Toggle */}
                            <RadioGroup
                              value={platformIconType}
                              onValueChange={(value: 'emoji' | 'url') => {
                                setPlatformIconType(value);
                                if (value !== platformIconType) {
                                  field.onChange(''); // Clear current value when switching
                                }
                              }}
                              className="flex gap-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="emoji" id="platform-emoji" />
                                <label htmlFor="platform-emoji" className="text-sm font-medium">
                                  Emoji
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="url" id="platform-url" />
                                <label htmlFor="platform-url" className="text-sm font-medium">
                                  Image URL
                                </label>
                              </div>
                            </RadioGroup>

                            {/* Conditional Input Based on Type */}
                            {platformIconType === 'emoji' ? (
                              <div className="flex gap-2">
                                <Input 
                                  placeholder="🛒 🛍️ 👕" 
                                  {...field} 
                                  data-testid="input-platform-icon"
                                  className="text-sm flex-1"
                                />
                                <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
                                  <PopoverTrigger asChild>
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      className="px-3"
                                      title="Choose Emoji"
                                    >
                                      <Smile className="w-4 h-4" />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-80 p-2">
                                    <div className="grid grid-cols-8 gap-1">
                                      {PLATFORM_EMOJIS.map((emoji, index) => (
                                        <Button
                                          key={index}
                                          type="button"
                                          variant="ghost"
                                          size="sm"
                                          className="h-8 w-8 p-0 hover:bg-accent text-lg"
                                          onClick={() => {
                                            field.onChange(emoji);
                                            setShowEmojiPicker(false);
                                          }}
                                        >
                                          {emoji}
                                        </Button>
                                      ))}
                                    </div>
                                    <div className="mt-2 pt-2 border-t text-xs text-muted-foreground text-center">
                                      Click an emoji to select it
                                    </div>
                                  </PopoverContent>
                                </Popover>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                <Input 
                                  placeholder="https://example.com/logo.png" 
                                  {...field} 
                                  data-testid="input-platform-icon-url"
                                  className="text-sm"
                                />
                                <FormDescription className="text-xs text-muted-foreground">
                                  Use HTTPS URLs only. Supported: PNG, JPG, SVG, WebP
                                </FormDescription>
                                {/* Live Preview */}
                                {field.value && field.value.startsWith('https://') && (
                                  <div className="mt-2 p-2 border rounded-lg bg-muted/50">
                                    <p className="text-xs font-medium mb-1">Preview:</p>
                                    <img 
                                      src={field.value} 
                                      alt="Icon preview" 
                                      className="w-8 h-8 object-contain rounded"
                                      onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                        (e.currentTarget.nextElementSibling as HTMLElement)!.style.display = 'block';
                                      }}
                                      onLoad={(e) => {
                                        e.currentTarget.style.display = 'block';
                                        (e.currentTarget.nextElementSibling as HTMLElement)!.style.display = 'none';
                                      }}
                                    />
                                    <div className="text-xs text-red-500 hidden">
                                      ❌ Failed to load image
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
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
                        <FormLabel className="text-sm">Brand Color</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="#FF9900" 
                            {...field} 
                            data-testid="input-platform-color"
                            className="text-sm"
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
                        <div className="space-y-0.5 flex-1 min-w-0">
                          <FormLabel className="text-sm">Active</FormLabel>
                          <FormDescription className="text-xs">
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

                  <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    <Button 
                      type="submit" 
                      disabled={createPlatformMutation.isPending || updatePlatformMutation.isPending}
                      data-testid="button-save-platform"
                      className="text-sm"
                    >
                      {editingPlatform ? "Update Platform" : "Create Platform"}
                    </Button>
                    {editingPlatform && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={cancelPlatformEditing}
                        data-testid="button-cancel-platform"
                        className="text-sm"
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
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="text-sm sm:text-base lg:text-lg">Existing Platforms</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Manage your e-commerce platforms. Active platforms will appear in filters.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3 sm:space-y-4">
                {platforms.length === 0 ? (
                  <p className="text-center text-muted-foreground py-6 sm:py-8 text-sm">No platforms found</p>
                ) : (
                  platforms.map((platform) => (
                    <div
                      key={platform.id}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border rounded-lg gap-3 sm:gap-0"
                      data-testid={`card-platform-${platform.id}`}
                    >
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <IconRenderer 
                            icon={platform.icon || undefined} 
                            alt={`${platform.name} icon`}
                            className="text-lg"
                          />
                          <span className="hidden text-xs bg-muted px-1 rounded">
                            {platform.name.charAt(0).toUpperCase()}
                          </span>
                          <h3 className="font-medium text-sm sm:text-base" data-testid={`text-platform-name-${platform.id}`}>
                            {platform.name}
                          </h3>
                          <Badge variant={platform.isActive ? "default" : "secondary"} className="text-xs">
                            {platform.isActive ? "Active" : "Inactive"}
                          </Badge>
                          {platform.color && (
                            <div 
                              className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border"
                              style={{ backgroundColor: platform.color }}
                            />
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 self-start sm:self-center flex-shrink-0">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => startEditingPlatform(platform)}
                          data-testid={`button-edit-platform-${platform.id}`}
                        >
                          <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deletePlatformMutation.mutate(platform.id)}
                          disabled={deletePlatformMutation.isPending}
                          data-testid={`button-delete-platform-${platform.id}`}
                        >
                          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
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