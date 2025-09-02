import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Slider from "@/components/Slider";
import { getDb } from "@/db";
import { products } from "@/db/schema";
import HeroSection from "@/components/Hero";

export default async function Home() {
  const db = getDb();
  const items = await db.select().from(products).orderBy(products.createdAt);

  return (
    <div className="min-h-screen bg-[var(--color-light-100)] text-[var(--color-dark-900)]">
      <Navbar />
        <HeroSection />
        <Slider items={items} />
      <Footer />
    </div>
  );
}
