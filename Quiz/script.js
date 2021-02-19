const Data = [
    {
        question: "Where is the Effiel Tower located?",
        a: "New York",
        b: "Paris",
        c: "London",
        d: "Rome",
        correct: "b",
    },
    {
        question: "Who is the best James Bond?",
        a: "Daniel Craig",
        b: "Pierce Brosnan",
        c: "Sean Connery",
        d: "Timothy Dalton",
        correct: "c",
    },
    {
        question: "Arsene Wenger managed which premier league football club?",
        a: "Arsenal",
        b: "Chelsea",
        c: "Man Utd",
        d: "Liverpool",
        correct: "a",
    },
    {
        question: "Which car is made in Gemany?",
        a: "Renault",
        b: "Audi",
        c: "Toyota",
        d: "Ferarri",
        correct: "b",
    },
    {
        question: "How many continents are there?",
        a: "7",
        b: "9",
        c: "12",
        d: "4",
        correct: "a",
    },
];

const quiz = document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const a_question = document.getElementById('aTxt')
const b_question = document.getElementById('bTxt')
const c_question = document.getElementById('cTxt')
const d_question = document.getElementById('dTxt')
const submitBtn = document.getElementById('submit')

let runningQuiz = 0
let score = 0

beginQuiz()

function beginQuiz() {
    unselectA()

    const currentData = Data[runningQuiz]

    questionEl.innerText = currentData.question
    a_question.innerText = currentData.a
    b_question.innerText = currentData.b
    c_question.innerText = currentData.c
    d_question.innerText = currentData.d
}

function unselectA() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}

function selectA() {
    let answer

    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id
        }
    })

    return answer
}

submitBtn.addEventListener('click', () => {
    const answer = selectA()

    if (answer) {
        if (answer === Data[runningQuiz].correct) {
            score++
        }

        runningQuiz++

        if (runningQuiz < Data.length) {
            beginQuiz()
        } else {
            quiz.innerHTML = `
                <h2>Total score ${score}/${Data.length} </h2>
                <button onclick="location.reload()">Play again</button>
            `

        }
    }
})
