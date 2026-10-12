import { defineConfig, devices } from "@playwright/test";

/**
 * One project per browser engine. `bun run test:e2e` runs the full suite in Chromium;
 * `bun run test:a11y` runs the accessibility regression suite in Chromium, Firefox and WebKit,
 * which is what the pull-request workflow does.
 */
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: "http://localhost:8080",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
});
