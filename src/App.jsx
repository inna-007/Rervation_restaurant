import React from 'react';
import BookingForm from './components/BookingForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Little Lemon</h1>
        <p>Réservez votre table dès maintenant</p>
      </header>
      <main>
        <BookingForm />
      </main>
    </div>
  );
}

export default App; 