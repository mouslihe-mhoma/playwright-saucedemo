import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const utilisateurs = [ 'standard_user','problem_user','performance_glitch_user','error_user','visual_user'];   // les 5 utilisateurs qui peuvent se connecter

for (const utilisateur of utilisateurs) {
    test(`connexion de ${utilisateur}`, async ({ page }) => {
        const loginPage = new LoginPage(page);

        // 1. Agir
        await loginPage.ouvrir();
        await loginPage.seConnecter(utilisateur, 'secret_sauce');

        // 2. Vérifier
        await expect(page).toHaveURL(/inventory/);
    });
}