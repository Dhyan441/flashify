import React, { useState } from 'react';

function Flashcard({ question, answer }) {
  const [showAnswer, setShowAnswer] = useState(false);

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <div className="flash-card" onClick={toggleAnswer}>
      <div className={`flash-card-content ${showAnswer ? 'show-answer' : ''}`}>
        {showAnswer ? answer : question}
      </div>
    </div>
  );
}

export default Flashcard;
