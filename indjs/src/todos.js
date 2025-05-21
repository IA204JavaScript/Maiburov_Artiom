import { generateId } from './utils.js';

/** Массив задач */
let todos = [];

/**
 * Загружает задачи из localStorage
 */
export function loadTodos() {
  const saved = localStorage.getItem('todos');
  todos = saved ? JSON.parse(saved) : [];
}

/**
 * Сохраняет задачи в localStorage
 */
export function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

/**
 * Добавляет новую задачу
 * @param {string} text
 * @returns {object} новая задача
 */
export function addTodo(text) {
  const todo = {
    id: generateId(),
    text,
    completed: false,
  };
  todos.push(todo);
  saveTodos();
  return todo;
}

/**
 * Удаляет задачу по id
 * @param {string} id
 */
export function removeTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  saveTodos();
}

/**
 * Переключает статус выполнения задачи
 * @param {string} id
 */
export function toggleTodo(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos();
  }
}

/**
 * Редактирует текст задачи
 * @param {string} id
 * @param {string} newText
 */
export function editTodo(id, newText) {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.text = newText;
    saveTodos();
  }
}

/**
 * Получить задачи с фильтрацией и поиском
 * @param {string} filter - all | active | completed
 * @param {string} searchTerm
 * @returns {Array}
 */
export function getFilteredTodos(filter = 'all', searchTerm = '') {
  let filtered = todos;

  if (filter === 'active') {
    filtered = filtered.filter(t => !t.completed);
  } else if (filter === 'completed') {
    filtered = filtered.filter(t => t.completed);
  }

  if (searchTerm.trim()) {
    filtered = filtered.filter(t =>
      t.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return filtered;
}
