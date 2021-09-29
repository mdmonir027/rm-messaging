const { Schema, model } = require('mongoose');

const messageSchema = new Schema(
  {
    text: String,
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  {
    timestamps: true,
  }
);

const Message = model('Message', messageSchema);

module.exports = Message;
