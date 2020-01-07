'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Post extends Model {

    classe() {
        return this.belongsTo('App/Models/Classe')
    }
    user() {
        return this.belongsTo('App/Models/User')
    }

    file() {
        return this.hasMany('App/Models/File')
    }
}

module.exports = Post
