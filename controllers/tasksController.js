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

export const createTask = async (req, res) => {
  const { userId } = req.params;
  const { title, completed } = req.body;

  try {
    const task = new Task({
      title,
      completed,
      user: userId,
    });

    const savedTask = await task.save();

    await User.findByIdAndUpdate(
      userId,
      { $push: { todos: savedTask._id } },
      { new: true }
    );

    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ error: `Error creating task: ${error.message}` });
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
