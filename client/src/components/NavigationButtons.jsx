import React from "react";

function LeftButton({ onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 mx-1.5 bg-primary-light text-primary-background rounded hover:bg-primary-dark ${
        disabled ? "cursor-not-allowed opacity-50" : ""
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
      className={`px-4 py-2 mx-1.5 bg-primary-light text-primary-background rounded hover:bg-primary-dark ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      }`}
    >
      Next Card
    </button>
  );
}

export { LeftButton, RightButton };
