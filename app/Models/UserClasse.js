'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserClasse extends Model {

    // user_classe() {
    //     return this
    //         .belongsToMany('App/Models/Classe')
    //         .pivotTable('user_classe')
    // }

    //carrega os grupos que o aluno está inscrito
    classe() {
        return this.belongsTo('App/Models/Classe')
    }

    user_classe() {
        return this.belongsToMany('App/Models/Classe')
    }

    // tasks(){
    //     return this.belongsTo('App/Models/Task')
    // }

}

module.exports = UserClasse
