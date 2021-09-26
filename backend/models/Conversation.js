const { Schema, model } = require('mongoose');

const conversationSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    message: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    isRead: {
      type: Schema.Types.Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Conversation = model('Conversation', conversationSchema);

module.exports = Conversation;
