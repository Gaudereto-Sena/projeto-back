import dotenv from "dotenv";
dotenv.config();
import mysql from "mysql2/promise";
import { requireSQL } from "../requireSQL";
import { configuracao } from "../connectionConfig";

async function createTables() {
  const createTablesSql = await requireSQL("createTables.sql");
  const insertInicialSql = await requireSQL("insertInicial.sql")
  const connection = await mysql.createConnection(configuracao);

  await connection.query(createTablesSql);
  await connection.query(insertInicialSql);
  console.log("As tabelas foram criadas com sucesso!");
  connection.destroy();
}

createTables();