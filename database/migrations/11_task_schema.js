'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TaskSchema extends Schema {
  up() {
    this.create('tasks', (table) => {
      table.increments()
      table.string('title').notNullable() 
      table.string('description').notNullable() 
      table.date('delivery_date').notNullable()
      table.string('file')
      table.string('name')
      table.string('type')
      table.string('subtype')
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
    this.drop('tasks')
  }
}

module.exports = TaskSchema
