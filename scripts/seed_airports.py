from pymongo import MongoClient
from db_config import uri

client = MongoClient(uri)

db = client["airline"]

collection = db["airports"]

airports = [
    {
        "name": "Dairy Flat Airport",
        "code": "NZNE",
        "region": "Auckland North Shore",
        "tz": "Pacific/Auckland"
    },
    {
        "name": "Rotorua Airport",
        "code": "NZRO",
        "region": "Rotorua / Bay of Plenty",
        "tz": "Pacific/Auckland"
    },
    {
        "name": "Tuuta Airport",
        "code": "NZCI",
        "region": "Chatham Islands",
        "tz": "Pacific/Chatham"
    },
    {
        "name": "Claris Airport",
        "code": "NZGB",
        "region": "Great Barrier Island",
        "tz": "Pacific/Auckland"
    },
    {
        "name": "Lake Tekapo Airport",
        "code": "NZTL",
        "region": "Mackenzie District",
        "tz": "Pacific/Auckland"
    },
    {
        "name": "Sydney Kingsford-Smith Airport",
        "code": "YSSY",
        "region": "Sydney",
        "tz": "Australia/Sydney"
    }
]

collection.insert_many(airports)

print("Airports inserted successfully")

client.close()