const Message = require('../models/Messages');
const Conversation = require('../models/Conversation');
const User = require('../models/User');

const controller = {
  index: async (req, res, next) => {
    try {
      const userId = req.user._id;

      const messages = await Message.find({ user: userId });

      return res.status(200).json(messages);
    } catch (error) {
      return res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
  create: async (req, res, next) => {
    try {
      const { text, senderId, conversationId } = req.body;
      const user = req.user;

      const messageInstance = new Message({
        text,
        user: user._id,
      });

      const conversationInstance = new Conversation({
        sender: senderId,
        receiver: user._id,
        message: messageInstance._id,
      });
      await conversationInstance.save();

      if (!conversationId) {
        await User.findByIdAndUpdate(user._id, {
          $push: {
            connected: senderId,
          },
        });
      }

      const message = await messageInstance.save();
      return res.status(201).json(message);
    } catch (error) {
      return res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
  show: async (req, res, next) => {
    try {
      const { messageId } = req.params;

      const message = await Message.findById(messageId);

      return res.status(200).json(message);
    } catch (error) {
      return res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
  update: async (req, res, next) => {
    try {
      const { messageId } = req.params;
      const { text } = req.body;
      const result = await Message.findByIdAndUpdate(
        messageId,
        {
          $set: {
            text,
          },
        },
        {
          new: true,
        }
      );

      return res.status(200).json(result);
    } catch (error) {}
  },
  remove: async (req, res, next) => {
    try {
      const { messageId } = req.params;

      await Message.findByIdAndRemove(messageId);
      const result = await Conversation.findOneAndRemove({
        message: messageId,
        sender: req.user._id,
      });

      if (!result) {
        return res.status(400).json({
          message: 'You are not allowed to delete!',
        });
      }

      return res.status(200).json({
        message: 'Message Deleted!',
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
};

module.exports = controller;
