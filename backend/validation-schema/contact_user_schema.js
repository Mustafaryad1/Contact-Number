const Joi = require('joi');
const namePattern = /^[a-zA-Z0-9]+$/

const AddContactUserScehma = Joi.object().keys({
  name:Joi.string().required().regex(namePattern),
  phone:Joi.string().required(),
  address:Joi.string().required(),
  notes: Joi.string().required(),
})

module.exports = {AddContactUserScehma}