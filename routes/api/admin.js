const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');

const { check, validationResult } = require('express-validator/check');

const Admin = require('../../models/Admin');

// @route   POST api/admin/register
// @desc    register administer
// @access  Public

router.post(
  '/register',
  [
    check('name', 'name is required')
      .not()
      .isEmpty(),
    check('email', 'email is required').isEmail(),
    check(
      'password',
      'Please enter a password with 3 characters or more'
    ).isLength({ min: 3 })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, password, email } = req.body;

    try {
      let admin = await Admin.findOne({ email });

      if (admin) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      admin = new Admin({
        name,
        password,
        email
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
        config.get('jwtSecret'),
        { expiresIn: 3600000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).json('Server error');
    }
  }
);

// @route   POST api/admin/login
// @desc    login administer
// @access  Public

router.post(
  '/login',
  [
    check('name', 'name is required')
      .not()
      .isEmpty(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, password } = req.body;

    try {
      let admin = await Admin.findOne({ name });

      if (!admin) {
        return res.status(400).json({ errors: [{ msg: '用户名或密码错误' }] });
      }

      const isMatch = await bcrypt.compare(password, admin.password);

      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: '用户名或密码错误' }] });
      }
      const payload = {
        admin: {
          id: admin.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).json('Server error');
    }
  }
);

// @route    GET api/admin/auth
// @desc     Authenticate the admin
// @access   Private
router.get('/auth', auth, async (req, res) => {
  try {
    const user = await Admin.find().select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
