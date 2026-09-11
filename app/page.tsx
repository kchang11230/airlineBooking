"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {

  const router = useRouter();

  const [orig, setOrig] = useState("");
  const [dest, setDest] = useState("");
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");

  const [origOpen, setOrigOpen] = useState(false);
  const [destOpen, setDestOpen] = useState(false);
  const [airports, setAirports] = useState<any[]>([]);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function loadAirports() {
      const res = await fetch("/api/airports");
      const data = await res.json();
      setAirports(data);
    }

    loadAirports();
  }, []);

  const search = () => {
    router.push(
      `/search?orig=${orig.toUpperCase()}&dest=${dest.toUpperCase()}&date1=${date1}&date2=${date2}`
    );
  };

  const filterAirports = (input: string) => {
    if (!input) return [];

    return airports.filter((a) =>
      a.code.toLowerCase().includes(input.toLowerCase()) ||
      a.name.toLowerCase().includes(input.toLowerCase())
    );
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      
      {/* HEADER */}
      <div className="bg-[#002b5c] text-white">

        <div className="max-w-6xl mx-auto px-6 py-8">

          <h1 className="text-4xl font-bold">
            Dairy Flat Airlines
          </h1>

        </div>

      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Main Content */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

  {/* LEFT SIDE - SEARCH */}
  <div className="lg:col-span-2">

    <div className="
      bg-white rounded-2xl
      shadow-sm border
      border-gray-200
      p-8
    ">

      <h2 className="text-2xl font-bold mb-6">
        Search Flights
      </h2>

      <div className="flex gap-4 items-center">

        {/* LEFT SIDE INPUTS */}
        <div className="flex-1 space-y-3">

          {/* Origin */}
          <div className="relative">

            <input
              className="
                border p-3 w-full rounded-xl
                focus:outline-none focus:ring-2 focus:ring-blue-400
                transition hover:border-blue-400
              "
              placeholder="Origin (e.g. NZNE or Dairy Flat)"
              value={orig}
              onChange={(e) => {
                setOrig(e.target.value);
                setOrigOpen(true);
              }}
              onFocus={() => setOrigOpen(true)}
            />

            {origOpen && orig && (
              <div className="
                absolute z-20 w-full bg-white border
                rounded-xl mt-1 shadow-lg
                max-h-60 overflow-auto
              ">

                {filterAirports(orig).map((a) => (
                  <div
                    key={a.code}
                    className="p-3 hover:bg-blue-50 cursor-pointer"
                    onClick={() => {
                      setOrig(a.code);
                      setOrigOpen(false);
                    }}
                  >
                    <div className="font-semibold">
                      {a.code}
                    </div>

                    <div className="text-sm text-gray-500">
                      {a.name} — {a.region}
                    </div>
                  </div>
                ))}

              </div>
            )}

          </div>

          {/* Destination */}
          <div className="relative">

            <input
              className="
                border p-3 w-full rounded-xl
                focus:outline-none focus:ring-2 focus:ring-blue-400
                transition hover:border-blue-400
              "
              placeholder="Destination (e.g. YSSY or Sydney)"
              value={dest}
              onChange={(e) => {
                setDest(e.target.value);
                setDestOpen(true);
              }}
              onFocus={() => setDestOpen(true)}
            />

            {destOpen && dest && (
              <div className="
                absolute z-20 w-full bg-white border
                rounded-xl mt-1 shadow-lg
                max-h-60 overflow-auto
              ">

                {filterAirports(dest).map((a) => (
                  <div
                    key={a.code}
                    className="p-3 hover:bg-blue-50 cursor-pointer"
                    onClick={() => {
                      setDest(a.code);
                      setDestOpen(false);
                    }}
                  >
                    <div className="font-semibold">
                      {a.code}
                    </div>

                    <div className="text-sm text-gray-500">
                      {a.name} — {a.region}
                    </div>
                  </div>
                ))}

              </div>
            )}

          </div>

        </div>

        {/* SWAP BUTTON */}
        <button
          onClick={() => {
            const temp = orig;
            setOrig(dest);
            setDest(temp);
          }}
          className="
            bg-blue-600 text-white
            rounded-full w-12 h-12
            flex items-center justify-center
            shadow-md
            hover:bg-blue-700
            hover:rotate-180
            hover:scale-105
            transition duration-300
            flex-shrink-0
          "
        >
          ⇅
        </button>

      </div>

      {/* Dates */}
      {/* <div className="grid grid-cols-2 gap-4 mt-6">

        <input
          type="date"
          className="
            border p-3 w-full rounded-xl
            focus:outline-none focus:ring-2 focus:ring-blue-400
          "
          onChange={(e) => setDate1(e.target.value)}
        />

        <input
          type="date"
          className="
            border p-3 w-full rounded-xl
            focus:outline-none focus:ring-2 focus:ring-blue-400
          "
          onChange={(e) => setDate2(e.target.value)}
        />

      </div> */}
      {/* Dates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Departure Earliest Date
          </label>

          <input
            type="date"
            value={date1}
            onChange={(e) => setDate1(e.target.value)}
            className="
              block
              w-full
              min-w-0
              h-12
              px-4
              py-2
              bg-white
              text-gray-900
              border
              border-gray-300
              rounded-xl
              appearance-none
              focus:outline-none
              focus:ring-2
              focus:ring-blue-400
              focus:border-blue-400
            "
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Departure Latest Date
          </label>

          <input
            type="date"
            value={date2}
            onChange={(e) => setDate2(e.target.value)}
            className="
              block
              w-full
              min-w-0
              h-12
              px-4
              py-2
              bg-white
              text-gray-900
              border
              border-gray-300
              rounded-xl
              appearance-none
              focus:outline-none
              focus:ring-2
              focus:ring-blue-400
              focus:border-blue-400
            "
          />
        </div>

      </div>

      {/* Search Button */}
      <button
        onClick={search}
        className="
          w-full mt-6
          bg-blue-600 text-white py-3 rounded-xl font-semibold
          transition transform hover:scale-[1.02]
          hover:bg-blue-700
          active:scale-95
          shadow-md hover:shadow-xl
        "
      >
        Search Flights
      </button>

      {/* Route Map */}
      {orig && dest && (
        <div className="mt-8">

          <h2 className="text-sm text-gray-500 mb-3">
            Great Circle Route
          </h2>

          <img
            className="w-full max-w-md mx-auto rounded-2xl border"
            src={`https://images.weserv.nl/?url=www.gcmap.com/map?P=${orig.toUpperCase()}-${dest.toUpperCase()}`}
            alt="route map"
          />

        </div>
      )}

    </div>

  </div>

  {/* RIGHT SIDE - MY BOOKINGS */}
  <div>

    <div className="
      bg-white rounded-2xl
      shadow-sm border
      border-gray-200
      p-6 sticky top-6
    ">

      <h2 className="text-xl font-bold mb-5">
        My Bookings
      </h2>

      <div className="space-y-3">

        <input
          className="border p-3 w-full rounded-xl"
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />

        <input
          className="border p-3 w-full rounded-xl"
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />

        <input
          className="border p-3 w-full rounded-xl"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={async () => {
            if (!firstname || !lastname || !email) return;

            const res = await fetch(
              `/api/passenger/search?firstname=${firstname}&lastname=${lastname}&email=${email}`
            );

            const json = await res.json();

            if (!res.ok || !json?._id) {
              alert("User not found");
              return;
            }

            router.push(`/my-bookings/${json._id}`);
          }}
          className="
            w-full
            bg-[#0071c2]
            hover:bg-[#005fa3]
            text-white
            py-3
            rounded-xl
            font-semibold
            transition
          "
        >
          View My Bookings
        </button>

      </div>

    </div>

  </div>

</div>

      </div>

    </div>
  );
}
