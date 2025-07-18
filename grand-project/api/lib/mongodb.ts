import mongoose, { ConnectOptions, Mongoose } from "mongoose";

let cached: { conn: Mongoose | null; promise: Promise<Mongoose> | null } = (
  global as any
).mongoose;
if (!cached) cached = (global as any).mongoose = { conn: null, promise: null };

export async function connectToDatabase(): Promise<Mongoose> {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(
        process.env.MONGODB_URI as string,
        {
          serverSelectionTimeoutMS: 5000,
        } as ConnectOptions
      )
      .then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
