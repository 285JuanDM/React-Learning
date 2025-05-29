import { useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./components/Square";
import { TURNS } from "./constants/constants";
import { checkWinner, checkEndGame } from "./logic/board";
import { WinnerModal } from "./components/WinnerModal";
import "./App.css";
import { Board } from "./components/Board";

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  });
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ? JSON.parse(turnFromStorage) : TURNS.X
  });

  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  };

  const updateBoard = (index) => {
    const updateBoard = [...board];

    if (updateBoard[index] !== null || winner) return;

    updateBoard[index] = turn;
    setBoard(updateBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    //Guardar la partida
    window.localStorage.setItem('board', JSON.stringify(updateBoard))
    window.localStorage.setItem('turn', JSON.stringify(newTurn))

    const newWinner = checkWinner(updateBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(updateBoard)) {
      setWinner(false);
    }
  };

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <section className="game">
        <Board board={board} updateBoard={updateBoard} />
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <button onClick={resetGame}>Empezar de nuevo</button>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  );
}

export default App;
