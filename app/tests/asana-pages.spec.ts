import { test, expect, Page } from '@playwright/test';
import manifest from '../knowledge/manifest.json';

// Collapsible section names that always exist
const ALWAYS_PRESENT_SECTIONS = ['The Script', 'Impact', 'Anatomy'];

// Collapsible section names that may or may not exist depending on asana data
const CONDITIONAL_SECTIONS = ['Props & Guidance', 'Assists', 'Elevated Vocabulary'];

async function expandSection(page: Page, sectionName: string): Promise<boolean> {
  const sectionButton = page.locator('button', { has: page.locator(`h3:has-text("${sectionName}")`) });

  if (await sectionButton.isVisible({ timeout: 1000 }).catch(() => false)) {
    await sectionButton.click();
    // Wait for expansion animation
    await page.waitForTimeout(350);
    return true;
  }
  return false;
}

test.describe('Asana Pages - Expand All Collapsible Sections', () => {
  for (const asana of manifest.poses) {
    test(`[${asana.id}] ${asana.title || asana.id} - page loads and all sections expand without errors`, async ({ page }) => {
      const errors: string[] = [];

      // Capture any JavaScript errors
      page.on('pageerror', (error) => {
        errors.push(error.message);
      });

      // Capture console errors
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          errors.push(`Console error: ${msg.text()}`);
        }
      });

      // Navigate to the asana page
      await page.goto(`/asanas/${asana.id}`);

      // Wait for the page to be fully loaded
      await expect(page.locator('h1')).toBeVisible();

      // "The Script" is expanded by default, so click other sections
      // First collapse "The Script" to test toggling
      await expandSection(page, 'The Script');

      // Expand all always-present sections
      for (const section of ALWAYS_PRESENT_SECTIONS) {
        await expandSection(page, section);
      }

      // Try to expand conditional sections (they may not exist for all asanas)
      for (const section of CONDITIONAL_SECTIONS) {
        await expandSection(page, section);
      }

      // Assert no errors occurred
      expect(errors, `Errors found on ${asana.id} page: ${errors.join(', ')}`).toHaveLength(0);
    });
  }
});

test.describe('Asana List Page', () => {
  test('asanas list page loads without errors', async ({ page }) => {
    const errors: string[] = [];

    page.on('pageerror', (error) => {
      errors.push(error.message);
    });

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(`Console error: ${msg.text()}`);
      }
    });

    await page.goto('/asanas');

    // Wait for the list to load
    await expect(page.locator('h1')).toBeVisible();

    // Check that asana cards are visible
    const asanaLinks = page.locator('a[href^="/asanas/"]');
    await expect(asanaLinks.first()).toBeVisible();

    expect(errors).toHaveLength(0);
  });
});
