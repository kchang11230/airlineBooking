import { connectDB } from "@/lib/mongodb";

export async function GET() {
  const db = await connectDB();

  const airports = await db
    .collection("airports")
    .find({})
    .toArray();

  return Response.json(airports);
}