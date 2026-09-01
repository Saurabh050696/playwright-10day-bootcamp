import { test, expect } from '@playwright/test';

test.describe("timed drill suite", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://www.saucedemo.com/");
    });
    test("valid login test", async ({ page }) => {
        await page.getByRole('textbox', { name: 'Username' }).fill("standard_user");
        await page.getByRole('textbox', { name: 'Password' }).fill("secret_sauce");
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page).toHaveURL(/.*inventory/);
    });
});