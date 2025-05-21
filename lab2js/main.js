/**
 * main.js - Консольное приложение для анализа транзакций
 */

const transactions = [
  {
    transaction_id: "1",
    transaction_date: "2025-05-01",
    transaction_amount: 150.75,
    transaction_type: "credit",
    transaction_description: "Зарплата",
    merchant_name: "Компания X",
    card_type: "debit"
  },
  {
    transaction_id: "2",
    transaction_date: "2025-05-02",
    transaction_amount: 50.00,
    transaction_type: "debit",
    transaction_description: "Покупка продуктов",
    merchant_name: "Магазин Y",
    card_type: "debit"
  },
  {
    transaction_id: "3",
    transaction_date: "2025-04-25",
    transaction_amount: 200.00,
    transaction_type: "credit",
    transaction_description: "Фриланс",
    merchant_name: "Upwork",
    card_type: "credit"
  },
  {
    transaction_id: "4",
    transaction_date: "2025-04-15",
    transaction_amount: 100.00,
    transaction_type: "debit",
    transaction_description: "Оплата аренды",
    merchant_name: "ЖЭК",
    card_type: "debit"
  }
];

/**
 * Возвращает массив уникальных типов транзакций.
 * @param {Array} transactions 
 * @returns {Array}
 */
function getUniqueTransactionTypes(transactions) {
  return [...new Set(transactions.map(t => t.transaction_type))];
}

/**
 * Вычисляет сумму всех транзакций.
 * @param {Array} transactions 
 * @returns {number}
 */
function calculateTotalAmount(transactions) {
  return transactions.reduce((sum, t) => sum + t.transaction_amount, 0);
}

/**
 * Возвращает транзакции указанного типа.
 * @param {Array} transactions 
 * @param {string} type 
 * @returns {Array}
 */
function getTransactionByType(transactions, type) {
  return transactions.filter(t => t.transaction_type === type);
}

/**
 * Возвращает транзакции в указанном диапазоне дат.
 * @param {Array} transactions 
 * @param {string} startDate 
 * @param {string} endDate 
 * @returns {Array}
 */
function getTransactionsInDateRange(transactions, startDate, endDate) {
  return transactions.filter(t => t.transaction_date >= startDate && t.transaction_date <= endDate);
}

/**
 * Возвращает транзакции по названию магазина.
 * @param {Array} transactions 
 * @param {string} merchantName 
 * @returns {Array}
 */
function getTransactionsByMerchant(transactions, merchantName) {
  return transactions.filter(t => t.merchant_name === merchantName);
}

/**
 * Возвращает среднюю сумму транзакций.
 * @param {Array} transactions 
 * @returns {number}
 */
function calculateAverageTransactionAmount(transactions) {
  return transactions.length ? calculateTotalAmount(transactions) / transactions.length : 0;
}

/**
 * Возвращает транзакции в заданном диапазоне сумм.
 * @param {Array} transactions 
 * @param {number} minAmount 
 * @param {number} maxAmount 
 * @returns {Array}
 */
function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
  return transactions.filter(t => t.transaction_amount >= minAmount && t.transaction_amount <= maxAmount);
}

/**
 * Вычисляет общую сумму дебетовых транзакций.
 * @param {Array} transactions 
 * @returns {number}
 */
function calculateTotalDebitAmount(transactions) {
  return calculateTotalAmount(getTransactionByType(transactions, "debit"));
}

/**
 * Возвращает месяц с наибольшим количеством транзакций.
 * @param {Array} transactions 
 * @returns {string}
 */
function findMostTransactionsMonth(transactions) {
  const counts = {};
  for (const t of transactions) {
    const month = t.transaction_date.slice(0, 7);
    counts[month] = (counts[month] || 0) + 1;
  }
  return Object.entries(counts).reduce((a, b) => a[1] > b[1] ? a : b, ["", 0])[0];
}

/**
 * Возвращает месяц с наибольшим количеством дебетовых транзакций.
 * @param {Array} transactions 
 * @returns {string}
 */
function findMostDebitTransactionMonth(transactions) {
  return findMostTransactionsMonth(getTransactionByType(transactions, "debit"));
}

/**
 * Возвращает тип транзакции, который встречается чаще всего.
 * @param {Array} transactions 
 * @returns {string} debit | credit | equal
 */
function mostTransactionTypes(transactions) {
  const debitCount = getTransactionByType(transactions, "debit").length;
  const creditCount = getTransactionByType(transactions, "credit").length;
  if (debitCount > creditCount) return "debit";
  if (creditCount > debitCount) return "credit";
  return "equal";
}

/**
 * Возвращает транзакции, совершенные до указанной даты.
 * @param {Array} transactions 
 * @param {string} date 
 * @returns {Array}
 */
function getTransactionsBeforeDate(transactions, date) {
  return transactions.filter(t => t.transaction_date < date);
}

/**
 * Возвращает транзакцию по ID.
 * @param {Array} transactions 
 * @param {string} id 
 * @returns {Object|null}
 */
function findTransactionById(transactions, id) {
  return transactions.find(t => t.transaction_id === id) || null;
}

/**
 * Возвращает массив описаний транзакций.
 * @param {Array} transactions 
 * @returns {Array}
 */
function mapTransactionDescriptions(transactions) {
  return transactions.map(t => t.transaction_description);
}

// Тестирование функций
console.log("Уникальные типы:", getUniqueTransactionTypes(transactions));
console.log("Общая сумма:", calculateTotalAmount(transactions));
console.log("Дебетовые транзакции:", getTransactionByType(transactions, "debit"));
console.log("Транзакции в диапазоне дат:", getTransactionsInDateRange(transactions, "2025-04-01", "2025-04-30"));
console.log("Транзакции магазина Upwork:", getTransactionsByMerchant(transactions, "Upwork"));
console.log("Средняя сумма:", calculateAverageTransactionAmount(transactions));
console.log("Транзакции по сумме:", getTransactionsByAmountRange(transactions, 100, 200));
console.log("Сумма дебетовых:", calculateTotalDebitAmount(transactions));
console.log("Месяц с наиб. кол-вом:", findMostTransactionsMonth(transactions));
console.log("Месяц с наиб. дебет.:", findMostDebitTransactionMonth(transactions));
console.log("Часто встречающийся тип:", mostTransactionTypes(transactions));
console.log("До даты:", getTransactionsBeforeDate(transactions, "2025-05-01"));
console.log("По ID (3):", findTransactionById(transactions, "3"));
console.log("Описания:", mapTransactionDescriptions(transactions));

// Доп. проверки
console.log("\nПроверка на пустом массиве:");
console.log("Общая сумма:", calculateTotalAmount([]));
console.log("Средняя сумма:", calculateAverageTransactionAmount([]));
console.log("Наибольший месяц:", findMostTransactionsMonth([]));

console.log("\nПроверка на массиве с одной транзакцией:");
const singleTransaction = [transactions[0]];
console.log("Средняя сумма:", calculateAverageTransactionAmount(singleTransaction));
