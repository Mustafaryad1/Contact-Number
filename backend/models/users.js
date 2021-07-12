// require packages
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


// User model
const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      index: true
    },
    password:{
        type: String,
    }
})

UserSchema.statics.login = async function (username, password){
  const user = await this.findOne({username:username});

  if (user){
      if (user.password == password){
        return user;
      }
  }
  throw Error('Incorrect credentials');
}

const User = mongoose.model('User', UserSchema, 'system_users');
module.exports = User