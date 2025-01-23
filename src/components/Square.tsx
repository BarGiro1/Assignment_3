import React from 'react';
import '../styles/Square.css';

interface SquareProps {
  value: string | null;
  onClick: () => void;
}

const Square: React.FC<SquareProps> = ({ value, onClick }) => {
  return (
    <button className="square" onClick={onClick}>
      {value && <img src={value} alt="XO" />}
    </button>
  );
};

export default Square;
