const fs = require("fs");
const path = "src/routes/index.tsx";
let content = fs.readFileSync(path, "utf8");

// Add a ClientOnly component and wrap the Portfolio body
if (!content.includes("function ClientOnly")) {
  const clientOnlyCode = `
function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  return mounted ? <>{children}</> : <div className="min-h-screen bg-background flex items-center justify-center font-mono text-xs text-muted-foreground animate-pulse">Loading experience...</div>;
}
`;
  content = content.replace(
    'import { useEffect, useRef, useState } from "react";',
    'import * as React from "react";\nimport { useEffect, useRef, useState } from "react";',
  );
  content = content.replace("function Portfolio() {", clientOnlyCode + "\nfunction Portfolio() {");
  content = content.replace("return (", "return (\n    <ClientOnly>");
  content = content.replace(");", "    </ClientOnly>\n  );");

  fs.writeFileSync(path, content);
  console.log("Wrapped Portfolio in ClientOnly to bypass SSR complexity");
}
