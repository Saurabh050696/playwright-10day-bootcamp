import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Practice test suite', () => {
    test('Login Test', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        const loginPage = new LoginPage(page);
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/inventory.html/);
        const inventoryPage = new InventoryPage(page);
        // const allInventoryItems = page.locator('.inventory_item');
        // const productName = 'Sauce Labs Backpack';
        // const inventoryItem = allInventoryItems.filter({ hasText: productName });
        // await inventoryItem.getByRole('button', { name: 'Add to cart' }).click();
        await inventoryPage.addProduct('Sauce Labs Backpack');
        await inventoryPage.addProduct('Sauce Labs Bike Light');
        await inventoryPage.expectCartCount(2);
        await inventoryPage.openCart();

        const cartItems = page.locator('.cart_item');

        const backpackName = 'Sauce Labs Backpack';
        const matchingBackpack = cartItems.filter({ hasText: backpackName });

        await expect(matchingBackpack).toHaveCount(1);
        await expect(
            matchingBackpack.locator('.inventory_item_name')
        ).toHaveText(backpackName);

        const bikeLightName = 'Sauce Labs Bike Light';
        const matchingBikeLight = cartItems.filter({ hasText: bikeLightName });

        await expect(matchingBikeLight).toHaveCount(1);
        await expect(
            matchingBikeLight.locator('.inventory_item_name')
        ).toHaveText(bikeLightName);
    });
});