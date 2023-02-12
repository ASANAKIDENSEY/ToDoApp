// 1) Получить элементы со страницы 
// 2) Создать массив/объект(локальную БД) 
// 3)Повесить обработчик события при клике 
// 4)Сделать так что бы при вводе в инпут, информация добавлялась в БД
// 5) После того как информация будет в БД, получить её, вывести и показать ее в нужном элементе на странице 
// 6) Создать функцию, которая будет удалять элемент со страницы по клике на кнопку удалить
// 7) Добавить функцию, что бы при нажатии на клавишу/... , добавлялся класс к элементу, который будет изменять цвет текста

// 'use strict';
window.addEventListener('DOMContentLoaded', () => {
    //Получаем элементы со страницы
    let addTodoMessege = document.querySelector('.textToDo'), // Инпут
          addBtn = document.querySelector('.add'), //Кнопка
          todo = document.querySelector('.todo');//Список где будут задачи

    //Создаем массив в котором будут хранится задачи
    let toDoList = [];


    //Скрипт который проверяет данные с ключем "todo", и подтягиватьих на страницу
    if(localStorage.getItem('localdatabase')) {
        toDoList = JSON.parse(localStorage.getItem('localdatabase'));
        createNewTodo();
    }

    

    //Создаем обработчик событий
    addBtn.addEventListener('click', () => {
        let newToDo = {
            todo: addTodoMessege.value,
            checked: false,
            important: false        
        };

    toDoList.push(newToDo);
    createNewTodo(); 
    localStorage.setItem('localdatabase', JSON.stringify(toDoList));//Преобразовываем массив в строку
    });

    //Создаем функцию которая будет выводить данные из массива на страницу 
    //И вызываем эту функцию каждый раз при нажатии на кнопку
    function createNewTodo () {
        let createNewTodo = '';
        if (toDoList === 0) todo.innerHTML = '';
        toDoList.forEach(function(item, i){
            createNewTodo += `
            <li>
                <input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
                <label for='item_${i}' class="${item.importantToDo ? 'importantToDo' : ''}">${item.todo}</label>
            </li>
            `;

            todo.innerHTML = createNewTodo;
        });
    };
    todo.addEventListener('change', function(event){
        let idInput = (event.target.getAttribute('id'));
        let valueLabel = todo.querySelector('[for='+ idInput +']').innerHTML;
        
        toDoList.forEach(function(item){
            if (item.todo === valueLabel) {
                item.checked = !item.checked;
                localStorage.setItem('localdatabase', JSON.stringify(toDoList));
            }
        });
    });

    todo.addEventListener('contextmenu', function(event){
        event.preventDefault();
        toDoList.forEach(function(item, i){
            if(item.todo === event.target.innerHTML){
                if(event.ctrKey || event.metaKey){
                    toDoList.splice(i, 1);
                } else {
                    item.importantToDo = !item.importantToDo;
                } 
                
                createNewTodo();
                localStorage.setItem('localdatabase', JSON.stringify(toDoList));
            }
        });
        
    });
    
});


