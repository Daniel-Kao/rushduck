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

    let { name, topup, meal } = req.body;

    topup = topup ? topup : 0;
    meal = meal ? meal : 0;

    const newRecord = { topup, meal };

    try {
      let user = await User.findOne({ name });

      if (user) {
        user.records.unshift(newRecord);
      } else {
        user = new User({ name });
        user.records.unshift(newRecord);
      }
      user.balance = user.balance + Number(topup) - Number(meal);
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

// @route   GET api/users
// @desc    delete one user
// @access  private

router.delete('/', auth, async (req, res) => {
  try {
    await User.findOneAndDelete({ name: req.body.name });

    res.json({ msg: 'User deleted' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Error Error')
  }
})

// @route   GET api/users/me
// @desc    get user recent expenses 
// @access  private

router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findOne({ name: req.body.name }).sort({ _id: 1 }).limit(10)

    if (!user) {
      return res.status(400).json({ msg: '该用户不存在' });
    }
    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})


module.exports = router;
