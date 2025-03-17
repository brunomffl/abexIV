const express = require("express");
const loggedIn = require("../controllers/loggedIn");
const logout = require("../controllers/logout");
const router = express.Router();

router.get("/", loggedIn, (req, res) => {
    const status = req.user ? "loggedIn" : "no";
    res.render("index", { status: status, user: req.user || "nothing" });
});

router.get("/register", loggedIn, (req, res) => {
    res.sendFile("register.html", { root: "./public" });
});

router.get("/login", (req, res) => {
    res.sendFile("login.html", { root: "./public" });
});

router.get("/profile", loggedIn, (req, res) => {
    const user = req.user;
    res.render("profile", { user: user });
});

router.get("/logout", logout);

module.exports = router;