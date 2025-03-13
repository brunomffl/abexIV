const jwt = require("jsonwebtoken");
const db = require("../routes/db-config");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        return res.json({ status: "error", error: "Coloque seu usuário e senha para prosseguir!" });
    }else{
        db.query("SELECT * FROM usuarios WHERE email = ?", [email], async (Err, result) => {
            if(Err) throw Err;
            if(!result.length || !await bcrypt.compare(password, result[0].senha)){
                return res.json({ status: "error", error: "E-mail ou senha incorretos!" });
            }else{
                const token = jwt.sign({ id: result[0].id_usuario }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES
                })
                const cookieOptions = {
                    expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                    httpOnly: true
                }
                res.cookie("userRegistered", token, cookieOptions);
                console.log("Login bem-sucedido para o usuário:", email);
                return res.json({ status: "success", success: "Acesso permitido!" })
            }
        })
    }
}

module.exports = login;