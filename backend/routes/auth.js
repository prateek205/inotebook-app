const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userdetails = require("../middleware/userdetails");
const JWT_SECRET = "prateek@bahad";

// CREATE ROUTE: using POST method with /api/auth/createuser
router.post(
  "/createuser",
  [
    body("Name", "Enter a Valid Name").isLength({ min: 3 }),
    body("Email", "Enter a Valid Email Address").isEmail(),
    body("Password", "Password length should br min 5 charcter").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ Email: req.body.Email });
      if (user) {
        return res.status(400).json({success, error: "Email Id Already Exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.Password, salt);
      user = await User.create({
        Name: req.body.Name,
        Email: req.body.Email,
        Password: secPass,
      }).then((user) => res.json(user));

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      console.log(success, authtoken);
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

//LOGIN ROUTE: using POST method with /api/auth/login
router.post(
  "/login",
  [
    (body("Email", "Enter a Valid Email Address").isEmail(),
    body("Password", "Password should not be blank").exists()),
  ],
  async (req, res) => {
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { Email, Password } = req.body;

    try {
      let user = await User.findOne({ Email });
      if (!user) {
        return res
          .status(400)
          .json({error: "Please Login again with correct credentials" });
      }

      const passwordCompare = bcrypt.compare(Password, user.Password);
      if (!passwordCompare) {
        success= false;
        return res
          .status(400)
          .json({
            success,
            error: "Please Login again with correct credentials",
          });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
     let success= true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

//USER DETAILS ROUTE: using GET method with /api/auth/getuser
router.post("/getuser", userdetails, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const userId = req.user.id;
  try {
    const user = await User.findById(userId).select("-Password");
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
