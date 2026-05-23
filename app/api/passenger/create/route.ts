import { connectDB } from "@/lib/mongodb";

export async function POST(request: Request) {

    const body = await request.json();

    const db = await connectDB();

    const passengers = db.collection("passengers");

    // 1. check if this passenger already exists
    const existing = await passengers.findOne({
        firstname: body.firstname,
        lastname: body.lastname,
        email: body.email
    });

    // 2. if exists → return existing passengerId
    if (existing) {
        return Response.json({
            success: true,
            passengerId: existing._id
        });
    }

    // 3. if not exists → create new passenger
    const result = await passengers.insertOne({
        firstname: body.firstname,
        lastname: body.lastname,
        email: body.email
    });

    return Response.json({
        success: true,
        passengerId: result.insertedId
    });
}