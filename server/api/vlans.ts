import { db } from '../database'
import { vlans } from '../database/schema'

export default defineEventHandler(async () => {
  try {
    const allVlans = db.select().from(vlans).all()
    return allVlans
  } catch (error) {
    console.error('Error fetching switches:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
