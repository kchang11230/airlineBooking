import { connectDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(request: Request) {

    const body = await request.json();

    const scheduleId = body.scheduleId;

    const passengerId = body.passengerId;

    const db = await connectDB();

    const schedules = db.collection("schedules");

    const schedule = await schedules.findOne({
        _id: new ObjectId(scheduleId)
    });

    if (!schedule) {

        return Response.json(
            { error: "Flight not found" },
            { status: 404 }
        );
    }

    await schedules.updateOne(
        {
            _id: new ObjectId(scheduleId)
        },
        {
            $pull: {
                bookings: {
                    passengerId:
                        new ObjectId(passengerId)
                }
            }
        }
    );

    return Response.json({
        success: true
    });
}