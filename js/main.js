/*----- constants -----*/
const game = {
	starterSymbol: 0,
	boardSize: 3,
	'1': {
		selections: [],
		symbol: 'O'
	},
	'-1': {
		selections: [],
		symbol: 'X'
	},
}
//WINNING NUMBERS
const winNums = [
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

/*----- app's state (variables) -----*/
let turn;

/*----- cached element references -----*/
const gridEl = document.querySelector('.grid-container');
const msgEl = document.getElementById('msg');

/*----- event listeners -----*/
gridEl.addEventListener('click', clickOnSquare);

/*----- functions -----*/
init();

function clickOnSquare(e) {
}

function init() {
	game[1].selections = [];
	game[-1].selections = [];
	while (gridEl.firstChild) {
		gridEl.removeChild(gridEl.firstChild);
	}
	for (let i = 0 ; i < game.boardSize * game.boardSize; i++) {
		let gridItem = document.createElement('div');
		gridItem.className = 'grid-item';
		gridItem.textContent = `${i}`;
		gridEl.appendChild(gridItem);
	}
	//RENDER
	turn = 1;
	render();
}

function render() {

}