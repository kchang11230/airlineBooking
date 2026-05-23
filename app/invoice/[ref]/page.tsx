"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import FlightCard from "@/components/FlightCard";

export default function InvoicePage() {

  const { ref } = useParams();
  const [data, setData] = useState<any>(null);
  const router = useRouter();
  const [cancelLoading, setCancelLoading] =useState(false);

  const cancelBooking = async () => {

    const confirmed = window.confirm(
        "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) return;

    setCancelLoading(true);

    const res = await fetch("/api/booking/cancel",
        {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            bookingRef: ref
        })
        }
    );

    const json = await res.json();

    setCancelLoading(false);

    if (!res.ok) {
        alert(json.error);
        return;
    }

    alert("Booking cancelled");

    router.push("/");
};

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/booking?ref=${ref}`);
      const json = await res.json();
      setData(json);
    }

    fetchData();
  }, [ref]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading booking details...
      </div>
    );
  }

    if (!data?.flight) {
    return (
        <div className="p-6 text-red-500">
        Booking not found
        </div>
    );
    }

  return (

    <div className="min-h-screen bg-[#f5f7fa]">

      {/* HEADER */}
      <div className="bg-[#002b5c] text-white">

        <div className="max-w-6xl mx-auto px-6 py-6">

          <h1 className="text-3xl font-bold">
            Booking confirmed
          </h1>

          <p className="text-blue-100 mt-1">
            Your itinerary and receipt
          </p>

        </div>

      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto p-6">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT - DETAILS */}
          <div className="lg:col-span-2 space-y-6">

            {/* Flight card */}
            <FlightCard flight={data.flight} hideButton={true} hideAvailability={true} bookingRef={ref}/>

            {/* Passenger info */}
            <div className="
              bg-white rounded-2xl
              border shadow-sm
              p-6
            ">

              <h2 className="text-xl font-bold mb-4">
                Passenger details
              </h2>

              <div className="space-y-2 text-gray-700">

                <p>
                  <span className="font-semibold">Name:</span>{" "}
                  {data.passenger.firstname} {data.passenger.lastname}
                </p>

                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  {data.passenger.email}
                </p>

              </div>

            </div>

          </div>

          {/* RIGHT - SUMMARY */}
          <div>

            <div className="
              bg-white rounded-2xl
              border shadow-sm
              p-6 sticky top-6
            ">

              <h2 className="text-xl font-bold mb-5">
                Payment Summary
              </h2>

              <div className="space-y-4 text-sm">

                <div className="flex justify-between">
                  <span className="text-gray-500">Flight</span>
                  <span className="font-semibold">
                    {data.flight.flight_no}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Passengers</span>
                  <span className="font-semibold">1 Adult</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Route</span>
                  <span className="font-semibold">
                    {data.flight.orig} → {data.flight.dest}
                  </span>
                </div>

                <div className="border-t pt-4 flex justify-between items-center">

                  <span className="text-lg font-semibold">
                    Total paid
                  </span>

                  <span className="text-3xl font-bold text-[#002b5c]">
                    ${data.price}
                  </span>

                </div>

              </div>

              <div className="
                mt-6 p-3 rounded-xl
                bg-green-50 text-green-700
                font-semibold text-center
              ">
                Booking Confirmed ✓
              </div>

              <button
                onClick={cancelBooking}
                disabled={cancelLoading}
                className="
                    w-full mt-4
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    py-3 rounded-xl
                    font-semibold
                    transition
                    disabled:opacity-50
                "
                >
                {cancelLoading
                    ? "Cancelling..."
                    : "Cancel Booking"}
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}