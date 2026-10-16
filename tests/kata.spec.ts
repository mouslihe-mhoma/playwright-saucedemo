import { test, expect } from '@playwright/test';

test('recupérer le post n1', async ({request}) => {
  // 1. agir envoyer la requête
  const reponse = await request.get('https://jsonplaceholder.typicode.com/posts/1');

  // 2. Vérifier : le statut et le contenu
  expect(reponse.status()).toBe(200);

  const corps = await reponse.json();
  expect(corps.id).toBe(1);
  expect(corps.title).toBeTruthy();
})
