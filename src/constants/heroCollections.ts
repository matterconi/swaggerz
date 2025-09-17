export interface Collection {
  id: number;
  name: string;
  image: string;
  badge: string;
  description: string;
  price: string;
  category: string;
}

export const collections: Collection[] = [
  {
    id: 1,
    name: "URBAN FLAMES",
    image: "/rebkon-hero-image.jpeg",
    badge: "ULTIMO DROP",
    description: "Streetwear che brucia le strade con energia pura",
    price: "€89 - €159",
    category: "STREETWEAR"
  },
  {
    id: 2,
    name: "DIGITAL ART",
    image: "/DigitalArtDrop.webp",
    badge: "LIMITED EDITION",
    description: "Fusione perfetta tra tecnologia e moda urbana",
    price: "€99 - €179",
    category: "TECH WEAR"
  },
  {
    id: 3,
    name: "VINTAGE SOUL",
    image: "/VintageDrop.webp",
    badge: "RETRO VIBES",
    description: "Classico rivisitato con stile contemporaneo",
    price: "€79 - €149",
    category: "VINTAGE"
  }
];