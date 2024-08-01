import { db } from '../database'
import { switches } from '../database/schema'

export default defineEventHandler(async () => {
  try {
    const allSwitches = db.select().from(switches).all()
    return allSwitches
  } catch (error) {
    console.error('Error fetching switches:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
