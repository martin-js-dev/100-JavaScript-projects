const cardArray = [
        {
            name: 'dog',
            img: 'img/dog1.jpg'
        },
        {
            name: 'rabbit',
            img: 'img/rabbit1.jpg'
        },
        {
            name: 'parrot',
            img: 'img/parrot1.jpg'
        },
        {
            name: 'fish',
            img: 'img/fish1.jpg'
        },
        {
            name: 'wolf',
            img: 'img/wolf1.jpg'
        },
        {
            name: 'cat',
            img: 'img/cat.jpg'
        },
        {
            name: 'dog',
            img: 'img/dog1.jpg'
        },
        {
            name: 'rabbit',
            img: 'img/rabbit1.jpg'
        },
        {
            name: 'parrot',
            img: 'img/parrot1.jpg'
        },
        {
            name: 'fish',
            img: 'img/fish1.jpg'
        },
        {
            name: 'wolf',
            img: 'img/wolf1.jpg'
        },
        {
            name: 'cat',
            img: 'img/cat.jpg'
        },


    ]



    cardArray.sort(() => 0.5 - Math.random())

    const grid = document.querySelector('.grid')
    const resultDisplay = document.querySelector('#result')
    let cardsChosen = []
    let cardsChosenId = []
    let cardsWon = []

    // CREATE THE BOARD

    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement('img')
            card.setAttribute('src', 'img/card1.jpg')
            card.setAttribute('data-id', i)
            card.addEventListener('click', flipCard)
            grid.appendChild(card)
        }
    }

    // CHECK FOR MATCHES

    function checkForMatch() {
        const cards = document.querySelectorAll('img')
        const optionOneId = cardsChosenId[0]
        const optionTwoId = cardsChosenId[1]

        if (optionOneId == optionTwoId) {
            cards[optionOneId].setAttribute('src', 'img/card1.jpg')
            cards[optionTwoId].setAttribute('src', 'img/card1.jpg')
            alert('You have clicked the same image!')
        }
        else if (cardsChosen[0] === cardsChosen[1]) {
            alert('You found a match')
            cards[optionOneId].setAttribute('src', 'img/white.png')
            cards[optionTwoId].setAttribute('src', 'img/white.png')
            cards[optionOneId].removeEventListener('click', flipCard)
            cards[optionTwoId].removeEventListener('click', flipCard)
            cardsWon.push(cardsChosen)
        } else {
            cards[optionOneId].setAttribute('src', 'img/card1.jpg')
            cards[optionTwoId].setAttribute('src', 'img/card1.jpg')
            alert('Sorry, try again')
        }
        cardsChosen = []
        cardsChosenId = []
        resultDisplay.textContent = cardsWon.length
        if (cardsWon.length === cardArray.length / 2) {
            resultDisplay.textContent = 'Congratulations! You found them all!'
        }
    }

    // FLIP THE CARD

    function flipCard() {
        let cardId = this.getAttribute('data-id')
        cardsChosen.push(cardArray[cardId].name)
        cardsChosenId.push(cardId)
        this.setAttribute('src', cardArray[cardId].img)
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 800)
        }
    }

    createBoard()
})
