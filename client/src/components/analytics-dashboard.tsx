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

const COLORS = [
  'hsl(271, 76%, 63%)',  // Primary Purple
  'hsl(217, 91%, 65%)',  // Secondary Blue  
  'hsl(159, 100%, 46%)', // Success Green
  'hsl(42, 93%, 60%)',   // Warning Orange
  'hsl(0, 84%, 65%)',    // Destructive Red
  'hsl(280, 100%, 70%)', // Accent Purple
  'hsl(200, 100%, 60%)', // Info Blue
  'hsl(120, 60%, 50%)',  // Chart Green
];

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
        <Card className="glass-effect border-border shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/50">
          <CardContent className="p-4 sm:p-5 lg:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-semibold text-muted-foreground truncate uppercase tracking-wide">Total Products</p>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mt-2" data-testid="total-products">
                  {analytics.totalProducts}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Products in catalog</p>
              </div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-primary via-primary/90 to-secondary rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Package className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-border shadow-lg hover:shadow-xl transition-all duration-300 hover:border-secondary/50">
          <CardContent className="p-4 sm:p-5 lg:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-semibold text-muted-foreground truncate uppercase tracking-wide">Featured Products</p>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-secondary mt-2" data-testid="featured-products">
                  {analytics.featuredProducts}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Highlighted products</p>
              </div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-secondary via-secondary/90 to-accent rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white fill-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-border shadow-lg hover:shadow-xl transition-all duration-300 hover:border-accent/50">
          <CardContent className="p-4 sm:p-5 lg:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-semibold text-muted-foreground truncate uppercase tracking-wide">Avg. Discount</p>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-accent mt-2" data-testid="avg-discount">
                  {analytics.averageDiscount.toFixed(1)}%
                </p>
                <p className="text-xs text-muted-foreground mt-1">Average savings</p>
              </div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-accent via-accent/90 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Percent className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-border shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/50">
          <CardContent className="p-4 sm:p-5 lg:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-semibold text-muted-foreground truncate uppercase tracking-wide">Active Platforms</p>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mt-2" data-testid="active-platforms">
                  {analytics.platformDistribution.length}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Connected platforms</p>
              </div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-primary via-secondary to-accent rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Platform Distribution */}
        <Card className="glass-effect border-border shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-3 sm:pb-6 border-b border-border/50">
            <CardTitle className="flex items-center text-sm sm:text-base lg:text-lg font-semibold">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mr-3">
                <ShoppingCart className="w-4 h-4 text-white" />
              </div>
              Platform Distribution
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm text-muted-foreground">Product distribution across platforms</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-56 sm:h-64 lg:h-80 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analytics.platformDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}\n${(percent * 100).toFixed(0)}%`}
                    outerRadius={window.innerWidth < 640 ? 70 : window.innerWidth < 1024 ? 85 : 95}
                    innerRadius={window.innerWidth < 640 ? 25 : window.innerWidth < 1024 ? 35 : 40}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="hsl(var(--background))"
                    strokeWidth={2}
                  >
                    {analytics.platformDistribution.map((_, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]}
                        className="hover:opacity-80 transition-opacity duration-200"
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "12px",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                      color: "hsl(var(--foreground))"
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Legend */}
            <div className="flex flex-wrap gap-2 justify-center">
              {analytics.platformDistribution.map((item, index) => (
                <div key={item.name} className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted/30">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-xs font-medium">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="glass-effect border-border shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-3 sm:pb-6 border-b border-border/50">
            <CardTitle className="flex items-center text-sm sm:text-base lg:text-lg font-semibold">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-secondary to-accent flex items-center justify-center mr-3">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              Category Performance
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm text-muted-foreground">Product performance by category</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-56 sm:h-64 lg:h-80 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={analytics.categoryDistribution.map(item => ({ 
                    ...item, 
                    shortName: item.name.length > 8 ? item.name.substring(0, 8) + '...' : item.name 
                  }))}
                  margin={{ 
                    top: 20, 
                    right: 20, 
                    left: 20, 
                    bottom: window.innerWidth < 640 ? 80 : 60 
                  }}
                >
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.9} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.6} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke="hsl(var(--border))" 
                    strokeOpacity={0.2}
                    vertical={false}
                  />
                  <XAxis 
                    dataKey="shortName" 
                    stroke="rgba(156, 163, 175, 0.4)" 
                    fontSize={window.innerWidth < 640 ? 11 : 13}
                    tickLine={false}
                    axisLine={false}
                    angle={-45}
                    textAnchor="end"
                    height={window.innerWidth < 640 ? 80 : 60}
                    interval={0}
                    tick={{ 
                      fontSize: window.innerWidth < 640 ? 11 : 13,
                      fill: 'rgba(156, 163, 175, 0.5)',
                      fontWeight: 300
                    }}
                  />
                  <YAxis 
                    stroke="rgba(156, 163, 175, 0.4)" 
                    fontSize={window.innerWidth < 640 ? 11 : 13}
                    tickLine={false}
                    axisLine={false}
                    width={50}
                    tick={{ 
                      fontSize: window.innerWidth < 640 ? 11 : 13,
                      fill: 'rgba(156, 163, 175, 0.5)',
                      fontWeight: 300
                    }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "12px",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                      color: "hsl(var(--foreground))",
                      fontSize: '14px',
                      fontWeight: 500
                    }}
                    cursor={{ fill: 'hsl(var(--muted))', fillOpacity: 0.1 }}
                    labelFormatter={(label) => {
                      const originalItem = analytics.categoryDistribution.find(item => 
                        item.name.startsWith(label.replace('...', ''))
                      );
                      return originalItem ? originalItem.name : label;
                    }}
                    formatter={(value) => [
                      `${value} Products`,
                      'Category Count'
                    ]}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="url(#barGradient)" 
                    radius={[8, 8, 0, 0]}
                    maxBarSize={window.innerWidth < 640 ? 40 : 50}
                  >
                    {analytics.categoryDistribution.map((_, index) => (
                      <Cell 
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        className="hover:opacity-80 transition-opacity duration-200"
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Products */}
      <Card className="glass-effect border-border shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-3 sm:pb-6 border-b border-border/50">
          <CardTitle className="flex items-center text-sm sm:text-base lg:text-lg font-semibold">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-orange-500 flex items-center justify-center mr-3">
              <Package className="w-4 h-4 text-white" />
            </div>
            Recently Added Products
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm text-muted-foreground">Latest products added to the catalog</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-3">
            {analytics.recentlyAdded.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto rounded-full bg-muted/50 flex items-center justify-center mb-4">
                  <Package className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-sm font-medium">No products added yet</p>
                <p className="text-xs text-muted-foreground mt-1">Start adding products to see them here</p>
              </div>
            ) : (
              analytics.recentlyAdded.map((product) => (
                <div key={product.id} className="group flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gradient-to-r from-muted/20 to-muted/10 hover:from-muted/30 hover:to-muted/20 rounded-xl border border-border/50 hover:border-border transition-all duration-200 gap-3 sm:gap-0">
                  <div className="flex items-center space-x-4 min-w-0 flex-1">
                    <div className="relative flex-shrink-0">
                      {product.imageUrl ? (
                        <img 
                          src={product.imageUrl} 
                          alt={product.title}
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover bg-muted ring-2 ring-border/20"
                        />
                      ) : (
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-muted to-muted/70 flex items-center justify-center ring-2 ring-border/20">
                          <Package className="w-6 h-6 text-muted-foreground" />
                        </div>
                      )}
                      {product.featured && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center">
                          <Star className="w-3 h-3 text-white fill-white" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-sm sm:text-base line-clamp-2 mb-2 group-hover:text-primary transition-colors">{product.title}</p>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs font-medium px-2 py-1">
                          {product.platform}
                        </Badge>
                        {product.category && (
                          <Badge variant="secondary" className="text-xs font-medium px-2 py-1">
                            {product.category}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-left sm:text-right flex-shrink-0">
                    <div className="flex flex-col items-start sm:items-end gap-1">
                      {product.discountedPrice && (
                        <p className="font-bold text-primary text-lg">₹{product.discountedPrice}</p>
                      )}
                      {product.originalPrice && product.discountedPrice && (
                        <div className="flex items-center gap-2">
                          <p className="text-xs text-muted-foreground line-through">₹{product.originalPrice}</p>
                          {product.discountPercentage && (
                            <Badge variant="destructive" className="text-xs font-bold">
                              {product.discountPercentage}% OFF
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
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