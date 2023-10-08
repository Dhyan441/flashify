import React from 'react';

function LeftButton({ onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
        disabled ? 'cursor-not-allowed opacity-50' : ''
      }`}
    >
      Previous Card
    </button>
  );
}

function RightButton({ onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
        disabled ? 'cursor-not-allowed opacity-50' : ''
      }`}
    >
      Next Card
    </button>
  );
}

export { LeftButton, RightButton };
