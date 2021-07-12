const ContactUser = require('../models/contacts');

getContacts = async(req,res)=>{
    contacts = await ContactUser.find({})
    res.send({success:true, contacts})
}


addContact = (req,res)=>{
    const contact_user = new ContactUser(req.body)
    contact_user.save().then((data)=>{
        res.send({success:true, message:"Contact-User has been created",user:data})
    }).catch((err)=>{
        if (err.code==11000){
            res.status(400).send({success:false, message:"User already exists"})
        }else{
            res.status(400).send({success:false, message:"Can not create user", err})
        }
    })
}


updateContact = (req,res)=>{
    res.send("update")
}


deleteContact = (req,res)=>{
    res.send("delete")
}


module.exports = {addContact, getContacts, updateContact, deleteContact}