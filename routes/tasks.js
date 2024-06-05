// routes/tasks.js
import {
  toDoValidator,
  validate,
} from "../middleware/todoValidator/todos-Validator.js";
import express from "express";
import {
  addTodo,
  getUserTodos,
  markTodoComplete,
  updateTaskTime,
  getCompletedTodosByDate,
  getTodoCount,
  deleteTodo,
  editTodo,
} from "../controllers/tasksController.js";

const router = express.Router();

router.post("/todos/:userId", addTodo);
router.get("/users/:userId/todos", getUserTodos);
router.patch("/todos/:todoId/complete", markTodoComplete);
router.patch("/stopwatch/:id", updateTaskTime);
router.get("/todos/completed/:date", getCompletedTodosByDate);
router.get("/todos/count", getTodoCount);
router.delete("/todos/:todoId", deleteTodo);
router.put("/todos/:todoId", editTodo);

export default router;
