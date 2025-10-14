import mysql from "mysql2";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, ".env") });

const connection = mysql.createPool({
  host: process.env.DB_HOST ,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD ,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT ),
  waitForConnections: true,
  connectionLimit: 5,       
  queueLimit: 0             
});


connection.getConnection((err, conn) => {
  if (!!err) {
    console.error("Error al conectar a la base de datos:", err.message);
  } else {
    console.log("Conectado a Clever Cloud MySQL!");
    conn.release();
  }
});

export default connection;
