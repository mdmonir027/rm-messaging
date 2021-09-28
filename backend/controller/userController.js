const User = require('../models/User');
const bcrypt = require('bcrypt');
const { internalServerError } = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');

const controller = {
  index: async (req, res) => {
    const { type } = req.query;
    try {
      if (type === 'd') {
        const users = await User.find({
          _id: { $nin: req.user.connected },
        });
        return res.status(200).json(users);
      }
      const users = await User.find({
        _id: { $in: req.user.connected },
      });
      return res.status(200).json(users);
    } catch (error) {
      internalServerError(res, error);
    }
  },
  register: async (req, res, next) => {
    try {
      const { email, username, password } = req.body;

      const hashPassword = await bcrypt.hash(password, 11);
      const userInstance = new User({
        email,
        username,
        password: hashPassword,
        connected: [],
      });

      const user = await userInstance.save();

      return res.status(200).json(user);
    } catch (error) {
      internalServerError(req, error);
    }
  },
  login: async (req, res, next) => {
    try {
      const { password, foundedUser } = req.body;

      const matched = await bcrypt.compare(password, foundedUser.password);
      if (!matched) {
        return res.status(400).json({
          username: 'Invalid Credentials',
          password: 'Invalid Credentials',
        });
      }

      const token = jwt.sign(
        {
          _id: foundedUser._id,
          email: foundedUser.email,
          username: foundedUser.username,
          iat: new Date().getTime(),
          exp: Date.now() + 1000 * 60 * 60 * 2,
        },
        process.env.JWT_SECRET
      );

      return res.status(200).json({
        message: 'Login was successful',
        token: `Bearer ${token}`,
      });
    } catch (error) {
      internalServerError(req, error);
    }
  },
};

module.exports = controller;
