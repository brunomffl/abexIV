const db = require("../routes/db-config");
const bcrypt = require("bcryptjs");

const atualizarPerfil = async (req, res) => {
    const { id_usuario } = req.user;
    const { nome, email, password } = req.body;

    let campos = [];
    let valores = [];

    if (nome) {
        campos.push("nome = ?");
        valores.push(nome);
    }
    if (email) {
        campos.push("email = ?");
        valores.push(email);
    }
    if (password) {
        const senhaCriptografada = await bcrypt.hash(password, 8);
        campos.push("senha = ?");
        valores.push(senhaCriptografada);
    }

    if (campos.length === 0) {
        return res.json({ status: "error", error: "Nenhuma informação para atualizar." });
    }

    valores.push(id_usuario);

    db.query(
        `UPDATE usuarios SET ${campos.join(", ")} WHERE id_usuario = ?`,
        valores,
        (err, result) => {
            if (err) {
                return res.json({ status: "error", error: "Erro ao atualizar perfil." });
            }
            res.json({ status: "success", success: "Perfil atualizado com sucesso!" });
        }
    );
};

module.exports = atualizarPerfil;