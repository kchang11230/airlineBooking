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

---

## Seed Scripts

py scripts/seed_airports.py

py scripts/seed_passengers.py

py scripts/generate_schedules.py


---

# APIs

---

# 1. Search Airports

Returns all airports.

## Endpoint

GET `/api/airports`

---

# 2. Search Flights

Search available flight schedules.

## Endpoint

GET `/api/schedules`

## Query Parameters

| Parameter | Description |
|---|---|
| orig | Origin airport code |
| dest | Destination airport code |
| date1 | Start date |
| date2 | End date |

## Example

```bash
/api/schedules?orig=NZNE&dest=YSSY&date1=2026-06-01&date2=2026-06-30
```

---

# 3. Create Passenger

Creates a passenger if not already existing.

If passenger already exists, existing passenger ID is returned.

## Endpoint

POST `/api/passenger/create`

## Body

```json
{
  "firstname": "John",
  "lastname": "Smith",
  "email": "john@email.com"
}
```

---

# 4. Search Passenger

Search passenger by firstname, lastname, and email.

## Endpoint

GET `/api/passenger/search`

## Example

```bash
/api/passenger/search?firstname=John&lastname=Smith&email=john@email.com
```

---

# 5. Passenger Bookings

Returns passenger details and all bookings.

## Endpoint

GET `/api/passenger?id=...`

---

# 6. Book Flight

Creates a booking for a passenger.

## Endpoint

POST `/api/book`

## Body

```json
{
  "scheduleId": "...",
  "passengerId": "..."
}
```

---

# 7. Get Booking Details

Returns booking, passenger, and flight information.

## Endpoint

GET `/api/booking?ref=...`

## Example

```bash
/api/booking?ref=DF1748012345678
```

---

# 8. Cancel Booking

Cancels an existing booking.

## Endpoint

POST `/api/booking/cancel`

## Body

```json
{
  "bookingRef": "DF1748012345678"
}
```

---

# Features

- Flight search
- Airport timezone support
- Passenger's invoice management
- Flight booking
- Booking cancellation
- Booking reference generation
- Seat availability tracking
- MongoDB persistence
- REST API architecture