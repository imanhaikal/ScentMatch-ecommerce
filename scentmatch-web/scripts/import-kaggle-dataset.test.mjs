import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const csvPath = path.join(__dirname, "..", "shopify_products.csv");
const productsPath = path.join(__dirname, "..", "src", "data", "products.ts");

function parseCsvLine(line) {
  const values = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const next = line[i + 1];

    if (char === '"' && inQuotes && next === '"') {
      current += '"';
      i += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === "," && !inQuotes) {
      values.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  values.push(current);
  return values;
}

describe("Kaggle perfume dataset import output", () => {
  it("preserves multi-word brand and perfume names in Shopify CSV rows", () => {
    const rows = fs.readFileSync(csvPath, "utf8").split(/\r?\n/);
    const headers = parseCsvLine(rows[0]);
    const first = parseCsvLine(rows[1]);
    const second = parseCsvLine(rows[2]);
    const fragranceWorld = parseCsvLine(rows[81]);

    const handleIndex = headers.indexOf("Handle");
    const titleIndex = headers.indexOf("Title");
    const vendorIndex = headers.indexOf("Vendor");

    expect(first[handleIndex]).toBe("dumont-nitro-red");
    expect(first[titleIndex]).toBe("Nitro Red");
    expect(first[vendorIndex]).toBe("Dumont");
    expect(second[handleIndex]).toBe("dumont-nitro-pour-homme");
    expect(second[titleIndex]).toBe("Nitro Pour Homme");
    expect(fragranceWorld[vendorIndex]).toBe("Fragrance World");
  });

  it("preserves local fallback product names generated from the dataset", () => {
    const productsTs = fs.readFileSync(productsPath, "utf8");

    expect(productsTs).toContain('"name": "Nitro Red"');
    expect(productsTs).toContain('"name": "Nitro Pour Homme"');
  });
});
