import { expect, test } from '@playwright/test';
test.describe("Practice test suite", () => {
    test.beforeEach(async ({ page }) => {
       await page.goto('https://www.saucedemo.com/');
    });
    test("writing the test again from scratch", async ({ page }) => {
        await page.locator('[data-test="username"]').fill("standard_user");
        await page.locator('[data-test="password"]').fill("secret_sauce");
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page).toHaveURL(/.*inventory/);
    });
    test("invalid login test", async ({ page }) => {
        await page.getByRole('textbox', { name: 'Username' }).fill("standard_user");
        await page.getByRole('textbox', { name: 'Password' }).fill("wrong_password");
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.getByRole('heading', { name: 'Epic sadface: Username and password do not match any user in this service' })).toBeVisible();
    });
});