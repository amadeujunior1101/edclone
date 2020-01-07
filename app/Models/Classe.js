'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Classe extends Model {
    //carrega os grupos de o professor criou
    user() {
        return this.belongsTo('App/Models/User')
    }

    users() {
        return this.belongsToMany('App/Models/User')
            .pivotTable('user_classes')
    }

    post() {
        return this.hasMany('App/Models/Post')
    }

    user_classe() {
        return this.hasMany('App/Models/UserClasse')
    }

    

}

module.exports = Classe
