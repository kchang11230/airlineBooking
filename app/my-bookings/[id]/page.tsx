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
    <div className="p-6 max-w-4xl mx-auto">

      <h1 className="text-2xl font-bold text-center text-blue-700">
        My Bookings
      </h1>

      <div className="space-y-4">

        {data.bookings.map((b: any) => (
        <div
            key={b.bookingRef}
            onClick={() => router.push(`/invoice/${b.bookingRef}`)}
            className="cursor-pointer"
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