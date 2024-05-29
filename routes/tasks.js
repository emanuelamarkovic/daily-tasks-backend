// routes/tasks.js
import {
  toDoValidator,
  validate,
} from "../middleware/todoValidator/todos-Validator.js";
import express from "express";
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  completeTask,
  completedTasksDate,
} from "../controllers/tasksController.js";

const router = express.Router();

router.get("/", getAllTasks);
router.post("/addTask", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.patch("/tasks/complete/:id", completeTask);
router.get("/tasks/completed/:date", completedTasksDate);

export default router;
