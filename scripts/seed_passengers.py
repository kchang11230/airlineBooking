from pymongo import MongoClient
from db_config import uri

def make_passengers():

    checkm = {}

    passengers = []

    fcsv = "scripts/randomnames.csv"

    with open(fcsv) as fin:

        for n, line in enumerate(fin):

            items = line.strip().split(",")

            cid = int(items[0])

            title = items[1]

            firstname = items[2]

            lastname = items[3]

            gender = items[4]

            email = items[5]

            entry = {
                "title": title,
                "firstname": firstname,
                "lastname": lastname,
                "gender": gender,
                "email": email
            }

            if email in checkm:

                print("Warning: Email already exists")

            else:

                passengers.append(entry)

                checkm[email] = entry

    return passengers


def main():

    passengers = make_passengers()

    print(len(passengers))

    client = MongoClient(uri)

    db = client["airline"]

    collection = db["passengers"]

    collection.insert_many(passengers)

    print("Passengers inserted successfully")

    client.close()


if __name__ == "__main__":
    main()