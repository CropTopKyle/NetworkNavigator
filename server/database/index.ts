import { drizzle } from 'drizzle-orm/better-sqlite3'
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import Database from 'better-sqlite3'
import * as schema from './schema'
import { join } from 'path'

const sqlite = new Database(join(process.cwd(), 'sqlite.db'))
export const db = drizzle(sqlite, { schema })

export default defineNitroPlugin(async (nitroApp) => {
  console.log('Initializing database...')

  try {
    await migrate(db, {
      migrationsFolder: join(process.cwd(), 'server/database/migrations'),
    })
    console.log('Database initialized successfully')
  } catch (error) {
    console.error('Error initializing database:', error)
  }
})
