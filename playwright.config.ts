import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  // CI環境ではリトライする
  retries: process.env.CI ? 2 : 0,
  reporter: "html",
  use: {
    // テスト対象のベースURL
    baseURL: "http://localhost:3000",
    // テスト失敗時にスクリーンショットを保存
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  // テスト実行前に開発サーバーを自動起動
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: true,
    timeout: 120000,
  },
});
