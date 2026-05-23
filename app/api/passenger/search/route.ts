import { connectDB } from "@/lib/mongodb";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const firstname = searchParams.get("firstname");
  const lastname = searchParams.get("lastname");
  const email = searchParams.get("email");

  if (!firstname || !lastname || !email) {
    return Response.json(
      { error: "Missing fields" },
      { status: 400 }
    );
  }

  const db = await connectDB();
  const passengers = db.collection("passengers");

  const user = await passengers.findOne({
    firstname,
    lastname,
    email,
  });

  if (!user) {
    return Response.json(
      { error: "User not found" },
      { status: 404 }
    );
  }

  return Response.json(user);
}