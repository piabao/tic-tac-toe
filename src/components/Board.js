import React from "react";
import Square from "./Square";
import "../App.css";
import { Container } from "../style/StyledComponents";

export default function Board(props) {
  const { squares = [], cols, chooseSquare } = props;

  const grid = [];
  for (let row = 0; row < squares.length; row++) {
    grid[row] = (
      <Square
        key={`${row}`}
        value={squares[row]}
        chooseSquare={() => chooseSquare(row)}
      />
    );
  }

  return (
    <Container cols={cols} rows="33%">
      {grid}
    </Container>
  );
}
