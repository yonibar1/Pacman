'use strict'
const WALL = '🧱'
const FOOD = '.'
const EMPTY = ' ';
const SUPERFOOD = '🍔'
const CHERRY = '🍒'
var gCherryInterval
var gFoodCount;
var gBoard;
var gGame = {
    score: 0,
    isOn: false
}
function init() {
    gCherryInterval = setInterval(addCherry, 15000);
    gFoodCount = -1
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    gGame.isOn = true
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            } else if (i === 1 && j === 1 ||
                i === 8 && j === 1 ||
                j === 8 && i === 1 ||
                j === 8 && i === 8) {
                board[i][j] = SUPERFOOD
            } else if (board[i][j] = FOOD) { gFoodCount++ }

        }
    }

    return board;
}



// update model and dom
function updateScore(diff) {
    gGame.score += diff
    var elScore = document.querySelector('h2 span')
    elScore.innerText = gGame.score
}

// TODO
function gameOver() {
    console.log('Game Over');
    gGame.isOn = false
    clearInterval(gCherryInterval)
    gCherryInterval = null
    clearInterval(gIntervalGhosts)
    gIntervalGhosts = null
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'block'
}

function restartGame() {
    clearInterval(gCherryInterval)
    gCherryInterval = null
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
    var elVictoryModal = document.querySelector('.victory-modal')
    elVictoryModal.style.display = 'none'
    gGame.score = 0
    var elScore = document.querySelector('h2 span')
    elScore.innerText = 0

    init()
}
function victory() {
    console.log('victory');
    gGame.isOn = false
    clearInterval(gCherryInterval)
    gCherryInterval = null
    clearInterval(gIntervalGhosts)
    gIntervalGhosts = null
    var elModal = document.querySelector('.victory-modal')
    elModal.style.display = 'block'
}

function addCherry() {
    var randomIdx = getRandomIntInclusive(0, gEmptyCells.length)
    var cherryLocation = gEmptyCells[randomIdx]
    renderCell(cherryLocation, CHERRY)
    gBoard[cherryLocation.i][cherryLocation.j] = CHERRY
}

