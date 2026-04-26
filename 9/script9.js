//Динамическое изменение DOM

//Глобальный счётчик для уникальных id
let cakeCounter = 0;

//1.ВЫБОР ЭЛЕМЕНТОВ РАЗНЫМИ СПОСОБАМИ

//по уникальному id
const addBtn = document.getElementById("addBtn");
const clearBtn = document.getElementById("clearBtn");
const cakesList = document.getElementById("cakesList");

//по CSS-селектору
const cakeInput = document.querySelector("#cakeName");
const panelBody = document.querySelector(".panel-body");

//по классу
const dynamicItems = document.getElementsByClassName("dynamic-item");

//2.ОБРАБОТКА СОБЫТИЙ ЧЕРЕЗ addEventListener

//Обработчик кнопки "Добавить"
addBtn.addEventListener("click", function() {
    const cakeName = cakeInput.value.trim();
    
    if (cakeName === "") {
        alert("Пожалуйста, введите название торта!");
        return;
    }
    
    //Создаём новый элемент торта
    createCakeItem(cakeName);
    
    //Очищаем поле ввода
    cakeInput.value = "";
    cakeInput.focus();
});

//Обработчик кнопки "Очистить всё"
clearBtn.addEventListener("click", function() {
    if (confirm("Вы уверены, что хотите удалить все тортики?")) {
        cakesList.innerHTML = '<p class="text-muted">Список пуст. Добавьте первый торт!</p>';
        cakeCounter = 0;
        console.log("Все элементы удалены");
    }
});

//Обработчик нажатия Enter в поле ввода
cakeInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addBtn.click(); //Имитируем клик по кнопке
    }
});

//3.ФУНКЦИЯ СОЗДАНИЯ НОВОГО ЭЛЕМЕНТА

function createCakeItem(name) {
    cakeCounter++;
    
    //Создаём основной контейнер
    const cakeDiv = document.createElement("div");
    cakeDiv.className = "dynamic-item";
    cakeDiv.id = "cake-" + cakeCounter;
    
    //Создаём заголовок
    const title = document.createElement("h4");
    title.textContent = name;
    title.style.marginTop = "0";
    title.style.color = "#8B4513";
    
    //Создаём информацию
    const info = document.createElement("p");
    info.innerHTML = `<strong>Дата добавления:</strong> ${new Date().toLocaleString()}<br>
                     <strong>ID элемента:</strong> cake-${cakeCounter}`;
    info.style.fontSize = "12px";
    info.style.color = "#666";
    
    //Создаём кнопку удаления
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-sm btn-danger";
    deleteBtn.innerHTML = '<span class="glyphicon glyphicon-remove"></span> Удалить';
    
    //Обработчик удаления (через делегирование)
    deleteBtn.addEventListener("click", function() {
        cakeDiv.remove();
        console.log(`Элемент cake-${cakeCounter} удалён`);
        
        //Проверяем, стал ли список пустым
        checkEmptyList();
    });
    
    //Собираем элемент
    cakeDiv.appendChild(title);
    cakeDiv.appendChild(info);
    cakeDiv.appendChild(deleteBtn);
    
    //Добавляем в список
    cakesList.appendChild(cakeDiv);
    
    //Убираем сообщение "список пуст", если оно есть
    const emptyMessage = cakesList.querySelector("p.text-muted");
    if (emptyMessage) {
        emptyMessage.remove();
    }
    
    console.log(`Добавлен новый торт: ${name} (ID: cake-${cakeCounter})`);
}

//4.ВСПОМОГАТЕЛЬНАЯ ФУНКЦИЯ ПРОВЕРКИ ПУСТОТЫ

function checkEmptyList() {
    const items = cakesList.querySelectorAll(".dynamic-item");
    if (items.length === 0) {
        cakesList.innerHTML = '<p class="text-muted">Список пуст. Добавьте первый торт!</p>';
        cakeCounter = 0;
    }
}

//5.ДЕЛЕГИРОВАНИЕ СОБЫТИЙ

//Можно также использовать делегирование событий для динамических элементов
cakesList.addEventListener("click", function(event) {
    //Это сработает для всех кнопок удаления, даже добавленных позже
    if (event.target.classList.contains("btn-danger") || 
        event.target.closest(".btn-danger")) {
        //Обработка уже есть в createCakeItem, но можно было бы сделать здесь
    }
});

//6.ИНИЦИАЛИЗАЦИЯ
console.log("Лабораторная работа №9 загружена");
console.log("Используемые методы выбора элементов:");
console.log("- getElementById():", typeof addBtn);
console.log("- querySelector():", typeof cakeInput);
console.log("- getElementsByClassName():", dynamicItems.length + " элементов найдено");