import React, { useState } from 'react';
import Square from './Square';
import '../styles/Board.css';

import xImg from '../assets/x.png';
import oImg from '../assets/o.png';

const Board: React.FC = () => {
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  const checkWinner = (squares: (string | null)[]): string | null => {
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const line of winningLines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a] === xImg ? 'X' : 'O';
      }
    }

    return squares.every((square) => square !== null) ? 'Draw' : null;
  };

  const handleClick = (index: number): void => {
    if (squares[index] || winner) return; 

    const newSquares = [...squares];
    newSquares[index] = isXTurn ? xImg : oImg;

    setSquares(newSquares);
    setIsXTurn(!isXTurn);

    const result = checkWinner(newSquares);
    if (result) setWinner(result);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXTurn(true);
    setWinner(null);
  };

  return (
    <div>
      {winner ? (
        <div className="result">
          {winner === 'Draw' ? <h2>It's a Draw!</h2> : <h2>{winner} Wins!</h2>}
          <button className="reset-button" onClick={resetGame}>
            Play Again
          </button>
        </div>
      ) : (
        <div className="board">
          {squares.map((square, index) => (
            <Square key={index} value={square} onClick={() => handleClick(index)} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Board;
