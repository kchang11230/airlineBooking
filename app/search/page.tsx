"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import FlightCard from "@/components/FlightCard";

export default function SearchPage() {

  const params = useSearchParams();

  const orig = params.get("orig");
  const dest = params.get("dest");
  const date1 = params.get("date1");
  const date2 = params.get("date2");

  const [flights, setFlights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function fetchFlights() {

      setLoading(true);

      const res = await fetch(
        `/api/schedules?orig=${orig}&dest=${dest}&date1=${date1}&date2=${date2}`
      );

      const data = await res.json();

      setFlights(data.entries || []);

      setLoading(false);
    }

    fetchFlights();

  }, [orig, dest, date1, date2]);

  return (

    <div className="min-h-screen bg-[#f5f7fa]">

      {/* Header */}
      <div className="bg-[#002b5c] text-white">

        <div className="max-w-6xl mx-auto px-6 py-8">

          <div className="flex items-center justify-between">

            <div>

              <h1 className="text-4xl font-bold">
                Select your flights
              </h1>

              <p className="mt-2 text-blue-100 text-lg">
                {orig} → {dest}
              </p>

            </div>

            <div className="text-right text-sm text-blue-100">

              <p>
                Travel dates
              </p>

              <p className="font-semibold">
                {date1} → {date2}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">

        {loading && (

          <div className="bg-white rounded-2xl p-8 shadow-sm">

            <p className="text-gray-500">
              Searching flights...
            </p>

          </div>
        )}

        {!loading && flights.length === 0 && (

          <div className="bg-white rounded-2xl p-8 shadow-sm">

            <p className="text-gray-500">
              No flights available.
            </p>

          </div>
        )}

        <div className="space-y-5">

          {flights.map((f: any) => (
            <FlightCard
              key={f._id}
              flight={f}
            />
          ))}

        </div>

      </div>

    </div>
  );
}