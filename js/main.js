/*----- constants -----*/
const GAME = {
	'null': '#B3C7D6FF',
	'1': '#2460A7FF',
	'-1': '#D9B48FFF',
	boardSize: 3,
	board: [],
	winningNumbers: [
		//ROWS
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		//COLLUMNS
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		//DIAGONALS
		[0, 4, 8],
		[2, 4, 6]
	]
}

/*----- app's state (variables) -----*/
let turn; // 1, -1
let winner; // null, 1, -1, T

/*----- cached element references -----*/
const gridEl = document.querySelectorAll('.grid-item');
const msgEl = document.getElementById('msg');

/*----- event listeners -----*/
document.querySelector('.grid-container').addEventListener('click', clickOnSquare);
document.getElementById('replay').addEventListener('click', init)

/*----- functions -----*/
init();

function clickOnSquare(e) {
	let index = parseInt(e.target.id);
	if (isNaN(index) || winner != null || GAME.board[index] !== null) return;
	GAME.board[index] = turn;
	winner = GAME.board.includes(null) ? null : 'T';
	for (let i = 0; i < GAME.winningNumbers.length; i++) {
		let total = 0;
		for (let x = 0; x < GAME.winningNumbers[i].length; x++) {
			let input = GAME.board[GAME.winningNumbers[i][x]];
			if (input === null)
				break;
			total += input;
		}
		if (Math.abs(total) === 3) {
			winner = turn;
			break;
		}
	}
	turn = turn * -1;
	render();
}

function init() {
	GAME.board = [];
	for (let i = 0 ; i < GAME.boardSize * GAME.boardSize; i++) {
		GAME.board[i] = null;
	}
	turn = 1;
	winner = null;
	//RENDER
	render();
}

function render() {
	gridEl.forEach(function (e, idx) {
		// BACKGROUND TO PLAYER COLORS
		e.style.backgroundColor = GAME[GAME.board[idx]];
		if (GAME.board[idx] !== null) {
			e.textContent = `${GAME.board[idx] === 1 ? 'X' : 'O'}`;
			e.style.color = '#B3C7D6FF';
		} else {
			e.textContent = '';
		}
	});
	if (winner === null) {
		msgEl.textContent = `Current turn: ${turn === 1 ? 'X' : 'O'}`;
		msgEl.style.color = GAME[turn];
		
	} else {
		msgEl.textContent = winner === 'T' ? 'The game has resulted in a tie!' : `The game was won by ${winner === 1 ? 'X' : 'O'}.`;
		msgEl.style.color = GAME[winner];
	}
}