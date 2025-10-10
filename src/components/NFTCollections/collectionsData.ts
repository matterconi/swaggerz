import { Collection } from './types';

export const collections: Collection[] = [
  {
    id: 1,
    badge: "Collezione Primavera",
    badgeColor: "emerald",
    title: "Urban Streetwear",
    subtitle: "Spring Collection",
    description: "Scopri la nuova collezione di abbigliamento streetwear. Ogni acquisto include un NFT esclusivo autenticato sulla blockchain.",
    price: "€89",
    pieces: "150",
    nftLabel: "+ NFT",
    href: "/collection/urban-streetwear",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80"
    ],
    gradientFrom: "emerald-500/25",
    gradientVia: "green-500/15",
    accentGradient: "from-green-400/10 via-emerald-500/12 to-teal-500/10",
    buttonGradient: "bg-[conic-gradient(from_90deg_at_50%_50%,#10b981_0%,#111111_50%,#10b981_100%)]",
    buttonHoverColor: "#10b981"
  },
  {
    id: 2,
    badge: "Collezione Estate",
    badgeColor: "cyan",
    title: "Summer Vibes",
    subtitle: "Beach Collection",
    description: "Abbigliamento estivo premium con design unici. Ottieni il tuo NFT digitale che certifica l'autenticità del prodotto.",
    price: "€69",
    pieces: "200",
    nftLabel: "+ NFT",
    href: "/collection/summer-vibes",
    images: [
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80",
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=600&q=80",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80"
    ],
    gradientFrom: "cyan-500/25",
    gradientVia: "blue-500/15",
    accentGradient: "from-cyan-400/10 via-blue-500/12 to-sky-500/10",
    buttonGradient: "bg-[conic-gradient(from_90deg_at_50%_50%,#06b6d4_0%,#111111_50%,#06b6d4_100%)]",
    buttonHoverColor: "#06b6d4"
  },
  {
    id: 3,
    badge: "Collezione Autunno",
    badgeColor: "orange",
    title: "Cozy Essentials",
    subtitle: "Fall Collection",
    description: "Capi essenziali per l'autunno con materiali premium. Certificato NFT incluso per garantire l'esclusività del tuo acquisto.",
    price: "€99",
    pieces: "120",
    nftLabel: "+ NFT",
    href: "/collection/cozy-essentials",
    images: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80",
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=600&q=80"
    ],
    gradientFrom: "orange-500/25",
    gradientVia: "amber-500/15",
    accentGradient: "from-orange-400/10 via-amber-500/12 to-yellow-500/10",
    buttonGradient: "bg-[conic-gradient(from_90deg_at_50%_50%,#f97316_0%,#111111_50%,#f97316_100%)]",
    buttonHoverColor: "#f97316"
  },
  {
    id: 4,
    badge: "Collezione Inverno",
    badgeColor: "purple",
    title: "Winter Luxe",
    subtitle: "Premium Collection",
    description: "Eleganza invernale con tecnologia blockchain. Ogni capo è accompagnato da un NFT che garantisce autenticità e rarità.",
    price: "€129",
    pieces: "80",
    nftLabel: "+ NFT",
    href: "/collection/winter-luxe",
    images: [
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80",
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80"
    ],
    gradientFrom: "purple-500/25",
    gradientVia: "violet-500/15",
    accentGradient: "from-purple-400/10 via-violet-500/12 to-fuchsia-500/10",
    buttonGradient: "bg-[conic-gradient(from_90deg_at_50%_50%,#a855f7_0%,#111111_50%,#a855f7_100%)]",
    buttonHoverColor: "#a855f7"
  }
];
