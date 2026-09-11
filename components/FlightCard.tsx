// "use client";

// import Link from "next/link";
// import dayjs from "@/lib/dayjs";

// function getTimezoneLabel(tz: string) {

//   switch (tz) {

//     case "Pacific/Auckland":
//       return "GMT+12";

//     case "Pacific/Chatham":
//       return "GMT+12:45";

//     case "Australia/Sydney":
//       return "GMT+10";

//     default:
//       return tz;
//   }
// }

// export default function FlightCard({flight, hideButton = false, hideAvailability = false, bookingRef}: any){

//   const depTime = dayjs(flight.depDate)
//     .tz(flight.orig_tz)
//     .format("HH:mm");

//   const depDateStr = dayjs(flight.depDate)
//     .tz(flight.orig_tz)
//     .format("MMM DD");

//   const arrTime = dayjs(flight.arrDate)
//     .tz(flight.dest_tz)
//     .format("HH:mm");

//   const arrDateStr = dayjs(flight.arrDate)
//     .tz(flight.dest_tz)
//     .format("MMM DD");

//   const durationMinutes = dayjs(flight.arrDate).diff(
//     dayjs(flight.depDate),
//     "minute"
//   );

//   const durationHours = Math.floor(durationMinutes / 60);
//   const durationRemainMinutes = durationMinutes % 60;

//   return (

//     <div className="
//       bg-white rounded-2xl
//       shadow-sm hover:shadow-lg
//       transition duration-300
//       border border-gray-200
//       p-6
//     ">
// {bookingRef && (
//               <p className="
//                 text-xs text-gray-900
//                 font-semibold mt-2
//               ">
//                 Ref: {bookingRef}
//               </p>
//             )}
//       <div className="flex items-center justify-between">

//         {/* LEFT */}
//         <div className="flex items-center gap-10">

//           {/* Departure */}
//           <div>

//             <p className="text-4xl font-bold text-gray-900">
//               {depTime}
//             </p>
//             <p className="text-sm text-gray-500 mt-1">
//               {depDateStr}
//             </p>

//             <p className="text-sm text-gray-500">
//               {flight.orig_name}
//             </p>

//             <p className="text-sm text-blue-600">
//               {getTimezoneLabel(flight.orig_tz)}
//             </p>

//           </div>

//           {/* Flight Line */}
//           <div className="flex flex-col items-center min-w-[160px]">

//             <p className="text-sm text-gray-500">
//               {durationHours}h {durationRemainMinutes}m
//             </p>

//             <div className="w-full h-[2px] bg-gray-300 my-2 relative">

//               <div className="
//                 absolute -top-1 right-0
//                 w-3 h-3 rounded-full
//                 bg-blue-600
//               " />

//             </div>

//             <p className="text-sm text-gray-500">
//               {flight.flight_no}
//             </p>

//           </div>

//           {/* Arrival */}
//           <div>

//             <p className="text-4xl font-bold text-gray-900">
//               {arrTime}
//             </p>

//             <p className="text-sm text-gray-500 mt-1">
//               {arrDateStr}
//             </p>

//             <p className="text-sm text-gray-500">
//               {flight.dest_name}
//             </p>

//             <p className="text-sm text-blue-600">
//               {getTimezoneLabel(flight.dest_tz)}
//             </p>

//           </div>

//         </div>

//         {/* RIGHT */}
//         <div className="text-right">

//           {!hideAvailability && (
//             <p
//               className={`
//                 text-sm font-semibold
//                 mb-2
//                 ${
//                   flight.seats_avail
//                     ? "text-green-600"
//                     : "text-red-500"
//                 }
//               `}
//             >
//               {flight.seats_avail
//                 ? "Seats available"
//                 : "Flight full"}
//             </p>
//           )}

//           <p className="text-3xl font-bold text-[#002b5c]">
//             ${flight.price}
//           </p>

//           <p className="text-sm text-gray-500 mb-4">
//             per passenger
//           </p>

//           {!hideButton && (
//             <>
//               {flight.seats_avail ? (
//                 <Link
//                   href={`/booking/${flight._id}`}
//                   className="
//                     inline-block
//                     bg-[#0071c2]
//                     hover:bg-[#005fa3]
//                     text-white
//                     px-6 py-3
//                     rounded-xl
//                     font-semibold
//                     transition
//                   "
//                 >
//                   Select
//                 </Link>
//               ) : (
//                 <button
//                   disabled
//                   className="
//                     inline-block
//                     bg-gray-300
//                     text-gray-500
//                     px-6 py-3
//                     rounded-xl
//                     font-semibold
//                     cursor-not-allowed
//                   "
//                 >
//                   Full
//                 </button>
//               )}
//             </>
//           )}

//         </div>

//       </div>

//     </div>
//   );
// }

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

export default function FlightCard({
  flight,
  hideButton = false,
  hideAvailability = false,
  bookingRef,
}: any) {
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
    <div
      className="
        w-full
        max-w-full
        overflow-hidden
        bg-white
        rounded-2xl
        shadow-sm
        hover:shadow-lg
        transition
        duration-300
        border
        border-gray-200
        p-4
        sm:p-5
        md:p-6
      "
    >
      {/* Booking Reference */}
      {bookingRef && (
        <p className="text-xs text-gray-900 font-semibold mb-4">
          Ref: {bookingRef}
        </p>
      )}

      {/* =========================
          MAIN CONTENT
          ========================= */}
      <div
        className="
          flex
          flex-col
          gap-6
          md:flex-row
          md:items-center
          md:justify-between
        "
      >
        {/* =========================
            FLIGHT INFORMATION
            ========================= */}
        <div
          className="
            flex
            items-center
            justify-between
            w-full
            min-w-0
            gap-2
            sm:gap-4
            md:gap-6
            lg:gap-10
          "
        >
          {/* =====================
              DEPARTURE
              ===================== */}
          <div className="flex-1 min-w-0">
            <p
              className="
                text-2xl
                sm:text-3xl
                md:text-4xl
                font-bold
                text-gray-900
              "
            >
              {depTime}
            </p>

            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              {depDateStr}
            </p>

            <p
              className="
                text-xs
                sm:text-sm
                text-gray-500
                truncate
              "
              title={flight.orig_name}
            >
              {flight.orig_name}
            </p>

            <p className="text-xs sm:text-sm text-blue-600">
              {getTimezoneLabel(flight.orig_tz)}
            </p>
          </div>

          {/* =====================
              FLIGHT LINE
              ===================== */}
          <div
            className="
              flex
              flex-col
              items-center
              flex-1
              min-w-0
              max-w-[120px]
              sm:max-w-[150px]
              md:max-w-[180px]
            "
          >
            <p
              className="
                text-xs
                sm:text-sm
                text-gray-500
                whitespace-nowrap
              "
            >
              {durationHours}h {durationRemainMinutes}m
            </p>

            <div
              className="
                w-full
                h-[2px]
                bg-gray-300
                my-2
                relative
              "
            >
              <div
                className="
                  absolute
                  -top-1
                  right-0
                  w-3
                  h-3
                  rounded-full
                  bg-blue-600
                "
              />
            </div>

            <p
              className="
                text-xs
                sm:text-sm
                text-gray-500
                truncate
                max-w-full
              "
              title={flight.flight_no}
            >
              {flight.flight_no}
            </p>
          </div>

          {/* =====================
              ARRIVAL
              ===================== */}
          <div className="flex-1 min-w-0 text-right">
            <p
              className="
                text-2xl
                sm:text-3xl
                md:text-4xl
                font-bold
                text-gray-900
              "
            >
              {arrTime}
            </p>

            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              {arrDateStr}
            </p>

            <p
              className="
                text-xs
                sm:text-sm
                text-gray-500
                truncate
              "
              title={flight.dest_name}
            >
              {flight.dest_name}
            </p>

            <p className="text-xs sm:text-sm text-blue-600">
              {getTimezoneLabel(flight.dest_tz)}
            </p>
          </div>
        </div>

        {/* =========================
            PRICE / AVAILABILITY
            ========================= */}
        <div
          className="
            w-full
            md:w-auto
            md:min-w-[150px]
            border-t
            md:border-t-0
            pt-4
            md:pt-0
            flex
            items-center
            justify-between
            md:block
            md:text-right
          "
        >
          {/* Price Information */}
          <div>
            {!hideAvailability && (
              <p
                className={`
                  text-xs
                  sm:text-sm
                  font-semibold
                  mb-1
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

            <p
              className="
                text-2xl
                sm:text-3xl
                font-bold
                text-[#002b5c]
              "
            >
              ${flight.price}
            </p>

            <p className="text-xs sm:text-sm text-gray-500">
              per passenger
            </p>
          </div>

          {/* Button */}
          {!hideButton && (
            <div className="md:mt-4">
              {flight.seats_avail ? (
                <Link
                  href={`/booking/${flight._id}`}
                  className="
                    inline-block
                    bg-[#0071c2]
                    hover:bg-[#005fa3]
                    text-white
                    px-4
                    py-2
                    sm:px-6
                    sm:py-3
                    rounded-xl
                    font-semibold
                    text-sm
                    sm:text-base
                    whitespace-nowrap
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
                    px-4
                    py-2
                    sm:px-6
                    sm:py-3
                    rounded-xl
                    font-semibold
                    text-sm
                    sm:text-base
                    cursor-not-allowed
                  "
                >
                  Full
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}