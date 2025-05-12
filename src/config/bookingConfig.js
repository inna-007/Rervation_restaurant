export const LANGUAGES = {
  FR: 'fr',
  EN: 'en'
};

export const TRANSLATIONS = {
  fr: {
    title: 'Réserver une table',
    date: 'Date de réservation',
    time: 'Heure',
    guests: 'Nombre de personnes',
    name: 'Nom complet',
    email: 'Email',
    phone: 'Téléphone',
    specialRequests: 'Demandes spéciales',
    occasion: 'Occasion spéciale',
    occasionOptions: {
      none: 'Aucune',
      birthday: 'Anniversaire',
      business: 'Affaires',
      anniversary: 'Anniversaire de mariage',
      other: 'Autre'
    },
    submit: 'Réserver',
    loading: 'Chargement...',
    confirmation: {
      title: 'Réservation confirmée !',
      thankYou: 'Merci {name} pour votre réservation.',
      details: 'Nous vous attendons le {date} à {time}.',
      guests: 'Nombre de personnes : {guests}',
      emailSent: 'Un email de confirmation vous a été envoyé.',
      newReservation: 'Faire une nouvelle réservation'
    },
    errors: {
      dateRequired: 'La date est requise',
      datePast: 'La date ne peut pas être dans le passé',
      dateClosed: 'Le restaurant est fermé ce jour-là',
      timeRequired: "L'heure est requise",
      noTables: 'Désolé, plus de tables disponibles pour cet horaire',
      nameRequired: 'Le nom est requis',
      emailRequired: "L'email est requis",
      emailInvalid: "Format d'email invalide",
      phoneRequired: 'Le téléphone est requis',
      phoneInvalid: 'Format de téléphone invalide (10 chiffres)',
      technical: 'Une erreur technique est survenue. Veuillez réessayer.'
    }
  },
  en: {
    title: 'Book a Table',
    date: 'Reservation Date',
    time: 'Time',
    guests: 'Number of Guests',
    name: 'Full Name',
    email: 'Email',
    phone: 'Phone',
    specialRequests: 'Special Requests',
    occasion: 'Special Occasion',
    occasionOptions: {
      none: 'None',
      birthday: 'Birthday',
      business: 'Business',
      anniversary: 'Wedding Anniversary',
      other: 'Other'
    },
    submit: 'Book Now',
    loading: 'Loading...',
    confirmation: {
      title: 'Reservation Confirmed!',
      thankYou: 'Thank you {name} for your reservation.',
      details: 'We look forward to seeing you on {date} at {time}.',
      guests: 'Number of guests: {guests}',
      emailSent: 'A confirmation email has been sent to you.',
      newReservation: 'Make a new reservation'
    },
    errors: {
      dateRequired: 'Date is required',
      datePast: 'Date cannot be in the past',
      dateClosed: 'Restaurant is closed on this day',
      timeRequired: 'Time is required',
      noTables: 'Sorry, no tables available for this time slot',
      nameRequired: 'Name is required',
      emailRequired: 'Email is required',
      emailInvalid: 'Invalid email format',
      phoneRequired: 'Phone is required',
      phoneInvalid: 'Invalid phone format (10 digits)',
      technical: 'A technical error occurred. Please try again.'
    }
  }
};

export const AVAILABLE_HOURS = {
  lunch: ['11:30', '12:00', '12:30', '13:00', '13:30', '14:00'],
  dinner: ['19:00', '19:30', '20:00', '20:30', '21:00', '21:30']
};

export const CLOSED_DAYS = [1]; // 1 = Monday

export const MAX_TABLES = 20;
export const TABLES_PER_TIME_SLOT = 5;

export const ESTIMATED_DURATION = {
  1: 60, // 1 hour for 1 person
  2: 90, // 1.5 hours for 2 people
  3: 120, // 2 hours for 3-4 people
  4: 120,
  5: 150, // 2.5 hours for 5-6 people
  6: 150,
  7: 180, // 3 hours for 7-8 people
  8: 180
};

export const MAX_GUESTS_PER_TIME_SLOT = {
  '11:30': 4,
  '12:00': 4,
  '12:30': 6,
  '13:00': 6,
  '13:30': 4,
  '14:00': 4,
  '19:00': 4,
  '19:30': 6,
  '20:00': 8,
  '20:30': 8,
  '21:00': 6,
  '21:30': 4
}; 