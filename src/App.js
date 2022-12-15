import './App.css';
import Board from './components/Board';
import { useState, useEffect } from 'react';
import { Button, Label, StyledSelect } from './style/StyledComponents'
import { patterns9, board9 } from './components/Patterns';
import { aiNextTurn } from './model/ai';


function App() {
  const [board, setBoard] = useState(board9);
  const players = ["Player VS Player", "Player VS IA"];
  const [player, setPlayer] = useState("X");
  const [isIa, setIsIa] = useState(false);
  const [isIaTurn, setIsIaTurn] = useState(false);
  const [winner, setWinner] = useState({name: "none", state: "none"});
  const [labelInfo, setLabelInfo] = useState("");

  useEffect(() => {
    if(winner.state !== "none") {
      alert(`Game Over! Player ${winner.name} ${winner.state} the game`);
      clearBoard();      
    }
  }, [winner])

  useEffect(() => {
    checkWinn();
    checkTie();
    if (player === "X") {
      setPlayer("O")
    } else {
      setPlayer("X")
    }
    if (isIa && isIaTurn) {
      let aiPlayer = player === "X" ? "O" : "X";
      let move = aiNextTurn(board, aiPlayer);
      setBoard(
        board.map((val, idx) => {
          if (idx === move && val === "") 
          return player === "X" ? "O" : "X";
  
          return val
        })
      );
      setIsIaTurn(false); 
    }
  }, [board])

  useEffect(() => {
    setLabelInfo("Time to player "+ player + " make a move!");
  }, [player])

  const clearBoard = () => {
    setBoard(board9);
    setLabelInfo("");
  }

  const checkWinn = () => {
    patterns9.forEach((curr) =>{
      const firstPlayer = board[curr[0]];
      if (firstPlayer === "") return;
      let winner = true
      curr.forEach((idx) => {
        if (board[idx] !== firstPlayer) {
          winner = false;
        }
      })

      if (winner) {
        setWinner({name: player, state: "won"})
      }
    });
  }

  const checkTie = () => {
    let filled = true;
    board.forEach((each) =>{
      if (each === "") filled = false;
    })

    if (filled) setWinner({name: "No one", state: "Tie"});
  };

  const chooseSquare = (square) => {
    if(board[square] !== "") {
      setLabelInfo("Invalid Action for player " +player+", try another cell");
      return;
    }
    setBoard(
      board.map((val, idx) => {
        if (idx === square && val === "") return player

        return val
      })
    );   
    setIsIaTurn(true); 
  }

  const changePlayer = (n) =>{
    console.log(n)
    if(n === "Player VS IA"){
      setIsIa(true);
    }else {
      setIsIa(false);
    }
      clearBoard();
  }

  const save = () => {
    localStorage.setItem("boardGame",JSON.stringify(board));
    alert(`Successfully saved the game!`);
  }

  const restore = () => {
    var storredBoard = localStorage.getItem("boardGame");
    setBoard(JSON.parse(storredBoard));
    alert(`Successfully restored previously saved game!`);
  }

  return (
    <div className="App">
      <div className="content">
        <header className="header">
          <h1 className="title">Marlon'S TIC-TAC-TOE</h1>
        </header>
        <div className="menu">
          <div className="content">
            <Button onClick={save} >"Save"</Button>
            <Button onClick={restore}> "Restore" </Button>
          </div>
          
          <Label>
            Select the game mode
          </Label>
          <StyledSelect onChange={e => changePlayer(e.target.value)} name="select">
            {players.map(function(n) { 
                return (<option value={n}>{n}</option>);
            })}
          </StyledSelect>          
        </div>
        <Label>
          {labelInfo}
        </Label>
        <Board squares={board} cols={3} chooseSquare={chooseSquare} />       
      </div>      
    </div>
  );
}

export default App;
