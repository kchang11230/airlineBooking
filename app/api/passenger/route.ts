import { connectDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { getPrice } from "@/lib/pricing";

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

    const airports = db.collection("airports");

    const bookings = await schedules.find({

        "bookings.passengerId":
            new ObjectId(passengerId)

    }).toArray();

    //flatten the bookings
    const result = [];

    for (const schedule of bookings) {
        const origAirport = await airports.findOne({ code: schedule.orig });
        const destAirport = await airports.findOne({ code: schedule.dest });
        for (const booking of schedule.bookings) {
            if (booking.passengerId.toString() === passengerId) {
                result.push({
                    bookingRef: booking.bookingRef,
                    flight: {
                        _id: schedule._id,
                        flight_no: schedule.flightNo,
                        orig: schedule.orig,
                        dest: schedule.dest,
                        depDate: schedule.depDate,
                        arrDate: schedule.arrDate,
                        
                        price: getPrice(schedule.orig, schedule.dest),

                        orig_name: origAirport?.name,
                        dest_name: destAirport?.name,

                        orig_tz: origAirport?.tz,
                        dest_tz: destAirport?.tz 
                    }
                });
            }
        }
    }

    return Response.json({

        passenger: passenger,

        bookings: result
    });
}