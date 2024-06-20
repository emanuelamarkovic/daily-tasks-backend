import Note from "../models/note.js";
import Task from "../models/task.js";

export const getNotesByUserId = async (req, res) => {
  try {
    const userId = req.user._id;
    const notes = await Note.find({ user: userId });
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getRecentNotes = async (req, res) => {
  try {
    const { userId } = req.params;
    const notes = await Note.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5);
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getNotes = async (req, res) => {
  try {
    const { userId } = req.params;
    const notes = await Note.find({ user: userId }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const addNote = async (req, res) => {
  try {
    const { title, content, date } = req.body;
    const { userId } = req.params;

    const newNote = new Note({
      title,
      content,
      date,
      user: userId,
    });

    await newNote.save();

    res.json(newNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const addNoteToTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const { title, content, date, user } = req.body;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const note = new Note({
      title,
      content,
      date,
      user,
    });

    await note.save();

    task.notes.push(note._id);
    await task.save();

    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
