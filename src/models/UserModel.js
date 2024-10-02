const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(

    {
        name: { type: String, require: false },
        email: { type: String, unique: true },
        password: { type: String, required: true },
        typeLogin: { type: String, required: false },
        avatar: { type: String, required: false },
        tokenLogin: { type: String, required: false },
        isUser: { type: String, default: 'User', required: false },
        phone: { type: String, required: false },
        address: { type: String, required: false },
        access_token: { type: String, required: false },
        refresh_token: { type: String, required: false },
        accountLock: {
          isLocked: { type: Boolean, default: false },
          lockUntil: { type: Date, default: null },
          lockReason: { type: String, default: '' } 
        }
      },
      {
        timestamps: true,
      }
    );

const User = mongoose.model('User', userSchema);
module.exports = User;
