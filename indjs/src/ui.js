import { addTodo, removeTodo, toggleTodo, editTodo, getFilteredTodos } from './todos.js';

const todoListEl = document.getElementById('todo-list');
const searchInputEl = document.getElementById('search-input');
const filterSelectEl = document.getElementById('filter-select');

/**
 * Создаёт элемент задачи и возвращает его
 * @param {object} todo
 * @returns {HTMLElement}
 */
function createTodoElement(todo) {
  const li = document.createElement('li');
  li.className = 'todo-item';
  if (todo.completed) li.classList.add('completed');
  li.dataset.id = todo.id;

  const textSpan = document.createElement('span');
  textSpan.className = 'todo-text';
  textSpan.textContent = todo.text;

  // Двойной клик для редактирования
  textSpan.addEventListener('dblclick', () => startEditing(li, todo));

  // Клик по тексту - переключить статус
  textSpan.addEventListener('click', () => {
    toggleTodo(todo.id);
    renderTodos();
  });

  const actionsDiv = document.createElement('div');
  actionsDiv.className = 'todo-actions';

  const editBtn = document.createElement('button');
  editBtn.className = 'edit';
  editBtn.textContent = '✏️';
  editBtn.title = 'Редактировать';
  editBtn.addEventListener('click', () => startEditing(li, todo));

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete';
  deleteBtn.textContent = '🗑️';
  deleteBtn.title = 'Удалить';
  deleteBtn.addEventListener('click', () => {
    removeTodo(todo.id);
    renderTodos();
  });

  actionsDiv.append(editBtn, deleteBtn);
  li.append(textSpan, actionsDiv);

  return li;
}

/**
 * Начинает редактирование задачи
 * @param {HTMLElement} li
 * @param {object} todo
 */
function startEditing(li, todo) {
  li.innerHTML = '';

  const input = document.createElement('input');
  input.type = 'text';
  input.value = todo.text;
  input.className = 'todo-edit-input';

  // Сохранение по Enter и потеря фокуса
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      finishEditing(li, todo, input.value);
    } else if (e.key === 'Escape') {
      renderTodos();
    }
  });

  input.addEventListener('blur', () => {
    finishEditing(li, todo, input.value);
  });

  li.appendChild(input);
  input.focus();
}

/**
 * Завершает редактирование задачи
 * @param {HTMLElement} li
 * @param {object} todo
 * @param {string} newText
 */
function finishEditing(li, todo, newText) {
  if (newText.trim()) {
    editTodo(todo.id, newText.trim());
  }
  renderTodos();
}

/**
 * Отрисовывает список задач с учётом фильтра и поиска
 */
export function renderTodos() {
  const filter = filterSelectEl.value;
  const searchTerm = searchInputEl.value;

  const todosToShow = getFilteredTodos(filter, searchTerm);

  todoListEl.innerHTML = '';
  todosToShow.forEach(todo => {
    todoListEl.appendChild(createTodoElement(todo));
  });
}

/**
 * Инициализация обработчиков формы и фильтров
 */
export function setupUIHandlers() {
  const form = document.getElementById('todo-form');
  const todoInput = document.getElementById('todo-input');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (!text) {
      alert('Введите текст задачи');
      return;
    }
    addTodo(text);
    todoInput.value = '';
    renderTodos();
  });

  searchInputEl.addEventListener('input', renderTodos);
  filterSelectEl.addEventListener('change', renderTodos);
}
