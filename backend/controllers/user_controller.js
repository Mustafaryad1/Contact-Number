const User = require('../models/users');


module.exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.login(username, password);
      res.status(200).json({token:user.generateJWT(),username:user.username});
    }
    catch (err) {
      res.status(400).json({ error:err.message });
    }
  
  }