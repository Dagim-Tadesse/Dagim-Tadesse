import server from "../dist/server/server.js";

export const config = {
  runtime: "nodejs",
  maxDuration: 25,
};

export default async function handler(request) {
  console.log("[API Handler START]", new Date().toISOString(), request.method, request.url);
  
  // Create a timeout promise
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("SSR rendering timeout after 20 seconds"));
    }, 20000);
  });

  try {
    const fetchPromise = Promise.resolve(server.fetch(request, {}, {}));
    const response = await Promise.race([fetchPromise, timeoutPromise]);
    console.log("[API Handler SUCCESS]", response.status);
    return response;
  } catch (error) {
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
