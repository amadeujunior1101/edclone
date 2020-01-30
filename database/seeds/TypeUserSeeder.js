"use strict";

const Database = use("Database");

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

class TypeUserSeeder {
  async run() {
    await Database.table("type_users").insert([
      { id: 1, name: "PROFESSOR" },
      { id: 2, name: "ALUNO" }
    ]);
  }
}

module.exports = TypeUserSeeder;