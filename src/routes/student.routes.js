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

const { validatorAlumn } = require("../middlewares/validatorManager");

//Obtener todos los alumnos inscritos
router.get("/", getStudents);

//Registrar-Inscribir a un alumno por primera vez
router.post("/", registerStudent);

//Dado un id, obtener la informacion de un alumno en especifico
router.get("/:id", getStudent);

//Dado un id, Eliminar a un alumno
router.delete("/:id", deleteStudent);

//Dado un id, actulizar parcialmente los datos de un alumno
router.patch("/:id", updateStudent);

//Obtener a los alumnos inscritos que estan en un grado en especifico y en un periodo en especifico
router.get("/grado/:id/periodo/:periodo", getStudentsGrade);

module.exports = { studentRouter: router };
