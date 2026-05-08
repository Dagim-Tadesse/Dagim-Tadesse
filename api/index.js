import server from "../dist/server/server.js";

export const config = {
  runtime: "nodejs",
  maxDuration: 25,
};

export default async function handler(request) {
  console.log("[API Handler START]", new Date().toISOString(), request.method, request.url);
  
  // Create a timeout promise
  let timeoutId;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error("SSR rendering timeout after 20 seconds"));
    }, 20000);
  });

  try {
    // Ensure the request URL is absolute. Some platforms (dev servers)
    // provide a path-only URL ("/"), which breaks libraries that call
    // `new URL(request.url)`. Build a full URL using the Host header.
    const getHeader = (name) => {
      if (request.headers && typeof request.headers.get === "function") return request.headers.get(name);
      if (request.headers && (request.headers[name] || request.headers[name.toLowerCase()])) return request.headers[name] || request.headers[name.toLowerCase()];
      return undefined;
    };

    const host = getHeader("host") || "localhost:3000";
    const protocol = host.includes("localhost") ? "http" : "https";
    const fullUrl = new URL(request.url, `${protocol}://${host}`).toString();

    // Normalize headers for forwarding (support Headers or plain object)
    let forwardHeaders;
    if (request.headers && typeof request.headers.get === "function") {
      forwardHeaders = request.headers;
    } else {
      forwardHeaders = new Headers(request.headers || {});
    }

    // Create a new Request with the absolute URL while preserving method/headers/body.
    // GET and HEAD requests must not include a body.
    const requestInit = {
      method: request.method || "GET",
      headers: forwardHeaders,
    };

    if (requestInit.method !== "GET" && requestInit.method !== "HEAD") {
      requestInit.body = request.body;
    }

    const forwardedRequest = new Request(fullUrl, requestInit);

    const fetchPromise = Promise.resolve(server.fetch(forwardedRequest, {}, {}));
    const response = await Promise.race([fetchPromise, timeoutPromise]);
    clearTimeout(timeoutId);
    console.log("[API Handler SUCCESS]", response.status);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    console.error("[API Handler ERROR]", error.message);
    
    // Return a basic HTML error response with 503 Service Unavailable
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
