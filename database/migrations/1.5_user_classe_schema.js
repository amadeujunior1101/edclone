'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserClasseSchema extends Schema {
  up() {
    this.create('user_classes', (table) => {
      table.increments()

      table
        .integer('user_id').notNullable()
        .unsigned()
        .index('user_id')
      table
        .foreign('user_id')
        .references('users.id')
        .onDelete('cascade')

      table
        .integer('classe_id').notNullable()
        .unsigned()
        .index('classe_id')
      table
        .foreign('classe_id')
        .references('classes.id')
        .onDelete('cascade')

      table.timestamps()
    })
  }

  down() {
    this.drop('user_classes')
  }
}

module.exports = UserClasseSchema
