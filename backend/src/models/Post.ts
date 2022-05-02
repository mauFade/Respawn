import { Model, DataTypes } from "sequelize";
import database from "../config/database";

interface Attributes {
  id?: number;
  name: string;
  description: string;
  specificGame?: string;
  likesCount?: number;
}

class Post extends Model<Attributes> implements Attributes {
  declare id?: number;
  declare name: string;
  declare description: string;
  declare specificGame?: string;
  declare likesCount?: number;
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
  },
  {
    sequelize: database,
    tableName: "Posts",
  }
);

export default Post;
