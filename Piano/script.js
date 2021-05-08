//NOTES ON KEYBOARD
const WhiteKeys = ['s', 'd', 'f', 'g', 'h', 'j', 'k']
const BlackKeys = ['e', 'r', 't', 'y', 'u']

const keys = document.querySelectorAll('.key')
const whiteKeys = document.querySelectorAll('.key.white')
const blackKeys = document.querySelectorAll('.key.black')

keys.forEach(key => {
    key.addEventListener('click', () => playKey(key))
})

// PLAY ON KEYPRESS
document.addEventListener('keydown', e => {
    if (e.repeat) return
    const key = e.key
    const whiteKeyIndex = WhiteKeys.indexOf(key)
    const blackKeyIndex = BlackKeys.indexOf(key)

    if (whiteKeyIndex > -1) playKey(whiteKeys[whiteKeyIndex])
    if (blackKeyIndex > -1) playKey(blackKeys[blackKeyIndex])
})

// PLAY KEY
function playKey(key) {
    const keyAudio = document.getElementById(key.dataset.note)
    keyAudio.currentTime = 0
    keyAudio.play()
    key.classList.add('active')
    keyAudio.addEventListener('ended', () => {
        key.classList.remove('active')
    })
}
