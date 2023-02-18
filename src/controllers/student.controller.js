const { Student } = require("../models/Student");
const { generarData } = require("../utils/generateDataFake");

//Registrar a un alumno por primera vez con toda la informacion
//requerida
const registerStudent = async (req, res) => {
  try {
    //Poblar la base de datos con informacion falsas
    for (let i = 0; i < 250; i++) {
      let dataFake = generarData();
      let student = new Student(dataFake);
      await student.save();
    }

    /*    const cedula = req.body.datosPersonales.cedula.numero;

    //Buscamos si ya hay un estudiante registrado con la misma cedula
    let data = await Student.findOne({
      "datosPersonales.cedula.numero": cedula,
    });

    //Si ya existe un estudiante con la misma cedula, retornamos un mensaje
    if (data) {
      return res.status(400).json({
        error: "Ya hay un estudiante registrado con ese número de cédula",
      });
    }

    const student = new Student(req.body);
    data = await student.save(); */

    return res
      .status(201)
      .json({ message: "Estudiante registrado correctamente" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Error al registrar un estudiante" });
  }
};

//Obtener a los alumnos registrados con toda la informacion
const getStudents = async (req, res) => {
  //Opciones de la paginación, se toman los valores de la url o se setean por defecto si no se pasan
  const options = {
    limit: parseInt(req.query.limit, 10) || 10,
    page: parseInt(req.query.page, 10) || 1,
  };

  try {
    //Hacemos la consulta usando paginacion
    let students = await Student.paginate({}, options);

    if (students.docs.length === 0) {
      return res.status(404).json({ error: "No hay alumnos registrados" });
    }

    //Calculamos la edad del estudiante en base a su fecha de nacimiento a traves de una funcion del schema
    students.docs = students.docs.map((v) => {
      v.datosPersonales.edad = v.datosPersonales.edad;
      return v;
    });

    res.json(students);
  } catch (e) {
    return res.status(500).json({ error: "Error al obtener los alumnos" });
  }
};

//Dado un id, obtendremos los datos de ese alumno en especifo
const getStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findOne({ _id: id });
    console.log(student);
    if (!student) {
      res.status(404).json({ error: "No existe la información solicitada" });
      return;
    }

    //Obtenemos edad del estudiante en base a su fecha de nacimiento
    student.datosPersonales.edad = student.datosPersonales.edad;

    res.json({ student });
  } catch (e) {
    res.status(500).json({ error: "Error al obtener al estudiante" });
  }
};

//Eliminar un estudiante
const deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    let data = await Student.findById(id);

    if (!data) {
      res.status(404).json({ error: "No existe la información solicitada" });
      return;
    }

    data = await Student.deleteOne({ _id: id });

    res.status(204).json({ message: "Estudiante eliminado correctamente" });
  } catch (e) {
    res.status(500).json({ error: "Error al eliminar al estudiante" });
  }
};

//Aqui podremos obtener todos los alumnos de un grado en especifico (1-2-3-4-5-6)
//En un periodo academico (Ej. los alumnos de 5 del periodo 2022-2023)
const getStudentsGrade = async (req, res) => {
  //Opciones de la paginación, se toman los valores de la url o se setean por defecto si no se pasan
  const options = {
    limit: parseInt(req.query.limit, 10) || 10,
    page: parseInt(req.query.page, 10) || 1,
  };
  try {
    const grado = req.params.id;
    const periodo = req.params.periodo;

    //Hacemos la consulta usando paginacion
    const students = await Student.paginate(
      {
        controlInscripcion: {
          $elemMatch: { grado, anhoEscolar: periodo },
        },
      },
      options
    );

    if (students.docs.length === 0) {
      return res.status(404).json({
        error:
          "No hay información de estudiantes para el grado y periodo especifico",
      });
    }

    return res.json({ students });
  } catch (e) {
    return res
      .status(500)
      .json({ error: "Error al obtener los datos de los estudiantes" });
  }
};

//Actualizar parcialmente algunos datos del alumno
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    if (!student) {
      return res
        .status(404)
        .json({ error: "No existe la información solicitada" });
    }

    //Obtener la edad actualizada del alumno en base a su fecha de nacimiento
    student.datosPersonales.edad = student.datosPersonales.edad;

    res.json({ student });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ error: "Error al actualizar la información del estudiante" });
  }
};

module.exports = {
  getStudents,
  registerStudent,
  getStudent,
  deleteStudent,
  getStudentsGrade,
  updateStudent,
};
