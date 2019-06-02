const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    default: 0
  },
  records: [
    {
      topup: {
        type: Number,
        default: 0
      },
      meal: {
        type: Number,
        default: 0
      },
      date: {
        type: Date,
        default: new Date()
      }
    }
  ]
});

module.exports = User = mongoose.model('user', UserSchema);
