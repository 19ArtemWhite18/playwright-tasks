import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://osstep.github.io/assertion_tohaveurl');
});

test('1. Проверка изменения URL при навигации', async ({ page }) => {
  // Задание: Проверить изменение URL при клике по ссылкам
  // 1. Нажать на ссылку "О нас"
  await page.locator('#about-link').click();
  // 2. Проверить что URL изменился и содержит "#about"
  await expect(page).toHaveURL(/#about/);
  // 3. Нажать на ссылку "Контакты"
  await page.locator('#contacts-link').click();
  // 4. Проверить что URL изменился и содержит "#contacts"
  await expect(page).toHaveURL(/#contacts/);
  // 5. Нажать на ссылку "Главная"
  await page.locator('#home-link').click();
  // 6. Проверить что URL снова содержит "#home"
  await expect(page).toHaveURL(/#home/);
});

test('2. Проверка URL при программной навигации', async ({ page }) => {
  // Задание: Проверить URL после программного перехода
  // 1. Нажать кнопку "Перейти в раздел"
  await page.getByRole('button', { name: 'Перейти в раздел' }).click();
  // 2. Проверить что URL изменился на "#contacts"
  await expect(page).toHaveURL('https://osstep.github.io/assertion_tohaveurl#contacts');
  // 3. Нажать кнопку "Вернуться назад" (back() в истории)
  await page.getByRole('button', { name: 'Вернуться назад' }).click();
  // 4. Проверить что URL вернулся к "#home"
  await expect(page).toHaveURL(/#home/);
});

test('3. Проверка URL после ручного ввода', async ({ page }) => {
  // Задание: Проверить обработку ручного ввода URL
  // 1. Перейти напрямую по URL с хешем "#about"
  await page.goto('https://osstep.github.io/assertion_tohaveurl#about');
  // 2. Проверить что страница отображает раздел "О нас"
  await expect(page.locator('#about-section')).toBeVisible();
  // 3. Проверить что URL содержит "#about"
  await expect(page).toHaveURL(/#about/);
  // 4. Обновить страницу
  await page.reload();
  // 5. Проверить что URL сохранился с "#about"
  await expect(page).toHaveURL(/#about/);
});
