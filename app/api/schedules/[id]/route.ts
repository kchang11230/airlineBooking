import { connectDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { getPrice } from "@/lib/pricing";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  const { id } = await params;

  const db = await connectDB();

  const schedule = await db.collection("schedules").findOne({
    _id: new ObjectId(id)
  });

  if (!schedule) {
    return Response.json(
      { error: "Not found" },
      { status: 404 }
    );
  }

  return Response.json({
    ...schedule,
    price: getPrice(schedule.orig, schedule.dest)
  });
}