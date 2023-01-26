const { faker } = require("@faker-js/faker/locale/es_MX");
const fs = require("fs");

const generarData = () => {
  let dataTest = {
    //Objeto
    datosPersonales: {
      nombre: faker.name.firstName(), //String
      apellido: faker.name.lastName(), //String
      //Objeto
      cedula: {
        tipo: faker.helpers.arrayElement(["V", "E"]), //String, solo "V" o "E"
        numero: `${faker.datatype.number({ min: 30000000, max: 40000000 })}`, //String
      },
      grupoSanguineo: faker.helpers.arrayElement([
        "A+",
        "A-",
        "B+",
        "B-",
        "AB+",
        "AB-",
        "O+",
        "O-",
      ]), //String, valores permitidos: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
      sexo: faker.helpers.arrayElement(["Masculino", "Femenino"]), //String, valores permitidos: ["Masculino","Femenino"]
      fechaNacimiento: faker.date.birthdate({ min: 5, max: 13, mode: "age" }), //faker.date.between("2010-01-01", "2018-01-01"), //Date
      lugarNacimiento: faker.address.city(), //String
      direccionHabitacion: faker.address.streetAddress(true), //String
      parroquia: faker.address.city(), //String
      municipio: faker.address.city(), //String
      pais: faker.address.country(), //String
      estadoNacimiento: faker.address.state(), //String
      telefonoResidencial: `${faker.helpers.arrayElement([
        "0424",
        "0414",
        "0276",
        "0412",
        "0416",
        "0426",
        "0278",
      ])}${faker.phone.number("#######")}`, //String
      //Objeto
      canaima: {
        posee: faker.datatype.boolean(), // Boolean
        serial: faker.datatype.uuid(), // String
      },
      correo: faker.internet.exampleEmail(), // String
      nuevoIngreso: faker.datatype.boolean(), // Boolean
      institucionProcedencia: faker.lorem.sentence(3), // String
      razonInscripcion: faker.lorem.sentence(5), // String
      gradoCursar: faker.helpers.arrayElement(["1", "2", "3", "4", "5", "6"]), // String, valores permitidos: ["1", "2", "3", "4", "5", "6"]
      repitiente: faker.datatype.boolean(), // Boolean
      regular: faker.datatype.boolean(), // Boolean
      tallaCamisa: faker.helpers.arrayElement([
        "8",
        "10",
        "12",
        "14",
        "16",
        "S",
      ]), // String
      estatura: faker.datatype.float({ min: 0.5, max: 2, precision: 0.01 }), // Number, valor mínimo: 0.5 y máximo: 2 *Medida en metros*
      peso: faker.datatype.float({ min: 10, max: 80, precision: 0.1 }), //Number, valor mínimo: 10 y máximo: 80 *Medida en kilogramo*
      tallaPantalon: faker.datatype.number({
        min: 4,
        max: 30,
        precision: 1,
      }), // Number, valor mínimo: 4 y máximo: 30
      calzado: faker.datatype.number({
        min: 10,
        max: 45,
      }), // Number, valor mínimo:10 y máximo: 45
      //Objeto
      hermanosInstitucion: {
        posee: faker.datatype.boolean(), // Boolean
        cantidad: faker.datatype.number({
          min: 0,
          max: 10,
        }), //Number, valor mínimo: 0 y máximo: 10
        gradoCursan: faker.helpers.arrayElement([
          faker.helpers.arrayElements(
            ["1", "2", "3", "4", "5", "6"],
            faker.datatype.number({ min: 1, max: 6 })
          ),
          [],
        ]), // Array de String, valores permitidos: ["1", "2", "3", "4", "5", "6",[]]
      },
      //Objeto
      personaEmergencia: {
        nombre: faker.name.fullName(), //String
        parentesco: faker.helpers.arrayElement([
          "Vecin@",
          "Ti@",
          "Ti@",
          "Herman@",
          "Abuel@",
          "Prim@",
          "Amig@",
        ]), //String
        telefonoResidencial: `${faker.helpers.arrayElement([
          "0424",
          "0414",
          "0276",
          "0412",
          "0416",
          "0426",
          "0278",
        ])}${faker.phone.number("#######")}`, //Numerico, longitud numérica minima de 11
        telefonoCelular: `${faker.helpers.arrayElement([
          "0424",
          "0414",
          "0276",
          "0412",
          "0416",
          "0426",
          "0278",
        ])}${faker.phone.number("#######")}`, //Numerico, longitud numérica minima de 11
      },
    },
    //objeto
    aspectosSociales: {
      //Objeto
      viveNinho: {
        madre: faker.datatype.boolean(), // Boolean
        padre: faker.datatype.boolean(), // Boolean
        otros: faker.helpers.arrayElement([
          "Vecin@",
          "Ti@",
          "Ti@",
          "Herman@",
          "Abuel@",
          "Prim@",
          "Amig@",
          "",
        ]), // String
      },
      totalPersonasHogar: faker.datatype.number({ min: 0, max: 10 }), // Number, valor mínimo: 0
      //Objeto
      hermanos: {
        cantidad: faker.datatype.number({ min: 0, max: 10 }), // Number, valor mínimo: 0
        lugarOcupaNinho: faker.lorem.word(), // string
        descripcionRelacion: faker.lorem.sentence(3), // String
      },
      //Objeto
      otrosFamiliaresHogar: {
        viven: true, // Boolean
        parentesco: faker.helpers.arrayElement([
          faker.helpers.arrayElements(
            ["Vecin@", "Ti@", "Ti@", "Herman@", "Abuel@", "Prim@", "Amig@"],
            faker.datatype.number({ min: 1, max: 7 })
          ),
          [],
        ]), // Array de String
        descripcionRelacion: faker.lorem.sentence(5), // String
      },
      personaPostClases: faker.helpers.arrayElement([
        "Vecin@",
        "Ti@",
        "Ti@",
        "Herman@",
        "Abuel@",
        "Prim@",
        "Amig@",
      ]), // String
      acompanhanteTareas: faker.helpers.arrayElement([
        "Vecin@",
        "Ti@",
        "Ti@",
        "Herman@",
        "Abuel@",
        "Prim@",
        "Amig@",
      ]), // String
      deportesPractica: faker.helpers.arrayElement([
        faker.helpers.arrayElements(
          ["Futbol", "Beisbol", "Basquet", "Danza", "Atletismo"],
          faker.datatype.number({ min: 1, max: 5 })
        ),
        [],
      ]), // Array de String
      horarioPractica: faker.helpers.arrayElement([
        "2pm-4pm",
        "2pm-5pm",
        "10am-12pm",
        "9am-11am",
        "3pm-5pm",
      ]), // String
      talentoActitud: faker.helpers.arrayElement([
        faker.helpers.arrayElements(
          ["Escribir", "Dibujar", "Tocar guitarra", "Bailar", "Cantar"],
          faker.datatype.number({ min: 1, max: 5 })
        ),
        [],
      ]), //Array de String
      beca: faker.datatype.boolean(), // Boolean
      //Objeto
      lecturaHogar: {
        practica: faker.datatype.boolean(), // Boolean
        tipo: faker.lorem.sentence(3), // String
      },
      //Objeto
      trabajo: {
        ejerce: faker.datatype.boolean(), // Boolean
        funciones: faker.lorem.sentence(3), // String
      },
    },
    //Objeto
    identificacionPadres: {
      //bjeto
      madre: {
        apellido: faker.name.lastName("female"), //String
        nombre: faker.name.firstName("female"), // String
        //Objeto
        cedula: {
          tipo: faker.helpers.arrayElement(["V", "E"]), //String, solo "V" o "E"
          numero: `${faker.datatype.number({ min: 30000000, max: 40000000 })}`, //String
        },
        fechaNacimiento: faker.date.birthdate({
          min: 18,
          max: 50,
          mode: "age",
        }), // Date
        estadoCivil: faker.helpers.arrayElement(["S", "C", "D", "Otro"]), // String
        edad: faker.datatype.number({ min: 20, max: 50 }),
        lugarNacimiento: faker.address.city(), // String
        profesion: faker.name.jobTitle(), // String
        ingresoEconomico: faker.datatype.number({ min: 0, max: 20000000 }), //Number
        telefonoResidencial: `${faker.helpers.arrayElement([
          "0424",
          "0414",
          "0276",
          "0412",
          "0416",
          "0426",
          "0278",
        ])}${faker.phone.number("#######")}`, // String
        telefonoCelular: `${faker.helpers.arrayElement([
          "0424",
          "0414",
          "0276",
          "0412",
          "0416",
          "0426",
          "0278",
        ])}${faker.phone.number("#######")}`, // String
        //Objeto
        trabajo: {
          lugar: faker.company.name(), // String
          telefono: `${faker.helpers.arrayElement([
            "0424",
            "0414",
            "0276",
            "0412",
            "0416",
            "0426",
            "0278",
          ])}${faker.phone.number("#######")}`, // String
        },
        direccionHabitacion: faker.address.streetAddress(true), // String
        enfermedadesPadecidas: faker.helpers.arrayElement([
          faker.helpers.arrayElements(
            ["Covid", "Chikungunya", "Neumonia", "Fiebre", "Otro"],
            faker.datatype.number({ min: 1, max: 5 })
          ),
          [],
        ]), //Array de String
        viveConNinho: faker.datatype.boolean(), //Boolean
        gradoInstruccion: faker.helpers.arrayElement([
          "Primaria",
          "Bachiller",
          "Universitario",
          "Otro",
        ]), // String
        //Objeto
        vivienda: {
          tenencia: faker.helpers.arrayElement([
            "Propia",
            "Alquilada",
            "Opcion a Compra",
            "Compartida",
            "Invadida",
          ]), // String, valores permitidos: ["Propia","Alquilada","Opcion a Compra","Compartida","Invadida"]
          tipo: faker.helpers.arrayElement([
            "Rancho",
            "Casa",
            "Quinta",
            "Apartamento",
          ]), // String, valores permitidos:  ["Rancho","Casa","Quinta","Apartamento"]
        },
        religion: faker.lorem.word(), // String
        actividades: faker.helpers.arrayElement([
          faker.helpers.arrayElements(
            [
              "Actividad 1",
              "Actividad 2",
              "Actividad 3",
              "Actividad 4",
              "Otros",
            ],
            faker.datatype.number({ min: 1, max: 5 })
          ),
          [],
        ]), // Array de String
        //Objeto
        misionSocial: {
          posee: faker.datatype.boolean(), // Boolean
          descripcion: faker.lorem.sentence(5), // String
        },
        correo: faker.internet.exampleEmail(), // String
        relacionNinho: faker.lorem.sentence(4), // String
      },
      padre: {
        apellido: faker.name.lastName("male"), // String
        nombre: faker.name.firstName("male"), // String
        //Objeto
        cedula: {
          tipo: faker.helpers.arrayElement(["V", "E"]), //String, solo "V" o "E"
          numero: `${faker.datatype.number({ min: 30000000, max: 40000000 })}`, //String
        },
        fechaNacimiento: faker.date.birthdate({
          min: 18,
          max: 50,
          mode: "age",
        }), // Date
        estadoCivil: faker.helpers.arrayElement(["S", "C", "D", "Otro"]), // String
        lugarNacimiento: faker.address.city(), // String
        profesion: faker.name.jobTitle(), // String
        edad: faker.datatype.number({ min: 20, max: 50 }), //Number
        ingresoEconomico: faker.datatype.number({ min: 0, max: 20000000 }), // Number
        telefonoResidencial: `${faker.helpers.arrayElement([
          "0424",
          "0414",
          "0276",
          "0412",
          "0416",
          "0426",
          "0278",
        ])}${faker.phone.number("#######")}`, // String
        telefonoCelular: `${faker.helpers.arrayElement([
          "0424",
          "0414",
          "0276",
          "0412",
          "0416",
          "0426",
          "0278",
        ])}${faker.phone.number("#######")}`, // String
        //Objeto
        trabajo: {
          lugar: faker.company.name(), // String
          telefono: `${faker.helpers.arrayElement([
            "0424",
            "0414",
            "0276",
            "0412",
            "0416",
            "0426",
            "0278",
          ])}${faker.phone.number("#######")}`, // String
        },
        enfermedadesPadecidas: faker.helpers.arrayElement([
          faker.helpers.arrayElements(
            ["Covid", "Chikungunya", "Neumonia", "Fiebre", "Otro"],
            faker.datatype.number({ min: 1, max: 5 })
          ),
          [],
        ]), //Array de String
        correo: faker.internet.exampleEmail(), // String
        viveConNinho: faker.datatype.boolean(), // Boolean
        gradoInstruccion: faker.helpers.arrayElement([
          "Primaria",
          "Bachiller",
          "Universitario",
          "Otro",
        ]), // String
        relacionNinho: faker.lorem.sentence(4), // String
      },
    },
    //Objeto
    aspectosSalud: {
      enfermedadesEmbarazo: faker.helpers.arrayElement([
        faker.helpers.arrayElements(
          ["Rubeola", "Anemia", "Toxoplasmosis", "Hipertension", "Otro"],
          faker.datatype.number({ min: 1, max: 5 })
        ),
        [],
      ]), // Array de String
      antecedentesPerinatales: faker.helpers.arrayElements(
        ["Normal", "Cesarea", "Prematuro", "Forceps", "A termino"],
        faker.datatype.number({ min: 1, max: 5 })
      ), // Array de String
      antecedentesPostNatales: faker.lorem.sentence(3), // String
      problemasNacimiento: faker.lorem.sentence(3), // String
      pesoNacimiento: faker.datatype.float({ min: 0, max: 7, precision: 0.1 }), // Number, *Medida en kilogramo minimo:0 maximo 7*
      tallaNacimiento: faker.datatype.number({
        min: 0,
        max: 60,
      }), // Number
      lloroNacer: faker.datatype.boolean(), // Boolean
      //Objeto
      gatear: {
        gateo: faker.datatype.boolean(), // Boolean
        edad: faker.datatype.number({ min: 5, max: 20 }), // Number, valores *Medida en meses*
      },
      edadCaminar: faker.datatype.number({ min: 8, max: 24 }), // Number *Medida en meses*
      //Objeto
      familiarDiscapacidad: {
        posee: faker.datatype.boolean(), // Boolean
        descripcion: faker.lorem.sentence(5), // String
      },
      enfermedadesNinho: faker.helpers.arrayElement([
        faker.helpers.arrayElements(
          ["Lechina", "Sarampion", "Meninguitis", "Parotiditis", "Otras"],
          faker.datatype.number({ min: 1, max: 5 })
        ),
        [],
      ]), //Array de String
      vacunasRecibidas: faker.helpers.arrayElement([
        faker.helpers.arrayElements(
          ["Lechina", "Sarampion", "Meninguitis", "Parotiditis", "Otras"],
          faker.datatype.number({ min: 1, max: 5 })
        ),
        [],
      ]), // Array de string
      //Objeto
      habitosAlimenticios: {
        //Objeto
        alimentos: {
          comeTodo: faker.datatype.boolean(),
          tipo: faker.lorem.sentence(5), //String
        },
        //Objeto
        alergia: {
          posee: faker.datatype.boolean(), // Boolean
          descripcion: faker.lorem.sentence(5), // String
          alimentos: faker.helpers.arrayElement([faker.lorem.words(3), ""]), // String
        },

        condicionEspecial: faker.helpers.arrayElement([
          faker.lorem.words(3),
          "",
        ]), //String

        //Objeto
        objetosRecetados: {
          zapatosOrtopedicos: faker.datatype.boolean(), // Boolean
          lentesRecetados: faker.datatype.boolean(), // Boolean
          otros: faker.helpers.arrayElement([faker.lorem.words(3), ""]), // Array de String
        },
        //Objeto
        tratamiento: {
          recibe: faker.datatype.boolean(), // Boolean
          nombre: faker.lorem.sentence(5), // String
          motivo: faker.lorem.sentence(5), // String
          medico: faker.name.fullName(), // String
          especialidad: faker.lorem.sentence(3), // String
          fechaInicio: faker.date.past(10), // Date
        },
        //Objeto
        asegurado: {
          seguro: faker.datatype.boolean(), // Boolean
          tipo: faker.helpers.arrayElement([
            faker.helpers.arrayElements(
              ["IPASME", "PRIVADO", "IPSFA", "S.S.O", "Otros"],
              faker.datatype.number({ min: 1, max: 5 })
            ),
            [],
          ]), // Array de String
        },
        //Objeto
        desarrolloLenguajeMotor: {
          edadHablo: faker.datatype.number({ min: 5, max: 24 }), // Number *Medida en meses*
          duermeBien: faker.lorem.sentence(3), // String
          alteraFacil: faker.datatype.boolean(), // Boolean
          manoTrabajar: faker.helpers.arrayElement(["Derecha", "Izquierda"]), // String
        },
        necesidadesCompromiso: faker.helpers.arrayElement([
          faker.helpers.arrayElements(
            [
              "Visual",
              "Auditiva",
              "Psicomotor",
              "Atencion",
              "Lenguaje",
              "Cognitivo",
              "Otros",
            ],
            faker.datatype.number({ min: 1, max: 7 })
          ),
          [],
        ]), // Array de String
      },
    },
    //Objeto
    representanteLegal: {
      apellido: faker.name.lastName(), // String
      nombre: faker.name.firstName(), // String
      //Objeto
      cedula: {
        tipo: faker.helpers.arrayElement(["V", "E"]), //String, solo "V" o "E"
        numero: `${faker.datatype.number({ min: 30000000, max: 40000000 })}`, //String
      },
      fechaNacimiento: faker.date.birthdate({ min: 18, max: 60, mode: "age" }), // Date
      edad: faker.datatype.number({ min: 18, max: 60 }), // Number
      parentesco: faker.helpers.arrayElement([
        "Vecin@",
        "Ti@",
        "Ti@",
        "Herman@",
        "Abuel@",
        "Prim@",
        "Amig@",
      ]), //String
      lugarNacimiento: faker.address.city(), // String
      profesion: faker.name.jobTitle(), // String
      correo: faker.internet.exampleEmail(), // String
      estadoCivil: faker.helpers.arrayElement(["S", "C", "D", "Otro"]), // String
      ingresoEconomico: faker.datatype.number({ min: 0, max: 20000000 }), // Number
      direccionHabitacion: faker.address.streetAddress(true), // String
      viveConNinho: faker.datatype.boolean(), // Boolean
      telefonoResidencial: `${faker.helpers.arrayElement([
        "0424",
        "0414",
        "0276",
        "0412",
        "0416",
        "0426",
        "0278",
      ])}${faker.phone.number("#######")}`, // String
      telefonoCelular: `${faker.helpers.arrayElement([
        "0424",
        "0414",
        "0276",
        "0412",
        "0416",
        "0426",
        "0278",
      ])}${faker.phone.number("#######")}`, // String
      //Objeto
      trabajo: {
        lugar: faker.company.name(), // String
        telefono: `${faker.helpers.arrayElement([
          "0424",
          "0414",
          "0276",
          "0412",
          "0416",
          "0426",
          "0278",
        ])}${faker.phone.number("#######")}`, // String
      },
      razonRepresenta: faker.lorem.sentence(5), // String
    },
    //Objeto
    otrosDatos: {
      actividadesIndependientes: faker.helpers.arrayElements(
        [
          "Ir al baño",
          "Bañarse",
          "Comer",
          "Vestirse",
          "Expresarse oralmente",
          "Hacer tareas",
        ],
        6
      ), //Array de String
      personaCuidaNinhoHogar: faker.helpers.arrayElement([
        "Vecin@",
        "Ti@",
        "Ti@",
        "Herman@",
        "Abuel@",
        "Prim@",
        "Amig@",
      ]), // String
      //Objeto
      gustosNinho: {
        gustos: faker.helpers.arrayElements(
          [
            "Jugar con sus padres",
            "Ver television",
            "Jugar con amigos",
            "Jugar con los hermanos",
            "Mascotas",
            "Computadora",
            "DS, Wii, MP",
            "Celular",
          ],
          8
        ), // Array de String
        horas: faker.datatype.number({ min: 1, max: 12 }), // Number
      },
      //Objeto
      retiraSoloInstitucion: {
        retira: faker.datatype.boolean(), // Boolean
        razon: faker.lorem.sentence(5), // String
      },
      //Objeto
      responsableRetiro: {
        nombre: faker.name.fullName(), // String
        cedula: `${faker.datatype.number({ min: 30000000, max: 40000000 })}`, // String
      },
      //Objeto
      transporteEscuela: {
        medio: faker.helpers.arrayElement([
          "Privado",
          "Publico",
          "Transporte Escolar",
          "Caminando",
        ]), // String, valores permitidos: ["Privado", "Publico", "Transporte Escolar", "Caminando"]
        via: faker.lorem.sentence(3), // String
      },
      //Objeto
      gradoReprobado: {
        reprobado: faker.datatype.boolean(), // Boolean
        grado: faker.helpers.arrayElement(["1", "2", "3", "4", "5", "6"]), // String
      },
      cumpleNormasHogar: faker.datatype.boolean(), // Boolean
      firmaActaCompromiso: faker.datatype.boolean(), // Boolean
    },
    //Array de Objetos
    controlInscripcion: [
      {
        grado: faker.helpers.arrayElement(["1", "2", "3", "4", "5", "6"]), // String, valores permitidos: ["1", "2", "3", "4", "5", "6"]
        anhoEscolar: faker.helpers.arrayElement(["2022-2023"]), // String
        fechaInscripcion: "2022/09/16", // Date
        //Objeto
        docente: {
          nombre: faker.name.firstName(), // String
          apellido: faker.name.lastName(), // String
        },
      },
    ],
    //Array de Objetos
    actualizacionDatos: [
      {
        grado: faker.helpers.arrayElement(["1", "2", "3", "4", "5", "6"]), // String, valores permitidos: ["1", "2", "3", "4", "5", "6"]
        estatura: faker.datatype.float({ min: 0.5, max: 2, precision: 0.01 }), // Number, valor mínimo: 0.5 y máximo: 2 *Medida en metros*
        peso: faker.datatype.float({ min: 10, max: 80, precision: 0.1 }), // Number, valor mínimo: 10 y máximo: 80 *Medida en kilogramo*
        calzado: faker.datatype.number({
          min: 10,
          max: 45,
        }), // Number, valor mínimo:10 y máximo: 45
        tallaCamisa: faker.helpers.arrayElement([
          "8",
          "10",
          "12",
          "14",
          "16",
          "S",
        ]), // String
        tallaPantalon: faker.datatype.number({
          min: 4,
          max: 30,
          precision: 2,
        }), // Number, valor mínimo: 4 y máximo: 30
      },
    ],
    //Objeto
    controlRetiro: {
      retiro: faker.datatype.boolean(), // Boolean
      fecha: faker.date.recent(10), // Date
      motivo: faker.lorem.sentence(5), // String
      institutoAEstudiar: faker.lorem.sentence(5), // String
      //Objeto
      representante: {
        nombre: faker.name.fullName(), // String
        cedula: `${faker.datatype.number({ min: 30000000, max: 40000000 })}`, // String
      },
    },
  };

  return dataTest;
};

//Genera un archivo .txt con un objeto JSON de los datos de un estudiante
/*fs.writeFile("fakeData.txt", JSON.stringify(generarData()), (err) => {
  if (err) {
    console.error(err);
    return;
  }
});*/

module.exports = { generarData };
