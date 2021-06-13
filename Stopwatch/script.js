class Stopwatch {

    constructor(display, results) {
        this.activity = false;
        this.display = display;
        this.results = results;
        this.checkpoint = [];
        this.reset();
        this.print(this.times);
    }

    // reset button
    reset() {
        this.times = [0, 0, 0];
    }

    //start stopwatch
    start() {
        if (!this.time) this.time = performance.now();
        if (!this.activity) {
            this.activity = true;
            requestAnimationFrame(this.step.bind(this));
        }
    }

    // checkpoint
    check() {

        let times = this.times;
        let li = document.createElement('li');
        li.innerText = this.format(times);
        this.results.appendChild(li);
    }

    //stop stopwatch
    stop() {
        this.activity = false;
        this.time = null;
    }

    //restart stopwatch
    restart() {
        if (!this.time) this.time = performance.now();
        if (!this.activity) {
            this.activity = true;
            requestAnimationFrame(this.step.bind(this));
        }
        this.reset();
    }

    // clear checkpoints
    clear() {
        clearChildren(this.results);
    }

    step(timestamp) {
        if (!this.activity) return;
        this.calculate(timestamp);
        this.time = timestamp;
        this.print();
        requestAnimationFrame(this.step.bind(this));
    }

    // calculate
    calculate(timestamp) {
        var diff = timestamp - this.time;

        this.times[2] += diff / 10;

        if (this.times[2] >= 100) {
            this.times[1] += 1;
            this.times[2] -= 100;
        }

        if (this.times[1] >= 60) {
            this.times[0] += 1;
            this.times[1] -= 60;
        }
    }

    print() {
        this.display.innerText = this.format(this.times);
    }

    format(times) {
        return `\
        ${pad0(times[0], 2)}:\
        ${pad0(times[1], 2)}:\
        ${pad0(Math.floor(times[2]), 2)}`;
    }
}

function pad0(value, count) {
    var result = value.toString();
    for (; result.length < count; --count)
        result = '0' + result;
    return result;
}

function clearChildren(node) {
    while (node.lastChild)
        node.removeChild(node.lastChild);
}

let stopwatch = new Stopwatch(
    document.querySelector('.stopwatch'),
    document.querySelector('.checkpoint'));
