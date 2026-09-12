import { test, expect } from '@playwright/test';
import { users } from '../testData';
import { LoginPage } from '../pages/LoginPage';

test.describe('closed book practice', () => {

    test.beforeEach('navigate to baseURL', async ({ page }) => {
        await page.goto('/');
    });

    for (const user of users) {
        test(`${user.username} ${user.tag}`, async ({ page }) => {
            const loginPage = new LoginPage(page);
            await loginPage.login(`${user.username}`, `${user.password}`);
            if (user.isLocked) {
                await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.')).toBeVisible();
            } else {
                await expect(page).toHaveURL(/inventory/i);
            }
        });
    }

});