import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://osstep.github.io/assertion_tohavetext');
});

test('1. Проверка точного соответствия текста', async ({ page }) => {
  // Задание: Проверить точное соответствие текста
  // 1. Найти элемент #exact-text
  // 2. Проверить что его текст точно соответствует:
  //    "This text must match exactly, including punctuation! (100%)"
  // 3. Убедиться что проверка чувствительна к регистру, пробелам и знакам препинания
  // Негативные проверки
  await expect(page.locator('#exact-text')).toHaveText(
    'This text must match exactly, including punctuation! (100%)',
  );
});

test('2. Проверка работы счетчика', async ({ page }) => {
  // Задание: Проверить точное значение счетчика
  // 1. Найти элемент #counter и проверить что его текст "0"
  const counter = page.locator('#counter');
  await expect(counter).toHaveText('0');
  // 2. Нажать кнопку #increment
  await page.locator('#increment').click();
  // 3. Проверить что текст стал "1"
  await expect(counter).toHaveText('1');
  // 4. Нажать кнопку #reset
  await page.locator('#reset').click();
  // 5. Проверить что текст снова "0"
  await expect(counter).toHaveText('0');
});

test('3. Проверка карточки пользователя', async ({ page }) => {
  // Задание: Проверить точные тексты в карточке пользователя
  // 1. Проверить что #username содержит "user_guest"
  await expect(page.locator('#username')).toHaveText('user_guest');
  // 2. Проверить что #user-email содержит "guest@example.com"
  await expect(page.locator('#user-email')).toHaveText('guest@example.com');
  // 3. Проверить что #user-status содержит "Inactive"
  await expect(page.locator('#user-status')).toHaveText('Inactive');
  // 4. Нажать кнопку #activate-user
  await page.locator('#activate-user').click();
  // 5. Проверить что все тексты изменились точно:
  //    - username: "user_active"
  //    - email: "active.user@example.com"
  //    - status: "Active"
  await expect(page.locator('#username')).toHaveText('user_active');
  await expect(page.locator('#user-email')).toHaveText('active.user@example.com');
  await expect(page.locator('#user-status')).toHaveText('Active');
});

test('4. Проверка форматированного текста', async ({ page }) => {
  // Задание: Проверить текст с пробелами и переносами строк
  // 1. Найти элемент #formatted-text
  // 2. Проверить что его текст точно соответствует (включая все пробелы и переносы):
  //    "Text   with   extra   spaces   and\n        line\n        breaks"
  await expect(page.locator('#formatted-text')).toHaveText(
    'Text   with   extra   spaces   and\n        line\n        breaks',
  );
});

test('5. Проверка динамического списка', async ({ page }) => {
  // Задание: Проверить точное содержание списка
  // 1. Найти элемент #items-list
  const itemsList = page.locator('#items-list');
  // 2. Проверить что он содержит точно:
  //    "First item\nSecond item" (для <ul> текст всех элементов объединяется с \n)
  await expect(itemsList).toHaveText('First item\nSecond item');
  // 3. Нажать кнопку #add-item
  await page.locator('#add-item').click();
  // 4. Проверить что текст теперь: "First item\nSecond item\nItem 3"
  await expect(itemsList).toHaveText('First item\nSecond item\nItem 3');
  // 5. Нажать #clear-list
  await page.locator('#clear-list').click();
  // 6. Проверить что текст стал: "Empty list"
  await expect(itemsList).toHaveText('Empty list');
});
