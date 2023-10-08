import React from 'react';

const Deck = ({ deck }) => {
  return (
    <div className='max-w-sm mx-auto bg-white rounded-xl overflow-hidden shadow-lg p-4 mb-4'>
        <h3 className='text-xl font-semibold mb-2'>{deck.name}</h3>
        <p className='text-gray-600'>{deck.createdAt}</p>
        <a
        href='/app/study'
        className='mt-2 bg-primary-light hover:bg-primary-main text-white font-semibold py-2 px-4 rounded-full inline-block'
        >
        Study Now
        </a>
    </div>
  );
};

export default Deck;
