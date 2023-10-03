const express = require("express");
const router = express.Router();
const user = require("../models/User");
const { validationResult, body } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middlewares/fetchUser");
const secret = "samad11@";

let success = false;

// Create User...
router.post(
  "/createUser",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    console.log(req.body);
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ success, errors: result.array() });
    }

    try {
      let User = await user.findOne({ email: req.body.email });

      if (User) {
        return res
          .status(400)
          .json({ success, error: "Email already Exists ! " });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //Create New User
      User = await user.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        User: {
          id: User.id,
        },
      };
      const userToken = jwt.sign(data, secret);
      success = true;
      res.json({ success, userToken });
    } catch (error) {
      res.status(500).send({ success, error: "error occured..." });
    }
  }
);

//login

router.post(
  "/login",
  [body("email").isEmail(), body("password").notEmpty()],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ success, errors: result.array() });
    }

    const { email, password } = await req.body;
    try {
      const User = await user.findOne({ email });

      if (!User) {
        return res
          .status(500)
          .send({ success, error: "Internal Error occur...!" });
      }

      const passCompare = await bcrypt.compare(password, User.password);
      if (!passCompare) {
        return res
          .status(500)
          .send({ success, error: "Internal Error occur...!" });
      }
      const data = {
        User: {
          id: User.id,
        },
      };
      const userToken = jwt.sign(data, secret);
      success = true;
      res.json({ success, userToken });
    } catch (error) {
      return res
        .status(500)
        .send({ success, error: "Internal Error occur...!" });
    }
  }
);

//get user data

router.post("/getUser", fetchUser, async (req, res) => {
  try {
    const userId = req.User.id;
    const User = await user.findById(userId).select("-password");
    success = true;
    res.send({ success, User });
  } catch (error) {
    return res.status(500).send({ success, error: "Internal Error occur...!" });
  }
});

module.exports = router;
