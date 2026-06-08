
const fs = require("fs");

const typesPath = "scentmatch-web/src/lib/shopify/types.ts";
let types = fs.readFileSync(typesPath, "utf8");
if (!types.includes("vendor: string;")) {
    types = types.replace("title: string;", "title: string;\n  vendor: string;");
    fs.writeFileSync(typesPath, types);
}

const queriesPath = "scentmatch-web/src/lib/shopify/queries.ts";
let queries = fs.readFileSync(queriesPath, "utf8");
if (!queries.includes("vendor")) {
    queries = queries.replace("title\n", "title\n    vendor\n");
    fs.writeFileSync(queriesPath, queries);
}

const mappersPath = "scentmatch-web/src/lib/shopify/mappers.ts";
let mappers = fs.readFileSync(mappersPath, "utf8");
mappers = mappers.replace("artisan: product.artisan?.value || \"ScentMatch\"", "artisan: product.vendor || product.artisan?.value || \"ScentMatch\"");
fs.writeFileSync(mappersPath, mappers);

console.log("Files updated successfully!");

