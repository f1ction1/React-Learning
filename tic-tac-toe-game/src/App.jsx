import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";
import { useState } from "react";
import { WINNING_COMBINATIONS } from './winning-combinations.js'

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

function deriveActivePlayer(gameTurns) {
  let currenPlayer = 'X';
  if(gameTurns.length > 0 && gameTurns[0].player === 'X')
    currenPlayer = 'O';
  return currenPlayer
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  const currentPlayer = deriveActivePlayer(gameTurns)

  let gameBoard = [...initialGameBoard.map(arr => [...arr])];

  for( const turn of gameTurns) {
      gameBoard[turn.square.row][turn.square.col] = turn.player
  }  

  let winner;
  for(const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
    if(firstSquareSymbol 
      && firstSquareSymbol === secondSquareSymbol 
      && firstSquareSymbol === thirdSquareSymbol) {
      
      winner = firstSquareSymbol;
    }
  }

  function handleSelectSquare(rowIndex, colIndex) {
      //setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
      setGameTurns((prevTurns) => {
        const currentPlayer = deriveActivePlayer(prevTurns)
        const updatedTurns = [{square: {row: rowIndex, col: colIndex}, player: currentPlayer}, ...prevTurns];
        return updatedTurns;
      })
  }
  const hasDraw = gameTurns.length === 9 && !winner;
  function handleRestartButton() {
    setGameTurns([]);
  }
  
  console.log('hi!')

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
            <Player initialName="Player1" symbol="X" isActive={currentPlayer === 'X'}/>
            <Player initialName="Player2" symbol="O" isActive={currentPlayer === 'O'}/>
        </ol>
          {(winner) && <GameOver winner={winner} onRestart={handleRestartButton}/>}
          <GameBoard board={gameBoard} onSelectSquare={handleSelectSquare}/>
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
