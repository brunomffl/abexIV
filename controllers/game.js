const db = require("../routes/db-config");

// Iniciar um novo jogo
exports.iniciarJogo = (req, res) => {
    const id_usuario = req.user.id_usuario;
    
    // Verificar se já existe um jogo ativo
    db.query(
        "SELECT * FROM jogos WHERE id_usuario = ? AND status = 'Ativo'",
        [id_usuario],
        (err, result) => {
            if (err) {
                console.error("Erro ao verificar jogos ativos:", err);
                return res.status(500).json({ status: "error", message: "Erro ao verificar jogos ativos" });
            }
            
            // Se já existe um jogo ativo, retorna esse jogo
            if (result.length > 0) {
                return res.json({ 
                    status: "success", 
                    jogo: result[0],
                    message: "Jogo existente carregado" 
                });
            }
            
            // Caso contrário, cria um novo jogo
            db.query(
                "INSERT INTO jogos (id_usuario, saude, estresse, felicidade, saldo) VALUES (?, 100, 0, 50, 100)",
                [id_usuario],
                (err, result) => {
                    if (err) {
                        console.error("Erro ao criar novo jogo:", err);
                        return res.status(500).json({ status: "error", message: "Erro ao criar novo jogo" });
                    }
                    
                    const id_jogo = result.insertId;
                    
                    // Retorna os dados do novo jogo
                    db.query(
                        "SELECT * FROM jogos WHERE id_jogo = ?",
                        [id_jogo],
                        (err, result) => {
                            if (err) {
                                console.error("Erro ao buscar dados do novo jogo:", err);
                                return res.status(500).json({ status: "error", message: "Erro ao buscar dados do novo jogo" });
                            }
                            
                            res.json({ 
                                status: "success", 
                                jogo: result[0],
                                message: "Novo jogo criado com sucesso" 
                            });
                        }
                    );
                }
            );
        }
    );
};

// Atualizar status do jogo
exports.atualizarJogo = (req, res) => {
    const id_jogo = req.body.id_jogo;
    const { saude, estresse, felicidade, saldo, card_position } = req.body;
    
    db.query(
        "UPDATE jogos SET saude = ?, estresse = ?, felicidade = ?, saldo = ?, card_position = ? WHERE id_jogo = ?",
        [saude, estresse, felicidade, saldo, card_position, id_jogo],
        (err, result) => {
            if (err) {
                console.error("Erro ao atualizar jogo:", err);
                return res.status(500).json({ status: "error", message: "Erro ao atualizar jogo" });
            }
            
            res.json({ 
                status: "success", 
                message: "Jogo atualizado com sucesso" 
            });
        }
    );
};

// Obter jogo atual
exports.obterJogoAtual = (req, res) => {
    const id_usuario = req.user.id_usuario;
    
    db.query(
        "SELECT * FROM jogos WHERE id_usuario = ? AND status = 'Ativo' ORDER BY data_inicio DESC LIMIT 1",
        [id_usuario],
        (err, result) => {
            if (err) {
                console.error("Erro ao buscar jogo atual:", err);
                return res.status(500).json({ status: "error", message: "Erro ao buscar jogo atual" });
            }
            
            if (result.length === 0) {
                return res.json({ 
                    status: "error", 
                    message: "Nenhum jogo ativo encontrado" 
                });
            }
            
            res.json({ 
                status: "success", 
                jogo: result[0] 
            });
        }
    );
};

// Encerrar jogo
exports.encerrarJogo = (req, res) => {
    const id_jogo = req.params.id_jogo;
    
    db.query(
        "UPDATE jogos SET status = 'Encerrado', data_fim = CURRENT_TIMESTAMP WHERE id_jogo = ?",
        [id_jogo],
        (err, result) => {
            if (err) {
                console.error("Erro ao encerrar jogo:", err);
                return res.status(500).json({ status: "error", message: "Erro ao encerrar jogo" });
            }
            
            res.json({ 
                status: "success", 
                message: "Jogo encerrado com sucesso" 
            });
        }
    );
};

// ENCONTRE esta função no controllers/game.js e SUBSTITUA por:
exports.obterHistorico = (req, res) => {
    const id_usuario = req.user.id_usuario;
    
    db.query(
        `SELECT 
            *,
            DATE_FORMAT(data_inicio, '%d/%m/%Y %H:%i') as data_inicio_formatada,
            CASE 
                WHEN data_fim IS NULL THEN NULL
                ELSE DATE_FORMAT(data_fim, '%d/%m/%Y %H:%i')
            END as data_fim_formatada,
            CASE 
                WHEN data_fim IS NULL THEN 'Ativo'
                ELSE 'Finalizado'
            END as status
        FROM jogos 
        WHERE id_usuario = ? 
        ORDER BY data_inicio DESC`,
        [id_usuario],
        (err, result) => {
            if (err) {
                console.error('Erro ao obter histórico:', err);
                return res.status(500).json({ status: "error", message: "Erro ao obter histórico" });
            }
            res.json({ status: "success", jogos: result });
        }
    );
};

// Obter inventário do jogador
exports.obterInventario = (req, res) => {
    const id_jogo = req.params.id_jogo;
    
    db.query(
        `SELECT i.*, ii.usos_restantes, ii.cooldown_atual, ii.id_item_inventario
         FROM itens_inventario ii
         JOIN itens i ON ii.id_item = i.id_item
         WHERE ii.id_jogo = ?`,
        [id_jogo],
        (err, result) => {
            if (err) {
                console.error('Erro ao obter inventário:', err);
                return res.status(500).json({ status: "error", message: "Erro ao obter inventário" });
            }
            res.json({ status: "success", itens: result });
        }
    );
};

// Função adicionarItem melhorada para evitar duplicatas e limitar o inventário
exports.adicionarItem = (req, res) => {
    const id_jogo = req.params.id_jogo;
    const { id_item } = req.body;
    
    // Primeiro verificar se o jogador já tem muitos itens (limite: 6)
    db.query('SELECT COUNT(*) as total FROM itens_inventario WHERE id_jogo = ?', 
        [id_jogo], 
        (err, countResult) => {
            if (err) {
                return res.status(500).json({ 
                    status: "error", 
                    message: "Erro ao verificar inventário" 
                });
            }
            
            const totalItens = countResult[0].total;
            if (totalItens >= 6) {
                return res.json({ 
                    status: "error", 
                    message: "Inventário cheio! (Máximo: 6 itens)" 
                });
            }
            
            // Verificar se o jogador já tem este item
            db.query('SELECT * FROM itens_inventario WHERE id_jogo = ? AND id_item = ?',
                [id_jogo, id_item],
                (err, existResult) => {
                    if (err) {
                        return res.status(500).json({ 
                            status: "error", 
                            message: "Erro ao verificar item existente" 
                        });
                    }
                    
                    // Se já tem o item, apenas incrementar os usos (até um limite)
                    if (existResult.length > 0) {
                        // Verificar se o item é um consumível antes de permitir acumular
                        db.query('SELECT * FROM itens WHERE id_item = ?', [id_item], 
                            (err, itemResult) => {
                                if (err || itemResult.length === 0) {
                                    return res.status(404).json({ 
                                        status: "error", 
                                        message: "Item não encontrado" 
                                    });
                                }
                                
                                const item = itemResult[0];
                                const existingItem = existResult[0];
                                
                                // Para consumíveis, permitir acumular até 3 usos
                                if (item.tipo === 'Consumível' && existingItem.usos_restantes < 3) {
                                    db.query(
                                        'UPDATE itens_inventario SET usos_restantes = usos_restantes + ? WHERE id_item_inventario = ?',
                                        [item.usos_maximos, existingItem.id_item_inventario],
                                        (err) => {
                                            if (err) {
                                                return res.status(500).json({ 
                                                    status: "error", 
                                                    message: "Erro ao atualizar item" 
                                                });
                                            }
                                            
                                            res.json({ 
                                                status: "success", 
                                                message: "Item atualizado no inventário" 
                                            });
                                        }
                                    );
                                } else {
                                    // Para equipamentos ou se já tem o máximo, informar ao jogador
                                    res.json({ 
                                        status: "success", 
                                        message: "Você já tem este item" 
                                    });
                                }
                            }
                        );
                    } else {
                        // Se não tem o item, adicionar normalmente
                        db.query('SELECT * FROM itens WHERE id_item = ?', [id_item], 
                            (err, result) => {
                                if (err || result.length === 0) {
                                    return res.status(404).json({ 
                                        status: "error", 
                                        message: "Item não encontrado" 
                                    });
                                }
                                
                                const item = result[0];
                                
                                db.query(
                                    'INSERT INTO itens_inventario (id_jogo, id_item, usos_restantes) VALUES (?, ?, ?)',
                                    [id_jogo, id_item, item.usos_maximos],
                                    (err) => {
                                        if (err) {
                                            return res.status(500).json({ 
                                                status: "error", 
                                                message: "Erro ao adicionar item" 
                                            });
                                        }
                                        
                                        res.json({ 
                                            status: "success", 
                                            message: "Item adicionado ao inventário" 
                                        });
                                    }
                                );
                            }
                        );
                    }
                }
            );
        }
    );
};

// Usar item do inventário
exports.usarItem = (req, res) => {
    const id_jogo = req.params.id_jogo;
    const { id_item_inventario } = req.body;
    
    // Obter dados do item
    db.query(
        `SELECT i.*, ii.usos_restantes, ii.id_item_inventario
         FROM itens_inventario ii
         JOIN itens i ON ii.id_item = i.id_item
         WHERE ii.id_item_inventario = ? AND ii.id_jogo = ?`,
        [id_item_inventario, id_jogo],
        (err, result) => {
            if (err || result.length === 0) {
                return res.status(404).json({ status: "error", message: "Item não encontrado no inventário" });
            }
            
            const item = result[0];
            const novoUsosRestantes = item.usos_restantes - 1;
            
            // Se for o último uso, remover do inventário
            if (novoUsosRestantes <= 0) {
                db.query(
                    'DELETE FROM itens_inventario WHERE id_item_inventario = ?',
                    [id_item_inventario],
                    (err) => {
                        if (err) {
                            return res.status(500).json({ status: "error", message: "Erro ao usar item" });
                        }
                        
                        // Retornar os efeitos para aplicar no jogo
                        res.json({ 
                            status: "success", 
                            message: "Item usado e removido do inventário", 
                            efeitos: {
                                saude: item.efeito_saude,
                                estresse: item.efeito_estresse,
                                felicidade: item.efeito_felicidade,
                                saldo: item.efeito_saldo
                            }
                        });
                    }
                );
            } else {
                // Atualizar quantidade de usos
                db.query(
                    'UPDATE itens_inventario SET usos_restantes = ? WHERE id_item_inventario = ?',
                    [novoUsosRestantes, id_item_inventario],
                    (err) => {
                        if (err) {
                            return res.status(500).json({ status: "error", message: "Erro ao atualizar item" });
                        }
                        
                        // Retornar os efeitos para aplicar no jogo
                        res.json({ 
                            status: "success", 
                            message: "Item usado", 
                            efeitos: {
                                saude: item.efeito_saude,
                                estresse: item.efeito_estresse,
                                felicidade: item.efeito_felicidade,
                                saldo: item.efeito_saldo
                            }
                        });
                    }
                );
            }
        }
    );
};

// Obter item aleatório
exports.obterItemAleatorio = (req, res) => {
    db.query(
        'SELECT * FROM itens ORDER BY RAND() LIMIT 1',
        (err, result) => {
            if (err) {
                console.error('Erro ao obter item aleatório:', err);
                return res.status(500).json({ status: "error", message: "Erro ao obter item" });
            }
            
            if (result.length === 0) {
                return res.status(404).json({ status: "error", message: "Nenhum item encontrado" });
            }
            
            res.json({ status: "success", item: result[0] });
        }
    );
};