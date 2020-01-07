'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class File extends Model {

    posts() {
        return this.belongsTo('App/Models/Post')
    }

}

module.exports = File
