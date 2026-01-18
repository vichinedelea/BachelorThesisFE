import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackToMyReservationsButton from "./BackToMyReservationsButton";
import "./Reservation.css";

const monthNames = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December"
];

const ALL_HOURS = [10, 11, 12, 13, 14, 15, 16];

const Reservation = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [hour, setHour] = useState("");
  const [people, setPeople] = useState(1);
  const [loading, setLoading] = useState(false);

  const [availableDays, setAvailableDays] = useState([]);
  const [availableHours, setAvailableHours] = useState([]);

  // 🔐 redirect dacă nu e logat
  useEffect(() => {
    if (!token) navigate("/logIn");
  }, [navigate, token]);

  // 🔁 resetări
  useEffect(() => {
    setMonth("");
    setDay("");
    setHour("");
    setAvailableDays([]);
    setAvailableHours([]);
  }, [year]);

  useEffect(() => {
    setDay("");
    setHour("");
    setAvailableDays([]);
    setAvailableHours([]);
  }, [month]);

  useEffect(() => {
    setHour("");
    setAvailableHours([]);
  }, [day]);

  // 🔥 FETCH ZILE DISPONIBILE (BACKEND)
  useEffect(() => {
    if (!year || !month) return;

    const fetchAvailableDays = async () => {
      try {
        const response = await fetch(
          `https://localhost:7277/api/Reservations/availability/${year}/${month}/days`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          setAvailableDays([]);
          return;
        }

        const data = await response.json(); // List<int>
        setAvailableDays(data);
      } catch {
        setAvailableDays([]);
      }
    };

    fetchAvailableDays();
  }, [year, month, token]);

  // 🔥 FETCH ORE DISPONIBILE (BACKEND)
  useEffect(() => {
    if (!year || !month || !day) return;

    const fetchAvailableHours = async () => {
      try {
        const response = await fetch(
          `https://localhost:7277/api/Reservations/availability/${year}/${month}/${day}/hours`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          setAvailableHours([]);
          return;
        }

        const data = await response.json();
        setAvailableHours(data.map(x => x.hour));
      } catch {
        setAvailableHours([]);
      }
    };

    fetchAvailableHours();
  }, [year, month, day, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!year || !month || !day || !hour) return;

    setLoading(true);

    const reservation = {
      reservationDate: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
      reservationHour: hour,
      people,
    };

    try {
      const response = await fetch(
        "https://localhost:7277/api/Reservations/addReservation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(reservation),
        }
      );

      if (!response.ok) throw new Error();

      navigate("/myReservations");
    } catch {
      alert("This time slot is already booked");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-image">
      <div className="reservation-card">
        <h2>Create reservation</h2>

        <form onSubmit={handleSubmit}>
          {/* YEAR */}
          <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
            <option value="">Select year</option>
            <option value={2026}>2026</option>
            <option value={2027}>2027</option>
          </select>

          {/* MONTH */}
          <select
            value={month}
            disabled={!year}
            onChange={(e) => setMonth(Number(e.target.value))}
          >
            <option value="">Select month</option>
            {monthNames.map((m, i) => (
              <option key={i} value={i + 1}>{m}</option>
            ))}
          </select>

          {/* DAY – FĂRĂ WEEKEND + WEEKDAY ÎN PARANTEZĂ */}
          <select
            value={day}
            disabled={!month || availableDays.length === 0}
            onChange={(e) => setDay(Number(e.target.value))}
          >
            <option value="">Select day</option>

            {availableDays
              .filter(d => {
                const date = new Date(year, month - 1, d);
                const dow = date.getDay();
                return dow !== 0 && dow !== 6; // ❌ fără weekend
              })
              .map(d => {
                const date = new Date(year, month - 1, d);
                const dayName = date.toLocaleString("en-US", { weekday: "long" });

                return (
                  <option key={d} value={d}>
                    {d} ({dayName})
                  </option>
                );
              })}
          </select>

          {/* HOUR */}
          <select
            value={hour}
            disabled={!day}
            onChange={(e) => setHour(Number(e.target.value))}
          >
            <option value="">Select hour</option>
            {ALL_HOURS.map(h => (
              <option
                key={h}
                value={h}
                disabled={!availableHours.includes(h)}
              >
                {h}:00 {!availableHours.includes(h) ? "(Already booked)" : ""}
              </option>
            ))}
          </select>

          {/* PEOPLE */}
          <select value={people} onChange={(e) => setPeople(Number(e.target.value))}>
            {Array.from({ length: 20 }, (_, i) => i + 1).map(p => (
              <option key={p} value={p}>{p} people</option>
            ))}
          </select>

          <button
            type="submit"
            disabled={loading || !year || !month || !day || !hour}
          >
            {loading ? "Saving..." : "Confirm reservation"}
          </button>
        </form>
      </div>

      <BackToMyReservationsButton />
    </div>
  );
};

export default Reservation;
