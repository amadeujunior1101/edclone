'use strict'

class EntryClasse {
  get rules() {
    return {
      codigo_turma: 'required'
    }
  }
  get messages() {
    return {
      'codigo_turma.required': 'Informe o codigo!'
    }
  }
}

module.exports = EntryClasse
