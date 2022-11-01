const dataTest = {
  //Objeto
  datosPersonales: {
    nombre: "Vinicius", //String **OBLIGATORIO**
    apellido: "Junior", //String **OBLIGATORIO**
    //Objeto
    cedula: {
      tipo: "V", //String, solo "V" o "E" **OBLIGATORIO**
      numero: "20", //String **OBLIGATORIO**
    },
    grupoSanguineo: "B-", //String, valores permitidos: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] **OBLIGATORIO**
    sexo: "Masculino", //String, valores permitidos: ["Masculino","Femenino"] **OBLIGATORIO**
    fechaNacimiento: "11/08/1995", //Date **OBLIGATORIO**
    lugarNacimiento: "Guasdualito", //String **OBLIGATORIO**
    direccionHabitacion: "Diagonal al hospital", //String **OBLIGATORIO**
    parroquia: "Guasdualito", //String **OBLIGATORIO**
    municipio: "Paez", //String **OBLIGATORIO**
    pais: "Venezuela", //String **OBLIGATORIO**
    estadoNacimiento: "Apure", //String **OBLIGATORIO**
    telefonoResidencial: "02783324251", //String numerico **PUEDE SER OPCIONAL, pero en caso de que se pasen valores, deben corresponder a un numero de telefono valido de minimo 11 numeros**
    //Objeto
    canaima: {
      posee: false, // Boolean **OBLIGATORIO**
      serial: "", // String **OPCIONAL, EL VALOR POR DEFECTO QUE TOMA ES "N/P" que significa No Proporcionado **
    },
    correo: "hola@hola.com", // String **PUEDE SER OPCIONAL** EN CASO DE QUE SE PASEN VALORES, DEBEN CUMPLIR LAS CONDICIONES PARA SER UN CORREO VALIDO
    nuevoIngreso: true, // Boolean **OBLIGATORIO**
    institucionProcedencia: "Periquera", // String **OPCIONAL, EL VALOR POR DEFECTO QUE TOMA ES "N/P" que significa No Proporcionado **
    razonInscripcion: "La institucion queda cerca de la casa", // String **OPCIONAL, EL VALOR POR DEFECTO QUE TOMA ES "N/P" que significa No Proporcionado **
    gradoCursar: "5", // String, valores permitidos: ["1", "2", "3", "4", "5", "6"] **OBLIGATORIO**
    repitiente: false, // Boolean **OBLIGATORIO**
    regular: true, // Boolean **OBLIGATORIO**
    tallaCamisa: "10", // String **OBLIGATORIO**
    estatura: 1.9, // Number, valor mínimo: 0.5 y máximo: 2 *Medida en metros* **OBLIGATORIO**
    peso: 80, //Number, valor mínimo: 10 y máximo: 80 *Medida en kilogramo* **OBLIGATORIO**
    tallaPantalon: 6, // Number, valor mínimo: 4 y máximo: 30 **OBLIGATORIO**
    calzado: 26, // Number, valor mínimo:10 y máximo: 45 **OBLIGATORIO**
    //Objeto
    hermanosInstitucion: {
      posee: true, // Boolean **OBLIGATORIO**
      cantidad: 8, //Number, valor mínimo: 0 y máximo: 10 **OBLIGATORIO**
      gradoCursan: ["1", "3", "6"], // Array de String, valores permitidos: ["1", "2", "3", "4", "5", "6"] **OPCIONAL, como es un Array, si se pasan un valor como [""] o "" entonces seran reemplazados por un array vacio [] y se guardará como tal**
    },
    //Objeto
    personaEmergencia: {
      nombre: "Maria", //String **OBLIGATORIO**
      parentesco: "Vecina", //String **OBLIGATORIO**
      telefonoResidencial: "04247299511", //String numerico, longitud numérica minima de 11 **PUEDE SER OPCIONAL, pero en caso de que se pasen valores, deben corresponder a un numero de telefono valido de minimo 11 numeros**
      telefonoCelular: "04247299511", //String numerico, longitud numérica minima de 11 **PUEDE SER OPCIONAL, pero en caso de que se pasen valores, deben corresponder a un numero de telefono valido de minimo 11 numeros**
    },
  },
  //objeto
  aspectosSociales: {
    //Objeto
    viveNinho: {
      madre: true, // Boolean
      padre: true, // Boolean
      otros: "", // String
    },
    totalPersonasHogar: 0, // Number, valor mínimo: 0
    //Objeto
    hermanos: {
      cantidad: "0", // Number, valor mínimo 0
      lugarOcupaNinho: "Segundo", // string
      descripcionRelacion: "Buena relacion", // String
    },
    //Objeto
    otrosFamiliaresHogar: {
      viven: true, // Boolean
      parentesco: ["Prima", "Tio"], // Array de String
      descripcionRelacion: "Se llevan bien", // String
    },
    personaPostClases: "Abuela", // String
    acompanhanteTareas: "Abuela", // String
    deportesPractica: ["Futbol"], // Array de String
    horarioPractica: "2pm-4pm", // String
    talentoActitud: ["Escribir", "Dibujar", "Tocar guitarra"], //Array de String
    beca: false, // Boolean
    //Objeto
    lecturaHogar: {
      practica: true, // Boolean
      tipo: "Detectivescas", // String
    },
    //Objeto
    trabajo: {
      ejerce: false, // Boolean
      funciones: "", // String
    },
  },
  //Objeto
  identificacionPadres: {
    //Objeto
    madre: {
      apellido: "Gonzales", //String
      nombre: "Pepina", // String
      //Objeto
      cedula: {
        tipo: "V", //String, solo "V" o "E"
        numero: "20", //String
      },
      fechaNacimiento: "1970/06/24", // Date
      estadoCivil: "S", // String
      lugarNacimiento: "Guasdualito", // String
      profesion: "Ama de casa", // String
      ingresoEconomico: 500000, //Number
      telefonoResidencial: "No posee", // String
      telefonoCelular: "04269852364", // String
      //Objeto
      trabajo: {
        lugar: "Ferreteria PZL", // String
        telefono: "02783215698", // String
      },
      direccionHabitacion: "Barrio Morrones Diagonal al triangulo", // String
      enfermedadesPadecidas: ["Covid", "Chikunguya"], //Array de String
      viveConNinho: true, //Boolean
      gradoInstruccion: "Bachiller", // String
      //Objeto
      vivienda: {
        tenencia: "Propia", // String, valores permitidos: ["Propia","Alquilada","Opcion a Compra","Compartida","Invadida"]
        tipo: "Casa", // String, valores permitidos:  ["Rancho","Casa","Quinta","Apartamento]
      },
      religion: "Catolica", // String
      actividades: ["Ayudar a los necesitados", "Cantar en el coro"], // Array de String
      //Objeto
      misionSocial: {
        posee: false, // Boolean
        descripcion: "", // String
      },
      correo: "mom@mom.com", // String
      relacionNinho: "Amorosa y carinhosa", // String
    },
    padre: {
      apellido: "Perez Blanco", // String
      nombre: "Juan", // String
      //Objeto
      cedula: {
        tipo: "V", //String, solo "V" o "E"
        numero: "20", //String
      },
      fechaNacimiento: "1972/05/01", // Date
      estadoCivil: "S", // String
      lugarNacimiento: "El Amparo", // String
      profesion: "Electricista", // String
      ingresoEconomico: 2500000, // Number
      telefonoResidencial: null, // String
      telefonoCelular: "04248523645", // String
      //Objeto
      trabajo: {
        lugar: "Electrica GNP", // String
        telefono: "02765214785", // String
      },
      enfermedadesPadecidas: ["Covid", "Chikunguya"], //Array de String
      coreo: "juan@elec.com", // String
      viveConNinho: true, // Boolean
      gradoInstruccion: "Universitario", // String
      relacionNinho: "Maravillosa", // String
    },
  },
  //Objeto
  aspectosSalud: {
    enfermedadesEmbarazo: ["Hipertension", "Toxoplasmosis"], // Array de String
    antecedentesPerinatales: ["Normal", "A termino"], // Array de String
    antecedentesPostNatales: "Sin informacion", // String
    problemasNacimiento: "Sin problemas", // String
    pesoNacimiento: 2.7, // Number, *Medida en kilogramo*
    tallaNacimiento: 40, // Number
    lloroNacer: true, // Boolean
    //Objeto
    gatear: {
      gateo: true, // Boolean
      edad: 8, // Number, valores *Medida en meses*
    },
    edadCaminar: 1, // Number
    //Objeto
    familiarDiscapacidad: {
      posee: false, // Boolean
      descripcion: "", // String
    },
    enfermedadesNinho: ["Lechina", "Sarampion"], //Array de String
    vacunasRecibidas: ["Meninguitis", "Hepatitis B", "Covid"], // Array de string
    //Objeto
    habitosAlimenticios: {
      //Objeto
      alimentos: {
        comeTodo: true,
        tipo: "", //String
      },
      //Objeto
      alergia: {
        posee: true, // Boolean
        descripcion: "Alergia al polvo y la humedad", // String
        alimentos: "Babo y la soya", // String
      },

      condicionEspecial: "Posee TDA", //String
      //Objeto
      objetosRecetados: {
        zapatosOrtopedicos: false, // Boolean
        lentesRecetados: true, // Boolean
        otros: "Silla de ruedas y pastillas", // String
      },
      //Objeto
      tratamiento: {
        recibe: false, // Boolean
        nombre: "", // String
        motivo: "", // String
        medico: "", // String
        especialidad: "", // String
        fechaInicio: "", // Date
      },
      //Objeto
      asegurado: {
        seguro: true, // Boolean
        tipo: ["PRIVADO", "IPASME"], // Array de String
      },
      //Objeto
      desarrolloLenguajeMotor: {
        edadHablo: 1, // Number
        duermeBien: "Perfectamente", // String
        alteraFacil: false, // Boolean
        manoTrabajar: "Derecha", // String
      },
      necesidadesCompromiso: ["Visual", "Auditivas"], // Array de String
    },
  },
  //Objeto
  representanteLegal: {
    apellido: "Lucho", // String
    nombre: "Suarez", // String
    //Objeto
    cedula: {
      tipo: "V", //String, solo "V" o "E"
      numero: "20", //String
    },
    fechaNacimiento: "04/04/1988", // Date
    edad: 34, // Number
    parentesco: "Tio", // String
    lugarNacimiento: "Merida", // String
    profesion: "Escritor", // String
    correo: "hola1@hola.com", // String
    estadoCivil: "S", // String
    ingresoEconomico: 20000000, // Number
    direccionHabitacion: "Frente a la plaza los Querubines", // String
    viveConNinho: true, // Boolean
    telefonoResidencial: "02782136547", // String
    telefonoCelular: "04243698521", // String
    //Objeto
    trabajo: {
      lugar: "Editorial Cambri", // String
      telefono: "0265258964", // String
    },
    razonRepresenta: "Porque quiero", // String
  },
  //Objeto
  otrosDatos: {
    actividadesIndependientes: [
      "Comer",
      "Expresarse oralmente",
      "Ir al baño",
      "Vestirse",
    ], //Array de String
    personaCuidaNinhoHogar: "Abuela", // String
    //Objeto
    gustosNinho: {
      gustos: ["Computadora", " Ver Television", "Telefono"], // Array de String
      horas: 3, // Number
    },
    //Objeto
    retiraSoloInstitucion: {
      retira: false, // Boolean
      razon: "", // String
    },
    //Objeto
    responsableRetiro: {
      nombre: "Condorito", // String
      cedula: "14523698", // String
    },
    //Objeto
    transporteEscuela: {
      medio: "Caminando", // String, valores permitidos: ["Privado", "Publico", "Transporte Escolar", "Caminando"]
      via: "Av. Estudiante", // String
    },
    //Objeto
    gradoReprobado: {
      reprobado: false, // Boolean
      grado: "", // String
    },
    cumpleNormasHogar: true, // Boolean
    firmaActaCompromiso: true, // Boolean
  },
  //Array de Objetos
  controlInscripcion: [
    {
      grado: "3", // String, valores permitidos: ["1", "2", "3", "4", "5", "6"] **OBLIGATORIO**
      anhoEscolar: "2023-2024", // String **OBLIGATORIO, DEBE SER EN ESE FORMATO EL STRING**
      fechaInscripcion: "2023/09/16", // Date **OBLIGATORIO**
      //Objeto
      docente: {
        nombre: "Petra", // String **OBLIGATORIO**
        apellido: "Perez", // String **OBLIGATORIO**
      },
    },
  ],
  //Array de Objetos
  //EN PRIMERA INSTANCIA ES OPCIONAL, PERO SE PUEDE CONSIDERAR COLOCARLO OBLIGATORIO**
  actualizacionDatos: [
    {
      grado: "6", // String, valores permitidos: ["1", "2", "3", "4", "5", "6"]
      estatura: 1.3, // Number, valor mínimo: 0.5 y máximo: 2 *Medida en metros*
      peso: 25, // Number, valor mínimo: 10 y máximo: 80 *Medida en kilogramo*
      calzado: 26, // Number, valor mínimo:10 y máximo: 45
      tallaCamisa: "10", // String
      tallaPantalon: 8, // Number, valor mínimo: 4 y máximo: 30
    },
  ],
  //Objeto
  //EN PRIMERA INSTANCIA, AL MOMENTO DE INSCRIPCION, ES OPCIONAL, PORQUE NO SE VA A INSCRIBIR A ALGUIEN Y RETIRARLO DE UNA VEZ**
  controlRetiro: {
    retiro: true, // Boolean
    fecha: "04-11-2023", // Date
    motivo: "El niño no se sentia comodo", // String
    institutoAEstudiar: "Escuela Julio de Armas", // String
    //Objeto
    representante: {
      nombre: "Petronila", // String
      apellido: "Pomposa", // String
    },
  },
};

module.exports = { dataTest };
