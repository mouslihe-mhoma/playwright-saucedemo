import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.ouvrir();
});

test.describe('Connexion', () => {

    test('connexion réussie', async ({ page }) => {
        // 1. Agir : Se connecter
        await loginPage.seConnecter('standard_user', 'secret_sauce');

        // 2. Vérifier qu'on est connecté
        await expect(page).toHaveURL(/inventory/);
        await expect(page.getByText('Products')).toBeVisible();
    });

    test('utilisateur bloqué', async ({ page }) => {
        // 1. Agir : se connecter avec locked_out_user
        await loginPage.seConnecter('locked_out_user', 'secret_sauce');

        // 2. Vérifier : le message d'erreur est visible et on n'est pas connecté
        await expect(page.getByText('this user has been locked out')).toBeVisible();
        await expect(page).not.toHaveURL(/inventory/);
    });

    test('mot de passe incorrect', async ({ page }) => {
        // 1. Agir : se connecter avec standard_user
        await loginPage.seConnecter('standard_user', 'mauvais_mdp');

        // 2. Vérifier : le message d'erreur est visible et on n'est pas connecté
        await expect(page.getByText('Username and password do not match')).toBeVisible();
        await expect(page).not.toHaveURL(/inventory/);
    });

    test("nom d'utilisateur manquant", async ({ page }) => {
        // 1. Agir : se connecter avec un nom d'utilisateur vide
        await loginPage.seConnecter('', 'secret_sauce');

        // 2. Vérifier : le message d'erreur est visible et on n'est pas connecté
        await expect(page.getByText('Username is required')).toBeVisible();
        await expect(page).not.toHaveURL(/inventory/);

    });

});

test.afterEach(async ({ page }, testInfo) => {
    console.log(`${testInfo.title} : ${testInfo.status}`);
});
