const router = require("express").Router()
const {signup,login, logout, home} = require("../controllers/User.controller")
const {authenticateUser} = require("../middlewares/auth")

router.get("/",authenticateUser, home)
router.post("/signup",signup)
router.post("/login",login)
router.post("/logout", logout)

module.exports = router