import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { specs } from "./utils/swagger.js";
import taskRoutes from './routes/tasks.routes.js';
import { connectDb } from "./utils/database.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/tasks', taskRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

await connectDb();

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
