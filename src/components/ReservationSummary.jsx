import React from 'react';
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import './ReservationSummary.css';

const ReservationSummary = ({ reservation, language }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const locale = language === 'fr' ? fr : enUS;
    return format(date, 'EEEE d MMMM yyyy', { locale });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="reservation-summary" id="reservation-summary">
      <div className="summary-header">
        <h2>Little Lemon</h2>
        <p>Confirmation de réservation</p>
      </div>

      <div className="summary-content">
        <div className="summary-section">
          <h3>Détails de la réservation</h3>
          <p><strong>Date :</strong> {formatDate(reservation.date)}</p>
          <p><strong>Heure :</strong> {reservation.time}</p>
          <p><strong>Nombre de personnes :</strong> {reservation.guests}</p>
          {reservation.occasion && (
            <p><strong>Occasion :</strong> {reservation.occasion}</p>
          )}
        </div>

        <div className="summary-section">
          <h3>Informations personnelles</h3>
          <p><strong>Nom :</strong> {reservation.name}</p>
          <p><strong>Email :</strong> {reservation.email}</p>
          <p><strong>Téléphone :</strong> {reservation.phone}</p>
        </div>

        {reservation.specialRequests && (
          <div className="summary-section">
            <h3>Demandes spéciales</h3>
            <p>{reservation.specialRequests}</p>
          </div>
        )}

        <div className="summary-footer">
          <p>Merci de votre réservation !</p>
          <p>Nous vous attendons avec impatience.</p>
        </div>
      </div>

      <div className="print-button-container">
        <button onClick={handlePrint} className="print-button">
          Imprimer / Sauvegarder en PDF
        </button>
      </div>
    </div>
  );
};

export default ReservationSummary; 