const { Schema, model } = require('mongoose');

const conversationSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Message',
      },
    ],
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
