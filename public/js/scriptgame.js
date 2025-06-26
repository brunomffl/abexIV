const swiper = document.querySelector('#swiper');
const like = document.querySelector('#like');
const dislike = document.querySelector('#dislike');

const cartasGrupos = {
    // =============================================================
    // EVENTOS FIXOS DO DIA (1 carta por vez, mas várias opções)
    // =============================================================

    // --- MANHÃ ---
    acordar_higiene: [
        {
            id: 1,
            texto: "São 6 da manhã e você acordou sonolento. Fazer a higiene diária para despertar de vez?\n\n➡️ Sim: Saúde +5\n⬅️ Não: Saúde -5",
            local: "Casa",
            sim: { saude: 5 },
            nao: { saude: -5 },
            tags: ["manha", "higiene"],
            incompativel_com: [],
            itens_compativeis: ["energetico", "cafe"]
        },
        {
            id: 201,
            texto: "Seu alarme toca incessantemente. Você está atrasado! Tomar um banho rápido ou só escovar os dentes e sair correndo?\n\n➡️ Banho rápido: Saúde +3, Estresse +5\n⬅️ Só escovar dentes: Estresse +10",
            local: "Casa",
            sim: { saude: 3, estresse: 5 },
            nao: { estresse: 10 },
            tags: ["manha", "higiene"],
            incompativel_com: [],
            itens_compativeis: ["despertador", "shampoo"]
        },
        {
            id: 202,
            texto: "Você acordou antes do alarme, se sentindo descansado. Aproveitar para fazer alguns alongamentos ou ficar mais tempo na cama?\n\n➡️ Alongamentos: Saúde +8, Felicidade +5\n⬅️ Ficar na cama: Felicidade +3",
            local: "Casa",
            sim: { saude: 8, felicidade: 5 },
            nao: { felicidade: 3 },
            tags: ["manha", "higiene"],
            incompativel_com: [],
            itens_compativeis: ["tapete_yoga"]
        }
    ],

    cafe_da_manha: [
        {
            id: 11,
            texto: "Hora do café da manhã. Preparar algo completo e saudável ou apenas pegar uma fruta e sair correndo?\n\n➡️ Café completo: Saúde +10, Estresse -5\n⬅️ Algo rápido: Estresse +5",
            local: "Casa",
            sim: { saude: 10, estresse: -5 },
            nao: { estresse: 5 },
            tags: ["manha", "alimentacao"],
            incompativel_com: [],
            itens_compativeis: ["vitamina", "cereais"]
        },
        {
            id: 211,
            texto: "Você está sem nada na geladeira. Pedir delivery de um café da manhã ou ir trabalhar em jejum?\n\n➡️ Delivery: Saúde +5, Saldo -25\n⬅️ Jejum: Saúde -10, Estresse +15",
            local: "Casa",
            sim: { saude: 5, saldo: -25 },
            nao: { saude: -10, estresse: 15 },
            tags: ["manha", "alimentacao"],
            incompativel_com: ["pouco_dinheiro"],
            itens_compativeis: ["barra_cereal", "vitamina"]
        },
        {
            id: 212,
            texto: "Seu vizinho fez um bolo delicioso e te ofereceu um pedaço. Aceitar a gentileza ou recusar educadamente?\n\n➡️ Aceitar: Felicidade +15, Saúde -5\n⬅️ Recusar: Felicidade -5, Saúde +5",
            local: "Casa",
            sim: { felicidade: 15, saude: -5 },
            nao: { felicidade: -5, saude: 5 },
            tags: ["manha", "alimentacao", "social"],
            incompativel_com: [],
            itens_compativeis: []
        }
    ],

    transporte_trabalho: [
        {
            id: 13,
            texto: "O trânsito parece intenso. Ir de ônibus, que é mais barato, ou pedir um carro por aplicativo para ir mais confortável?\n\n➡️ Carro: Estresse -10, Saldo -15\n⬅️ Ônibus: Estresse +5",
            local: "Casa",
            sim: { estresse: -10, saldo: -15 },
            nao: { estresse: 5 },
            tags: ["manha", "transporte"],
            incompativel_com: [],
            itens_compativeis: ["carteira", "dinheiro"]
        },
        {
            id: 213,
            texto: "Choveu durante a noite e há várias poças no caminho. Ir caminhando mesmo assim ou gastar com transporte?\n\n➡️ Caminhar: Saúde -5, Estresse +10\n⬅️ Transporte: Saldo -10",
            local: "Casa",
            sim: { saude: -5, estresse: 10 },
            nao: { saldo: -10 },
            tags: ["manha", "transporte"],
            incompativel_com: [],
            itens_compativeis: ["guarda_chuva", "sapato_impermeavel"]
        }
    ],

    // --- TARDE ---
    almoco: [
        {
            id: 100,
            texto: "Hora do almoço! Comer no restaurante caro com os colegas ou levar marmita para economizar?\n\n➡️ Restaurante: Felicidade +10, Saldo -30\n⬅️ Marmita: Saldo +10",
            local: "Trabalho",
            sim: { felicidade: 10, saldo: -30 },
            nao: { saldo: 10 },
            tags: ["tarde", "alimentacao"],
            incompativel_com: ["pouco_dinheiro"],
            itens_compativeis: ["comida_congelada", "dinheiro_extra"]
        },
        {
            id: 301,
            texto: "Um colega te convidou para experimentar um restaurante japonês novo. É caro, mas parece incrível. Ir junto?\n\n➡️ Ir: Felicidade +20, Saldo -45\n⬅️ Dispensar: Felicidade -5, Saldo +5",
            local: "Trabalho",
            sim: { felicidade: 20, saldo: -45 },
            nao: { felicidade: -5, saldo: 5 },
            tags: ["tarde", "alimentacao", "social"],
            incompativel_com: ["pouco_dinheiro"],
            itens_compativeis: ["cartao_credito"]
        },
        {
            id: 302,
            texto: "A máquina de lanches quebrou e você só tem 30 minutos de almoço. Sair para comprar algo ou ficar sem comer?\n\n➡️ Sair: Estresse +15, Saldo -20\n⬅️ Ficar sem comer: Saúde -15, Estresse +10",
            local: "Trabalho",
            sim: { estresse: 15, saldo: -20 },
            nao: { saude: -15, estresse: 10 },
            tags: ["tarde", "alimentacao"],
            incompativel_com: [],
            itens_compativeis: ["lanche_emergencia", "energetico"]
        }
    ],

    // --- NOITE ---
    volta_casa: [
        {
            id: 101,
            texto: "Fim do expediente. O caminho normal para casa está congestionado. Pegar um atalho por uma rua escura ou esperar no trânsito?\n\n➡️ Atalho: Estresse +10, Saúde -5\n⬅️ Esperar: Estresse +5",
            local: "Trabalho",
            sim: { estresse: 10, saude: -5 },
            nao: { estresse: 5 },
            tags: ["noite", "transporte"],
            incompativel_com: [],
            itens_compativeis: []
        },
        {
            id: 401,
            texto: "Você perdeu o último ônibus. Pegar um táxi caro ou caminhar 40 minutos até em casa?\n\n➡️ Táxi: Saldo -50, Estresse -5\n⬅️ Caminhar: Estresse +15, Saúde +5",
            local: "Trabalho",
            sim: { saldo: -50, estresse: -5 },
            nao: { estresse: 15, saude: 5 },
            tags: ["noite", "transporte"],
            incompativel_com: [],
            itens_compativeis: ["carteira", "tenis_confortavel"]
        }
    ],

    jantar: [
        {
            id: 14,
            texto: "Você chegou em casa. Preparar um jantar saudável ou pedir uma pizza?\n\n➡️ Cozinhar: Saúde +10, Saldo -10\n⬅️ Pizza: Felicidade +10, Saúde -5, Saldo -25",
            local: "Casa",
            sim: { saude: 10, saldo: -10 },
            nao: { felicidade: 10, saude: -5, saldo: -25 },
            tags: ["noite", "alimentacao"],
            incompativel_com: [],
            itens_compativeis: ["comida_congelada", "vitamina"]
        },
        {
            id: 402,
            texto: "Sua mãe ligou perguntando se quer jantar na casa dela. Aceitar o convite carinhoso ou ficar em casa relaxando?\n\n➡️ Ir na casa da mãe: Felicidade +20, Estresse -10\n⬅️ Ficar em casa: Estresse -5, Felicidade +5",
            local: "Casa",
            sim: { felicidade: 20, estresse: -10 },
            nao: { estresse: -5, felicidade: 5 },
            tags: ["noite", "alimentacao", "social"],
            incompativel_com: [],
            itens_compativeis: ["presente_mae"]
        },
        {
            id: 403,
            texto: "Você tentou cozinhar, mas queimou a comida. Tentar novamente ou desistir e comer cereal?\n\n➡️ Tentar novamente: Estresse +10, Saúde +10\n⬅️ Cereal: Felicidade -10, Saúde -5",
            local: "Casa",
            sim: { estresse: 10, saude: 10 },
            nao: { felicidade: -10, saude: -5 },
            tags: ["noite", "alimentacao"],
            incompativel_com: [],
            itens_compativeis: ["livro_culinaria"]
        }
    ],

    dormir: [
        {
            id: 20,
            texto: "Está na hora de dormir, mas sua mente não desliga. Tentar meditar por 10 minutos ou rolar na cama até o sono vir?\n\n➡️ Meditar: Estresse -10, Saúde +5\n⬅️ Rolar na cama: Estresse +5",
            local: "Casa",
            sim: { estresse: -10, saude: 5 },
            nao: { estresse: 5 },
            tags: ["noite", "sono"],
            incompativel_com: [],
            itens_compativeis: ["cha_calmante", "remedio_sono"]
        },
        {
            id: 404,
            texto: "Você está exausto, mas lembrou que não escovou os dentes. Levantar para escovar ou dormir mesmo assim?\n\n➡️ Escovar: Saúde +5, Estresse +5\n⬅️ Dormir assim: Saúde -5, Estresse -5",
            local: "Casa",
            sim: { saude: 5, estresse: 5 },
            nao: { saude: -5, estresse: -5 },
            tags: ["noite", "sono", "higiene"],
            incompativel_com: [],
            itens_compativeis: ["escova_eletrica"]
        },
        {
            id: 405,
            texto: "Seus vizinhos estão fazendo barulho e você não consegue dormir. Ir lá reclamar educadamente ou usar tampões de ouvido?\n\n➡️ Reclamar: Estresse +10, Felicidade +5\n⬅️ Tampões: Estresse -5",
            local: "Casa",
            sim: { estresse: 10, felicidade: 5 },
            nao: { estresse: -5 },
            tags: ["noite", "sono", "social"],
            incompativel_com: [],
            itens_compativeis: ["tampao_ouvido", "mascara_dormir"]
        }
    ],

    // =============================================================
    // POOL DE CARTAS ALEATÓRIAS (Embaralhadas e sorteadas)
    // =============================================================

    trabalho: [
        // --- SUAS CARTAS ORIGINAIS ---
        {
            id: 5,
            texto: "Seu chefe pede para você buscar um café para ele. É uma tarefa simples, mas fora da sua função. Você aceita?\n\n➡️ Sim: Felicidade +5 (chefe feliz)\n⬅️ Não: Estresse +5",
            local: "Trabalho",
            sim: { felicidade: 5 },
            nao: { estresse: 5 },
            tags: ["trabalho", "social"],
            incompativel_com: [],
            itens_compativeis: ["dinheiro"]
        },
        {
            id: 6,
            texto: "Apareceu a chance de fazer horas extras hoje e ganhar um bom dinheiro. Ficar até mais tarde?\n\n➡️ Sim: Estresse +10, Saldo +50\n⬅️ Não: Felicidade +5",
            local: "Trabalho",
            sim: { estresse: 10, saldo: 50 },
            nao: { felicidade: 5 },
            tags: ["trabalho", "dinheiro"],
            incompativel_com: ["muito_estressado"],
            itens_compativeis: ["energetico", "cafe"]
        },
        {
            id: 17,
            texto: "Um colega está com muita dificuldade em uma tarefa que você domina. Oferecer ajuda, mesmo que atrase seu próprio trabalho?\n\n➡️ Sim: Estresse +5, Felicidade +10\n⬅️ Não: Felicidade -5",
            local: "Trabalho",
            sim: { estresse: 5, felicidade: 10 },
            nao: { felicidade: -5 },
            tags: ["trabalho", "social"],
            incompativel_com: [],
            itens_compativeis: ["manual_tecnico"]
        },
        {
            id: 18,
            texto: "Seu supervisor elogiou seu trabalho na frente de todos e te deu um projeto de maior responsabilidade. Aceitar o desafio?\n\n➡️ Sim: Estresse +15, Felicidade +15\n⬅️ Não: Estresse -5, Felicidade -10",
            local: "Trabalho",
            sim: { estresse: 15, felicidade: 15 },
            nao: { estresse: -5, felicidade: -10 },
            tags: ["trabalho", "carreira"],
            incompativel_com: ["muito_estressado"],
            itens_compativeis: ["guia_gestao"]
        },
        {
            id: 102,
            texto: "Uma tarefa extremamente repetitiva e chata caiu na sua mesa. Fazer agora para se livrar disso ou deixar para o fim do dia?\n\n➡️ Fazer agora: Felicidade -10, Estresse -5\n⬅️ Deixar para depois: Estresse +10",
            local: "Trabalho",
            sim: { felicidade: -10, estresse: -5 },
            nao: { estresse: 10 },
            tags: ["trabalho"],
            incompativel_com: [],
            itens_compativeis: []
        },
        {
            id: 103,
            texto: "A internet da empresa caiu. Aproveitar para adiantar tarefas offline ou relaxar e conversar com colegas?\n\n➡️ Tarefas offline: Estresse -5\n⬅️ Conversar: Felicidade +10, Estresse -5",
            local: "Trabalho",
            sim: { estresse: -5 },
            nao: { felicidade: 10, estresse: -5 },
            tags: ["trabalho", "social"],
            incompativel_com: [],
            itens_compativeis: []
        },
        {
            id: 104,
            texto: "Você cometeu um pequeno erro que ninguém notou. Corrigir silenciosamente ou reportar ao seu chefe?\n\n➡️ Corrigir: Estresse +5\n⬅️ Reportar: Felicidade +5, Estresse -5",
            local: "Trabalho",
            sim: { estresse: 5 },
            nao: { felicidade: 5, estresse: -5 },
            tags: ["trabalho", "carreira"],
            incompativel_com: [],
            itens_compativeis: []
        },
        {
            id: 105,
            texto: "Convidaram você para uma reunião de última hora que parece completamente inútil. Participar ativamente ou ficar quieto no seu canto?\n\n➡️ Participar: Estresse +5\n⬅️ Ficar quieto: Felicidade +5",
            local: "Trabalho",
            sim: { estresse: 5 },
            nao: { felicidade: 5 },
            tags: ["trabalho", "social"],
            incompativel_com: [],
            itens_compativeis: []
        },
        // --- CARTAS NOVAS QUE CRIEI ---
        {
            id: 501,
            texto: "A impressora travou bem na hora que você precisa imprimir um documento urgente. Tentar consertar sozinho ou chamar o técnico?\n\n➡️ Tentar consertar: Estresse +15, Felicidade +5\n⬅️ Chamar técnico: Estresse -5, Saldo -30",
            local: "Trabalho",
            sim: { estresse: 15, felicidade: 5 },
            nao: { estresse: -5, saldo: -30 },
            tags: ["trabalho", "tecnologia"],
            incompativel_com: [],
            itens_compativeis: ["manual_impressora"]
        },
        {
            id: 502,
            texto: "Você descobriu que um colega está falando mal de você pelas costas. Confrontar a pessoa ou ignorar completamente?\n\n➡️ Confrontar: Estresse +20, Felicidade +10\n⬅️ Ignorar: Estresse +5, Felicidade -5",
            local: "Trabalho",
            sim: { estresse: 20, felicidade: 10 },
            nao: { estresse: 5, felicidade: -5 },
            tags: ["trabalho", "social", "conflito"],
            incompativel_com: [],
            itens_compativeis: ["guia_comunicacao"]
        },
        {
            id: 503,
            texto: "Chegou um e-mail com uma tarefa que não é sua responsabilidade, mas ninguém mais vai fazer. Assumir a tarefa ou repassar?\n\n➡️ Assumir: Estresse +15, Felicidade +5\n⬅️ Repassar: Felicidade -5",
            local: "Trabalho",
            sim: { estresse: 15, felicidade: 5 },
            nao: { felicidade: -5 },
            tags: ["trabalho", "responsabilidade"],
            incompativel_com: ["muito_estressado"],
            itens_compativeis: []
        },
        {
            id: 504,
            texto: "O ar condicionado quebrou e está um calor insuportável no escritório. Sugerir que todos saiam mais cedo ou aguentar firme?\n\n➡️ Sugerir sair: Felicidade +15, Estresse -10\n⬅️ Aguentar: Estresse +20, Saúde -5",
            local: "Trabalho",
            sim: { felicidade: 15, estresse: -10 },
            nao: { estresse: 20, saude: -5 },
            tags: ["trabalho", "ambiente"],
            incompativel_com: [],
            itens_compativeis: ["ventilador_portatil", "agua_gelada"]
        },
        {
            id: 505,
            texto: "Seu chefe cancelou uma reunião importante de última hora. Aproveitar o tempo livre ou adiantar outras tarefas?\n\n➡️ Tempo livre: Felicidade +10, Estresse -15\n⬅️ Adiantar tarefas: Estresse -5, Felicidade +5",
            local: "Trabalho",
            sim: { felicidade: 10, estresse: -15 },
            nao: { estresse: -5, felicidade: 5 },
            tags: ["trabalho", "produtividade"],
            incompativel_com: [],
            itens_compativeis: ["agenda_pessoal"]
        }
    ],

    // --- OUTROS GRUPOS (mantidos como estavam) ---
    saude: [
        {
            id: 2,
            texto: "Você pegou uma gripe forte. Comprar um remédio na farmácia ou tentar aguentar firme?\n\n➡️ Comprar remédio: Saúde +15, Saldo -20\n⬅️ Aguentar: Saúde -10",
            local: "Casa",
            sim: { saude: 15, saldo: -20 },
            nao: { saude: -10 },
            tags: ["doenca", "gripe"],
            incompativel_com: ["remedio_gripe"],
            acoes_sim: { adicionar_item: 1 },
            itens_compativeis: ["remedio", "vitamina_c"]
        }
    ]
};

const CARTA_CHEGOU_TRABALHO = {
    id: 9001, 
    type: 'transicao',
    texto: 'Você chegou ao trabalho.',
    tags: ['manha'] 
};

const CARTA_CHEGOU_CASA = {
    id: 9002,
    type: 'transicao',
    texto: 'Você chegou em casa.',
    tags: ['noite'] 
};

const cartas = Object.values(cartasGrupos).flat();

let jogador = {
    saude: 100,
    estresse: 0,
    felicidade: 50,
    saldo: 100,
    inventario: [],

    estado: {
        condicoes: [],        
        ultimasCartas: [],      
        contadores: {
            itens: 0,           
        },
        sequenciaDia: []
    }
};

let id_jogo = null;
let cardCount = 0;
let emTransicaoPeriodo = false;
let currentCard = null; 

function montarSequenciaDoDia() {
    const sequencia = [];
    
    const trabalhoPool = [...cartasGrupos.trabalho].sort(() => Math.random() - 0.5);

    sequencia.push(cartasGrupos.acordar_higiene[0]);
    sequencia.push(cartasGrupos.cafe_da_manha[0]);
    sequencia.push(cartasGrupos.transporte_trabalho[0]);
    sequencia.push(CARTA_CHEGOU_TRABALHO)
    sequencia.push(...trabalhoPool.splice(0, 4));

    sequencia.push(cartasGrupos.almoco[0]);
    sequencia.push(...trabalhoPool.splice(0, 4)); 

    sequencia.push(cartasGrupos.volta_casa[0]);
    sequencia.push(CARTA_CHEGOU_CASA);
    sequencia.push(cartasGrupos.jantar[0]);
    sequencia.push(cartasGrupos.dormir[0]);

    jogador.estado.sequenciaDia = sequencia.filter(Boolean);
    console.log("ROTEIRO DO DIA MONTADO:", jogador.estado.sequenciaDia.map(c => c.id));
}

function verificarItensCompativeis(carta) {
    if (!carta.itens_compativeis || !jogador.inventario.length) {
        return [];
    }

    return jogador.inventario.filter(item => {
        if (item.tags) {
            const tagsArray = typeof item.tags === 'string' ? item.tags.split(',') : item.tags;
            return carta.itens_compativeis.some(tipo => 
                tagsArray.includes(tipo)
            );
        }
        return carta.itens_compativeis.some(tipo => 
            item.nome.toLowerCase().includes(tipo.toLowerCase())
        );
    });
}

function mostrarMenuItens(itensCompativeis, cardElement) {
    const menuExistente = document.querySelector('.menu-itens');
    if (menuExistente) menuExistente.remove();
    
    const menu = document.createElement('div');
    menu.classList.add('menu-itens');
    menu.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: rgba(0, 0, 0, 0.9); border-radius: 10px; padding: 20px; min-width: 280px; z-index: 1000;';
    
    const titulo = document.createElement('h3');
    titulo.textContent = 'Escolha um item para usar:';
    titulo.style.cssText = 'color: white; margin-bottom: 15px; text-align: center;';
    menu.appendChild(titulo);
    
    itensCompativeis.forEach(item => {
        const itemBtn = document.createElement('div');
        itemBtn.classList.add('item-opcao');
        itemBtn.style.cssText = 'display: flex; justify-content: space-between; align-items: center; padding: 10px; margin-bottom: 10px; background-color: rgba(255, 255, 255, 0.1); border-radius: 5px; color: white; cursor: pointer;';
        
        const itemNome = document.createElement('span');
        itemNome.textContent = item.nome;
        
        const itemUsos = document.createElement('span');
        itemUsos.textContent = `${item.usos_restantes} usos`;
        
        itemBtn.appendChild(itemNome);
        itemBtn.appendChild(itemUsos);
        
        itemBtn.addEventListener('mouseover', () => {
            itemBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        });
        itemBtn.addEventListener('mouseout', () => {
            itemBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        });

        itemBtn.addEventListener('click', () => {
            usarItemContextual(item);
            menu.remove();

            cardCount++;

            cardElement.classList.add('dismissing');
            setTimeout(() => {
                cardElement.remove();
                appendNewCard();
            }, 300);
        });
        
        menu.appendChild(itemBtn);
    });
    
    const cancelarBtn = document.createElement('button');
    cancelarBtn.textContent = 'Cancelar';
    cancelarBtn.style.cssText = 'width: 100%; background-color: #444; color: white; border: none; padding: 10px; border-radius: 5px; margin-top: 10px; cursor: pointer;';
    cancelarBtn.addEventListener('click', () => {
        menu.remove();
    });
    menu.appendChild(cancelarBtn);
    
    document.body.appendChild(menu);
}

function adicionarBotaoUsarItem(cardElement, carta) {
    const itensCompativeis = verificarItensCompativeis(carta);
    
    if (itensCompativeis.length > 0) {
        const useItemBtn = document.createElement('button');
        useItemBtn.classList.add('use-item-btn');
        useItemBtn.textContent = 'Usar Item';
        useItemBtn.style.cssText = 'position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); background-color: #9c27b0; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer; z-index: 10;';
        
        useItemBtn.addEventListener('click', () => {
            mostrarMenuItens(itensCompativeis, cardElement);
        });
        
        cardElement.appendChild(useItemBtn);
    }
}

function cartaEhCompativel(carta) {

    if (jogador.estado.ultimasCartas.includes(carta.id)) {
        return false;
    }

    if (carta.incompativel_com && carta.incompativel_com.length > 0) {
        const temItemIncompativel = jogador.inventario.some(item => 
            carta.incompativel_com.some(tag => 
                item.tags && item.tags.includes(tag)
            )
        );
        if (temItemIncompativel) return false;
    }
    
    if (carta.incompativel_com.includes("muito_estressado") && jogador.estresse > 70) {
        return false;
    }
    
    if (carta.incompativel_com.includes("pouco_dinheiro") && jogador.saldo < 50) {
        return false;
    }
    
    return true;
}

async function usarItemContextual(item) {
    try {
        const response = await fetch(`/api/game/jogos/${id_jogo}/inventario/usar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_item_inventario: item.id_item_inventario })
        });
        
        const data = await response.json();
        
        if (data.status === 'success') {

            aplicarEfeitos(data.efeitos);

            await carregarInventario();
            

            mostrarNotificacao(`Você usou ${item.nome}!`);

        } else {
            console.error('Erro ao usar item:', data.message);
        }
    } catch (error) {
        console.error('Erro ao usar item:', error);
    }
}

function mostrarNotificacao(mensagem) {
    const notificacao = document.createElement('div');
    notificacao.textContent = mensagem;
    notificacao.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 10px 20px;
        border-radius: 20px;
        font-size: 14px;
        animation: fadeInOut 2s forwards;
        z-index: 1000;
    `;
    
    document.body.appendChild(notificacao);
    
    setTimeout(() => {
        notificacao.remove();
    }, 2000);
}

function selecionarProximaCarta() {

    const proximaCarta = jogador.estado.sequenciaDia[cardCount];

    if (!proximaCarta) {
        console.error("Fim da sequência ou carta inválida! Encerrando o jogo.");
        cardCount = jogador.estado.sequenciaDia.length; 
        return null;
    }
    
    return proximaCarta;
}

async function carregarInventario() {
    try {
        if (!id_jogo) return;
        
        const response = await fetch(`/api/game/jogos/${id_jogo}/inventario`);
        const data = await response.json();
        
        if (data.status === 'success') {
            jogador.inventario = data.itens;
            atualizarInventarioUI();
        } else {
            console.error('Erro ao carregar inventário:', data.message);
        }
    } catch (error) {
        console.error('Erro ao carregar inventário:', error);
    }
}

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
            headers: { 'Content-Type': 'application/json' }
        });
        
        const data = await response.json();
        
        if (data.status === 'success') {
            id_jogo = data.jogo.id_jogo;
            
            jogador.saude = data.jogo.saude;
            jogador.estresse = data.jogo.estresse;
            jogador.felicidade = data.jogo.felicidade;
            jogador.saldo = data.jogo.saldo;
            
            jogador.estado = {
                condicoes: [],
                ultimasCartas: [],
                contadores: { itens: 3 },
                sequenciaDia: [] 
            };

            await carregarInventario();
            
            cardCount = data.jogo.card_position || 0;

            montarSequenciaDoDia(); 
            atualizarHUD();
            
            console.log('Jogo carregado com sucesso:', data.jogo);
        } else {
            console.error('Erro ao carregar jogo:', data.message);
        }
    } catch (error) {
        console.error('Erro ao comunicar com o servidor:', error);
    }
}

// SUBSTITUA sua função atualizarInventarioUI por esta versão melhorada:
function atualizarInventarioUI() {
    const inventarioElement = document.getElementById('inventario');
    inventarioElement.innerHTML = '';
    
    const inventarioToggle = document.createElement('button');
    inventarioToggle.id = 'toggle-inventario';
    inventarioToggle.innerHTML = '🎒';
    inventarioToggle.style.cssText = 'background: none; border: none; font-size: 24px; cursor: pointer; position: relative;';
    
    // Badge com número de itens
    if (jogador.inventario.length > 0) {
        const badge = document.createElement('span');
        badge.style.cssText = 'position: absolute; top: -5px; right: -5px; background-color: #ff4444; color: white; border-radius: 50%; width: 18px; height: 18px; font-size: 11px; display: flex; align-items: center; justify-content: center; font-weight: bold;';
        badge.textContent = jogador.inventario.length;
        inventarioToggle.appendChild(badge);
    }
    
    inventarioElement.appendChild(inventarioToggle);
    
    const inventarioPanel = document.createElement('div');
    inventarioPanel.id = 'inventario-panel';
    inventarioPanel.style.cssText = `
        display: none; 
        position: absolute; 
        bottom: 60px; 
        right: 10px; 
        background: linear-gradient(135deg, rgba(0,0,0,0.95), rgba(20,20,20,0.95));
        backdrop-filter: blur(10px);
        padding: 15px; 
        border-radius: 15px; 
        min-width: 280px; 
        max-width: 320px;
        border: 1px solid rgba(255,255,255,0.1);
        box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        z-index: 100;
    `;
    
    // Título do inventário
    const titulo = document.createElement('h3');
    titulo.style.cssText = 'color: white; margin: 0 0 15px 0; font-size: 16px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 10px;';
    titulo.textContent = '🎒 Inventário';
    inventarioPanel.appendChild(titulo);
    
    if (jogador.inventario.length === 0) {
        const mensagemVazio = document.createElement('div');
        mensagemVazio.style.cssText = 'text-align: center; color: rgba(255,255,255,0.6); font-style: italic; padding: 20px;';
        mensagemVazio.innerHTML = '📦<br>Inventário vazio';
        inventarioPanel.appendChild(mensagemVazio);
    } else {
        const lista = document.createElement('div');
        lista.style.cssText = 'max-height: 300px; overflow-y: auto;';
        
        jogador.inventario.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.style.cssText = `
                display: flex; 
                align-items: center; 
                padding: 10px; 
                margin-bottom: 8px; 
                background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
                border-radius: 10px; 
                color: white; 
                cursor: pointer;
                transition: all 0.3s ease;
                border: 1px solid rgba(255,255,255,0.1);
            `;
            
            // Ícone do item (baseado no tipo ou nome)
            const icone = obterIconeItem(item);
            const iconeSpan = document.createElement('span');
            iconeSpan.style.cssText = 'font-size: 20px; margin-right: 12px; min-width: 24px;';
            iconeSpan.textContent = icone;
            
            // Info do item
            const infoDiv = document.createElement('div');
            infoDiv.style.cssText = 'flex: 1; display: flex; flex-direction: column;';
            
            const nomeSpan = document.createElement('span');
            nomeSpan.style.cssText = 'font-size: 14px; font-weight: 500; margin-bottom: 2px;';
            nomeSpan.textContent = item.nome;
            
            const usosSpan = document.createElement('span');
            usosSpan.style.cssText = 'font-size: 11px; color: rgba(255,255,255,0.7);';
            usosSpan.textContent = `${item.usos_restantes} uso${item.usos_restantes !== 1 ? 's' : ''} restante${item.usos_restantes !== 1 ? 's' : ''}`;
            
            infoDiv.appendChild(nomeSpan);
            infoDiv.appendChild(usosSpan);
            
            itemDiv.appendChild(iconeSpan);
            itemDiv.appendChild(infoDiv);
            
            // Tooltip detalhado
            const tooltip = document.createElement('div');
            tooltip.style.cssText = `
                display: none; 
                position: absolute; 
                background: linear-gradient(135deg, rgba(0,0,0,0.95), rgba(20,20,20,0.95));
                backdrop-filter: blur(10px);
                padding: 12px; 
                border-radius: 10px; 
                color: white; 
                max-width: 250px; 
                z-index: 101; 
                right: 340px; 
                bottom: 60px;
                border: 1px solid rgba(255,255,255,0.2);
                box-shadow: 0 8px 32px rgba(0,0,0,0.4);
            `;
            
            tooltip.innerHTML = `
                <div style="display: flex; align-items: center; margin-bottom: 8px;">
                    <span style="font-size: 18px; margin-right: 8px;">${icone}</span>
                    <h4 style="margin: 0; font-size: 14px;">${item.nome}</h4>
                </div>
                <p style="margin: 0 0 8px 0; font-size: 12px; color: rgba(255,255,255,0.8); line-height: 1.4;">${item.descricao || 'Sem descrição disponível'}</p>
                <div style="font-size: 11px; color: rgba(255,255,255,0.9);">
                    ${criarEfeitosTexto(item)}
                </div>
                <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.2); font-size: 10px; color: rgba(255,255,255,0.6);">
                    💡 Use este item em situações compatíveis
                </div>
            `;
            
            // Eventos de hover
            itemDiv.addEventListener('mouseover', () => {
                itemDiv.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))';
                itemDiv.style.transform = 'translateY(-2px)';
                tooltip.style.display = 'block';
            });
            
            itemDiv.addEventListener('mouseout', () => {
                itemDiv.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))';
                itemDiv.style.transform = 'translateY(0)';
                tooltip.style.display = 'none';
            });
            
            inventarioElement.appendChild(tooltip);
            lista.appendChild(itemDiv);
        });
        
        inventarioPanel.appendChild(lista);
    }
    
    inventarioElement.appendChild(inventarioPanel);
    
    // Toggle do inventário
    inventarioToggle.addEventListener('click', () => {
        const panel = document.getElementById('inventario-panel');
        if (panel.style.display === 'none') {
            panel.style.display = 'block';
            panel.style.animation = 'slideInUp 0.3s ease';
        } else {
            panel.style.animation = 'slideOutDown 0.3s ease';
            setTimeout(() => {
                panel.style.display = 'none';
            }, 250);
        }
    });
    
    // Fechar inventário ao clicar fora
    document.addEventListener('click', (e) => {
        const panel = document.getElementById('inventario-panel');
        const toggle = document.getElementById('toggle-inventario');
        
        if (panel && panel.style.display === 'block' && 
            !panel.contains(e.target) && !toggle.contains(e.target)) {
            panel.style.animation = 'slideOutDown 0.3s ease';
            setTimeout(() => {
                panel.style.display = 'none';
            }, 250);
        }
    });
}

// Função auxiliar para obter ícones dos itens
function obterIconeItem(item) {
    const nome = item.nome.toLowerCase();
    const tipo = item.tipo ? item.tipo.toLowerCase() : '';
    
    // Ícones baseados no nome do item
    if (nome.includes('remedio') || nome.includes('medicamento')) return '💊';
    if (nome.includes('vitamina')) return '🟡';
    if (nome.includes('cafe') || nome.includes('café')) return '☕';
    if (nome.includes('energético') || nome.includes('energetico')) return '⚡';
    if (nome.includes('fone') || nome.includes('headphone')) return '🎧';
    if (nome.includes('tampão') || nome.includes('tampao')) return '🔇';
    if (nome.includes('mascara') || nome.includes('máscara')) return '😴';
    if (nome.includes('livro')) return '📚';
    if (nome.includes('manual')) return '📖';
    if (nome.includes('guia')) return '📋';
    if (nome.includes('carteira')) return '👛';
    if (nome.includes('dinheiro')) return '💰';
    if (nome.includes('cartão') || nome.includes('cartao')) return '💳';
    if (nome.includes('comida') || nome.includes('lanche')) return '🍎';
    if (nome.includes('agua') || nome.includes('água')) return '💧';
    if (nome.includes('ventilador')) return '🌪️';
    if (nome.includes('guarda-chuva') || nome.includes('guarda_chuva')) return '☂️';
    if (nome.includes('sapato') || nome.includes('tenis') || nome.includes('tênis')) return '👟';
    if (nome.includes('tapete') || nome.includes('yoga')) return '🧘';
    if (nome.includes('escova')) return '🦷';
    if (nome.includes('presente')) return '🎁';
    if (nome.includes('agenda')) return '📅';
    if (nome.includes('cha') || nome.includes('chá')) return '🍵';
    
    // Ícones baseados no tipo
    if (tipo.includes('medicamento') || tipo.includes('remedio')) return '💊';
    if (tipo.includes('bebida')) return '🥤';
    if (tipo.includes('comida') || tipo.includes('alimento')) return '🍎';
    if (tipo.includes('equipamento') || tipo.includes('ferramenta')) return '🔧';
    if (tipo.includes('roupa') || tipo.includes('acessorio')) return '👕';
    if (tipo.includes('livro') || tipo.includes('leitura')) return '📚';
    
    // Ícone padrão
    return '📦';
}

// Função auxiliar para criar texto dos efeitos
function criarEfeitosTexto(item) {
    const efeitos = [];
    
    if (item.efeito_saude && item.efeito_saude !== 0) {
        const sinal = item.efeito_saude > 0 ? '+' : '';
        efeitos.push(`❤️ Saúde: ${sinal}${item.efeito_saude}`);
    }
    
    if (item.efeito_estresse && item.efeito_estresse !== 0) {
        const sinal = item.efeito_estresse > 0 ? '+' : '';
        efeitos.push(`😰 Estresse: ${sinal}${item.efeito_estresse}`);
    }
    
    if (item.efeito_felicidade && item.efeito_felicidade !== 0) {
        const sinal = item.efeito_felicidade > 0 ? '+' : '';
        efeitos.push(`😊 Felicidade: ${sinal}${item.efeito_felicidade}`);
    }
    
    if (item.efeito_saldo && item.efeito_saldo !== 0) {
        const sinal = item.efeito_saldo > 0 ? '+' : '';
        efeitos.push(`💰 Saldo: ${sinal}${item.efeito_saldo}`);
    }
    
    return efeitos.length > 0 ? efeitos.join('<br>') : 'Sem efeitos especiais';
}

async function usarItem(item) {
    try {
        const response = await fetch(`/api/game/jogos/${id_jogo}/inventario/usar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_item_inventario: item.id_item_inventario })
        });
        
        const data = await response.json();
        
        if (data.status === 'success') {
            aplicarEfeitos(data.efeitos);
            
            await carregarInventario();
            
            mostrarNotificacao(`Você usou ${item.nome}!`);
        } else {
            console.error('Erro ao usar item:', data.message);
        }
    } catch (error) {
        console.error('Erro ao usar item:', error);
    }
}

async function aplicarEfeitos(efeitos) {
    for (const atributo in efeitos) {
        if (jogador.hasOwnProperty(atributo)) {
            jogador[atributo] += efeitos[atributo];
            if (jogador[atributo] < 0) {
                jogador[atributo] = 0;
            }
            if (jogador["saude"] > 100){
                jogador["saude"] = 100;
            }
            if (jogador["estresse"] > 100){
                jogador["estresse"] = 100;
            }
            if (jogador["felicidade"] > 100){
                jogador["felicidade"] = 100;
            }
        }
    }
    atualizarHUD();
    diaNoite();

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

    if (jogador.estresse >= 100 || jogador.felicidade <= 0 || jogador.saldo <= 0 || jogador.saude <= 0) {
        const mensagens = {
            estresse: "Fim do jogo! Você teve um ataque cardíaco.",
            felicidade: "Fim do jogo! Você adquiriu depressão.",
            saldo: "Fim do jogo! Você faliu.",
            saude: "Fim do jogo! Sua saúde chegou a zero."
        };
        const cores = {
            estresse: "rgb(229, 26, 26)",
            felicidade: "rgb(0, 0, 0)",
            saldo: "rgb(212, 225, 28)",
            saude: "rgb(125, 121, 121)"
        };
        let motivo = jogador.estresse >= 100 ? "estresse" : 
                      jogador.felicidade <= 0 ? "felicidade" : 
                      jogador.saldo <= 0 ? "saldo" : "saude";
        
        const fimDeJogo = document.createElement('div');
        fimDeJogo.classList.add('card');
        fimDeJogo.innerHTML = `
            <p class="pergunta">${mensagens[motivo]}</p>
            <button id="reiniciarJogo" style="background-color:${cores[motivo]}; color: white; border: none; padding: 20px 130px; border-radius: 8px; font-size: 16px; margin-bottom:-32px; cursor: pointer;">Começar Novo Jogo</button>
        `;
        swiper.innerHTML = '';
        swiper.append(fimDeJogo);
        document.getElementById('reiniciarJogo').addEventListener('click', reiniciarJogo);
        return;
    }

    if (cardCount >= jogador.estado.sequenciaDia.length) {
        console.log("Fim do roteiro alcançado. Mostrando tela final.");
        const fimDeJogo = document.createElement('div');
        fimDeJogo.classList.add('card');
        fimDeJogo.innerHTML = `
            <p class="pergunta">Fim do jogo! Você completou o dia.</p>
            <button id="reiniciarJogo" style="background-color: #2c88d9; color: white; border: none; padding: 20px 130px; border-radius: 8px; font-size: 16px; margin-bottom:-32px; cursor: pointer;">Começar Novo Jogo</button>
        `;
        swiper.innerHTML = '';
        swiper.append(fimDeJogo);
        document.getElementById('reiniciarJogo').addEventListener('click', reiniciarJogo);
        return;
    }


    if (Math.random() < 0.1 && jogador.estado.contadores.itens >= 3) {
        jogador.estado.contadores.itens = 0;
        verificarItemAleatorio();
        return;
    }

    const cardAtual = selecionarProximaCarta();
    if (!cardAtual) {
        console.error("Não foi possível encontrar a próxima carta no roteiro. Avançando...");
        cardCount++;
        appendNewCard();
        return;
    }
    currentCard = cardAtual;

    if (cardAtual.type === 'transicao') {
        const transicaoCard = document.createElement('div');
        transicaoCard.classList.add('card');
        transicaoCard.innerHTML = `
            <p class="pergunta" style="text-align: center; font-size: 1.5em;">${cardAtual.texto}</p>
            <button class="continuar-btn">Continuar</button>
        `;
        swiper.append(transicaoCard);
        
        const btn = transicaoCard.querySelector('.continuar-btn');
        btn.addEventListener('click', () => {
            cardCount++;
            transicaoCard.classList.add('dismissing');
            setTimeout(() => {
                transicaoCard.remove();
                appendNewCard();
            }, 300);
        });

    } else {
        const card = new Card({
            imageUrl: cardAtual.texto,
            onDismiss: appendNewCard,
            onLike: () => {
                aplicarEfeitos(cardAtual.sim);
                if (cardAtual.acoes_sim && cardAtual.acoes_sim.adicionar_item) {
                    adicionarItemAoInventario(cardAtual.acoes_sim.adicionar_item, card.element);
                    return;
                }
                cardCount++;
                console.log("✔️ SIM:", cardAtual.texto);
            },
            onDislike: () => {
                aplicarEfeitos(cardAtual.nao);
                if (cardAtual.acoes_nao && cardAtual.acoes_nao.adicionar_item) {
                    adicionarItemAoInventario(cardAtual.acoes_nao.adicionar_item, card.element);
                    return;
                }
                cardCount++;
                console.log("❌ NÃO:", cardAtual.texto);
            }
        });
        adicionarBotaoUsarItem(card.element, cardAtual);
        swiper.append(card.element);
    }

    const cards = swiper.querySelectorAll('.card:not(.dismissing)');
    cards.forEach((card, index) => {
        card.style.setProperty('--i', index);
    });
}

async function verificarItemAleatorio() {
    try {
        const response = await fetch('/api/game/itens/aleatorio');
        const data = await response.json();
        
        if (data.status === 'success') {
            const item = data.item;

            const buttonStyle = "background-color: #2c88d9; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-size: 16px; margin-top: 20px; cursor: pointer;";

            const itemCard = document.createElement('div');
            itemCard.classList.add('card');
            itemCard.innerHTML = `
                <p class="pergunta">Você encontrou um item!</p>
                <div style="margin: 15px 0;">
                    <h3 style="color: #2c88d9;">${item.nome}</h3>
                    <p style="font-style: italic; margin: 10px 0;">${item.descricao}</p>
                    <div style="background-color: #f5f5f5; padding: 10px; border-radius: 5px; margin: 10px 0; color: #333;">
                        <p><strong>Efeitos:</strong></p>
                        <ul style="list-style-type: none; padding-left: 5px; margin-top: 5px;">
                            ${item.efeito_saude != 0 ? `<li>Saúde: ${item.efeito_saude > 0 ? '+' : ''}${item.efeito_saude}</li>` : ''}
                            ${item.efeito_estresse != 0 ? `<li>Estresse: ${item.efeito_estresse > 0 ? '+' : ''}${item.efeito_estresse}</li>` : ''}
                            ${item.efeito_felicidade != 0 ? `<li>Felicidade: ${item.efeito_felicidade > 0 ? '+' : ''}${item.efeito_felicidade}</li>` : ''}
                            ${item.efeito_saldo != 0 ? `<li>Saldo: ${item.efeito_saldo > 0 ? '+' : ''}${item.efeito_saldo}</li>` : ''}
                        </ul>
                        <p><small>Usos: ${item.usos_maximos}</small></p>
                    </div>
                </div>
                <button class="pegar-item" style="${buttonStyle}">Pegar Item</button>
            `;
            
            swiper.append(itemCard);
            
            const btn = itemCard.querySelector('.pegar-item');
            btn.addEventListener('click', () => adicionarItemAoInventario(item.id_item, itemCard));
        }
    } catch (error) {
        console.error('Erro ao obter item aleatório:', error);
        appendNewCard();
    }
}

async function adicionarItemAoInventario(id_item, cartaOriginal = null) {
    const btn = document.querySelector('.pegar-item');
    if (btn) {
        btn.disabled = true;
        btn.textContent = "Adicionando...";
        btn.style.opacity = "0.5";
    }
    
    try {
        const response = await fetch(`/api/game/jogos/${id_jogo}/inventario`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_item })
        });
        
        const data = await response.json();
        
        if (data.status === 'success') {
            jogador.estado.ultimoItem = id_item;
            
            await carregarInventario();
            
            if (cartaOriginal) {
                cartaOriginal.classList.add('dismissing');
                setTimeout(() => {
                    cartaOriginal.remove();
                    appendNewCard();
                }, 300);
            } else {
                const itemCard = document.querySelector('.card');
                if (itemCard) {
                    itemCard.classList.add('dismissing');
                    setTimeout(() => {
                        itemCard.remove();
                        appendNewCard();
                    }, 300);
                } else {
                    appendNewCard();
                }
            }
        } else {
            console.error('Erro ao adicionar item:', data.message);
            if (btn) {
                btn.disabled = false;
                btn.textContent = "Pegar Item";
                btn.style.opacity = "1";
            }
        }
    } catch (error) {
        console.error('Erro ao adicionar item:', error);
        if (btn) {
            btn.disabled = false;
            btn.textContent = "Pegar Item";
            btn.style.opacity = "1";
        }
    }
}


function atualizarHUD() {
    document.getElementById('saude').innerText = jogador.saude;
    document.getElementById('estresse').innerText = jogador.estresse;
    document.getElementById('felicidade').innerText = jogador.felicidade;
    document.getElementById('saldo').innerText = jogador.saldo;
}

function diaNoite() {
    const dia = document.getElementById('dia');
    const noite = document.getElementById('noite');
    if (!dia || !noite || !currentCard) return;

    const isNight = currentCard.tags.includes('noite');

    if (!isNight) {
        dia.style.opacity = 1;
        noite.style.opacity = 0;
        document.body.style.backgroundColor = "var(--mid-blue)";
    } else {
        dia.style.opacity = 0;
        noite.style.opacity = 1;
        document.body.style.backgroundColor = "var(--dark-blue)";
    }
}

const style = document.createElement('style');
style.textContent = `
    body {
        transition: background-color 0.8s ease;
    }
    #toggle-inventario {
        transition: transform 0.3s ease;
    }
    #toggle-inventario:hover {
        transform: scale(1.2);
    }
    .item-inventario {
        transition: background-color 0.3s ease;
    }
    .dismissing {
        transition: transform 0.3s ease, opacity 0.3s ease;
        transform: translateX(100px) rotate(10deg) !important;
        opacity: 0;
        pointer-events: none;
    }
    .pegar-item {
        transition: all 0.3s ease;
    }
    .pegar-item:hover {
        transform: scale(1.05);
    }
    
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateY(-20px); }
        20% { opacity: 1; transform: translateY(0); }
        80% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(-20px); }
    }
    
    .periodo-dia { transition: background-color 0.5s ease; }
    .periodo-noite { transition: background-color 0.5s ease; }
    
    .transicao-periodo {
        text-align: center;
        padding: 20px;
    }
    
    .continuar {
        transition: all 0.2s ease;
    }
    
    .continuar:hover {
        transform: scale(1.05);
        background-color: #235f9e !important;
    }
    
    .menu-itens {
        animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translate(-50%, -45%); }
        to { opacity: 1; transform: translate(-50%, -50%); }
    }
    
    .use-item-btn {
        transition: all 0.3s ease;
    }
    
    .use-item-btn:hover {
        transform: scale(1.1);
        background-color: #7b1fa2 !important;
    }
    
    .item-opcao {
        transition: all 0.2s ease;
    }

    .continuar-btn {
        background-color: #2c88d9;
        color: white;
        border: none;
        padding: 15px 30px;
        border-radius: 8px;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.2s ease;
        margin-top: 20px;
    }
    .continuar-btn:hover {
        transform: scale(1.05);
        background-color: #235f9e;
    }
`;
const novasAnimacoes = `
    @keyframes slideInUp {
        from { 
            opacity: 0; 
            transform: translateY(20px);
        }
        to { 
            opacity: 1; 
            transform: translateY(0); 
        }
    }
    
    @keyframes slideOutDown {
        from { 
            opacity: 1; 
            transform: translateY(0); 
        }
        to { 
            opacity: 0; 
            transform: translateY(20px); 
        }
    }
    `;
    
style.textContent += novasAnimacoes;

document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
    carregarJogo().then(() => {
        swiper.innerHTML = '';
        appendNewCard();
    });
});