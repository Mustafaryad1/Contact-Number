const jwt = require('jsonwebtoken');
const User = require('../models/users');
const keys = require('../config/keys');


const requireAuth =  (req, res, next) => {
  const token = req.headers['x-access-token']


  // check json web token exists & is verified
  if (token) {

    jwt.verify(token,keys.JWTSecret , async (err, decodedToken) => {
      if (err) {
        res.send({success:false,message:"this is not a valid token"})
      } else {
        req.user = await User.findById(decodedToken.id)
        if(!req.user){
          res.send({success:false,message:"The user has this token not exists"})
        }

        next();
      }
    });
  } else {

    res.send({success:false,message:"there is  no a valid token that exists"})
  }
};

module.exports = {requireAuth}