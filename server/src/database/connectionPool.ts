import mysql from "mysql2/promise";
import { configuracao } from "./connectionConfig";

const connectionLimit = 10;

export const databasePool = mysql.createPool({
  ...configuracao,
  connectionLimit,
});