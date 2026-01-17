import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackToMyReservationsButton from "./BackToMyReservationsButton";
import "./Reservation.css";

const monthNames = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December"
];

const Reservation = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [hour, setHour] = useState("");
  const [people, setPeople] = useState(1);
  const [loading, setLoading] = useState(false);

  // 🔐 protecție – dacă nu e logat
  useEffect(() => {
    if (!token) {
      navigate("/logIn");
    }
  }, [navigate, token]);

  // 🔁 resetări în lanț
  useEffect(() => {
    setMonth("");
    setDay("");
    setHour("");
  }, [year]);

  useEffect(() => {
    setDay("");
    setHour("");
  }, [month]);

  useEffect(() => {
    setHour("");
  }, [day]);

  // 📆 zilele fără weekend (cu nume ENG)
  const getWeekDaysInMonth = () => {
    if (!year || !month) return [];

    const daysInMonth = new Date(year, month, 0).getDate();
    const days = [];

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month - 1, d);
      const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday

      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        const dayName = date.toLocaleString("en-US", {
          weekday: "long",
        });

        days.push({
          value: d,
          label: `${d} (${dayName})`,
        });
      }
    }

    return days;
  };

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
      alert("Error creating reservation");
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
            {monthNames.map((name, index) => (
              <option key={index} value={index + 1}>
                {name}
              </option>
            ))}
          </select>

          {/* DAY */}
          <select
            value={day}
            disabled={!month}
            onChange={(e) => setDay(Number(e.target.value))}
          >
            <option value="">Select day</option>
            {getWeekDaysInMonth().map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>

          {/* HOUR */}
          <select
            value={hour}
            disabled={!day}
            onChange={(e) => setHour(Number(e.target.value))}
          >
            <option value="">Select hour</option>
            {Array.from({ length: 7 }, (_, i) => i + 10).map((h) => (
              <option key={h} value={h}>
                {h}:00
              </option>
            ))}
          </select>

          {/* PEOPLE */}
          <select value={people} onChange={(e) => setPeople(Number(e.target.value))}>
            {Array.from({ length: 20 }, (_, i) => i + 1).map((p) => (
              <option key={p} value={p}>
                {p} people
              </option>
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
