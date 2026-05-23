"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import FlightCard from "@/components/FlightCard";

export default function MyBookingsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/passenger?id=${id}`);
      const json = await res.json();
      setData(json);
    }

    fetchData();
  }, [id]);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
            {/* Header */}
      <div className="bg-[#002b5c] text-white">

        <div className="max-w-6xl mx-auto px-6 py-8">

          <div className="flex items-center justify-between">

            <div>

              <h1 className="text-4xl font-bold">
                My Bookings
              </h1>

            </div>

          </div>

        </div>

      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">

        {data.bookings.map((b: any) => (
        <div
            key={b.bookingRef}
            onClick={() => router.push(`/invoice/${b.bookingRef}`)}
            className="space-y-5 mb-8 cursor-pointer hover:shadow-lg transition"
        >
            <FlightCard
            flight={b.flight}
            bookingRef={b.bookingRef}
            hideButton={true}
            hideAvailability={true}
            />
        </div>
        ))}

      </div>

    </div>
  );
}