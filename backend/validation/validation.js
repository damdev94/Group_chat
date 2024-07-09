const joi = require('joi')

userValidation = (body) => {
  const userValidationSignUp = joi.object({
    email : joi.string().min(2).max(30).trim().required(),
    password : joi.string().min(8).max(30).trim().required(),
    phone : joi.string().min(8).max(30).trim().required()
  })

  const userValidationLogIn = joi.object({
    email : joi.string().min(2).max(30).trim().required(),
    password : joi.string().min(8).max(30).trim().required(),
  })

  return {
    userValidationSignUp : userValidationSignUp.validate(body),
    userValidationLogIn : userValidationLogIn.validate(body)
  }
}

module.exports = userValidation
