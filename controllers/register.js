const db = require("../routes/db-config");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    const { email, password: Npassword } = req.body;
    if (!email || !Npassword) {
        return res.json({ status: "error", error: "Coloque seu usuário e senha para prosseguir!" });
    } else {
        db.query('SELECT email FROM usuarios WHERE email = ?', [email], async (err, result) => {
            if (err) throw err;
            if (result[0]) {
                return res.json({ status: "error", error: "Este e-mail já foi registrado!" });
            } else {
                const password = await bcrypt.hash(Npassword, 8);
                db.query("INSERT INTO usuarios SET ?", { email: email, senha: password }, (error, results) => {
                    if (error) throw error;
                    return res.json({ status: "success", success: "Você foi registrado!" });
                });
            }
        });
    }
};

module.exports = register;