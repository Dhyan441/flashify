import React, { useState, useEffect } from "react";
import Deck from "./Deck";
import axios from "../requests/axios";

const Decks = () => {
  const [decks, setDecks] = useState([
    { deck_id: 1, name: "Greek Mythology", createdAt: "2023 Jan 24" },
    { deck_id: 1, name: "Greek Mythology", createdAt: "2023 Jan 24" },
    { deck_id: 1, name: "Greek Mythology", createdAt: "2023 Jan 24" },
    { deck_id: 1, name: "Greek Mythology", createdAt: "2023 Jan 24" },
    { deck_id: 1, name: "Greek Mythology", createdAt: "2023 Jan 24" },
    { deck_id: 1, name: "Greek Mythology", createdAt: "2023 Jan 24" },
  ]);

  useEffect(() => {
    console.log(process.env.REACT_APP_API_URL);
    const apiUrl = "/decks";

    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);

        setDecks(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // Call the async function
    fetchData();
  }, []);

  return (
    <div
      className="relative flex flex-wrap justify-center drop-shadow-2xl"
      style={{ paddingLeft: "9rem", paddingTop: "2rem" }}
    >
      {decks.map((deck, index) => (
        <div key={deck.deck_id} className="w-1/3 p-4 mt-20 ">
          <Deck deck={deck} />
        </div>
      ))}
    </div>
  );
};

export default Decks;
