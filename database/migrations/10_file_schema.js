'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FileSchema extends Schema {
  up() {
    this.create('files', (table) => {
      table.increments()
      table
        .integer('post_id').notNullable()
        .unsigned()
        .index('post_id')
      table
        .foreign('post_id')
        .references('posts.id')
        .onDelete('cascade')
      table.string('file')
      table.string('name')
      table.string('type')
      table.string('subtype')
      table.timestamps()
    })
  }

  down() {
    this.drop('files')
  }
}

module.exports = FileSchema
