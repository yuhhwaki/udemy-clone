import { expect, test } from "@playwright/test";

test.describe("ログインページ", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test("ログインページが正しく表示される", async ({ page }) => {
    await expect(page).toHaveTitle(/UdemyClone/);
    await expect(page.getByRole("heading", { name: "ログイン" })).toBeVisible();
    await expect(
      page.getByText("Googleアカウントでログインしてください")
    ).toBeVisible();
  });

  test("Googleログインボタンが表示される", async ({ page }) => {
    const loginButton = page.getByRole("button", { name: "Googleでログイン" });
    await expect(loginButton).toBeVisible();
    await expect(loginButton).toBeEnabled();
  });

  test("Googleログインボタンをクリックするとリダイレクトが始まる", async ({
    page,
  }) => {
    // Google OAuthへのリダイレクトをインターセプト
    const navigationPromise = page.waitForURL(
      (url) =>
        url.hostname.includes("supabase.co") ||
        url.hostname.includes("google.com") ||
        url.hostname.includes("accounts.google.com"),
      { timeout: 10000 }
    );

    await page.getByRole("button", { name: "Googleでログイン" }).click();
    await expect(navigationPromise).resolves.toBeUndefined();
  });

  test("認証エラー時にエラーメッセージが表示される", async ({ page }) => {
    await page.goto("/login?error=auth");
    await expect(
      page.getByText("認証に失敗しました。もう一度お試しください。")
    ).toBeVisible();
  });

  test("エラーパラメーターがない場合エラーメッセージは表示されない", async ({
    page,
  }) => {
    await expect(
      page.getByText("認証に失敗しました。もう一度お試しください。")
    ).not.toBeVisible();
  });
});

test.describe("未ログイン状態のリダイレクト", () => {
  test("未ログインで/adminにアクセスするとトップページへリダイレクトされる", async ({
    page,
  }) => {
    await page.goto("/admin");
    await expect(page).toHaveURL("/");
  });

  test("未ログインで/courses/[id]/learnにアクセスするとログインページへリダイレクトされる", async ({
    page,
  }) => {
    await page.goto("/courses/a1b2c3d4-e5f6-0001-0001-000000000001/learn");
    await expect(page).toHaveURL("/login");
  });
});

test.describe("ヘッダーのログイン導線", () => {
  test("未ログイン時にヘッダーにログインボタンが表示される", async ({
    page,
  }) => {
    await page.goto("/");
    const headerLoginLink = page
      .getByRole("navigation")
      .getByRole("link", { name: "ログイン" });
    await expect(headerLoginLink).toBeVisible();
  });

  test("ヘッダーのログインボタンをクリックするとログインページへ遷移する", async ({
    page,
  }) => {
    await page.goto("/");
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "ログイン" })
      .click();
    await expect(page).toHaveURL("/login");
  });

  test("未ログイン時にコース一覧リンクが表示される", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("navigation").getByRole("link", { name: "コース一覧" })
    ).toBeVisible();
  });
});

test.describe("コース閲覧（未ログインでも閲覧可能）", () => {
  test("コース一覧ページにアクセスできる", async ({ page }) => {
    await page.goto("/courses");
    await expect(page).toHaveURL("/courses");
    await expect(
      page.getByRole("heading", { name: "コース一覧" })
    ).toBeVisible();
  });

  test("コース詳細ページにアクセスできる", async ({ page }) => {
    await page.goto("/courses/a1b2c3d4-e5f6-0001-0001-000000000001");
    await expect(page).toHaveURL(
      "/courses/a1b2c3d4-e5f6-0001-0001-000000000001"
    );
    // 受講開始ボタンがログイン誘導になっている
    await expect(
      page.getByRole("link", { name: "ログインして受講する" })
    ).toBeVisible();
  });

  test("コース詳細から受講ボタンをクリックするとログインページへ遷移する", async ({
    page,
  }) => {
    await page.goto("/courses/a1b2c3d4-e5f6-0001-0001-000000000001");
    await page.getByRole("link", { name: "ログインして受講する" }).click();
    await expect(page).toHaveURL("/login");
  });
});
