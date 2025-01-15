import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
export default class Section extends BaseModel {
 // Renommer le nom de la table pour respecter les conventions de nommage de l'ETML
 public static table = 't_section'
 @column({ isPrimary: true })
 declare id: number
 @column()
 declare name: String
 @column.dateTime({ autoCreate: true })
 declare createdAt: DateTime
 @column.dateTime({ autoCreate: true, autoUpdate: true })
 declare updatedAt: DateTime
}
