'use strict'
const PACMAN = '😷';
var gEmptyCells = []
var gPacman;
// TODO
function createPacman(board) {
    gPacman = {
        location: {
            i: 6,
            j: 6
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {
    if (!gGame.isOn) return
    // TODO: use getNextLocation(), nextCell
    var nextLocation = getNextLocation(ev)
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // TODO: return if cannot move
    if (nextCell === WALL) return
    if (nextCell === FOOD) {
        gEmptyCells.push(nextLocation)
        updateScore(1)
        gFoodCount--
    }
    if (nextCell === CHERRY) {
        console.log('CHERRY IS PICKED');
        updateScore(10)
        // gFoodCount += 10
    }
    if (nextCell === SUPERFOOD) {
        if (gPacman.isSuper) return
        gPacman.isSuper = true
        setTimeout(function () {
            gPacman.isSuper = false
        }, 5000);

    }
    if (gFoodCount == 0) victory()


    // TODO: hitting a ghost?  call gameOver
    if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            // gFoodCount-- bug the count when eat a ghost
            for (var i = 0; i < gGhosts.length; i++) {
                var currGhost = gGhosts[i]
                if (currGhost.location.i === nextLocation.i && currGhost.location.j === nextLocation.j) {
                    var deadGhost = gGhosts.splice(i, 1)[0]
                    setTimeout(function () {
                        gGhosts.push(deadGhost)
                    }, 5000);
                }
            }

        } else {
            gameOver()
            return
        }

    }
    // TODO: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // TODO: update the DOM
    renderCell(gPacman.location, EMPTY)
    // TODO: Move the pacman
    gPacman.location = { i: nextLocation.i, j: nextLocation.j }
    // TODO: update the model
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    // TODO: update the DOM
    renderCell(nextLocation, PACMAN)

}



// figure out nextLocation
function getNextLocation(eventKeyboard) {
    var nextLocation = { i: gPacman.location.i, j: gPacman.location.j }

    switch (eventKeyboard.key) {
        case 'ArrowUp':
            nextLocation.i--
            break
        case 'ArrowDown':
            nextLocation.i++
            break
        case 'ArrowLeft':
            nextLocation.j--
            break
        case 'ArrowRight':
            nextLocation.j++
            break
    }
    return nextLocation;
}