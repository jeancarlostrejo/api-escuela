const { Router } = require("express");
const router = Router();
const { registerUser, loginUser } = require("../controllers/auth.controller");
const {
  validatorRegister,
  validatorLogin,
} = require("../middlewares/validatorManager");

router.post("/register", validatorRegister, registerUser);
router.post("/login", validatorLogin, loginUser);

module.exports = { authRouter: router };
