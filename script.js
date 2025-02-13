// Select DOM elements
const cells = document.querySelectorAll('[data-cell]');
const resetButton = document.querySelector('.reset');
const message = document.querySelector('.message');
const turnDisplay = document.querySelector('.turn');

// Game state variables
let currentPlayer = 'X';
let board = Array(9).fill(''); // Initialize an empty 9-cell board
let gameOver = false;

// Winning combinations for Tic-Tac-Toe
const winningCombinations = [
  [0, 1, 2], // Row 1
  [3, 4, 5], // Row 2
  [6, 7, 8], // Row 3
  [0, 3, 6], // Column 1
  [1, 4, 7], // Column 2
  [2, 5, 8], // Column 3
  [0, 4, 8], // Diagonal
  [2, 4, 6], // Anti-diagonal
];

// Check for a winner or draw
const checkWinner = () => {
  for (const [a, b, c] of winningCombinations) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // Return the winning player ('X' or 'O')
    }
  }
  return board.includes('') ? null : 'Draw'; // Return 'Draw' if the board is full, otherwise null
};

// Handle cell click events
const handleClick = (e) => {
  const cell = e.target;
  const index = [...cells].indexOf(cell);

  // Ignore clicks if the game is over or the cell is already occupied
  if (gameOver || board[index]) return;

  // Update the board and UI
  board[index] = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());
  cell.textContent = currentPlayer;

  // Check for a winner or draw
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
    // Switch players
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    turnDisplay.textContent = `Player ${currentPlayer}'s turn`;
  }
};

// Reset the game to its initial state
const resetGame = () => {
  board = Array(9).fill(''); // Clear the board
  currentPlayer = 'X';
  gameOver = false;
  message.textContent = '';
  message.classList.remove('winner', 'draw');
  turnDisplay.textContent = `Player ${currentPlayer}'s turn`;

  // Clear the UI
  cells.forEach(cell => {
    cell.classList.remove('x', 'o');
    cell.textContent = '';
  });
};

// Attach event listeners
cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);

// Initialize the game
resetGame();