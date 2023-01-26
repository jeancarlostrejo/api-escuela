const { mongoose } = require("mongoose");

//Conexion a la base de datos de Mongo
const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.DB_URI || "mongodb://127.0.0.1:27017/testDB"
    );
    console.log("*****CONECTADO CORRECTAMENTE A LA BASE DE DATOS*****");
  } catch (error) {
    console.log("*****ERROR AL CONECTAR A LA BASE DE DATOS****");
  }
};

module.exports = { connectDB };
