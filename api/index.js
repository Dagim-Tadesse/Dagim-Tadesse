import server from "../dist/server/server.js";

export const config = {
  runtime: "nodejs",
};

export default async function handler(request) {
  console.log("[API Handler]", new Date().toISOString(), request.method, request.url);
  try {
    const response = await server.fetch(request, {}, {});
    console.log("[API Handler] Response status:", response.status);
    return response;
  } catch (error) {
    console.error("[API Handler] Error:", error);
    throw error;
  }
}
