'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClasseSchema extends Schema {
  up() {
    this.create('classes', (table) => {
      table.increments()
      table.string('title', 254).notNullable()
      table.string('key').notNullable().unique()

      table
        .integer('user_id').notNullable() 
        .unsigned()
        .index('user_id')
      table
        .foreign('user_id')
        .references('users.id')
        .onDelete('cascade')

      table.timestamps()
    })
  }

  down() {
    this.drop('classes')
  }
}

module.exports = ClasseSchema
