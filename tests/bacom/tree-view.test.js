import { expect, test } from '@playwright/test';
import { TreeView } from '../../selectors/bacom/tree-view.page.js';

const TreeViewSpec = require('../../features/bacom/tree-view.spec.js');

const { features } = TreeViewSpec;

test.describe('BACOM Tree-viewblock test suite', () => {
  test(
    `${features[0].name}, @bacom_live, ${features[0].tags}, https://bacom.adobe.com`,
    async ({ page, baseURL }) => {
      const treeView = new TreeView(page);
      const testPage = `${baseURL}${features[0].path}`;

      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');

      await test.step('Verifying collapsed state', async () => {
        const beforeClick = await treeView.getFirstAccordionState();

        await expect(beforeClick).toBe('false');
        await expect(treeView.firstAccordionFirstItem).not.toBeVisible();
      });

      await test.step('Verifying the expanded state', async () => {
        await treeView.firstAccordionButton.click();

        const afterClick = await treeView.getFirstAccordionState();

        await expect(afterClick).toBe('true');
      });

      await test.step('Verifying the ability to click the links inside the accordion', async () => {
        await expect(treeView.firstAccordionFirstItem).toBeVisible();
        await treeView.firstAccordionFirstItem.click();
        await expect(page.url()).not.toBe(testPage);
      });
    },
  );
});