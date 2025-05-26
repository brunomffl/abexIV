const swiper = document.querySelector('#swiper');
const like = document.querySelector('#like');
const dislike = document.querySelector('#dislike');

const cartasGrupos = {
    casa_manha: [
        {
            id: 1,
            texto: "São 6 da manhã e você acordou sonolento, bem cansado. Gostaria de fazer a higiene diária?\n\n➡️ Sim: Saúde +5\n⬅️ Não: Saúde -5",
            local: "Casa",
            sim: { saude: +5 },
            nao: { saude: -5 },
            tags: ["manha", "higiene"],
            incompativel_com: [],
            itens_compativeis: ["energetico", "cafe"] // Usar energético ou café ao acordar
        }
    ],
    preparo_trabalho: [
        {
            id: 10,
            texto: "Hora de começar o dia! Gostaria de tomar um banho antes de sair para o trabalho?\n\n➡️ Sim: Saúde +5 / Felicidade +3\n⬅️ Não: Saúde -5",
            local: "Casa",
            sim: { saude: +5, felicidade: +3 },
            nao: { saude: -5 },
            tags: ["manha", "higiene", "preparo"],
            incompativel_com: [],
            itens_compativeis: ["sabonete", "shampoo"]        
        },
        {
            id: 11,
            texto: "Seu despertador tocou. Preparar um café da manhã completo ou apenas pegar algo rápido?\n\n➡️ Café completo: Saúde +10 / Estresse -5\n⬅️ Algo rápido: Estresse +5",
            local: "Casa",
            sim: { saude: +10, estresse: -5 },
            nao: { estresse: +5 },
            tags: ["manha", "alimentacao", "preparo"],
            incompativel_com: [],
            itens_compativeis: ["vitamina", "cereais"]        
        },
        {
            id: 12,
            texto: "Está quase na hora de sair. Organizar os materiais de trabalho antes de partir?\n\n➡️ Sim: Estresse -5\n⬅️ Não: Estresse +5",
            local: "Casa",
            sim: { estresse: -5 },
            nao: { estresse: +5 },
            tags: ["manha", "organizacao", "preparo"],
            incompativel_com: [],
            itens_compativeis: ["agenda", "organizador"]        
        },
        {
            id: 13,
            texto: "Tem um ônibus saindo agora, mas você pode se atrasar. Pedir um carro por aplicativo?\n\n➡️ Sim: Estresse -10 / Saldo -15\n⬅️ Não: Estresse +10",
            local: "Casa",
            sim: { estresse: -10, saldo: -15 },
            nao: { estresse: +10 },
            tags: ["manha", "transporte", "preparo"],
            incompativel_com: [],
            itens_compativeis: ["carteira", "dinheiro"]        
        }
    ],
    saude: [
        {
            id: 2,
            texto: "Você enfrentou uma frente fria nos últimos dias e contraiu uma gripe. Comprar remédio para curar a doença?\n\n➡️ Sim: Saúde +10 / Saldo -20\n⬅️ Não: Saúde -10",
            local: "Casa",
            sim: { saude: +10, saldo: -20 },
            nao: { saude: -10 },
            tags: ["doenca", "gripe"],
            incompativel_com: ["remedio_gripe"],            
            acoes_sim: {
                adicionar_item: 1            
            },
            itens_compativeis: ["remedio", "vitamina_c"]        
        }
    ],
    casa_noite: [
        {
            id: 3,
            texto: "Depois de um longo dia de trabalho você está uma pilha de nervos! Assistir TV para desestressar?\n\n➡️ Sim: Estresse -10\n⬅️ Não: Estresse +10",
            local: "Casa",
            sim: { estresse: -10 },
            nao: { estresse: +10 },
            tags: ["noite", "lazer"],
            incompativel_com: [],
            itens_compativeis: ["cha_calmante", "remedio_relaxante"]        
        },
        {
            id: 4,
            texto: "Você está com bastante trabalho acumulado. Trabalhar por duas horas em casa essa noite?\n\n➡️ Sim: Estresse +5\n⬅️ Não: Estresse se mantém",
            local: "Casa",
            sim: { estresse: +5 },
            nao: {},
            tags: ["noite", "trabalho"],
            incompativel_com: ["muito_estressado"],            
            itens_compativeis: ["cafe", "energetico"]        
        },
        {
            id: 14,
            texto: "Está ficando tarde. Preparar uma refeição saudável ou pedir comida?\n\n➡️ Cozinhar: Saúde +10 / Saldo -10\n⬅️ Delivery: Saúde -5 / Saldo -25",
            local: "Casa",
            sim: { saude: +10, saldo: -10 },
            nao: { saude: -5, saldo: -25 },
            tags: ["noite", "alimentacao"],
            incompativel_com: [],
            itens_compativeis: ["comida_congelada", "vitamina"]        
        },
        {
            id: 15,
            texto: "Você poderia ler um livro antes de dormir. Ler por meia hora?\n\n➡️ Sim: Felicidade +10 / Estresse -5\n⬅️ Não: Felicidade -5",
            local: "Casa",
            sim: { felicidade: +10, estresse: -5 },
            nao: { felicidade: -5 },
            tags: ["noite", "lazer", "educacao"],
            incompativel_com: [],
            itens_compativeis: ["oculos", "luz_leitura"]        
        },
        {
            id: 16,
            texto: "Um amigo envia mensagem convidando para uma festa. Você vai?\n\n➡️ Sim: Felicidade +15 / Saldo -30 / Saúde -5\n⬅️ Não: Felicidade -10",
            local: "Casa",
            sim: { felicidade: +15, saldo: -30, saude: -5 },
            nao: { felicidade: -10 },
            tags: ["noite", "social", "lazer"],
            incompativel_com: ["pouco_dinheiro"],            
            itens_compativeis: ["roupa_social", "presente"]        
        },
        {
            id: 20,
            texto: "Você está tendo dificuldade para dormir. O que prefere fazer?\n\n➡️ Ficar na cama: Estresse +5 / Saúde -5\n⬅️ Levantar e ver TV: Felicidade -5",
            local: "Casa",
            sim: { estresse: +5, saude: -5 },
            nao: { felicidade: -5 },
            tags: ["noite", "sono"],
            incompativel_com: [],
            itens_compativeis: ["cha", "remedio_sono"]        
        }
    ],
    trabalho: [
        {
            id: 5,
            texto: "Seu chefe pede que você vá buscar um café na padaria próxima. Você aceita?\n\n➡️ Sim: Estresse +5\n⬅️ Não: Estresse se mantém (mas perde moral)",
            local: "Trabalho",
            sim: { estresse: +5 },
            nao: {},
            tags: ["trabalho", "social"],
            incompativel_com: [],
            itens_compativeis: ["cafe_pronto", "dinheiro"]        
        },
        {
            id: 6,
            texto: "Você tem bastante trabalho extra. Gostaria de fazer horas extras hoje?\n\n➡️ Sim: Estresse +10 / Saldo +50\n⬅️ Não: Estresse se mantém",
            local: "Trabalho",
            sim: { estresse: +10, saldo: +50 },
            nao: {},
            tags: ["trabalho", "dinheiro"],
            incompativel_com: ["muito_estressado"],            
            itens_compativeis: ["energetico", "cafe"]        
        },
        {
            id: 7,
            texto: "O expediente acabou e seus amigos estão armando um Happy Hour. Vai junto?\n\n➡️ Sim: Felicidade +20 / Saldo -40\n⬅️ Não: Você vai para casa",
            local: "Trabalho",
            sim: { felicidade: +20, saldo: -40 },
            nao: {},
            tags: ["social", "fim_expediente", "lazer"],
            incompativel_com: ["pouco_dinheiro"],            
            itens_compativeis: ["dinheiro_extra", "carteira"]        
        },
        {
            id: 17,
            texto: "Um colega está com dificuldade em um projeto. Ajudá-lo com suas habilidades?\n\n➡️ Sim: Estresse +5 / Felicidade +10\n⬅️ Não: Felicidade -5",
            local: "Trabalho",
            sim: { estresse: +5, felicidade: +10 },
            nao: { felicidade: -5 },
            tags: ["trabalho", "social"],
            incompativel_com: [],
            itens_compativeis: ["manual_tecnico", "tablet"]        
        },
        {
            id: 18,
            texto: "Seu supervisor elogiou seu trabalho recente e ofereceu um projeto importante. Aceitar?\n\n➡️ Sim: Estresse +15 / Felicidade +15\n⬅️ Não: Estresse -5 / Felicidade -10",
            local: "Trabalho",
            sim: { estresse: +15, felicidade: +15 },
            nao: { estresse: -5, felicidade: -10 },
            tags: ["trabalho", "carreira"],
            incompativel_com: ["muito_estressado"],            
            itens_compativeis: ["guia_gestao", "planejador"]        
        }
    ],
    teste: [
        {
            id: 8,
            texto: "teste saude\n\n➡️ Sim: Saude +100 /\n⬅️ Não: Saude -100",
            local: "Trabalho",
            sim: { saude: +100},
            nao: {saude: -100},
            tags: ["teste"],
            incompativel_com: []
        },
        {
            id: 9,
            texto: "teste felicidade\n\n➡️ Sim: felicidade +100 /\n⬅️ Não: felicidade -100",
            local: "Trabalho",
            sim: { felicidade: +100},
            nao: { felicidade: -100},
            tags: ["teste"],
            incompativel_com: []
        }
    ]
};

const cartas = Object.values(cartasGrupos).flat();

let jogador = {
    saude: 100,
    estresse: 0,
    felicidade: 50,
    saldo: 100,
    inventario: [],
    // Novos campos para rastreamento
    estado: {
        local: "casa",          // casa, trabalho
        periodo: "manha",       // manha, tarde, noite
        condicoes: [],          // gripado, cansado, etc.
        ultimasCartas: [],      // IDs das últimas 5 cartas mostradas
        ultimoGrupo: "",        // Último grupo de cartas mostrado
        ultimoItem: null,       // Último item obtido
        contadores: {
            itens: 0,           // Cartas desde o último item
            consecutivasMesmoGrupo: 0  // Cartas consecutivas do mesmo grupo
        },
        contagemPeriodo: {      // Contagem de cartas por período
            manha: 0,
            tarde: 0,
            noite: 0
        },
        limitesPeriodo: {       // Número máximo de cartas por período
            manha: 5,           // 1 higiene + 4 preparação
            tarde: 5,           // 5 cartas de trabalho
            noite: 5            // 5 cartas noturnas
        }
    }
};

let id_jogo = null;
let cardCount = 0;
let emTransicaoPeriodo = false;
let currentCard = null; // Guarda referência à carta atual

// IMPORTANTE: Remova a definição da classe Card e use essas funções auxiliares
// Função para verificar itens compatíveis com a carta atual
function verificarItensCompativeis(carta) {
    if (!carta.itens_compativeis || !jogador.inventario.length) {
        return [];
    }
    
    // Filtrar itens do inventário que são compatíveis com esta carta
    return jogador.inventario.filter(item => {
        // Verificar se o item tem tags que correspondem aos tipos compatíveis
        if (item.tags) {
            const tagsArray = typeof item.tags === 'string' ? item.tags.split(',') : item.tags;
            return carta.itens_compativeis.some(tipo => 
                tagsArray.includes(tipo)
            );
        }
        // Se não tiver tags, usar nome do item como fallback
        return carta.itens_compativeis.some(tipo => 
            item.nome.toLowerCase().includes(tipo.toLowerCase())
        );
    });
}

// Função para mostrar menu de itens
function mostrarMenuItens(itensCompativeis, cardElement) {
    // Remover menu existente se houver
    const menuExistente = document.querySelector('.menu-itens');
    if (menuExistente) menuExistente.remove();
    
    // Criar menu
    const menu = document.createElement('div');
    menu.classList.add('menu-itens');
    menu.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: rgba(0, 0, 0, 0.9); border-radius: 10px; padding: 20px; min-width: 280px; z-index: 1000;';
    
    // Título
    const titulo = document.createElement('h3');
    titulo.textContent = 'Escolha um item para usar:';
    titulo.style.cssText = 'color: white; margin-bottom: 15px; text-align: center;';
    menu.appendChild(titulo);
    
    // Lista de itens
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
        
        // Efeito hover
        itemBtn.addEventListener('mouseover', () => {
            itemBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        });
        itemBtn.addEventListener('mouseout', () => {
            itemBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        });
        
        // Clicar para usar
        itemBtn.addEventListener('click', () => {
            usarItemContextual(item);
            menu.remove();
            
            // Remover a carta atual
            cardElement.classList.add('dismissing');
            setTimeout(() => {
                cardElement.remove();
                appendNewCard();
            }, 300);
        });
        
        menu.appendChild(itemBtn);
    });
    
    // Botão de cancelar
    const cancelarBtn = document.createElement('button');
    cancelarBtn.textContent = 'Cancelar';
    cancelarBtn.style.cssText = 'width: 100%; background-color: #444; color: white; border: none; padding: 10px; border-radius: 5px; margin-top: 10px; cursor: pointer;';
    cancelarBtn.addEventListener('click', () => {
        menu.remove();
    });
    menu.appendChild(cancelarBtn);
    
    document.body.appendChild(menu);
}

// Função para adicionar botão de uso de item em uma carta
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

// Função para verificar incompatibilidades com inventário
function cartaEhCompativel(carta) {
    // Verificar se a carta está nas últimas mostradas (evitar repetição)
    if (jogador.estado.ultimasCartas.includes(carta.id)) {
        return false;
    }

    // Verificar incompatibilidades com itens no inventário
    if (carta.incompativel_com && carta.incompativel_com.length > 0) {
        // Verificar se tem algum item que torna esta carta incompatível
        const temItemIncompativel = jogador.inventario.some(item => 
            carta.incompativel_com.some(tag => 
                item.tags && item.tags.includes(tag)
            )
        );
        if (temItemIncompativel) return false;
    }
    
    // Verificar incompatibilidades com estado do jogador
    if (carta.incompativel_com.includes("muito_estressado") && jogador.estresse > 70) {
        return false;
    }
    
    if (carta.incompativel_com.includes("pouco_dinheiro") && jogador.saldo < 50) {
        return false;
    }
    
    return true;
}

// Função para usar item em contexto específico
async function usarItemContextual(item) {
    try {
        const response = await fetch(`/api/game/jogos/${id_jogo}/inventario/usar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_item_inventario: item.id_item_inventario })
        });
        
        const data = await response.json();
        
        if (data.status === 'success') {
            // Aplicar os efeitos do item
            aplicarEfeitos(data.efeitos);
            
            // Recarregar o inventário
            await carregarInventario();
            
            // Mostrar mensagem mais discreta (tooltip em vez de alert)
            mostrarNotificacao(`Você usou ${item.nome}!`);
            
            // Incrementar a contagem do período
            jogador.estado.contagemPeriodo[jogador.estado.periodo]++;
        } else {
            console.error('Erro ao usar item:', data.message);
        }
    } catch (error) {
        console.error('Erro ao usar item:', error);
    }
}

// Função para mostrar notificação
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

// Função melhorada para selecionar próxima carta com base no estado atual
function selecionarProximaCarta() {
    // Definir grupos específicos para cada período
    let gruposDisponiveis = [];
    
    // Forçar a seleção com base no período atual e na contagem de cartas
    switch(jogador.estado.periodo) {
        case "manha":
            // Começa com higiene, depois preparo para trabalho
            if (jogador.estado.contagemPeriodo.manha < 1) {
                gruposDisponiveis = ["casa_manha"]; // Primeira carta: higiene
            } else {
                gruposDisponiveis = ["preparo_trabalho"]; // Demais cartas: preparo
            }
            break;
        case "tarde":
            gruposDisponiveis = ["trabalho"];
            break;
        case "noite":
            gruposDisponiveis = ["casa_noite"];
            break;
    }
    
    // Adicionar grupo de saúde com menor prioridade
    const todosPossiveisGrupos = [...gruposDisponiveis, "saude"];
    
    // Filtrar cartas disponíveis
    let cartasDisponiveis = [];
    
    // Verificar cartas nos grupos prioritários
    for (const grupo of todosPossiveisGrupos) {
        if (cartasGrupos[grupo]) {
            // Filtrar cartas compatíveis
            const cartasGrupo = cartasGrupos[grupo].filter(carta => 
                cartaEhCompativel(carta)
            );
            
            // Verificações adicionais para cartas específicas
            const cartasFiltradas = cartasGrupo.filter(carta => {
                // Happy Hour só deve aparecer no final da tarde (última carta)
                if (carta.tags && carta.tags.includes("fim_expediente")) {
                    return jogador.estado.periodo === "tarde" && 
                           jogador.estado.contagemPeriodo.tarde >= 4;
                }
                return true;
            });
            
            // Se encontramos cartas no grupo principal, usar apenas elas
            if (cartasFiltradas.length > 0 && gruposDisponiveis.includes(grupo)) {
                cartasDisponiveis = cartasFiltradas;
                jogador.estado.ultimoGrupo = grupo;
                break;
            } 
            // Senão, adicionar cartas de saúde como fallback
            else if (grupo === "saude") {
                cartasDisponiveis = [...cartasDisponiveis, ...cartasFiltradas];
            }
        }
    }
    
    // Se não há cartas disponíveis, resetar histórico para permitir repetições
    if (cartasDisponiveis.length === 0) {
        jogador.estado.ultimasCartas = [];
        
        // Tentar novamente com novas cartas (somente como último recurso)
        const cartasAleatorias = cartas.filter(carta => 
            carta.tags && carta.tags.some(tag => 
                tag === "teste" || tag === jogador.estado.periodo
            )
        );
        
        if (cartasAleatorias.length > 0) {
            return cartasAleatorias[Math.floor(Math.random() * cartasAleatorias.length)];
        } else {
            return cartas[Math.floor(Math.random() * cartas.length)];
        }
    }
    
    // Escolher uma carta aleatória do conjunto disponível
    const cartaSelecionada = cartasDisponiveis[Math.floor(Math.random() * cartasDisponiveis.length)];
    
    // Atualizar histórico
    jogador.estado.ultimasCartas.push(cartaSelecionada.id);
    if (jogador.estado.ultimasCartas.length > 5) {
        jogador.estado.ultimasCartas.shift();
    }
    
    // Incrementar contador de cartas desde último item
    jogador.estado.contadores.itens++;
    
    return cartaSelecionada;
}

// Função melhorada para avanço de período
function avancarPeriodo() {
    let mensagemTransicao = "";
    let novoPeriodo = "";
    let novoLocal = "";
    
    switch(jogador.estado.periodo) {
        case "manha":
            novoPeriodo = "tarde";
            novoLocal = "trabalho";
            mensagemTransicao = "Você chegou ao trabalho. O expediente da tarde começou!";
            break;
        case "tarde":
            novoPeriodo = "noite";
            novoLocal = "casa";
            mensagemTransicao = "O dia de trabalho acabou. Você chegou em casa à noite.";
            break;
        case "noite":
            novoPeriodo = "manha";
            novoLocal = "casa";
            mensagemTransicao = "Um novo dia começa! Você acorda em casa pela manhã.";
            break;
    }
    
    // Resetar contagem para o novo período
    jogador.estado.contagemPeriodo[jogador.estado.periodo] = 0;
    
    // Atualizar estado
    jogador.estado.periodo = novoPeriodo;
    jogador.estado.local = novoLocal;
    
    // Marcar que estamos em transição
    emTransicaoPeriodo = true;
    
    // Limpar histórico de cartas para permitir cartas novas no novo período
    jogador.estado.ultimasCartas = [];
    
    // Criar carta de transição
    const transicaoCard = document.createElement('div');
    transicaoCard.classList.add('card', 'transicao-periodo');
    transicaoCard.innerHTML = `
        <p class="pergunta">${mensagemTransicao}</p>
        <div style="margin-top: 20px; font-size: 36px;">${jogador.estado.periodo === "noite" ? "🌙" : "☀️"}</div>
        <button class="continuar" style="background-color: #2c88d9; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-size: 16px; margin-top: 20px; cursor: pointer;">Continuar</button>
    `;
    
    // Adicionar à pilha de cartas
    swiper.append(transicaoCard);
    
    // Adicionar evento ao botão
    const btnContinuar = transicaoCard.querySelector('.continuar');
    btnContinuar.addEventListener('click', () => {
        transicaoCard.classList.add('dismissing');
        setTimeout(() => {
            transicaoCard.remove();
            emTransicaoPeriodo = false;
            diaNoite(); // Atualizar visual dia/noite
            appendNewCard(); // Mostrar próxima carta
        }, 300);
    });
    
    console.log(`Período avançado para: ${jogador.estado.periodo} em ${jogador.estado.local}`);
}

// Carregar inventário ao iniciar o jogo
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
            
            // Inicializar estado do jogador
            jogador.estado = {
                local: "casa",
                periodo: "manha",
                condicoes: [],
                ultimasCartas: [],
                ultimoGrupo: "",
                ultimoItem: null,
                contadores: {
                    itens: 3, // Começar com chance de receber item
                    consecutivasMesmoGrupo: 0
                },
                contagemPeriodo: {
                    manha: 0,
                    tarde: 0,
                    noite: 0
                },
                limitesPeriodo: {
                    manha: 5,
                    tarde: 5,
                    noite: 5
                }
            };

            await carregarInventario();
            
            cardCount = data.jogo.card_position || 0;

            diaNoite();
            atualizarHUD();
            
            console.log('Jogo carregado com sucesso:', data.jogo);
        } else {
            console.error('Erro ao carregar jogo:', data.message);
        }
    } catch (error) {
        console.error('Erro ao comunicar com o servidor:', error);
    }
}

// Melhorar a interface de inventário
function atualizarInventarioUI() {
    const inventarioElement = document.getElementById('inventario');
    inventarioElement.innerHTML = '';
    
    // Criar botão de toggle para o inventário
    const inventarioToggle = document.createElement('button');
    inventarioToggle.id = 'toggle-inventario';
    inventarioToggle.innerHTML = '🎒';
    inventarioToggle.style.cssText = 'background: none; border: none; font-size: 24px; cursor: pointer;';
    inventarioElement.appendChild(inventarioToggle);
    
    // Criar o painel de inventário (inicialmente oculto)
    const inventarioPanel = document.createElement('div');
    inventarioPanel.id = 'inventario-panel';
    inventarioPanel.style.cssText = 'display: none; position: absolute; bottom: 60px; right: 10px; background-color: rgba(0,0,0,0.8); padding: 15px; border-radius: 10px; min-width: 200px; z-index: 100;';
    
    if (jogador.inventario.length === 0) {
        inventarioPanel.innerHTML = '<p style="color: white; text-align: center;">Inventário vazio</p>';
    } else {
        const lista = document.createElement('ul');
        lista.style.cssText = 'list-style: none; padding: 0; margin: 0;';
        
        jogador.inventario.forEach(item => {
            const li = document.createElement('li');
            li.style.cssText = 'padding: 8px; margin-bottom: 5px; background-color: rgba(255,255,255,0.1); border-radius: 5px; color: white; display: flex; justify-content: space-between;';
            li.innerHTML = `
                <span>${item.nome}</span>
                <span>${item.usos_restantes} usos</span>
            `;
            li.dataset.itemId = item.id_item_inventario;
            
            // Informação sobre o item ao passar o mouse
            const tooltip = document.createElement('div');
            tooltip.style.cssText = 'display: none; position: absolute; background-color: rgba(0,0,0,0.9); padding: 10px; border-radius: 5px; color: white; max-width: 200px; z-index: 101; right: 220px; bottom: 60px;';
            tooltip.innerHTML = `
                <h4 style="margin: 0 0 5px 0;">${item.nome}</h4>
                <p style="margin: 0 0 5px 0; font-size: 12px; font-style: italic;">${item.descricao || 'Sem descrição'}</p>
                <div style="font-size: 11px;">
                    <p style="margin: 2px 0;">Usar este item na situação apropriada</p>
                </div>
            `;
            
            li.addEventListener('mouseover', () => {
                li.style.backgroundColor = 'rgba(255,255,255,0.2)';
                tooltip.style.display = 'block';
            });
            li.addEventListener('mouseout', () => {
                li.style.backgroundColor = 'rgba(255,255,255,0.1)';
                tooltip.style.display = 'none';
            });
            
            inventarioElement.appendChild(tooltip);
            lista.appendChild(li);
        });
        
        inventarioPanel.appendChild(lista);
    }
    
    inventarioElement.appendChild(inventarioPanel);
    
    // Adicionar evento para mostrar/ocultar o painel
    inventarioToggle.addEventListener('click', () => {
        const panel = document.getElementById('inventario-panel');
        if (panel.style.display === 'none') {
            panel.style.display = 'block';
        } else {
            panel.style.display = 'none';
        }
    });
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
            // Aplicar os efeitos do item
            aplicarEfeitos(data.efeitos);
            
            // Recarregar o inventário
            await carregarInventario();
            
            // Mostrar mensagem com notificação em vez de alert
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
    encerrarJogo();

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
    // Se estamos no meio de uma transição, não mostrar nova carta
    if (emTransicaoPeriodo) return;
    
    // Checa primeiro se perdeu por estatística
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
        swiper.append(fimDeJogo);
        document.getElementById('reiniciarJogo').addEventListener('click', reiniciarJogo);
        return;
    }

    // Verificar se acabaram as cartas
    if (cardCount >= cartas.length) {
        const fimDeJogo = document.createElement('div');
        fimDeJogo.classList.add('card');
        fimDeJogo.innerHTML = `
            <p class="pergunta">Fim do jogo! Você completou todas as cartas.</p>
            <button id="reiniciarJogo" style="background-color: #2c88d9; color: white; border: none; padding: 20px 130px; border-radius: 8px; font-size: 16px; margin-bottom:-32px; cursor: pointer;">Começar Novo Jogo</button>
        `;
        swiper.append(fimDeJogo);
        document.getElementById('reiniciarJogo').addEventListener('click', reiniciarJogo);
        return;
    }
    
    // Verificar se atingimos o limite de cartas para o período atual
    if (jogador.estado.contagemPeriodo[jogador.estado.periodo] >= jogador.estado.limitesPeriodo[jogador.estado.periodo]) {
        avancarPeriodo();
        return; // Importante: retornar aqui para não mostrar a próxima carta ainda
    }
    
    // Chance ajustada de receber item aleatório (10% em vez de 20%)
    // E apenas se passaram pelo menos 3 cartas desde o último item
    if (Math.random() < 0.1 && jogador.estado.contadores.itens >= 3) {
        jogador.estado.contadores.itens = 0; // Resetar contador
        verificarItemAleatorio();
        return; // Importante: retornar para não mostrar a próxima carta normal
    }

    // Selecionar a próxima carta com base no estado atual
    const cardAtual = selecionarProximaCarta();
    currentCard = cardAtual; // Guardar referência para uso posterior
    
    // Usar a classe Card existente
    const card = new Card({
        imageUrl: cardAtual.texto,
        onDismiss: appendNewCard,
        onLike: () => {
            aplicarEfeitos(cardAtual.sim);
            
            // Executar ações especiais quando existirem
            if (cardAtual.acoes_sim) {
                // Se a ação for adicionar item ao inventário
                if (cardAtual.acoes_sim.adicionar_item) {
                    // CORREÇÃO: Passar a referência do elemento card.element
                    adicionarItemAoInventario(cardAtual.acoes_sim.adicionar_item, card.element);
                    console.log("Item adicionado pela ação da carta:", cardAtual.acoes_sim.adicionar_item);
                    return; // CORREÇÃO: retornar aqui para não incrementar a contagem
                }
            }
            
            // Incrementar a contagem do período atual
            jogador.estado.contagemPeriodo[jogador.estado.periodo]++;
            
            console.log("✔️ SIM:", cardAtual.texto);
        },
        onDislike: () => {
            aplicarEfeitos(cardAtual.nao);
            
            // Também podemos processar ações para "não" se necessário
            if (cardAtual.acoes_nao && cardAtual.acoes_nao.adicionar_item) {
                // CORREÇÃO: Passar a referência do elemento card.element
                adicionarItemAoInventario(cardAtual.acoes_nao.adicionar_item, card.element);
                return; // CORREÇÃO: retornar aqui para não incrementar a contagem
            }
            
            // Incrementar a contagem do período atual
            jogador.estado.contagemPeriodo[jogador.estado.periodo]++;
            
            console.log("❌ NÃO:", cardAtual.texto);
        }
    });

    // Adicionar botão de uso de item se necessário
    adicionarBotaoUsarItem(card.element, cardAtual);

    swiper.append(card.element);
    cardCount++;

    const cards = swiper.querySelectorAll('.card:not(.dismissing)');
    cards.forEach((card, index) => {
        card.style.setProperty('--i', index);
    });
}

// Função atualizada para verificar item aleatório
async function verificarItemAleatorio() {
    try {
        // Obter item aleatório do banco
        const response = await fetch('/api/game/itens/aleatorio');
        const data = await response.json();
        
        if (data.status === 'success') {
            const item = data.item;
            
            // Adicionar estilo ao botão
            const buttonStyle = "background-color: #2c88d9; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-size: 16px; margin-top: 20px; cursor: pointer;";
            
            // Mostrar carta de item com descrição mais detalhada
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
            
            // Adicionar a carta ao swiper
            swiper.append(itemCard);
            
            // Adicionar evento de clique ao botão
            const btn = itemCard.querySelector('.pegar-item');
            // CORREÇÃO: Passar itemCard como segundo parâmetro
            btn.addEventListener('click', () => adicionarItemAoInventario(item.id_item, itemCard));
        }
    } catch (error) {
        console.error('Erro ao obter item aleatório:', error);
        // Em caso de erro, continuar com o jogo normalmente
        appendNewCard();
    }
}

// Corrigir função de adicionar item ao inventário para evitar múltiplos cliques
// Função corrigida para receber a referência da carta
async function adicionarItemAoInventario(id_item, cartaOriginal = null) {
    // Desabilitar o botão para evitar múltiplos cliques
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
            // Armazenar o item recebido para referência futura
            jogador.estado.ultimoItem = id_item;
            
            await carregarInventario();
            
            // IMPORTANTE: Verificar se temos uma referência específica à carta
            if (cartaOriginal) {
                cartaOriginal.classList.add('dismissing');
                setTimeout(() => {
                    cartaOriginal.remove();
                    appendNewCard(); // Avançar para próxima carta
                }, 300);
            } else {
                // Caso de carta de item (que tem o botão "Pegar Item")
                const itemCard = document.querySelector('.card');
                if (itemCard) {
                    itemCard.classList.add('dismissing');
                    setTimeout(() => {
                        itemCard.remove();
                        appendNewCard(); // Avançar para próxima carta
                    }, 300);
                } else {
                    appendNewCard();
                }
            }
        } else {
            console.error('Erro ao adicionar item:', data.message);
            // Reativar o botão em caso de erro
            if (btn) {
                btn.disabled = false;
                btn.textContent = "Pegar Item";
                btn.style.opacity = "1";
            }
        }
    } catch (error) {
        console.error('Erro ao adicionar item:', error);
        // Reativar o botão em caso de erro
        if (btn) {
            btn.disabled = false;
            btn.textContent = "Pegar Item";
            btn.style.opacity = "1";
        }
    }
}
function adicionarCartaSemIncrementar(indice) {
    if (indice >= cartas.length) return;
    
    const cardAtual = cartas[indice];
    currentCard = cardAtual; // Guardar referência
    
    const card = new Card({
        imageUrl: cardAtual.texto,
        onDismiss: appendNewCard,
        onLike: () => {
            aplicarEfeitos(cardAtual.sim);
            
            // Executar ações especiais quando existirem
            if (cardAtual.acoes_sim) {
                if (cardAtual.acoes_sim.adicionar_item) {
                    // CORREÇÃO: Passar a referência do elemento card.element
                    adicionarItemAoInventario(cardAtual.acoes_sim.adicionar_item, card.element);
                    return; // CORREÇÃO: retornar aqui para não incrementar a contagem
                }
            }
            
            // Incrementar a contagem do período atual
            jogador.estado.contagemPeriodo[jogador.estado.periodo]++;
            
            console.log("✔️ SIM:", cardAtual.texto);
        },
        onDislike: () => {
            aplicarEfeitos(cardAtual.nao);
            
            if (cardAtual.acoes_nao && cardAtual.acoes_nao.adicionar_item) {
                // CORREÇÃO: Passar a referência do elemento card.element
                adicionarItemAoInventario(cardAtual.acoes_nao.adicionar_item, card.element);
                return; // CORREÇÃO: retornar aqui para não incrementar a contagem
            }
            
            // Incrementar a contagem do período atual
            jogador.estado.contagemPeriodo[jogador.estado.periodo]++;
            
            console.log("❌ NÃO:", cardAtual.texto);
        }
    });
    
    // Adicionar botão de uso de item se necessário
    adicionarBotaoUsarItem(card.element, cardAtual);
    
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

// Versão aprimorada da função diaNoite()
function diaNoite() {
    const dia = document.getElementById('dia');
    const noite = document.getElementById('noite');

    if (!dia || !noite) {
        console.error("Elementos de dia/noite não encontrados!");
        return;
    }

    if (jogador.estado.periodo === "manha" || jogador.estado.periodo === "tarde") {
        dia.style.opacity = 1;
        noite.style.opacity = 0;
        document.body.style.backgroundColor = "var(--mid-blue)";
        document.body.classList.remove('periodo-noite');
        document.body.classList.add('periodo-dia');
    } else {
        dia.style.opacity = 0;
        noite.style.opacity = 1;
        document.body.style.backgroundColor = "var(--dark-blue)";
        document.body.classList.remove('periodo-dia');
        document.body.classList.add('periodo-noite');
    }
    
    // Adicionar feedback visual para a mudança
    const indicadorExistente = document.querySelector('.periodo-indicador');
    if (indicadorExistente) {
        indicadorExistente.remove();
    }
    
    const indicador = document.createElement('div');
    indicador.classList.add('periodo-indicador');
    indicador.textContent = jogador.estado.periodo === "noite" ? "🌙 Noite" : "☀️ " + 
        (jogador.estado.periodo === "manha" ? "Manhã" : "Tarde");
    indicador.style.cssText = `
        position: fixed;
        top: 15px;
        right: 15px;
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 5px 10px;
        border-radius: 20px;
        font-size: 14px;
        animation: fadeInOut 2s forwards;
        z-index: 1000;
    `;
    
    document.body.appendChild(indicador);
    
    // Remover após animação
    setTimeout(() => {
        if (indicador.parentNode) {
            indicador.remove();
        }
    }, 2000);
    
    console.log("Atualizado visual para período:", jogador.estado.periodo);
}

function encerrarJogo() {
    if (
        jogador.estresse >= 100 ||
        jogador.felicidade <= 0 ||
        jogador.saldo <= 0 ||
        jogador.saude <= 0
    ) {
        cardCount = cartas.length;
    }
}

// Adicionar estilo CSS para o botão de inventário e animações
const style = document.createElement('style');
style.textContent = `
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
`;
document.head.appendChild(style);

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