
var X_or_O = 0;
var result = false;
var count = 0;

function selectWinnerBoxes(b1, b2, b3) {
    b1.classList.add("win");
    b2.classList.add("win");
    b3.classList.add("win");
    document.getElementById("turn").innerHTML = b1.innerHTML + " is the winner!";
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
            console.log(X_or_O);
            crr.innerHTML = "X";
            document.getElementById("turn").innerHTML = "O's Turn Now";
            getWinner();

        }
        else {
            console.log(X_or_O);
            crr.innerHTML = "O";
            document.getElementById("turn").innerHTML = "X's Turn Now";
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