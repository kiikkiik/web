//ЛАБОРАТОРНАЯ №12: АНИМАЦИЯ JQUERY

$(document).ready(function() {
    
    //1. ВСТРОЕННЫЕ ЭФФЕКТЫ
    
    // Показать все блоки
    $("#showBtn").click(function() {
        $(".animated-block").show(800); // 800ms
    });
    
    // Скрыть все блоки
    $("#hideBtn").click(function() {
        $(".animated-block").hide(800);
    });
    
    // Переключить видимость
    $("#toggleBtn").click(function() {
        $(".animated-block").slideToggle(600);
    });
    
    // Появление с прозрачностью
    $("#fadeInBtn").click(function() {
        $(".animated-block").fadeIn(1000);
    });
    
    // Исчезновение с прозрачностью
    $("#fadeOutBtn").click(function() {
        $(".animated-block").fadeOut(1000);
    });
    
    // Выдвижение
    $("#slideDownBtn").click(function() {
        $(".animated-block").slideDown(700);
    });
    
    // Сворачивание
    $("#slideUpBtn").click(function() {
        $(".animated-block").slideUp(700);
    });
    
    //2. ПРОИЗВОЛЬНАЯ АНИМАЦИЯ
    
    // Запуск произвольной анимации
    $("#animateBtn").click(function() {
        $("#customAnimationBox").animate({
            width: "+=50px",
            height: "+=50px",
            opacity: 0.7,
            borderRadius: "50%",
            backgroundColor: "#DAA520"
        }, 1500, function() {
            // После завершения первой анимации запускаем вторую
            $(this).animate({
                left: "+=100px",
                top: "+=50px",
                fontSize: "24px"
            }, 1000, "swing", function() {
                console.log("Анимация завершена!");
            });
        });
    });
    
    // Остановка анимации
    $("#stopBtn").click(function() {
        $("#customAnimationBox").stop(true, true); // Остановить все анимации и применить результат
    });
    
    //3. НАСТРОЙКА СКОРОСТЕЙ
    
    // Создаем собственные скорости
    $.fx.speeds.verySlow = 2000;
    $.fx.speeds.turtle = 3000;
    $.fx.speeds.flash = 100;
    
    // Пример использования собственной скорости
    $(".animated-block").eq(0).hover(
        function() {
            $(this).fadeOut("turtle");
        },
        function() {
            $(this).fadeIn("flash");
        }
    );
    
    //4. АНИМАЦИЯ ПРИ ЗАГРУЗКЕ
    
    // Плавное появление блоков при загрузке страницы
    $(".animated-block").hide().each(function(index) {
        $(this).delay(index * 300).fadeIn(800);
    });
    
    console.log("Лабораторная работа №12 загружена");
    console.log("Доступные скорости анимации:", $.fx.speeds);
});

//ДОПОЛНИТЕЛЬНЫЕ ЭФФЕКТЫ
// Анимация при наведении на изображения
$(document).on("mouseenter", ".animated-block img", function() {
    $(this).animate({
        transform: "scale(1.1)",
        opacity: 0.9
    }, 300);
});

$(document).on("mouseleave", ".animated-block img", function() {
    $(this).animate({
        transform: "scale(1)",
        opacity: 1
    }, 300);
});