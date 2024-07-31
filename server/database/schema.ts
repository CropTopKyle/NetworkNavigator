import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const switches = sqliteTable('switches', {
  id: integer('id').primaryKey(),
  IDF: text('IDF'),
  hostname: text('hostname'),
  location: text('location'),
  notes: text('notes'),
})

export const vlans = sqliteTable('vlans', {
  id: integer('id').primaryKey(),
  vlanId: integer('vlan_id').unique(),
  networkRange: text('network_range'),
})
