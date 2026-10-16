# Tests automatisés Playwright – Saucedemo

Projet de tests automatisés réalisé pour me former à Playwright, en complément de mon expérience de testeur QA (tests fonctionnels, Cypress, Postman, SQL).

Les tests portent sur [saucedemo.com](https://www.saucedemo.com), un site e-commerce de démonstration, et sur l'API publique [JSONPlaceholder](https://jsonplaceholder.typicode.com).

## Technologies

- [Playwright](https://playwright.dev) (Playwright Test)
- TypeScript
- Node.js

## Ce qui est testé

### Interface (saucedemo.com)

| Fichier | Scénarios |
| --- | --- |
| `tests/login.spec.ts` | connexion réussie, utilisateur bloqué, mot de passe incorrect, nom d'utilisateur manquant |
| `tests/utilisateur.spec.ts` | connexion des 5 utilisateurs autorisés (test piloté par les données) |
| `tests/panier.spec.ts` | ajout d'un produit au panier |
| `tests/achat.spec.ts` | parcours d'achat complet : connexion, panier, formulaire, confirmation de commande |

### API (JSONPlaceholder)

| Fichier | Scénarios |
| --- | --- |
| `tests/api.spec.ts` | lecture d'un élément (200), création (201), élément inexistant (404), lecture d'une liste |

Les tests d'interface sont exécutés sur Chromium, Firefox et WebKit.

## Bonnes pratiques mises en œuvre

- **Page Object Model** : une classe par page du site, dans `pages/` (`LoginPage`, `InventoryPage`, `CartPage`, `CheckoutPage`). Les sélecteurs sont regroupés à un seul endroit.
- **Hooks** : `beforeEach` pour préparer chaque test, `afterEach` pour afficher le résultat de chaque test.
- **Tests pilotés par les données** : un seul scénario exécuté pour plusieurs utilisateurs grâce à une boucle.
- **Tests négatifs** : vérification des messages d'erreur précis (utilisateur bloqué, champ vide, mauvais mot de passe).
- **Tests d'API** : vérification du code HTTP et du contenu JSON de la réponse.
- **Sélecteurs robustes** : `getByRole`, `getByPlaceholder` et attributs `data-test`.

## Structure du projet

```text
pages/          Page Objects (une classe par page)
tests/          Fichiers de tests
playwright.config.ts
```

## Lancer les tests

Prérequis : [Node.js](https://nodejs.org) installé.

```bash
npm install
npx playwright install
npx playwright test
```

Autres commandes utiles :

```bash
npx playwright test --ui              # mode visuel, étape par étape
npx playwright test login             # un seul fichier
npx playwright test --project=chromium   # un seul navigateur
npx playwright show-report            # rapport HTML
```

## Auteur

Mouslihe Mhoma – Testeur QA certifié ISTQB (Agile Tester)
[LinkedIn](https://www.linkedin.com/in/mouslihe-mhoma-a42615223)
