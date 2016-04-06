var board;
var ADD_BLACK_CHIP = "<div class='black'></div>";
var ADD_WHITE_CHIP = "<div class='white'></div>";
var CURRENT_PLAYER = "black"; // player 1 = black || player 2 = white
var MOVES = 0;


$('document').ready(function () {

    board = document.getElementById('board');

});

function insertChip(col) {

    var flag = true;
    var i = 1;
    var lastRow;

    while (flag && i < 7) {
        lastRow = board.rows[board.rows.length - i];  // insert at the bottom
        if ($(lastRow).find('td:nth-child(' + col + ')').html().length === 0) {
            if (CURRENT_PLAYER === "black") {
                $(lastRow).find('td:nth-child(' + col + ')').html(ADD_BLACK_CHIP);
            }
            else {
                $(lastRow).find('td:nth-child(' + col + ')').html(ADD_WHITE_CHIP);
            }
            flag = false;
            checkWinner(lastRow, col);
        } else {
            i++;
        }
    }
    if (i > 6) {
        alert("Invalid Move");
    }

}

function checkWinner(lastRow, col) {
    checkRow(lastRow);
    checkColumn(col);
    checkLTRDiagonal(lastRow, col);     // Left to Right
    checkRTLDiagonal(lastRow, col);     // Right to Left
    checkMoves();
    updateCurrentPlayer();
}

function checkRow(lastRow) {
    var count = 0;
    $(lastRow).find('td').each (function () {
        if ($(this).find('div').hasClass(CURRENT_PLAYER)) {
            count++;
        } else {
            count = 0;
        }

        if (count === 4) {
            weHaveAWinner();
            return false;
        }
    });
}

function checkColumn(col) {
    var i = 1;
    var count = 0;
    var thisRow;
    while (i < 7) {
        thisRow = board.rows[board.rows.length - i];
        if ($(thisRow).find('td:nth-child(' + col + ')').find('div').hasClass(CURRENT_PLAYER)) {
            count++;
        } else {
            count = 0;
        }

        if (count === 4) {
            weHaveAWinner();
            return false;
        }
        i++;
    }
}

function checkLTRDiagonal(lastRow, col) {
    var rowIndex = $(lastRow).index();
    var colIndex = col;

    while (rowIndex < 6 && colIndex > 1) { // move current row and column index to bottom left to start checking from left to right diagonal winner
        rowIndex++;
        colIndex--;
    }

    var count = 0;
    while (rowIndex >= 1 && colIndex <= 7) {
        var thisRow = board.rows[rowIndex];
        if ($(thisRow).find('td:nth-child(' + colIndex + ')').find('div').hasClass(CURRENT_PLAYER)) {
            count++;
        } else {
            count = 0;
        }

        if (count === 4) {
            weHaveAWinner();
            return false;
        }
        rowIndex--;
        colIndex++;
    }
}

function checkRTLDiagonal(lastRow, col) {
    var rowIndex = $(lastRow).index();
    var colIndex = col;

    while (rowIndex < 6 && colIndex < 7) { // move current row and column index to bottom right to start checking from right to left diagonal winner
        rowIndex++;
        colIndex++;
    }

    var count = 0;
    while (rowIndex > 1 && colIndex >= 1) {

        var thisRow = board.rows[rowIndex];
        if ($(thisRow).find('td:nth-child(' + colIndex + ')').find('div').hasClass(CURRENT_PLAYER)) {
            count++;
        } else {
            count = 0;
        }

        if (count === 4) {
            weHaveAWinner();
            return false;
        }

        rowIndex--;
        colIndex--;
    }
}

function checkMoves(){
    MOVES++;
    if (MOVES == 42){
        draw();
    }
}

// update current player
function updateCurrentPlayer() {
    if (CURRENT_PLAYER === 'black') {
        CURRENT_PLAYER = 'white';
        $("#insert-row").attr('class', 'white-player');
        $(".current-player span").css('color', 'white');
        $(".current-player span").html('white');
    }
    else {
        CURRENT_PLAYER = 'black';
        $("#insert-row").attr('class', 'black-player');
        $(".current-player span").css('color', 'black');
        $(".current-player span").html('black');
    }
}

function weHaveAWinner() {
    alert(CURRENT_PLAYER + " wins!");
    $("#insert-row button").removeAttr ('onclick');
    $(".current-player").html(CURRENT_PLAYER + " wins!");
}

function draw(){
    alert("Game is a draw!");
    $("#insert-row button").removeAttr ('onclick');
}