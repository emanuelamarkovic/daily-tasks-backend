// routes/tasks.js
import { toDoValidator,validate } from "../Middleware/todoValidator/todos-Validator.js";
import express from "express";
import {
  getAllTasks,
  createTask,
  updateTask,
<<<<<<< HEAD
  deleteTask

=======
  deleteTask,
  completeTask,
  completedTasksDate,
>>>>>>> 3-feature-issue-and-schema
} from "../controllers/tasksController.js";

const router = express.Router();

router.get("/", getAllTasks);

router.post("/:userId", createTask);
router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

router.patch("/tasks/complete/:id", completeTask);

router.get("/tasks/completed/:date", completedTasksDate);

export default router;
