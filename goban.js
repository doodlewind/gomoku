window.onload = function() {
    var EMPTY = 0;
    var BLACK = 1;
    var WHITE = 2;
    var SIZE = 10;
    var goban = [];
    var firstFlag = true;
    for (var i = 0; i < SIZE; i++) {
        goban[i] = [];
        for (var j = 0; j < SIZE; j++) {
            goban[i][j] = 0;
        }
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

    function move() {
        var row = parseInt(this.parentNode.className.split('-')[1]);
        var col = parseInt(this.className.split('-')[1]);

        if (goban[row][col] == EMPTY) {
            set(row, col, BLACK);
            var pos = SIFU.think(goban, WHITE);
            set(pos.x, pos.y, WHITE);
        }

        if (hasFive(BLACK)) alert("BLACK WINS!");
        if (hasFive(WHITE)) alert("WHITE WINS!");
    }

    function set(row, col, color) {
        var colorClass = (color == BLACK ? 'black' : 'white');
        var square= document.getElementsByClassName('row r-' + row)[0].children[col];
        square.innerHTML += "<span class='" + colorClass + "'>●</span>";
        goban[row][col] = color;
    }

    var square = document.getElementsByClassName("col");
    for(var i = 0;i < square.length; i++) {
        square[i].addEventListener('click', move, false);
    }
};