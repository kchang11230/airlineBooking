"use client";

import Link from "next/link";
import dayjs from "@/lib/dayjs";

function getTimezoneLabel(tz: string) {

  switch (tz) {

    case "Pacific/Auckland":
      return "GMT+12";

    case "Pacific/Chatham":
      return "GMT+12:45";

    case "Australia/Sydney":
      return "GMT+10";

    default:
      return tz;
  }
}

export default function FlightCard({flight, hideButton = false, hideAvailability = false, bookingRef}: any){

  const depTime = dayjs(flight.depDate)
    .tz(flight.orig_tz)
    .format("HH:mm");

  const depDateStr = dayjs(flight.depDate)
    .tz(flight.orig_tz)
    .format("MMM DD");

  const arrTime = dayjs(flight.arrDate)
    .tz(flight.dest_tz)
    .format("HH:mm");

  const arrDateStr = dayjs(flight.arrDate)
    .tz(flight.dest_tz)
    .format("MMM DD");

  const durationMinutes = dayjs(flight.arrDate).diff(
    dayjs(flight.depDate),
    "minute"
  );

  const durationHours = Math.floor(durationMinutes / 60);
  const durationRemainMinutes = durationMinutes % 60;

  return (

    <div className="
      bg-white rounded-2xl
      shadow-sm hover:shadow-lg
      transition duration-300
      border border-gray-200
      p-6
    ">
{bookingRef && (
              <p className="
                text-xs text-gray-900
                font-semibold mt-2
              ">
                Ref: {bookingRef}
              </p>
            )}
      <div className="flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-10">

          {/* Departure */}
          <div>

            <p className="text-4xl font-bold text-gray-900">
              {depTime}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {depDateStr}
            </p>

            <p className="text-sm text-gray-500">
              {flight.orig_name}
            </p>

            <p className="text-sm text-blue-600">
              {getTimezoneLabel(flight.orig_tz)}
            </p>

          </div>

          {/* Flight Line */}
          <div className="flex flex-col items-center min-w-[160px]">

            <p className="text-sm text-gray-500">
              {durationHours}h {durationRemainMinutes}m
            </p>

            <div className="w-full h-[2px] bg-gray-300 my-2 relative">

              <div className="
                absolute -top-1 right-0
                w-3 h-3 rounded-full
                bg-blue-600
              " />

            </div>

            <p className="text-sm text-gray-500">
              {flight.flight_no}
            </p>

          </div>

          {/* Arrival */}
          <div>

            <p className="text-4xl font-bold text-gray-900">
              {arrTime}
            </p>

            <p className="text-sm text-gray-500 mt-1">
              {arrDateStr}
            </p>

            <p className="text-sm text-gray-500">
              {flight.dest_name}
            </p>

            <p className="text-sm text-blue-600">
              {getTimezoneLabel(flight.dest_tz)}
            </p>

          </div>

        </div>

        {/* RIGHT */}
        <div className="text-right">

          {!hideAvailability && (
            <p
              className={`
                text-sm font-semibold
                mb-2
                ${
                  flight.seats_avail
                    ? "text-green-600"
                    : "text-red-500"
                }
              `}
            >
              {flight.seats_avail
                ? "Seats available"
                : "Flight full"}
            </p>
          )}

          <p className="text-3xl font-bold text-[#002b5c]">
            $399
          </p>

          <p className="text-sm text-gray-500 mb-4">
            per passenger
          </p>

          {!hideButton && (
            <>
              {flight.seats_avail ? (
                <Link
                  href={`/booking/${flight._id}`}
                  className="
                    inline-block
                    bg-[#0071c2]
                    hover:bg-[#005fa3]
                    text-white
                    px-6 py-3
                    rounded-xl
                    font-semibold
                    transition
                  "
                >
                  Select
                </Link>
              ) : (
                <button
                  disabled
                  className="
                    inline-block
                    bg-gray-300
                    text-gray-500
                    px-6 py-3
                    rounded-xl
                    font-semibold
                    cursor-not-allowed
                  "
                >
                  Full
                </button>
              )}
            </>
          )}

        </div>

      </div>

    </div>
  );
}