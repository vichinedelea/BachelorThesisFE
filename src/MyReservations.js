import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetch("https://localhost:7277/api/Reservations/myReservations", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(data => {
        setReservations(data);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    await fetch(`https://localhost:7277/api/Reservations/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setReservations(prev => prev.filter(r => r.id !== id));
  };

  if (loading) {
    return <p className="text-center mt-5">Loading reservations...</p>;
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Reservations</h2>
        <button
          className="btn btn-success"
          onClick={() => navigate("/reservation")}
        >
          New Reservation
        </button>
      </div>

      {reservations.length === 0 ? (
        <p>You have no reservations.</p>
      ) : (
        <div className="list-group">
          {reservations.map(r => {
            const date = new Date(r.reservationDate);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            return (
              <div
                key={r.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>
                    {day}.{month}.{year}
                  </strong>{" "}
                  – {r.reservationHour}:00
                  <br />
                  Number of persons: {r.people}
                </div>

                <button
                  className="btn btn-danger btn-sm"
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
  );
};

export default MyReservations;
