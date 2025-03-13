const db = require('../routes/db-config');
const jwt = require('jsonwebtoken');

const loggedIn = (req, res, next) => {
    if (!req.cookies.userRegistered) {
        console.log("Nenhum cookie encontrado.");
        return next();
    }
    try {
        const decoded = jwt.verify(req.cookies.userRegistered, process.env.JWT_SECRET);
        db.query("SELECT * FROM usuarios WHERE id_usuario = ?", [decoded.id], (err, result) => {
            if (err) {
                console.log("Erro ao consultar o banco de dados:", err);
                return next();
            }
            req.user = result[0];
            console.log("Usuário logado:", req.user);
            return next();
        });
    } catch (err) {
        console.log("Erro ao verificar o token JWT:", err);
        return next();
    }
};

module.exports = loggedIn;