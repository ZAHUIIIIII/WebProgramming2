const express = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post(
  '/register',
  [
    check('username', 'Username is required').isEmail(),
    check('password', 'Password is required').isLength({ min: 6 }),
  ],
  authController.registerUser
);

router.post(
  '/login',
  [
    check('username', 'Username is required').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  authController.loginUser
);

router.get('/', protect, authController.getUser);

module.exports = router;