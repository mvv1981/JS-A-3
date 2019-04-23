В этой задаче необходимо написать функцию, которая проверяет правильность заполнения формы.
Функция называется validateForm и принимает следующие настройки:
formId – идентификатор формы;
formValidClass – класс, добавляемый форме в случае пройденной проверки;
formInvalidClass – класс, добавляемый форме в случае ошибок;
inputErrorClass – класс, добавляемый элементам input в случае ошибочного заполнения.
Пример вызова:
```js
validateForm({
   formId: 'profile',
   formValidClass: 'form_valid',
   formInvalidClass: 'form_invalid',
   inputErrorClass: 'input_error'
});
```
Имеем три файла:
в файлах index.html и index.css реализован пример формы;
в файле script.js нужно разместить код функции и отправить его на проверку.
## Поведение функции
После вызова функция отслеживает события на форме и её элементах, то есть вызывает проверки:
При потере фокуса (blur) элемента input вызывается проверка для этого элемента.
При отправке формы (submit) проверяются все элементы. Обратите внимание, что форму можно отправить несколькими способами: нажатием enter на элементе input и кликом.
Фактической отправки происходить не должно. Страница не должна перезагружаться.
Если элемент не прошел проверку, на него добавляется класс из настройки inputErrorClass.
Класс с ошибкой (inputErrorClass) удаляется при фокусе на элемент (focus).
Если при отправке формы нет ошибок, форме добавляется класс из настройки formValidClass: автоматически появляется сообщение, что форма не содержит ошибок.
Если при отправке формы обнаружены ошибки, в форму добавляется класс из настройки formInvalidClass: автоматически появится сообщение, что форма содержит ошибки.
Одновременно двух сообщений быть не должно.
Проверки элементов
Проверки для конкретного элемента input хранятся в data-атрибутах. Может быть два вида проверки: проверка обязательности заполнения поля и проверка значения по правилу. На одном элементе может быть как и несколько типов проверки, так и ни одной.
## Пример:
```html
<input
       name="name"
       id="profile-name"
       placeholder="Моё имя"
       data-required
       data-validator="letters"
/>
```
## Обязательность поля
Регулируется через атрибут data-required. Наличие этого атрибута означает, что поле обязательно к заполнению.
```html
<input name="name" data-required />
```
## Валидация
Регулируется через атрибуты data-validator (тип валидатора) и data-validator-* (настройки валидатора). Поддерживается три типа валидатора: letters, number, regexp. Одновременно возможен только один тип.
Валидатор letters
Проверяет, что поле содержит только буквы русского и английского алфавита. Настроек не имеет.
Пример:
```html
<input
       name="name"
       id="profile-name"
       placeholder="Моё имя"
       data-required
       data-validator="letters"
/>
```
## Валидатор numbers
Проверяет, что поле содержит число. Имеет следующие настройки:
data-validator-min – минимально возможное число, необязательная настройка;
data-validator-max – максимально возможное число, необязательная настройка.
Пример:
```html
<input
   name="age"
   data-validator="number"
   data-validator-min="0"
   data-validator-max="100"
/>
```
## Валидатор regexp
Проверяет соответствие регулярному выражению. Всегда имеет обязательную настройку data-validator-pattern, содержащую регулярное выражение.
Пример:
```html
<input
   name="phone"
   data-validator="regexp"
   data-validator-pattern="^\+7\\d{10}$"
/>
```
## Обязательные требования
Отслеживать события нужно только на форме и внутри. Никакой реакции на input вне формы быть не должно.
Работать с data-атрибутами нужно через свойство dataset.
Добавлять/удалять классы нужно через свойство classList.
В глобальной области видимости (window) не должно появится ничего кроме функции validateForm.
В HTML и CSS файлых приведён пример формы. Форма может быть другой, задачу необходимо решить в общем случае. Но менять HTML и CSS файлы запрещено.
## Подсказки
Получить значение элемента input можно через свойство value.
Чтобы форма не отправлялась в событии submit нужно вызвать метод preventDefault.
В обработчике события может пригодиться проверка типа таргета. Это можно сделать, проверив tagName у target. Обратите внимание, что название тега вернется в верхнем регистре.
```js
if (event.target.tagName === 'INPUT') {
  // Событие произошло на инпуте
}
```
События focus и blur не всплывают (bubbling). Делегирование можно сделать через перехват события (capturing): в обработчике события третьим параметром передаём true. Подробнее можно ознакомиться в документации этих событий.
## Ссылки
* [Событие submit](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event)
* [Событие focus](https://developer.mozilla.org/en-US/docs/Web/API/Element/focus_event)
* [Событие blur](https://developer.mozilla.org/ru/docs/Web/Events/blur)
## Review criteria
Необходимо будет проанализировать код задания и на наборе тестовых кейсов проверить, что:
соблюдены все обязательные требования;
форма корректно реагирует на события: при наведении на элемент input, при потере фокуса и отправке формы;
корректно работают валидаторы.
