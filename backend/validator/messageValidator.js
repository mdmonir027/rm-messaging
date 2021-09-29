const { body } = require('express-validator');
const User = require('../models/User');
const Conversation = require('../models/Conversation');
//  text, senderId, conversationId
const messageCreateValidator = [
  body('text').not().isEmpty().withMessage('Text must a value'),
  body('conversationId')
    .not()
    .isEmpty()
    .withMessage('Conversation should not empty')
    .custom(async (id) => {
      const conversation = await Conversation.findById(id);
      if (!conversation) {
        throw new Error('Conversation not found!');
      }
      return true;
    }),
];

module.exports = { messageCreateValidator };
