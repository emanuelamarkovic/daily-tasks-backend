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

router.put("/tasks/:id", updateTask);

router.delete("/tasks/:id", deleteTask);

router.patch("/tasks/complete/:id", completeTask);

router.get("/tasks/completed/:date", completedTasksDate);

export default router;
