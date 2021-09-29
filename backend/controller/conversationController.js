const Conversation = require('../models/Conversation');
const User = require('../models/User');

const { internalServerError } = require('../utils/errorResponse');

const controller = {
  index: async (req, res, next) => {
    try {
      const userId = req.user._id;
      const { receiverId } = req.params;

      const messages = await Conversation.find({
        sender: userId,
        receiver: receiverId,
      });

      return res.status(200).json(messages);
    } catch (error) {
      internalServerError(res, error);
    }
  },
  all: async (req, res, next) => {
    try {
      const userId = req.user._id;
      const messages = await Conversation.find({
        $or: [{ sender: userId }, { receiver: userId }],
      })
        .populate('receiver', 'name')
        .populate('sender', 'name')
        .select('isRead receiver');

      return res.status(200).json(messages);
    } catch (error) {
      internalServerError(res, error);
    }
  },
  create: async (req, res) => {
    try {
      const { receiverId } = req.params;

      const receiverFind = await User.findById(receiverId);

      if (!receiverFind) {
        return res.status(400).json({
          message: 'Invalid receiver',
        });
      }

      const conversationFind = await Conversation.findOne({
        sender: req.user._id,
        receiver: receiverId,
      });

      if (conversationFind) {
        if (!receiverFind) {
          return res.status(400).json({
            message: 'Conversation already exists',
          });
        }
      }

      const conversationInstance = new Conversation({
        sender: req.user._id,
        receiver: receiverId,
        messages: [],
      });

      const conversationSave = await conversationInstance.save();

      const updateAuthUser = await User.findByIdAndUpdate(
        req.user._id,
        {
          $push: { connected: receiverId },
        },
        { new: true }
      );

      await User.findByIdAndUpdate(receiverId, {
        $push: { connected: req.user._id },
      });

      req.user = updateAuthUser;

      const conversation = await Conversation.findById(conversationSave._id)
        .populate('receiver', 'name')
        .select('isRead receiver');

      return res.status(201).json(conversation);
    } catch (error) {
      internalServerError(res, error);
    }
  },
};

module.exports = controller;
