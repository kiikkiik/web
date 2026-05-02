// ==ЛАБОРАТОРНАЯ №11: JQUERY==

// Готовность документа
$(document).ready(function() {
    
    //1. ИЗМЕНЕНИЕ СТИЛЕЙ
    $("#colorBtn").click(function() {
        $("#demoTitle").css("color", "red");
        console.log("Цвет заголовка изменён на красный");
    });
    
    //2. ПОКАЗ/СКРЫТИЕ ЭЛЕМЕНТОВ
    $("#toggleBtn").click(function() {
        $("#demoBlock").toggle(500); // Анимация 500мс
        console.log("Видимость блока переключена");
    });
    
    //3. РАБОТА С КЛАССАМИ
    $("#classBtn").click(function() {
        $("#demoBlock").addClass("panel-success");
        $("#demoBlock .panel-heading").removeClass("panel-default").addClass("panel-success");
        console.log("Добавлен класс panel-success");
    });
    
    //4. ИЗМЕНЕНИЕ АТРИБУТОВ
    let imageToggle = false;
    $("#imageBtn").click(function() {
        if (imageToggle) {
            $("#demoImage").attr("src", "images/cherny-les.jpg.png");
            imageToggle = false;
        } else {
            $("#demoImage").attr("src", "images/cherny-les-2.jpg");
            imageToggle = true;
        }
        console.log("Изображение изменено");
    });
    
    //5. ВАЛИДАЦИЯ ФОРМЫ
    function validateName(name) {
        return /^[а-яА-Яa-zA-Z\s]{2,50}$/.test(name.trim());
    }
    
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    }
    
    $("#userName").on("input", function() {
        const name = $(this).val();
        if (name && !validateName(name)) {
            $("#nameError").text("Имя должно содержать только буквы (2-50 символов)");
        } else {
            $("#nameError").text("");
        }
    });
    
    $("#userEmail").on("input", function() {
        const email = $(this).val();
        if (email && !validateEmail(email)) {
            $("#emailError").text("Введите корректный email");
        } else {
            $("#emailError").text("");
        }
    });
    
    //6. ОБРАБОТКА ОТПРАВКИ ФОРМЫ
    $("#jqueryForm").submit(function(e) {
        e.preventDefault(); // Отменяем стандартную отправку
        
        const name = $("#userName").val();
        const email = $("#userEmail").val();
        
        // Валидация
        if (!validateName(name)) {
            $("#nameError").text("Имя должно содержать только буквы (2-50 символов)");
            return;
        }
        if (!validateEmail(email)) {
            $("#emailError").text("Введите корректный email");
            return;
        }
        
        // Собираем данные в объект
        const formData = {
            name: name,
            email: email,
            timestamp: new Date().toLocaleString()
        };
        
        // Выводим результат
        $("#formResult").html(`
            <h4>Данные успешно отправлены!</h4>
            <pre>${JSON.stringify(formData, null, 2)}</pre>
        `);
        
        console.log("Данные формы:", formData);
        alert("Форма успешно отправлена!");
    });
    
    //7. ДОПОЛНИТЕЛЬНЫЕ ВОЗМОЖНОСТИ
    // Наведение мыши
    $("#demoBlock").hover(
        function() {
            $(this).css("box-shadow", "0 0 15px rgba(139, 69, 19, 0.5)");
        },
        function() {
            $(this).css("box-shadow", "none");
        }
    );
    
    // Изменение фона при фокусе
    $("#userName, #userEmail").focus(function() {
        $(this).css("background-color", "#fff9e6");
    }).blur(function() {
        $(this).css("background-color", "white");
    });
    
    console.log("Лабораторная работа №11 загружена");
    console.log("Используются возможности jQuery:");
    console.log("- Выбор элементов: $('#id'), $('.class')");
    console.log("- Изменение стилей: .css()");
    console.log("- Работа с классами: .addClass(), .removeClass()");
    console.log("- Обработка событий: .click(), .submit(), .hover()");
    console.log("- Валидация форм и сбор данных");
});