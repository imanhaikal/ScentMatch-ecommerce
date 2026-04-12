export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  artisan: string;
  price: number;
  images: string[];
  description: string;
  category: "Extract" | "Parfum" | "Cologne";
  stock: number;
  notes: {
    top: string;
    heart: string;
    base: string;
  };
  reviews: ProductReview[];
}

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Santal Vol. 1",
    artisan: "Le Labo",
    price: 310,
    images: [
      "/santal-vol-1.jpg",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop",
    ],
    description: "A definitive exploration of Australian sandalwood, wrapped in a smoldering cocoon of cedar and cardamom. It evokes the feeling of an open fire under a starless sky. Assertive, timeless, and completely inescapable.",
    category: "Extract",
    stock: 15,
    notes: { top: "Cardamom", heart: "Iris", base: "Sandalwood" },
    reviews: [
      { id: "r1", author: "E. Thorne", rating: 5, text: "Hauntingly beautiful. It stays on the skin for days.", date: "2024-10-12" },
      { id: "r2", author: "M. Vance", rating: 4, text: "Extremely potent. A minimalist masterpiece.", date: "2024-09-28" }
    ]
  },
  {
    id: "2",
    name: "Oud Noir",
    artisan: "In-House",
    price: 245,
    images: [
      "/oud-noir.jpg",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=800&auto=format&fit=crop",
    ],
    description: "Pitch black and unyielding. Oud Noir strips away the traditional rose pairing to focus on raw, unadulterated agarwood and damp patchouli. A fragrance for those who command the room in absolute silence.",
    category: "Parfum",
    stock: 8,
    notes: { top: "Rose", heart: "Patchouli", base: "Agarwood" },
    reviews: [
      { id: "r3", author: "C. Black", rating: 5, text: "Dark, moody, and perfect. Exactly what I was looking for.", date: "2024-11-05" }
    ]
  },
  {
    id: "3",
    name: "Vetiver Bloom",
    artisan: "Artisan Co.",
    price: 180,
    images: [
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop",
    ],
    description: "An unexpected collision of sharp, acidic citrus and deep, earthy vetiver. This scent mimics the exact scent of crushed leaves in a concrete brutalist courtyard after heavy rain.",
    category: "Cologne",
    stock: 22,
    notes: { top: "Citrus", heart: "Vetiver", base: "Cedar" },
    reviews: [
      { id: "r4", author: "J. Doe", rating: 4, text: "Very sharp opening, dries down into a beautiful earthy base.", date: "2024-11-10" }
    ]
  },
  {
    id: "4",
    name: "Ghost of a Rose",
    artisan: "Lumiere",
    price: 290,
    images: [
      "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Not a traditional floral. This is the memory of a rose—withered, metallic, and cold. Crushed pink pepper and cold aldehydes give way to a translucent floral heart.",
    category: "Extract",
    stock: 4,
    notes: { top: "Pink Pepper", heart: "Metallic Rose", base: "White Musk" },
    reviews: [
      { id: "r5", author: "S. Winters", rating: 5, text: "Like walking through a garden in winter.", date: "2024-12-01" },
      { id: "r6", author: "L. Croft", rating: 5, text: "Incredible projection and sillage. Pure artistry.", date: "2024-12-15" }
    ]
  },
  {
    id: "5",
    name: "Concrete Rain",
    artisan: "Atelier Urban",
    price: 150,
    images: [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=800&auto=format&fit=crop"
    ],
    description: "The pure definition of petrichor. Ozone, wet asphalt, and a subtle hum of industrial iris. A hyper-modern skin scent that feels more like an aura than a perfume.",
    category: "Cologne",
    stock: 0,
    notes: { top: "Ozone", heart: "Iris", base: "Wet Asphalt" },
    reviews: []
  },
  {
    id: "6",
    name: "Nocturne 04",
    artisan: "Lumiere",
    price: 340,
    images: [
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=800&auto=format&fit=crop",
      "/oud-noir.jpg"
    ],
    description: "The scent of shadows. Bitter black tea leaves steeped in dark bergamot oil, resting on a bed of smoked oud. Deeply introspective.",
    category: "Extract",
    stock: 11,
    notes: { top: "Bergamot", heart: "Black Tea", base: "Oud" },
    reviews: [
      { id: "r7", author: "K. Reeves", rating: 5, text: "Mysterious. It's my new signature scent.", date: "2025-01-02" }
    ]
  }
];