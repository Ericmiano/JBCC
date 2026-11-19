import Anthropic from "@anthropic-ai/sdk";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";
import { readEnv } from "@/lib/server-env";
import { ASK_MODEL, QUESTION_MAX_LENGTH, SYSTEM_PROMPT, buildUserContent, parseAnswer, relatedSources, type AskResult } from "@/lib/ask/answer";

/**
 * Server configuration (DirectAdmin Node.js app environment variables, or the shell in local dev):
 *   ASK_GATEWAY_URL        Full gateway endpoint, e.g. https://gateway.ai.cloudflare.com/v1/<account>/<gateway>/anthropic
 *   or CLOUDFLARE_ACCOUNT_ID + ASK_GATEWAY_ID to build it.
 *   ASK_GATEWAY_TOKEN      Gateway token, required when the gateway is authenticated.
 *   ASK_API_KEY            Optional when the key is stored in the gateway (BYOK).
 * Without a gateway, the feature reports itself unavailable and points visitors to related pages.
 */
function gatewayBaseUrl() {
  const explicit = readEnv("ASK_GATEWAY_URL");
  if (explicit) return explicit.replace(/\/+$/, "");
  const account = readEnv("CLOUDFLARE_ACCOUNT_ID");
  const gateway = readEnv("ASK_GATEWAY_ID");
  return account && gateway ? `https://gateway.ai.cloudflare.com/v1/${account}/${gateway}/anthropic` : undefined;
}

/** Without a gateway, Ask JBCC is hidden everywhere: links, search, policy text, and /ask returns 404. */
export const getAskAvailable = createServerFn({ method: "GET" }).handler(() => Boolean(gatewayBaseUrl()));

let cachedClient: { key: string; client: Anthropic } | undefined;

function getClient(): Anthropic | undefined {
  const baseURL = gatewayBaseUrl();
  if (!baseURL) return undefined;
  const apiKey = readEnv("ASK_API_KEY");
  const gatewayToken = readEnv("ASK_GATEWAY_TOKEN");
  const key = [baseURL, apiKey, gatewayToken].join("|");
  if (cachedClient?.key !== key) {
    cachedClient = {
      key,
      client: new Anthropic({
        baseURL,
        // SDK 1.x sends keys as Authorization: Bearer. Cloudflare's Anthropic route takes the key in X-Api-Key, and
        // with keys stored in the gateway (BYOK) it adds the key itself, so the request must carry none of its own.
        defaultHeaders: {
          Authorization: null,
          ...(apiKey ? { "X-Api-Key": apiKey } : {}),
          ...(gatewayToken ? { "cf-aig-authorization": `Bearer ${gatewayToken}` } : {}),
        },
        maxRetries: 1,
        timeout: 45_000,
      }),
    };
  }
  return cachedClient.client;
}

// Per-process limits: six questions per visitor and 60 in total every five minutes, which caps answer costs
// even when many addresses ask at once. Configure gateway rate limiting for a cross-process cap.
const WINDOW_MS = 5 * 60_000;
const MAX_QUESTIONS = 6;
const MAX_TOTAL_QUESTIONS = 60;
const recent = new Map<string, number[]>();
let allRecent: number[] = [];

function allowQuestion(visitor: string) {
  const now = Date.now();
  allRecent = allRecent.filter((time) => now - time < WINDOW_MS);
  const times = (recent.get(visitor) ?? []).filter((time) => now - time < WINDOW_MS);
  if (times.length >= MAX_QUESTIONS || allRecent.length >= MAX_TOTAL_QUESTIONS) {
    recent.set(visitor, times);
    return false;
  }
  times.push(now);
  allRecent.push(now);
  recent.set(visitor, times);
  if (recent.size > 5_000) recent.clear();
  return true;
}

const CONTACT = "You can also email the Secretariat at mail@jbcc.co.ke.";

const inputSchema = z.object({ question: z.string().trim().min(3, "Ask a question of at least 3 characters.").max(QUESTION_MAX_LENGTH) });

export const askJbcc = createServerFn({ method: "POST" })
  .validator(inputSchema)
  .handler(async ({ data }): Promise<AskResult> => {
    const { question } = data;
    const related = relatedSources(question);
    const client = getClient();
    if (!client) {
      return { status: "unavailable", message: `Ask JBCC isn’t answering questions yet. These pages may help. ${CONTACT}`, related };
    }

    // Set by deploy/app.js from the socket or the proxy's own X-Forwarded-For entry; visitors can't choose it.
    const visitor = getRequestHeader("x-jbcc-client-ip") ?? "anonymous";
    if (!allowQuestion(visitor)) {
      return { status: "limited", message: `You have asked several questions in a short time. Please wait a few minutes and try again. ${CONTACT}`, related };
    }

    try {
      const response = await client.beta.messages.create({
        model: ASK_MODEL,
        max_tokens: 8000,
        output_config: { effort: "low" },
        // Server-side fallback: a declined request is retried on a suitable fallback in the same call.
        betas: ["server-side-fallback-2026-07-01"],
        fallbacks: "default",
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: buildUserContent(question) }],
      });

      if (response.stop_reason === "refusal") {
        return { status: "declined", message: `Ask JBCC can't answer that question. Try rephrasing it about JBCC’s documents, seminars or Council. ${CONTACT}`, related };
      }
      const { segments, sources } = parseAnswer(response.content);
      if (!segments.length) {
        return { status: "error", message: `No answer came back. These pages may help. ${CONTACT}`, related };
      }
      return { status: "answered", segments, sources };
    } catch (error) {
      if (error instanceof Anthropic.RateLimitError) {
        return { status: "limited", message: `Ask JBCC is busy right now. Please try again in a minute. ${CONTACT}`, related };
      }
      if (error instanceof Anthropic.AuthenticationError || error instanceof Anthropic.PermissionDeniedError || error instanceof Anthropic.NotFoundError) {
        console.error(`Ask JBCC gateway configuration error (${error.status})`);
        return { status: "unavailable", message: `Ask JBCC is temporarily unavailable. These pages may help. ${CONTACT}`, related };
      }
      if (error instanceof Anthropic.APIConnectionError) {
        console.error("Ask JBCC could not reach the gateway", error.message);
      } else if (error instanceof Anthropic.APIError) {
        console.error(`Ask JBCC API error ${error.status}`, error.message);
      } else {
        console.error("Ask JBCC unexpected error", error);
      }
      return { status: "error", message: `Something went wrong while answering. These pages may help. ${CONTACT}`, related };
    }
  });
