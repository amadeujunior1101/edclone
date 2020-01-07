'use strict'

class NewClasse {
  get rules() {
    return {
      title: 'required|max:50',
      //codigo_turma: 'required',
    }
  }
  get messages() {
    return {
      'title.required': 'Informe um título!',
      'title.max': 'Título deve conter no máximo 50 caracters!',
      //'codigo_turma': 'Informe o codigo!'
    }
  }
}
module.exports = NewClasse
