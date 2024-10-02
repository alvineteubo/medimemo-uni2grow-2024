import React from "react";
import { useNavigate } from "react-router-dom";

export function Medications() {
  const navigate = useNavigate();

  const handleGoToDetails = () => {
    navigate("/medications/details");
  };

  return (
    <div>
      <h1>Medications Page</h1>
      <button onClick={handleGoToDetails}>
        Voir les détails de la médication
      </button>
    </div>
  );
}
