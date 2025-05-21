import { generateId, formatDate } from './utils.js';

/** @type {Array<Object>} */
export const transactions = [];

/**
 * Добавляет новую транзакцию в массив
 * @param {string} category
 * @param {string} description
 * @param {number} amount
 * @returns {Object} транзакция
 */
export function addTransaction(category, description, amount) {
  const transaction = {
    id: generateId(),
    date: formatDate(),
    category,
    description,
    amount: parseFloat(amount)
  };
  transactions.push(transaction);
  return transaction;
}

/**
 * Удаляет транзакцию по ID
 * @param {string} id
 */
export function removeTransaction(id) {
  const index = transactions.findIndex(t => t.id === id);
  if (index !== -1) {
    transactions.splice(index, 1);
  }
}

/**
 * Подсчет общей суммы
 * @returns {number}
 */
export function calculateTotal() {
  return transactions.reduce((sum, t) => sum + t.amount, 0);
}
