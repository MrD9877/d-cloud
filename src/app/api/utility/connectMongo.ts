import mongoose from "mongoose";
import { Db } from "mongodb";

export const runtime = "nodejs";

type Connection = { isConnected: number; db: Db | null };
const connection: Connection = { isConnected: 0, db: null };

async function dbConnect() {
  if (connection.isConnected) {
    return mongoose.connection;
  }
  try {
    const db = await mongoose.connect("mongodb+srv://dhuruvbansl99:Shubham123@cluster0.jos6q.mongodb.net/d-cloud");
    connection.isConnected = db.connections[0].readyState;
    return db;
  } catch (e) {
    console.log(e);
    process.exit();
    // return new Response("Internal Server Error", { status: 500 });
  }
}

export default dbConnect;
