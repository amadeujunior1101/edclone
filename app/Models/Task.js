'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Task extends Model {

    static get dates() {

        return super.dates.concat(['delivery_date'])

    }

    static castDates(field, value) {

        if (['delivery_date'].indexOf(field) > -1) {

            return value.format('MM/DD/YYYY')

        }

        return super.formatDates(field, value)

    }

    classes() {
        return this.belongsTo('App/Models/Task')
    }
}

module.exports = Task
