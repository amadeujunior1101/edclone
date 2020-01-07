'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DeliveryTaskSchema extends Schema {
  up() {
    this.create('delivery_tasks', (table) => {
      table.increments()//id task, id user, path archivo
      table.string('status').notNullable()
      table.text('content')
      table.string('file')
      table.string('name')
      table.string('type')
      table.string('subtype')
      table
        .integer('task_id').notNullable()
        .unsigned()
        .index('task_id')
      table
        .foreign('task_id')
        .references('tasks.id')
        .onDelete('cascade')
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
    this.drop('delivery_tasks')
  }
}

module.exports = DeliveryTaskSchema
