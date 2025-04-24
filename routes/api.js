const express = require("express");
const gameController = require("../controllers/game");
const loggedIn = require("../controllers/loggedIn");
const router = express.Router();

// Rotas para gerenciamento do jogo
router.post("/jogos/iniciar", loggedIn, gameController.iniciarJogo);
router.put("/jogos/atualizar", loggedIn, gameController.atualizarJogo);
router.get("/jogos/atual", loggedIn, gameController.obterJogoAtual);

module.exports = router;