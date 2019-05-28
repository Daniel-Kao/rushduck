const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const { check, validationResult } = require("express-validator/check");

const Admin = require("../../models/Admin");

// @route   POST api/admin
// @desc    register administer
// @access  Public

router.post(
  "/",
  [
    check("name", "name is required")
      .not()
      .isEmpty(),
    check(
      "password",
      "Please enter a password with 3 characters or more"
    ).isLength({ min: 3 })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, password } = req.body;

    try {
      let admin = await Admin.findOne({ name });

      if (admin) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      admin = new Admin({
        name,
        password
      });
      const salt = await bcrypt.genSalt(10);

      admin.password = await bcrypt.hash(password, salt);

      await admin.save();

      const payload = {
        admin: {
          id: admin.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).json("Server error");
    }
  }
);

module.exports = router;
