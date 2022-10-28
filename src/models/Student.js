const { mongoose } = require("mongoose");
const { Schema } = mongoose;

//Schema del Estudiante
const studentSchema = new Schema(
  {
    datosPersonales: {
      nombre: {
        type: String,
        require: true,
        trim: true,
      },
      apellido: {
        type: String,
        require: true,
        trim: true,
      },
      cedula: {
        tipo: {
          type: String,
          enum: ["V", "E"],
          default: "V",
        },
        numero: {
          type: String,
          unique: true,
        },
      },
      grupoSanguineo: {
        type: String,
        trim: true,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      },
      sexo: {
        type: String,
        trim: true,
        enum: ["Masculino", "Femenino"],
        default: "Masculino",
      },
      fechaNacimiento: Date,
      edad: {
        type: Number,
        min: 4,
        max: 14,
      },
      lugarNacimiento: String,
      direccionHabitacion: String,
      parroquia: String,
      municipio: String,
      pais: String,
      estadoNacimiento: String,
      telefonoResidencial: String,
      canaima: {
        posee: Boolean,
        serial: String,
      },
      correo: {
        type: String,
        lowercase: true,
      },
      nuevoIngreso: Boolean,
      institucionProcedencia: String,
      razonInscripcion: String,
      gradoCursar: {
        type: String,
        enum: ["1", "2", "3", "4", "5", "6"],
      },
      repitiente: Boolean,
      regular: Boolean,
      tallaCamisa: String,
      estatura: {
        type: Number,
        min: 0.49,
        max: 2.1,
      },
      peso: {
        type: Number,
        min: 10,
        max: 80,
      },
      tallaPantalon: {
        type: Number,
        min: 4,
        max: 30,
      },
      calzado: {
        type: Number,
        min: 10,
        max: 45,
      },
      hermanosInstitucion: {
        posee: {
          type: Boolean,
          default: false,
        },
        cantidad: {
          type: Number,
          default: 0,
        },
        gradoCursan: {
          type: [String],
          enum: ["1", "2", "3", "4", "5", "6"],
        },
      },
      personaEmergencia: {
        nombre: String,
        parentesco: String,
        telefonoResidencial: String,
        telefonoCelular: String,
      },
    },
    aspectosSociales: {
      viveNinho: {
        madre: {
          type: Boolean,
          default: false,
        },
        padre: {
          type: Boolean,
          default: false,
        },
        otros: String,
      },
      totalPersonasHogar: Number,
      hermanos: {
        cantidad: {
          type: Number,
          default: 0,
        },
        lugarOcupaNinho: String,
        descripcionRelacion: String,
      },
      otrosFamiliaresHogar: {
        viven: Boolean,
        parentesco: [String],
        descripcionRelacion: String,
      },
      personaPostClases: String,
      acompanhanteTareas: String,
      deportesPractica: [String],
      horarioPractica: String,
      talentoActitud: [String],
      beca: Boolean,
      lecturaHogar: {
        practica: Boolean,
        tipo: String,
      },
      trabajo: {
        ejerce: Boolean,
        funciones: String,
      },
    },
    identificacionPadres: {
      madre: {
        apellido: String,
        nombre: String,
        cedula: {
          tipo: {
            type: String,
            enum: ["V", "E"],
          },
          numero: String,
        },
        fechaNacimiento: Date,
        estadoCivil: String,
        edad: Number,
        lugarNacimiento: String,
        profesion: String,
        ingresoEconomico: Number,
        telefonoResidencial: String,
        telefonoCelular: String,
        trabajo: {
          lugar: String,
          telefono: String,
        },
        direccionHabitacion: String,
        enfermedadesPadecidas: [String],
        viveConNinho: Boolean,
        gradoInstruccion: String,
        vivienda: {
          tenencia: {
            type: String,
            enum: [
              "Propia",
              "Alquilada",
              "Opcion a Compra",
              "Compartida",
              "Invadida",
            ],
            default: "Propia",
          },
          tipo: {
            type: String,
            enum: ["Rancho", "Casa", "Quinta", "Apartamento"],
            default: "Casa",
          },
        },
        religion: String,
        actividades: [String],
        misionSocial: {
          posee: Boolean,
          descripcion: String,
        },
        correo: {
          type: String,
          lowercase: true,
        },
        relacionNinho: String,
      },
      padre: {
        apellido: String,
        nombre: String,
        cedula: {
          tipo: {
            type: String,
            enum: ["V", "E"],
          },
          numero: String,
        },
        fechaNacimiento: Date,
        estadoCivil: String,
        lugarNacimiento: String,
        profesion: String,
        edad: Number,
        ingresoEconomico: Number,
        telefonoResidencial: String,
        telefonoCelular: String,
        trabajo: {
          lugar: String,
          telefono: String,
        },
        enfermedadesPadecidas: [String],
        correo: {
          type: String,
          lowercase: true,
        },
        viveConNinho: Boolean,
        gradoInstruccion: String,
        relacionNinho: String,
      },
    },
    aspectosSalud: {
      enfermedadesEmbarazo: [String],
      antecedentesPerinatales: [String],
      antecedentesPostNatales: String,
      problemasNacimiento: String,
      pesoNacimiento: {
        type: Number,
        min: 0,
        max: 7,
      },
      tallaNacimiento: Number,
      lloroNacer: Boolean,
      gatear: {
        gateo: Boolean,
        edad: {
          type: Number,
          min: 5,
          max: 20,
        },
      },
      edadCaminar: Number,
      familiarDiscapacidad: {
        posee: Boolean,
        descripcion: String,
      },
      enfermedadesNinho: [String],
      vacunasRecibidas: [String],
      habitosAlimenticios: {
        alimentos: {
          comeTodo: Boolean,
          tipo: String,
        },
        alergia: {
          posee: Boolean,
          descripcion: String,
          alimentos: [String],
        },
        condicionEspecial: {
          posee: Boolean,
          descripcion: String,
        },

        objetosRecetados: {
          zapatosOrtopedicos: Boolean,
          lentesRecetados: Boolean,
          otros: {
            type: [String],
            default: "Ninguno",
          },
        },
        tratamiento: {
          recibe: Boolean,
          nombre: String,
          motivo: String,
          medico: String,
          especialidad: String,
          fechaInicio: Date,
        },
        asegurado: {
          seguro: Boolean,
          tipo: [String],
        },
        desarrolloLenguajeMotor: {
          edadHablo: Number,
          duermeBien: String,
          alteraFacil: Boolean,
          manoTrabajar: String,
        },
        necesidadesCompromiso: {
          type: [String],
        },
      },
    },
    representanteLegal: {
      apellido: String,
      nombre: String,
      cedula: {
        tipo: {
          type: String,
          enum: ["V", "E"],
        },
        numero: String,
      },
      fechaNacimiento: Date,
      edad: Number,
      parentesco: String,
      lugarNacimiento: String,
      profesion: String,
      correo: {
        type: String,
        lowercase: true,
      },
      estadoCivil: String,
      ingresoEconomico: Number,
      direccionHabitacion: String,
      viveConNinho: Boolean,
      telefonoResidencial: String,
      telefonoCelular: String,
      trabajo: {
        lugar: String,
        telefono: String,
      },
      razonRepresenta: String,
    },
    otrosDatos: {
      actividadesIndependientes: [String],
      personaCuidaNinhoHogar: String,
      gustosNinho: {
        gustos: [String],
        horas: Number,
      },

      retiraSoloInstitucion: {
        retira: Boolean,
        razon: String,
      },

      responsableRetiro: {
        nombre: String,
        cedula: String,
      },

      transporteEscuela: {
        medio: {
          type: String,
          enum: ["Privado", "Publico", "Transporte Escolar", "Caminando"],
        },

        via: String,
      },

      gradoReprobado: {
        reprobado: Boolean,
        grado: String,
      },
      cumpleNormasHogar: Boolean,
      firmaActaCompromiso: Boolean,
    },
    controlInscripcion: [
      {
        grado: {
          type: String,
          enum: ["1", "2", "3", "4", "5", "6"],
        },
        anhoEscolar: {
          type: String,
        },
        fechaInscripcion: {
          type: Date,
          default: new Date(),
        },
        docente: {
          nombre: String,
          apellido: String,
        },
      },
    ],
    actualizacionDatos: [
      {
        grado: {
          type: String,
          enum: ["1", "2", "3", "4", "5", "6"],
        },

        estatura: {
          type: Number,
          min: 0.49,
          max: 2.1,
        },

        peso: {
          type: Number,
          min: 9,
          max: 81,
        },

        calzado: {
          type: Number,
          min: 9,
          max: 46,
        },

        tallaCamisa: {
          type: String,
        },

        tallaPantalon: {
          type: Number,
          min: 4,
          max: 30,
        },
      },
    ],
    controlRetiro: {
      retiro: {
        type: Boolean,
        default: false,
      },
      fecha: {
        type: Date,
      },
      motivo: {
        type: String,
      },
      institutoAEstudiar: String,
      representante: {
        nombre: String,
        cedula: String,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

//Filtrar a los alumnos por medio de un grado y un periodo especifico
studentSchema.statics.filterGradePeriod = async function (grado, periodo) {
  let data = await this.find({
    "controlInscripcion.grado": grado,
  });

  const studentsFilter = data.filter((elem) => {
    for (let i = 0; i < elem.controlInscripcion.length; i++) {
      if (
        elem.controlInscripcion[i].anhoEscolar === periodo &&
        elem.controlInscripcion[i].grado === grado
      ) {
        return true;
      }
    }
  });

  return studentsFilter;
};

//Establecer la edad de acuerdo a la fecha de nacimiento
studentSchema.pre(["save"], function (next) {
  const fechaActual = new Date();

  if (
    fechaActual.getMonth() > this.datosPersonales.fechaNacimiento.getMonth() ||
    (fechaActual.getMonth() ===
      this.datosPersonales.fechaNacimiento.getMonth() &&
      fechaActual.getDate() > this.datosPersonales.fechaNacimiento.getDate())
  ) {
    this.datosPersonales.edad =
      fechaActual.getFullYear() -
      this.datosPersonales.fechaNacimiento.getFullYear();
    next();
  } else {
    this.datosPersonales.edad =
      fechaActual.getFullYear() -
      this.datosPersonales.fechaNacimiento.getFullYear() -
      1;
    next();
  }
});

//Obtener la edad de acuerdo a la fecha de nacimiento
studentSchema.path("datosPersonales.edad").get(function (v) {
  const fechaActual = new Date();

  if (
    fechaActual.getMonth() > this.datosPersonales.fechaNacimiento.getMonth() ||
    (fechaActual.getMonth() ===
      this.datosPersonales.fechaNacimiento.getMonth() &&
      fechaActual.getDate() > this.datosPersonales.fechaNacimiento.getDate())
  ) {
    return (
      fechaActual.getFullYear() -
      this.datosPersonales.fechaNacimiento.getFullYear()
    );
  } else {
    return (
      fechaActual.getFullYear() -
      this.datosPersonales.fechaNacimiento.getFullYear() -
      1
    );
  }
});

const Student = mongoose.model("Student", studentSchema);

module.exports = { Student };
