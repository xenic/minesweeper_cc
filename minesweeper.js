let X = 5;
let Y = 5;

function gameOver(){
    $('.mine').addClass("showMines")
    alert("game over: you lost");
}

function isGameOver(){
    var boardSize = X*Y;
    var mineCount = $('.mine').length;
    var clickCount = $('.clicked').length

    return boardSize == mineCount + clickCount;

}

function clickCell(e) {
    var me = $(e.target);
    console.log(me.hasClass("mine"));
    //mine or not mine.
    if(me.hasClass("mine")){
        me.html("*");
        me.addClass("boom");
        gameOver();
    } else {
        me.addClass("clicked")
        me.html(countNeighboringMines(e.target));
    }

    if(isGameOver())
    {
        alert("game Over: you Won");
    }
    // Implement this.
}

function rightClickCell(e) {
    e.preventDefault();
    $(e.target).toggleClass("flag");
    console.log(e);
    // Implement this.
}

function countNeighboringMines(center) {
    var count = 0;
    var neighbors = getNeighbors(center);
    for(var i = 0; i < neighbors.length; i++){
        if(neighbors[i].hasClass("mine")){
            count++;
        }
    }
    return count;
}


function getCell(x, y){
    return $("#cell_" + x + "_" + y);
}

function getNeighbors(currentCell){
    // x-1,y-1   x,y-1   x+1,y-1
    // x-1,y     x,y     x+1,y
    // x-1,y+1   x,y+1   x+1, y+1
    let y = currentCell.parentNode.rowIndex;
    let x = currentCell.cellIndex;
    let xe = x-1;
    let xw = x+1;
    let yn = y-1;
    let ys = y+1;
    let ne = getCell(xe, yn);
    let n  = getCell(x,  yn);
    let nw = getCell(xw, yn);
    let e  = getCell(xe, y);
    let w  = getCell(xw,  y);
    let se = getCell(xe, ys);
    let s  = getCell(x,  ys);
    let sw = getCell(xw, ys);

    return [ne,n,nw,e,w,se,s,sw];
}


function buildGameBoard(x, y) {
    let $board = $('<table>');
    for(var i = 0; i < y; i++) {
        let $row = $('<tr>');

        $board.append($row);
        for(var j = 0; j < x; j++) {
            let $cell = $('<td>');
            $row.append($cell);
            if(Math.random() < .2) {
                $cell.addClass('mine')
            }
            $cell.attr('id', 'cell_' + j + '_' + i);
            $cell.on('click', clickCell);
            $cell.on('contextmenu', rightClickCell);
        }
    }
    $('#gameBoard').append($board);
}

function startGame(){
    buildGameBoard(X, Y);
}

$("#startButton").click(startGame)
