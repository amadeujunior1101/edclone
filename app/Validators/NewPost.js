'use strict'

class NewPost {
  get rules() {
    return {
      post_title: 'required|max:200', 
      content: 'max:2000',
      cod_grupo: 'required',
    }
  }
  get messages() {
    return {
      'post_title.required': 'Informe um Título para o Post',
      'post_title.max': 'Você excedeu 200 caracters',
      'content.max': 'Você excedeu 2000 caracters',
      'cod_grupo.required': 'Escolha uma classe!'
    }
  }
}

module.exports = NewPost
