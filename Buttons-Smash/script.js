
//FIRST BUTTON
const main = document.getElementById('main');
const gs = main.querySelectorAll('g')

const audio = document.getElementById('audio');

main.addEventListener('click', () => {
    audio.play();
    setTimeout(() => {

        const text = main.querySelector('.text');
        text.innerHTML = 'Liked ';
        text.style.transform = `translateX(-7px)`;

        gs.forEach(g => {

            const path = g.querySelector('path');
            path.style.stroke = '#FFF';

            setTimeout(() => {
                const x = Math.random() * 200 - 100 + 'px';
                const y = Math.random() * 300 + 'px';
                g.style.transform = `translate(${x}, ${y})`;
                g.style.opacity = 0;
            }, 20);
        });

    }, 300)
});

//SECOUND BUTTON
const main1 = document.getElementById('main1');
const audio1 = document.getElementById('audio1');

main1.addEventListener('click', () => {
    audio1.play();

});

//THIRD BUTTON
const main2 = document.getElementById('main2');
const audio2 = document.getElementById('audio2');

main2.addEventListener('click', () => {
    audio2.play();

});
