//ЗАДАНИЕ 1: НАЙТИ СУММУ ЭЛЕМЕНТОВ
function calculateSum(numbers) {
    var sum = 0;
    
    for (var i = 0; i < numbers.length; i++) {
        sum = sum + numbers[i];
    }
    
    return sum;
}

//ЗАДАНИЕ 2: НАЙТИ МИНИМАЛЬНЫЙ ЭЛЕМЕНТ
function findMin(numbers) {
    var min = numbers[0];
    
    for (var i = 0; i < numbers.length; i++) {
        if (numbers[i] < min) {
            min = numbers[i];
        }
    }
    
    return min;
}

//ЗАДАНИЕ 10: НАЙТИ СРЕДНЕЕ АРИФМЕТИЧЕСКОЕ
function calculateAverage(numbers) {
    var sum = calculateSum(numbers);
    var average = sum / numbers.length;
    return average;
}

//ФУНКЦИЯ ДЛЯ ВЫЧИСЛЕНИЯ ВСЕХ ЗАДАНИЙ
function calculateAll() {
    var input = document.getElementById("numbersInput").value; //получаем значение из поля ввода с id numbersinput
    
    //преобразуем строку в массив чисел
    var numbers = input.split(",").map(function(item) {  //split(",")-разбиваем строку на массив подстрок || map()-применяем функцию к каждому эл массива
        return parseFloat(item.trim());
    });

    //проверяем корректность введенных данных
    //если массив пустой или первый элемент не является числом
    if (numbers.length === 0 || isNaN(numbers[0])) {
        alert("Пожалуйста, введите числа через запятую!");
        return;
    }
    
    var sum = calculateSum(numbers);
    var min = findMin(numbers);
    var average = calculateAverage(numbers);
    
    //форматируем последовательность для отображения на странице
    //join(",")-объединяем элементы массива в строку через запятую
    var sequenceText = numbers.join(", ");
    document.getElementById("seq1").textContent = sequenceText;
    document.getElementById("seq2").textContent = sequenceText;
    document.getElementById("seq3").textContent = sequenceText;
    
    document.getElementById("result1").textContent = sum;
    document.getElementById("result2").textContent = min;
    document.getElementById("result3").textContent = average.toFixed(2);
}