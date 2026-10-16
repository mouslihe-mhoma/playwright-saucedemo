import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test('ajouter un produit au panier', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    // 1. Agir : se connecter et ajouter un produit ;
    await loginPage.ouvrir();
    await loginPage.seConnecter('standard_user', 'secret_sauce');
    await inventoryPage.ajouterAuPanier();

    // 2. Vérifier ajout au panier
    await expect(page).toHaveURL(/inventory/);
    await expect(page.getByText('Remove')).toBeVisible();
});