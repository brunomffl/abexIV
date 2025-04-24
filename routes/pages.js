const express = require("express");
const loggedIn = require("../controllers/loggedIn");
const logout = require("../controllers/logout");
const router = express.Router();

router.get("/", loggedIn, (req, res) => {
    const status = req.user ? "loggedIn" : "no";
    res.render("index", { status: status, user: req.user || "nada" });
});

router.get("/homepage", loggedIn,(req, res) => {
    res.render("homepage", { user: req.user });
});

router.get("/register", loggedIn, (req, res) => {
    res.sendFile("register.html", { root: "./public" });
});

router.get("/login", (req, res) => {
    res.sendFile("login.html", { root: "./public" });
});

router.get("/gamepage", loggedIn, (req, res) => {
    if (!req.user) {
        return res.redirect("/login")
    }
    res.render("gamepage", { user: req.user });
});

router.get("/profile", loggedIn, (req, res) => {
    const user = req.user;
    res.render("profile", { user: user });
});

router.get("/logout", logout);

module.exports = router;