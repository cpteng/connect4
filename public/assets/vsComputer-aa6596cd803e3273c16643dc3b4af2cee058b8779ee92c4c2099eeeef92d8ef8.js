function insertChip(e){for(var t,n=!0,r=1;n&&7>r&&!WIN_FLAG;)t=board.rows[board.rows.length-r],0===$(t).find("td:nth-child("+e+")").html().length?("black"===CURRENT_PLAYER?$(t).find("td:nth-child("+e+")").html(ADD_BLACK_CHIP):$(t).find("td:nth-child("+e+")").html(ADD_WHITE_CHIP),n=!1,checkWinner(t,e)):r++;r>6&&alert("Invalid Move")}function checkWinner(e,t){checkRow(e),checkColumn(t),checkLTRDiagonal(e,t),checkRTLDiagonal(e,t),checkMoves(),updateCurrentPlayer()}function checkRow(e){var t=0;$(e).find("td").each(function(){return $(this).find("div").hasClass(CURRENT_PLAYER)?t++:t=0,4===t?(weHaveAWinner(),!1):void 0})}function checkColumn(e){for(var t,n=1,r=0;7>n;){if(t=board.rows[board.rows.length-n],$(t).find("td:nth-child("+e+")").find("div").hasClass(CURRENT_PLAYER)?r++:r=0,4===r)return weHaveAWinner(),!1;n++}}function checkLTRDiagonal(e,t){for(var n=$(e).index(),r=t;6>n&&r>1;)n++,r--;for(var i=0;n>=1&&7>=r;){var o=board.rows[n];if($(o).find("td:nth-child("+r+")").find("div").hasClass(CURRENT_PLAYER)?i++:i=0,4===i)return weHaveAWinner(),!1;n--,r++}}function checkRTLDiagonal(e,t){for(var n=$(e).index(),r=t;6>n&&7>r;)n++,r++;for(var i=0;n>=1&&r>=1;){var o=board.rows[n];if($(o).find("td:nth-child("+r+")").find("div").hasClass(CURRENT_PLAYER)?i++:i=0,4===i)return weHaveAWinner(),!1;n--,r--}}function checkMoves(){MOVES++,42==MOVES&&draw()}function updateCurrentPlayer(){if("black"===CURRENT_PLAYER){CURRENT_PLAYER="white",console.log("AI's turn"),AI_BAD_MOVES=[],AI_GOOD_MOVES=[],AIthink();var e,t;0===AI_GOOD_MOVES.length?(e=Math.floor(Math.random()*AI_BAD_MOVES.length),t=AI_BAD_MOVES[e].colIndex):(e=Math.floor(Math.random()*AI_GOOD_MOVES.length),t=AI_GOOD_MOVES[e].colIndex),insertChip(t)}else CURRENT_PLAYER="black"}function weHaveAWinner(){WIN_FLAG=!0,alert(CURRENT_PLAYER+" wins!"),$("#insert-row button").removeAttr("onclick"),$(".current-player").html(CURRENT_PLAYER+" wins!")}function draw(){alert("Game is a draw!"),$("#insert-row button").removeAttr("onclick")}function AIthink(){var e=getAllPossibleMoves();simulateEachMove(e)}function getAllPossibleMoves(){console.log("AI is getting all possible moves");for(var e,t=1,n=[];8>t;){for(var r=1;7>r;){if(e=board.rows[board.rows.length-r],0===$(e).find("td:nth-child("+t+")").html().length){var i={rowIndex:$(e).index(),colIndex:t};n.push(i);break}r++}t++}return n}function simulateEachMove(e){console.log("AI is simulating each next move");for(var t,n,r=0,i=!1;r<e.length;){if(t=e[r].rowIndex,n=e[r].colIndex,i=checkWinningMove(t,n))return console.log("AI got this!"),insertChip(n),!1;r++}}function simulateEachMovePlayer(e){console.log("AI is simulating each next move for player");for(var t,n,r=0,i=!1;r<e.length;){if(t=e[r].rowIndex,n=e[r].colIndex,i=checkWinningMoveForPlayer(t,n)){console.log("Player got this!"),i=!0;break}r++}return i}function checkWinningMove(e,t){console.log("AI is simulating "+e+" "+t);var n=board.rows[e];if($(n).find("td:nth-child("+t+")").html(ADD_WHITE_CHIP),winCheckRow(e)||winCheckColumn(t)||winCheckLTRDiagonal(e,t)||winCheckRTLDiagonal(e,t))return $(n).find("td:nth-child("+t+")").html(""),!0;if(thinkAhead()){var r={rowIndex:e,colIndex:t};AI_BAD_MOVES.push(r)}else{var r={rowIndex:e,colIndex:t};AI_GOOD_MOVES.push(r)}return CURRENT_PLAYER="white",$(n).find("td:nth-child("+t+")").html(""),!1}function thinkAhead(){console.log("AI is now thinking 1 step ahead"),CURRENT_PLAYER="black";var e=getAllPossibleMoves();return simulateEachMovePlayer(e)}function checkWinningMoveForPlayer(e,t){console.log("AI is simulating "+e+" "+t);var n=board.rows[e];return $(n).find("td:nth-child("+t+")").html(ADD_BLACK_CHIP),winCheckRow(e)||winCheckColumn(t)||winCheckLTRDiagonal(e,t)||winCheckRTLDiagonal(e,t)?($(n).find("td:nth-child("+t+")").html(""),!0):($(n).find("td:nth-child("+t+")").html(""),!1)}function winCheckRow(e){console.log("AI is checking to win in row");var t=board.rows[e],n=0,r=!1;return $(t).find("td").each(function(){$(this).find("div").hasClass(CURRENT_PLAYER)?n++:n=0,4===n&&(r=!0)}),r}function winCheckColumn(e){console.log("AI is checking to win in column");for(var t,n=1,r=0,i=!1;7>n;)t=board.rows[board.rows.length-n],$(t).find("td:nth-child("+e+")").find("div").hasClass(CURRENT_PLAYER)?r++:r=0,4===r&&(i=!0),n++;return i}function winCheckLTRDiagonal(e,t){console.log("AI is checking to win in LTR Diagonal");for(var n=!1;6>e&&t>1;)e++,t--;for(var r=0;e>=1&&7>=t;){var i=board.rows[e];$(i).find("td:nth-child("+t+")").find("div").hasClass(CURRENT_PLAYER)?r++:r=0,4===r&&(n=!0),e--,t++}return n}function winCheckRTLDiagonal(e,t){console.log("AI is checking to win in RTL Diagonal");for(var n=!1;6>e&&7>t;)e++,t++;for(var r=0;e>=1&&t>=1;){var i=board.rows[e];$(i).find("td:nth-child("+t+")").find("div").hasClass(CURRENT_PLAYER)?r++:r=0,4===r&&(n=!0),e--,t--}return n}var board,ADD_BLACK_CHIP="<div class='black'></div>",ADD_WHITE_CHIP="<div class='white'></div>",CURRENT_PLAYER="black",MOVES=0,WIN_FLAG=!1,AI_BAD_MOVES=[],AI_GOOD_MOVES=[];$("document").ready(function(){board=document.getElementById("board")});