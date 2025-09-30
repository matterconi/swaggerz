import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Slider from "@/components/Slider";
import InfiniteScrollBanner from "@/components/InfiniteScrollBanner";
import GalleryStrip from "@/components/Gallery/GalleryStrip";
import { getDb } from "@/db";
import { products } from "@/db/schema";
import HeroSection from "@/components/Hero";
import { CardProps } from "@/components/Card";

// Funzione per creare NFT mock dalle categorie
function createMockNFTs(baseItems: any[], category: string, count: number = 6): CardProps[] {
  return baseItems.slice(0, count).map((item, index) => ({
    title: `${category} NFT #${index + 1}`,
    description: `Una collezione esclusiva di NFT ${category.toLowerCase()} con dettagli unici e arte straordinaria.`,
    imageSrc: index % 4 === 0 ? '/shoes/shoe-1.jpg' :
               index % 4 === 1 ? '/shoes/shoe-2.webp' :
               index % 4 === 2 ? '/trending-1.png' : '/trending-2.png',
    imageAlt: `${category} NFT ${index + 1}`,
    price: `${(Math.random() * 5 + 0.5).toFixed(2)} ETH`,
    originalPrice: Math.random() > 0.7 ? `${(Math.random() * 2 + 6).toFixed(2)} ETH` : undefined,
    href: `/nft/${item.id || index}`,
    badgeText: Math.random() > 0.8 ? "Hot" : undefined,
    isNew: Math.random() > 0.7,
  }));
}

export default async function Home() {
  const db = getDb();
  const items = await db.select().from(products).orderBy(products.createdAt);

  // Creazione delle preview per le strisce (meno elementi per la homepage)
  const trendingNFTs = createMockNFTs(items, "Trending", 6);
  const bestSellingNFTs = createMockNFTs(items, "Best Seller", 6);
  const newArrivalsNFTs = createMockNFTs(items, "New Drop", 6);

  return (
    <div className="min-h-screen bg-[var(--color-light-100)] text-[var(--color-dark-900)] max-w-[100vw]">
      <Navbar />
      <HeroSection />
      <InfiniteScrollBanner />

      {/* Gallery Preview Strips */}
      <div className="space-y-0">
        <GalleryStrip
          title="Di Tendenza"
          subtitle="Gli NFT più popolari in questo momento"
          items={trendingNFTs}
          viewAllHref="/gallery"
          icon="flame"
        />

        <GalleryStrip
          title="Più Venduti"
          subtitle="I bestseller della nostra collezione"
          items={bestSellingNFTs}
          viewAllHref="/gallery"
          icon="trophy"
        />

        <GalleryStrip
          title="Nuovi Arrivi"
          subtitle="Le ultime creazioni appena rilasciate"
          items={newArrivalsNFTs}
          viewAllHref="/gallery"
          icon="sparkles"
        />
      </div>

      <Slider items={items} />
      <Footer />
    </div>
  );
}
