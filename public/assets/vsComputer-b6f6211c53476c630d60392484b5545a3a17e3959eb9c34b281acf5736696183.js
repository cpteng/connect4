var board;
var ADD_BLACK_CHIP = "<div class='black'></div>";
var ADD_WHITE_CHIP = "<div class='white'></div>";
var CURRENT_PLAYER = "black"; // player 1 = black || computer = white
var MOVES = 0;
var WIN_FLAG = false;
var AI_BAD_MOVES = [];
var AI_GOOD_MOVES = [];

$('document').ready(function () {

    board = document.getElementById('board');

});

function insertChip(col) {

    var flag = true;
    var i = 1;
    var lastRow;
    while (flag && i < 7 && !WIN_FLAG) {
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
    while (rowIndex >= 1 && colIndex >= 1) {

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

function checkMoves() {
    MOVES++;
    if (MOVES == 42) {
        draw();
    }
}

// update current player
function updateCurrentPlayer() {
    if (CURRENT_PLAYER === 'black') {
        CURRENT_PLAYER = 'white';
        // computer's turn
        console.log("AI's turn");

        AI_BAD_MOVES = [];
        AI_GOOD_MOVES = [];

        AIthink();

        var cell;
        //var rowIndex;
        var colIndex;

        if (AI_GOOD_MOVES.length === 0) { // no more good moves left
            cell = Math.floor(Math.random() * AI_BAD_MOVES.length);
            //rowIndex = AI_BAD_MOVES[cell].rowIndex;
            colIndex = AI_BAD_MOVES[cell].colIndex;
        } else {
            cell = Math.floor(Math.random() * AI_GOOD_MOVES.length);
            //rowIndex = AI_GOOD_MOVES[cell].rowIndex;
            colIndex = AI_GOOD_MOVES[cell].colIndex;
        }

        insertChip(colIndex);

    } else {
        CURRENT_PLAYER = 'black';
    }
}

function weHaveAWinner() {
    WIN_FLAG = true;
    alert(CURRENT_PLAYER + " wins!");
    $("#insert-row button").removeAttr ('onclick');
    $(".current-player").html(CURRENT_PLAYER + " wins!");
}

function draw() {
    alert("Game is a draw!");
    $("#insert-row button").removeAttr ('onclick');
}

// AI Starts Here

function AIthink() {
    var possibleMoves = getAllPossibleMoves();
    simulateEachMove(possibleMoves);
}

function getAllPossibleMoves() {

    console.log("AI is getting all possible moves");

    var y = 1;
    var lastRow;
    var possibleMoves = [];

    while (y < 8) { // column
        var i = 1;
        while (i < 7) { // row
            lastRow = board.rows[board.rows.length - i];
            if ($(lastRow).find('td:nth-child(' + y + ')').html().length === 0) {
                var obj = {'rowIndex': $(lastRow).index(), colIndex: y};
                possibleMoves.push(obj);
                //alert(possibleMoves);
                break;
            } else {
                i++;
            }
        }
        y++;
    }

    return possibleMoves;
}

function simulateEachMove(possibleMoves) {

    console.log("AI is simulating each next move");

    var i = 0;
    var rowIndex;
    var colIndex;
    var win = false;

    while (i < possibleMoves.length) {

        rowIndex = possibleMoves[i].rowIndex;
        colIndex = possibleMoves[i].colIndex;

        win = checkWinningMove(rowIndex, colIndex);

        if (win) {
            console.log("AI got this!");
            insertChip(colIndex);
            return false;
        }

        i++;
    }
}

function simulateEachMovePlayer(possibleMoves) {

    console.log("AI is simulating each next move for player");

    var i = 0;
    var rowIndex;
    var colIndex;
    var win = false;

    while (i < possibleMoves.length) {

        rowIndex = possibleMoves[i].rowIndex;
        colIndex = possibleMoves[i].colIndex;

        win = checkWinningMoveForPlayer(rowIndex, colIndex);

        if (win) {
            console.log("Player got this!");
            win = true;
            break;
        }
        i++;
    }
    return win;
}

function checkWinningMove(rowIndex, colIndex) {

    console.log("AI is simulating " + rowIndex + " " + colIndex);

    var thisRow = board.rows[rowIndex];
    $(thisRow).find('td:nth-child(' + colIndex + ')').html(ADD_WHITE_CHIP);
    if (winCheckRow(rowIndex) || winCheckColumn(colIndex) || winCheckLTRDiagonal(rowIndex, colIndex) || winCheckRTLDiagonal(rowIndex, colIndex)) {
        $(thisRow).find('td:nth-child(' + colIndex + ')').html('');
        return true;
    } else {
        if (thinkAhead()) {
            var obj = {'rowIndex': rowIndex, colIndex: colIndex};
            AI_BAD_MOVES.push(obj);
        } else {
            var obj = {'rowIndex': rowIndex, colIndex: colIndex};
            AI_GOOD_MOVES.push(obj);
        }
        CURRENT_PLAYER = 'white';
        $(thisRow).find('td:nth-child(' + colIndex + ')').html('');
        return false;
    }
}

function thinkAhead() {
    console.log("AI is now thinking 1 step ahead");
    CURRENT_PLAYER = 'black';
    var possibleMoves = getAllPossibleMoves();
    return simulateEachMovePlayer(possibleMoves);

}

function checkWinningMoveForPlayer(rowIndex, colIndex) {

    console.log("AI is simulating " + rowIndex + " " + colIndex);

    var thisRow = board.rows[rowIndex];
    $(thisRow).find('td:nth-child(' + colIndex + ')').html(ADD_BLACK_CHIP);
    if (winCheckRow(rowIndex) || winCheckColumn(colIndex) || winCheckLTRDiagonal(rowIndex, colIndex) || winCheckRTLDiagonal(rowIndex, colIndex)) {
        $(thisRow).find('td:nth-child(' + colIndex + ')').html('');
        return true;
    } else {
        $(thisRow).find('td:nth-child(' + colIndex + ')').html('');
        return false;
    }
}

function winCheckRow(rowIndex) {

    console.log("AI is checking to win in row");

    var row = board.rows[rowIndex];
    var count = 0;
    var result = false;

    $(row).find('td').each (function () {
        if ($(this).find('div').hasClass(CURRENT_PLAYER)) {
            count++;
        } else {
            count = 0;
        }

        if (count === 4) { // win!
            result = true;
        }
    });
    return result;
}

function winCheckColumn(colIndex) {

    console.log("AI is checking to win in column");

    var thisRow;
    var i = 1;
    var count = 0;
    var result = false;

    while (i < 7) {
        thisRow = board.rows[board.rows.length - i];
        if ($(thisRow).find('td:nth-child(' + colIndex + ')').find('div').hasClass(CURRENT_PLAYER)) {
            count++;
        } else {
            count = 0;
        }

        if (count === 4) {
            result = true;
        }
        i++;
    }
    return result;
}

function winCheckLTRDiagonal(rowIndex, colIndex) {

    console.log("AI is checking to win in LTR Diagonal");
    var result = false;

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
            result = true;
        }
        rowIndex--;
        colIndex++;
    }
    return result;
}

function winCheckRTLDiagonal(rowIndex, colIndex) {

    console.log("AI is checking to win in RTL Diagonal");
    var result = false;

    while (rowIndex < 6 && colIndex < 7) { // move current row and column index to bottom right to start checking from right to left diagonal winner
        rowIndex++;
        colIndex++;
    }

    var count = 0;
    while (rowIndex >= 1 && colIndex >= 1) {

        var thisRow = board.rows[rowIndex];
        if ($(thisRow).find('td:nth-child(' + colIndex + ')').find('div').hasClass(CURRENT_PLAYER)) {
            count++;
        } else {
            count = 0;
        }

        if (count === 4) {
            result = true;
        }

        rowIndex--;
        colIndex--;
    }
    return result;
}
