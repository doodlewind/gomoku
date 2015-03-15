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

    var sifu = {};

    sifu.think = function(goban, color) {
        this.goban = copy(goban);
        var answer = minimaxWithMove(this.goban, 1, color);
        // alert(answer.x + '-' + answer.y);
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

        if (bThree + fours > 1) {
            count += (bThree + bFour) * 50;
        }else {
            count += (bTwo + bThree * 2 + bFour * 2) * 10;
        }
        if (hasFive(BLACK) || hasOpenFour(BLACK)) {
            count += 1000;
        }

        if (wThree + wFour > 1) {
            count -= (wThree + wFour) * 50;
        }else {
            count -= (wTwo + wThree * 2 + wFour * 2) * 10;
        }
        if (hasFive(WHITE) || hasOpenFour(WHITE)) {
            count -= 1000;
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

    function show(score, row, col) {
        var square= document.getElementsByClassName('row r-' + row)[0].children[col];
        square.innerHTML = '<span class="score">' + score + '</span>';
    }

    function minimaxWithMove(goban, depth, color) {
        var pos, score;
        var g = goban;

        if (color == WHITE) {
            var value = 9999;
            for (var i = 0; i < SIZE; i++) {
                for (var j = 0; j < SIZE; j++) {
                    if (g[i][j] == EMPTY) {
                        g[i][j] = WHITE;
                        //score = sifu.evaluate(g, BLACK);
                        score = minimax(g, depth, BLACK);
                        if (score < value) {
                            value = score;
                            pos = {x: i, y: j};
                        }
                        g[i][j] = EMPTY;
                        //show(alpha, i, j);
                    }
                }
            }
        }
        return pos;
    }

    function minimax(goban, depth, color) {
        var pos, score;
        var g = goban;
        if (depth == 0) return sifu.evaluate(g, color);

        if (color == BLACK) {
            var value = -9999;
            for (var i = 0; i < SIZE; i++) {
                for (var j = 0; j < SIZE; j++) {
                    if (g[i][j] == EMPTY) {
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