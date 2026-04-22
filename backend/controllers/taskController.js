const Task = require("../models/Task");
const mongoose = require("mongoose");

exports.createTask = async (req, res) => {
  const task = await Task.create({ ...req.body, user: req.user.id });
  res.json(task);
};

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id }, // 🔐 secure
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({
        msg: "Task not found or you are not authorized"
      });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    // 🔥 allow ONLY admin OR owner
    if (
      req.user.role !== "admin" &&
      task.user.toString() !== req.user.id
    ) {
      return res.status(403).json({ msg: "Not authorized to delete" });
    }

    await task.deleteOne();

    res.json({ msg: "Task deleted successfully" });

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};