import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
 protected tableName = 't_teacher'
 async up() {
 this.schema.createTable(this.tableName, (table) => {
 table.increments('id')
 table.string('gender', 1).notNullable().defaultTo('W') // Valeur par défaut W for woman
 table.string('firstname').notNullable()
 table.string('lastname').notNullable()
 table.string('nickname').notNullable()
 table.string('origine').notNullable()
 table
 .integer('section_id') // Clé étrangère
 .unsigned() // La clé ne doit pas être négative
 .references('id') // Référence la colonne `id` de la table `section`
 .inTable('t_section') // Nom de la table de référence
 .onDelete('CASCADE') // Supprime les teachers si la section est supprimée
 .onUpdate('CASCADE') // Met à jour la clé étrangère si l'id change
 table.timestamp('created_at')
 table.timestamp('updated_at')
 })
 }
 async down() {
 this.schema.dropTable(this.tableName)
 }
}