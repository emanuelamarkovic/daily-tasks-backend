import express from "express";
import {
  getNotes,
  addNote,
  getRecentNotes,
  getNotesByUserId,
} from "../controllers/noteController.js";

const noteRouter = express.Router();
noteRouter.get("/:userId/recent", getRecentNotes);
noteRouter.get("/:userId", getNotes);
noteRouter.post("/:userId", addNote);
noteRouter.get("/", getNotesByUserId);

export default noteRouter;
