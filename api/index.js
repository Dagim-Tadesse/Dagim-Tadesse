const serverEntryPromise = import("../dist/server/server.js").then((m) => m.default ?? m);

export const config = {
  runtime: "nodejs",
  maxDuration: 10,
};

export default async function handler(request) {
  try {
    const server = await serverEntryPromise;
    return await server.fetch(request, {}, {});
  } catch (error) {
    console.error(error);
    return new Response(
      "<!DOCTYPE html><html><head><meta charset=\"utf-8\"><title>Service Error</title></head><body><h1>Server Error</h1></body></html>",
      {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      },
    );
  }
}
