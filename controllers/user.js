const db = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const registerUser = async (req, res) => {
  const { username, password, name } = req.body;
  const targetUser = await db.User.findOne({ where: { username: username } });
  if (targetUser) {
    res.status(400).send({ message: "Username already taken" });
  } else {
    const salt = bcryptjs.genSaltSync(12);
    const hashedPassword = bcryptjs.hashSync(password, salt);

    await db.User.create({
      username: username,
      password: hashedPassword,
      name: name,
    });
    res.status(201).send({ message: "User create" });
  }
};
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const targetUser = await db.User.findOne({ where: { username: username } });
  if (!targetUser) {
    res.status(400).send({ message: "Username or Password is wrong" });
  } else {
    const isCorrectPassword = bcryptjs.compareSync(
      password,
      targetUser.password
    );

    if (isCorrectPassword) {
      const payload = {
        id: targetUser.id,
        name: targetUser.name,
      };
      const token = jwt.sign(payload, "codecamp", { expiresIn: 3600 });
      res.status(200).send({
        token: token,
        message: "Login Successful",
      });
    } else {
      res.status(400).send({ message: "Username or Password is wrong" });
    }
  }
};

module.exports = { registerUser, loginUser };
