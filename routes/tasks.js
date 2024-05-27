// routes/tasks.js

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

router.get("/tasks", getAllTasks);

router.post("/tasks", createTask);

router.put("/tasks", updateTask);

router.delete("/tasks", deleteTask);

router.patch("/tasks/complete", completeTask);

router.get("/tasks/completed", completedTasksDate);

export default router;
