import React from 'react';
import { LANGUAGES } from '../config/bookingConfig';
import './LanguageSelector.css';

const LanguageSelector = ({ currentLanguage, onLanguageChange }) => {
  return (
    <div className="language-selector" role="group" aria-label="Select language">
      <button
        className={`language-button ${currentLanguage === LANGUAGES.FR ? 'active' : ''}`}
        onClick={() => onLanguageChange(LANGUAGES.FR)}
        aria-pressed={currentLanguage === LANGUAGES.FR}
      >
        FR
      </button>
      <button
        className={`language-button ${currentLanguage === LANGUAGES.EN ? 'active' : ''}`}
        onClick={() => onLanguageChange(LANGUAGES.EN)}
        aria-pressed={currentLanguage === LANGUAGES.EN}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSelector; 