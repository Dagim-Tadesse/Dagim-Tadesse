const fs = require("fs");
const path = "src/routes/index.tsx";
let content = fs.readFileSync(path, "utf8");
content = content.replace("component: Portfolio,", "component: Portfolio,\n  prerender: true,");
fs.writeFileSync(path, content);
console.log("Updated index.tsx");
