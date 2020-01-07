'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class DeliveryTask extends Model {


    tasks() {
        return this.belongsTo('App/Models/Task')
    }

}

module.exports = DeliveryTask
