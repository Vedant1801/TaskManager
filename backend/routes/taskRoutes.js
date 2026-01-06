const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

// CREATE TASK
router.post("/", auth, createTask);

// GET ALL TASKS
router.get("/", auth, getTasks);

// UPDATE TASK
router.put("/:id", auth, updateTask);

// DELETE TASK
router.delete("/:id", auth, deleteTask);

module.exports = router;
