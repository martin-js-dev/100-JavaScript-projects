const btn = document.querySelector('.speak');
const content = document.querySelector('.content');


const greetings = [
    'I am good ',
    'doing good thanks for asking',
    'not bad at all'
];


const SpeechRecognition =
window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.onstart = function () {

}

recognition.onresult = function (event) {
    const current = event.resultIndex;

    const transcript = event.results[current][0].transcript;
    content.textContent = transcript;
    readLoud(transcript);
}

btn.addEventListener('click', () => {
    recognition.start();
});

// computer read content
function readLoud(message) {
    const speech = new SpeechSynthesisUtterance();

    speech.text = 'I dont know';

    if (message.includes('how are you')) {
        const finalText =
            greetings[Math.floor(Math.random() * greetings.length)]
        speech.text = finalText;
    }

    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}
