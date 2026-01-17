import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyReservations.css";

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/logIn");
      return;
    }

    fetch("https://localhost:7277/api/Reservations/myReservations", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setReservations(data);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/logIn");
      });
  }, [navigate]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    await fetch(`https://localhost:7277/api/Reservations/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setReservations((prev) => prev.filter((r) => r.id !== id));
  };

  if (loading) {
    return <p className="loading-text">Loading reservations...</p>;
  }

  return (
    <div className="bg-image">
      <div className="reservations-card">
        <div className="reservations-header">
          <h2>My Reservations</h2>
          <button
            className="primary-btn"
            onClick={() => navigate("/reservation")}
          >
            New Reservation
          </button>
        </div>

        {reservations.length === 0 ? (
          <p className="empty-text">You have no reservations.</p>
        ) : (
          <div className="reservations-list">
            {reservations.map((r) => {
              const date = new Date(r.reservationDate);
              const day = date.getDate();
              const month = date.getMonth() + 1;
              const year = date.getFullYear();

              return (
                <div key={r.id} className="reservation-item">
                  <div>
                    <strong>
                      {day}.{month}.{year}
                    </strong>{" "}
                    – {r.reservationHour}:00
                    <br />
                    Persons: {r.people}
                  </div>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(r.id)}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReservations;
