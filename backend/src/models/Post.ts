import { Model, DataTypes, Association } from "sequelize";
import database from "../config/database";
import User from "./User";

interface Attributes {
  id?: number;
  name: string;
  description: string;
  specificGame?: string;
  likesCount?: number;
  user_id?: number;
}

class Post extends Model<Attributes> implements Attributes {
  declare id?: number;
  declare name: string;
  declare description: string;
  declare specificGame?: string;
  declare likesCount?: number;
  declare user_id?: number;

  declare static associations: {
    user: Association<Post, User>;
  };
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    specificGame: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "General Type",
    },
    likesCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: database,
    tableName: "Posts",
  }
);

export default Post;
