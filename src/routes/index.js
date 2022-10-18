const { Router } = require("express");
const { studentRouter } = require("./student.routes");
const { authRouter } = require("./auth.routes");

const router = Router();

router.use("/alumnos", studentRouter);
router.use("/auth", authRouter);

module.exports = { router };
