const fs = require("fs");
const path = "src/routes/index.tsx";
let content = fs.readFileSync(path, "utf8");

// Use a more robust regex for the Portfolio return
const portfolioRegex = /function Portfolio\(\) \{[\s\S]*?return \(([\s\S]*?)\);/m;
const match = content.match(portfolioRegex);
if (match) {
  const innerContent = match[1];
  content = content.replace(
    innerContent,
    "\n    <ClientOnly>" + innerContent + "\n    </ClientOnly>",
  );
  fs.writeFileSync(path, content);
  console.log("Successfully wrapped Portfolio return in ClientOnly");
} else {
  console.log("Failed to find Portfolio return pattern");
}
