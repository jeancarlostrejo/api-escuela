const { Router } = require("express");
const { studentRouter } = require("./student.routes");
const { authRouter } = require("./auth.routes");
const { userRouter } = require("./user.routes");

const router = Router();

router.use("/alumnos", studentRouter);
router.use("/auth", authRouter);
router.use("/usuarios", userRouter);

module.exports = { router };
