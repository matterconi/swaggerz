import { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client'; // ✅ Solo client-side imports

interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null;
  authType?: string;
}

interface SessionData {
  id: string;
  userId: string;
  expiresAt: Date;
  token: string;
  createdAt: Date;
  updatedAt: Date;
  ipAddress?: string;
  userAgent?: string;
}

interface Session {
  user: User;
  session: SessionData;
}

export function useAuth() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carica la sessione corrente
  useEffect(() => {
    const getSession = async () => {
      try {
        setLoading(true);
        const session = await authClient.getSession();
        setData(session.data);
        setError(null);
      } catch (err) {
        console.error('Errore nel caricamento della sessione:', err);
        setError('Errore nel caricamento della sessione');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    getSession();
  }, []);

  // Login con provider OAuth
  const signIn = async (provider: 'google' | 'github') => {
    try {
      setError(null);
      await authClient.signIn.social({
        provider,
        callbackURL: '/dashboard', // Redirect dopo login
      });
    } catch (err) {
      console.error(`Errore login ${provider}:`, err);
      setError(`Errore durante il login con ${provider}`);
    }
  };

  // Logout
  const signOut = async () => {
    try {
      setError(null);
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            setData(null);
            window.location.href = '/'; // Redirect dopo logout
          },
        },
      });
    } catch (err) {
      console.error('Errore logout:', err);
      setError('Errore durante il logout');
    }
  };

  // Refresh della sessione
  const refresh = async () => {
    try {
      setError(null);
      const session = await authClient.getSession();
      setData(session.data);
    } catch (err) {
      console.error('Errore refresh sessione:', err);
      setError('Errore nel refresh della sessione');
    }
  };

  return {
    // Dati
    user: data?.user || null,
    session: data?.session || null,
    loading,
    error,
        
    // Stato
    isAuthenticated: !!data?.user,
    isLoading: loading,
        
    // Azioni
    signIn,
    signOut,
    refresh,
  };
}