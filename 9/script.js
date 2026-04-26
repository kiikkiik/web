// ждем полной загрузки страницы
document.addEventListener("DOMContentLoaded", function() {
    
    // выводим информацию о странице в консоль браузера
    console.log("=== ИНФОРМАЦИЯ О СТРАНИЦЕ ===");
    console.log("Ссылок: " + document.links.length);
    console.log("Якорей: " + document.anchors.length);
    console.log("Изображений: " + document.images.length);
    console.log("==============================");
    
    // находим поле поиска на странице
    var searchInput = document.getElementById("searchInput");
    
    // проверяем что поле поиска существует
    if (searchInput) {
        // обработчик когда поле получает фокус (клик по полю)
        searchInput.onfocus = function() {
            console.log("Поле поиска получило фокус");
        };
        // обработчик когда поле теряет фокус (клик вне поля)
        searchInput.onblur = function() {
            console.log("Поле поиска потеряло фокус");
        };
    }
});

// функция для вычисления суммы всех чисел в массиве
function calculateSum(numbers) {
    // переменная для хранения суммы
    var sum = 0;
    // цикл проходит по всем элементам массива
    for (var i = 0; i < numbers.length; i++) {
        // добавляем текущий элемент к сумме
        sum = sum + numbers[i];
    }
    // возвращаем результат
    return sum;
}

// функция для поиска минимального числа в массиве
function findMin(numbers) {
    // предполагаем что первый элемент минимальный
    var min = numbers[0];
    // цикл проходит по всем элементам массива
    for (var i = 0; i < numbers.length; i++) {
        // если текущий элемент меньше минимального
        if (numbers[i] < min) {
            // обновляем минимальное значение
            min = numbers[i];
        }
    }
    // возвращаем результат
    return min;
}

// функция для вычисления среднего арифметического
function calculateAverage(numbers) {
    // сначала находим сумму всех элементов
    var sum = calculateSum(numbers);
    // делим сумму на количество элементов
    var average = sum / numbers.length;
    // возвращаем результат
    return average;
}

// основная функция которая запускается при нажатии кнопки вычислить
function calculateAll() {
    // получаем значение из поля ввода
    var input = document.getElementById("numbersInput").value;
    
    // преобразуем строку в массив чисел
    // разбиваем строку по запятым и преобразуем каждый элемент в число
    var numbers = input.split(",").map(function(item) {
        return parseFloat(item.trim());
    });
    
    // проверяем что пользователь ввел числа
    if (numbers.length === 0 || isNaN(numbers[0])) {
        alert("Пожалуйста введите числа через запятую");
        return;
    }
    
    // вычисляем все результаты
    var sum = calculateSum(numbers);
    var min = findMin(numbers);
    var average = calculateAverage(numbers);
    
    // форматируем последовательность для отображения
    var sequenceText = numbers.join(", ");
    // выводим последовательность в три блока на странице
    document.getElementById("seq1").textContent = sequenceText;
    document.getElementById("seq2").textContent = sequenceText;
    document.getElementById("seq3").textContent = sequenceText;
    
    // выводим результаты вычислений на страницу
    document.getElementById("result1").textContent = sum;
    document.getElementById("result2").textContent = min;
    document.getElementById("result3").textContent = average.toFixed(2);
}

// массив путей к изображениям для скорпиона
var scorpionImages = ["images/cherny-les.jpg.png", "images/cherny-les-2.jpg"];
// текущий индекс изображения скорпиона
var scorpionIndex = 0;

// функция переключения изображения скорпиона
function changeScorpion(direction) {
    // изменяем индекс в зависимости от направления (-1 или +1)
    scorpionIndex = scorpionIndex + direction;
    // если индекс меньше нуля - переходим к последнему изображению
    if (scorpionIndex < 0) scorpionIndex = scorpionImages.length - 1;
    // если индекс больше последнего - переходим к первому изображению
    if (scorpionIndex >= scorpionImages.length) scorpionIndex = 0;
    // меняем источник изображения на странице
    document.getElementById("scorpionImg").src = scorpionImages[scorpionIndex];
    // выводим информацию в консоль
    console.log("Скорпион изображение " + (scorpionIndex + 1));
}

// массив путей к изображениям для девы
var virgoImages = ["images/tiramisu.jpg", "images/tiramisu-2.jpg"];
// текущий индекс изображения девы
var virgoIndex = 0;

// функция переключения изображения девы
function changeVirgo(direction) {
    virgoIndex = virgoIndex + direction;
    if (virgoIndex < 0) virgoIndex = virgoImages.length - 1;
    if (virgoIndex >= virgoImages.length) virgoIndex = 0;
    document.getElementById("virgoImg").src = virgoImages[virgoIndex];
    console.log("Дева изображение " + (virgoIndex + 1));
}

// массив путей к изображениям для водолея
var aquariusImages = ["images/galaktika.jpg", "images/galaktika-2.jpg"];
// текущий индекс изображения водолея
var aquariusIndex = 0;

// функция переключения изображения водолея
function changeAquarius(direction) {
    aquariusIndex = aquariusIndex + direction;
    if (aquariusIndex < 0) aquariusIndex = aquariusImages.length - 1;
    if (aquariusIndex >= aquariusImages.length) aquariusIndex = 0;
    document.getElementById("aquariusImg").src = aquariusImages[aquariusIndex];
    console.log("Водолей изображение " + (aquariusIndex + 1));
}