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
    // Check for existing session on initialization
    this.checkAuthStatus();
  }

  private checkAuthStatus() {
    // Check localStorage for auth state
    const storedAuth = localStorage.getItem('admin_auth');
    if (storedAuth) {
      try {
        const parsed = JSON.parse(storedAuth);
        if (parsed.isAuthenticated && parsed.timestamp) {
          // Check if the auth is still valid (24 hours)
          const now = Date.now();
          const authTime = parsed.timestamp;
          const twentyFourHours = 24 * 60 * 60 * 1000;
          
          if (now - authTime < twentyFourHours) {
            this.authState = {
              isAuthenticated: true,
              user: parsed.user,
            };
            this.notifyListeners();
          } else {
            // Clear expired auth
            this.clearAuth();
          }
        }
      } catch (error) {
        console.error('Error parsing stored auth:', error);
        this.clearAuth();
      }
    }
  }

  async login(credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await apiRequest("POST", "/api/admin/login", credentials);
      const data = await response.json();
      
      if (data.authenticated) {
        this.authState = {
          isAuthenticated: true,
          user: { username: credentials.username },
        };
        
        // Store auth state in localStorage
        const authData = {
          isAuthenticated: true,
          user: { username: credentials.username },
          timestamp: Date.now(),
        };
        localStorage.setItem('admin_auth', JSON.stringify(authData));
        
        this.notifyListeners();
        return { success: true };
      } else {
        return { success: false, error: data.message || 'Authentication failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
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
    return this.authState.isAuthenticated && this.authState.user?.username === 'admin';
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
