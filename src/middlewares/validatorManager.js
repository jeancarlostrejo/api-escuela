const { Student } = require("../models/Student");
const { body, validationResult } = require("express-validator");

const ValidateExpressResult = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

const validatorAlumn = [
  body("datosPersonales")
    .exists()
    .withMessage("Proporcione la información basica del niño")
    .isObject()
    .withMessage("Los datos del estudiantes deben enviarse como Objeto"),
  body("datosPersonales.nombre")
    .exists()
    .withMessage("Debe existir el campo nombre")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("El campo nombre no debe estar vacío"),
  body("datosPersonales.apellido")
    .exists()
    .withMessage("Debe existir el campo apellido")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("El apellido no debe estar vacío"),
  body("datosPersonales.cedula.tipo")
    .exists()
    .toUpperCase()
    .withMessage("Debe existir el campo del tipo de cedula")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("El tipo de cedula NO debe estar vacío")
    .bail()
    .isIn(["V", "E"])
    .withMessage("El tipo de cedula NO es válido"),
  body("datosPersonales.cedula.numero")
    .exists()
    .withMessage("Debe existir el campo del número de cédula")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("El número de cédula NO puede ir vacío")
    .bail()
    .custom(async (value) => {
      let data = await Student.findOne({
        "datosPersonales.cedula.numero": value,
      });

      if (data) {
        throw new Error(
          `Un estudiante ya se encuentra registrado con la cédula: ${value}`
        );
      }
      return value;
    }),
  body("datosPersonales.grupoSanguineo")
    .exists()
    .withMessage("Debe existir el campo del Grupo Sanguíneo")
    .bail()
    .notEmpty()
    .withMessage("El campo Grupo Sanguíneo no debe ir vacío")
    .bail()
    .isIn(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .withMessage("El Grupo Sanguineo no es un valor valido"),
  body("datosPersonales.sexo")
    .exists()
    .withMessage("Debe existir el campo del sexo")
    .bail()
    .notEmpty()
    .withMessage("El campo del sexo NO debe ir vacío")
    .bail()
    .isIn(["Masculino", "Femenino"])
    .withMessage("El sexo no es un valor valido"),

  body("datosPersonales.fechaNacimiento")
    .exists()
    .withMessage("Debe existir el campo de la fecha de nacimiento")
    .bail()
    .notEmpty()
    .withMessage("El campo de la fecha de nacimiento NO debe ir vacío")
    .bail()
    //.isDate({ format: "DD/MM/YYYY" })
    //.withMessage("Fecha invalida"),
    .custom((value) => {
      let fecha = new Date(value);
      let ahora = new Date();

      if (!(fecha !== "Invalid Date" && !isNaN(fecha))) {
        throw new Error("La fecha de nacimiento NO es una fecha válida");
      }

      if (
        !(
          ahora.getFullYear() - fecha.getFullYear() > 3 &&
          ahora.getFullYear() - fecha.getFullYear() < 15
        )
      ) {
        throw new Error(
          "La fecha de nacimiento NO es acorde para un alumno de primaria"
        );
      }
      return value;
    }),
  body("datosPersonales.lugarNacimiento")
    .exists()
    .withMessage("Debe existir el campo del lugar de nacimiento")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("El lugar de nacimiento NO debe estar vacío"),
  body("datosPersonales.direccionHabitacion")
    .exists()
    .withMessage("Debe existir el campo de la dirección de habitación")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("La dirección de habitación NO debe estar vacía"),
  body("datosPersonales.parroquia")
    .exists()
    .withMessage("Debe existir el campo de la parroquia")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("La parroquia no debe estar vacía"),
  body("datosPersonales.municipio")
    .exists()
    .withMessage("Debe existir el campo del municipio")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("El municipio NO debe estar vacío"),
  body("datosPersonales.pais")
    .exists()
    .withMessage("Debe existir el campo del País")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("El País NO debe estar vacío"),
  body("datosPersonales.estadoNacimiento")
    .exists()
    .withMessage("Debe existir el campo del Estado de Nacimiento")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("El Estado de Nacimiento NO debe estar vacío"),
  body("datosPersonales.telefonoResidencial")
    .exists()
    .isInt()
    .withMessage("No es un numero de telefono valido")
    .isLength({ min: 11 })
    .withMessage(
      "El numero de telefono no cumple con la longitud minima valida (11 numeros)"
    )
    .optional({ checkFalsy: true, nullable: true }),
  body("datosPersonales.canaima.posee").default(false),
  body("datosPersonales.canaima.serial").trim().default("N/P"),
  body("datosPersonales.correo")
    .trim()
    .exists()
    .isEmail()
    .toLowerCase()
    .withMessage("El correo electronico no es válido")
    .normalizeEmail()
    .optional({ checkFalsy: true, nullable: true }),
  body("datosPersonales.nuevoIngreso")
    .isBoolean()
    .withMessage("Ingrese un valor Booleano"),
  body("datosPersonales.institucionProcedencia")
    .trim()
    .default("Sin procedencia"),
  body("datosPersonales.razonInscripcion").trim().default("N/P"),
  body("datosPersonales.gradoCursar")
    .exists()
    .withMessage("El campo del Grado a Cursar debe existir")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("El campo del grado a cursar NO debe estar vacio")
    .bail()
    .isIn(["1", "2", "3", "4", "5", "6"])
    .withMessage("El grado a cursar no es válido"),
  body("datosPersonales.repitiente")
    .exists()
    .withMessage("El campo Repitiente debe existir")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Indique si el alumno es repitiente")
    .bail()
    .isBoolean()
    .withMessage("El campo Repitiente debe ser un valor boolean"),
  body("datosPersonales.regular")
    .exists()
    .withMessage("El campo de Regular debe existir")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Indique si el alumno es regular")
    .bail()
    .isBoolean()
    .withMessage("El campo Regular debe ser un valor boolean"),
  body("datosPersonales.tallaCamisa")
    .exists()
    .withMessage("El campo de Talla Camisa debe existir")
    .bail()
    .trim()
    .notEmpty() //Verificas si las tallas se puede colocar en un enum que tengan los numeros y letras de la tallas (Ejemplo: 10-12-S)
    .withMessage("El campo Talla Camisa NO debe estar vacío "),
  body("datosPersonales.estatura")
    .exists()
    .withMessage("El campo de la Estatura debe existir")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("El campo de la Estatura NO debe estar vacío ")
    .bail()
    .isFloat({ gt: 0.49, lt: 2.01 })
    .withMessage("Ingrese una estatura valida en metros (min:0.5 y max: 2)"),
  body("datosPersonales.peso")
    .exists()
    .withMessage("El campo del Peso debe existir")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("El campo del Peso NO debe estar vacío ")
    .bail()
    .isFloat({ gt: 9, lt: 81 })
    .withMessage(
      "Ingrese un valor válido para el peso en kilogramos (min: 10 y max: 80)"
    ),
  body("datosPersonales.tallaPantalon")
    .exists()
    .withMessage("El campo Talla de Pantalon debe existir")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("El campo Talla Pantalón NO debe estar vacío ")
    .bail()
    .isFloat({ gt: 3.9, lt: 31 })
    .withMessage("Talla de Pantalón inválida (min: 4 y max: 30)"),
  body("datosPersonales.calzado")
    .exists()
    .withMessage("El campo Calzado debe existir")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("El campo del Calzado NO debe estar vacío ")
    .bail()
    .isFloat({ gt: 8.9, lt: 45.1 })
    .withMessage(
      "Ingrese un valor numerico de Calzado válido (min:10 y máx:45)"
    ),
  body("datosPersonales.hermanosInstitucion")
    .exists()
    .withMessage(
      "Debe proporcionar la informacion sobre los hermanos en la Institucion"
    ),
  body("datosPersonales.hermanosInstitucion.posee")
    .exists()
    .withMessage(
      "El campo que indica si tiene hermanos en la Institucion debe existir"
    )
    .bail()
    .trim()
    .withMessage(
      "El campo que indica si tiene hermanos en la Institución NO debe estar vacío "
    )
    .bail()
    .toBoolean()
    .isBoolean()
    .withMessage(
      "El campo que indica si tiene hermanos en la Institución debe ser un boolean"
    ),
  body("datosPersonales.hermanosInstitucion.cantidad")
    .exists()
    .withMessage(
      "El campo que indica la cantidad de hermanos en la Institución debe existir"
    )
    .bail()
    .trim()
    .notEmpty()
    .withMessage(
      "El campo que indica la cantidad de hermanos en la Institución NO debe estar vacío"
    )
    .bail()
    .isInt({ gt: -1, lt: 11 })
    .withMessage("La cantidad de hermanos debe ser un valor entero"),
  body("datosPersonales.hermanosInstitucion.gradoCursan").replace(
    [[""], ""],
    []
  ),
  body("datosPersonales.personaEmergencia")
    .exists()
    .withMessage("Debe existir el campo de Persona de Emergencia"),
  body("datosPersonales.personaEmergencia.nombre")
    .exists()
    .withMessage(
      "Debe existir el campo para el nombre de la persona en caso de emergencia"
    )
    .bail()
    .trim()
    .notEmpty()
    .withMessage(
      "El campo para el Nombre de la Persona en caso de Emergencia NO debe estar vacío"
    ),
  body("datosPersonales.personaEmergencia.parentesco")
    .exists()
    .withMessage(
      "Debe existir el campo para el parentesco de la persona en caso de emergencia"
    )
    .bail()
    .trim()
    .notEmpty()
    .withMessage(
      "El campo para el Parentesco de la Persona en caso de Emergencia NO debe estar vacío"
    ),
  body("datosPersonales.personaEmergencia.telefonoResidencial")
    .exists()
    .isInt()
    .withMessage("No es un numero de telefono valido")
    .isLength({ min: 11 })
    .withMessage(
      "El número de telefono no cumple con la longitud mínima válida (11 numeros)"
    )
    .optional({ checkFalsy: true, nullable: true }),
  body("datosPersonales.personaEmergencia.telefonoCelular")
    .exists()
    .isInt()
    .withMessage("No es un numero de telefono valido")
    .isLength({ min: 11 })
    .withMessage(
      "El numero de telefono no cumple con la longitud minima valida (11 numeros)"
    )
    .optional({ checkFalsy: true, nullable: true }),
  body("aspectosSociales")
    .exists()
    .withMessage(
      "Debe existir el campo de la informacion de los aspectos sociales"
    )
    .isObject()
    .withMessage("Los datos de los aspectos sociales deben ser un objeto")
    .optional({ checkFalsy: true, nullable: true }),

  body("aspectosSociales.viveNinho")
    .exists()
    .withMessage(
      "Debe existir el campo de la informacion de con quién vive el niño"
    )
    .isObject()
    .withMessage(
      "Los datos de la informacion de con quién vive el niño debe ir en un objeto"
    )
    .optional({ checkFalsy: true, nullable: true }),
  body("aspectosSociales.viveNinho.madre")
    .exists()
    .withMessage("Indique si el niño vive con la madre")
    .toBoolean()
    .withMessage(
      "El campo que indica si el niño vive con la madre debe ser un boolean"
    )
    .optional({ checkFalsy: true, nullable: true }),
  body("aspectosSociales.viveNinho.padre")
    .exists()
    .withMessage("indique si el niño vive con el padre")
    .toBoolean()
    .withMessage(
      "El campo que indica si el niño vive con el padre debe ser un boolean"
    )
    .optional({ checkFalsy: true, nullable: true }),
  body("aspectosSociales.viveNinho.otros")
    .exists()
    .withMessage("Debe existir el campo")
    .notEmpty()
    .withMessage(
      "El campo que indica si el niño vive con otras personas NO debe estar vacio"
    )
    .optional({ checkFalsy: true, nullable: true }),
  body("aspectosSociales.totalPersonasHogar")
    .exists()
    .withMessage(
      "El campo que indica el total de personas en el hogar debe existir"
    )
    .isInt({ gt: -1 })
    .withMessage(
      "El campo que indica el total de personas en el hogar debe ser un valor numerico mayor o igual que 0"
    )
    .optional({ checkFalsy: true, nullable: true }),
  body("aspectosSociales.hermanos")
    .exists()
    .isObject()
    .withMessage("El campo de los hermanos debe ser un objeto"),
  body("aspectosSociales.hermanos.cantidad")
    .exists()
    .withMessage("Debe existir el campo de la cantidad de hermanos")
    .isInt({ gt: -1 })
    .withMessage(
      "El campo que indica el numero de hermanos debe ser un valor numerico mayor o igual que 0"
    )
    .optional({ checkFalsy: true, nullable: true }),
  body("aspectosSociales.hermanos.lugarOcupaNinho")
    .exists()
    .withMessage(
      "Debe existir el campo que indica el lugar que ocupa el niño con respecto a sus hermanos"
    )
    .notEmpty()
    .withMessage(
      " el campo que indica el lugar que ocupa el niño con respecto a sus hermanos NO debe ir vacio"
    )
    .optional({ checkFalsy: true, nullable: true }),
  body("aspectosSociales.hermanos.descripcionRelacion")
    .exists()
    .withMessage(
      "Debe existir el campo que indica la relacion del niño con sus sus hermanos"
    )
    .notEmpty()
    .withMessage(
      "El campo que indica la relacion del niño con sus sus hermanos NO debe ir vacio"
    )
    .optional({ checkFalsy: true, nullable: true }),
  body("aspectosSociales.otrosFamiliaresHogar")
    .exists()
    .withMessage(
      "El campo que indica con la informacion de los familiares en el hogar debe existir "
    )
    .isObject()
    .withMessage(
      "El campo que indica con la informacion de los familiares en el hogar debe ser un Objeto"
    ),
  body("aspectosSociales.otrosFamiliaresHogar.viven")
    .exists()
    .withMessage(
      "Debe exstir el campo que indica si el ni;o vive con otros familiares"
    )
    .toBoolean()
    .withMessage(
      "El campo que indica si viven otros familiares en el hogar debe ser un boolean"
    )
    .optional({ checkFalsy: true, nullable: true }),
  body("aspectosSociales.otrosFamiliaresHogar.parentesco").optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("aspectosSociales.otrosFamiliaresHogar.descripcionRelacion")
    .trim()
    .optional({
      checkFalsy: true,
      nullable: true,
    }),
  body("aspectosSociales.personaPostClases").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),

  body("aspectosSociales.acompanhanteTareas").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("aspectosSociales.deportesPractica").optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("aspectosSociales.horarioPractica").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("aspectosSociales.talentoActitud").optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("aspectosSociales.beca").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("aspectosSociales.lecturaHogar").optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("aspectosSociales.lecturaHogar.practica").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("aspectosSociales.lecturaHogar.tipo").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("aspectosSociales.trabajo").optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("aspectosSociales.trabajo.ejerce").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("aspectosSociales.trabajo.funciones").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("identificacionPadres").optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("identificacionPadres.madre").optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("identificacionPadres.madre.apellido").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("identificacionPadres.madre.nombre").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("identificacionPadres.madre.cedula").optional({
    checkFalsy: true,
    nullable: true,
  }),

  body("identificacionPadres.madre.cedula.tipo").toUpperCase().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("identificacionPadres.madre.cedula.numero").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("identificacionPadres.madre.fechaNacimiento").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("identificacionPadres.madre.estadoCivil").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("identificacionPadres.madre.lugarNacimiento").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("identificacionPadres.madre.profesion").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("identificacionPadres.madre.ingresoEconomico").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("identificacionPadres.madre.telefonoResidencial").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("identificacionPadres.madre.telefonoCelular").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("identificacionPadres.madre.trabajo").optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("identificacionPadres.madre.trabajo.lugar").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("identificacionPadres.madre.trabajo.telefono").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("identificacionPadres.madre.direccionHabitacion").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("identificacionPadres.madre.enfermedadesPadecidas").optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("identificacionPadres.madre.viveConNinho").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("identificacionPadres.madre.gradoInstruccion").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("identificacionPadres.madre.vivienda").optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("identificacionPadres.madre.vivienda.tenencia").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("identificacionPadres.madre.vivienda.tipo").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("identificacionPadres.madre.religion").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("identificacionPadres.madre.actividades").optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("identificacionPadres.madre.misionSocial").optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("identificacionPadres.madre.misionSocial.posee").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("identificacionPadres.madre.misionSocial.descripcion").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("identificacionPadres.madre.correo").trim().toLowerCase().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("identificacionPadres.madre.relacionNinho").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("identificacionPadres.padre").optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("identificacionPadres.padre.apellido").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("identificacionPadres.padre.nombre").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("identificacionPadres.padre.cedula").optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("identificacionPadres.padre.cedula.tipo").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("identificacionPadres.padre.cedula.numero").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("identificacionPadres.padre.fechaNacimiento").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("identificacionPadres.padre.estadoCivil").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("identificacionPadres.padre.lugarNacimiento").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("identificacionPadres.padre.profesion").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("identificacionPadres.padre.ingresoEconomico").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("identificacionPadres.padre.telefonoResidencial").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("identificacionPadres.padre.telefonoCelular").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("identificacionPadres.padre.trabajo").optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("identificacionPadres.padre.trabajo.lugar").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("identificacionPadres.padre.trabajo.telefono").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("identificacionPadres.padre.enfermedadesPadecidas").optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("identificacionPadres.padre.correo").trim().toLowerCase().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("identificacionPadres.padre.viveConNinho").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("identificacionPadres.padre.gradoInstruccion").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("identificacionPadres.padre.relacionNinho").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("aspectosSalud").optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("aspectosSalud.enfermedadesEmbarazo").optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("aspectosSalud.antecedentesPerinatales").optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("aspectosSalud.antecedentesPostNatales").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("aspectosSalud.problemasNacimiento").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("aspectosSalud.pesoNacimiento").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("aspectosSalud.tallaNacimiento").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("aspectosSalud.lloroNacer").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("aspectosSalud.gatear").optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("aspectosSalud.gatear.gateo").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("aspectosSalud.gatear.edad").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("aspectosSalud.edadCaminar").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("aspectosSalud.familiarDiscapacidad").optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("aspectosSalud.familiarDiscapacidad.posee").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("aspectosSalud.familiarDiscapacidad.descripcion").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("aspectosSalud.enfermedadesNinho").optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("aspectosSalud.vacunasRecibidas").optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("aspectosSalud.habitosAlimenticios").optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("aspectosSalud.habitosAlimenticios.alimentos").optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("aspectosSalud.habitosAlimenticios.alimentos.comeTodo").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("aspectosSalud.habitosAlimenticios.alimentos.tipo").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("aspectosSalud.habitosAlimenticios.alergia").optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("aspectosSalud.habitosAlimenticios.alergia.posee").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("aspectosSalud.habitosAlimenticios.alergia.descripcion")
    .trim()
    .optional({
      checkFalsy: true,
      nullable: true,
    }),
  body("aspectosSalud.habitosAlimenticios.alergia.alimentos").optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("aspectosSalud.habitosAlimenticios.condicionEspecial").optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("aspectosSalud.habitosAlimenticios.condicionEspecial.posee")
    .trim()
    .optional({
      checkFalsy: true,
      nullable: true,
    }),
  body(
    "aspectosSalud.habitosAlimenticios.condicionEspecial.descripcion"
  ).optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("aspectosSalud.habitosAlimenticios.objetosRecetados").optional({
    checkFalsy: true,
    nullable: true,
  }),
  body(
    "aspectosSalud.habitosAlimenticios.objetosRecetados.zapatosOrtopedicos"
  ).optional({
    checkFalsy: true,
    nullable: true,
  }),
  body(
    "aspectosSalud.habitosAlimenticios.objetosRecetados.lentesRecetados"
  ).optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("aspectosSalud.habitosAlimenticios.objetosRecetados.otros").optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("aspectosSalud.habitosAlimenticios.tratamiento").optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("aspectosSalud.habitosAlimenticios.tratamiento.recibe").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("aspectosSalud.habitosAlimenticios.tratamiento.nombre").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("aspectosSalud.habitosAlimenticios.tratamiento.motivo").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("aspectosSalud.habitosAlimenticios.tratamiento.medico").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("aspectosSalud.habitosAlimenticios.tratamiento.especialidad")
    .trim()
    .optional({
      checkFalsy: true,
      nullable: true,
    }),
  body("aspectosSalud.habitosAlimenticios.tratamiento.fechaInicio")
    .trim()
    .optional({
      checkFalsy: true,
      nullable: true,
    }),
  body("aspectosSalud.habitosAlimenticios.asegurado").optional({
    checkFalsy: true,
    nullable: true,
  }),

  body("aspectosSalud.habitosAlimenticios.asegurado.seguro").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),

  body("aspectosSalud.habitosAlimenticios.asegurado.tipo").optional({
    checkFalsy: true,
    nullable: true,
  }),

  body("aspectosSalud.habitosAlimenticios.desarrolloLenguajeMotor").optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("aspectosSalud.habitosAlimenticios.desarrolloLenguajeMotor.edadHablo")
    .trim()
    .optional({
      checkFalsy: true,
      nullable: true,
    }),
  body("aspectosSalud.habitosAlimenticios.desarrolloLenguajeMotor.duermeBien")
    .trim()
    .optional({
      checkFalsy: true,
      nullable: true,
    }),
  body("aspectosSalud.habitosAlimenticios.desarrolloLenguajeMotor.alteraFacil")
    .trim()
    .optional({
      checkFalsy: true,
      nullable: true,
    }),
  body("aspectosSalud.habitosAlimenticios.desarrolloLenguajeMotormanoTrabajar")
    .trim()
    .optional({
      checkFalsy: true,
      nullable: true,
    }),
  body("aspectosSalud.habitosAlimenticios.necesidadesCompromiso").optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("representanteLegal").optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("representanteLegal.apellido").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("representanteLegal.nombre").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("representanteLegal.cedula").optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("representanteLegal.cedula.tipo").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("representanteLegal.cedula.numero").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("representanteLegal.fechaNacimiento").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("representanteLegal.edad").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("representanteLegal.parentesco").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("representanteLegal.lugarNacimiento").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("representanteLegal.profesion").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("representanteLegal.correo").trim().toLowerCase().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("representanteLegal.estadoCivil").trim().toUpperCase().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("representanteLegal.ingresoEconomico").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("representanteLegal.direccionHabitacion").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("representanteLegal.viveConNinho").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("representanteLegal.telefonoResidencial").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("representanteLegal.telefonoCelular").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("representanteLegal.trabajo").optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("representanteLegal.trabajo.lugar").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("representanteLegal.trabajo.telefono").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("representanteLegal.razonRepresenta").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("otrosDatos").optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("otrosDatos.actividadesIndependientes").optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("otrosDatos.personaCuidaNinhoHogar").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("otrosDatos.gustosNinho").optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("otrosDatos.gustosNinho.gustos").optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("otrosDatos.gustosNinho.horas").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("otrosDatos.retiraSoloInstitucion").optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("otrosDatos.retiraSoloInstitucion.retira").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("otrosDatos.retiraSoloInstitucion.razon").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("otrosDatos.responsableRetiro").optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("otrosDatos.responsableRetiro.nombre").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("otrosDatos.responsableRetiro.cedula").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("otrosDatos.transporteEscuela").optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("otrosDatos.transporteEscuela.medio").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("otrosDatos.transporteEscuela.via").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("otrosDatos.gradoReprobado").optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("otrosDatos.gradoReprobado.reprobado").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("otrosDatos.gradoReprobado.grado").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("otrosDatos.cumpleNormasHogar").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("otrosDatos.firmaActaCompromiso").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("controlInscripcion")
    .isArray({ min: 1 })
    .withMessage("Debe indicar los datos del control de la inscripcion")
    .optional({
      checkFalsy: true,
      nullable: true,
    }),
  body("controlInscripcion.*.grado")
    .trim()
    .isIn(["1", "2", "3", "4", "5", "6"])
    .withMessage("El grado del control de inscripcion NO es valido")
    .optional({
      checkFalsy: true,
      nullable: true,
    }),
  body("controlInscripcion.*.anhoEscolar")
    .notEmpty()
    .trim()
    .withMessage(
      "El campo del periodo escolar en el control de inscripcion NO debe estar vacio"
    )
    .bail()
    .trim()
    .isLength({ min: 5, max: 9 })
    .withMessage(
      "Periodo escolar Invalidol, ingrese un valor valido (ejemplo: 2022-2023)"
    )
    .optional({
      checkFalsy: true,
      nullable: true,
    }),
  body("controlInscripcion.*.fechaInscripcion")
    .notEmpty()
    .trim()
    .withMessage("Debe indicar la fecha de Inscripcion")
    .custom((value) => {
      let fecha = new Date(value);

      if (!(fecha !== "Invalid Date" && !isNaN(fecha))) {
        throw new Error("La fecha de nacimiento NO es una fecha válida");
      }
      return value;
    })
    .optional({
      checkFalsy: true,
      nullable: true,
    }),
  body("controlInscripcion.*.docente")
    .exists()
    .withMessage(
      "Debe existir el campo del nombre del docente en el control de inscripcion"
    )
    .optional({
      checkFalsy: true,
      nullable: true,
    }),
  body("controlInscripcion.*.docente.nombre")
    .exists()
    .trim()
    .withMessage(
      "Debe existir el campo del nombre del docente en el control de inscripcion"
    )
    .notEmpty()
    .withMessage(
      "el campo del nombre del docente en el control de inscripcion NO debe estar vacio"
    )
    .optional({
      checkFalsy: true,
      nullable: true,
    }),
  body("controlInscripcion.*.docente.apellido")
    .exists()
    .trim()
    .withMessage(
      "Debe existir el campo del apellido del docente en el control de inscripcion"
    )
    .notEmpty()
    .withMessage(
      "el campo del apellido del docente en el control de inscripcion NO debe estar vacio"
    )
    .optional({
      checkFalsy: true,
      nullable: true,
    }),
  body("actualizacionDatos.*.grado")
    .trim()
    .isIn(["1", "2", "3", "4", "5", "6"])
    .withMessage("El grado en la actualizacion de los datos NO es valido")
    .optional({
      checkFalsy: true,
      nullable: true,
    }),
  body("actualizacionDatos.*.tallaCamisa")
    .exists()
    .withMessage(
      "El campo Talla Camisa en la actualizacion de los datos debe existir"
    )
    .bail()
    .trim()
    .notEmpty() //Verificas si las tallas se puede colocar en un enum que tengan los numeros y letras de la tallas (Ejemplo: 10-12-S)
    .withMessage(
      "El campo Talla Camisa en la actualizacion de los datos NO debe estar vacío "
    )
    .optional({
      checkFalsy: true,
      nullable: true,
    }),
  body("actualizacionDatos.*.estatura")
    .exists()
    .withMessage(
      "El campo de la Estatura en la actualizacion de los datos debe existir"
    )
    .bail()
    .trim()
    .notEmpty()
    .withMessage(
      "El campo de la Estatura en la actualizacion de los datos NO debe estar vacío "
    )
    .bail()
    .isFloat({ gt: 0.49, lt: 2.01 })
    .withMessage("Ingrese una estatura valida en metros (min:0.5 y max: 2)")
    .optional({
      checkFalsy: true,
      nullable: true,
    }),
  body("actualizacionDatos.*.peso")
    .exists()
    .withMessage(
      "El campo del Peso en la actualizacion de los datos debe existir"
    )
    .bail()
    .trim()
    .notEmpty()
    .withMessage(
      "El campo del Peso en la actualizacion de los datos NO debe estar vacío "
    )
    .bail()
    .isFloat({ gt: 9, lt: 81 })
    .withMessage(
      "Ingrese un valor válido para el peso en kilogramos (min: 10 y max: 80)"
    )
    .optional({
      checkFalsy: true,
      nullable: true,
    }),

  body("actualizacionDatos.*.tallaPantalon")
    .exists()
    .withMessage(
      "El campo Talla de Pantalon en la actualizacion de los datos debe existir"
    )
    .bail()
    .trim()
    .notEmpty()
    .withMessage(
      "El campo Talla Pantalón en la actualizacion de los datos NO debe estar vacío "
    )
    .bail()
    .isFloat({ gt: 5, lt: 31 })
    .withMessage("Talla de Pantalón inválida (min: 6 y max: 30)")
    .optional({
      checkFalsy: true,
      nullable: true,
    }),
  body("actualizacionDatos.*.calzado")
    .exists()
    .withMessage(
      "El campo Calzado en la actualizacion de los datos debe existir"
    )
    .bail()
    .trim()
    .notEmpty()
    .withMessage(
      "El campo Calzado en la actualizacion de los datos NO debe estar vacío "
    )
    .bail()
    .isFloat({ gt: 9, lt: 46 })
    .withMessage(
      "Ingrese un valor numerico de Calzado válido (min:10 y máx:45)"
    )
    .optional({
      checkFalsy: true,
      nullable: true,
    }),
  body("controlRetiro").optional({
    checkFalsy: true,
    nullable: true,
  }),

  body("controlRetiro.retiro")
    .trim()
    .toBoolean()
    .isBoolean()
    .withMessage("El campo del control del retiro debe ser un boolean")
    .optional({
      checkFalsy: true,
      nullable: true,
    }),
  body("controlRetiro.fecha")
    .notEmpty()
    .trim()
    .withMessage("Debe indicar la fecha del retiro")
    .custom((value) => {
      let fecha = new Date(value);

      if (!(fecha !== "Invalid Date" && !isNaN(fecha))) {
        throw new Error("La fecha ingresada del retiro NO es una fecha válida");
      }
      return value;
    })
    .optional({
      checkFalsy: true,
      nullable: true,
    }),
  body("controlRetiro.motivo").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("controlRetiro.institutoAEstudiar").trim().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("controlRetiro.representante").notEmpty().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("controlRetiro.representante.nombre").trim().notEmpty().optional({
    checkFalsy: true,
    nullable: true,
  }),
  body("controlRetiro.representante.cedula").trim().notEmpty().optional({
    checkFalsy: true,
    nullable: true,
  }),
  ValidateExpressResult,
];

const validatorRegister = [
  body("email")
    .exists()
    .withMessage("El campo del email debe existir")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("El campo del email no debe estar vacío")
    .bail()
    .toLowerCase()
    .isEmail()
    .withMessage("El email introducido no es un formato válido")
    .normalizeEmail(),
  body("password")
    .exists()
    .withMessage("El campo de la contraseña debe existir")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("La contraseña no debe estar vacía")
    .bail()
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener minimo 6 caracteres"),
  ValidateExpressResult,
];

const validatorLogin = [
  body("email")
    .exists()
    .withMessage("El campo del email debe existir")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("El campo del email no debe estar vacío")
    .bail()
    .toLowerCase()
    .isEmail()
    .withMessage("El email introducido no es un formato válido")
    .normalizeEmail(),
  body("password")
    .exists()
    .withMessage("El campo de la contraseña debe existir")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("La contraseña no debe estar vacía"),
  ValidateExpressResult,
];
module.exports = { validatorAlumn, validatorRegister, validatorLogin };
