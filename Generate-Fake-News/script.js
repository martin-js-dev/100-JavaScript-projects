// generate fake news

function GetValue() {
    var nameArray = ['Cristiano Ronaldo ', 'Hillary Clinton ', 'Eminem ', 'Lebron James ', 'Rihanna '];
    var name = nameArray[Math.floor(Math.random() * nameArray.length)];

    var actionArray = ['slams ', 'publically shames ', 'threatens ', 'beats ', 'eats a sandwich with '];
    var action = actionArray[Math.floor(Math.random() * actionArray.length)];

    var targetArray = ['Brasillian football coach ', 'civilians from the Middle East. ', 'employee at  Steak House. ', 'staff at the local news station. ', 'a customer at the Burger King. '];
    var target = targetArray[Math.floor(Math.random() * targetArray.length)];

    var phraseArray = ['You wont believe what happens next...', 'You cannot miss whats next...', 'What happens next might suprise you...', 'Then something beautiful happens...', 'Here is why...', 'Here is how...', 'Then a miracle happens...'];
    var catchPhrase = phraseArray[Math.floor(Math.random() * phraseArray.length)];


    document.getElementById("message").innerHTML = name + action + target + catchPhrase;
}


