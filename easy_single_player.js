
var X_or_O = 0;
var result = false;
var count = 0;

function selectWinnerBoxes(b1, b2, b3) {
    b1.classList.add("win");
    b2.classList.add("win");
    b3.classList.add("win");
    if(b1.innerHTML == "X")
    document.getElementById("turn").innerHTML = "You Won!";
    else
    document.getElementById("turn").innerHTML = "Computer Won!";

    document.getElementById("turn").style.fontSize = "30px";
    result = true;
}

function getWinner() {
    var box1 = document.getElementById("box1"),
        box2 = document.getElementById("box2"),
        box3 = document.getElementById("box3"),
        box4 = document.getElementById("box4"),
        box5 = document.getElementById("box5"),
        box6 = document.getElementById("box6"),
        box7 = document.getElementById("box7"),
        box8 = document.getElementById("box8"),
        box9 = document.getElementById("box9");

    if (box1.innerHTML !== "" && box1.innerHTML === box2.innerHTML && box1.innerHTML === box3.innerHTML)
        selectWinnerBoxes(box1, box2, box3);

    if (box4.innerHTML !== "" && box4.innerHTML === box5.innerHTML && box4.innerHTML === box6.innerHTML)
        selectWinnerBoxes(box4, box5, box6);

    if (box7.innerHTML !== "" && box7.innerHTML === box8.innerHTML && box7.innerHTML === box9.innerHTML)
        selectWinnerBoxes(box7, box8, box9);

    if (box1.innerHTML !== "" && box1.innerHTML === box4.innerHTML && box1.innerHTML === box7.innerHTML)
        selectWinnerBoxes(box1, box4, box7);

    if (box2.innerHTML !== "" && box2.innerHTML === box5.innerHTML && box2.innerHTML === box8.innerHTML)
        selectWinnerBoxes(box2, box5, box8);

    if (box3.innerHTML !== "" && box3.innerHTML === box6.innerHTML && box3.innerHTML === box9.innerHTML)
        selectWinnerBoxes(box3, box6, box9);

    if (box1.innerHTML !== "" && box1.innerHTML === box5.innerHTML && box1.innerHTML === box9.innerHTML)
        selectWinnerBoxes(box1, box5, box9);

    if (box3.innerHTML !== "" && box3.innerHTML === box5.innerHTML && box3.innerHTML === box7.innerHTML)
        selectWinnerBoxes(box3, box5, box7);

}

function setbox(pos) {
    var crr = document.getElementById("" + pos);
    if (crr.innerHTML !== "X" && crr.innerHTML !== "O" && !result) {
        if (X_or_O % 2 == 0) {
            //console.log(X_or_O);
            crr.innerHTML = "X";
            document.getElementById("turn").innerHTML = "Your Turn";
            getWinner();

        }
        else {
            //console.log(X_or_O);
            crr.innerHTML = "O";
            document.getElementById("turn").innerHTML = "Your Turn";
            getWinner();
        }

        X_or_O += 1;
        count++;
        if (count == 9 && !result) {
            result = true;
            document.getElementById("turn").innerHTML = "Game Drawn!";
            document.getElementById("turn").style.fontSize = "30px";
        }
        if(!result)
        computer();
    }
}

function reset() {
    for (var i = 1; i <= 9; i++) {
        document.getElementById("box" + i).classList.remove("win");
        document.getElementById("box" + i).innerHTML = "";
    }
    document.getElementById("turn").innerHTML = "Start Playing!";
    document.getElementById("turn").style.fontSize = "20px";
    result = false;
    count = 0;
    X_or_O = 0;
}







function computer()
{
    var board = [['_', '_', '_'], ['_', '_', '_'], ['_', '_', '_']];
    for(var i=1 ; i<=3 ; i++)
    {
        if(document.getElementById("box"+i).innerHTML =="X")
        board[0][(i-1)%3] = 'x';
        else if(document.getElementById("box"+i).innerHTML =="O")
        board[0][(i-1)%3] = 'o';
    }
    for(var i=4 ; i<=6 ; i++)
    {
        if(document.getElementById("box"+i).innerHTML =="X")
        board[1][(i-1)%3] = 'x';
        else if(document.getElementById("box"+i).innerHTML =="O")
        board[1][(i-1)%3] = 'o';
    }
    for(var i=7 ; i<=9 ; i++)
    {
        if(document.getElementById("box"+i).innerHTML =="X")
        board[2][(i-1)%3] = 'x';
        else if(document.getElementById("box"+i).innerHTML =="O")
        board[2][(i-1)%3] = 'o';
    }
     console.log(board[0]);
     console.log(board[1]);
     console.log(board[2]);

    var best = findBestMove(board);
    console.log(best.row);
    console.log(best.col);
    var idx = best.row*3 + best.col + 1;

    var crr = document.getElementById("box"+idx);
    if (X_or_O % 2 == 0) {
        //console.log(X_or_O);
        crr.innerHTML = "X";
        document.getElementById("turn").innerHTML = "Your Turn";
        getWinner();

    }
    else {
        //console.log(X_or_O);
        crr.innerHTML = "O";
        document.getElementById("turn").innerHTML = "Your Turn";
        getWinner();
    }

    X_or_O += 1;
    count++;
    if (count == 9 && !result) {
        result = true;
        document.getElementById("turn").innerHTML = "Game Drawn!";
        document.getElementById("turn").style.fontSize = "30px";
    }
}



class Move
{
    constructor()
    {
        let row,col;
    }
}
 
let player = 'x', opponent = 'o';
 
// This function returns true if there are moves
// remaining on the board. It returns false if
// there are no moves left to play.
function isMovesLeft(board)
{
    for(let i = 0; i < 3; i++)
        for(let j = 0; j < 3; j++)
            if (board[i][j] == '_')
                return true;
                 
    return false;
}
 
function evaluate(b)
{
     
    // Checking for Rows for X or O victory.
    for(let row = 0; row < 3; row++)
    {
        if (b[row][0] == b[row][1] &&
            b[row][1] == b[row][2])
        {
            if (b[row][0] == player)
                return +10;
                 
            else if (b[row][0] == opponent)
                return -10;
        }
    }
  
    // Checking for Columns for X or O victory.
    for(let col = 0; col < 3; col++)
    {
        if (b[0][col] == b[1][col] &&
            b[1][col] == b[2][col])
        {
            if (b[0][col] == player)
                return +10;
  
            else if (b[0][col] == opponent)
                return -10;
        }
    }
  
    // Checking for Diagonals for X or O victory.
    if (b[0][0] == b[1][1] && b[1][1] == b[2][2])
    {
        if (b[0][0] == player)
            return +10;
             
        else if (b[0][0] == opponent)
            return -10;
    }
  
    if (b[0][2] == b[1][1] &&
        b[1][1] == b[2][0])
    {
        if (b[0][2] == player)
            return +10;
             
        else if (b[0][2] == opponent)
            return -10;
    }
  
    // Else if none of them have
    // won then return 0
    return 0;
}
 
// This is the minimax function. It
// considers all the possible ways
// the game can go and returns the
// value of the board
function minimax(board, depth, isMax)
{
    let score = evaluate(board);
  
    // If Maximizer has won the game
    // return his/her evaluated score
    if (score == 10)
        return score;
  
    // If Minimizer has won the game
    // return his/her evaluated score
    if (score == -10)
        return score;
  
    // If there are no more moves and
    // no winner then it is a tie
    if (isMovesLeft(board) == false)
        return 0;
  
    // If this maximizer's move
    if (isMax)
    {
        let best = -1000;
  
        // Traverse all cells
        for(let i = 0; i < 3; i++)
        {
            for(let j = 0; j < 3; j++)
            {
                 
                // Check if cell is empty
                if (board[i][j]=='_')
                {
                     
                    // Make the move
                    board[i][j] = player;
  
                    // Call minimax recursively
                    // and choose the maximum value
                    best = Math.max(best, minimax(board,
                                    depth + 1, !isMax));
  
                    // Undo the move
                    board[i][j] = '_';
                }
            }
        }
        return best;
    }
  
    // If this minimizer's move
    else
    {
        let best = 1000;
  
        // Traverse all cells
        for(let i = 0; i < 3; i++)
        {
            for(let j = 0; j < 3; j++)
            {
                 
                // Check if cell is empty
                if (board[i][j] == '_')
                {
                     
                    // Make the move
                    board[i][j] = opponent;
  
                    // Call minimax recursively and
                    // choose the minimum value
                    best = Math.min(best, minimax(board,
                                    depth + 1, !isMax));
  
                    // Undo the move
                    board[i][j] = '_';
                }
            }
        }
        return best;
    }
}
 
// This will return the best possible
// move for the player
function findBestMove(board)
{
    let bestVal = -1000;
    let bestMove = new Move();
    bestMove.row = -1;
    bestMove.col = -1;
  
    // Traverse all cells, evaluate
    // minimax function for all empty
    // cells. And return the cell
    // with optimal value.
    for(let i = 0; i < 3; i++)
    {
        for(let j = 0; j < 3; j++)
        {
             
            // Check if cell is empty
            if (board[i][j] == '_')
            {
                 
                // Make the move
                board[i][j] = player;
  
                // compute evaluation function
                // for this move.
                let moveVal = minimax(board, 0, false);
  
                // Undo the move
                board[i][j] = '_';
  
                // If the value of the current move
                // is more than the best value, then
                // update best
                if (moveVal > bestVal)
                {
                    bestMove.row = i;
                    bestMove.col = j;
                    bestVal = moveVal;
                }
            }
        }
    }
  
  
    return bestMove;
}