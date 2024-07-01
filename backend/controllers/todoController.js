// import asyncHandler from "express-async-handler";
import Todo from "../db/models/todoSchema.js";
import mongoose from "mongoose";

// @desc    Get all todos
// @route   GET /api/todos
const getAllTodos = async (req, res) => {
  const user = req.user._id;
  console.log(user, "getUserId");
  const todos = await Todo.find({ user: user });
  res.status(200).json(todos);
};

// @desc    Create new todo
// @route   POST /todos
const createTodo = async (req, res, next) => {
  try {
    const user = req.user._id;
    const { title, description } = req.body;
    console.log(req.body);
    if (!title || !description) {
      const error = new Error("Please fill out the given fields");
      res.status(400);
      console.log("todo", title, description);
      return next(error);
    }
    const todo = await Todo.create({
      user,
      title,
      description,
      isDone: false,
    });
    const todos = await Todo.find({ user: user });
    res.status(201).json(todos);
  } catch (error) {
    res.status(400).json({ msg: `${error}` });
  }
};

// @desc    Delete a todo
// @route   DELETE /todos
const deleteTodo = async (req, res, next) => {
  try {
    const _id = req.body._id;
    console.log(req.body)
    const userId = req.user._id;
    await Todo.deleteOne({ _id: _id });
    const todos = await Todo.find({ user: userId });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ msg: `${error}` });
  }
};

// @desc    Update a todo
// @route   PUT /todos
const updateTodo = async (req, res) => {
  try {
    const { _id, title, description, status } = req.body;
    console.log(req.body)
    
    const todo = await Todo.findOne({ _id: _id, user: req.user._id});
    
    if (todo) {
      todo.title = title || todo.title
      todo.description = description || todo.description
      if(status === true) {
        todo.isDone = true
      } else if (status === false) {
        todo.isDone = false
      }
      const updatedTodo = await todo.save();
      const todos = await Todo.find({ user: req.user._id })
      res.status(200).json(todos);
    } else {
      res.status(404).json({msg: "Error: Todo Not Found"})
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export { getAllTodos, createTodo, deleteTodo, updateTodo };
