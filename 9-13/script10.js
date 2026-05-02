//ЛАБОРАТОРНАЯ №10: ФОРМЫ И ЭЛЕМЕНТЫ ФОРМ

// Получаем форму и все её элементы
const form = document.getElementById('cakeOrderForm');
const clientName = document.getElementById('clientName');
const email = document.getElementById('email');
const cakeType = document.getElementById('cakeType');
const customCakeGroup = document.getElementById('customCakeGroup');
const customCake = document.getElementById('customCake');
const submitBtn = document.getElementById('submitBtn');
const formDataOutput = document.getElementById('formDataOutput');

//1. ЗАВИСИМОСТИ МЕЖДУ ЭЛЕМЕНТАМИ

// Показываем/скрываем поле "Свой вариант" при выборе типа торта
cakeType.addEventListener('change', function() {
    if (this.value === 'custom') {
        customCakeGroup.style.display = 'block';
        customCake.disabled = false;
        customCake.required = true;
    } else {
        customCakeGroup.style.display = 'none';
        customCake.disabled = true;
        customCake.required = false;
        customCake.value = '';
    }
    validateForm(); // Проверяем форму после изменения
});

//2. ВАЛИДАЦИЯ ФОРМЫ В РЕАЛЬНОМ ВРЕМЕНИ

// Функция валидации отдельных полей
// validateField() - универсальная валидация поля по кастомной функции + отображение ошибк
function validateField(field, errorId, validationFn) {
    const errorElement = document.getElementById(errorId);
    const isValid = validationFn(field.value);
    
    if (!isValid && field.value.trim() !== '') {
        errorElement.textContent = getErrorMessage(field.name);
        field.classList.add('is-invalid');
        return false;
    } else {
        errorElement.textContent = '';
        field.classList.remove('is-invalid');
        return true;
    }
}

// Функция получения сообщения об ошибке
// getErrorMessage() - возвращает текст ошибки по имени поля
function getErrorMessage(fieldName) {
    const messages = {
        'clientName': 'Имя должно содержать только буквы и быть от 2 до 50 символов',
        'email': 'Пожалуйста, введите корректный email адрес',
        'cakeType': 'Пожалуйста, выберите тип торта',
        'customCake': 'Описание торта обязательно при выборе "Свой вариант"'
    };
    return messages[fieldName] || 'Поле заполнено некорректно';
}

// Валидация имени
clientName.addEventListener('input', function() {
    validateField(this, 'nameError', (value) => {
        return /^[а-яА-Яa-zA-Z\s]{2,50}$/.test(value.trim());
    });
    validateForm();
});

// Валидация email
email.addEventListener('input', function() {
    validateField(this, 'emailError', (value) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
    });
    validateForm();
});

// Валидация типа торта
cakeType.addEventListener('change', function() {
    const errorElement = document.getElementById('cakeTypeError');
    if (this.value === '') {
        errorElement.textContent = getErrorMessage('cakeType');
        this.classList.add('is-invalid');
    } else {
        errorElement.textContent = '';
        this.classList.remove('is-invalid');
    }
    validateForm();
});

// Валидация своего описания торта
customCake.addEventListener('input', function() {
    if (!this.disabled) {
        validateField(this, 'customCakeError', (value) => {
            return value.trim().length >= 5 && value.trim().length <= 200;
        });
    }
    validateForm();
});

// Валидация знака зодиака
const zodiacRadios = form.querySelectorAll('input[name="zodiac"]');
zodiacRadios.forEach(radio => {
    radio.addEventListener('change', validateForm);
});

//3. ПРОВЕРКА ЗАПОЛНЕННОСТИ ФОРМЫ
// validateForm() - централизованная проверка всех обязательных полей и состояния радиокнопок
// Включает/отключает кнопку отправки и меняет её стиль в зависимости от валидности
function validateForm() {
    // Проверяем обязательные поля
    const isNameValid = /^[а-яА-Яa-zA-Z\s]{2,50}$/.test(clientName.value.trim());
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    const isCakeTypeValid = cakeType.value !== '';
    const isCustomCakeValid = !customCake.disabled || 
                             (customCake.value.trim().length >= 5 && customCake.value.trim().length <= 200);
    
    // Проверяем, выбран ли хотя бы один радио-баттон
    const isZodiacSelected = Array.from(zodiacRadios).some(radio => radio.checked);
    
    // Все поля должны быть валидны
    const isFormValid = isNameValid && isEmailValid && isCakeTypeValid && 
                       isCustomCakeValid && isZodiacSelected;
    
    // Включаем/отключаем кнопку отправки
    submitBtn.disabled = !isFormValid;
    
    // Меняем стиль кнопки в зависимости от валидности
    if (isFormValid) {
        submitBtn.classList.remove('btn-secondary');
        submitBtn.classList.add('btn-primary');
    } else {
        submitBtn.classList.remove('btn-primary');
        submitBtn.classList.add('btn-secondary');
    }
    
    return isFormValid;
}

//4. ОБРАБОТКА ОТПРАВКИ ФОРМЫ
// form.addEventListener('submit', ...) — предотвращает перезагрузку, собирает данные в объект,  
// включая чекбоксы и выбранный знак зодиака, выводит результат в консоль и на страницу
form.addEventListener('submit', function(e) {
    e.preventDefault(); // Предотвращаем стандартную отправку
    
    // Собираем данные формы в объект
    const formData = new FormData(form);
    const orderData = {};
    
    // Обрабатываем обычные поля
    for (let [key, value] of formData.entries()) {
        if (key === 'options') {
            // Для чекбоксов создаем массив
            if (!orderData[key]) {
                orderData[key] = [];
            }
            orderData[key].push(value);
        } else {
            orderData[key] = value;
        }
    }
    
    // Добавляем информацию о выбранном знаке зодиака
    const selectedZodiac = form.querySelector('input[name="zodiac"]:checked');
    if (selectedZodiac) {
        orderData.zodiac = selectedZodiac.value;
    }
    
    // Выводим объект в консоль
    console.log('Данные заказа:', orderData);
    
    // Выводим объект на страницу
    formDataOutput.textContent = JSON.stringify(orderData, null, 2);
    
    // Показываем сообщение об успешной отправке
    alert('Заказ успешно оформлен! Данные сохранены в консоли и ниже.');
});

//5. ИНИЦИАЛИЗАЦИЯ
console.log('Лабораторная работа №10 загружена');
console.log('Форма содержит следующие элементы:');
console.log('- Текстовые поля (name, email)');
console.log('- Радио-кнопки (зодиак)');
console.log('- Выпадающий список (тип торта)');
console.log('- Условное поле (свой вариант)');
console.log('- Чекбоксы (дополнительные опции)');
console.log('- Текстовая область (комментарий)');