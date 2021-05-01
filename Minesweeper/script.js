
export const tileStatuses = {
    hidden: "hidden",
    Mine: "mine",
    Number: "number",
    marked: "marked",
}

// CREATE THE BOARD
export function createBoard(boardSize, numberOfMines) {
    const board = []
    const minePositions = getMinePositions(boardSize, numberOfMines)

    for (let x = 0; x < boardSize; x++) {
        const row = []
        for (let y = 0; y < boardSize; y++) {
            const element = document.createElement("div")
            element.dataset.status = tileStatuses.hidden

            const tile = {
                element,
                x,
                y,
                mine: minePositions.some(positionMatch.bind(null, { x, y })),
                get status() {
                    return this.element.dataset.status
                },
                set status(value) {
                    this.element.dataset.status = value
                },
            }

            row.push(tile)
        }
        board.push(row)
    }

    return board
}

//MARK TILE
export function markTile(tile) {
    if (
        tile.status !== tileStatuses.hidden &&
        tile.status !== tileStatuses.marked
    ) {
        return
    }

    if (tile.status === tileStatuses.marked) {
        tile.status = tileStatuses.hidden
    } else {
        tile.status = tileStatuses.marked
    }
}

//SHOW TILE ON BOARD
export function displayTile(board, tile) {
    if (tile.status !== tileStatuses.hidden) {
        return
    }

    if (tile.mine) {
        tile.status = tileStatuses.Mine
        return
    }

    tile.status = tileStatuses.Number
    const adjacentTiles = nearbyTiles(board, tile)
    const mines = adjacentTiles.filter(t => t.mine)
    if (mines.length === 0) {
        adjacentTiles.forEach(displayTile.bind(null, board))
    } else {
        tile.element.textContent = mines.length
    }
}

//CHECK FOR WIN
export function checkWin(board) {
    return board.every(row => {
        return row.every(tile => {
            return (
                tile.status === tileStatuses.Number ||
                (tile.mine &&
                    (tile.status === tileStatuses.hidden ||
                        tile.status === tileStatuses.marked))
            )
        })
    })
}

//CHECK FOR LOSE
export function checkLose(board) {
    return board.some(row => {
        return row.some(tile => {
            return tile.status === tileStatuses.Mine
        })
    })
}

//GET THE POSITIONS
function getMinePositions(boardSize, numberOfMines) {
    const positions = []

    while (positions.length < numberOfMines) {
        const position = {
            x: randomNumber(boardSize),
            y: randomNumber(boardSize),
        }

        if (!positions.some(positionMatch.bind(null, position))) {
            positions.push(position)
        }
    }

    return positions
}

function positionMatch(a, b) {
    return a.x === b.x && a.y === b.y
}

function randomNumber(size) {
    return Math.floor(Math.random() * size)
}

function nearbyTiles(board, { x, y }) {
    const tiles = []

    for (let xOffset = -1; xOffset <= 1; xOffset++) {
        for (let yOffset = -1; yOffset <= 1; yOffset++) {
            const tile = board[x + xOffset]?.[y + yOffset]
            if (tile) tiles.push(tile)
        }
    }

    return tiles
}



// Display the UI


const boardSize = 8
const numberMines = 3

const board = createBoard(boardSize, numberMines)
const boardElement = document.querySelector(".board")
const minesLeftText = document.querySelector("[data-mine-count]")
const messageText = document.querySelector(".text")

board.forEach(row => {
    row.forEach(tile => {
        boardElement.append(tile.element)
        tile.element.addEventListener("click", () => {
            displayTile(board, tile)
            checkGameEnd()
        })
        tile.element.addEventListener("contextmenu", e => {
            e.preventDefault()
            markTile(tile)
            listMinesLeft()
        })
    })
})
boardElement.style.setProperty("7", boardSize)
minesLeftText.textContent = numberMines

function listMinesLeft() {
    const markedTilesCount = board.reduce((count, row) => {
        return (
            count + row.filter(tile => tile.status === tileStatuses.marked).length
        )
    }, 0)

    minesLeftText.textContent = numberMines - markedTilesCount
}

//CHECK WHO WON TO END THE GAME
function checkGameEnd() {
    const win = checkWin(board)
    const lose = checkLose(board)

    if (win || lose) {
        boardElement.addEventListener("click", stopProp, { capture: true })
        boardElement.addEventListener("contextmenu", stopProp, { capture: true })
    }

    if (win) {
        messageText.textContent = "You Win"
    }
    if (lose) {
        messageText.textContent = "You Lose"
        board.forEach(row => {
            row.forEach(tile => {
                if (tile.status === tileStatuses.marked) markTile(tile)
                if (tile.mine) displayTile(board, tile)
            })
        })
    }
}

function stopProp(e) {
    e.stopPropagation()
}
