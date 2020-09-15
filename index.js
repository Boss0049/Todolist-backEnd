const express = require("express");
const app = express();
const todoRoutes = require("./routes/todo");
const userRoutes = require("./routes/user");
const cors = require("cors");
const db = require("./models");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/todo-list", todoRoutes);
app.use("/users", userRoutes);

db.sequelize.sync({ force: false }).then(() => {
  app.listen(8000, () => {
    console.log("Server is running at port 8000");
  });
});

// force: true // ดรอปตารางทิ้ง
// alter: true //เปลี่ยนแปลงโครงสร้างตารางโดยไม่ดรอปตารางทิ้ง
