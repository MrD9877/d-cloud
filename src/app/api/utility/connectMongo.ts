import mongoose from "mongoose";
import { Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

type Connection = { isConnected: number; db: Db | null };
const connection: Connection = { isConnected: 0, db: null };

async function dbConnect() {
  if (connection.isConnected) {
    return mongoose.connection;
  }
  try {
    const db = await mongoose.connect(process.env.MONGO_DB_STRING!);
    connection.isConnected = db.connections[0].readyState;
    return db;
  } catch (e) {
    console.log(e);
    process.exit();
    // return new Response("Internal Server Error", { status: 500 });
  }
}

export default dbConnect;
