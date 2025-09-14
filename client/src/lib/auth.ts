import { useState, useEffect } from "react";
import { apiRequest } from "./queryClient";

interface LoginCredentials {
  username: string;
  password: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user?: {
    username: string;
  };
}

class AuthManager {
  private authState: AuthState = {
    isAuthenticated: false,
  };

  private listeners: ((state: AuthState) => void)[] = [];

  constructor() {
    console.log('🚀 AuthManager constructor called');
    // Check for existing session on initialization
    // Use setTimeout to ensure localStorage is available and DOM is ready
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      // Check immediately if localStorage is available
      this.checkAuthStatus();
      
      // Also check after a small delay to handle any async loading
      setTimeout(() => {
        console.log('🚀 Delayed auth check...');
        this.checkAuthStatus();
      }, 100);
    }
  }

  checkAuthStatus() {
    try {
      console.log('🔍 Checking auth status...');
      
      // Check if localStorage is available
      if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
        console.log('❌ localStorage not available');
        return;
      }
      
      // Check localStorage for auth state
      const storedAuth = localStorage.getItem('admin_auth');
      console.log('🔍 Raw localStorage data:', storedAuth);
      
      if (storedAuth && storedAuth !== 'null' && storedAuth !== 'undefined') {
        try {
          const parsed = JSON.parse(storedAuth);
          console.log('🔍 Parsed auth data:', parsed);
          
          if (parsed && parsed.isAuthenticated && parsed.timestamp && parsed.user) {
            // Check if the auth is still valid (24 hours)
            const now = Date.now();
            const authTime = parsed.timestamp;
            const twentyFourHours = 24 * 60 * 60 * 1000;
            const timeRemaining = twentyFourHours - (now - authTime);
            
            console.log('🔍 Time since auth:', (now - authTime) / 1000 / 60, 'minutes');
            console.log('🔍 Time remaining:', timeRemaining / 1000 / 60, 'minutes');
            
            if (now - authTime < twentyFourHours) {
              this.authState = {
                isAuthenticated: true,
                user: parsed.user,
              };
              console.log('✅ Auth restored from localStorage:', this.authState);
              console.log('✅ User details:', this.authState.user);
              this.notifyListeners();
              return;
            } else {
              // Clear expired auth
              console.log('❌ Auth expired, clearing...');
              this.clearAuth();
              return;
            }
          } else {
            // Invalid auth data structure
            console.log('❌ Invalid auth data structure:', parsed);
            this.clearAuth();
            return;
          }
        } catch (parseError) {
          console.error('❌ JSON parse error:', parseError);
          this.clearAuth();
          return;
        }
      } else {
        console.log('❌ No valid auth data found in localStorage');
      }
      
      // If we reach here, no valid auth was found
      this.authState = {
        isAuthenticated: false,
      };
    } catch (error) {
      console.error('❌ Error in checkAuthStatus:', error);
      this.clearAuth();
    }
  }

  async login(credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> {
    try {
      console.log('🔐 Starting login process with username:', credentials.username);
      const response = await apiRequest("POST", "/api/admin/login", credentials);
      const data = await response.json();
      console.log('🔐 Login response:', data);
      
      if (data.authenticated) {
        const authState = {
          isAuthenticated: true,
          user: { username: credentials.username },
        };
        
        this.authState = authState;
        console.log('🔐 Auth state set to:', this.authState);
        
        // Store auth state in localStorage
        const authData = {
          isAuthenticated: true,
          user: { username: credentials.username },
          timestamp: Date.now(),
        };
        
        localStorage.setItem('admin_auth', JSON.stringify(authData));
        console.log('🔐 Auth data stored in localStorage:', authData);
        
        // Verify storage
        const stored = localStorage.getItem('admin_auth');
        console.log('🔐 Verification - localStorage contents:', stored);
        
        this.notifyListeners();
        console.log('🔐 Listeners notified. Current state:', this.authState);
        
        return { success: true };
      } else {
        console.log('🔐 Authentication failed:', data.message);
        return { success: false, error: data.message || 'Authentication failed' };
      }
    } catch (error) {
      console.error('🔐 Login error:', error);
      return { success: false, error: 'Network error or server unavailable' };
    }
  }

  logout() {
    this.authState = {
      isAuthenticated: false,
    };
    this.clearAuth();
    this.notifyListeners();
  }

  private clearAuth() {
    console.log('🧹 clearAuth called - clearing localStorage');
    localStorage.removeItem('admin_auth');
  }

  getAuthState(): AuthState {
    return { ...this.authState };
  }

  isAuthenticated(): boolean {
    return this.authState.isAuthenticated;
  }

  subscribe(listener: (state: AuthState) => void): () => void {
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.authState));
  }

  // Utility method to check if user has admin privileges
  hasAdminAccess(): boolean {
    const hasAccess = this.authState.isAuthenticated && this.authState.user?.username === 'afarenziya@gmail.com';
    console.log('🔑 hasAdminAccess check:', {
      isAuthenticated: this.authState.isAuthenticated,
      username: this.authState.user?.username,
      hasAccess: hasAccess
    });
    return hasAccess;
  }

  // Method to refresh auth status (useful for checking session validity)
  async refreshAuth(): Promise<boolean> {
    if (!this.authState.isAuthenticated) {
      return false;
    }

    try {
      // This could be expanded to include a token refresh endpoint
      const storedAuth = localStorage.getItem('admin_auth');
      if (storedAuth) {
        const parsed = JSON.parse(storedAuth);
        const now = Date.now();
        const authTime = parsed.timestamp;
        const twentyFourHours = 24 * 60 * 60 * 1000;
        
        if (now - authTime >= twentyFourHours) {
          this.logout();
          return false;
        }
      }
      
      return true;
    } catch (error) {
      console.error('Error refreshing auth:', error);
      this.logout();
      return false;
    }
  }
}

// Create a singleton instance
export const authManager = new AuthManager();

// Hook for React components to use auth state
export function useAuth() {
  const [authState, setAuthState] = useState(authManager.getAuthState());

  useEffect(() => {
    // Re-check auth status when component mounts
    authManager.checkAuthStatus();
    
    const unsubscribe = authManager.subscribe(setAuthState);
    return unsubscribe;
  }, []);

  return {
    ...authState,
    login: authManager.login.bind(authManager),
    logout: authManager.logout.bind(authManager),
    hasAdminAccess: authManager.hasAdminAccess.bind(authManager),
    refreshAuth: authManager.refreshAuth.bind(authManager),
  };
}

// Export auth functions for non-React usage
export const {
  login,
  logout,
  isAuthenticated,
  hasAdminAccess,
  refreshAuth,
} = authManager;
