import server from "../dist/server/server.js";

export const config = {
  runtime: "nodejs20.x",
};

export default async function handler(request) {
  return server.fetch(request, {}, {});
}
