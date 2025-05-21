# Индивидуальная работа: To-Do List (Список задач)  
**Студент:** Артём Майбуров 
**Группа:** IA-2404

---

## Условие задачи

Разработать веб-приложение To-Do List с возможностью добавления, удаления, редактирования, поиска и фильтрации задач по статусу. Использовать чистый JavaScript, работать с DOM, обработчиками событий и массивами объектов. Реализовать удобный пользовательский интерфейс и обеспечить валидацию ввода.

---

## Aлгоритм решения

1. Создать базовую HTML-структуру с формой и списком задач.  
2. Описать стили для приятного интерфейса.  
3. Реализовать функционал на JavaScript:  
   - Массив объектов задач с id, текстом и статусом.  
   - Добавление, удаление, редактирование и смена статуса задач.  
   - Отрисовка списка задач и обновление DOM.  
   - Обработчики событий для интерактивности.  
4. Проверить работу и валидировать ввод.

---

## Код программы

### index.html

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <title>To-Do List</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <h1>To-Do List</h1>
  <form id="todo-form">
    <input type="text" id="todo-input" placeholder="Введите задачу" required />
    <button type="submit">Добавить</button>
  </form>

  <ul id="todo-list"></ul>

  <script src="index.js" type="module"></script>
</body>
</html>
```

```css
body {
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 2em auto;
  padding: 0 1em;
  background: #f9f9f9;
}

h1 {
  text-align: center;
}

#todo-form {
  display: flex;
  margin-bottom: 1em;
}

#todo-input {
  flex-grow: 1;
  padding: 0.5em;
  font-size: 1em;
}

button {
  padding: 0.5em 1em;
  font-size: 1em;
}

#todo-list {
  list-style: none;
  padding: 0;
}

.todo-item {
  padding: 0.5em;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: #999;
}

.todo-text {
  cursor: pointer;
  flex-grow: 1;
  user-select: none;
}

.todo-actions button {
  margin-left: 0.5em;
}
```

```js
import { addTodo, removeTodo, toggleTodo, getTodos } from './todos.js';
import { renderTodos } from './ui.js';

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');

function init() {
  renderTodos(getTodos());

  form.addEventListener('submit', e => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return alert('Введите текст задачи!');
    addTodo(text);
    input.value = '';
    renderTodos(getTodos());
  });

  document.getElementById('todo-list').addEventListener('click', e => {
    if (e.target.classList.contains('delete')) {
      const id = e.target.closest('li').dataset.id;
      removeTodo(id);
      renderTodos(getTodos());
    } else if (e.target.classList.contains('todo-text')) {
      const id = e.target.closest('li').dataset.id;
      toggleTodo(id);
      renderTodos(getTodos());
    }
  });
}

init();

``` 
---

## Вывод
В результате выполнения проекта я научился создавать динамичные веб-приложения с помощью чистого JavaScript, работать с DOM, обрабатывать пользовательские события и реализовывать структуру приложения с помощью модулей. У меня получилось сделать удобный To-Do List, который позволяет добавлять, удалять, редактировать задачи и менять их статус одним кликом. Работа помогла укрепить понимание основ JS и взаимодействия с веб-страницей.

---

## Инструкции по запуску
* Скачать проект или клонировать репозиторий.

* Открыть index.html в современном браузере.

* Для корректной работы модулей рекомендуется запускать через локальный сервер (например, расширение Live Server для VS Code).

* Вводить задачи в поле и работать с ними через интерфейс.

---

## Автор
Майбуров Артём

## Группа
IA-2404