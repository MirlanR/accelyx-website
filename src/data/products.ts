export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  images: string[];
  sizes: string[];
  description: string;
  details: string[];
  isNew?: boolean;
  isSoldOut?: boolean;
};

export const products: Product[] = [
  {
    id: "heavy-oversized-hoodie",
    name: "Heavy Oversized Hoodie",
    price: 185,
    category: "Hoodies",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    description:
      "Crafted from 450gsm heavyweight cotton fleece. A defining silhouette for the CATCH man — built to endure, designed to be seen.",
    details: [
      "450gsm heavyweight cotton fleece",
      "Oversized boxy fit",
      "Dropped shoulders",
      "Ribbed cuffs and hem",
      "Double-lined hood",
      "Embroidered CATCH logo at chest",
      "Made in Portugal",
    ],
    isNew: true,
  },
  {
    id: "washed-cargo-trousers",
    name: "Washed Cargo Trousers",
    price: 210,
    category: "Trousers",
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80",
      "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=800&q=80",
    ],
    sizes: ["28", "30", "32", "34", "36"],
    description:
      "Utility-inspired cargo trousers with a modern tapered leg. Enzyme-washed for a lived-in softness that only improves over time.",
    details: [
      "100% cotton twill, enzyme-washed",
      "Tapered leg with relaxed thigh",
      "Six-pocket utility design",
      "Zip fly with button closure",
      "Adjustable waistband tabs",
      "CATCH woven label at waist",
      "Made in Portugal",
    ],
    isNew: true,
  },
  {
    id: "essential-long-tee",
    name: "Essential Long Sleeve Tee",
    price: 85,
    category: "T-Shirts",
    images: [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    description:
      "The foundation of the CATCH wardrobe. 220gsm supima cotton with a relaxed, elongated cut.",
    details: [
      "220gsm supima cotton",
      "Relaxed fit, elongated body",
      "Crew neck",
      "Ribbed collar and cuffs",
      "CATCH logo print at back neck",
      "Made in Portugal",
    ],
  },
  {
    id: "leather-bomber-jacket",
    name: "Leather Bomber Jacket",
    price: 650,
    category: "Jackets",
    images: [
      "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    ],
    sizes: ["S", "M", "L", "XL"],
    description:
      "Full-grain leather bomber with a vintage-inspired silhouette. The centrepiece of the CATCH outerwear collection.",
    details: [
      "Full-grain cowhide leather",
      "Viscose lining",
      "Rib-knit collar, cuffs and hem",
      "Two front slash pockets",
      "Interior zip pocket",
      "YKK hardware throughout",
      "Made in Italy",
    ],
    isNew: true,
  },
  {
    id: "relaxed-denim-jacket",
    name: "Relaxed Denim Jacket",
    price: 275,
    category: "Jackets",
    images: [
      "https://images.unsplash.com/photo-1601333155851-a2ac54e9c3e6?w=800&q=80",
      "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    description:
      "14oz selvedge denim in a relaxed, boxy cut. Stonewashed to achieve a faded vintage tone.",
    details: [
      "14oz Japanese selvedge denim",
      "Stonewash treatment",
      "Boxy, relaxed fit",
      "Two chest patch pockets",
      "Two side pockets",
      "YKK button closure",
      "Made in Japan",
    ],
  },
  {
    id: "fleece-zip-up",
    name: "Polar Fleece Zip-Up",
    price: 155,
    category: "Hoodies",
    images: [
      "https://images.unsplash.com/photo-1580331452831-fe1b9fc131a1?w=800&q=80",
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    description:
      "Recycled polar fleece zip-up in a relaxed silhouette. Functional warmth with a refined edge.",
    details: [
      "300gsm recycled polar fleece",
      "Full-length YKK zip",
      "Stand collar",
      "Two zip side pockets",
      "Relaxed fit",
      "CATCH tonal embroidery at chest",
      "Made in Portugal",
    ],
  },
  {
    id: "straight-leg-jeans",
    name: "Straight Leg Jeans",
    price: 195,
    originalPrice: 240,
    category: "Trousers",
    images: [
      "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=800&q=80",
      "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=800&q=80",
    ],
    sizes: ["28", "30", "32", "34", "36"],
    description:
      "Classic five-pocket straight leg in 12oz raw denim. A wardrobe cornerstone that ages beautifully.",
    details: [
      "12oz raw selvedge denim",
      "Straight leg, mid-rise",
      "Five-pocket construction",
      "Zip fly with button",
      "Red CATCH selvedge ID",
      "Made in Japan",
    ],
  },
  {
    id: "graphic-tee-vol1",
    name: "Graphic Tee — Vol. I",
    price: 75,
    category: "T-Shirts",
    images: [
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    description:
      "Limited run graphic tee featuring original CATCH artwork. 200gsm heavyweight cotton with a boxy cut.",
    details: [
      "200gsm heavyweight cotton",
      "Boxy, oversized fit",
      "Screen printed original artwork",
      "Crew neck",
      "Double-needle hem",
      "Made in Portugal",
    ],
    isNew: true,
  },
];

export const categories = ["All", "T-Shirts", "Hoodies", "Trousers", "Jackets"];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "All") return products;
  return products.filter((p) => p.category === category);
}
