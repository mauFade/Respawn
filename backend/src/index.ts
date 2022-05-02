// Imports
import express from "express";
import database from "./config/database";
import router from "./router";

// Consts
const app = express();
const PORT = 3003;

// Conecta ao banco de dados
database.sync().then(() => {
  console.info("Connected to the sqlite database");
});

// App uses
app.use(express.json());
app.use(express.urlencoded());
app.use(router);

// Inicia o servidor
app.listen(PORT, () => {
  console.info(`App running on port ${PORT}`);
});
