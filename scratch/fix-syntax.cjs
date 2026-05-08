const fs = require("fs");
const path = "src/routes/index.tsx";
let content = fs.readFileSync(path, "utf8");

// Fix the Route definition
content = content.replace(
  /export const Route = createFileRoute\("\/"\)\(\{[\s\S]*?\}\s*<\/ClientOnly>\s*\);/,
  'export const Route = createFileRoute("/")({\n  component: Portfolio,\n  prerender: true,\n});',
);

fs.writeFileSync(path, content);
console.log("Fixed syntax error in index.tsx");
