import React, { useState } from 'react';

function FlashCard({ question, answer }) {
  const [showAnswer, setShowAnswer] = useState(false);

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <div
      className={`w-64 h-32 border p-4 cursor-pointer transform transition-transform ${
        showAnswer ? 'rotate-y-180' : ''
      }`}
      onClick={toggleAnswer}
    >
      <div className="w-full h-full relative">
        <div
          className={`card-side front absolute inset-0 flex items-center justify-center bg-white border rounded-lg shadow-md transition-opacity ${
            showAnswer ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {question}
        </div>
        <div
          className={`card-side back absolute inset-0 flex items-center justify-center bg-gray-200 border rounded-lg shadow-md transition-opacity ${
            showAnswer ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {answer}
        </div>
      </div>
    </div>
  );
}

export default FlashCard;
