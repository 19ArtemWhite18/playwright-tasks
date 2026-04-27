import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://osstep.github.io/assertion_tocontaintext');
});

test('1. Проверка статического текста', async ({ page }) => {
  // Задание: Проверить, что статический текстовый блок содержит определенные подстроки
  // 1. Найти элемент #static-text
  const staticText = page.locator('#static-text');
  // 2. Проверить что он содержит текст "static text block"
  await expect(staticText).toContainText('static text block');
  // 3. Проверить что он содержит текст "important information"
  await expect(staticText).toContainText('important information');
  // 4. Проверить что он НЕ содержит текст "dynamic content"
  await expect(staticText).not.toContainText('dynamic content');
});

test('2. Проверка динамически изменяемого текста', async ({ page }) => {
  // Задание: Проверить изменение динамического текста
  // 1. Найти элемент #dynamic-text и проверить что он содержит "Initial dynamic text"
  await expect(page.locator('#dynamic-text')).toContainText('Initial dynamic text');
  // 2. Нажать кнопку #change-text
  await page.locator('#change-text').click();
  // 3. Проверить что текст теперь содержит "Text was changed at"
  await expect(page.locator('#dynamic-text')).toContainText('Text was changed at');
  // 4. Нажать кнопку #add-part
  await page.locator('#add-part').click();
  // 5. Проверить что текст теперь содержит "(additional part)"
  await expect(page.locator('#dynamic-text')).toContainText('(additional part)');
});

test('3. Проверка списка элементов', async ({ page }) => {
  // Задание: Проверить содержимое списка
  // 1. Найти элемент #item-list
  const itemList = page.locator('#item-list');
  // 2. Проверить что он содержит текст "Item 1: Basic"
  await expect(itemList).toContainText('Item 1: Basic');
  // 3. Проверить что он содержит текст "Intermediate"
  await expect(itemList).toContainText('Intermediate');
  // 4. Нажать кнопку #add-item
  await page.locator('#add-item').click();
  // 5. Проверить что список теперь содержит текст "New added item"
  await expect(itemList).toContainText('New added item');
});

test('4. Проверка скрытого/отображаемого текста', async ({ page }) => {
  // Задание: Проверить отображение скрытого текста
  // 1. Найти элемент #hidden-content и проверить что он не видим
  const hiddenContext = page.locator('#hidden-content');
  // 2. Нажать кнопку #toggle-text
  await page.locator('#toggle-text').click();
  // 3. Проверить что элемент теперь содержит текст "special content"
  await expect(hiddenContext).toContainText('special content');
  // 4. Проверить что элемент содержит текст "hidden but now is visible"
  await expect(hiddenContext).toContainText('hidden but now is visible');
});

test('5. Проверка частичного совпадения в длинном тексте', async ({ page }) => {
  // Задание: Проверить частичные совпадения в длинном тексте
  // 1. Найти элемент #partial-text
  const partialText = page.locator('#partial-text');
  // 2. Проверить что он содержит "quick brown fox"
  await expect(partialText).toContainText('quick brown fox');
  // 3. Проверить что он содержит "lazy dog"
  await expect(partialText).toContainText('quick brown fox');
  // 4. Проверить что он содержит "all letters of the English alphabet"
  await expect(partialText).toContainText('all letters of the English alphabet');
  // 5. Проверить что он НЕ содержит "all letters of the Russian alphabet"
  await expect(partialText).not.toContainText('all letters of the Russian alphabet');
});
