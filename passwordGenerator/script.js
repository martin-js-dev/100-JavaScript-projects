const passwordE = document.getElementById('password')
const lengthE = document.getElementById('length')
const uppercase = document.getElementById('upper')
const lowercase = document.getElementById('lower')
const numbers = document.getElementById('num')
const symbols = document.getElementById('symb')
const generate = document.getElementById('gen')
const clipboard = document.getElementById('copy')

const randomFunction = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

clipboard.addEventListener('click', () => {
    const textarea = document.createElement('textarea')
    const password = passwordE.innerText

    if (!password) { return }

    textarea.value = password
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
    alert('Password copied!')
})

generate.addEventListener('click', () => {
    const length = +lengthE.value
    const withLower = lowercase.checked
    const withUpper = uppercase.checked
    const withNumber = numbers.checked
    const withSymbol = symbols.checked

    passwordE.innerText = generatePassword(withLower, withUpper, withNumber, withSymbol, length)
})

function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = ''
    const count = lower + upper + number + symbol
    const types = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0])

    if (count === 0) {
        return ''
    }

    for (let i = 0; i < length; i += count) {
        types.forEach(type => {
            const functionName = Object.keys(type)[0]
            generatedPassword += randomFunction[functionName]()
        })
    }

    const yourPassword = generatedPassword.slice(0, length)

    return yourPassword
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.'
    return symbols[Math.floor(Math.random() * symbols.length)]
}
