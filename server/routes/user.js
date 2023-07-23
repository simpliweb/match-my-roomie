require("dotenv").config();
const user_router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// KEY
const { KEY = "Secret" } = process.env.SECRET_KEY;

user_router.get("/", (req, res) => {
  res.send("hie");
});

user_router.post("/signup", async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create(req.body);
    if (res.statusCode === 200) {
      console.log(JSON.stringify(newUser));
      res.json(newUser);
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

user_router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user.email) {
      const result = await bcrypt.compare(req.body.password, user.password);
      if (result) {
        const authToken = jwt.sign({ email: user.email }, KEY);
        res.json({ authToken });
      } else {
        res.status(400).json({ error: "password doesn't match" });
      }
    } else {
      res.status(400).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    res.status(500).send({ message: "internal Server error" });
  }
});

module.exports = user_router;
