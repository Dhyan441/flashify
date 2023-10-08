import React, { useState, useEffect } from 'react';

function FlashCard({ question, answer }) {
    useEffect(() => {
        console.log(question, answer)
    }, [question, answer])

  const [showAnswer, setShowAnswer] = useState(false);
  const [fontSize, setFontSize] = useState(1); // Initial font size

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  useEffect(() => {
    // Calculate the length of the text (question or answer)
    const text = showAnswer ? answer : question;
    const textLength = text == undefined ? 0 : text.length;

    // Adjust the font size based on text length with a minimum font size of 14px
    const calculatedFontSize = Math.max(20, 30 - textLength * 0.5);

    setFontSize(calculatedFontSize);
  }, [question, answer, showAnswer]);

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div
        className={`w-96 h-60 p-4 cursor-pointer transform transition-transform transition-duration-500 ${
          showAnswer ? 'rotate-y-180' : ''
        }`}
        onClick={toggleAnswer}
        style={{
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className="w-full h-full relative">
          <div
            className={`card-side front absolute inset-0 flex items-center justify-center bg-white rounded-3xl shadow-lg transition-opacity ${
              showAnswer ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <div className="p-4">
              {showAnswer ? null : (
                <p
                  className="font-semibold text-center"
                  style={{
                    fontSize: `${fontSize}px`,
                  }}
                >
                  {question}
                </p>
              )}
            </div>
          </div>
          <div
            className={`card-side back absolute inset-0 flex items-center justify-center bg-gray-200 rounded-3xl shadow-lg transition-opacity ${
              showAnswer ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="p-4">
              {showAnswer ? (
                <p
                  className="font-semibold text-center"
                  style={{
                    fontSize: `${fontSize}px`,
                  }}
                >
                  {answer}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlashCard;
