const mongoose = require('mongoose');
const ContactUserSchema = new mongoose.Schema({
    name: {
      type: String,
      unique: true,
      index: true
    },
    phone:{
        type: String,
    },
    address:{
       type: String 
    },
    notes:{
        type:String
    }
})

const ContactUser = mongoose.model('ContactUser', ContactUserSchema, 'contact_users');
module.exports = ContactUser