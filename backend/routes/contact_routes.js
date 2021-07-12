const router = require("express").Router();
const contactsController = require("../controllers/contacts_controller");
const ContactUserSchema = require('../validation-schema/contact_user_schema');
const authMiddleware = require('../middleware/authMiddleware')
const validation_body = require('../middleware/validationBody');

router.get("/list",
            // authMiddleware.requireAuth,
            contactsController.getContacts)

router.post('/add', 
             validation_body(ContactUserSchema.AddContactUserScehma),
            //  authMiddleware.requireAuth,
             contactsController.addContact)

router.put("/update/:id",
            // authMiddleware.requireAuth,
            contactsController.updateContact)

router.delete("/delete/:id",
            // authMiddleware.requireAuth,
            contactsController.deleteContact)


module.exports = router
