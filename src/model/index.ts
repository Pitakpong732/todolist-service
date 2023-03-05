import { DataTypes, Model } from "sequelize";
import db from "../config/database.config";

export interface TodoAttributes {
  id: string;
  title: string;
  description: string;
  icon: string;
  status: string;
}

export class TodoInstance extends Model<TodoAttributes> {}

TodoInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize:  db,
    tableName: 'todos'
  }
);
