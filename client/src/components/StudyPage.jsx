import React, { useState } from 'react';
import FlashCard from './FlashCard'; // Update the import path as needed
import { LeftButton, RightButton } from './NavigationButtons'; // Update the import path as needed

function StudyPage({ flashcards }) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const nextCard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <FlashCard card={flashcards[currentCardIndex]} />
      <div className="mt-4 flex">
        <LeftButton onClick={prevCard} disabled={currentCardIndex === 0} />
        <RightButton
          onClick={nextCard}
          disabled={currentCardIndex === flashcards.length - 1}
        />
      </div>
    </div>
  );
}

export default StudyPage;
