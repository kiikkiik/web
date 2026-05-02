// ЛАБОРАТОРНАЯ №13: РАБОТА С COOKIES
// ФУНКЦИИ РАБОТЫ С COOKIES

// Установка cookie
function setCookie(name, value, days) {
    // Проверяем, включены ли cookies
    if (!navigator.cookieEnabled) {
        console.warn("Cookies отключены в браузере");
        return false;
    }
    
    // Кодируем значение для безопасности
    const encodedValue = encodeURIComponent(value); //защита от ошибок
    
    // Устанавливаем время жизни
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    
    // Устанавливаем cookie для всего сайта
    document.cookie = name + "=" + encodedValue + expires + "; path=/";
    console.log("Cookie установлен:", name, "=", value);
    return true;
}

// Получение cookie
function getCookie(name) {
    if (!navigator.cookieEnabled) {
        return null;
    }
    
    // Получаем все cookies
    const cookies = document.cookie.split(';');
    
    // Ищем нужный cookie
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Проверяем, начинается ли cookie с нужного имени
        if (cookie.indexOf(name + "=") === 0) {
            // Декодируем и возвращаем значение
            const value = cookie.substring(name.length + 1);
            return decodeURIComponent(value);
        }
    }
    
    return null; // Cookie не найден
}

// Удаление cookie
function delCookie(name) {
    if (!navigator.cookieEnabled) {
        return;
    }
    
    // Устанавливаем время в прошлое
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    console.log("Cookie удалён:", name);
}

// РАБОТА С ФОРМОЙ

// Сохранение данных формы в cookies
function saveFormData() {
    const userName = document.getElementById('userName').value;
    const favoriteCake = document.querySelector('input[name="favoriteCake"]:checked');
    const comments = document.getElementById('comments').value;
    
    // Сохраняем каждое поле отдельно
    setCookie('userName', userName || '', 7);
    
    if (favoriteCake) {
        setCookie('favoriteCake', favoriteCake.value, 7);
    } else {
        delCookie('favoriteCake'); // Удаляем, если ничего не выбрано
    }
    
    setCookie('comments', comments || '', 7);
    
    // Обновляем отображение cookies
    updateCookiesDisplay();
    
    alert("Данные успешно сохранены в cookies!");
}

// Загрузка данных формы из cookies
function loadFormData() {
    const userName = getCookie('userName');
    const favoriteCake = getCookie('favoriteCake');
    const comments = getCookie('comments');
    
    if (userName !== null) {
        document.getElementById('userName').value = userName;
    }
    
    if (favoriteCake !== null) {
        const radio = document.querySelector(`input[name="favoriteCake"][value="${favoriteCake}"]`);
        if (radio) {
            radio.checked = true;
        }
    }
    
    if (comments !== null) {
        document.getElementById('comments').value = comments;
    }
    
    // Обновляем отображение cookies
    updateCookiesDisplay();
    
    alert("Данные успешно загружены из cookies!");
}

// Очистка всех cookies формы
function clearFormData() {
    if (confirm("Вы уверены, что хотите удалить все сохранённые данные?")) {
        delCookie('userName');
        delCookie('favoriteCake');
        delCookie('comments');
        
        // Очищаем форму
        document.getElementById('userName').value = '';
        document.querySelectorAll('input[name="favoriteCake"]').forEach(radio => {
            radio.checked = false;
        });
        document.getElementById('comments').value = '';
        
        // Обновляем отображение cookies
        updateCookiesDisplay();
        
        alert("Все данные удалены!");
    }
}

// Обновление отображения текущих cookies
function updateCookiesDisplay() {
    const userName = getCookie('userName');
    const favoriteCake = getCookie('favoriteCake');
    const comments = getCookie('comments');
    
    let cookiesText = "Текущие cookies:\n\n";
    
    if (userName !== null) {
        cookiesText += "userName: " + (userName || "[пусто]") + "\n";
    } else {
        cookiesText += "userName: [не установлен]\n";
    }
    
    if (favoriteCake !== null) {
        cookiesText += "favoriteCake: " + (favoriteCake || "[пусто]") + "\n";
    } else {
        cookiesText += "favoriteCake: [не установлен]\n";
    }
    
    if (comments !== null) {
        cookiesText += "comments: " + (comments || "[пусто]") + "\n";
    } else {
        cookiesText += "comments: [не установлен]\n";
    }
    
    // Показываем общее количество cookies
    const allCookies = document.cookie ? document.cookie.split(';').length : 0;
    cookiesText += "\nВсего cookies на странице: " + allCookies;
    
    document.getElementById('cookiesInfo').textContent = cookiesText;
}

// ИНИЦИАЛИЗАЦИЯ
document.addEventListener('DOMContentLoaded', function() {
    // Подключаем обработчики событий
    document.getElementById('saveBtn').addEventListener('click', saveFormData);
    document.getElementById('loadBtn').addEventListener('click', loadFormData);
    document.getElementById('clearBtn').addEventListener('click', clearFormData);
    
    // Показываем начальное состояние cookies
    updateCookiesDisplay();
    
    console.log("Лабораторная работа №13 загружена");
    console.log("Cookies включены:", navigator.cookieEnabled);
});