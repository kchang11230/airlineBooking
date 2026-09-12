"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";

export default function BookingPage() {

  const { id } = useParams();

  const router = useRouter();

  const [firstName, setFirst] = useState("");
  const [lastName, setLast] = useState("");
  const [email, setEmail] = useState("");
  
    const [title, setTitle] = useState("");
    const [gender, setGender] = useState("");

  const [loading, setLoading] = useState(false);

  const [flight, setFlight] = useState<any>(null);
  useEffect(() => {
    async function fetchFlight() {
        const res = await fetch(`/api/schedules/${id}`);
        const data = await res.json();
        setFlight(data);
    }

    if (id) fetchFlight();
  }, [id]);

  const book = async () => {

    // Validate passenger information
    if (!title.trim()) {
      alert("Please enter your title.");
      return;
    }

    if (!firstName.trim()) {
      alert("Please enter your first name.");
      return;
    }

    if (!lastName.trim()) {
      alert("Please enter your last name.");
      return;
    }

    if (!gender) {
      alert("Please select your gender.");
      return;
    }

    if (!email.trim()) {
      alert("Please enter your email address.");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      alert("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    // 1. create passenger
    const passengerRes = await fetch(
        "/api/passenger/create",
        {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            firstname: firstName,
            lastname: lastName,
            email: email,
            title: title,
            gender: gender
        })
        }
    );

    const passengerData =
        await passengerRes.json();

    // 2. book flight
    const res = await fetch("/api/book", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },

        body: JSON.stringify({
        scheduleId: id,
        passengerId:
            passengerData.passengerId
        })
    });

    const data = await res.json();

    setLoading(false);

    if (!res.ok) {
        alert(data.error);
        return;
    }

    router.push(`/invoice/${data.bookingRef}`);
 };

  return (

    <div className="min-h-screen bg-[#f5f7fa]">

      {/* HEADER */}
      <div className="bg-[#002b5c] text-white">

        <div className="max-w-6xl mx-auto px-6 py-6">

          <h1 className="text-3xl font-bold">
            Traveller details
          </h1>

          <p className="text-blue-100 mt-1">
            Complete your booking
          </p>

        </div>

      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto p-6">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT FORM */}
          <div className="lg:col-span-2">

            <div className="
              bg-white rounded-2xl
              shadow-sm border
              border-gray-200
              p-8
            ">

              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Passenger information
              </h2>

              <div className="space-y-5">
                {/* Title */}
                <div>
                <label className="block text-sm font-semibold mb-2">
                    Title
                </label>

                <input
                    className="w-full border rounded-xl p-4"
                    placeholder="Mr / Ms / Mrs / Miss"
                    onChange={(e) => setTitle(e.target.value)}
                />
                </div>
                {/* First */}
                <div>

                  <label className="block text-sm font-semibold mb-2">
                    First name
                  </label>

                  <input
                    className="
                      w-full border rounded-xl p-4
                      focus:outline-none
                      focus:ring-2
                      focus:ring-blue-400
                      transition
                    "
                    placeholder="Enter first name"
                    onChange={(e) =>
                      setFirst(e.target.value)
                    }
                  />

                </div>

                {/* Last */}
                <div>

                  <label className="block text-sm font-semibold mb-2">
                    Last name
                  </label>

                  <input
                    className="
                      w-full border rounded-xl p-4
                      focus:outline-none
                      focus:ring-2
                      focus:ring-blue-400
                      transition
                    "
                    placeholder="Enter last name"
                    onChange={(e) =>
                      setLast(e.target.value)
                    }
                  />

                </div>

{/* gender */}
                <div>
                    <label className="block text-sm font-semibold mb-2">
                        Gender
                    </label>

                    <select
                        className="w-full border rounded-xl p-4"
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="">Select</option>
                        <option value="m">Male</option>
                        <option value="f">Female</option>
                    </select>
                </div>

                {/* Email */}
                <div>

                  <label className="block text-sm font-semibold mb-2">
                    Email address
                  </label>

                  <input
                    className="
                      w-full border rounded-xl p-4
                      focus:outline-none
                      focus:ring-2
                      focus:ring-blue-400
                      transition
                    "
                    placeholder="Enter email"
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                  />

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT SUMMARY */}
          <div>

            <div className="
              bg-white rounded-2xl
              shadow-sm border
              border-gray-200
              p-6 sticky top-6
            ">

              <h2 className="text-xl font-bold mb-5">
                Booking summary
              </h2>

              <div className="space-y-4 text-sm">

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Flight
                  </span>

                  <span className="font-semibold">
                    Dairy Flat Airlines
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Passenger
                  </span>

                  <span className="font-semibold">
                    1 Adult
                  </span>

                </div>

                <div className="border-t pt-4">

                  <div className="flex justify-between items-center">

                    <span className="text-lg font-semibold">
                      Total
                    </span>

                    <span className="
                      text-3xl font-bold
                      text-[#002b5c]
                    ">
                      ${flight?.price ?? 0}
                    </span>

                  </div>

                </div>

              </div>

              <button
                onClick={book}
                disabled={loading}
                className="
                  w-full mt-6
                  bg-[#0071c2]
                  hover:bg-[#005fa3]
                  text-white
                  py-4
                  rounded-xl
                  font-semibold
                  transition
                  disabled:opacity-50
                "
              >

                {loading
                  ? "Processing..."
                  : "Continue"}

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}