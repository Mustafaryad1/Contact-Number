const router = require("express").Router();
const contactsController = require("../controllers/contacts_controller");
const validation_body = require('../middleware/validationBody');
const ContactUserSchema = require('../validation-schema/contact_user_schema');


router.get("/list",
            contactsController.getContacts)

router.post('/add', 
             validation_body(ContactUserSchema.AddContactUserScehma),
             contactsController.addContact)

router.put("/update/:id",
            contactsController.updateContact)

router.delete("/delete/:id",
            contactsController.deleteContact)



module.exports = router