
const fs = require("fs");
const csvPath = "scentmatch-web/shopify_products.csv";

let csv = fs.readFileSync(csvPath, "utf8");
let lines = csv.split("\n");

// Replace "Product Metafield:" with "Metafield:" in the header row
lines[0] = lines[0].replace(/Product Metafield:/g, "Metafield:");

fs.writeFileSync(csvPath, lines.join("\n"));
console.log("CSV headers fixed successfully!");

