const express = require ("express");
const { login, register ,verifyToken, logout } = require ("../controllers/auth.js");
const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.post("/logout",verifyToken,logout)


module.exports= router;