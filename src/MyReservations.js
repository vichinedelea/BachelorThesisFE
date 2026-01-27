import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackToHomePageButton from "./BackToHomePageButton";
import "./MyReservations.css";

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [reservationToDelete, setReservationToDelete] = useState(null);

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

  const confirmDelete = async () => {
    const token = localStorage.getItem("token");

    await fetch(
      `https://localhost:7277/api/Reservations/${reservationToDelete}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setReservations((prev) =>
      prev.filter((r) => r.id !== reservationToDelete)
    );

    setShowConfirm(false);
    setReservationToDelete(null);
  };

  const handleBackHome = () => {
    localStorage.removeItem("token");
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
            type="button"
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

              return (
                <div key={r.id} className="reservation-item">
                  <div>
                    <strong>
                      {date.getDate()}.{date.getMonth() + 1}.{date.getFullYear()}
                    </strong>{" "}
                    – {r.reservationHour}:00
                    <br />
                    Persons: {r.people}
                  </div>

                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => {
                      setReservationToDelete(r.id);
                      setShowConfirm(true);
                    }}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <div onClick={handleBackHome} className="back-home-wrapper">
          <BackToHomePageButton />
        </div>
      </div>

      {showConfirm && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <p>Are you sure you want to delete this reservation?</p>

            <div className="confirm-buttons">
              <button
                type="button"
                className="yes-btn"
                onClick={confirmDelete}
              >
                Yes
              </button>
              <button
                type="button"
                className="no-btn"
                onClick={() => {
                  setShowConfirm(false);
                  setReservationToDelete(null);
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReservations;
