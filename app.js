require("dotenv").config();
const { connectDB } = require("./src/database/config.js");
const express = require("express");
const cors = require("cors");
const { router } = require("./src/routes");
const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

app.use("/api/v1", router);

app.listen(port, () => {
  console.log(
    `--- Conectado a traves de: http://localhost:${port}/api/v1/alumnos ---`
  );
});

connectDB();
