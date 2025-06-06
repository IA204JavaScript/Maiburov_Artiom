# Отчет по лабораторной работе: Основы JavaScript в браузере

**Студент:** Майбуров Артём

**Группа:** IA-2404

---

## Условие задачи

### Задание 1. Выполнение кода в браузере

1. Установить VS Code и Node.js.
2. Открыть DevTools в браузере (F12 → Консоль).
3. Выполнить команды `console.log("Hello, world!")` и `2 + 3` в консоли.
4. Создать файл `index.html` со встроенным JavaScript:
   - Показать сообщение через `alert`.
   - Вывести в консоль сообщение.
5. Создать файл `script.js` и подключить его к `index.html`.

### Задание 2. Работа с типами данных и условиями

1. Объявить переменные `name`, `birthYear`, `isStudent`.
2. Вывести переменные в консоль.
3. Запросить у пользователя балл и вывести сообщение в зависимости от значения.
4. Вывести 5 итераций цикла `for`.

---

## Aлгоритм решения

1. Создан HTML-файл `index.html` с подключенным внешним скриптом `script.js`.
2. Внутри `index.html` встроен скрипт с `alert` и `console.log`.
3. В `script.js` реализовано:
   - Сообщение через `alert`.
   - Вывод переменных разных типов в консоль.
   - Обработка пользовательского ввода с помощью `prompt`.
   - Условия и цикл `for` с выводом в консоль.

---

## Код программы

### 📄 index.html

```html
<!DOCTYPE html>
<html lang="en">
 <head>
   <title>Привет, мир!</title>
   <script src="script.js"></script>
 </head>
 <body>
   <script>
     alert("Привет, мир!");
     console.log("Hello, console!");
   </script>
 </body>
</html>
```

### 📄 script.js

```js
alert("Этот код выполнен из внешнего файла!");
console.log("Сообщение в консоли");

name = "Artiom";
birthYear = 2004;
isStudent = true;

console.log(name, birthYear, isStudent);

let score = prompt("Введите ваш балл:");
if (score >= 90) {
  console.log("Отлично!");
} else if (score >= 70) {
  console.log("Хорошо");
} else {
  console.log("Можно лучше!");
}

for (let i = 1; i <= 5; i++) {
  console.log(`Итерация: ${i}`);
}
```

---

## Вывод

В ходе выполнения лабораторной работы я познакомился с базовыми возможностями JavaScript в браузере. Я научился:

- Создавать HTML-документ и подключать к нему внешний JS-файл.
- Использовать встроенные функции `alert`, `console.log`, `prompt`.
- Работать с переменными разных типов.
- Использовать условные операторы и циклы.

Работа помогла закрепить базовые знания JavaScript и понять, как он взаимодействует с HTML-страницей. Всё было понятно и интересно. Код выполнялся корректно как во встроенном, так и во внешнем скрипте.

---
