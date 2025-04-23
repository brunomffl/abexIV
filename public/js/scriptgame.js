const swiper = document.querySelector('#swiper');
const like = document.querySelector('#like');
const dislike = document.querySelector('#dislike');

const cartas = [
    {
        texto: "São 6 da manhã e você acordou sonolento, bem cansado. Gostaria de fazer a higiene diária?\n\n➡️ Sim: Saúde +5\n⬅️ Não: Saúde -5",
        local: "Casa",
        sim: { saude: +5 },
        nao: { saude: -5 }
    },
    {
        texto: "Você enfrentou uma frente fria nos últimos dias e contraiu uma gripe. Comprar remédio para curar a doença?\n\n➡️ Sim: Saúde +10 / Saldo -20\n⬅️ Não: Saúde -10",
        local: "Casa",
        sim: { saude: +10, saldo: -20 },
        nao: { saude: -10 }
    },
    {
        texto: "Depois de um longo dia de trabalho você está uma pilha de nervos! Assistir TV para desestressar?\n\n➡️ Sim: Estresse -10\n⬅️ Não: Estresse +10",
        local: "Casa",
        sim: { estresse: -10 },
        nao: { estresse: +10 }
    },
    {
        texto: "Você está com bastante trabalho acumulado. Trabalhar por duas horas em casa essa noite?\n\n➡️ Sim: Estresse +5\n⬅️ Não: Estresse se mantém",
        local: "Casa",
        sim: { estresse: +5 },
        nao: {}
    },
    {
        texto: "Seu chefe pede que você vá buscar um café na padaria próxima. Você aceita?\n\n➡️ Sim: Estresse +5\n⬅️ Não: Estresse se mantém (mas perde moral)",
        local: "Trabalho",
        sim: { estresse: +5 },
        nao: {}
    },
    {
        texto: "Você tem bastante trabalho extra. Gostaria de fazer horas extras hoje?\n\n➡️ Sim: Estresse +10 / Saldo +50\n⬅️ Não: Estresse se mantém",
        local: "Trabalho",
        sim: { estresse: +10, saldo: +50 },
        nao: {}
    },
    {
        texto: "O expediente acabou e seus amigos estão armando um Happy Hour. Vai junto?\n\n➡️ Sim: Felicidade +20 / Saldo -40\n⬅️ Não: Você vai para casa",
        local: "Trabalho",
        sim: { felicidade: +20, saldo: -40 },
        nao: {}
    }
];

const jogador = {
    saude: 100,
    estresse: 0,
    felicidade: 50,
    saldo: 100
};

let cardCount = 0;

function aplicarEfeitos(efeitos) {
    for (const atributo in efeitos) {
        if (jogador.hasOwnProperty(atributo)) {
            jogador[atributo] += efeitos[atributo];
        }
    }
    console.log("Estado atual:", jogador);
}

function appendNewCard() {
    if (cardCount >= cartas.length) {
        console.log("Fim das cartas!");
        return;
    }

    const cardAtual = cartas[cardCount];

    const card = new Card({
        imageUrl: cardAtual.texto,
        onDismiss: appendNewCard,
        onLike: () => {
            aplicarEfeitos(cardAtual.sim);
            console.log("✔️ SIM:", cardAtual.texto);
        },
        onDislike: () => {
            aplicarEfeitos(cardAtual.nao);
            console.log("❌ NÃO:", cardAtual.texto);
        }
    });

    swiper.append(card.element);
    cardCount++;

    const cards = swiper.querySelectorAll('.card:not(.dismissing)');
    cards.forEach((card, index) => {
        card.style.setProperty('--i', index);
    });
}

for (let i = 0; i < 3; i++) {
    appendNewCard();
}

function atualizarHUD() {
    document.getElementById('saude').innerText = jogador.saude;
    document.getElementById('estresse').innerText = jogador.estresse;
    document.getElementById('felicidade').innerText = jogador.felicidade;
    document.getElementById('saldo').innerText = jogador.saldo;
}

const aplicarEfeitos_original = aplicarEfeitos;
aplicarEfeitos = function(efeitos) {
    aplicarEfeitos_original(efeitos);
    atualizarHUD();
};

document.addEventListener('DOMContentLoaded', atualizarHUD);
