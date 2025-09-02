import { betterAuth } from 'better-auth';
import { toNextJsHandler, nextCookies } from 'better-auth/next-js';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { getDb } from '@/db';
import * as schema from '@/db/schema';

const auth = betterAuth({
	secret: process.env.BETTER_AUTH_SECRET ?? 'dev',
	plugins: [nextCookies()],
	adapter: drizzleAdapter(() => getDb(), { schema, provider: 'pg', usePlural: true }),
});

export const { GET, POST } = toNextJsHandler(auth);
