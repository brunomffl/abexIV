const express = require("express");
const gameController = require("../controllers/game");
const loggedIn = require("../controllers/loggedIn");
const router = express.Router();
const atualizarPerfil = require("../controllers/profile");

// Rotas para gerenciamento do jogo
router.post("/jogos/iniciar", loggedIn, gameController.iniciarJogo);
router.put("/jogos/atualizar", loggedIn, gameController.atualizarJogo);
router.get("/jogos/atual", loggedIn, gameController.obterJogoAtual);
router.put("/jogos/encerrar/:id_jogo", loggedIn, gameController.encerrarJogo);
router.put("/usuario/atualizar", loggedIn, atualizarPerfil);
router.get("/jogos/:id_jogo/inventario", loggedIn, gameController.obterInventario);
router.post("/jogos/:id_jogo/inventario", loggedIn, gameController.adicionarItem);
router.post("/jogos/:id_jogo/inventario/usar", loggedIn, gameController.usarItem);
router.get("/itens/aleatorio", gameController.obterItemAleatorio);

module.exports = router;