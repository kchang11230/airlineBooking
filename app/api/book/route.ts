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

    const alreadyBooked =
        schedule.bookings.some(
            (b: any) =>
                b.passengerId.toString() === passengerId
        );

    if (alreadyBooked) {

        return Response.json(
            { error: "Passenger already booked" },
            { status: 400 }
        );
    }

    if (
        schedule.bookings.length >= schedule.seats
    ) {

        return Response.json(
            { error: "Flight full" },
            { status: 400 }
        );
    }

    const bookingRef =
        "DF" +Date.now() +
        Math.floor(
            1000 + Math.random() * 9000
        );

    await schedules.updateOne(
        {
            _id: new ObjectId(scheduleId)
        },
        {
            $push: {
                bookings: {
                    passengerId:
                        new ObjectId(passengerId),

                    bookingRef:
                        bookingRef
                }
            }
        }
    );

    return Response.json({
        success: true,
        bookingRef: bookingRef
    });
}