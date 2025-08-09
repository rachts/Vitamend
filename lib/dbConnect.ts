import mongoose from "mongoose"

declare global {
  // eslint-disable-next-line no-var
  var __mongooseCache: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } | undefined
}

const MONGODB_URI = process.env.MONGODB_URI as string

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not set. Add it to your .env.local.")
}

let cached = global.__mongooseCache
if (!cached) {
  cached = global.__mongooseCache = { conn: null, promise: null }
}

export default async function dbConnect() {
  if (cached!.conn) return cached!.conn
  if (!cached!.promise) {
    cached!.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false }).then((m) => m)
  }
  cached!.conn = await cached!.promise
  return cached!.conn
}
