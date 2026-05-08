const serverEntryPromise = import("../dist/server/server.js").then((m) => m.default ?? m);

function brandedErrorResponse() {
  return new Response(
    "<!DOCTYPE html><html><head><meta charset=\"utf-8\"><title>Service Error</title></head><body><h1>Server Error</h1></body></html>",
    {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    },
  );
}

function isCatastrophicSsrErrorBody(body, responseStatus) {
  let payload;
  try {
    payload = JSON.parse(body);
  } catch {
    return false;
  }

  if (!payload || Array.isArray(payload) || typeof payload !== "object") {
    return false;
  }

  const fields = payload;
  const expectedKeys = new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) {
    return false;
  }

  return (
    fields.unhandled === true &&
    fields.message === "HTTPError" &&
    (fields.status === undefined || fields.status === responseStatus)
  );
}

async function normalizeCatastrophicSsrResponse(response) {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isCatastrophicSsrErrorBody(body, response.status)) {
    return response;
  }

  console.error(new Error(`h3 swallowed SSR error: ${body}`));
  return brandedErrorResponse();
}

export const config = {
  runtime: "nodejs",
  maxDuration: 10,
};

export default async function handler(request) {
  try {
    const server = await serverEntryPromise;
    const requestUrl = new URL(request.url);
    const pathname = requestUrl.searchParams.get("pathname") || requestUrl.pathname || "/";
    requestUrl.pathname = pathname.startsWith("/") ? pathname : `/${pathname}`;
    requestUrl.search = "";

    const requestInit = {
      method: request.method || "GET",
      headers:
        request.headers && typeof request.headers.get === "function"
          ? request.headers
          : new Headers(request.headers || {}),
    };

    if (requestInit.method !== "GET" && requestInit.method !== "HEAD") {
      requestInit.body = request.body;
    }

    const forwardedRequest = new Request(requestUrl.toString(), requestInit);
    const response = await server.fetch(forwardedRequest, {}, {});
    return await normalizeCatastrophicSsrResponse(response);
  } catch (error) {
    console.error(error);
    return brandedErrorResponse();
  }
}
