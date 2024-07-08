import express from "express";
import connectDB from "./db/connect.js"
import todoRoutes from "./routes/todoRoutes.js"
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/error.js";
import notFound from "./middleware/notFound.js";
import session from "express-session";
import userRoutes from "./routes/userRoutes.js"
import cookieParser from "cookie-parser";
import cors from 'cors'

const app = express();
const port = process.env.PORT;
connectDB();
app.use(cors({
  origin: 'https://mern-todo-kanban-vraf.vercel.app',
  credentials: true,
  methods: ['DELETE', 'PUT', 'GET', 'POST'],
}))

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// logger middleware
app.use(logger);

// cookie parser middleware
app.use(cookieParser())

// Routes
app.use("/users", userRoutes)
app.use("/todos", todoRoutes)

// Error handling middleware
app.use(notFound)
app.use(errorHandler);

// Listen
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
