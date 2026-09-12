import { test, expect } from '@playwright/test';
import { users } from '../testData';
import { LoginPage } from '../pages/LoginPage';

test.describe('Final benchmark', () => {
    test.beforeEach('navigation', async ({ page }) => {
        await page.goto('/');
    });

    for (const user of users) {
        test(`${user.username} ${user.tag}`, async ({ page }) => {
            const loginPage = new LoginPage(page);
            await loginPage.login(user.username, user.password);
            if (user.isLocked) {
                await expect(page.getByRole('alert')).toContainText('Epic sadface: Sorry, this user has been locked out.');
            } else {
                await expect(page).toHaveURL(/inventory/i);
            }
        });
    }
});