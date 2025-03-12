const express = require("express");
const db = require("./routes/db-config");
const app = express();
const cookie = require("cookie-parser");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT

app.use("/js", express.static(__dirname + "./public/js"))
app.use("/js", express.static(__dirname + "./public/css"))
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(cookie());
app.use(express.json());
db.connect((error) => {
    if(error){
        throw error;
    }else{
        console.log("banco de dados conectado")
    }
})
app.use("/", require("./routes/pages"));
app.use("/api", require("./controllers/auth"));
app.listen(PORT)