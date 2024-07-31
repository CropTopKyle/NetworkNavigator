import { drizzle } from 'drizzle-orm/better-sqlite3'
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import Database from 'better-sqlite3'
import * as schema from './schema'

const sqlite = new Database('sqlite.db')
export const db = drizzle(sqlite, { schema })

// Run migrations
migrate(db, { migrationsFolder: './server/database/migrations' }).catch(
  (error) => {
    console.error('Error applying migrations:', error)
  }
)

// Export a default function for Nitro to use as a plugin
export default () => {
  // You can add any initialization logic here if needed
  console.log('Database initialized')
}
