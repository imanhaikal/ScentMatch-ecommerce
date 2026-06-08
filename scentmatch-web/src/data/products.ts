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
    "id": "perfume-1",
    "name": "Red",
    "artisan": "Dumont",
    "price": 150,
    "images": [
      "https://images.unsplash.com/photo-1619994403073-2cec844b8e63?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518331566-07612711ff60?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Dumont. Perfect for Male seeking a Scent scent with Strong longevity.",
    "category": "Parfum",
    "stock": 20,
    "notes": {
      "top": "Scent",
      "heart": "Aromatic",
      "base": "Strong"
    },
    "reviews": []
  },
  {
    "id": "perfume-2",
    "name": "Homme",
    "artisan": "Dumont",
    "price": 151,
    "images": [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601244840899-72c676afba7b?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Dumont. Perfect for Male seeking a Scent scent with Strong longevity.",
    "category": "Parfum",
    "stock": 21,
    "notes": {
      "top": "Scent",
      "heart": "Aromatic",
      "base": "Strong"
    },
    "reviews": []
  },
  {
    "id": "perfume-3",
    "name": "White",
    "artisan": "Dumont",
    "price": 152,
    "images": [
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Dumont. Perfect for Unisex seeking a Scent scent with Strong longevity.",
    "category": "Parfum",
    "stock": 22,
    "notes": {
      "top": "Scent",
      "heart": "Aromatic",
      "base": "Strong"
    },
    "reviews": []
  },
  {
    "id": "perfume-4",
    "name": "Blue",
    "artisan": "Dumont",
    "price": 153,
    "images": [
      "https://images.unsplash.com/photo-1595535373192-fc8938b27529?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594913785124-71239c4f5260?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Dumont. Perfect for Unisex seeking a Scent scent with Strong longevity.",
    "category": "Parfum",
    "stock": 23,
    "notes": {
      "top": "Scent",
      "heart": "Aromatic",
      "base": "Strong"
    },
    "reviews": []
  },
  {
    "id": "perfume-5",
    "name": "Green",
    "artisan": "Dumont",
    "price": 154,
    "images": [
      "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Dumont. Perfect for Unisex seeking a Scent scent with Strong longevity.",
    "category": "Parfum",
    "stock": 24,
    "notes": {
      "top": "Scent",
      "heart": "Aromatic",
      "base": "Strong"
    },
    "reviews": []
  },
  {
    "id": "perfume-6",
    "name": "Platinum",
    "artisan": "Dumont",
    "price": 155,
    "images": [
      "https://images.unsplash.com/photo-1619994403073-2cec844b8e63?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Dumont. Perfect for Male seeking a Pleaser scent with Strong longevity.",
    "category": "Parfum",
    "stock": 25,
    "notes": {
      "top": "Pleaser",
      "heart": "Aromatic",
      "base": "Strong"
    },
    "reviews": []
  },
  {
    "id": "perfume-7",
    "name": "Intense",
    "artisan": "Dumont",
    "price": 156,
    "images": [
      "https://images.unsplash.com/photo-1590156546946-ce55a12a6a5d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Dumont. Perfect for Male seeking a Spicy scent with Strong longevity.",
    "category": "Parfum",
    "stock": 26,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Strong"
    },
    "reviews": []
  },
  {
    "id": "perfume-8",
    "name": "Black",
    "artisan": "Dumont",
    "price": 157,
    "images": [
      "https://images.unsplash.com/photo-1590156546946-ce55a12a6a5d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598516086708-41c305c08d17?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Dumont. Perfect for Male seeking a Spicy scent with Strong longevity.",
    "category": "Parfum",
    "stock": 27,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Strong"
    },
    "reviews": []
  },
  {
    "id": "perfume-9",
    "name": "Oros",
    "artisan": "Dumont",
    "price": 158,
    "images": [
      "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622618991746-fe6004db3a47?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Dumont. Perfect for Unisex seeking a Vanilla scent with Medium longevity.",
    "category": "Parfum",
    "stock": 28,
    "notes": {
      "top": "Vanilla",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-10",
    "name": "Epic",
    "artisan": "Dumont",
    "price": 159,
    "images": [
      "https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601244840899-72c676afba7b?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Dumont. Perfect for Male seeking a Aromatic scent with Medium longevity.",
    "category": "Parfum",
    "stock": 29,
    "notes": {
      "top": "Aromatic",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-11",
    "name": "Man",
    "artisan": "Armaf",
    "price": 160,
    "images": [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1592914610354-fd354d45fe82?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDT fragrance by Armaf. Perfect for Male seeking a Spicy scent with Strong longevity.",
    "category": "Cologne",
    "stock": 30,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Strong"
    },
    "reviews": []
  },
  {
    "id": "perfume-12",
    "name": "Parfum",
    "artisan": "Armaf",
    "price": 161,
    "images": [
      "https://images.unsplash.com/photo-1619994403073-2cec844b8e63?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted PARFUM fragrance by Armaf. Perfect for Male seeking a Spicy scent with Strong longevity.",
    "category": "Extract",
    "stock": 31,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Strong"
    },
    "reviews": []
  },
  {
    "id": "perfume-13",
    "name": "Edp",
    "artisan": "Armaf",
    "price": 162,
    "images": [
      "https://images.unsplash.com/photo-1590156546946-ce55a12a6a5d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518331566-07612711ff60?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Armaf. Perfect for Male seeking a Spicy scent with Strong longevity.",
    "category": "Parfum",
    "stock": 32,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Strong"
    },
    "reviews": []
  },
  {
    "id": "perfume-14",
    "name": "Edition",
    "artisan": "Armaf",
    "price": 163,
    "images": [
      "https://images.unsplash.com/photo-1595535373192-fc8938b27529?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Armaf. Perfect for Male seeking a Spicy scent with Strong longevity.",
    "category": "Parfum",
    "stock": 33,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Strong"
    },
    "reviews": []
  },
  {
    "id": "perfume-15",
    "name": "Women",
    "artisan": "Armaf",
    "price": 164,
    "images": [
      "https://images.unsplash.com/photo-1595425970377-c9703c48657a?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1592494911762-d2f1f5f3e911?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Armaf. Perfect for Female seeking a Fruity scent with Medium longevity.",
    "category": "Parfum",
    "stock": 34,
    "notes": {
      "top": "Fruity",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-16",
    "name": "Man",
    "artisan": "Armaf",
    "price": 165,
    "images": [
      "https://images.unsplash.com/photo-1615529183492-c4e047ceb4d5?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598516086708-41c305c08d17?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDT fragrance by Armaf. Perfect for Male seeking a Aromatic scent with Medium longevity.",
    "category": "Cologne",
    "stock": 35,
    "notes": {
      "top": "Aromatic",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-17",
    "name": "Yum",
    "artisan": "Armaf",
    "price": 166,
    "images": [
      "https://images.unsplash.com/photo-1563170351-be82bc88ea6f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595425970377-c9703c48657a?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Armaf. Perfect for Female seeking a Floral scent with Medium longevity.",
    "category": "Parfum",
    "stock": 36,
    "notes": {
      "top": "Floral",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-18",
    "name": "Sillage",
    "artisan": "Armaf",
    "price": 167,
    "images": [
      "https://images.unsplash.com/photo-1592494911762-d2f1f5f3e911?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518331566-07612711ff60?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Armaf. Perfect for Male seeking a Spicy scent with Medium longevity.",
    "category": "Parfum",
    "stock": 37,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-19",
    "name": "Imperial",
    "artisan": "Armaf",
    "price": 168,
    "images": [
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1592914610354-fd354d45fe82?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Armaf. Perfect for Male seeking a Spicy scent with Medium longevity.",
    "category": "Parfum",
    "stock": 38,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-20",
    "name": "Untold",
    "artisan": "Armaf",
    "price": 169,
    "images": [
      "https://images.unsplash.com/photo-1615529183492-c4e047ceb4d5?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Armaf. Perfect for Male seeking a Aromatic scent with Medium longevity.",
    "category": "Parfum",
    "stock": 39,
    "notes": {
      "top": "Aromatic",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-21",
    "name": "Hunter",
    "artisan": "Armaf",
    "price": 170,
    "images": [
      "https://images.unsplash.com/photo-1595535373192-fc8938b27529?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDT fragrance by Armaf. Perfect for Male seeking a Spicy scent with Medium longevity.",
    "category": "Cologne",
    "stock": 40,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-22",
    "name": "Intense",
    "artisan": "Armaf",
    "price": 171,
    "images": [
      "https://images.unsplash.com/photo-1592494911762-d2f1f5f3e911?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Armaf. Perfect for Male seeking a Spicy scent with Strong longevity.",
    "category": "Parfum",
    "stock": 41,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Strong"
    },
    "reviews": []
  },
  {
    "id": "perfume-23",
    "name": "Marine",
    "artisan": "Armaf",
    "price": 172,
    "images": [
      "https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Armaf. Perfect for Male seeking a Scent scent with Medium longevity.",
    "category": "Parfum",
    "stock": 42,
    "notes": {
      "top": "Scent",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-24",
    "name": "Ventana",
    "artisan": "Armaf",
    "price": 173,
    "images": [
      "https://images.unsplash.com/photo-1595535373192-fc8938b27529?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1619994403073-2cec844b8e63?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDT fragrance by Armaf. Perfect for Male seeking a Scent scent with Medium longevity.",
    "category": "Cologne",
    "stock": 43,
    "notes": {
      "top": "Scent",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-25",
    "name": "Elixr",
    "artisan": "Armaf",
    "price": 174,
    "images": [
      "https://images.unsplash.com/photo-1608528577891-eb055944f2e7?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598516086708-41c305c08d17?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Armaf. Perfect for Male seeking a Spicy scent with Medium longevity.",
    "category": "Parfum",
    "stock": 44,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-26",
    "name": "Milestone",
    "artisan": "Armaf",
    "price": 175,
    "images": [
      "https://images.unsplash.com/photo-1590156546946-ce55a12a6a5d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Armaf. Perfect for Male seeking a Spicy scent with Medium longevity.",
    "category": "Parfum",
    "stock": 45,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-27",
    "name": "Fresh",
    "artisan": "Armaf",
    "price": 176,
    "images": [
      "https://images.unsplash.com/photo-1595425970377-c9703c48657a?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Armaf. Perfect for Male seeking a Scent scent with Medium longevity.",
    "category": "Parfum",
    "stock": 46,
    "notes": {
      "top": "Scent",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-28",
    "name": "1",
    "artisan": "Armaf",
    "price": 177,
    "images": [
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Armaf. Perfect for Male seeking a Spicy scent with Medium longevity.",
    "category": "Parfum",
    "stock": 47,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-29",
    "name": "Legesi",
    "artisan": "Armaf",
    "price": 178,
    "images": [
      "https://images.unsplash.com/photo-1518331566-07612711ff60?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598516086708-41c305c08d17?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Armaf. Perfect for Male seeking a Aromatic scent with Medium longevity.",
    "category": "Parfum",
    "stock": 48,
    "notes": {
      "top": "Aromatic",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-30",
    "name": "Homme",
    "artisan": "Armaf",
    "price": 179,
    "images": [
      "https://images.unsplash.com/photo-1622618991746-fe6004db3a47?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563170351-be82bc88ea6f?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDT fragrance by Armaf. Perfect for Male seeking a Scent scent with Medium longevity.",
    "category": "Cologne",
    "stock": 49,
    "notes": {
      "top": "Scent",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-31",
    "name": "Homme",
    "artisan": "Armaf",
    "price": 180,
    "images": [
      "https://images.unsplash.com/photo-1598516086708-41c305c08d17?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Armaf. Perfect for Male seeking a Spicy scent with Medium longevity.",
    "category": "Parfum",
    "stock": 50,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-32",
    "name": "Edition",
    "artisan": "Armaf",
    "price": 181,
    "images": [
      "https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1592914610354-fd354d45fe82?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Armaf. Perfect for Male seeking a Spicy scent with Medium longevity.",
    "category": "Parfum",
    "stock": 51,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-33",
    "name": "Edition",
    "artisan": "Armaf",
    "price": 182,
    "images": [
      "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Armaf. Perfect for Male seeking a Spicy scent with Medium longevity.",
    "category": "Parfum",
    "stock": 52,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-34",
    "name": "Red",
    "artisan": "Armaf",
    "price": 183,
    "images": [
      "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1592494911762-d2f1f5f3e911?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Armaf. Perfect for Male seeking a Spicy scent with Medium longevity.",
    "category": "Parfum",
    "stock": 53,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-35",
    "name": "Blue",
    "artisan": "Armaf",
    "price": 184,
    "images": [
      "https://images.unsplash.com/photo-1590156546946-ce55a12a6a5d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Armaf. Perfect for Male seeking a Spicy scent with Medium longevity.",
    "category": "Parfum",
    "stock": 54,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-36",
    "name": "Black",
    "artisan": "Armaf",
    "price": 185,
    "images": [
      "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Armaf. Perfect for Male seeking a Spicy scent with Medium longevity.",
    "category": "Parfum",
    "stock": 55,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-37",
    "name": "Femme",
    "artisan": "Armaf",
    "price": 186,
    "images": [
      "https://images.unsplash.com/photo-1608528577891-eb055944f2e7?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594913785124-71239c4f5260?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Armaf. Perfect for Female seeking a Fruity scent with Medium longevity.",
    "category": "Parfum",
    "stock": 56,
    "notes": {
      "top": "Fruity",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-38",
    "name": "Him",
    "artisan": "Armaf",
    "price": 187,
    "images": [
      "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598516086708-41c305c08d17?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDT fragrance by Armaf. Perfect for Male seeking a Spicy scent with Medium longevity.",
    "category": "Cologne",
    "stock": 57,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-39",
    "name": "Edition",
    "artisan": "Armaf",
    "price": 188,
    "images": [
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518331566-07612711ff60?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDT fragrance by Armaf. Perfect for Male seeking a Spicy scent with Medium longevity.",
    "category": "Cologne",
    "stock": 58,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-40",
    "name": "Homme",
    "artisan": "Armaf",
    "price": 189,
    "images": [
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1619994403073-2cec844b8e63?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDT fragrance by Armaf. Perfect for Male seeking a Spicy scent with Medium longevity.",
    "category": "Cologne",
    "stock": 59,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-41",
    "name": "Her",
    "artisan": "Armaf",
    "price": 190,
    "images": [
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563170351-be82bc88ea6f?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Armaf. Perfect for Female seeking a Fruity scent with Medium longevity.",
    "category": "Parfum",
    "stock": 60,
    "notes": {
      "top": "Fruity",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-42",
    "name": "Blanche",
    "artisan": "Armaf",
    "price": 191,
    "images": [
      "https://images.unsplash.com/photo-1622618991746-fe6004db3a47?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDT fragrance by Armaf. Perfect for Unisex seeking a Scent scent with Medium longevity.",
    "category": "Cologne",
    "stock": 61,
    "notes": {
      "top": "Scent",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-43",
    "name": "Gold",
    "artisan": "Armaf",
    "price": 192,
    "images": [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDT fragrance by Armaf. Perfect for Male seeking a Spicy scent with Medium longevity.",
    "category": "Cologne",
    "stock": 62,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-44",
    "name": "Ascot",
    "artisan": "Armaf",
    "price": 193,
    "images": [
      "https://images.unsplash.com/photo-1608528577891-eb055944f2e7?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDT fragrance by Armaf. Perfect for Male seeking a Spicy scent with Medium longevity.",
    "category": "Cologne",
    "stock": 63,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-45",
    "name": "Adventure",
    "artisan": "Armaf",
    "price": 194,
    "images": [
      "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598516086708-41c305c08d17?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDT fragrance by Armaf. Perfect for Male seeking a Aromatic scent with Medium longevity.",
    "category": "Cologne",
    "stock": 64,
    "notes": {
      "top": "Aromatic",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-46",
    "name": "Victory",
    "artisan": "Armaf",
    "price": 195,
    "images": [
      "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608528577891-eb055944f2e7?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDT fragrance by Armaf. Perfect for Male seeking a Aromatic scent with Medium longevity.",
    "category": "Cologne",
    "stock": 65,
    "notes": {
      "top": "Aromatic",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-47",
    "name": "Blue",
    "artisan": "Armaf",
    "price": 196,
    "images": [
      "https://images.unsplash.com/photo-1594913785124-71239c4f5260?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601007746401-44755f190e29?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDT fragrance by Armaf. Perfect for Unisex seeking a Scent scent with Medium longevity.",
    "category": "Cologne",
    "stock": 66,
    "notes": {
      "top": "Scent",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-48",
    "name": "Passion",
    "artisan": "Armaf",
    "price": 197,
    "images": [
      "https://images.unsplash.com/photo-1601007746401-44755f190e29?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Armaf. Perfect for Male seeking a Spicy scent with Medium longevity.",
    "category": "Parfum",
    "stock": 67,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-49",
    "name": "Men",
    "artisan": "Armaf",
    "price": 198,
    "images": [
      "https://images.unsplash.com/photo-1594913785124-71239c4f5260?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Armaf. Perfect for Male seeking a Spicy scent with Medium longevity.",
    "category": "Parfum",
    "stock": 68,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-50",
    "name": "Women",
    "artisan": "Armaf",
    "price": 199,
    "images": [
      "https://images.unsplash.com/photo-1518331566-07612711ff60?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594913785124-71239c4f5260?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Armaf. Perfect for Female seeking a Fruity scent with Medium longevity.",
    "category": "Parfum",
    "stock": 69,
    "notes": {
      "top": "Fruity",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-51",
    "name": "Warrior",
    "artisan": "Armaf",
    "price": 200,
    "images": [
      "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDT fragrance by Armaf. Perfect for Male seeking a Spicy scent with Medium longevity.",
    "category": "Cologne",
    "stock": 20,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-52",
    "name": "Hunter",
    "artisan": "Armaf",
    "price": 201,
    "images": [
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608528577891-eb055944f2e7?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDT fragrance by Armaf. Perfect for Male seeking a Spicy scent with Medium longevity.",
    "category": "Cologne",
    "stock": 21,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-53",
    "name": "Intense",
    "artisan": "Armaf",
    "price": 202,
    "images": [
      "https://images.unsplash.com/photo-1563170351-be82bc88ea6f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601244840899-72c676afba7b?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Armaf. Perfect for Male seeking a Spicy scent with Strong longevity.",
    "category": "Parfum",
    "stock": 22,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Strong"
    },
    "reviews": []
  },
  {
    "id": "perfume-54",
    "name": "Black",
    "artisan": "Armaf",
    "price": 203,
    "images": [
      "https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601244840899-72c676afba7b?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Armaf. Perfect for Male seeking a Spicy scent with Strong longevity.",
    "category": "Parfum",
    "stock": 23,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Strong"
    },
    "reviews": []
  },
  {
    "id": "perfume-55",
    "name": "Jungle",
    "artisan": "Armaf",
    "price": 204,
    "images": [
      "https://images.unsplash.com/photo-1608528577891-eb055944f2e7?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598516086708-41c305c08d17?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Armaf. Perfect for Male seeking a Spicy scent with Medium longevity.",
    "category": "Parfum",
    "stock": 24,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-56",
    "name": "Legacy",
    "artisan": "Armaf",
    "price": 205,
    "images": [
      "https://images.unsplash.com/photo-1592494911762-d2f1f5f3e911?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598516086708-41c305c08d17?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Armaf. Perfect for Male seeking a Aromatic scent with Medium longevity.",
    "category": "Parfum",
    "stock": 25,
    "notes": {
      "top": "Aromatic",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-57",
    "name": "Women",
    "artisan": "Armaf",
    "price": 206,
    "images": [
      "https://images.unsplash.com/photo-1615529183492-c4e047ceb4d5?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Armaf. Perfect for Female seeking a Fruity scent with Medium longevity.",
    "category": "Parfum",
    "stock": 26,
    "notes": {
      "top": "Fruity",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-58",
    "name": "Men",
    "artisan": "Armaf",
    "price": 207,
    "images": [
      "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598516086708-41c305c08d17?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Armaf. Perfect for Male seeking a Spicy scent with Medium longevity.",
    "category": "Parfum",
    "stock": 27,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-59",
    "name": "Parfum",
    "artisan": "Armaf",
    "price": 208,
    "images": [
      "https://images.unsplash.com/photo-1601244840899-72c676afba7b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595425970377-c9703c48657a?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted PARFUM fragrance by Armaf. Perfect for Male seeking a Spicy scent with Strong longevity.",
    "category": "Extract",
    "stock": 28,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Strong"
    },
    "reviews": []
  },
  {
    "id": "perfume-60",
    "name": "Edition",
    "artisan": "Armaf",
    "price": 209,
    "images": [
      "https://images.unsplash.com/photo-1595535373192-fc8938b27529?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted PARFUM fragrance by Armaf. Perfect for Female seeking a Fruity scent with Strong longevity.",
    "category": "Extract",
    "stock": 29,
    "notes": {
      "top": "Fruity",
      "heart": "Aromatic",
      "base": "Strong"
    },
    "reviews": []
  },
  {
    "id": "perfume-61",
    "name": "Milestones",
    "artisan": "Armaf",
    "price": 210,
    "images": [
      "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1592494911762-d2f1f5f3e911?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Armaf. Perfect for Male seeking a Spicy scent with Medium longevity.",
    "category": "Parfum",
    "stock": 30,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-62",
    "name": "Sillage",
    "artisan": "Armaf",
    "price": 211,
    "images": [
      "https://images.unsplash.com/photo-1595535373192-fc8938b27529?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Armaf. Perfect for Male seeking a Spicy scent with Medium longevity.",
    "category": "Parfum",
    "stock": 31,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-63",
    "name": "Imperiale",
    "artisan": "Armaf",
    "price": 212,
    "images": [
      "https://images.unsplash.com/photo-1608528577891-eb055944f2e7?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Armaf. Perfect for Male seeking a Spicy scent with Medium longevity.",
    "category": "Parfum",
    "stock": 32,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-64",
    "name": "Man",
    "artisan": "Armaf",
    "price": 213,
    "images": [
      "https://images.unsplash.com/photo-1563170351-be82bc88ea6f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595535373192-fc8938b27529?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Armaf. Perfect for Male seeking a Spicy scent with Medium longevity.",
    "category": "Parfum",
    "stock": 33,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-65",
    "name": "Woman",
    "artisan": "Armaf",
    "price": 214,
    "images": [
      "https://images.unsplash.com/photo-1619994403073-2cec844b8e63?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1615529183492-c4e047ceb4d5?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Armaf. Perfect for Female seeking a Fruity scent with Medium longevity.",
    "category": "Parfum",
    "stock": 34,
    "notes": {
      "top": "Fruity",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-66",
    "name": "Untold",
    "artisan": "Armaf",
    "price": 215,
    "images": [
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1615529183492-c4e047ceb4d5?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted PARFUM fragrance by Armaf. Perfect for Male seeking a Spicy scent with Strong longevity.",
    "category": "Extract",
    "stock": 35,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Strong"
    },
    "reviews": []
  },
  {
    "id": "perfume-67",
    "name": "Timeless",
    "artisan": "Armaf",
    "price": 216,
    "images": [
      "https://images.unsplash.com/photo-1619994403073-2cec844b8e63?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1615529183492-c4e047ceb4d5?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted PARFUM fragrance by Armaf. Perfect for Male seeking a Spicy scent with Strong longevity.",
    "category": "Extract",
    "stock": 36,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Strong"
    },
    "reviews": []
  },
  {
    "id": "perfume-68",
    "name": "Iconic",
    "artisan": "Armaf",
    "price": 217,
    "images": [
      "https://images.unsplash.com/photo-1619994403073-2cec844b8e63?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1592494911762-d2f1f5f3e911?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Armaf. Perfect for Male seeking a Spicy scent with Medium longevity.",
    "category": "Parfum",
    "stock": 37,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-69",
    "name": "Homme",
    "artisan": "Armaf",
    "price": 218,
    "images": [
      "https://images.unsplash.com/photo-1518331566-07612711ff60?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Armaf. Perfect for Male seeking a Scent scent with Medium longevity.",
    "category": "Parfum",
    "stock": 38,
    "notes": {
      "top": "Scent",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-70",
    "name": "Femme",
    "artisan": "Armaf",
    "price": 219,
    "images": [
      "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594913785124-71239c4f5260?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Armaf. Perfect for Female seeking a Fruity scent with Medium longevity.",
    "category": "Parfum",
    "stock": 39,
    "notes": {
      "top": "Fruity",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-71",
    "name": "Noir",
    "artisan": "Armaf",
    "price": 220,
    "images": [
      "https://images.unsplash.com/photo-1518331566-07612711ff60?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1592914610354-fd354d45fe82?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Armaf. Perfect for Male seeking a Spicy scent with Medium longevity.",
    "category": "Parfum",
    "stock": 40,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-72",
    "name": "Azure",
    "artisan": "Armaf",
    "price": 221,
    "images": [
      "https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Armaf. Perfect for Male seeking a Scent scent with Medium longevity.",
    "category": "Parfum",
    "stock": 41,
    "notes": {
      "top": "Scent",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-73",
    "name": "Homme",
    "artisan": "Armaf",
    "price": 222,
    "images": [
      "https://images.unsplash.com/photo-1595535373192-fc8938b27529?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595425970377-c9703c48657a?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Armaf. Perfect for Male seeking a Spicy scent with Medium longevity.",
    "category": "Parfum",
    "stock": 42,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-74",
    "name": "Femme",
    "artisan": "Armaf",
    "price": 223,
    "images": [
      "https://images.unsplash.com/photo-1601007746401-44755f190e29?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601244840899-72c676afba7b?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Armaf. Perfect for Female seeking a Fruity scent with Medium longevity.",
    "category": "Parfum",
    "stock": 43,
    "notes": {
      "top": "Fruity",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-75",
    "name": "Noir",
    "artisan": "Armaf",
    "price": 224,
    "images": [
      "https://images.unsplash.com/photo-1608528577891-eb055944f2e7?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595425970377-c9703c48657a?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Armaf. Perfect for Male seeking a Spicy scent with Medium longevity.",
    "category": "Parfum",
    "stock": 44,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-76",
    "name": "Blue",
    "artisan": "Armaf",
    "price": 225,
    "images": [
      "https://images.unsplash.com/photo-1592494911762-d2f1f5f3e911?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598516086708-41c305c08d17?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Armaf. Perfect for Male seeking a Scent scent with Medium longevity.",
    "category": "Parfum",
    "stock": 45,
    "notes": {
      "top": "Scent",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-77",
    "name": "Rouge",
    "artisan": "Armaf",
    "price": 226,
    "images": [
      "https://images.unsplash.com/photo-1608528577891-eb055944f2e7?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Armaf. Perfect for Male seeking a Spicy scent with Medium longevity.",
    "category": "Parfum",
    "stock": 46,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-78",
    "name": "Gold",
    "artisan": "Armaf",
    "price": 227,
    "images": [
      "https://images.unsplash.com/photo-1590156546946-ce55a12a6a5d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622618991746-fe6004db3a47?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Armaf. Perfect for Male seeking a Spicy scent with Medium longevity.",
    "category": "Parfum",
    "stock": 47,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-79",
    "name": "Homme",
    "artisan": "Armaf",
    "price": 228,
    "images": [
      "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Armaf. Perfect for Male seeking a Spicy scent with Medium longevity.",
    "category": "Parfum",
    "stock": 48,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-80",
    "name": "Femme",
    "artisan": "Armaf",
    "price": 229,
    "images": [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by Armaf. Perfect for Female seeking a Fruity scent with Medium longevity.",
    "category": "Parfum",
    "stock": 49,
    "notes": {
      "top": "Fruity",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-81",
    "name": "Ghost",
    "artisan": "World",
    "price": 230,
    "images": [
      "https://images.unsplash.com/photo-1595535373192-fc8938b27529?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by World. Perfect for Male seeking a Aromatic scent with Medium longevity.",
    "category": "Parfum",
    "stock": 50,
    "notes": {
      "top": "Aromatic",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-82",
    "name": "Wraith",
    "artisan": "World",
    "price": 231,
    "images": [
      "https://images.unsplash.com/photo-1598516086708-41c305c08d17?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595425970377-c9703c48657a?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by World. Perfect for Male seeking a Spicy scent with Strong longevity.",
    "category": "Parfum",
    "stock": 51,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Strong"
    },
    "reviews": []
  },
  {
    "id": "perfume-83",
    "name": "White",
    "artisan": "World",
    "price": 232,
    "images": [
      "https://images.unsplash.com/photo-1595535373192-fc8938b27529?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by World. Perfect for Unisex seeking a Scent scent with Medium longevity.",
    "category": "Parfum",
    "stock": 52,
    "notes": {
      "top": "Scent",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-84",
    "name": "Blanc",
    "artisan": "World",
    "price": 233,
    "images": [
      "https://images.unsplash.com/photo-1615529183492-c4e047ceb4d5?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518331566-07612711ff60?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by World. Perfect for Female seeking a Fruity scent with Medium longevity.",
    "category": "Parfum",
    "stock": 53,
    "notes": {
      "top": "Fruity",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-85",
    "name": "Avenue",
    "artisan": "World",
    "price": 234,
    "images": [
      "https://images.unsplash.com/photo-1518331566-07612711ff60?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601244840899-72c676afba7b?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by World. Perfect for Male seeking a Spicy scent with Strong longevity.",
    "category": "Parfum",
    "stock": 54,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Strong"
    },
    "reviews": []
  },
  {
    "id": "perfume-86",
    "name": "Elixir",
    "artisan": "World",
    "price": 235,
    "images": [
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by World. Perfect for Male seeking a Spicy scent with Medium longevity.",
    "category": "Parfum",
    "stock": 55,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-87",
    "name": "2.0",
    "artisan": "World",
    "price": 236,
    "images": [
      "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1619994403073-2cec844b8e63?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by World. Perfect for Male seeking a Aromatic scent with Medium longevity.",
    "category": "Parfum",
    "stock": 56,
    "notes": {
      "top": "Aromatic",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-88",
    "name": "Suits",
    "artisan": "World",
    "price": 237,
    "images": [
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by World. Perfect for Male seeking a Aromatic scent with Medium longevity.",
    "category": "Parfum",
    "stock": 57,
    "notes": {
      "top": "Aromatic",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-89",
    "name": "Woods",
    "artisan": "World",
    "price": 238,
    "images": [
      "https://images.unsplash.com/photo-1595535373192-fc8938b27529?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1619994403073-2cec844b8e63?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by World. Perfect for Male seeking a Spicy scent with Strong longevity.",
    "category": "Parfum",
    "stock": 58,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Strong"
    },
    "reviews": []
  },
  {
    "id": "perfume-90",
    "name": "Fierte",
    "artisan": "World",
    "price": 239,
    "images": [
      "https://images.unsplash.com/photo-1590156546946-ce55a12a6a5d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by World. Perfect for Male seeking a Aromatic scent with Medium longevity.",
    "category": "Parfum",
    "stock": 59,
    "notes": {
      "top": "Aromatic",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-91",
    "name": "Saphire",
    "artisan": "World",
    "price": 240,
    "images": [
      "https://images.unsplash.com/photo-1595425970377-c9703c48657a?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by World. Perfect for Unisex seeking a Scent scent with Medium longevity.",
    "category": "Parfum",
    "stock": 60,
    "notes": {
      "top": "Scent",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-92",
    "name": "Spice",
    "artisan": "World",
    "price": 241,
    "images": [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by World. Perfect for Male seeking a Aromatic scent with Medium longevity.",
    "category": "Parfum",
    "stock": 61,
    "notes": {
      "top": "Aromatic",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-93",
    "name": "World",
    "artisan": "World",
    "price": 242,
    "images": [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563170351-be82bc88ea6f?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by World. Perfect for Male seeking a Spicy scent with Strong longevity.",
    "category": "Parfum",
    "stock": 62,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Strong"
    },
    "reviews": []
  },
  {
    "id": "perfume-94",
    "name": "Asylum",
    "artisan": "World",
    "price": 243,
    "images": [
      "https://images.unsplash.com/photo-1592914610354-fd354d45fe82?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518331566-07612711ff60?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by World. Perfect for Male seeking a Aromatic scent with Medium longevity.",
    "category": "Parfum",
    "stock": 63,
    "notes": {
      "top": "Aromatic",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-95",
    "name": "Oud",
    "artisan": "World",
    "price": 244,
    "images": [
      "https://images.unsplash.com/photo-1601007746401-44755f190e29?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518331566-07612711ff60?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by World. Perfect for Unisex seeking a Oud scent with Strong longevity.",
    "category": "Parfum",
    "stock": 64,
    "notes": {
      "top": "Oud",
      "heart": "Aromatic",
      "base": "Strong"
    },
    "reviews": []
  },
  {
    "id": "perfume-96",
    "name": "63.55",
    "artisan": "World",
    "price": 245,
    "images": [
      "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by World. Perfect for Male seeking a Aromatic scent with Medium longevity.",
    "category": "Parfum",
    "stock": 65,
    "notes": {
      "top": "Aromatic",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-97",
    "name": "Body",
    "artisan": "World",
    "price": 246,
    "images": [
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by World. Perfect for Female seeking a Fruity scent with Medium longevity.",
    "category": "Parfum",
    "stock": 66,
    "notes": {
      "top": "Fruity",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-98",
    "name": "Absolu",
    "artisan": "World",
    "price": 247,
    "images": [
      "https://images.unsplash.com/photo-1590156546946-ce55a12a6a5d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by World. Perfect for Male seeking a Spicy scent with Strong longevity.",
    "category": "Parfum",
    "stock": 67,
    "notes": {
      "top": "Spicy",
      "heart": "Aromatic",
      "base": "Strong"
    },
    "reviews": []
  },
  {
    "id": "perfume-99",
    "name": "Kiss",
    "artisan": "World",
    "price": 248,
    "images": [
      "https://images.unsplash.com/photo-1590156546946-ce55a12a6a5d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by World. Perfect for Female seeking a Floral scent with Medium longevity.",
    "category": "Parfum",
    "stock": 68,
    "notes": {
      "top": "Floral",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  },
  {
    "id": "perfume-100",
    "name": "Pura",
    "artisan": "World",
    "price": 249,
    "images": [
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1615529183492-c4e047ceb4d5?q=80&w=800&auto=format&fit=crop"
    ],
    "description": "A masterfully crafted EDP fragrance by World. Perfect for Unisex seeking a Scent scent with Medium longevity.",
    "category": "Parfum",
    "stock": 69,
    "notes": {
      "top": "Scent",
      "heart": "Aromatic",
      "base": "Medium"
    },
    "reviews": []
  }
];
