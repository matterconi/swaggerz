import { betterAuth } from 'better-auth';
import { nextCookies } from 'better-auth/next-js';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { getDb } from '@/db';
import * as schema from '@/db/schema';

// Configurazione Better Auth - SOLO LATO SERVER
export const auth = betterAuth({
  database: drizzleAdapter(getDb(), {
    schema,
    provider: 'pg',
    usePlural: true,
  }),
  
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
  
  plugins: [
    nextCookies(),
  ],
  
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 giorni
    updateAge: 60 * 60 * 24, // 1 giorno
  },
  
  user: {
    additionalFields: {
      authType: {
        type: 'string',
        defaultValue: 'oauth',
      },
    },
  },
});

// Re-export delle utilità client per comodità (opzionale)
// In questo modo puoi fare import { authClient } from '@/lib/auth' nei server components se necessario
export { authClient, authUtils } from './auth-client';