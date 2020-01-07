'use strict'

class NewPost {
  get rules() {
    return {
      task_title: 'required|max:200',
      task_description: 'required|max:1000',
      cod_grupo: 'required',
    }
  }
  get messages() {
    return {
      'task_title.required': 'Informe um Título',
      'task_title.max': 'Você excedeu 200 caracters',
      'task_description.required': 'Informe a descrição',
      'task_description.max': 'Você excedeu 1000 caracters',
      'cod_grupo.required': 'Escolha uma classe!'
    }
  }
}

module.exports = NewPost
