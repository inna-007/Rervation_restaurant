import React, { useState, useEffect } from 'react';
import { format, addMinutes, isBefore, getDay } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import LanguageSelector from './LanguageSelector';
import ReservationSummary from './ReservationSummary';
import {
  LANGUAGES,
  TRANSLATIONS,
  AVAILABLE_HOURS,
  CLOSED_DAYS,
  MAX_TABLES,
  TABLES_PER_TIME_SLOT,
  ESTIMATED_DURATION,
  MAX_GUESTS_PER_TIME_SLOT
} from '../config/bookingConfig';
import './BookingForm.css';

const BookingForm = () => {
  const [language, setLanguage] = useState(LANGUAGES.FR);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '1',
    name: '',
    email: '',
    phone: '',
    specialRequests: '',
    occasion: 'none'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [availableHours, setAvailableHours] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [tablesAvailable, setTablesAvailable] = useState(MAX_TABLES);
  const [estimatedEndTime, setEstimatedEndTime] = useState('');
  const [globalError, setGlobalError] = useState('');

  const t = TRANSLATIONS[language];

  useEffect(() => {
    if (formData.date) {
      const dayOfWeek = getDay(new Date(formData.date));
      if (CLOSED_DAYS.includes(dayOfWeek)) {
        setAvailableHours([]);
        setErrors(prev => ({
          ...prev,
          date: t.errors.dateClosed
        }));
      } else {
        const hours = [...AVAILABLE_HOURS.lunch, ...AVAILABLE_HOURS.dinner];
        setAvailableHours(hours);
      }
    }
  }, [formData.date, t.errors.dateClosed]);

  useEffect(() => {
    if (formData.date && formData.time && formData.guests) {
      // Simuler une vérification de disponibilité
      const randomAvailable = Math.floor(Math.random() * TABLES_PER_TIME_SLOT);
      setTablesAvailable(randomAvailable);

      // Calculer l'heure de fin estimée
      const startTime = new Date(`${formData.date}T${formData.time}`);
      const duration = ESTIMATED_DURATION[formData.guests];
      const endTime = addMinutes(startTime, duration);
      const locale = language === LANGUAGES.FR ? fr : enUS;
      setEstimatedEndTime(format(endTime, 'HH:mm', { locale }));
    }
  }, [formData.date, formData.time, formData.guests, language]);

  const validateForm = () => {
    const newErrors = {};
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.date) {
      newErrors.date = t.errors.dateRequired;
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      if (isBefore(selectedDate, today)) {
        newErrors.date = t.errors.datePast;
      }
    }

    if (!formData.time) {
      newErrors.time = t.errors.timeRequired;
    } else if (MAX_GUESTS_PER_TIME_SLOT[formData.time] < parseInt(formData.guests)) {
      newErrors.time = t.errors.noTables;
    }

    if (!formData.name.trim()) {
      newErrors.name = t.errors.nameRequired;
    }

    if (!formData.email) {
      newErrors.email = t.errors.emailRequired;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = t.errors.emailInvalid;
    }

    if (!formData.phone) {
      newErrors.phone = t.errors.phoneRequired;
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = t.errors.phoneInvalid;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    if (name === 'date' || name === 'time' || name === 'guests') {
      setShowPreview(true);
    }

    setGlobalError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setGlobalError('');

    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Ici, vous pouvez ajouter la logique pour envoyer les données à votre backend
      console.log('Données du formulaire:', formData);
      
      setShowConfirmation(true);
      setShowSummary(true);
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      setGlobalError(t.errors.technical);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const locale = language === LANGUAGES.FR ? fr : enUS;
    return format(date, 'EEEE d MMMM yyyy', { locale });
  };

  if (showConfirmation && showSummary) {
    return (
      <div className="confirmation-container">
        <div className="confirmation-message">
          <h2>{t.confirmation.title}</h2>
          <p>{t.confirmation.thankYou.replace('{name}', formData.name)}</p>
          <p>{t.confirmation.details
            .replace('{date}', formatDate(formData.date))
            .replace('{time}', formData.time)}</p>
          <p>{t.confirmation.guests.replace('{guests}', formData.guests)}</p>
          <p>{t.confirmation.emailSent}</p>
          <button 
            className="submit-button"
            onClick={() => {
              setShowConfirmation(false);
              setShowSummary(false);
              setFormData({
                date: '',
                time: '',
                guests: '1',
                name: '',
                email: '',
                phone: '',
                specialRequests: '',
                occasion: 'none'
              });
            }}
          >
            {t.confirmation.newReservation}
          </button>
        </div>
        <ReservationSummary reservation={formData} language={language} />
      </div>
    );
  }

  return (
    <div className="booking-form-container">
      <LanguageSelector
        currentLanguage={language}
        onLanguageChange={setLanguage}
      />
      <h2>{t.title}</h2>
      {globalError && (
        <div className="global-error" role="alert">
          {globalError}
        </div>
      )}
      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-group">
          <label htmlFor="date">{t.date}</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={errors.date ? 'error' : ''}
            min={format(new Date(), 'yyyy-MM-dd')}
          />
          {errors.date && <span className="error-message">{errors.date}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="time">{t.time}</label>
          <select
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className={errors.time ? 'error' : ''}
            disabled={!formData.date || availableHours.length === 0}
          >
            <option value="">{t.time}</option>
            {availableHours.map(hour => (
              <option 
                key={hour} 
                value={hour}
                disabled={MAX_GUESTS_PER_TIME_SLOT[hour] < parseInt(formData.guests)}
              >
                {hour}
              </option>
            ))}
          </select>
          {errors.time && <span className="error-message">{errors.time}</span>}
          {formData.time && tablesAvailable > 0 && (
            <span className="availability-message">
              {tablesAvailable} table{tablesAvailable > 1 ? 's' : ''} disponible{tablesAvailable > 1 ? 's' : ''}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="guests">{t.guests}</label>
          <select
            id="guests"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
              <option 
                key={num} 
                value={num}
                disabled={formData.time && MAX_GUESTS_PER_TIME_SLOT[formData.time] < num}
              >
                {num} {num === 1 ? 'personne' : 'personnes'}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="occasion">{t.occasion}</label>
          <select
            id="occasion"
            name="occasion"
            value={formData.occasion}
            onChange={handleChange}
          >
            {Object.entries(t.occasionOptions).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>
        </div>

        {showPreview && formData.date && formData.time && (
          <div className="reservation-preview">
            <h3>Prévisualisation de votre réservation</h3>
            <p>Date : {formatDate(formData.date)}</p>
            <p>Heure : {formData.time}</p>
            <p>Nombre de personnes : {formData.guests}</p>
            {estimatedEndTime && (
              <p>Heure de fin estimée : {estimatedEndTime}</p>
            )}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="name">{t.name}</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">{t.email}</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">{t.phone}</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? 'error' : ''}
            placeholder="0123456789"
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="specialRequests">{t.specialRequests}</label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            rows="4"
            placeholder="Allergies, préférences de table, etc."
          />
        </div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={isSubmitting || tablesAvailable === 0}
        >
          {isSubmitting ? (
            <span className="loading-spinner">{t.loading}</span>
          ) : (
            t.submit
          )}
        </button>
      </form>
    </div>
  );
};

export default BookingForm; 