//1.НЕСКОЛЬКО СПОСОБОВ СОЗДАНИЯ ОБЪЕКТОВ

//Способ 1: Литерал объекта
var cake1 = {
    name: "Черный лес",
    price: 2500,
    zodiac: "Скорпион"
};

//Способ 2: Конструктор Object()
var cake2 = new Object();
cake2.name = "Тирамису";
cake2.price = 2800;
cake2.zodiac = "Дева";

//Способ 3:Функция-конструктор (свой класс)
function Cake(name, price, zodiac, description) {
    this.name = name;
    this.price = price;
    this.zodiac = zodiac;
    this.description = description;

    // Метод объекта
    this.getInfo = function() {
        return this.zodiac + ": " + this.name + " — " + this.price + " руб.";
    };

    // Метод для обновления цены
    this.setPrice = function(newPrice) {
        this.price = newPrice;
    };
}

// Создание объектов через конструктор
var cake3 = new Cake("Галактика", 3200, "Водолей", "Необычный десерт с синими оттенками");

//2.НЕСКОЛЬКО СПОСОБОВ ДОСТУПА К СВОЙСТВАМ

//Чтение!
// Через точку
var name1 = cake1.name;
// Через квадратные скобки
var name2 = cake2["name"];
// Динамическое имя свойства
var prop = "zodiac";
var zodiac3 = cake3[prop];

//Запись!
// Через точку
cake1.price = 2600;
// Через квадратные скобки
cake2["price"] = 2900;
// Добавление нового свойства
cake1["rating"] = 5;
cake2.rating = 4;

//3.РАСШИРЕНИЕ ВСТРОЕННОГО ТИПА ARRAY

// Добавляем метод вычисления среднего арифметического
Array.prototype.average = function() {
    if (this.length === 0) return 0;
    var sum = 0;
    for (var i = 0; i < this.length; i++) {
        sum += this[i];
    }
    return sum / this.length;
};

// Добавляем метод поиска минимального элемента (для демонстрации)
Array.prototype.min = function() {
    if (this.length === 0) return undefined;
    var min = this[0];
    for (var i = 1; i < this.length; i++) {
        if (this[i] < min) min = this[i];
    }
    return min;
};

//4.ФУНКЦИЯ ДЕМОНСТРАЦИИ
function demoObjects() {
    var output = "";

    // Вывод информации о созданных объектах
    output += "СОЗДАННЫЕ ОБЪЕКТЫ\n";
    output += "cake1 (литерал): " + cake1.zodiac + " — " + cake1.name + " (" + cake1.price + " руб.)\n";
    output += "cake2 (new Object): " + cake2.zodiac + " — " + cake2.name + " (" + cake2.price + " руб.)\n";
    output += "cake3 (конструктор): " + cake3.getInfo() + "\n";


    // Демонстрация доступа к свойствам
    output += "ДОСТУП К СВОЙСТВАМ\n";
    output += "Чтение через точку: " + name1 + "\n";
    output += "Чтение через []: " + name2 + "\n";
    output += "Динамическое чтение: " + zodiac3 + "\n";
    output += "Новое свойство rating у cake1: " + cake1.rating + "\n\n";

    // Демонстрация расширения Array
    output += "РАСШИРЕНИЕ Array\n";
    var prices = [2500, 2800, 3200];
    output += "Цены: [" + prices.join(", ") + "]\n";
    output += "Среднее арифметическое: " + prices.average().toFixed(2) + "\n";
    output += "Минимум: " + prices.min() + "\n\n";

    // Проверка типов
    output += "ПРОВЕРКА ТИПОВ\n";
    output += "cake3 instanceof Cake: " + (cake3 instanceof Cake) + "\n";
    output += "cake1.constructor === Object: " + (cake1.constructor === Object) + "\n";

    // Вывод в HTML
    var demoDiv = document.getElementById("demoOutput");
    if (demoDiv) {
        demoDiv.textContent = output;
    }

    // Вывод в консоль
    console.log("--ЛАБОРАТОРНАЯ №8: РЕЗУЛЬТАТЫ--");
    console.log("Объекты:", { cake1, cake2, cake3,})
}