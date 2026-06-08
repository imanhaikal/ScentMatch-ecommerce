
const fs = require("fs");

const csvPath = "scentmatch-web/shopify_products.csv";
let csv = fs.readFileSync(csvPath, "utf8");

// Shopify expects "Body (HTML)" instead of "Product Metafield: custom.short_description [multi_line_text_field]"
// Let us replace it in the header
const lines = csv.split("\n");
lines[0] = lines[0].replace("Product Metafield: custom.short_description [multi_line_text_field]", "Body (HTML)");

fs.writeFileSync(csvPath, lines.join("\n"));
console.log("Fixed CSV header!");

