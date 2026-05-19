import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://osstep.github.io/assertion_tohaveclass');
});

test('1. Проверка начальных классов элементов', async ({ page }) => {
  // Задание: Проверить начальные классы элементов
  // 1. Найти элемент box1 и проверить что он имеет класс "active"
  await expect(page.locator('#box1')).toHaveClass('box active');
  // 2. Проверить что box1 не имеет класса "error"
  await expect(page.locator('#box1')).not.toHaveClass(/(^|\s)error$/);
  // 3. Найти элемент box2 и проверить что он имеет класс "error"
  await expect(page.locator('#box2')).toHaveClass(/(^|\s)error$/);
  // 4. Найти элемент box3 и проверить что он имеет класс "hidden"
  await expect(page.locator('#box3')).toHaveClass(/(^|\s)hidden$/);
});

test('2. Проверка переключения классов box1', async ({ page }) => {
  // Задание: Проверить изменение классов при взаимодействии
  // 1. Найти элемент box1 и проверить что он имеет класс "active"
  await expect(page.locator('#box1')).toHaveClass('box active');
  // 2. Нажать кнопку "Переключить box1"
  await page.getByRole('button', { name: 'Переключить box1' }).click();
  // 3. Проверить что box1 теперь имеет класс "error"
  await expect(page.locator('#box1')).toHaveClass(/(^|\s)error$/);
  // 4. Проверить что box1 больше не имеет класса "active"
  await expect(page.locator('#box1')).not.toHaveClass(/(^|\s)active$/);
  // 5. Еще раз нажать кнопку
  await page.getByRole('button', { name: 'Переключить box1' }).click();
  // 6. Проверить что классы вернулись к исходным
  await expect(page.locator('#box1')).toHaveClass('box active');
});

test('3. Проверка показа/скрытия элемента', async ({ page }) => {
  // Задание: Проверить классы при скрытии/показе элемента
  // 1. Найти элемент box3 и проверить что он имеет класс "hidden"
  // 2. Нажать кнопку "Показать/скрыть box3"
  // 3. Проверить что box3 больше не имеет класса "hidden"
  // 4. Еще раз нажать кнопку
  // 5. Проверить что класс "hidden" снова присутствует
});

test('4. Проверка классов карточки пользователя', async ({ page }) => {
  // Задание: Проверить классы карточки пользователя
  // 1. Найти карточку пользователя и проверить что у нее нет класса "premium"
  await expect(page.locator('#user-card')).not.toHaveClass(/(^|\s)premium(?=\s|$)/);
  // 2. Нажать кнопку "Перейти на Премиум"
  await page.getByRole('button', { name: 'Перейти на Премиум' }).click();
  // 3. Проверить что карточка получила класс "premium"
  await expect(page.locator('#user-card')).toHaveClass(/(^|\s)premium(?=\s|$)/);
  // 4. Нажать кнопку "Отметить как просроченный"
  await page.getByRole('button', { name: 'Отметить как просроченный' }).click();
  // 5. Проверить что карточка имеет оба класса: "premium" и "expired"
  await expect(page.locator('#user-card')).toHaveClass(/(^|\s)premium(?=\s|$)/);
  await expect(page.locator('#user-card')).toHaveClass(/(^|\s)expired(?=\s|$)/);
  // 6. Проверить что классы содержатся в любом порядке
  await page.getByRole('button', { name: 'Перейти на Премиум' }).dblclick();
  await expect(page.locator('#user-card')).toHaveClass(/(^|\s)premium(?=\s|$)/);
  await expect(page.locator('#user-card')).toHaveClass(/(^|\s)expired(?=\s|$)/);
});

test('5. Проверка элемента с несколькими классами', async ({ page }) => {
  // Задание: Проверить элемент с множеством классов
  // 1. Найти элемент multi-class и проверить что он имеет все классы:
  //    "box", "warning", "large", "rounded" (в любом порядке)
  await expect(page.locator('#multi-class')).toHaveClass(/(^|\s)box(?=\s|$)/);
  await expect(page.locator('#multi-class')).toHaveClass(/(^|\s)warning(?=\s|$)/);
  await expect(page.locator('#multi-class')).toHaveClass(/(^|\s)large(?=\s|$)/);
  await expect(page.locator('#multi-class')).toHaveClass(/(^|\s)rounded(?=\s|$)/);
  // 2. Нажать кнопку "Изменить классы"
  await page.getByRole('button', { name: 'Изменить классы' }).click();
  // 3. Проверить что класс "warning" заменен на "error"
  await expect(page.locator('#multi-class')).not.toHaveClass(/(^|\s)warning(?=\s|$)/);
  await expect(page.locator('#multi-class')).toHaveClass(/(^|\s)error(?=\s|$)/);
  // 4. Проверить что класс "large" удален
  await expect(page.locator('#multi-class')).not.toHaveClass(/(^|\s)large(?=\s|$)/);
  // 5. Проверить что класс "rounded" остался
  await expect(page.locator('#multi-class')).toHaveClass(/(^|\s)rounded(?=\s|$)/);
  // 6. Проверить что элемент имеет класс "box" (основной класс)
  await expect(page.locator('#multi-class')).toHaveClass(/^box(?=\s|$)/);
});
