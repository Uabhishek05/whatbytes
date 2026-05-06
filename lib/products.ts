export type Product = {
  id: string;
  title: string;
  brand: string;
  category: string;
  price: number;
  rating: number;
  reviewCount: number;
  description: string;
  image: string;
  accent: string;
  specs: string[];
};

export const products: Product[] = [
  {
    id: "running-shoes",
    title: "Running Shoes",
    brand: "Stride",
    category: "Clothing",
    price: 99,
    rating: 4.5,
    reviewCount: 176,
    description:
      "Breathable everyday running shoes with a cushioned sole, lightweight knit upper, and reliable grip for long walks or training sessions.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    accent: "#EEF8FF",
    specs: ["Cushioned sole", "Mesh upper", "Daily training fit"]
  },
  {
    id: "wireless-headphones",
    title: "Wireless Headphones",
    brand: "SonicLab",
    category: "Electronics",
    price: 199,
    rating: 4.7,
    reviewCount: 238,
    description:
      "Comfortable wireless headphones with deep bass, soft ear cushions, and long battery life for work, travel, and workouts.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    accent: "#F3F8FF",
    specs: ["40-hour battery", "Bluetooth 5.3", "Padded earcups"]
  },
  {
    id: "backpack",
    title: "Backpack",
    brand: "NomadKit",
    category: "Home",
    price: 129,
    rating: 4.4,
    reviewCount: 112,
    description:
      "Minimal backpack with structured storage, a padded laptop section, and a clean city-ready silhouette.",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
    accent: "#F3F7F9",
    specs: ["Laptop sleeve", "Water resistant", "Daily carry pockets"]
  },
  {
    id: "smartwatch",
    title: "Smartwatch",
    brand: "FitNova",
    category: "Electronics",
    price: 249,
    rating: 4.6,
    reviewCount: 184,
    description:
      "A lightweight smartwatch with a sharp display, activity tracking, quick notifications, and multi-day battery life.",
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80",
    accent: "#F3F8EE",
    specs: ["Health tracking", "AMOLED display", "7-day battery"]
  },
  {
    id: "sunglasses",
    title: "Sunglasses",
    brand: "UrbanShade",
    category: "Clothing",
    price: 149,
    rating: 4.3,
    reviewCount: 95,
    description:
      "Matte-frame sunglasses with UV protection, durable hinges, and a versatile shape that works with everyday outfits.",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80",
    accent: "#F7F7F7",
    specs: ["UV400 lenses", "Matte frame", "Protective pouch"]
  },
  {
    id: "digital-camera",
    title: "Digital Camera",
    brand: "PixelWorks",
    category: "Electronics",
    price: 499,
    rating: 4.5,
    reviewCount: 131,
    description:
      "Compact digital camera with crisp image capture, simple controls, and dependable autofocus for trips and everyday content.",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
    accent: "#F1F4F8",
    specs: ["24MP sensor", "Autofocus", "4K video"]
  },
  {
    id: "t-shirt",
    title: "T-shirt",
    brand: "CottonCrew",
    category: "Clothing",
    price: 29,
    rating: 4.2,
    reviewCount: 82,
    description:
      "Soft cotton T-shirt with a relaxed fit, clean stitching, and an easy solid color for daily wear.",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    accent: "#EEF6FB",
    specs: ["100% cotton", "Relaxed fit", "Machine washable"]
  },
  {
    id: "smartphone",
    title: "Smartphone",
    brand: "MobiCore",
    category: "Electronics",
    price: 699,
    rating: 4.7,
    reviewCount: 328,
    description:
      "A sleek smartphone with a vibrant display, fast processor, capable camera system, and all-day battery life.",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80",
    accent: "#EEF6FF",
    specs: ["OLED display", "Fast charging", "Triple camera"]
  }
];

export const categories = Array.from(new Set(products.map((product) => product.category)));
export const brands = Array.from(new Set(products.map((product) => product.brand)));

export const priceBounds = {
  min: Math.min(...products.map((product) => product.price)),
  max: Math.max(...products.map((product) => product.price))
};

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(price);
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}
