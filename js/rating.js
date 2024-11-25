function startALL() {
    // var означает, что переменная будет доступна в пределах текущей функции или глобально, если она объявлена вне функции
    // создается объект с несколькими свойствами. Позволяет хранить наборы пар как ключ - значение
    var Person = {Name: "", Date: "", Try: "", Time: "", Size: ""};

    // функция для очистки всех полей input, у которых есть заданный класс
    // в нашем случае класс с1    
    function clearelements() {
        var inputs = document.getElementsByClassName("c1");
        for (i = 0; i < inputs.length; i++) {
            inputs[i].value = "";
        }
    }

    function savePerson() {
        // создание переменной lscount, в которую сохраняется количество элементов в локальном хранилище браузера
        // это число будет использоваться для генерации уникального ключа
        var lscount = localStorage.length;
        // создание переменной inputs, которая хранит коллекцию элементов (инпутов) на странице с классом c1
        var inputs = document.getElementsByClassName("c1");
        // присваивание значения каждого инпута к нужному ключу объкета Person
        Person.Name = inputs[0].value;
        Person.Date = inputs[1].value;
        Person.Try = inputs[2].value;
        Person.Time = inputs[3].value;
        Person.Size = inputs[4].value;
        // записываем Person_ в локальное хранилище браузера при каждом вызове функции
        // JSON (JavaScript Object Notation) — стандартный текстовый формат для хранения и передачи структурированных данных
        // он помогает передавать данные между разными веб-приложениями и т. д.
        localStorage.setItem("Person_" + lscount, JSON.stringify(Person));
        // обновляем страницу при каждом вызове функции
        location.reload();
    }

    function writeInfo() {
        // создание переменной datacount, в которую сохраняется количество элементов в локальном хранилище браузера
        var datacount = localStorage.length;
        if (datacount > 0){
            var render = "<table>";
            render += "<tr><th>Имя</th><th>Дата</th><th>Попытки</th><th>Время</th><th>Размер</th></tr>";
            for (i = 0; i < datacount; i++) {
                // метод key(), при передаче числа n, возвращает имя n-го ключа в данном локальном хранилище
                var key = localStorage.key(i);
                // если в метод getItem() передать ключ в качестве параметра, то метод вернёт значение, лежащее в хранилище по указанному ключу
                var person = localStorage.getItem(key);
                // метод JSON.parse() используется для преобразования строки JSON в объекты JavaScript 
                // он принимает строку JSON в качестве аргумента и возвращает соответствующий объект JavaScript
                // простыми словами, позволяет обратиться к каждому ключу и получить соответствующее ключу значение
                var data = JSON.parse(person);

                render += "<tr><td>" + data.Name + " </td>";
                render += "<td>" + data.Date + "</td>";
                render += "<td>" + data.Try + "</td>";
                render += "<td>" + data.Time + "</td>";
                render += "<td>" + data.Size + "</td>";
            }
            render+="</table>";
            dvcontainer.innerHTML = render;
        }
    }

    // функция для очистки таблицы
    function clearStorage() {
        var storagecount = localStorage.length;
        if (storagecount > 0) {
            for (i = 0; i < storagecount; i++){
                localStorage.clear();
            }
        }
        window.location.reload();
    }

    // добавляет обработчик события нажатия кнопки
    const BTNSAVE = document.getElementById("btnsave");
    BTNSAVE.addEventListener("click", savePerson);

    const BTNCLEAR = document.getElementById("btnclear");
    BTNCLEAR.addEventListener("click", clearelements);

    const BTNCLEARSTORAGE = document.getElementById("btnclearstorage");
    BTNCLEARSTORAGE.addEventListener("click", clearStorage);

    window.onload = function () {
        writeInfo()
    }
};

startALL()

const obj = { name1: "John", age: 30, city: "New York" };
const jsonStr = JSON.stringify(obj);
console.log(obj);
console.log(jsonStr);

const {age, city, name1} = JSON.parse(jsonStr);
console.log(name1);  // Выводит: "John"
console.log(age);  // Выводит: 30
console.log(city);  // Выводит: "New York"