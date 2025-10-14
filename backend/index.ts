import express from "express";
import cors from "cors";
import productsRoutes from "./routes/products";
import usersRoutes from "./routes/users";
import ordersRoutes from "./routes/orders";
import orderItemsRoutes from "./routes/orderItems";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("Current working directory:", process.cwd());
console.log("Resolved .env path:", path.resolve(__dirname, ".env"));

dotenv.config({ path: path.resolve(__dirname, ".env") });

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use("/products", productsRoutes);
app.use("/", usersRoutes);
app.use("/orders", ordersRoutes);
app.use("/order-items", orderItemsRoutes);

app.listen(PORT, () => {
    console.log("Servidor backend corriendo en http://localhost:3001");
});
