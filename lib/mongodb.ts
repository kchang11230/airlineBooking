import { MongoClient } from "mongodb";

const URI = process.env.MONGODB_URI!;

const DB_NAME = "airline";

const client = new MongoClient(URI);

export async function connectDB() {

    await client.connect();

    return client.db(DB_NAME);
}