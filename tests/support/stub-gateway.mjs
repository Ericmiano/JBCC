// Stand-in for the Cloudflare gateway in tests, so Ask JBCC is switched on and answers predictably.
//   node tests/support/stub-gateway.mjs            (listens on 9911, or STUB_GATEWAY_PORT)
//   ASK_GATEWAY_URL=http://localhost:9911/anthropic bun run dev
// It never calls the real service: every Messages request gets STUB_ANSWER back.
import http from "node:http";

export const STUB_ANSWER = "Stub answer from the test gateway.";
const port = Number(process.env.STUB_GATEWAY_PORT) || 9911;

http
  .createServer((req, res) => {
    req.resume();
    req.on("end", () => {
      if (req.method !== "POST" || !req.url?.endsWith("/v1/messages")) {
        res.writeHead(404).end();
        return;
      }
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({
        id: "msg_stub", type: "message", role: "assistant", model: "stub",
        content: [{ type: "text", text: STUB_ANSWER, citations: null }],
        stop_reason: "end_turn", stop_sequence: null, usage: { input_tokens: 1, output_tokens: 1 },
      }));
    });
  })
  .listen(port, () => console.log(`stub gateway on http://localhost:${port}`));
