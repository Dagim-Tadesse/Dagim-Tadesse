import fs from "fs";
import path from "path";

export const config = {
  runtime: "nodejs",
  maxDuration: 25,
};

export default async function handler(request) {
  const start = Date.now();
  console.log("[API Handler START]", new Date().toISOString(), request.method, request.url);
  
  let timeoutId;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(`SSR rendering timeout after 8 seconds (total elapsed: ${Date.now() - start}ms)`));
    }, 8000);
  });

  try {
    const reqPath = typeof request.url === "string" ? new URL(request.url, "http://localhost").pathname : "/";
    console.log("[API Handler Path]", reqPath);

    // Dynamic import to avoid top-level hang and allow logging
    console.log("[API Handler Importing server.js]");
    const { default: server } = await import("../dist/server/server.js");
    console.log("[API Handler server.js imported]");

    const getHeader = (name) => {
      if (request.headers && typeof request.headers.get === "function") return request.headers.get(name);
      if (request.headers && (request.headers[name] || request.headers[name.toLowerCase()])) return request.headers[name] || request.headers[name.toLowerCase()];
      return undefined;
    };

    const host = getHeader("host") || "localhost:3000";
    const protocol = host.includes("localhost") ? "http" : "https";
    const fullUrl = new URL(request.url, `${protocol}://${host}`).toString();

    let forwardHeaders;
    if (request.headers && typeof request.headers.get === "function") {
      forwardHeaders = request.headers;
    } else {
      forwardHeaders = new Headers(request.headers || {});
    }

    const requestInit = {
      method: request.method || "GET",
      headers: forwardHeaders,
    };

    if (requestInit.method !== "GET" && requestInit.method !== "HEAD") {
      requestInit.body = request.body;
    }

    const forwardedRequest = new Request(fullUrl, requestInit);

    console.log("[API Handler Calling server.fetch]");
    const fetchPromise = Promise.resolve(server.fetch(forwardedRequest, {}, {}));
    const response = await Promise.race([fetchPromise, timeoutPromise]);
    clearTimeout(timeoutId);
    console.log("[API Handler SUCCESS]", response.status, `in ${Date.now() - start}ms`);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    console.error("[API Handler ERROR]", error.message);
    
    return new Response(
      `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Service Temporarily Unavailable</title>
  <style>
    body { font-family: system-ui; padding: 40px; text-align: center; }
    h1 { color: #d32f2f; }
    p { color: #666; }
  </style>
</head>
<body>
  <h1>503 - Service Temporarily Unavailable</h1>
  <p>The server is experiencing issues. Please try again in a moment.</p>
  <p style="font-size: 12px; color: #999;">Error: ${error.message}</p>
</body>
</html>`,
      { 
        status: 503, 
        headers: { "Content-Type": "text/html; charset=utf-8" } 
      }
    );
  }
}
