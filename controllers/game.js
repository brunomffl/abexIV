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
// No método atualizarJogo, adicione card_position aos parâmetros:
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

// Adicionar ao controllers/game.js
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