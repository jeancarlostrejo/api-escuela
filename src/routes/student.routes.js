const { Router } = require("express");
const router = Router();
const {
  getStudents,
  registerStudent,
  getStudent,
  deleteStudent,
  getStudentsGrade,
  updateStudent,
} = require("../controllers/student.controller");

const {
  validatorAlumn,
  validatorIdParams,
} = require("../middlewares/validatorManager");

const { authMiddleware } = require("../middlewares/validateToken");
const { checkRol } = require("../middlewares/rol");

//Obtener todos los alumnos inscritos
router.get("/", authMiddleware, /*checkRol(["profesor"])*/ getStudents);

//Registrar-Inscribir a un alumno por primera vez
router.post("/", validatorAlumn, registerStudent);

//Dado un id, obtener la informacion de un alumno en especifico
router.get("/:id", validatorIdParams, getStudent);

//Dado un id, Eliminar a un alumno
router.delete("/:id", validatorIdParams, deleteStudent);

//Dado un id, actulizar parcialmente los datos de un alumno
router.patch("/:id", validatorIdParams, validatorAlumn, updateStudent);

//Obtener a los alumnos inscritos que estan en un grado en especifico y en un periodo en especifico
router.get("/grado/:id/periodo/:periodo", getStudentsGrade);

module.exports = { studentRouter: router };
