// clerk auth 
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

// Clerk authentication middleware
export const requireAuth = ClerkExpressRequireAuth({
  onError: (error) => {
    console.error('Clerk Auth Error:', error);
  }
});

// Optional auth middleware for routes that can work with or without auth
export const optionalAuth = ClerkExpressRequireAuth({
  onError: () => {
    // Silently continue without throwing error
  }
});