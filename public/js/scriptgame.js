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

let jogador = {
    saude: 100,
    estresse: 0,
    felicidade: 50,
    saldo: 100
};

let id_jogo = null;

let cardCount = 0;

async function reiniciarJogo() {
    try {
        if (id_jogo) {
            await fetch('/api/game/jogos/atualizar', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_jogo: id_jogo,
                    saude: jogador.saude,
                    estresse: jogador.estresse,
                    felicidade: jogador.felicidade,
                    saldo: jogador.saldo,
                    card_position: cardCount
                })
            });

            await fetch(`/api/game/jogos/encerrar/${id_jogo}`, {
                method: 'PUT'
            });
        }
        
        const response = await fetch('/api/game/jogos/iniciar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        window.location.reload();
    } catch (error) {
        console.error('Erro ao reiniciar jogo:', error);
    }
}

async function carregarJogo() {
    try {
        const response = await fetch('/api/game/jogos/iniciar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (data.status === 'success') {
            id_jogo = data.jogo.id_jogo;
            
            jogador.saude = data.jogo.saude;
            jogador.estresse = data.jogo.estresse;
            jogador.felicidade = data.jogo.felicidade;
            jogador.saldo = data.jogo.saldo;
            
            cardCount = data.jogo.card_position || 0;
            
            atualizarHUD();
            
            console.log('Jogo carregado com sucesso:', data.jogo);
        } else {
            console.error('Erro ao carregar jogo:', data.message);
        }
    } catch (error) {
        console.error('Erro ao comunicar com o servidor:', error);
    }
}

async function aplicarEfeitos(efeitos) {
    for (const atributo in efeitos) {
        if (jogador.hasOwnProperty(atributo)) {
            jogador[atributo] += efeitos[atributo];
        }
    }
    
    atualizarHUD();
    
    if (id_jogo) {
        try {
            const response = await fetch('/api/game/jogos/atualizar', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_jogo: id_jogo,
                    saude: jogador.saude,
                    estresse: jogador.estresse,
                    felicidade: jogador.felicidade,
                    saldo: jogador.saldo,
                    card_position: cardCount
                })
            });
            
            const data = await response.json();
            
            if (data.status === 'success') {
                console.log('Jogo atualizado com sucesso');
            } else {
                console.error('Erro ao atualizar jogo:', data.message);
            }
        } catch (error) {
            console.error('Erro ao comunicar com o servidor:', error);
        }
    }
    
    console.log("Estado atual:", jogador);
}

function appendNewCard() {
    if (cardCount >= cartas.length) {
        console.log("Fim das cartas!");
        
        const fimDeJogo = document.createElement('div');
        fimDeJogo.classList.add('card');
        fimDeJogo.innerHTML = `
            <p class="pergunta">Fim do jogo! Você completou todas as cartas.</p>
            <button id="reiniciarJogo" style="background-color: #2c88d9; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-size: 16px; margin-top: 20px; cursor: pointer;">Começar Novo Jogo</button>
        `;
        swiper.append(fimDeJogo);
        
        document.getElementById('reiniciarJogo').addEventListener('click', reiniciarJogo);
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

function adicionarCartaSemIncrementar(indice) {
    if (indice >= cartas.length) return;
    
    const cardAtual = cartas[indice];
    
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
    
    const cards = swiper.querySelectorAll('.card:not(.dismissing)');
    cards.forEach((card, index) => {
        card.style.setProperty('--i', index);
    });
}

function atualizarHUD() {
    document.getElementById('saude').innerText = jogador.saude;
    document.getElementById('estresse').innerText = jogador.estresse;
    document.getElementById('felicidade').innerText = jogador.felicidade;
    document.getElementById('saldo').innerText = jogador.saldo;
}

document.addEventListener('DOMContentLoaded', () => {
    carregarJogo().then(() => {
        swiper.innerHTML = '';
        
        if (cardCount >= cartas.length) {
            const fimDeJogo = document.createElement('div');
            fimDeJogo.classList.add('card');
            fimDeJogo.innerHTML = `
                <p class="pergunta">Fim do jogo! Você completou todas as cartas.</p>
                <button id="reiniciarJogo" style="background-color: #2c88d9; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-size: 16px; margin-top: 20px; cursor: pointer;">Começar Novo Jogo</button>
            `;
            swiper.append(fimDeJogo);
            
            document.getElementById('reiniciarJogo').addEventListener('click', reiniciarJogo);
        } else {
            adicionarCartaSemIncrementar(cardCount);
            
            for (let i = 1; i < 3 && cardCount + i < cartas.length; i++) {
                adicionarCartaSemIncrementar(cardCount + i);
            }
        }
    });
});