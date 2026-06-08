
const fs = require("fs");
const typesPath = "scentmatch-web/src/lib/shopify/types.ts";
let types = fs.readFileSync(typesPath, "utf8");

// Remove it from ScentProduct
types = types.replace("  title: string;\n  vendor: string;\n  name: string;", "  title: string;\n  name: string;");

// Make sure it is in ShopifyProductNode
if (!types.includes("  handle: string;\n  title: string;\n  vendor: string;")) {
   types = types.replace("  handle: string;\n  title: string;\n  description: string;", "  handle: string;\n  title: string;\n  vendor: string;\n  description: string;");
}

fs.writeFileSync(typesPath, types);
console.log("Fixed types.ts!");

