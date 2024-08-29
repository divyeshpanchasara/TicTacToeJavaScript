let boardElements = document.getElementsByClassName("button-class");


let player1 = "X";
let player2 = "O";
let flag = true;


function move(id){
    let element = document.getElementById(id);
    if(element.textContent === player1 || element.textContent === player2){
        alert("Ops!! Try another cell");
        return;
    }
    else if(flag){
        element.textContent = player1;
    }
    else{
        element.textContent = player2;
    }

    let win = checkWin(boardElements);
    if(win === 1){
        alert("Player 1 WINS!!");
        restart();
        return;
    }
    else if(win === 2){
        alert("Player 2 WINS!!");
        restart();
        return;
    }

    let draw = checkForDraw(boardElements);
    if(draw === 9){
        alert("It's a DRAW!! Better Luck Next Time")
        restart();
        return;
    }

    flag = !flag;
}

function checkWin(boardElements){
    if(checkRow(boardElements)===1 || checkColoumn(boardElements)===1 || checkDiagonal(boardElements)===1) {
        return 1;
    }

    if(checkRow(boardElements)===2 || checkColoumn(boardElements)===2 || checkDiagonal(boardElements)===2) {
        return 2;
    }
    return 0;
}

function checkRow(boardElements){
    const a = [0, 3, 6];
        for(i = 0; i < 3 ; i++){
            let k = a[i];
            if(boardElements[k].textContent === boardElements[k+1].textContent && boardElements[k].textContent === boardElements[k+2].textContent && boardElements[k+1].textContent === boardElements[k+2].textContent){
                if(boardElements[k].textContent === player1)
                    return 1;
                else if(boardElements[k].textContent === player2)
                return 2;
            }
        }
    return 0;
}

function checkColoumn(boardElements) {
    const a = [0, 1, 2];
    for(i = 0; i < 3 ; i++){
        let k = a[i];
        if(boardElements[k].textContent === boardElements[k+3].textContent && boardElements[k].textContent === boardElements[k+6].textContent && boardElements[k+3].textContent === boardElements[k+6].textContent){
            if(boardElements[k].textContent === player1)
                return 1;
            else if(boardElements[k].textContent === player2)
                return 2;
        }
    }
    return 0;
}

function checkDiagonal(boardElements){
    if(boardElements[6].textContent == boardElements[4].textContent && boardElements[6].textContent == boardElements[2].textContent && boardElements[4].textContent == boardElements[2].textContent){
        if(boardElements[4].textContent === player1)
            return 1;
        else if(boardElements[4].textContent === player2)
            return 2;
    }
    if(boardElements[0].textContent == boardElements[4].textContent && boardElements[0].textContent == boardElements[8].textContent && boardElements[4].textContent == boardElements[8].textContent){
        if(boardElements[4].textContent === player1)
            return 1;
        else if(boardElements[4].textContent === player2)
            return 2;
    }
    return 0;
}

function checkForDraw(boardElements){
    let count = 0;
    for(el of boardElements){
        if(el.textContent === player1 || el.textContent === player2){
            count++;
        }
    }
    return count;
}


function restart(){
    for(el of boardElements){
        el.textContent = " ";
    }
    flag = true;
}