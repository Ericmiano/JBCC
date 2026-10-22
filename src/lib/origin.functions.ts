import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { readEnv } from "@/lib/server-env";

/**
 * The public origin used for canonical and sharing links. Behind DirectAdmin's Passenger
 * the app sees plain-HTTP requests, so `SITE_URL` (e.g. https://jbcc.co.ke) is the
 * reliable source; otherwise the request's forwarded protocol and host are used.
 */
export const getRequestOrigin = createServerFn({ method: "GET" }).handler(() => {
  const configured = readEnv("SITE_URL");
  if (configured) return configured.replace(/\/+$/, "");

  const request = getRequest();
  const url = new URL(request.url);
  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  const forwardedProto = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
  if (url.hostname === "localhost" && forwardedHost) return `https://${forwardedHost}`;
  return forwardedProto === "https" ? `https://${url.host}` : url.origin;
});
