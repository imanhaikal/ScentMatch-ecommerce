/* eslint-disable */
const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, 'Perfumes_dataset.csv');
const tsOutputPath = path.join(__dirname, '..', 'src', 'data', 'products.ts');
const shopifyCsvOutputPath = path.join(__dirname, '..', 'shopify_products.csv');

const rawCsv = fs.readFileSync(csvPath, 'utf8');
const lines = rawCsv.split('\n').filter(line => line.trim().length > 0);

// Headers: brand,perfume,type,category,target_audience,longevity
const records = lines.slice(1).map(line => {
  const cols = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || line.split(',');
  return cols.map(c => c.replace(/^"|"$/g, '').trim());
}).filter(cols => cols.length >= 6);

const actualImages = {
  "club de nuit intense man": "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop", // placeholder until real URLs are found, could use duckduckgo
  "aventus": "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=800&auto=format&fit=crop",
  "baccarat rouge 540": "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?q=80&w=800&auto=format&fit=crop",
  "sauvage": "https://images.unsplash.com/photo-1592914610854-230f878f56ef?q=80&w=800&auto=format&fit=crop",
  "bleu de chanel": "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800&auto=format&fit=crop",
  "y": "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=800&auto=format&fit=crop"
};

const genericImages = [
  "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1595425970377-c9703c48657a?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1619994403073-2cec844b8e63?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1608528577891-eb055944f2e7?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1590156546946-ce55a12a6a5d?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1563170351-be82bc88ea6f?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1592494911762-d2f1f5f3e911?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1615529183492-c4e047ceb4d5?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1594913785124-71239c4f5260?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1601007746401-44755f190e29?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1622618991746-fe6004db3a47?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1592914610354-fd354d45fe82?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1595535373192-fc8938b27529?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518331566-07612711ff60?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1601244840899-72c676afba7b?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1598516086708-41c305c08d17?q=80&w=800&auto=format&fit=crop"
];

function capitalize(str) {
  return str.replace(/\b\w/g, l => l.toUpperCase());
}

function mapTypeToCategory(type) {
  const t = type.toLowerCase();
  if (['parfum', 'extrait de parfum', 'extrait', 'attar', 'concentrate', 'oil'].includes(t)) {
    return 'Extract';
  }
  if (['edt', 'cologne', 'alcohol-free'].includes(t)) {
    return 'Cologne';
  }
  return 'Parfum'; // default for edp and others
}

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

const parsedProducts = records.map((cols, i) => {
  const brand = capitalize(cols[0] || 'Unknown Brand');
  const perfumeRaw = cols[1] || 'Unknown Perfume';
  const perfume = capitalize(perfumeRaw);
  const type = cols[2] || '';
  const categoryStr = cols[3] || 'Fresh';
  const targetAudience = cols[4] || 'Unisex';
  const longevity = cols[5] || 'Medium';

  const category = mapTypeToCategory(type);
  
  const price = 150 + (i % 300);
  
  let image1, image2;
  const perfumeLower = perfumeRaw.toLowerCase();
  
  if (actualImages[perfumeLower]) {
    image1 = actualImages[perfumeLower];
    image2 = genericImages[Math.floor(Math.random() * genericImages.length)];
  } else {
    // Generate two distinct random indices
    const rand1 = Math.floor(Math.random() * genericImages.length);
    let rand2 = Math.floor(Math.random() * genericImages.length);
    while (rand2 === rand1 && genericImages.length > 1) {
      rand2 = Math.floor(Math.random() * genericImages.length);
    }
    image1 = genericImages[rand1];
    image2 = genericImages[rand2];
  }

  return {
    id: `perfume-${i + 1}`,
    handle: slugify(brand + " " + perfume),
    name: perfume,
    artisan: brand,
    price,
    images: [image1, image2],
    description: "A masterfully crafted " + type.toUpperCase() + " fragrance by " + brand + ". Perfect for " + targetAudience + " seeking a " + categoryStr + " scent with " + longevity + " longevity.",
    category,
    stock: 20 + (i % 50),
    notes: {
      top: categoryStr,
      heart: 'Aromatic',
      base: longevity
    }
  };
});

// 1. Generate local TS file (first 100)
const localProducts = parsedProducts.slice(0, 100).map(({ handle, ...rest }) => rest);

const tsContent = `export interface ProductReview {
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

export const PRODUCTS: Product[] = ${JSON.stringify(localProducts.map(p => ({ ...p, reviews: [] })), null, 2)};
`;

fs.writeFileSync(tsOutputPath, tsContent, 'utf8');
console.log("Generated " + tsOutputPath + " with " + localProducts.length + " products.");

// 2. Generate Shopify CSV
const shopifyHeaders = [
  'Handle',
  'Title',
  'Vendor',
  'Type',
  'Published',
  'Option1 Name',
  'Option1 Value',
  'Variant Inventory Tracker',
  'Variant Inventory Qty',
  'Variant Inventory Policy',
  'Variant Fulfillment Service',
  'Variant Price',
  'Variant Requires Shipping',
  'Variant Taxable',
  'Image Src',
  'product.metafields.custom.artisan',
  'product.metafields.custom.concentration',
  'product.metafields.custom.top_notes',
  'product.metafields.custom.heart_notes',
  'product.metafields.custom.base_notes',
  'Body (HTML)'
];

function escapeCsv(val) {
  if (val == null) return '';
  const str = String(val);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

const shopifyRows = parsedProducts.map(p => {
  return [
    escapeCsv(p.handle),
    escapeCsv(p.name),
    escapeCsv(p.artisan),
    escapeCsv(p.category),
    'TRUE',
    'Title',
    'Default Title',
    'shopify',
    escapeCsv(p.stock),
    'deny',
    'manual',
    escapeCsv(p.price),
    'TRUE',
    'TRUE',
    escapeCsv(p.images[0]),
    escapeCsv(p.artisan),
    escapeCsv(p.category),
    escapeCsv(p.notes.top),
    escapeCsv(p.notes.heart),
    escapeCsv(p.notes.base),
    escapeCsv(p.description)
  ].join(',');
});

const shopifyCsvContent = [shopifyHeaders.join(','), ...shopifyRows].join('\n');
fs.writeFileSync(shopifyCsvOutputPath, shopifyCsvContent, 'utf8');
console.log("Generated " + shopifyCsvOutputPath + " with " + parsedProducts.length + " products.");