import express from "express";
import {
  getNotes,
  addNote,
  getRecentNotes,
  getNotesByUserId,
  addNoteToTask,
} from "../controllers/noteController.js";

const noteRouter = express.Router();
noteRouter.get("/:userId/recent", getRecentNotes);
noteRouter.get("/:userId", getNotes);
noteRouter.post("/:userId", addNote);
noteRouter.get("/", getNotesByUserId);
noteRouter.put("/tasks/:taskId", addNoteToTask);

export default noteRouter;
