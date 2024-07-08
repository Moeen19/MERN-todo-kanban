import express from "express";
import { createTodo, getAllTodos, deleteTodo, updateTodo } from "../controllers/todoController.js";
import { protect } from "../middleware/authProtection.js";

const router = express.Router();

// GET all todos
router.post("/getTodos", protect, getAllTodos);

// Create new todo
router.post("/", protect, createTodo);

// Delete a Todo
router.delete("/", protect, deleteTodo);

// Update a todo
router.put("/", protect, updateTodo)

export default router;
