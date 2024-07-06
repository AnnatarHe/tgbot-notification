import { onTgCallbackHandler } from "./handler.ts";

Deno.serve(async (request) => {
  if (request.method !== "POST") {
    return new Response("CK notify bot. hosted on Cloudflare");
  }

  // const url = new URL(request.url);
  return await onTgCallbackHandler(request);
});
