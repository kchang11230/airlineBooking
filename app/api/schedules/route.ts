import { connectDB } from "@/lib/mongodb";

async function getDate(
    params: URLSearchParams,
    key: string,
    defv: string
) {

    const dateStr = params.get(key);

    if (dateStr) {
        return new Date(dateStr);
    } else {
        return new Date(defv);
    }
}

export async function GET(request: Request) {

    const params = new URL(request.url).searchParams;

    const orig = params.get("orig");

    const dest = params.get("dest");

    const dt1 = await getDate(
        params,
        "date1",
        "2026-01-01"
    );

    const dt2 = await getDate(
        params,
        "date2",
        "2026-12-31"
    );

    const db = await connectDB();

    const origDoc = await db
        .collection("airports")
        .findOne({ code: orig });

    const destDoc = await db
        .collection("airports")
        .findOne({ code: dest });

    const query = {
        orig: orig,
        dest: dest,
        depDate: {
            $gte: dt1,
            $lte: dt2
        }
    };

    const schedules = await db
        .collection("schedules")
        .find(query)
        .toArray();

    const entries = [];

    for (const doc of schedules) {

        const avail =
            doc.bookings.length < doc.seats;

        const entry = {
            _id: doc._id,
            flight_no: doc.flightNo,
            depDate: doc.depDate,
            arrDate: doc.arrDate,
            seats_avail: avail
        };

        entries.push(entry);
    }

    const response = {

        orig: origDoc,

        dest: destDoc,

        date_search: {
            from: dt1,
            to: dt2
        },

        entries: entries
    };

    return Response.json(response);
}