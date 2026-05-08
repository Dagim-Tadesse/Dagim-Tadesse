const fs = require("fs");
const path = "src/routes/index.tsx";
let content = fs.readFileSync(path, "utf8");

// Remove prerender
content = content.replace(",\n  prerender: true,", ",");

// Remove ClientOnly wrap in Portfolio
const wrapMatch = content.match(/<ClientOnly>([\s\S]*?)<\/ClientOnly>/);
if (wrapMatch) {
  content = content.replace(wrapMatch[0], wrapMatch[1]);
}

// Remove ClientOnly definition
content = content.replace(/\nfunction ClientOnly[\s\S]*?\n\n/m, "");

fs.writeFileSync(path, content);
console.log("Reverted index.tsx to clean state");
