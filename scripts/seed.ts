// scripts/seed.ts
import dotenv from 'dotenv';
import path from 'path';

// Carica esplicitamente .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import { getDb } from '@/db';
import { products } from '@/db/schema';

async function main() {
	console.log('DATABASE_URL caricata:', process.env.DATABASE_URL ? 'OK' : 'MANCANTE');
	
	const db = getDb();
	const items = [
		{
			title: 'Nike Air Force 1',
			description: 'Classic all-white leather sneakers with timeless style.',
			priceCents: 9999,
			imageUrl: 'https://images.nike.com/af1.jpg',
		},
		{
			title: 'Nike Air Max 270',
			description: 'Breathable mesh upper with large Air unit for cushioning.',
			priceCents: 14999,
			imageUrl: 'https://images.nike.com/airmax270.jpg',
		},
		{
			title: 'Nike Dunk Low',
			description: 'Iconic low-top silhouette inspired by 80s basketball.',
			priceCents: 11999,
			imageUrl: 'https://images.nike.com/dunklow.jpg',
		},
		{
			title: 'Nike Pegasus 41',
			description: 'Daily trainer with responsive cushioning for road running.',
			priceCents: 12999,
			imageUrl: 'https://images.nike.com/pegasus41.jpg',
		},
	];

	await db.insert(products).values(items);
	console.log(`Inserted ${items.length} products successfully!`);
	process.exit(0);
}

main().catch((err) => {
	console.error('Error seeding database:', err);
	process.exit(1);
});