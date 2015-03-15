// Sifu is an algorithm designed for Gomoku
// SIFU.think() receives 2 arguments
//   1. an 2d array by 15x15
//   2. the color it plays
// then returns row and column number of its next move

var SIFU = (function() {
    var EMPTY = 0;
    var BLACK = 1;
    var WHITE = 2;
    var SIZE = 10;
    var DEPTH = 2;

    var sifu = {};
    sifu.think = function(goban, color) {
        var answer = minimaxWithMove(goban, DEPTH, color);
        return answer;
    };

    sifu.evaluate = function(goban, color) {
        var count = 0;

        function hasFive(color) {
            var g = copy(goban);

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

        function hasOpenFour(color) {
            var g = copy(goban);

            for (var i = 0; i < SIZE; i++) {
                for (var j = 0; j < SIZE; j++) {
                    if (
                        (j + 5) in g &&
                        g[i][j] == EMPTY &&
                        g[i][j + 1] == color &&
                        g[i][j + 2] == color &&
                        g[i][j + 3] == color &&
                        g[i][j + 4] == color &&
                        g[i][j + 5] == EMPTY
                    ) return true;
                    else if (
                        (i + 5) in g &&
                        g[i][j] == EMPTY &&
                        g[i + 1][j] == color &&
                        g[i + 2][j] == color &&
                        g[i + 3][j] == color &&
                        g[i + 4][j] == color &&
                        g[i + 5][j] == EMPTY
                    ) return true;
                    else if (
                        (i + 5) in g &&
                        (j + 5) in g &&
                        g[i][j] == EMPTY &&
                        g[i + 1][j + 1] == color &&
                        g[i + 2][j + 2] == color &&
                        g[i + 3][j + 3] == color &&
                        g[i + 4][j + 4] == color &&
                        g[i + 5][j + 5] == EMPTY
                    ) return true;
                    else if (
                        (i - 5) in g &&
                        (j + 5) in g &&
                        g[i][j] == EMPTY &&
                        g[i - 1][j + 1] == color &&
                        g[i - 2][j + 2] == color &&
                        g[i - 3][j + 3] == color &&
                        g[i - 4][j + 4] == color &&
                        g[i - 5][j + 5] == EMPTY
                    ) return true;
                }
            }
            return false;
        }

        function fours(color) {
            var g = copy(goban);

            var count = 0;

            for (var i = 0; i < SIZE; i++) {
                for (var j = 0; j < SIZE; j++) {
                    if (
                        (j + 4) in g &&
                        g[i][j] == color &&
                        g[i][j + 1] == color &&
                        g[i][j + 2] == color &&
                        g[i][j + 3] == color &&
                        g[i][j + 4] == EMPTY ||

                        (j + 4) in g &&
                        g[i][j] == EMPTY &&
                        g[i][j + 1] == color &&
                        g[i][j + 2] == color &&
                        g[i][j + 3] == color &&
                        g[i][j + 4] == color
                    ) count++;
                    if (
                        (i + 4) in g &&
                        g[i][j] == color &&
                        g[i + 1][j] == color &&
                        g[i + 2][j] == color &&
                        g[i + 3][j] == color &&
                        g[i + 4][j] == EMPTY ||

                        (i + 4) in g &&
                        g[i][j] == EMPTY &&
                        g[i + 1][j] == color &&
                        g[i + 2][j] == color &&
                        g[i + 3][j] == color &&
                        g[i + 4][j] == color
                    ) count++;
                    if (
                        (i + 4) in g &&
                        (j + 4) in g &&
                        g[i][j] == color &&
                        g[i + 1][j + 1] == color &&
                        g[i + 2][j + 2] == color &&
                        g[i + 3][j + 3] == color &&
                        g[i + 4][j + 4] == EMPTY ||

                        (i + 4) in g &&
                        (j + 4) in g &&
                        g[i][j] == EMPTY &&
                        g[i + 1][j + 1] == color &&
                        g[i + 2][j + 2] == color &&
                        g[i + 3][j + 3] == color &&
                        g[i + 4][j + 4] == color
                    ) count++;
                    if (
                        (i - 4) in g &&
                        (j + 4) in g &&
                        g[i][j] == color &&
                        g[i - 1][j + 1] == color &&
                        g[i - 2][j + 2] == color &&
                        g[i - 3][j + 3] == color &&
                        g[i - 4][j + 4] == EMPTY ||

                        (i - 4) in g &&
                        (j + 4) in g &&
                        g[i][j] == EMPTY &&
                        g[i - 1][j + 1] == color &&
                        g[i - 2][j + 2] == color &&
                        g[i - 3][j + 3] == color &&
                        g[i - 4][j + 4] == color
                    ) count++;


                    if (
                        (j + 4) in g &&
                        g[i][j] == color &&
                        (
                        g[i][j + 1] == EMPTY &&
                        g[i][j + 2] == color &&
                        g[i][j + 3] == color ||

                        g[i][j + 1] == color &&
                        g[i][j + 2] == EMPTY &&
                        g[i][j + 3] == color ||

                        g[i][j + 1] == color &&
                        g[i][j + 2] == color &&
                        g[i][j + 3] == EMPTY
                        ) &&
                        g[i][j + 4] == color
                    ) count++;
                    if (
                        (i + 4) in g &&
                        g[i][j] == color &&
                        (
                        g[i + 1][j] == EMPTY &&
                        g[i + 2][j] == color &&
                        g[i + 3][j] == color ||

                        g[i + 1][j] == color &&
                        g[i + 2][j] == EMPTY &&
                        g[i + 3][j] == color ||

                        g[i + 1][j] == color &&
                        g[i + 2][j] == color &&
                        g[i + 3][j] == EMPTY
                        ) &&
                        g[i + 4][j] == color
                    ) count++;
                    if (
                        (i + 4) in g &&
                        (j + 4) in g &&
                        g[i][j] == color &&
                        (
                        g[i + 1][j + 1] == EMPTY &&
                        g[i + 2][j + 2] == color &&
                        g[i + 3][j + 3] == color ||

                        g[i + 1][j + 1] == color &&
                        g[i + 2][j + 2] == EMPTY &&
                        g[i + 3][j + 3] == color ||

                        g[i + 1][j +1] == color &&
                        g[i + 2][j + 2] == color &&
                        g[i + 3][j + 3] == EMPTY
                        ) &&
                        g[i + 4][j + 4] == color
                    ) count++;
                    if (
                        (i - 4) in g &&
                        (j + 4) in g &&
                        g[i][j] == color &&
                        (
                        g[i - 1][j + 1] == EMPTY &&
                        g[i - 2][j + 2] == color &&
                        g[i - 3][j + 3] == color ||

                        g[i - 1][j + 1] == color &&
                        g[i - 2][j + 2] == EMPTY &&
                        g[i - 3][j + 3] == color ||

                        g[i - 1][j +1] == color &&
                        g[i - 2][j + 2] == color &&
                        g[i - 3][j + 3] == EMPTY
                        ) &&
                        g[i - 4][j + 4] == color
                    ) count++;
                }
            }
            return count;
        }

        function openThrees(color) {
            var count = 0;
            var g = copy(goban);

            for (var i = 0; i < SIZE; i++) {
                for (var j = 0; j < SIZE; j++) {
                    if (
                        (j + 4) in g &&
                        g[i][j] == EMPTY &&
                        g[i][j + 1] == color &&
                        g[i][j + 2] == color &&
                        g[i][j + 3] == color &&
                        g[i][j + 4] == EMPTY
                    ) count++;
                    if (
                        (i + 4) in g &&
                        g[i][j] == EMPTY &&
                        g[i + 1][j] == color &&
                        g[i + 2][j] == color &&
                        g[i + 3][j] == color &&
                        g[i + 4][j] == EMPTY
                    ) count++;
                    if (
                        (i + 4) in g &&
                        (j + 4) in g &&
                        g[i][j] == EMPTY &&
                        g[i + 1][j + 1] == color &&
                        g[i + 2][j + 2] == color &&
                        g[i + 3][j + 3] == color &&
                        g[i + 4][j + 4] == EMPTY
                    ) count++;
                    if (
                        (i - 4) in g &&
                        (j + 4) in g &&
                        g[i][j] == EMPTY &&
                        g[i - 1][j + 1] == color &&
                        g[i - 2][j + 2] == color &&
                        g[i - 3][j + 3] == color &&
                        g[i - 4][j + 4] == EMPTY
                    ) count++;
                }
            }
            return count;
        }

        function openTwos(color) {
            var count = 0;
            var g = copy(goban);

            for (var i = 0; i < SIZE; i++) {
                for (var j = 0; j < SIZE; j++) {
                    if (
                        (j + 3) in g &&
                        g[i][j] == EMPTY &&
                        g[i][j + 1] == color &&
                        g[i][j + 2] == color &&
                        g[i][j + 3] == EMPTY
                    ) count++;
                    if (
                        (i + 3) in g &&
                        g[i][j] == EMPTY &&
                        g[i + 1][j] == color &&
                        g[i + 2][j] == color &&
                        g[i + 3][j] == EMPTY
                    ) count++;
                    if (
                        (i + 3) in g &&
                        (j + 3) in g &&
                        g[i][j] == EMPTY &&
                        g[i + 1][j + 1] == color &&
                        g[i + 2][j + 2] == color &&
                        g[i + 3][j + 3] == EMPTY
                    ) count++;
                    if (
                        (i - 3) in g &&
                        (j + 3) in g &&
                        g[i][j] == EMPTY &&
                        g[i - 1][j + 1] == color &&
                        g[i - 2][j + 2] == color &&
                        g[i - 3][j + 3] == EMPTY
                    ) count++;
                }
            }
            return count;
        }

        var bTwo = openTwos(BLACK);
        var bThree = openThrees(BLACK);
        var bFour = fours(BLACK);

        var wTwo = openTwos(WHITE);
        var wThree = openThrees(WHITE);
        var wFour = fours(WHITE);

        if (bThree + bFour > 1) {
            count += (bThree + bFour) * 1000;
        }else {
            count += (bTwo + bThree * 2 + bFour * 2) * 80;
        }
        if (hasOpenFour(BLACK)) {
            count += 500;
        }
        if (hasFive(BLACK)) {
            count += 2000;
        }

        if (wThree + wFour > 1) {
            count -= (wThree + wFour) * 500;
        }else {
            count -= (wTwo + wThree * 2 + wFour * 2) * 80;
        }
        if (hasOpenFour(WHITE)) {
            count -= 500;
        }
        if (hasFive(WHITE)) {
            count -= 2000;
        }
        return count;
    };

    function copy(goban) {
        var g = [];
        for (var i = 0; i < SIZE; i++) {
            g[i] = [];
            for (var j = 0; j < SIZE; j++) {
                g[i][j] = goban[i][j];
            }
        }
        return g;
    }

    function setVision(goban) {
        var vision = [];
        for (var i = 0; i < SIZE; i++) {
            vision[i] = [];
            for (var j = 0; j < SIZE; j++) {
                vision[i][j] = false;
            }
        }

        for (var i = 0; i < SIZE; i++) {
            for (var j = 0; j < SIZE; j++) {
                if (goban[i][j] != EMPTY) {
                    var x = Math.max(i - 1, 0);
                    var xMax = Math.min(i + 1, SIZE - 1);
                    var yMax = Math.min(j + 1, SIZE - 1);
                    for (; x <= xMax; x++) {
                        var y = Math.max(j - 1, 0);
                        for (; y <= yMax; y++) {
                            vision[x][y] = true;
                        }
                    }
                }
            }
        }
        return vision;
    }

    function show(score, row, col) {
        var square= document.getElementsByClassName('row r-' + row)[0].children[col];
        square.innerHTML = '<span class="score">' + score + '</span>';
    }

    function minimaxWithMove(goban, depth, color) {
        var pos, score;
        var g = goban;
        var vision = setVision(goban);

        if (color == WHITE) {
            var value = 9999;
            for (var i = 0; i < SIZE; i++) {
                for (var j = 0; j < SIZE; j++) {
                    if (vision[i][j] == true && g[i][j] == EMPTY) {
                        g[i][j] = WHITE;
                        // score = sifu.evaluate(g, BLACK);
                        score = minimax(g, depth - 1, BLACK);
                        if (score < value) {
                            value = score;
                            pos = {x: i, y: j};
                        }
                        g[i][j] = EMPTY;
                        // show(alpha, i, j);
                    }
                }
            }
        }
        return pos;
    }

    function minimax(goban, depth, color) {
        var pos, score;
        var g = goban;
        var vision = setVision(goban);

        if (depth == 0) return sifu.evaluate(g, color);

        if (color == BLACK) {
            var value = -9999;
            for (var i = 0; i < SIZE; i++) {
                for (var j = 0; j < SIZE; j++) {
                    if (vision[i][j] == true && g[i][j] == EMPTY) {
                        g[i][j] = BLACK;

                        score = minimax(g, depth - 1, WHITE);
                        if (score > value) {
                            value = score;
                            pos = {x: i, y: j};
                        }
                        g[i][j] = EMPTY;
                    }
                }
            }
        }

        else if (color == WHITE) {
            var value = 9999;
            for (var i = 0; i < SIZE; i++) {
                for (var j = 0; j < SIZE; j++) {
                    if (g[i][j] == EMPTY) {
                        g[i][j] = WHITE;

                        score = minimax(g, depth - 1, BLACK);
                        if (score < value) {
                            value = score;
                            pos = {x: i, y: j};
                        }
                        g[i][j] = EMPTY;
                    }
                }
            }
        }
        return value;
    }

    return sifu;
}());