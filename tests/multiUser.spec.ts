import { test, expect } from '@playwright/test';

test('Test 10 players', async ({ context }) => {
  for (let i = 0; i < 10; i++) {
    // Create a page.
    const page = await context.newPage(); 
    await page.goto('https://sr.thomega.fr/');
    await page.getByRole('button', { name: 'Start Game' }).click();
    // move mouse to random position
    await page.mouse.move(500, 500);
    await page.mouse.move(200 + Math.random() * 500, 200 + Math.random() * 500);
    await page.mouse.move(200 + Math.random() * 500, 200 + Math.random() * 500);
    await expect(page.getByRole('button', { name: 'Stop Game' })).toBeVisible();
  }
});

test('Test 20 players', async ({ context }) => {
  for (let i = 0; i < 20; i++) {
    // Create a page.
    const page = await context.newPage(); 
    await page.goto('https://sr.thomega.fr/');
    await page.getByRole('button', { name: 'Start Game' }).click();
    // move mouse to random position
    await page.mouse.move(500, 500);
    await page.mouse.move(200 + Math.random() * 500, 200 + Math.random() * 500);
    await page.mouse.move(200 + Math.random() * 500, 200 + Math.random() * 500);
    await expect(page.getByRole('button', { name: 'Stop Game' })).toBeVisible();
  }
});

test('Test 100 players', async ({ context }) => {
  test.setTimeout(120000);
  for (let i = 0; i < 100; i++) {
    // Create a page.
    const page = await context.newPage(); 
    await page.goto('https://sr.thomega.fr/');
    await page.getByRole('button', { name: 'Start Game' }).click();
    // move mouse to random position
    await page.mouse.move(500, 500);
    await page.mouse.move(200 + Math.random() * 500, 200 + Math.random() * 500);
    await page.mouse.move(0 + Math.random() * 1000, 0 + Math.random() * 1000  );
    await expect(page.getByRole('button', { name: 'Stop Game' })).toBeVisible();
  }
});
