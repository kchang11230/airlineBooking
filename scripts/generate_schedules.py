from pymongo import MongoClient
from db_config import uri

import arrow
import random


tzNZST = 'Pacific/Auckland'
tzCSTZ = 'Pacific/Chatham'
tzAEST = 'Australia/Sydney'

tzd = {
    'NZNE': tzNZST,
    'NZRO': tzNZST,
    'NZGB': tzNZST,
    'NZTL': tzNZST,
    'NZCI': tzCSTZ,
    'YSSY': tzAEST
}


def add_time(dt, deltat_str):

    h, m, s = deltat_str.split(':')

    return dt.shift(
        hours=int(h),
        minutes=int(m),
        seconds=int(s)
    )


def generate_entries(datestart, dayspan, routes, passenger_ids):

    prefix = 'ZZ'

    dt0 = arrow.get(datestart)

    entries = []

    for n in range(dayspan):

        dt = dt0.shift(days=n)

        dow = dt.isoweekday()

        dtstr = str(dt).split('T')[0]

        for tag, orig, dest, depTime, fltTime, seats, opDays in routes:

            if dow not in opDays:
                continue

            flightNo = '{:s}{:03d}'.format(prefix, tag)

            tz1 = tzd[orig]
            tz2 = tzd[dest]

            depDate = arrow.get(
                f'{dtstr}T{depTime}',
                tzinfo=tz1
            )

            arrDate = add_time(depDate, fltTime).to(tz2)

            booking_count = random.randint(0, seats)

            sampled = random.sample(
                passenger_ids,
                booking_count
            )

            bookings = []

            for p in sampled:

                booking = {
                    "passengerId": p["_id"],
                    "bookingRef": f"DF{random.randint(1000,9999)}"
                }

                bookings.append(booking)

            entry = {
                "flightNo": flightNo,
                "orig": orig,
                "dest": dest,
                "depDate": depDate.datetime,
                "arrDate": arrDate.datetime,
                "seats": seats,
                "bookings": bookings
            }

            entries.append(entry)

    return entries


def main(datestart='2026-06-01', dayspan=100):

    routes = [

        # Sydney prestige service
        (1, 'NZNE', 'YSSY', '09:45:00', '3:30:00', 6, (5,)),
        (2, 'YSSY', 'NZNE', '15:30:00', '3:05:00', 6, (7,)),

        # Rotorua shuttle service
        (3, 'NZNE', 'NZRO', '07:00:00', '0:45:00', 4, (1, 2, 3, 4, 5)),
        (4, 'NZRO', 'NZNE', '08:10:00', '0:45:00', 4, (1, 2, 3, 4, 5)),
        (5, 'NZNE', 'NZRO', '16:30:00', '0:45:00', 4, (1, 2, 3, 4, 5)),
        (6, 'NZRO', 'NZNE', '18:30:00', '0:45:00', 4, (1, 2, 3, 4, 5)),

        # Great Barrier Island service
        (7, 'NZNE', 'NZGB', '09:30:00', '0:30:00', 4, (1, 3, 5)),
        (8, 'NZGB', 'NZNE', '09:00:00', '0:30:00', 4, (2, 4, 6)),

        # Chatham Islands service
        (9, 'NZNE', 'NZCI', '11:30:00', '2:00:00', 5, (2, 5)),
        (10, 'NZCI', 'NZNE', '14:00:00', '2:30:00', 5, (3, 6)),

        # Lake Tekapo service
        (11, 'NZNE', 'NZTL', '14:30:00', '1:45:00', 5, (1,)),
        (12, 'NZTL', 'NZNE', '10:00:00', '1:45:00', 5, (2,))
    ]

    client = MongoClient(uri)

    db = client['airline']

    passenger_collection = db['passengers']

    passenger_ids = list(
        passenger_collection.find(
            {},
            {"_id": 1}
        )
    )

    collection = db['schedules']

    entries = generate_entries(
        datestart,
        dayspan,
        routes,
        passenger_ids
    )

    print('Generated:', len(entries), 'schedule entries')

    collection.insert_many(entries)

    print('Schedules inserted successfully')

    client.close()


if __name__ == "__main__":
    main()