# Отчет по лабораторной работе: Учёт личных финансов с сохранением данных

**Студент:** Иайбуров Артём  
**Группа:** IA-2404

---

## Условие задачи

Разработать веб-приложение для учёта личных финансов с возможностью добавления, отображения и удаления транзакций. Каждая транзакция содержит дату, категорию, сумму и описание. Таблица транзакций должна обновляться динамически. При обновлении страницы данные не должны теряться — использовать localStorage для сохранения.

Основные требования:  
- Структурировать проект с использованием модулей: transactions.js, ui.js, utils.js, index.js  
- Отображать транзакции в таблице с цветовой индикацией (зеленый для положительных, красный для отрицательных сумм)  
- Реализовать добавление и удаление транзакций  
- Показывать полное описание транзакции при клике на строку  
- Отображать общую сумму транзакций  
- Валидировать форму ввода  
- Документировать код с использованием JSDoc

---

## Aлгоритм решения

1. **Инициализация**  
   - При загрузке страницы читаем данные из localStorage, если есть — загружаем в массив transactions.  
   - Отрисовываем таблицу транзакций и обновляем общую сумму.

2. **Добавление транзакции**  
   - Пользователь вводит данные в форму и отправляет её.  
   - Проверяем валидность данных.  
   - Создаём объект транзакции с уникальным id и текущей датой.  
   - Добавляем транзакцию в массив и localStorage.  
   - Добавляем строку в таблицу и обновляем сумму.

3. **Удаление транзакции**  
   - При клике на кнопку удаления удаляем транзакцию из массива и localStorage.  
   - Удаляем строку из таблицы и обновляем сумму.

4. **Отображение полного описания**  
   - При клике на строку таблицы выводим полное описание транзакции ниже таблицы.

5. **Вспомогательные функции**  
   - Генерация уникального id.  
   - Форматирование даты.  
   - Обновление суммы.

---

## Код программы

```js
// src/utils.js
/** 
 * Генерирует уникальный ID
 * @returns {string} Уникальный идентификатор
 */
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

/** 
 * Форматирует дату в строку "DD.MM.YYYY HH:mm"
 * @param {Date} date 
 * @returns {string}
 */
export function formatDate(date) {
  return date.toLocaleDateString('ru-RU') + ' ' + date.toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'});
}

// src/transactions.js
import { generateId, formatDate } from './utils.js';

/** Массив транзакций */
export let transactions = [];

/** 
 * Загружает транзакции из localStorage
 */
export function loadTransactions() {
  const saved = localStorage.getItem('transactions');
  transactions = saved ? JSON.parse(saved) : [];
}

/** 
 * Сохраняет транзакции в localStorage
 */
export function saveTransactions() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

/** 
 * Добавляет транзакцию
 * @param {string} category 
 * @param {string} description 
 * @param {number} amount 
 * @returns {object} Добавленная транзакция
 */
export function addTransaction(category, description, amount) {
  const transaction = {
    id: generateId(),
    date: formatDate(new Date()),
    category,
    description,
    amount,
  };
  transactions.push(transaction);
  saveTransactions();
  return transaction;
}

/** 
 * Удаляет транзакцию по ID
 * @param {string} id 
 */
export function removeTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  saveTransactions();
}

/** 
 * Вычисляет сумму всех транзакций
 * @returns {number}
 */
export function calculateTotal() {
  return transactions.reduce((sum, t) => sum + t.amount, 0);
}

// src/ui.js
import { transactions, addTransaction, removeTransaction, calculateTotal } from './transactions.js';

/** Элементы DOM */
const tableBody = document.querySelector('#transactions-table tbody');
const totalAmountEl = document.getElementById('total-amount');
const descriptionFullEl = document.getElementById('full-description');
const form = document.getElementById('transaction-form');

/** 
 * Создает и добавляет строку таблицы с транзакцией
 * @param {object} transaction 
 */
export function renderTransaction(transaction) {
  const tr = document.createElement('tr');
  tr.dataset.id = transaction.id;
  tr.classList.add(transaction.amount >= 0 ? 'income' : 'expense');

  const shortDesc = transaction.description.split(' ').slice(0,4).join(' ');

  tr.innerHTML = `
    <td>${transaction.date}</td>
    <td>${transaction.category}</td>
    <td>${shortDesc}</td>
    <td><button class="delete-btn">Удалить</button></td>
  `;

  tableBody.appendChild(tr);
}

/** 
 * Обновляет отображение общей суммы
 */
export function updateTotal() {
  const total = calculateTotal();
  totalAmountEl.textContent = total.toFixed(2);
}

/** 
 * Отрисовывает все транзакции из массива
 */
export function renderAllTransactions() {
  tableBody.innerHTML = '';
  transactions.forEach(renderTransaction);
  updateTotal();
}

/** 
 * Инициализация обработчиков событий формы и таблицы
 */
export function setupEventListeners() {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const category = form.category.value;
    const description = form.description.value.trim();
    const amount = parseFloat(form.amount.value);

    if (!category || !description || isNaN(amount)) {
      alert('Заполните все поля корректно!');
      return;
    }

    const transaction = addTransaction(category, description, amount);
    renderTransaction(transaction);
    updateTotal();
    form.reset();
  });

  tableBody.addEventListener('click', e => {
    if (e.target.classList.contains('delete-btn')) {
      const tr = e.target.closest('tr');
      const id = tr.dataset.id;
      removeTransaction(id);
      tr.remove();
      updateTotal();
      descriptionFullEl.textContent = '';
    } else {
      // Показываем полное описание при клике на строку
      const tr = e.target.closest('tr');
      if (!tr) return;
      const id = tr.dataset.id;
      const transaction = transactions.find(t => t.id === id);
      descriptionFullEl.textContent = transaction ? transaction.description : '';
    }
  });
}

// src/index.js
import { loadTransactions } from './transactions.js';
import { renderAllTransactions, setupEventListeners } from './ui.js';

loadTransactions();
renderAllTransactions();
setupEventListeners();
```

---


## Вывод 
В ходе работы над проектом я научился:

* Структурировать код с помощью ES6 модулей

* Работать с DOM для динамического отображения данных

* Использовать localStorage для сохранения данных между сессиями

* Обрабатывать события формы и таблицы

* Писать понятный и документированный код с использованием JSDoc

Приложение корректно добавляет, отображает, удаляет транзакции, сохраняет их при обновлении страницы, а также показывает полное описание выбранной транзакции. Это хороший базовый функционал для системы учёта личных финансов.