const { test, expect } = require('@playwright/test');

test.describe('Landing Page Smoke Tests', () => {
  test('loads core sections and updates year', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('#navbar')).toBeVisible();
    await expect(page.locator('#services')).toBeVisible();
    await expect(page.locator('#contact')).toBeVisible();

    const yearText = await page.locator('#currentYear').textContent();
    expect(Number(yearText)).toBeGreaterThanOrEqual(2026);
  });

  test('mobile menu toggles open and closed', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    const hamburger = page.locator('#hamburger');
    const navLinks = page.locator('#navLinks');

    await hamburger.click();
    await expect(navLinks).toHaveClass(/open/);
    await expect(hamburger).toHaveAttribute('aria-expanded', 'true');

    await page.keyboard.press('Escape');
    await expect(navLinks).not.toHaveClass(/open/);
    await expect(hamburger).toHaveAttribute('aria-expanded', 'false');

    await hamburger.click();
    await page.locator('#navLinks a[href="#services"]').click();
    await expect(navLinks).not.toHaveClass(/open/);
    await expect(hamburger).toHaveAttribute('aria-expanded', 'false');
  });

  test('shows validation errors for empty required fields', async ({ page }) => {
    await page.goto('/');

    await page.locator('#submitBtn').click();

    await expect(page.locator('#nameError')).toContainText('Zadejte prosím své celé jméno.');
    await expect(page.locator('#phoneError')).toContainText('Zadejte platné telefonní číslo.');
    await expect(page.locator('#deviceError')).toContainText('Zadejte prosím model vašeho zařízení.');
    await expect(page.locator('#serviceError')).toContainText('Vyberte prosím službu.');
  });

  test('submits form successfully with valid input', async ({ page }) => {
    await page.goto('/');

    await page.fill('#name', 'Test User');
    await page.fill('#phone', '+420 777 888 999');
    await page.fill('#device', 'iPhone 14');
    await page.selectOption('#service', 'screen');
    await page.fill('#message', 'Screen cracked after drop.');

    await page.locator('#submitBtn').click();

    await expect(page.locator('#formSuccess')).toBeVisible();
    await expect(page.locator('#formFail')).toBeHidden();
  });
});
