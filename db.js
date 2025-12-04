// backend/db.js
import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://user:user123@cluster0.7z0q4mo.mongodb.net/koreantyping?retryWrites=true&w=majority";


let isConnected = false;

export default async function dbConnect() {
  if (isConnected) return mongoose.connection;

  try {
    const conn = await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log("MongoDB connected:", conn.connection.host);
    return conn;
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}
