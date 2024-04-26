import Task from "../models/task.js";

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
  const { title } = req.body;
  try {
    const newTask = new Task({ title });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Serverfehler" });
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
