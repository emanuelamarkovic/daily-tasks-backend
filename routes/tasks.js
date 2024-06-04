// routes/tasks.js
import {
  toDoValidator,
  validate,
} from "../middleware/todoValidator/todos-Validator.js";
import express from "express";
import {
  /* getAllTasks,
  createTask,
  updateTask,
  deleteTask,*/
  addTodo,
  getUserTodos,
  markTodoComplete,
  getCompletedTodosByDate,
  getTodoCount,
  deleteTodo,
  editTodo,
} from "../controllers/tasksController.js";

const router = express.Router();

/* router.get("/", getAllTasks);

router.post("/addTask", createTask);
router.put("/:id", updateTask);


router.delete("/:id", deleteTask); */

router.post("/todos/:userId", addTodo);
router.get("/users/:userId/todos", getUserTodos);
router.patch("/todos/:todoId/complete", markTodoComplete);
router.get("/todos/completed/:date", getCompletedTodosByDate);
router.get("/todos/count", getTodoCount);
router.delete("/todos/:todoId", deleteTodo);
router.put("/todos/:todoId", editTodo);

export default router;
