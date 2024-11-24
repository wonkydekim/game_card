function startALL() {
    var Person = {Name: "", Date: "", Try: "", Time: "", Size: ""};

        
    function clearuielements() {
        var inputs = document.getElementsByClassName("c1");
        for (i = 0; i < inputs.length; i++) {
            inputs[i].value = "";
        }
    }

    function savePerson() {
        var lscount = localStorage.length;
        var inputs = document.getElementsByClassName("c1");
        Person.Name = inputs[0].value;
        Person.Date = inputs[1].value;
        Person.Try = inputs[2].value;
        Person.Time = inputs[3].value;
        Person.Size = inputs[4].value;
        localStorage.setItem("Person_" + lscount, JSON.stringify(Person));
        location.reload();
    }

    function writeInfo() {
        var datacount = localStorage.length;
        if (datacount > 0){
            var render = "<table>";
            render += "<tr><th>Имя</th><th>Дата</th><th>Попытки</th><th>Время</th><th>Размер</th></tr>";
            for (i = 0; i < datacount; i++) {
                var key = localStorage.key(i);
                var person = localStorage.getItem(key);
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

    function clearStorage() {
        var storagecount = localStorage.length;
        if (storagecount > 0) {
            for (i = 0; i < storagecount; i++){
                localStorage.clear();
            }
        }
        window.location.reload();
    }

    const BTNSAVE = document.getElementById("btnsave");
    BTNSAVE.addEventListener("click", savePerson, false);

    const BTNCLEAR = document.getElementById("btnclear");
    BTNCLEAR.addEventListener("click", clearuielements, false);

    const BTNCLEARSTORAGE = document.getElementById("btnclearstorage");
    BTNCLEARSTORAGE.addEventListener("click", clearStorage, false);

    window.onload = function () {
        writeInfo()
    }
};

startALL()
