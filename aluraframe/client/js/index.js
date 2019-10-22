var campos = [
    document.querySelector("#data"),
    document.querySelector("#quantidade"),
    document.querySelector("#valor")
]

console.log(campos)

var tbody = document.querySelector("table tbody");
document.querySelector(".form").addEventListener("submit", function(event){
    event.preventDefault();
    var tr = document.createElement("tr");
    campos.forEach(function(campo){
        var td = document.createElement("td");
        td.textContent = campo.value;
        tr.appendChild(td);
    })

    var tVolume = document.createElement("td");
    tVolume.textContent = campos[1].value * campos[2].value;
    tr.appendChild(tVolume);

    campos[0].value = "";
    campos[1].value = 1;
    campos[2].value = 0.0;

    tbody.appendChild(tr);
})