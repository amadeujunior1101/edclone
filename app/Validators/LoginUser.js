'use strict'

class LoginUser {
  get rules() {
    return {
      email: 'required|email:users',
      password: 'required'
    }
  }
  get messages() {
    return {
      'email.required': 'Informe o e-mail!',
      'email.email': 'Formato de e-mail inválido!',
      'password.required': 'Informe a senha!'
    }
  }
}

module.exports = LoginUser
