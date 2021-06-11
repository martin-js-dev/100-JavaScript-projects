document.addEventListener('DOMContentLoaded', () => {

    const WRAPPER_WIDTH = 10
    const WRAPPER_HEIGHT = 20
    const WRAPPER_SIZE = WRAPPER_WIDTH * WRAPPER_HEIGHT


    const wrapper = createWrapper();
    let squares = Array.from(wrapper.querySelectorAll('div'))
    const startBtn = document.querySelector('button')
    const span = document.getElementsByClassName('close')[0]
    const scoreDisplay = document.querySelector('.score-display')
    const linesDisplay = document.querySelector('.lines-score')
    let currentIndex = 0
    let currentRotation = 0
    const width = 10
    let score = 0
    let lines = 0
    let timerId
    let nextRandom = 0
    const colors = [
        'url(img/blue_figure.png)',
        'url(img/pink_figure.png)',
        'url(img/purple_figure.png)',
        'url(img/peach_figure.png)',
        'url(img/yellow_figure.png)'
    ]

    //CREATE WRAPPER
    function createWrapper() {

        let wrapper = document.querySelector(".figures")
        for (let i = 0; i < WRAPPER_SIZE; i++) {
            let wrapperElement = document.createElement("div")
            wrapper.appendChild(wrapperElement)
        }


        for (let i = 0; i < WRAPPER_WIDTH; i++) {
            let wrapperElement = document.createElement("div")
            wrapperElement.setAttribute("class", "figure3")
            wrapper.appendChild(wrapperElement)
        }

        let previousWrapper = document.querySelector(".previous-wrapper")

        for (let i = 0; i < 16; i++) {
            let wrapperElement = document.createElement("div")
            previousWrapper.appendChild(wrapperElement);
        }
        return wrapper;
    }


    //CONTROLS
    function control(e) {
        if (e.keyCode === 39)
            moveright()
        else if (e.keyCode === 38)
            rotate()
        else if (e.keyCode === 37)
            moveleft()
        else if (e.keyCode === 40)
            moveDown()
    }


    document.addEventListener('keydown', control)

    // TETRIS FIGURES 
    const lTetromino = [
        [1, WRAPPER_WIDTH + 1, WRAPPER_WIDTH * 2 + 1, 2],
        [WRAPPER_WIDTH, WRAPPER_WIDTH + 1, WRAPPER_WIDTH + 2, WRAPPER_WIDTH * 2 + 2],
        [1, WRAPPER_WIDTH + 1, WRAPPER_WIDTH * 2 + 1, WRAPPER_WIDTH * 2],
        [WRAPPER_WIDTH, WRAPPER_WIDTH * 2, WRAPPER_WIDTH * 2 + 1, WRAPPER_WIDTH * 2 + 2]
    ]

    const zTetromino = [
        [0, WRAPPER_WIDTH, WRAPPER_WIDTH + 1, WRAPPER_WIDTH * 2 + 1],
        [WRAPPER_WIDTH + 1, WRAPPER_WIDTH + 2, WRAPPER_WIDTH * 2, WRAPPER_WIDTH * 2 + 1],
        [0, WRAPPER_WIDTH, WRAPPER_WIDTH + 1, WRAPPER_WIDTH * 2 + 1],
        [WRAPPER_WIDTH + 1, WRAPPER_WIDTH + 2, WRAPPER_WIDTH * 2, WRAPPER_WIDTH * 2 + 1]
    ]

    const tTetromino = [
        [1, WRAPPER_WIDTH, WRAPPER_WIDTH + 1, WRAPPER_WIDTH + 2],
        [1, WRAPPER_WIDTH + 1, WRAPPER_WIDTH + 2, WRAPPER_WIDTH * 2 + 1],
        [WRAPPER_WIDTH, WRAPPER_WIDTH + 1, WRAPPER_WIDTH + 2, WRAPPER_WIDTH * 2 + 1],
        [1, WRAPPER_WIDTH, WRAPPER_WIDTH + 1, WRAPPER_WIDTH * 2 + 1]
    ]

    const oTetromino = [
        [0, 1, WRAPPER_WIDTH, WRAPPER_WIDTH + 1],
        [0, 1, WRAPPER_WIDTH, WRAPPER_WIDTH + 1],
        [0, 1, WRAPPER_WIDTH, WRAPPER_WIDTH + 1],
        [0, 1, WRAPPER_WIDTH, WRAPPER_WIDTH + 1]
    ]

    const iTetromino = [
        [1, WRAPPER_WIDTH + 1, WRAPPER_WIDTH * 2 + 1, WRAPPER_WIDTH * 3 + 1],
        [WRAPPER_WIDTH, WRAPPER_WIDTH + 1, WRAPPER_WIDTH + 2, WRAPPER_WIDTH + 3],
        [1, WRAPPER_WIDTH + 1, WRAPPER_WIDTH * 2 + 1, WRAPPER_WIDTH * 3 + 1],
        [WRAPPER_WIDTH, WRAPPER_WIDTH + 1, WRAPPER_WIDTH + 2, WRAPPER_WIDTH + 3]
    ]

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]


    let random = Math.floor(Math.random() * theTetrominoes.length)
    let current = theTetrominoes[random][currentRotation]



    let currentPosition = 4

    //draw figure
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('figure')
            squares[currentPosition + index].style.backgroundImage = colors[random]
        })
    }

    //undraw figure
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('figure')
            squares[currentPosition + index].style.backgroundImage = 'none'
        })
    }

    // MOVE DOWN
    function moveDown() {
        undraw()
        currentPosition = currentPosition += width
        draw()
        freeze()
    }

    startBtn.addEventListener('click', () => {
        if (timerId) {
            clearInterval(timerId)
            timerId = null
        } else {
            draw()
            timerId = setInterval(moveDown, 1000)
            nextRandom = Math.floor(Math.random() * theTetrominoes.length)
            displayShape()
        }
    })

    //MOVE LEFT
    function moveright() {
        undraw()
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)
        if (!isAtRightEdge) currentPosition += 1
        if (current.some(index => squares[currentPosition + index].classList.contains('figure2'))) {
            currentPosition -= 1
        }
        draw()
    }

    //MOVE RIGHT
    function moveleft() {
        undraw()
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
        if (!isAtLeftEdge) currentPosition -= 1
        if (current.some(index => squares[currentPosition + index].classList.contains('figure2'))) {
            currentPosition += 1
        }
        draw()
    }

    //FREEZE FIGURE
    function freeze() {

        if (current.some(index => squares[currentPosition + index + width].classList.contains('figure3') || squares[currentPosition + index + width].classList.contains('figure2'))) {

            current.forEach(index => squares[index + currentPosition].classList.add('figure2'))

            random = nextRandom
            nextRandom = Math.floor(Math.random() * theTetrominoes.length)
            current = theTetrominoes[random][currentRotation]
            currentPosition = 4
            draw()
            displayShape()
            addScore()
            gameOver()
        }
    }
    freeze()

    //ROTATE FIGURE
    function rotate() {
        undraw()
        currentRotation++
        if (currentRotation === current.length) {
            currentRotation = 0
        }
        current = theTetrominoes[random][currentRotation]
        draw()
    }

    //GAME OVER
    function gameOver() {
        if (current.some(index => squares[currentPosition + index].classList.contains('figure2'))) {
            scoreDisplay.innerHTML = 'end'
            clearInterval(timerId)
        }
    }

    //SHOW PREVIOUS FIGURE
    const displayWidth = 4
    const displaySquares = document.querySelectorAll('.previous-wrapper div')
    let displayIndex = 0

    const smallTetrominoes = [
        [1, displayWidth + 1, displayWidth * 2 + 1, 2],
        [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1],
        [1, displayWidth, displayWidth + 1, displayWidth + 2],
        [0, 1, displayWidth, displayWidth + 1],
        [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1]
    ]

    function displayShape() {
        displaySquares.forEach(square => {
            square.classList.remove('figure')
            square.style.backgroundImage = 'none'
        })
        smallTetrominoes[nextRandom].forEach(index => {
            displaySquares[displayIndex + index].classList.add('figure')
            displaySquares[displayIndex + index].style.backgroundImage = colors[nextRandom]
        })
    }

    //ADD SCORE TO SEE
    function addScore() {
        for (currentIndex = 0; currentIndex < WRAPPER_SIZE; currentIndex += WRAPPER_WIDTH) {
            const row = [currentIndex, currentIndex + 1, currentIndex + 2, currentIndex + 3, currentIndex + 4, currentIndex + 5, currentIndex + 6, currentIndex + 7, currentIndex + 8, currentIndex + 9]
            if (row.every(index => squares[index].classList.contains('figure2'))) {
                score += 10
                lines += 1
                scoreDisplay.innerHTML = score
                linesDisplay.innerHTML = lines
                row.forEach(index => {
                    squares[index].style.backgroundImage = 'none'
                    squares[index].classList.remove('figure2') || squares[index].classList.remove('figure')

                })

                const squaresRemoved = squares.splice(currentIndex, width)
                squares = squaresRemoved.concat(squares)
                squares.forEach(cell => wrapper.appendChild(cell))
            }
        }
    }


})
