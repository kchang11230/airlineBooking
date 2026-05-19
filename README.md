# Airline Booking System

## Run Project

npm install

npm run dev

---

## MongoDB Collections

- airports
- passengers
- schedules

---

## APIs

### Search Flights

GET /api/schedules

Example:

/api/schedules?orig=NZNE&dest=YSSY&date1=2026-06-01&date2=2026-06-30

---

### Book Flight

POST /api/book

Body:

{
  "scheduleId":"...",
  "passengerId":"..."
}

---

### Cancel Booking

POST /api/cancel

Body:

{
  "scheduleId":"...",
  "passengerId":"..."
}

---

### Passenger Bookings

GET /api/passenger?id=...

---

## Seed Scripts

py scripts/seed_airports.py

py scripts/seed_passengers.py

py scripts/generate_schedules.py
