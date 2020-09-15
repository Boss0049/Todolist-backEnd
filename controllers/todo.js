const db = require("../models");

const createTodo = async (req, res) => {
  const { task } = req.body;

  try {
    const newTodo = await db.TodoList.create({ task });
    res.status(201).send(newTodo);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getTodos = (req, res) => {
  db.TodoList.findAll()
    .then((allTodos) => {
      res.status(200).send(allTodos);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const getTodoById = async (req, res) => {
  const targetId = Number(req.params.id);

  const targetTodo = await db.TodoList.findOne({ where: { id: targetId } });

  res.status(200).send(targetTodo);
};

const updateTodo = async (req, res) => {
  const targetId = Number(req.params.id);
  const { task } = req.body;

  const targetTodo = await db.TodoList.findOne({ where: { id: targetId } });

  console.log(targetTodo);

  if (targetTodo) {
    await targetTodo.update({
      task,
    });
    res.status(200).send({ message: `Updated ID ${targetId}` });
  } else {
    res.status(404).send({ message: `Not Found` });
  }
};

const deleteTodo = async (req, res) => {
  const targetId = Number(req.params.id);

  const targetTodo = await db.TodoList.findOne({ where: { id: targetId } });
  if (targetTodo) {
    await targetTodo.destroy();
    res.status(204).send();
  } else {
    res.status(404).send("Todo List Not Found NaJA");
  }

  // await db.TodoList.destroy({ where: { id: targetId } });
};

module.exports = {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
};
