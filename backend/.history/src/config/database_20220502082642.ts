import { Sequelize } from "sequelize";

const database = new Sequelize("respawn", "", "", {
  storage: "./src/database/dbrespawn.sqlite",
  dialect: "sqlite",
  logging: false,
});

export default database;
