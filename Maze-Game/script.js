
// MODAL
var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];


modalAgain = function () {

    modal.style.display = "block";
    x = document.querySelector(".gamehead");
    x.textContent = "Game Over"

}

modalWin = function () {

    modal.style.display = "block";
    x = document.querySelector(".gamehead");
    x.textContent = "Congrats! You Win"

}

document.getElementById("demo").addEventListener("click", reloadGame);

function reloadGame() {
    document.location.reload();
}


span.onclick = function () {
    modal.style.display = "none";
}


window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


// TIMER COUNTDOWN
function startTimer(duration, display) {
    var start = Date.now(),
        diff,
        minutes,
        seconds;

    function timer() {
        if (playing) {
            diff = duration - (((Date.now() - start) / 1000) | 0);
            minutes = (diff / 60) | 0;
            seconds = (diff % 60) | 0;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            display.textContent = "Game ends in " + minutes + ":" + seconds;

            if (diff <= 0) {
                display.textContent = "Game Over";
                start = Date.now() + 1000;
                playing = false
                modalAgain();
            }
        }
    };
    timer();
    setInterval(timer, 1000)
}

window.onload = function () {
    twominutes = 30;
    x = document.querySelector("#timerel");
    startTimer(twominutes, x)
}
playing = true
window.addEventListener('keydown', doKeyDown, true);


// MOVING AROUND THE MAZE
function doKeyDown(evt) {
    var handled = false;
    if (playing) {
        switch (evt.keyCode) {
            case 38:
                m.moveup("canvas");
                handled = true
                break;
            case 87:
                m.moveup("canvas");
                handled = true
                break;
            case 40:
                m.movedown("canvas");
                handled = true
                break;
            case 83:
                m.movedown("canvas");
                handled = true
                break;
            case 37:
                m.moveleft("canvas");
                handled = true
                break;
            case 65:
                m.moveleft("canvas");
                handled = true
                break;
            case 39:
                m.moveright("canvas");
                handled = true
                break;
            case 68:
                m.moveright("canvas");
                handled = true
                break;
        }
        if (m.checker("canvas"))
            playing = false
        console.log(m.getMoves())

    }
    if (handled)
        evt.preventDefault();
}


var dsd = function (size) {
    this.N = size;
    this.P = new Array(this.N);
    this.R = new Array(this.N);

    this.init = function () {
        for (var i = 0; i < this.N; i++) {
            this.P[i] = i;
            this.R[i] = 0;
        }
    }

    this.union = function (x, y) {
        var u = this.find(x);
        var v = this.find(y);
        if (this.R[u] > this.R[v]) {
            this.R[u] = this.R[v] + 1;
            this.P[u] = v;
        }
        else {
            this.R[v] = this.R[u] + 1;
            this.P[v] = u;
        }
    }

    this.find = function (x) {
        if (x == this.P[x])
            return x;
        this.P[x] = this.find(this.P[x]);
        return this.P[x];
    }
};

//RANDOM MAZE ON RELOAD
function random(min, max) { return (min + (Math.random() * (max - min))); };
function randomChoice(choices) { return choices[Math.round(random(0, choices.length - 1))]; };

var maze = function (X, Y) {
    this.N = X;
    this.M = Y;
    this.S = 25;
    this.moves = 0;
    this.Board = new Array(2 * this.N + 1);
    this.EL = new Array();
    this.vis = new Array(2 * this.N + 1);
    this.delay = 2;
    this.x = 1;
    this.init = function () {
        for (var i = 0; i < 2 * this.N + 1; i++) {
            this.Board[i] = new Array(2 * this.M + 1);
            this.vis[i] = new Array(2 * this.M + 1);
        }

        for (var i = 0; i < 2 * this.N + 1; i++) {
            for (var j = 0; j < 2 * this.M + 1; j++) {
                if (!(i % 2) && !(j % 2)) {
                    this.Board[i][j] = '+';
                }
                else if (!(i % 2)) {
                    this.Board[i][j] = '-';
                }
                else if (!(j % 2)) {
                    this.Board[i][j] = '|';
                }
                else {
                    this.Board[i][j] = ' ';
                }
                this.vis[i][j] = 0;
            }
        }
    }


    this.addEdges = function () {
        for (var i = 0; i < this.N; i++) {
            for (var j = 0; j < this.M; j++) {
                if (i != this.N - 1) {
                    this.EL.push([[i, j], [i + 1, j], 1]);
                }
                if (j != this.M - 1) {
                    this.EL.push([[i, j], [i, j + 1], 1]);
                }
            }
        }
    }



    this.h = function (e) {
        return e[1] * this.M + e[0];
    }
    this.randomize = function (EL) {
        for (var i = 0; i < EL.length; i++) {
            var si = Math.floor(Math.random() * 387) % EL.length;
            var tmp = EL[si];
            EL[si] = EL[i];
            EL[i] = tmp;
        }
        return EL;
    }

    this.breakwall = function (e) {
        var x = e[0][0] + e[1][0] + 1;
        var y = e[0][1] + e[1][1] + 1;
        this.Board[x][y] = ' ';
    }

    // GENERATE MAZE
    this.generateMaze = function () {
        this.EL = this.randomize(this.EL);
        var D = new dsd(this.M * this.M);
        D.init();
        var s = this.h([0, 0]);
        var e = this.h([this.N - 1, this.M - 1]);
        this.Board[1][0] = ' ';
        this.Board[2 * this.N - 1][2 * this.M] = ' ';

        for (var i = 0; i < this.EL.length; i++) {
            var x = this.h(this.EL[i][0]);
            var y = this.h(this.EL[i][1]);
            if (D.find(s) == D.find(e)) {
                if (!(D.find(x) == D.find(s) && D.find(y) == D.find(s))) {
                    if (D.find(x) != D.find(y)) {
                        D.union(x, y);
                        this.breakwall(this.EL[i]);
                        this.EL[i][2] = 0;
                    }

                }

            }

            else if (D.find(x) != D.find(y)) {
                D.union(x, y);
                this.breakwall(this.EL[i]);
                this.EL[i][2] = 0;
            }
            else {
                continue;
            }
        }

    };

    // DRAW CANVAS
    this.drawCanvas = function (id) {
        this.canvas = document.getElementById(id);
        var scale = this.S;
        temp = []
        if (this.canvas.getContext) {
            this.ctx = this.canvas.getContext('2d');
            this.Board[1][0] = '$'
            for (var i = 0; i < 2 * this.N + 1; i++) {
                for (var j = 0; j < 2 * this.M + 1; j++) {
                    if (this.Board[i][j] != ' ') {
                        this.ctx.fillStyle = "#333";
                        this.ctx.fillRect(scale * i, scale * j, scale, scale);
                    }
                    else if (i < 5 && j < 5)
                        temp.push([i, j])
                }
            }
            x = randomChoice(temp)

            this.Board[x[0]][x[1]] = '&'
            this.ctx.fillStyle = "#c4192a";
            this.ctx.fillRect(scale * x[0], scale * x[1], scale, scale);
        }
    };

    this.checkPosition = function (id) {
        for (var i = 0; i < 2 * this.N + 1; i++) {
            for (var j = 0; j < 2 * this.M + 1; j++) {
                if (this.Board[i][j] == '&') {

                    return [i, j]
                }
            }
        }
    }

    // MOVEMENT OF THE SQUARE
    this.moveclear = function (a, b) {
        var scale = this.S;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.fillStyle = "#e27158";
        this.ctx.fillRect(scale * a, scale * b, scale, scale);
        this.Board[a][b] = ' '
    }

    this.move = function (a, b) {
        var scale = this.S;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.fillStyle = "#c4192a";
        this.ctx.fillRect(scale * a, scale * b, scale, scale);
        this.Board[a][b] = '&'
    }

    this.moveup = function (id) {
        cord = this.checkPosition(id);
        var scale = this.S;
        i = cord[0]
        j = cord[1]
        j -= 1
        if (j < 0)
            return
        else if (j > 2 * this.M)
            return
        else if (this.Board[i][j] == ' ') {
            this.moveclear(i, j + 1);
            this.move(i, j);
            this.moves += 1;
        }
        else
            return
    }

    this.movedown = function (id) {
        cord = this.checkPosition(id);
        var scale = this.S;
        i = cord[0]
        j = cord[1]
        j += 1
        if (j < 0)
            return
        else if (j > 2 * this.M)
            return
        else if (this.Board[i][j] == ' ') {
            this.moveclear(i, j - 1);
            this.move(i, j);
            this.moves += 1;
        }
        else
            return
    }

    this.moveleft = function (id) {
        cord = this.checkPosition(id);
        var scale = this.S;
        i = cord[0]
        j = cord[1]
        i -= 1
        if (i < 0)
            return
        else if (i > 2 * this.N)
            return
        else if (this.Board[i][j] == ' ') {
            this.moveclear(i + 1, j);
            this.move(i, j);
            this.moves += 1;
        }
        else
            return
    }

    this.moveright = function (id) {
        cord = this.checkPosition(id);
        var scale = this.S;
        i = cord[0]
        j = cord[1]
        i += 1
        if (i < 0)
            return
        else if (i > 2 * this.N)
            return
        else if (this.Board[i][j] == ' ') {
            this.moveclear(i - 1, j);
            this.move(i, j);
            this.moves += 1;
        }
        else
            return
    }

    //CHECK FOR WIN 
    this.checker = function (id) {

        cord = this.checkPosition(id);
        i = cord[0]
        j = cord[1]

        if ((i == 19 && j == 20) || (i == 1 && j == 0)) {
            modalWin();

            return 1
        }
        return 0
    }

    this.getMoves = function () {
        return this.moves;
    }

};

m = new maze(10, 10);
m.init();
m.addEdges();
m.generateMaze();
m.drawCanvas("canvas");
function drawMoves() {
    document.getElementById("c").innerHTML = "Moves: " + m.getMoves()
}

setInterval(drawMoves, 100);

