/*** User Validation schema ***/

const Joi = require("joi");

/*** Create User registrations ***/

const userSchemas = {
  /** Create User Validations **/
  userPOST: Joi.object().keys({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(3)
      .max(30)
      .required(),
  }),
};

module.exports = userSchemas;
