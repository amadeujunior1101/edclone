'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.increments()
      table.string('name', 254).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('token')
      table.string('path_profile_image')
      table.string('ext_profile_image')
      table.timestamp('token_created_at') 
      table
        .integer('type_user_id').notNullable()
        .unsigned()
        .index('type_user_id')
      table
        .foreign('type_user_id')
        .references('type_users.id')
        .onDelete('cascade')
        
      table.timestamps()
    })
  }

  down() {
    this.drop('users')
  }
}

module.exports = UserSchema
