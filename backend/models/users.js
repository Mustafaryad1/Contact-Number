// require packages
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys')

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

// user methods
UserSchema.methods.generateJWT = function () {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
  }, keys.JWTSecret);
};

// User Static methods
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