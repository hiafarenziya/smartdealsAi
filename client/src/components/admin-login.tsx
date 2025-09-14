import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Lock, LogIn, Loader2 } from "lucide-react";

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

interface LoginData {
  username: string;
  password: string;
}

export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const { toast } = useToast();
  const { login } = useAuth();
  
  const form = useForm<LoginData>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginData) => {
      console.log('🔐 AdminLogin: Starting login process...');
      const result = await login(data);
      console.log('🔐 AdminLogin: Login result:', result);
      
      if (!result.success) {
        throw new Error(result.error || 'Login failed');
      }
      
      return result;
    },
    onSuccess: () => {
      console.log('🔐 AdminLogin: Login successful!');
      toast({
        title: "Login Successful",
        description: "Welcome to the admin panel!",
      });
      onLoginSuccess();
    },
    onError: (error: any) => {
      console.log('🔐 AdminLogin: Login failed:', error);
      toast({
        title: "Login Failed",
        description: error.message || "Invalid username or password. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: LoginData) => {
    console.log('🔐 AdminLogin: Form submitted with data:', { username: data.username, password: '[HIDDEN]' });
    loginMutation.mutate(data);
  };

  return (
    <div className="max-w-md mx-auto bg-card border border-border rounded-2xl p-8 glass-effect mb-8">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-destructive to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Lock className="text-2xl text-white" />
        </div>
        <h3 className="text-xl font-semibold">Admin Access</h3>
        <p className="text-muted-foreground">Enter credentials to manage products</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" data-testid="admin-login-form">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter admin username" 
                    className="bg-background border-border"
                    data-testid="input-username"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input 
                    type="password"
                    placeholder="Enter admin password" 
                    className="bg-background border-border"
                    data-testid="input-password"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-destructive to-red-600 hover:from-red-600 hover:to-destructive text-white py-3 rounded-lg font-medium transition-all duration-300"
            disabled={loginMutation.isPending}
            data-testid="login-button"
          >
            {loginMutation.isPending ? (
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
            ) : (
              <LogIn className="mr-2 w-4 h-4" />
            )}
            Login to Admin Panel
          </Button>
        </form>
      </Form>
    </div>
  );
}
