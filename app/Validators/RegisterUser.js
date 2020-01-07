'use strict'

class RegisterUser {
  get rules() {
    return {
      name: 'required|min:3|max:200',
      email: 'required|email|unique:users',
      password: 'required|min:8|max:20',
      confirmPassword: 'required|min:8|max:20|same:password'
    }
  }
  get messages() {
    return {
      'name.required': 'Informe o nome!',
      'name.min': 'Nome mínima de 3 caracters!',
      'name.max': 'Nome máximo de 200 caracters!',

      'email.required': 'Informe o e-mail!',
      'email.email': 'Formato de e-mail inválido!',
      'email.unique': 'Este e-mail já está em uso!',

      'password.required': 'Informe a senha!',
      'password.min': 'Senha mínima de 8 caracters!',
      'password.max': 'Senha máxima de 20 caracters!',

      'confirmPassword.required': 'confirme o password!',
      'confirmPassword.min': 'Senha mínima de 8 caracters!',
      'confirmPassword.max': 'Senha máxima de 20 caracters!',
      'confirmPassword.same': 'As senhas devem ser iguais!',
    }
  }
}

module.exports = RegisterUser
