// Imports
import { Model, DataTypes } from "sequelize";
import database from "../config/database";

interface Attributes {
  id?: number;
  name: string;
  email: string;
  gamertag: string;
  password: string;
  cellphone: string;
  city: string;
  country: string;
}

class User extends Model<Attributes> implements Attributes {
  declare id?: number;
  declare name: string;
  declare email: string;
  declare gamertag: string;
  declare password: string;
  declare cellphone: string;
  declare city: string;
  declare country: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    gamertag: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cellphone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: database,
    tableName: "Users",
  }
);

export default User;
