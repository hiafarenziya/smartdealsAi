import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Package, Star, Percent, ShoppingCart, Target } from "lucide-react";
import type { Product } from "@shared/schema";

interface AnalyticsData {
  totalProducts: number;
  featuredProducts: number;
  averageDiscount: number;
  platformDistribution: { name: string; value: number }[];
  categoryDistribution: { name: string; value: number }[];
  recentlyAdded: Product[];
}

const COLORS = ['#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444'];

export default function AnalyticsDashboard() {
  const { data: analytics, isLoading } = useQuery<AnalyticsData>({
    queryKey: ["/api/analytics/overview"],
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
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

  if (!analytics) return null;

  return (
    <div className="space-y-6" data-testid="analytics-dashboard">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        <Card className="glass-effect border-border">
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">Total Products</p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary" data-testid="total-products">
                  {analytics.totalProducts}
                </p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                <Package className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-border">
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">Featured Products</p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-secondary" data-testid="featured-products">
                  {analytics.featuredProducts}
                </p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-border">
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">Avg. Discount</p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-accent" data-testid="avg-discount">
                  {analytics.averageDiscount.toFixed(1)}%
                </p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-accent to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Percent className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-border">
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">Active Platforms</p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary" data-testid="active-platforms">
                  {analytics.platformDistribution.length}
                </p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-primary via-secondary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
                <Target className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Platform Distribution */}
        <Card className="glass-effect border-border">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="flex items-center text-sm sm:text-base lg:text-lg">
              <ShoppingCart className="mr-2 w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              Platform Distribution
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">Products by platform</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-48 sm:h-64 lg:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analytics.platformDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={window.innerWidth < 640 ? 60 : window.innerWidth < 1024 ? 70 : 80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {analytics.platformDistribution.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="glass-effect border-border">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="flex items-center text-sm sm:text-base lg:text-lg">
              <TrendingUp className="mr-2 w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
              Category Performance
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">Products by category</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-48 sm:h-64 lg:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.categoryDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="name" 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={window.innerWidth < 640 ? 10 : 12}
                    tickLine={false}
                    axisLine={false}
                    angle={window.innerWidth < 640 ? -45 : 0}
                    textAnchor={window.innerWidth < 640 ? 'end' : 'middle'}
                    height={window.innerWidth < 640 ? 60 : 30}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={window.innerWidth < 640 ? 10 : 12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Products */}
      <Card className="glass-effect border-border">
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-sm sm:text-base lg:text-lg">Recently Added Products</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Latest products added to the catalog</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {analytics.recentlyAdded.length === 0 ? (
              <p className="text-muted-foreground text-center py-6 sm:py-8 text-sm">No products added yet</p>
            ) : (
              analytics.recentlyAdded.map((product) => (
                <div key={product.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-muted/30 rounded-lg border border-border/50 gap-3 sm:gap-0">
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    {product.imageUrl && (
                      <img 
                        src={product.imageUrl} 
                        alt={product.title}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-cover bg-muted flex-shrink-0"
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-xs sm:text-sm line-clamp-1 sm:line-clamp-2">{product.title}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {product.platform}
                        </Badge>
                        {product.featured && (
                          <Badge variant="secondary" className="text-xs">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-left sm:text-right flex-shrink-0">
                    {product.discountedPrice && (
                      <p className="font-semibold text-primary text-sm sm:text-base">₹{product.discountedPrice}</p>
                    )}
                    {product.originalPrice && product.discountedPrice && (
                      <p className="text-xs text-muted-foreground line-through">₹{product.originalPrice}</p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}