/**
 * Генерация уникального ID
 * @returns {string}
 */
export function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Форматирует дату в локальный формат
 * @returns {string}
 */
export function formatDate(date = new Date()) {
  return date.toLocaleString('ru-RU');
}
