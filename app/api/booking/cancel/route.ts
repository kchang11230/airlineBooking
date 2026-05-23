import { connectDB } from "@/lib/mongodb";

export async function POST(request: Request) {

  const body = await request.json();

  const bookingRef = body.bookingRef;

  if (!bookingRef) {
    return Response.json(
      { error: "Missing booking reference" },
      { status: 400 }
    );
  }

  const db = await connectDB();

  const schedules = db.collection("schedules");

  const result = await schedules.updateOne(
    {
      "bookings.bookingRef": bookingRef
    },
    {
      $pull: {
        bookings: {
          bookingRef: bookingRef
        }
      }
    }as any
  );

  if (result.modifiedCount === 0) {
    return Response.json(
      { error: "Booking not found" },
      { status: 404 }
    );
  }

  return Response.json({
    success: true
  });
}