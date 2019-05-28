const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const User = require('../../models/User');

// @route   POST api/users
// @desc    create user
// @access  Public

router.post(
  '/',
  [
    auth,
    [
      check('name', 'name is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, topup, meal } = req.body;

    const newRecord = { topup, meal };

    try {
      let user = await User.findOne({ name });

      if (user) {
        user.records.unshift(newRecord);
      } else {
        user = new User({ name });
        user.records.unshift(newRecord);
      }
      console.log(topup);
      await user.save();
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).json('server error');
    }
  }
);

// @route   GET api/users
// @desc    get all users
// @access  private

router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
