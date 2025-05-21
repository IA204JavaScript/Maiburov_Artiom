import { transactions, addTransaction, removeTransaction, calculateTotal } from './transactions.js';

/**
 * Отображает транзакцию в таблице
 * @param {HTMLElement} tbody
 * @param {Object} transaction
 */
function renderTransaction(tbody, transaction) {
  const tr = document.createElement('tr');
  tr.dataset.id = transaction.id;
  tr.className = transaction.amount >= 0 ? 'income' : 'expense';

  tr.innerHTML = `
    <td>${transaction.date}</td>
    <td>${transaction.category}</td>
    <td>${transaction.description.split(' ').slice(0, 4).join(' ')}...</td>
    <td><button class="delete-btn">Удалить</button></td>
  `;

  tbody.appendChild(tr);
}

/**
 * Обновляет общую сумму
 * @param {HTMLElement} totalAmountEl
 */
function updateTotal(totalAmountEl) {
  totalAmountEl.textContent = calculateTotal().toFixed(2);
}

/**
 * Отображает полное описание
 * @param {HTMLElement} fullDescription
 * @param {string} description
 */
function showFullDescription(fullDescription, description) {
  fullDescription.textContent = `Полное описание: ${description}`;
}

/**
 * Инициализация событий
 */
export function setupEventListeners() {
  document.addEventListener('DOMContentLoaded', () => {
    const tbody = document.querySelector('#transactions-table tbody');
    const totalAmountEl = document.getElementById('total-amount');
    const fullDescription = document.getElementById('full-description');
    const form = document.getElementById('transaction-form');

    form.addEventListener('submit', e => {
      e.preventDefault();
      const description = document.getElementById('description').value.trim();
      const amount = parseFloat(document.getElementById('amount').value);
      const category = document.getElementById('category').value;

      if (!description || isNaN(amount) || !category) {
        alert('Пожалуйста, заполните все поля!');
        return;
      }

      const transaction = addTransaction(category, description, amount);
      renderTransaction(tbody, transaction);
      updateTotal(totalAmountEl);
      form.reset();
    });

    document.getElementById('transactions-table').addEventListener('click', e => {
      const tr = e.target.closest('tr');
      if (!tr) return;

      const id = tr.dataset.id;
      const transaction = transactions.find(t => t.id === id);

      if (e.target.classList.contains('delete-btn')) {
        removeTransaction(id);
        tr.remove();
        updateTotal(totalAmountEl);
        fullDescription.textContent = '';
      } else {
        showFullDescription(fullDescription, transaction.description);
      }
    });
  });
}
