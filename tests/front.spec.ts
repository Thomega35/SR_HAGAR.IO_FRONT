import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://sr.thomega.fr/');
});

test('has title', async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Hagar.io/);
});

test('Test change name 1', async ({ page }) => {
  await page.getByRole('link', { name: 'Profile' }).click();
  await page.getByLabel('Enter your InGame name:').fill('TestPlaywright');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('TestPlaywright')).toBeVisible();
});

test('Test change name 2', async ({ page }) => {
  await page.getByRole('link', { name: 'Profile' }).click();
  await page.getByLabel('Enter your InGame name:').fill('TestPlaywright');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('link', { name: 'Home' }).click();
  await expect(page.getByText('TestPlaywright')).toBeVisible();
});

test('Test no start game on profile', async ({ page }) => {
  await page.getByRole('link', { name: 'Profile' }).click();
  await expect(page.getByRole('button', { name: 'Start Game' })).toBeHidden();
});

test('Test Home Button', async ({ page }) => {
  await page.getByRole('link', { name: 'Profile' }).click();
  await page.getByRole('link', { name: 'Home' }).click();
  await expect(page.getByRole('heading', { name: /Hello/})).toBeVisible();
});

test('Test start game', async ({ page }) => {
  await page.getByRole('button', { name: 'Start Game' }).click();
  await expect(page.getByRole('button', { name: 'Stop Game' })).toBeVisible();
});

test('Test stop game', async ({ page }) => {
  await page.getByRole('button', { name: 'Start Game' }).click();
  await page.getByRole('button', { name: 'Stop Game' }).click();
  await expect(page.getByRole('button', { name: 'Start Game' })).toBeVisible();
});


test('Test Three moves', async ({ page }) => {
  await page.getByRole('button', { name: 'Start Game' }).click();
  // move mouse to random position
  await page.mouse.move(500, 500);
  await page.waitForTimeout(2000);
  await page.mouse.move(200 + Math.random() * 500, 200 + Math.random() * 500);
  await page.waitForTimeout(2000);
  await page.mouse.move(200 + Math.random() * 500, 200 + Math.random() * 500);
  await page.waitForTimeout(2000);
  await expect(page.getByRole('button', { name: 'Stop Game' })).toBeVisible();
});
