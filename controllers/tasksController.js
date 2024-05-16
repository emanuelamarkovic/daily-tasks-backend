import Task from "../models/task.js";
import User from "../models/user.js";

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Serverfehler" });
  }
};

export const createTask =  async (req, res) => {
  const { title, userId } = req.body;

  // Check if title and userId are provided
  if (!title || !userId) {
    return res.status(400).json({ message: "Title and userId are required" });
  }

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new task
    const newTask = new Task({ title, user: userId });

    // Save the task to the database
    await newTask.save();

    // Respond with the created task
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title },
      { new: true }
    );
    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Serverfehler" });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    res.json({ message: "Task gelöscht" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Serverfehler" });
  }
};
