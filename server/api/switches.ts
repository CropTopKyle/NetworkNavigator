import { db } from '../database'
import { switches } from '../database/schema'

export default defineEventHandler(async (event) => {
  try {
    const allSwitches = await db.select().from(switches)
    return allSwitches
  } catch (error) {
    console.error('Error fetching switches:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
