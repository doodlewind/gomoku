window.onload = function() {
    var BLACK = 1;
    var WHITE = 2;
    var turn = 0;
    var goban = [];
    for (var i = 0; i < 15; i++) {
        goban[i] = [];
        for (var j = 0; j < 15; j++) {
            goban[i][j] = 0;
        }
    }

    function move() {
        var row = parseInt(this.parentNode.className.split('-')[1]);
        var col = parseInt(this.className.split('-')[1]);
        if (turn % 2 == 0) set(row, col, BLACK);
        else set(row, col, WHITE);

        if (judge()) alert("End");

    }

    function judge() {

    }

    function set(row, col, COLOR) {
        if (goban[row][col] == 0 && COLOR == BLACK) {
            var square= document.getElementsByClassName('row r-' + row)[0].children[col];
            square.innerHTML = "<span class='black'>●</span>";
            goban[row][col] = BLACK;
        }

        else if (goban[row][col] == 0 && COLOR == WHITE) {
            var square= document.getElementsByClassName('row r-' + row)[0].children[col];
            square.innerHTML = "<span class='white'>●</span>";
            goban[row][col] = WHITE;
        }
        turn += 1;
    }

    var square = document.getElementsByClassName("col");
    for(var i=0;i<square.length;i++) {
        square[i].addEventListener('click', move, false);
    }
};