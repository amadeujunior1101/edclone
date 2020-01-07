'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Student extends Model {
    classes() {
        return this.belongsToMany('App/Models/Classe')
    }
}

module.exports = Student
