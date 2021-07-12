const router = require("express").Router();
const contactsController = require("../controllers/contacts_controller");


router.get("/list",(req,res)=>{
    res.send("done")
})

module.exports = router