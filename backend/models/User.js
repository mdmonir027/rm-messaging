const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    name: String,
    username: String,
    email: String,
    password: String,
    connected: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = model('User', userSchema);

module.exports = User;
