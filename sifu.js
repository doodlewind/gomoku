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
    sifu.think = function(goban, level, color) {
        var answer = minimaxWithMove(goban, level, color);
        return answer;
    };

    sifu.evaluate = function(goban, color) {
        var count = 0;
        var g = goban;

        function hasFive(color) {
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

    function minimaxWithMove(goban, depth, color) {
        //var start = new Date().getTime();
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
                        score = minimax(g, vision, depth - 1, -9999, 9999, BLACK);
                        g[i][j] = EMPTY;
                        if (score < value) {
                            value = score;
                            pos = {x: i, y: j};
                        }
                        // show(alpha, i, j);
                    }
                }
            }
        }

        else {
            var value = -9999;
            for (var i = 0; i < SIZE; i++) {
                for (var j = 0; j < SIZE; j++) {
                    if (vision[i][j] == true && g[i][j] == EMPTY) {
                        g[i][j] = BLACK;
                        score = minimax(g, vision, depth - 1, -9999, 9999, WHITE);
                        g[i][j] = EMPTY;
                        if (score > value) {
                            value = score;
                            pos = {x: i, y: j};
                        }
                    }
                }
            }
        }

        //var end = new Date().getTime();
        return pos;
    }

    function minimax(goban, vision, depth, alpha, beta, color) {
        var pos, score;
        var g = goban;

        if (depth == 0) return sifu.evaluate(g, color);

        if (color == BLACK) {
            var value = -9999;
            for (var i = 0; i < SIZE; i++) {
                for (var j = 0; j < SIZE; j++) {
                    if (vision[i][j] == true && g[i][j] == EMPTY) {

                        g[i][j] = BLACK;
                        score = minimax(g, vision, depth - 1, alpha, beta, WHITE);
                        g[i][j] = EMPTY;

                        if (score > value) {
                            value = score;
                            pos = {x: i, y: j};
                        }
                        alpha = Math.max(alpha, score);
                        if (alpha >= beta) {
                            break;
                        }
                    }
                }
            }
        }

        else if (color == WHITE) {
            var value = 9999;
            for (var i = 0; i < SIZE; i++) {
                for (var j = 0; j < SIZE; j++) {
                    if (vision[i][j] == true && g[i][j] == EMPTY) {

                        g[i][j] = WHITE;
                        score = minimax(g, vision, depth - 1, alpha, beta, BLACK);
                        g[i][j] = EMPTY;
                        if (score < value) {
                            value = score;
                            pos = {x: i, y: j};
                        }

                        beta = Math.min(beta, score);
                        if (beta <= alpha) {
                            break;
                        }
                    }
                }
            }
        }
        return value;
    }

    return sifu;
}());

self.onmessage = function (event) {
    var data = event.data;
    var pos = SIFU.think(data.goban, data.level, data.color);
    self.postMessage(pos);
};
