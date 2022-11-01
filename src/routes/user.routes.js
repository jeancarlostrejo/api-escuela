const { getUsers, deleteUser } = require("../controllers/user.controller");
const { Router } = require("express");
const { validatorIdParams } = require("../middlewares/validatorManager");
const router = Router();

router.get("/", getUsers);
router.delete("/:id", validatorIdParams, deleteUser);

module.exports = { userRouter: router };
