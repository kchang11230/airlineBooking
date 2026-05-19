import { connectDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(request: Request) {

    const params = new URL(request.url).searchParams;

    const passengerId = params.get("id");

    if (!passengerId) {

        return Response.json(
            { error: "Passenger id required" },
            { status: 400 }
        );
    }

    const db = await connectDB();

    const passengers = db.collection("passengers");

    const schedules = db.collection("schedules");

    const passenger = await passengers.findOne({
        _id: new ObjectId(passengerId)
    });

    if (!passenger) {

        return Response.json(
            { error: "Passenger not found" },
            { status: 404 }
        );
    }

    const bookings = await schedules.find({

        "bookings.passengerId":
            new ObjectId(passengerId)

    }).toArray();

    return Response.json({

        passenger: passenger,

        bookings: bookings
    });
}