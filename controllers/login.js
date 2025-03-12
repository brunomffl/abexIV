const jwt = require("jsonwebtoken");
const db = require("../routes/db-config");
const bcryptjs = require("bcryptjs");

const login = (async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        return res.json({ status: "error", error: "Coloque seu usuário e senha para prosseguir!" });
    }else{
        db.query("SELECT email FROM usuarios WHERE email = ?", [email], async (Err, result) => {
            if(Err) throw Err;
            if(!result[0] || !await bcrypt.compare(password, result[0].password)){
                return res.json({ status: "error", error: "E-mail ou senha incorretos!" });
            }else{
                const token = jwt.sign({ id: result[0].id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES,
                    httpOnly: true
                })
                const cookieOptions = {
                    expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                    httpOnly: true
                }
                res.cookie("userRegistered", token, cookieOptions);
                return res.json({ status: "success", success: "Acesso permitido!" })
            }
        })
    }

})

module.exports = login;