const express = require("express");
const app = express();
const sequelize = require("sequelize");
app.use(express.json());

const db = require("./models");
const User = db.User;
const Task = db.task;
const Skill = db.Skill;
const UserSkill = db.UserSkill;

app.get("/sync", (req, res) => {
  User.sync({ alter: true });

  res.send({
    message: "ok",
    data: {},
  });
});

app.get("/", (req, res) => {
  res.send({
    message: "ok",
    data: {},
  });
});

app.post("/user", async (req, res) => {
  const { firstName, lastName, address, gender } = req.body;

  const result = await User.create({
    firstName: firstName,
    lastName: lastName,
    address: address,
    gender: gender,
  });

  return res.json({
    message: "user created",
    data: JSON.stringify(result),
  });
});

app.get("/users", async (req, res) => {
  const result = await User.findAll({
    //attributes: ["firstName"],
    //attributes: { exclude: ["firstName"] },
    //attributes: [sequelize.fn("COUNT", sequelize.col("id"))],
    // where: {
    //   id: 2,
    // },
    // where: {
    //   firstName: {
    //     [sequelize.Op.eq]: "J",
    //   },
    // },
    include: [Task],
  });

  return res.json({
    message: "user list",
    data: result,
  });
});

app.get("/tasks", async (req, res) => {
  const result = await Task.findAll({
    include: [User],
  });

  return res.send({
    message: "task list",
    data: result,
  });
});

app.get("/skills", async (req, res) => {
  const result = await Skill.findAll({
    include: [
      {
        model: UserSkill,
        include: [User],
      },
    ],
  });
  return res.send({
    message: "skill list",
    data: result,
  });
});

app.get("/several-action", async (req, res) => {
  const t = await db.sequelize.transaction();

  try {
    await User.create(
      {
        firstName: "Bart",
        lastName: "Simpson",
        address: "simpson hill",
        gender: "male",
      },
      {
        transaction: t,
      }
    );
    await User.create(
      {
        firstName: 11,
        lastName: 11,
        addresst: 11,
      },
      {
        transaction: t,
      }
    );

    await t.commit();
  } catch (err) {
    await t.rollback();
  }

  return res.send({
    message: "ok",
  });
});

app.listen(4550, function () {
  console.log("server run at port : ", 4550);
});
