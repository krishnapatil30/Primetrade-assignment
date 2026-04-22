const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

// all routes protected
router.use(auth);

// normal user access
router.post("/", createTask);
router.get("/", getTasks);
router.put("/:id", updateTask);


router.delete("/:id", deleteTask);

module.exports = router;