# Список покупок🛒

## Опис проєкту

Цей проєкт є простим вебдодатком для ведення списку покупок. Він дозволяє користувачам додавати, редагувати та видаляти товари зі свого списку покупок, а також відзначати їх як куплені або не куплені.

## Файли в репозиторії

- `index.html`: Основний HTML файл, що містить структуру вебсторінки.
- `styles.css`: CSS файл, що містить стилі для вебсторінки.
- `script.js` : JavaScript файл, що містить логіку додатку.
- `Ukrainian-flag.svg`: Іконка прапора України, що використовується для сайту.

## Попередній перегляд

Ви можете протестувати сайт за цим посиланням: [uyd281esp7kwx61wr0a9onlf31.tiiny.site](https://uyd281esp7kwx61wr0a9onlf31.tiiny.site/)

## Встановлення

Щоб запустити цей проєкт локально, виконайте наступні кроки:

1. Склонуйте репозиторій:
   ```bash
   git clone https://github.com/Official-Echo/ShopList.git
   ```
2. Перейдіть до директорії проєкту:
   ```bash
   cd ShopList
   ```
3. Відкрийте файл `index.html` у вашому браузері.

## Використання

### Додавання товару

1. Введіть назву товару в полі вводу.
2. Натисніть кнопку "Додати".

### Редагування товару

- Щоб змінити кількість товару, натисніть кнопку `−` для зменшення або `+` для збільшення кількості.
- Щоб змінити статус товару на "Куплено" або "Не куплено", натисніть відповідну кнопку.
- Щоб змінити назву товару, клікніть на назву товару та відредагуйте її.

### Видалення товару

- Натисніть кнопку `×` біля товару, який ви хочете видалити.

## Особливості

- **Підказки**: Кожна кнопка має підказку, яка з'являється при наведенні курсора. Це допомагає користувачам зрозуміти функціональність кнопок.
- **Сприйнятливий дизайн**: Сторінка адаптована для перегляду на різних пристроях.
- **Принт-версія**: Є окремий стиль для друку, який приховує зайві елементи.

## Приклад коду

### HTML

```html
<div class="input-container">
  <input type="text" placeholder="Назва товару" id="product-name" />
  <button
    id="add-button"
    data-tooltip="Натисніть для додавання товару до списку продуктів"
  >
    Додати
  </button>
</div>
```

### CSS

```css
button::after {
  width: max-content;
  white-space: normal;
  content: attr(data-tooltip);
  background-color: violet;
  color: white;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 14px;
  position: absolute;
  bottom: calc(100% + 5px);
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

button[data-tooltip]:hover::after {
  opacity: 1;
}
```

### JavaScript

```js
function addProduct() {
  const inputProductName = inputField.value.trim();
  if (inputProductName) {
    const existingProduct = initialProducts.find(
      (product) => product.name.toLowerCase() === inputProductName.toLowerCase()
    );
    if (existingProduct && !existingProduct.purchased) {
      existingProduct.quantity++;
    } else {
      const newProduct = {
        name: inputProductName,
        quantity: 1,
        purchased: false,
      };
      initialProducts.push(newProduct);
    }
    renderProducts();
    inputField.value = "";
    inputField.focus();
  }
}
```

## Внесок

Якщо ви хочете зробити внесок у цей проєкт, будь ласка, створіть форк репозиторію та відправте pull request з вашими змінами.

---

<br>
Зроблено з ❤️ в Україні🇺🇦
<br><br>

---

Не забудьте залишити зірочку на GitHub, якщо вам сподобався цей проєкт 🌟

![GitHub Stars](https://img.shields.io/github/stars/Official-Echo/ShopList?style=social)
