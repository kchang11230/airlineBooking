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

  const swapAirports = () => {

    const temp = orig;

    setOrig(dest);
    setDest(temp);
  };

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
    <div className="min-h-screen bg-white flex items-center justify-center">

      <div className="bg-white w-[420px] p-6 rounded-2xl shadow-xl space-y-4">

        <h1 className="text-2xl font-bold text-center text-blue-700">
          Dairy Flat Airlines 
        </h1>

        <div className="flex gap-4 items-center">

          {/* LEFT SIDE */}
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

          {/* RIGHT SIDE SWAP BUTTON */}
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

        <input
          type="date"
          className="border p-3 w-full rounded-xl
           focus:outline-none focus:ring-2 focus:ring-blue-400
           transition hover:border-blue-400"
          onChange={(e) => setDate1(e.target.value)}
        />

        <input
          type="date"
          className="border p-3 w-full rounded-xl
           focus:outline-none focus:ring-2 focus:ring-blue-400
           transition hover:border-blue-400"
          onChange={(e) => setDate2(e.target.value)}
        />

        <button
          onClick={search}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold
             transition transform hover:scale-[1.02] hover:bg-blue-700
             active:scale-95 shadow-md hover:shadow-xl"
        >
          Search Flights
        </button>

<div className="space-y-3 mt-4">
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
    className="w-full bg-gray-100 text-blue-700 py-3 rounded-xl font-semibold border border-blue-200 hover:bg-blue-50"
  >
    View My Bookings
  </button>
</div>

      </div>

    </div>
  );
}
