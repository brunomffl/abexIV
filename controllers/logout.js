const logout = (req, res) => {
    res.clearCookie("userRegistered", "", {maxAge: 1});
    res.redirect("/")
}
module.exports = logout;