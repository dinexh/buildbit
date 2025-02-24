import { MongoClient } from 'mongodb'

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local')
}

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)

// Database Name
const dbName = 'buildbit'

async function connectToDb() {
  try {
    await client.connect()
    console.log('Connected successfully to MongoDB')
    return client.db(dbName)
  } catch (error) {
    console.error('MongoDB connection error:', error)
    throw error
  }
}

const db = await connectToDb()
export default db