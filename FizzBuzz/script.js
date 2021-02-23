let box = document.getElementById('text');

for (let i = 0; i < 101; i++) {

    if (i % 3 === 0 && i % 5 === 0) {
        print("Fizz Buzz");
    }

    else if (i % 3 === 0) {
        print("Fizz");
    }

    else if (i % 5 === 0) {
        print("Buzz");
    }

    else {
        print(i);
    }
}

function print(msg) {
    let p = document.createElement('p');
    p.innerText = msg;

    box.appendChild(p);
}
