import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test('valider une commande', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // 1. Agir : se connecter et commander un produit
    await loginPage.ouvrir();
    await loginPage.seConnecter('standard_user', 'secret_sauce');
    await inventoryPage.ajouterAuPanier();
    await inventoryPage.ouvrirPanier();
    await cartPage.commander();
    await checkoutPage.remplirInformation('karim', 'zenouti', '93000');
    await checkoutPage.terminerCommande();

    // 2. Vérifier : le message de confirmation est visible
    await expect(page).toHaveURL(/checkout-complete/);
    await expect(page.getByText('Thank you for your order!')).toBeVisible();
});