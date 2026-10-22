/**
 * Reads a server setting. On DirectAdmin these come from the Node.js app's environment
 * variables (process.env). `globalThis.__env__` covers runtimes that pass bindings instead.
 * Server-only: call it from server functions or server entry code, never from components.
 */
export function readEnv(name: string): string | undefined {
  const bindings = (globalThis as { __env__?: Record<string, unknown> }).__env__;
  const bound = bindings?.[name];
  if (typeof bound === "string" && bound.trim()) return bound.trim();
  const fromProcess = typeof process === "undefined" ? undefined : process.env[name];
  return fromProcess?.trim() || undefined;
}
