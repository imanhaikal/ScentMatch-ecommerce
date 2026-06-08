
const fs = require("fs");
const scriptPath = "scentmatch-web/scripts/import-kaggle-dataset.js";

let code = fs.readFileSync(scriptPath, "utf8");

code = code.replace(
  /'Product Metafield: custom\.artisan \[single_line_text_field\]',\s*'Product Metafield: custom\.concentration \[single_line_text_field\]',\s*'Product Metafield: custom\.top_notes \[single_line_text_field\]',\s*'Product Metafield: custom\.heart_notes \[single_line_text_field\]',\s*'Product Metafield: custom\.base_notes \[single_line_text_field\]',\s*'Product Metafield: custom\.short_description \[multi_line_text_field\]'/g,
  `\x27product.metafields.custom.artisan\x27,
  \x27product.metafields.custom.concentration\x27,
  \x27product.metafields.custom.top_notes\x27,
  \x27product.metafields.custom.heart_notes\x27,
  \x27product.metafields.custom.base_notes\x27,
  \x27Body (HTML)\x27`
);

fs.writeFileSync(scriptPath, code);
console.log("Updated generator script.");

