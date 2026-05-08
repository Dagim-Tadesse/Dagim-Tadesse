const fs = require("fs");
const path = "src/routes/index.tsx";
let content = fs.readFileSync(path, "utf8");

// Find the exportCV function and the large HTML string
const cvMatch = content.match(/const exportCV = \(\) => \{[\s\S]*?const html = `([\s\S]*?)`;/);
if (cvMatch) {
  const fullHtml = cvMatch[1];
  // Move it to a global constant
  content = content.replace(
    "function Nav() {",
    "const CV_HTML = `" + fullHtml + "`;\n\nfunction Nav() {",
  );
  content = content.replace(/const html = `[\s\S]*?`;/, "const html = CV_HTML;");
  fs.writeFileSync(path, content);
  console.log("Moved CV_HTML outside Nav component");
} else {
  console.log("Could not find exportCV or html string");
}
