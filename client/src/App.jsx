// src/App.js

import React from 'react';
import './components/Flashcard/Flashcard.css';
import Flashcard from './components/Flashcard/Flashcard';

function App() {
  return (
    <div className="App">
      <Flashcard question="What is the capital of France?" answer="Paris" />
      <Flashcard question="What is 2 + 2?" answer="4" />
    </div>
  );
}

export default App;
