const ContactUser = require('../models/contacts');

getContacts = async(req,res)=>{
    const {skip=0,limit=10} = req.query;
    
    contacts = await ContactUser.find({}).limit(parseInt(limit)).skip(parseInt(skip))
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


updateContact = async(req,res)=>{
    const contact_id = req.params.id;
    try {
        await ContactUser.findByIdAndUpdate({_id:contact_id},
                req.body,
                {new:true},
                (err, contact)=>{
                    if(err){
                        res.status(500).send({success:false,message:err});
                    }
                        res.send({success:true,message:"Contact has been updated",contact})
                })
        }
    catch (err) {
        res.status(404).send({
        success: false,
        message: "contact not found"
        })
    }
}


deleteContact = async(req,res)=>{
    const contact_id = req.params.id;
    ContactUser.findByIdAndDelete(contact_id)
     .then(contact=>{
        if(!contact){
            res.status(404).send({
                success: false,
                message: "contact not found"
            })
        }
        res.send({
            succes: true,
            message: `contact user ${contact.name} has been deleted`,
          })
    })
     .catch(err=>{
        res.status(400).send({
            succes: false,
            err
          })
    })
}


module.exports = {addContact, getContacts, updateContact, deleteContact}