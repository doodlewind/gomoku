window.onload = function() {
    var EMPTY = 0;
    var BLACK = 1;
    var WHITE = 2;
    var SIZE = 10;
    var LEVEL = 2;
    var COLOR = BLACK;
    var goban = [];

    init();

    function init() {
        createGoban();
        var square = document.getElementsByClassName("col");
        for(var i = 0;i < square.length; i++) {
            square[i].addEventListener('click', move, false);
        }
        var level = document.getElementById("level");
        var color = document.getElementById("color");
        var restart = document.getElementById("restart");
        var close = document.getElementById("close");

        level.addEventListener('click', changeLevel, false);
        color.addEventListener('click', changeColor, false);
        restart.addEventListener('click', retry, false);
        close.addEventListener('click', retry, false);
    }

    function changeLevel() {
        var level = document.getElementById("level");
        if (level.innerHTML == 'Fast') {
            level.innerHTML = 'Slow';
            LEVEL = 3;
        }
        else {
            level.innerHTML = 'Fast';
            LEVEL = 2;
        }
    }

    function changeColor() {
        var color = document.getElementById("color");
        if (COLOR == BLACK) {
            COLOR = WHITE;
            color.innerHTML = "White";
        }
        else {
            COLOR = BLACK;
            color.innerHTML = "Black";
        }
        retry();
    }

    function retry() {
        for (var i = 0; i < SIZE; i++) {
            for (var j = 0; j < SIZE; j++) {
                set(i, j, EMPTY);
            }
        }
        if (COLOR == WHITE) {
            set(SIZE / 2, SIZE / 2, BLACK);
        }
    }

    function createGoban() {
        var div = document.createElement("div");
        div.id = "goban";
        if (window.innerWidth > 500) {
            var width = window.innerWidth * 0.6;
        }
        else {
            var width = window.innerWidth * 0.9;
        }
        div.style.width = width + "px";
        var colWidth = width / SIZE - 1;

        for (var i = 0; i < SIZE; i++) {
            goban[i] = [];

            var row = document.createElement("div");
            row.className = "row r-" + i;

            for (var j = 0; j < SIZE; j++) {
                var col = document.createElement("div");
                col.className = "col c-" + j;
                col.style.height = colWidth + "px";
                col.style.width = colWidth + "px";
                row.appendChild(col);

                goban[i][j] = 0;
            }
            div.appendChild(row);
        }
        document.body.appendChild(div);
    }

    function hasFive(color) {
        var g = goban;

        for (var i = 0; i < SIZE; i++) {
            for (var j = 0; j < SIZE; j++) {
                if (
                    (j + 4) in g &&
                    g[i][j] == color &&
                    g[i][j + 1] == color &&
                    g[i][j + 2] == color &&
                    g[i][j + 3] == color &&
                    g[i][j + 4] == color
                ) return true;
                else if (
                    (i + 4) in g &&
                    g[i][j] == color &&
                    g[i + 1][j] == color &&
                    g[i + 2][j] == color &&
                    g[i + 3][j] == color &&
                    g[i + 4][j] == color
                ) return true;
                else if (
                    (i + 4) in g &&
                    (j + 4) in g &&
                    g[i][j] == color &&
                    g[i + 1][j + 1] == color &&
                    g[i + 2][j + 2] == color &&
                    g[i + 3][j + 3] == color &&
                    g[i + 4][j + 4] == color
                ) return true;
                else if (
                    (i - 4) in g &&
                    (j + 4) in g &&
                    g[i][j] == color &&
                    g[i - 1][j + 1] == color &&
                    g[i - 2][j + 2] == color &&
                    g[i - 3][j + 3] == color &&
                    g[i - 4][j + 4] == color
                ) return true;
            }
        }
        return false;
    }

    function isFull() {
        for (var i = 0; i < SIZE; i++) {
            for (var j = 0; j < SIZE; j++) {
                if (goban[i][j] != EMPTY) return false;
            }
        }
        return true;
    }

    function move() {
        var worker = new Worker("sifu.js");
        worker.onmessage = function (event) {
            var pos = event.data;
            set(pos.x, pos.y, (WHITE + BLACK - COLOR));
            window.location.hash = '';
        };

        var row = parseInt(this.parentNode.className.split('-')[1]);
        var col = parseInt(this.className.split('-')[1]);

        if (goban[row][col] == EMPTY) {
            set(row, col, COLOR);
            window.location.hash = 'wait';
            var data = {
                'goban': goban,
                'level': LEVEL,
                'color': COLOR
            };
            worker.postMessage(data);
        }

        if (hasFive(BLACK)) {
            var result = document.getElementById('result');
            result.innerHTML = 'Black Won!';
            window.location.hash = 'modal';
        }
        if (hasFive(WHITE)) {
            var result = document.getElementById('result');
            result.innerHTML = 'White Won!';
            window.location.hash = 'modal';
        }
        if (isFull()) {
            var result = document.getElementById('result');
            result.innerHTML = 'Draw!';
            window.location.hash = 'modal';
        }
    }

    function set(row, col, color) {
        var square= document.getElementsByClassName('row r-' + row)[0].children[col];

        if (color == BLACK || color == WHITE) {
            var colorClass = (color == BLACK ? 'black' : 'white');
            square.innerHTML += "<span class='" + colorClass + "'>●</span>";
        }
        else {
            square.innerHTML = "";
        }
        goban[row][col] = color;
    }

};