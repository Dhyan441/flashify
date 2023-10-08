import React, { useState, useEffect } from "react";
import Deck from "./Deck";
import axios from "../requests/axios";

const Decks = () => {
    const [decks, setDecks] = useState([])

    useEffect(() => {
      console.log(process.env.REACT_APP_API_URL)
      const apiUrl = '/decks';
      const authToken = localStorage.getItem('authToken')
      console.log(authToken)
      const fetchData = async () => {
        try {
          const response = await axios.get(apiUrl, {
            headers: {
              'Authorization':  `Bearer ${authToken}`
            }
          });
          setDecks(response.data);
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      // Call the async function
      fetchData();
    }, []);

    return (
      <div className='relative flex flex-wrap justify-center drop-shadow-2xl' style={{ paddingLeft: '9rem', paddingTop: '2rem' }}>
        {decks.map((deck, index) => (
          <div key={deck.deck_id} className='w-1/3 p-4'>
            <Deck deck={deck}/>
          </div>
        ))}
      </div>
    );
};

export default Decks;
