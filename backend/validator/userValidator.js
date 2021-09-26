const { body } = require('express-validator');
const User = require('../models/User');

const validator = {
  registerValidator: [
    body('name').not().isEmpty().withMessage('Name is required!'),
    body('username')
      .not()
      .isEmpty()
      .withMessage('username is required!')
      .custom(async (username) => {
        const user = await User.findOne({ username });
        if (user) {
          throw new Error('Username already exists!');
        }
        return true;
      }),
    body('email')
      .isEmail()
      .withMessage('Email must be valid!')
      .custom(async (email) => {
        const user = await User.findOne({ email });
        if (user) {
          throw new Error('Email already exists!');
        }
        return true;
      })
      .normalizeEmail(),
    body('password')
      .not()
      .isEmpty()
      .withMessage('Password is required!')
      .isLength({ min: 6, max: 32 })
      .withMessage('Password must be between 6 to 32 Chars'),
    body('confirmPassword')
      .not()
      .isEmpty()
      .withMessage('Confirm password!')
      .custom((confirmPassword, { req }) => {
        if (confirmPassword !== req.password) {
          throw new Error("Password didn't matched!");
        }
        return true;
      }),
  ],
  loginValidator: [
    body('username')
      .not()
      .isEmpty()
      .withMessage('username is required!')
      .custom(async (username, { req }) => {
        const user = await User.findOne({
          $or: [{ username }, { email: username }],
        });
        if (!user) {
          throw new Error('Invalid Credentials');
        }

        req.body.foundedUser = user;
        return true;
      }),
    body('password')
      .not()
      .isEmpty()
      .withMessage('Password is required!')
      .custom(async (username, { req }) => {
        const user = await User.findOne({
          $or: [{ username: req.body.username }, { email: req.body.username }],
        });
        if (!user) {
          throw new Error('Invalid Credentials');
        }
        return true;
      }),
  ],
};

module.exports = validator;
