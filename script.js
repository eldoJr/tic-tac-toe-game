const cells = document.querySelectorAll('[data-cell]');
const resetButton = document.querySelector('.reset');
const message = document.querySelector('.message');
const turnDisplay = document.querySelector('.turn');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

// Function to check the winning condition
const checkWinner = () => {
  const winningCombinations = [
    [0, 1, 2], // row 1
    [3, 4, 5], // row 2
    [6, 7, 8], // row 3
    [0, 3, 6], // column 1
    [1, 4, 7], // column 2
    [2, 5, 8], // column 3
    [0, 4, 8], // diagonal
    [2, 4, 6], // diagonal
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return board.includes('') ? null : 'Draw'; // If there's no winner and the board is full, it's a draw
};

// Function to handle click events on the board
const handleClick = (e) => {
  const cell = e.target;
  const index = [...cells].indexOf(cell);

  if (gameOver || board[index]) return;

  board[index] = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());
  cell.textContent = currentPlayer;

  const winner = checkWinner();
  if (winner) {
    gameOver = true;
    if (winner === 'Draw') {
      message.textContent = 'It\'s a Draw!';
      message.classList.add('draw');
    } else {
      message.textContent = `${winner} Wins!`;
      message.classList.add('winner');
    }
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    turnDisplay.textContent = `Player ${currentPlayer}'s turn`;
  }
};

// Function to reset the game
const resetGame = () => {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameOver = false;
  message.textContent = '';
  message.classList.remove('winner', 'draw');
  turnDisplay.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => {
    cell.classList.remove('x', 'o');
    cell.textContent = '';
  });
};

// Attach event listeners to each cell
cells.forEach(cell => {
  cell.addEventListener('click', handleClick);
});

// Attach event listener to reset button
resetButton.addEventListener('click', resetGame);
