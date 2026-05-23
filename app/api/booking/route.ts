import { connectDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { getPrice } from "@/lib/pricing";

export async function GET(request: Request) {

  const params = new URL(request.url).searchParams;
  const ref = params.get("ref");

  if (!ref) {
    return Response.json({ error: "missing ref" }, { status: 400 });
  }

  const db = await connectDB();

  const schedule = await db.collection("schedules").findOne({
    "bookings.bookingRef": ref
  });

  if (!schedule) {
    return Response.json({ error: "not found" }, { status: 404 });
  }

  const booking = schedule.bookings.find(
    (b: any) => b.bookingRef === ref
  );

  // check passenger
  const passenger = await db.collection("passengers").findOne({
    _id: booking.passengerId
  });

  //check airports
  const origAirport = await db
    .collection("airports")
    .findOne({ code: schedule.orig });

  const destAirport = await db
    .collection("airports")
    .findOne({ code: schedule.dest });

  const price = getPrice(schedule.orig, schedule.dest);

  return Response.json({
    bookingRef: ref,

    flight: {
        _id: schedule._id,

        flight_no: schedule.flightNo,

        orig: schedule.orig,
        dest: schedule.dest,

        depDate: schedule.depDate,
        arrDate: schedule.arrDate,

        orig_name: origAirport?.name,
        dest_name: destAirport?.name,

        orig_tz: origAirport?.tz,
        dest_tz: destAirport?.tz,

        seats_avail:
            schedule.bookings.length < schedule.seats,
         
       price 
    },

    passenger: passenger, 

    price
  });
}