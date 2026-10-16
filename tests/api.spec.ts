import { test, expect } from '@playwright/test';

test('récupérer le post n°1', async ({ request }) => {
    // 1. Agir : envoyer la requête
    const reponse = await request.get('https://jsonplaceholder.typicode.com/posts/1');

    // 2. Vérifier : le statut et le contenu
    expect(reponse.status()).toBe(200);

    const corps = await reponse.json();
    expect(corps.id).toBe(1);
    expect(corps.title).toBeTruthy();
});

test('créer un post', async ({ request }) => {
    // 1. Agir : envoyer un nouveau post
    const reponse = await request.post('https://jsonplaceholder.typicode.com/posts', {
        data: {
            title: 'Mon premier test API',
            body: 'Écrit avec Playwright',
            userId: 1,
        },
    });

    // 2. Vérifier : le statut et le contenu
    expect(reponse.status()).toBe(201);

    const corps = await reponse.json();
    expect(corps.title).toBe('Mon premier test API');
    expect(corps.id).toBeTruthy();
});

test('test négatif', async ({ request }) => {
    // 1. Agir : envoyer la requête
    const reponse = await request.get('https://jsonplaceholder.typicode.com/posts/9999');

    // 2. Vérifier : le statut et le contenu
    expect(reponse.status()).toBe(404);

});

test('récupérer tous les posts', async ({ request }) => {
    // 1. Agir : envoyer la requête
    const reponse = await request.get('https://jsonplaceholder.typicode.com/posts/');

    // 2. Vérifier : le statut et le nombre de posts
    expect(reponse.status()).toBe(200);

    const corps = await reponse.json();
    expect(corps.length).toBe(100);
});