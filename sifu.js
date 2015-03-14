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
        var answer = minimaxWithMove(this.goban, 2, color);
        // alert(answer.x + '-' + answer.y);
        return answer;
    };

    sifu.evaluate = function(goban) {
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

        var two = openTwos(BLACK);
        var three = openThrees(BLACK);
        var four = fours(BLACK);

        if (three + fours > 1) {
            count += (three + four) * 50;
        }else {
            count += (two + three * 2 + four * 2) * 10;
        }
        if (hasFive(BLACK) || hasOpenFour(BLACK)) {
            count += 1000;
        }

        var wTwo = openTwos(WHITE);
        var wThree = openThrees(WHITE);
        var wFour = fours(WHITE);
        if (wThree + wFour > 1) {
            count -= (wThree + wFour) * 30;
        }else {
            count -= (wTwo + wThree * 2 + wFour * 2) * 8;
        }
        if (hasFive(WHITE) || hasOpenFour(WHITE)) {
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

    function show(score, row, col) {
        var square= document.getElementsByClassName('row r-' + row)[0].children[col];
        square.innerHTML = '<span class="score">' + score + '</span>';
    }

    function minimaxWithMove(goban, depth, color) {
        var pos;
        var pre;
        var g = copy(goban);

        if (color == WHITE) {
            var alpha = 9999;
            for (var i = 0; i < SIZE; i++) {
                for (var j = 0; j < SIZE; j++) {
                    if (g[i][j] == EMPTY) {
                        g[i][j] = WHITE;
                        //alpha = Math.min(alpha, minimax(g, pos, depth, WHITE));
                        var score = sifu.evaluate(g, i, j, WHITE);
                        //show(score, i, j);
                        if (score < alpha) {
                            alpha = score;
                            pos = {x: i, y: j};
                        }
                        g[i][j] = EMPTY;
                    }
                }
            }
        }
        return pos;
    }

    function minimax(goban, pos, depth, color) {
        var g = copy(goban);
        g[pos.x][pos.y] = color;
        if (depth == 0) return sifu.evaluate(g, pos);

        if (color == BLACK) {
            var alpha = -9999;
            for (var i = 0; i < SIZE; i++) {
                for (var j = 0; j < SIZE; j++) {
                    if (g[i][j] == EMPTY) {
                        var p = {x: i, y: j};
                        alpha = Math.max(alpha, minimax(g, p, depth - 1, WHITE));
                    }
                }
            }
        }

        else if (color == WHITE) {
            var alpha = 9999;
            for (var i = 0; i < SIZE; i++) {
                for (var j = 0; j < SIZE; j++) {
                    if (g[i][j] == EMPTY) {
                        var p = {x: i, y: j};
                        alpha = Math.min(alpha, minimax(g, p, depth - 1, BLACK));
                    }
                }
            }
        }
        return alpha;
    }

    return sifu;
}());