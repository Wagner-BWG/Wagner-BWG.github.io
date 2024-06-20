import carros from "./cars.js";
import cardInnerHTML from "./card.js";

window.onload = () => {
    const button = document.getElementById("botão-cadastro");
    
    function createCard(carro) {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = cardInnerHTML(carro);
        document.getElementById("Lista").appendChild(card);
    }

    function cadastro() {
        const carro = {};
        carro.nome = document.getElementById("Modelo").value;
        carro.marca = document.getElementById("Marca").value;
        carro.motor = document.getElementById("Motor").value;
        carro.potencia = document.getElementById("Potência").value;
        carro.paisDeOrigem = document.getElementById("País").value;
        carro.info = document.getElementById("Informações").value;
        carro.foto = document.getElementById("Foto").value;
        createCard(carro);
        let listaCarros = localStorage.getItem("carros");
        if (listaCarros === null)
            listaCarros = [];
        listaCarros.push(carro);
        localStorage.setItem("carros", JSON.stringify(listaCarros));
    }

    button.addEventListener("click", cadastro);

    carros.map(createCard);
    const carrosSalvos = JSON.parse(localStorage.getItem("carros"));
    carrosSalvos.map(createCard);
}