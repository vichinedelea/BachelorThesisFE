import React from "react";
import { useNavigate } from "react-router-dom";
import "./Buttons.css";

const BackToMyReservationsButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/myReservations")}
      className="buttonBackToHomePage"
    >
      Back to My Reservations
    </button>
  );
};

export default BackToMyReservationsButton;
