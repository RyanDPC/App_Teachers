/*
|--------------------------------------------------------------------------
| Point d'entrée du serveur HTTP
|--------------------------------------------------------------------------
|
| Le fichier « server.ts » est le point d'entrée pour le démarrage du HTTP AdonisJS
| serveur. Soit vous pouvez exécuter ce fichier directement, soit utiliser le « serve »
| pour exécuter ce fichier et surveiller les modifications de fichier
|
*/

import 'reflect-metadata'
import { Ignitor, prettyPrintError } from '@adonisjs/core'

/**
 * URL de la racine de l'application. AdonisJS en a besoin pour résoudre
 * chemins d'accès aux fichiers et répertoires pour les commandes d'échafaudage
 */
const APP_ROOT = new URL('.. /', import.meta.url)

/**
 * L'importateur est utilisé pour importer des fichiers dans le contexte de la
 *application.
 */
const IMPORTER = (filePath: string) => {
  if (filePath.startsWith('./') || filePath.startsWith('.. /')) {
    return import(new URL(filePath, APP_ROOT).href)
  }
  return import(filePath)
}

new Ignitor(APP_ROOT, { importer: IMPORTER })
  .tap((app) => {
    app.booting(async () => {
      await import('#start/env')
    })
    app.listen('SIGTERM', () => app.terminate())
    app.listenIf(app.managedByPm2, 'SIGINT', () => app.terminate())
  })
  .httpServer()
  .start()
  .catch((erreur) => {
    process.exitCode = 1
    prettyPrintError(erreur)
  })
