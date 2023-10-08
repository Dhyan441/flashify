import React, { useState, useEffect } from "react";
import FlashCard from "./FlashCard";
import { LeftButton, RightButton } from "./NavigationButtons";
import axios from "../requests/axios"
import { useParams } from 'react-router-dom';

function StudyPage() {
  const [showAnswer, setShowAnswer] = useState(false);
  const [flashcards, setFlashCards] = useState([]);
  const authToken = localStorage.getItem("authToken")

  useEffect(() => {
    console.log(flashcards)
  }, [flashcards])

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);

    const deckId = queryParams.get('deck');
    console.log(process.env.REACT_APP_API_URL);
    const apiUrl = `/cards?deck=${deckId}`;

    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });
        console.log(response)

        setFlashCards(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // Call the async function
    fetchData();
  }, []);

  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const nextCard = () => {
    setShowAnswer(false)
    if (flashcards && currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] bg-white">
      <FlashCard
        question={flashcards[currentCardIndex] ? flashcards[currentCardIndex]["prompt"] : ""}
        answer={flashcards[currentCardIndex] ? flashcards[currentCardIndex]["answer"] : ""}
        showAnswer={showAnswer}
        setShowAnswer={setShowAnswer}
      />
      <div className="mt-0.5 flex flex-row">
        <LeftButton onClick={prevCard} disabled={currentCardIndex === 0} />
        <RightButton
          onClick={nextCard}
          disabled={flashcards && currentCardIndex === flashcards.length - 1}
        />
      </div>
    </div>
  );
}

export default StudyPage;
