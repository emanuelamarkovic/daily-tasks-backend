import Note from "../models/note.js";

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
