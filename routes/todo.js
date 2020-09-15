const express = require("express");
const router = express.Router();
const todoControllers = require("../controllers/todo");

router.get("/", todoControllers.getTodos);
router.get("/:id", todoControllers.getTodoById);
router.post("/", todoControllers.createTodo);
router.patch("/:id", todoControllers.updateTodo);
router.delete("/:id", todoControllers.deleteTodo);

module.exports = router;
