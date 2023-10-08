import React, { useState, useEffect } from "react";
import FlashCard from "./FlashCard";
import { LeftButton, RightButton } from "./NavigationButtons";
import axios from "../requests/axios"
import { useParams } from 'react-router-dom';

function StudyPage() {
  let {deck_id} = useParams();
  const [flashcards, setFlashCards] = useState([
    {
      prompt: "What is React?",
      answer: "React is a JavaScript library for building user interfaces.",
      card_id: "card_id1",
    },
    {
      question: "Question 2",
      answer: "Answer 2",
      card_id: "card_id2",
    },
  ]);

  useEffect(() => {
    console.log(process.env.REACT_APP_API_URL);
    const apiUrl = `/cards?deck=${deck_id}`;

    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);

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
        question={flashcards[currentCardIndex].question}
        answer={flashcards[currentCardIndex].answer}
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
