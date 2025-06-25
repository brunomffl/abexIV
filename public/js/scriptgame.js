const swiper = document.querySelector('#swiper');
const like = document.querySelector('#like');
const dislike = document.querySelector('#dislike');

// SUBSTITUA SEU cartasGrupos ANTIGO POR ESTE BLOCO COMPLETO
const cartasGrupos = {
    // ==================================================
    // GRUPOS DE EVENTOS FIXOS (1 CARTA POR DIA)
    // ==================================================

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
        }
    ],

    // ==================================================
    // POOLS DE CARTAS ALEATÓRIAS (PARA SORTEIO)
    // ==================================================

    trabalho: [
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
        }
    ],

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
    ],

};

const CARTA_CHEGOU_TRABALHO = {
    id: 9001, // ID alto para não conflitar
    type: 'transicao',
    texto: 'Você chegou ao trabalho.',
    tags: ['manha'] // Ajuda a função diaNoite()
};

const CARTA_CHEGOU_CASA = {
    id: 9002,
    type: 'transicao',
    texto: 'Você chegou em casa.',
    tags: ['noite'] // Ajuda a função diaNoite()
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
        condicoes: [],          // gripado, cansado, etc.
        ultimasCartas: [],      
        contadores: {
            itens: 0,           // Cartas desde o último item
        },
        sequenciaDia: []
    }
};

let id_jogo = null;
let cardCount = 0;
let emTransicaoPeriodo = false;
let currentCard = null; // Guarda referência à carta atual

function montarSequenciaDoDia() {
    const sequencia = [];
    
    // Embaralha as cartas de trabalho para garantir variedade
    const trabalhoPool = [...cartasGrupos.trabalho].sort(() => Math.random() - 0.5);

    // --- MANHÃ (7 cartas) ---
    sequencia.push(cartasGrupos.acordar_higiene[0]);
    sequencia.push(cartasGrupos.cafe_da_manha[0]);
    sequencia.push(cartasGrupos.transporte_trabalho[0]);
    sequencia.push(CARTA_CHEGOU_TRABALHO)
    sequencia.push(...trabalhoPool.splice(0, 4)); // Pega as primeiras 4 cartas de trabalho

    // --- TARDE (5 cartas) ---
    sequencia.push(cartasGrupos.almoco[0]);
    sequencia.push(...trabalhoPool.splice(0, 4)); // Pega as próximas 4 cartas de trabalho

    // --- NOITE (3 cartas) ---
    sequencia.push(cartasGrupos.volta_casa[0]);
    sequencia.push(CARTA_CHEGOU_CASA);
    sequencia.push(cartasGrupos.jantar[0]);
    sequencia.push(cartasGrupos.dormir[0]);

    // Guarda a sequência final no estado do jogador
    jogador.estado.sequenciaDia = sequencia.filter(Boolean); // .filter(Boolean) remove cartas não encontradas
    console.log("ROTEIRO DO DIA MONTADO:", jogador.estado.sequenciaDia.map(c => c.id));
}

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

            cardCount++;
            
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
            
            // A linha que incrementava o contador de período foi removida daqui,
            // pois essa lógica não existe mais no sistema de "Roteiro do Dia".
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
    // Apenas pega a próxima carta da sequência pré-montada. Simples e infalível.
    const proximaCarta = jogador.estado.sequenciaDia[cardCount];
    
    // Fallback de emergência para não quebrar o jogo
    if (!proximaCarta) {
        console.error("Fim da sequência ou carta inválida! Encerrando o jogo.");
        cardCount = jogador.estado.sequenciaDia.length; // Força o fim do jogo
        return null;
    }
    
    return proximaCarta;
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
            headers: { 'Content-Type': 'application/json' }
        });
        
        const data = await response.json();
        
        if (data.status === 'success') {
            id_jogo = data.jogo.id_jogo;
            
            // Carrega os status do jogador
            jogador.saude = data.jogo.saude;
            jogador.estresse = data.jogo.estresse;
            jogador.felicidade = data.jogo.felicidade;
            jogador.saldo = data.jogo.saldo;
            
            // Inicializa o estado do jogador com a ESTRUTURA NOVA E CORRETA
            jogador.estado = {
                condicoes: [],
                ultimasCartas: [],
                contadores: { itens: 3 },
                sequenciaDia: [] // Apenas o que é necessário
            };

            await carregarInventario();
            
            cardCount = data.jogo.card_position || 0;

            montarSequenciaDoDia(); // Monta o roteiro do dia
            
            // A primeira carta ainda não existe, então não chame diaNoite() aqui
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

// ...existing code...
function appendNewCard() {
    // 1. VERIFICA SE O JOGO ACABOU POR STATUS
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

    // 2. VERIFICA SE O JOGO ACABOU POR COMPLETAR O ROTEIRO
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

    // 3. VERIFICA SE DEVE MOSTRAR UM ITEM ALEATÓRIO
    if (Math.random() < 0.1 && jogador.estado.contadores.itens >= 3) {
        jogador.estado.contadores.itens = 0;
        verificarItemAleatorio();
        return;
    }

    // 4. SE O JOGO CONTINUA, PEGA A PRÓXIMA CARTA
    const cardAtual = selecionarProximaCarta();
    if (!cardAtual) {
        console.error("Não foi possível encontrar a próxima carta no roteiro. Avançando...");
        cardCount++;
        appendNewCard();
        return;
    }
    currentCard = cardAtual;

    // 5. DECIDE QUAL TIPO DE CARTA MOSTRAR
    if (cardAtual.type === 'transicao') {
        // É uma carta de transição
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
        // É uma carta normal de swipe
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

    // 6. ATUALIZA O EFEITO DE EMPILHAMENTO
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

    // Decide o período pela TAG da carta atual
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

// Adicionar estilo CSS para o botão de inventário e animações
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
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
    carregarJogo().then(() => {
        swiper.innerHTML = ''; // Limpa o baralho para um novo jogo
        appendNewCard();     // Inicia o jogo com a sua nova lógica de ordem
    });
});