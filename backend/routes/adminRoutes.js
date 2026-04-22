const router = require("express").Router();
const User = require("../models/User");
const Task = require("../models/Task");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// 🔒 protect all admin routes
router.use(auth, role("admin"));

/* =========================
   👤 GET ALL USERS
========================= */
router.get("/users", async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

/* =========================
   📋 GET TASKS OF USER
========================= */
router.get("/tasks/:userId", async (req, res) => {
  const tasks = await Task.find({ user: req.params.userId });
  res.json(tasks);
});

/* =========================
   ➕ ADD TASK TO USER
========================= */
router.post("/tasks/:userId", async (req, res) => {
  const task = await Task.create({
    title: req.body.title,
    user: req.params.userId
  });

  res.json(task);
});

/* =========================
   🗑 DELETE ANY TASK
========================= */
router.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted by admin" });
});

module.exports = router;