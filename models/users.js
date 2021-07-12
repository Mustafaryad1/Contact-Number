// require packages
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      index: true
    },
    password:{
        type: String,
    }
})

const User = mongoose.model('User', UserSchema, 'system_users');
module.exports = User