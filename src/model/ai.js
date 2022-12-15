import { patterns9 } from "../components/Patterns";

let scores = {
  X: 10,
  O: -10,
  tie: 0,
};

export const aiNextTurn = (board, aiPlayer) => {
  let deepCopyBoard = JSON.parse(JSON.stringify(board));
  let bestMove = -1;
  let bestScore = Number.MIN_SAFE_INTEGER;

  for (let idx = 0; idx < board.length; idx++) {
    if (board[idx] !== "") continue;
    deepCopyBoard[idx] = aiPlayer;
    let score = minimax(deepCopyBoard, 0, false);
    deepCopyBoard = JSON.parse(JSON.stringify(board));
    if (score > bestScore) {
      bestScore = score;
      bestMove = idx;
    }
  }

  return bestMove;
};

const allEquals = (a, b, c) => {
  return a === b && b === c && a !== "";
};

const checkWinn = (board) => {
  let who = null;
  patterns9.forEach((curr) => {
    const firstPlayer = board[curr[0]];
    if (firstPlayer === "") return;
    let winner = allEquals(board[curr[0]], board[curr[1]], board[curr[2]]);
    if (winner) {
      who = firstPlayer;
      return who;
    }
  });
  return who;
};

const minimax = (board, depth, isMaximizing) => {
  let result = checkWinn(board);
  if (result !== null) {
    return scores[result];
  }
  if (isMaximizing) {
    let bestScore = -Infinity;
    board.forEach((val, idx) => {
      if (val !== "") return;
      board[idx] = "X";
      let score = minimax(board, depth + 1, false);
      bestScore = Math.max(score, bestScore);
    });
    return bestScore;
  } else {
    let worstScore = Infinity;
    board.forEach((val, idx) => {
      if (val !== "") return;
      board[idx] = "O";
      let score = minimax(board, depth + 1, true);
      worstScore = Math.min(score, worstScore);
    });
    return worstScore;
  }
};
