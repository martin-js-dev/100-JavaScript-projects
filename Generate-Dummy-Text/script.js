
// dummy quotes
let quotes = [

    'I bring scientists, you bring a rockstar.',
    'Are these characters...auto...erotica?',
    'How do you know they\'re all female?',
    'Does somebody go out into the park and pull up the dinosaurs\' skirts?',
    'You bred raptors?',
    'Quick for a biped?',
    'They show extreme intelligence, even problem-solving intelligence.',
    'Don\'t you see the danger, John, inherent in what you\'re doing here?',
    'Yeah, but your scientists were so preoccupied with whether or not they could that they didn\'t stop to think if they should.',
    'The only one I\'ve got on my side is the blood-sucking lawyer.',
    'He\'s gonna eat the goat?',
    'Johnny doesn\'t want to be fed.',
    'Dinosaurs eat man; woman inherits the earth.',
    'Dennis, our lives are in your hands and you\'ve got butterfingers?',
    'I really hate that man.',
    'I told you, how many times, we needed locking mechanisms on the vehicle doors!',
    'That is one big pile of shit.',
    'Why didn\'t I build it in Orlando?',
    'Check the vending machines.',
    'I\'m always on the lookout for a future ex-Mrs. Malcolm.',
    'When you gotta go, you gotta go.',
    'Boy, do I hate being right all the time.',
    'Ian, freeze!',
    'Well, at least you\'re out of the tree.',
    'I hate this hacker crap!',
    'Remind me to thank John for the wonderful weekend.',
    'Must go faster!',
    'Bloody move!',
    'White rabbit object: whatever it did, it did it all.',
    'What about the lysine contingency?',
    'Dr. Wu inserted a gene that makes a single faulty enzyme in protein metabolism.',
    'Uh uh uh!...You didn\'t say the magic word!',
    'Hold onto your butts.',
    'I can afford more glasses!',
    'I thought you were one of your big brothers.',
    'I\'m gonna run you over when I come back down!',

];

//generate paragraph
function generateText(e) {
    let minCount = 5,
        maxCount = 13,
        text = Math.floor(Math.random() * (maxCount - minCount)) + minCount,
        ret = '';

    for (i = 0; i < text; i++) {
        let newText = quotes[Math.floor(Math.random() * (quotes.length - 1))];
        ret += newText + ' ';
    }

    document.getElementById(e).innerHTML = document.getElementById(e).innerHTML + '<p>' + ret + '</p>';
}

//clear paragraph
function clearText(e) {
    document.getElementById(e).innerHTML = '';
}
