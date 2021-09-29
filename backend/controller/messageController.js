const Message = require('../models/Messages');
const Conversation = require('../models/Conversation');
const User = require('../models/User');
const { internalServerError } = require('../utils/errorResponse');

const controller = {
  index: async (req, res, next) => {
    console.log({ index: 'a' });
    try {
      const userId = req.user._id;
      const { conversationId } = req.params;

      const conversation = await Conversation.findById(conversationId).populate(
        'messages'
      );

      const messages = conversation.messages.sort((a, b) => {
        if (a.createdAt > b.createdAt) return 1;
        if (a.createdAt < b.createdAt) return -1;
        return 0;
      });

      return res.status(200).json(messages);
    } catch (error) {
      internalServerError(res, error);
    }
  },
  create: async (req, res, next) => {
    try {
      const { text, conversationId } = req.body;
      const user = req.user;

      const messageInstance = new Message({
        text,
        sender: user._id,
      });

      const message = await messageInstance.save();

      await Conversation.findByIdAndUpdate(conversationId, {
        $push: {
          messages: message._id,
        },
      });

      return res.status(201).json(message);
    } catch (error) {
      internalServerError(res, error);
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
