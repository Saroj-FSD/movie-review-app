import dotenv from "dotenv";

dotenv.config();

import mysql, { ConnectionOptions } from "mysql2";
import {readFileSync} from 'fs'

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = Number(process.env.DB_PORT);
const database = process.env.DB_DATABASE;

console.log(
  "Env variables loaded from .env file",
  user,
  password,
  host,
  port,
  database
);
// yo chai garna hunna

const access: ConnectionOptions = {
  user: user,
  password: password,
  host: host,
  port: port,
  database: database,
};

const conn = mysql.createConnection(access);

console.log("process cwd",process.cwd());
const file = readFileSync(`${process.cwd()}/src/migration/review-table.sql`);

const fileContent = file.toString();
// buffer laii string ma convert garxa.
console.log("file content", fileContent);

conn.query(fileContent, (err, result) => {
  if (err) {
    console.error("failed to run the command", err);
  } else {
    console.log("result", result);
  }
});