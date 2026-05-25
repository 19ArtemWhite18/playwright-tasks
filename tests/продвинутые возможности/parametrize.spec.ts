import { test, expect } from '@playwright/test';

// Тесты для формы входа
test.describe('Параметризованные тесты формы входа', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/parametrize');
  });

  const loginTestCases = [
    {
      username: 'admin',
      password: 'admin123',
      expected: 'Успешный вход!',
    },
    {
      username: '',
      password: 'anypassword',
      expected: 'Все поля обязательны',
    },
    {
      username: 'testuser',
      password: '123',
      expected: 'Пароль должен быть не менее 6 символов',
    },
  ];

  // Нужно реализовать параметризованный тест на основе массива loginTestCases
  loginTestCases.forEach(({ username, password, expected }) => {
    test(`Check authorization under ${username}`, async ({ page }) => {
      // Шаги теста:
      // 1. Перейти на страницу формы входа
      // 2. Заполнить поле имени пользователя (если не пустое)
      await page.getByPlaceholder('Имя пользователя').fill(username);
      // 3. Заполнить поле пароля
      await page.getByPlaceholder('Пароль').fill(password);
      // 4. Нажать кнопку "Войти"
      await page.getByRole('button', { name: 'Войти' }).click();
      // 5. Проверить сообщение системы
      await expect(page.locator('#message')).toHaveText(expected);
      // 6. Проверить класс сообщения (success/error)
      const messageText = await page.locator('#message').textContent();
      if (messageText === 'Успешный вход!') {
        await expect(page.locator('#message')).toHaveClass('success');
      } else {
        await expect(page.locator('#message')).toHaveClass('error');
      }
    });
  });
});

// Тесты для калькулятора
test.describe('Параметризованные тесты калькулятора', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/parametrize');
  });

  const calculatorTestCases = [
    { a: 5, b: 3, operation: 'add', expected: 8 },
    { a: 10, b: 0, operation: 'add', expected: 10 },
    { a: 4, b: 5, operation: 'multiply', expected: 20 },
  ];

  // Нужно реализовать параметризованный тест на основе массива calculatorTestCases
  calculatorTestCases.forEach(({ a, b, operation, expected }) => {
    test(`Check operation with ${a} and ${b}`, async ({ page }) => {
      // Шаги теста:
      // 1. Перейти на страницу калькулятора
      // 2. Ввести первое число
      await page.getByPlaceholder('Число 1').fill(String(a));
      // 3. Ввести второе число
      await page.getByPlaceholder('Число 2').fill(String(b));
      // 4. Нажать кнопку операции (сложение/умножение)
      let result;
      if (operation === 'add') {
        await page.getByRole('button', { name: 'Сложить' }).click();
        result = a + b;
      } else if (operation === 'multiply') {
        await page.getByRole('button', { name: 'Умножить' }).click();
        result = a * b;
      }
      // 5. Проверить результат вычисления
      await expect(page.locator('#result')).toHaveText(`Результат: ${result}`);
    });
  });
});
