import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Reservation.css";

const Reservation = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);
  const [hour, setHour] = useState(10);
  const [people, setPeople] = useState(1);
  const [loading, setLoading] = useState(false);

  // 🔐 protecție
  useEffect(() => {
    if (!token) {
      navigate("/logIn");
    }
  }, [navigate, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const reservation = {
      reservationDate: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
      reservationHour: hour,
      people: people,
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

      if (!response.ok) throw new Error("Reservation failed");

      navigate("/myReservations");
    } catch (err) {
      alert("Eroare la creare rezervare");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-image">
      <div className="reservation-card">
        <h2>Creează rezervare</h2>

        <form onSubmit={handleSubmit}>
          {/* YEAR */}
          <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
            <option value={2026}>2026</option>
            <option value={2027}>2027</option>
          </select>

          {/* MONTH */}
          <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <option key={m} value={m}>Luna {m}</option>
            ))}
          </select>

          {/* DAY */}
          <select value={day} onChange={(e) => setDay(Number(e.target.value))}>
            {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
              <option key={d} value={d}>Ziua {d}</option>
            ))}
          </select>

          {/* HOUR */}
          <select value={hour} onChange={(e) => setHour(Number(e.target.value))}>
            {Array.from({ length: 7 }, (_, i) => i + 10).map((h) => (
              <option key={h} value={h}>{h}:00</option>
            ))}
          </select>

          {/* PEOPLE */}
          <select value={people} onChange={(e) => setPeople(Number(e.target.value))}>
            {Array.from({ length: 20 }, (_, i) => i + 1).map((p) => (
              <option key={p} value={p}>{p} persoane</option>
            ))}
          </select>

          <button type="submit" disabled={loading}>
            {loading ? "Se salvează..." : "Confirmă rezervarea"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reservation;
