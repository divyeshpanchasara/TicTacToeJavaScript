let boardElements = document.getElementsByClassName("button-class");

const player1 = "X";
const player2 = "O";
let flag = true;
let vsComputer = true; // Set this to false for player vs player mode

const clickAudio = new Audio();
clickAudio.src = "./click.mp3";

const winAudio = new Audio();
winAudio.src = "./win.mp3";

const drawAudio = new Audio();
drawAudio.src = "./loseOrDraw.mp3";

function move(id) {
  clickAudio.currentTime = 0;
  clickAudio.play();
  let nodeElement = document.getElementById("message-para");
  
  let element = document.getElementById(id);
  if (element.textContent === player1 || element.textContent === player2) {
    nodeElement.textContent = "Oops!! Try Another Cell";
    return;
  } 

  if (flag) {
    element.textContent = player1;
    nodeElement.textContent = "Turn : Player " + player2;
  }

  let win = checkWin(boardElements);
  if (win === 1) {
    winAudio.play();
    nodeElement.style.fontSize = "30px";
    nodeElement.textContent = "Player 1 Wins!!";
    disableButtons(boardElements);
    return;
  } else if (win === 2) {
    winAudio.play();
    nodeElement.style.fontSize = "30px";
    nodeElement.textContent = "Player 2 Wins!!";
    disableButtons(boardElements);
    return;
  }

  let draw = checkForDraw(boardElements);
  if (draw === 9) {
    drawAudio.currentTime = 0;
    drawAudio.play();
    nodeElement.textContent = "It's a Draw!";
    disableButtons(boardElements);
    return;
  }

  flag = !flag;

  if (vsComputer && !flag) {
    setTimeout(computerMove, 500); // Delay for a more natural effect
  }
}

function computerMove() {
  let emptyCells = [];
  for (let el of boardElements) {
    if (el.textContent === "") {
      emptyCells.push(el);
    }
  }

  if (emptyCells.length > 0) {
    let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    randomCell.textContent = player2;

    let nodeElement = document.getElementById("message-para");
    nodeElement.textContent = "Turn : Player " + player1;

    let win = checkWin(boardElements);
    if (win === 1) {
      winAudio.play();
      nodeElement.style.fontSize = "30px";
      nodeElement.textContent = "Player 1 Wins!!";
      disableButtons(boardElements);
      return;
    } else if (win === 2) {
      winAudio.play();
      nodeElement.style.fontSize = "30px";
      nodeElement.textContent = "Computer Wins!!";
      disableButtons(boardElements);
      return;
    }

    let draw = checkForDraw(boardElements);
    if (draw === 9) {
      drawAudio.currentTime = 0;
      drawAudio.play();
      nodeElement.textContent = "It's a Draw!";
      disableButtons(boardElements);
      return;
    }

    flag = !flag;
  }
}

function disableButtons(boardElements) {
  for (let element of boardElements) {
    element.disabled = true;
  }
}

function enableButtons(boardElements) {
  for (let element of boardElements) {
    element.disabled = false;
  }
}

function checkWin(boardElements) {
  if (
    checkRow(boardElements) === 1 ||
    checkColoumn(boardElements) === 1 ||
    checkDiagonal(boardElements) === 1
  ) {
    return 1;
  }

  if (
    checkRow(boardElements) === 2 ||
    checkColoumn(boardElements) === 2 ||
    checkDiagonal(boardElements) === 2
  ) {
    return 2;
  }
  return 0;
}

function checkRow(boardElements) {
  const a = [0, 3, 6];
  for (let i = 0; i < 3; i++) {
    let k = a[i];
    if (
      boardElements[k].textContent === boardElements[k + 1].textContent &&
      boardElements[k].textContent === boardElements[k + 2].textContent
    ) {
      if (boardElements[k].textContent === player1) return 1;
      else if (boardElements[k].textContent === player2) return 2;
    }
  }
  return 0;
}

function checkColoumn(boardElements) {
  const a = [0, 1, 2];
  for (let i = 0; i < 3; i++) {
    let k = a[i];
    if (
      boardElements[k].textContent === boardElements[k + 3].textContent &&
      boardElements[k].textContent === boardElements[k + 6].textContent
    ) {
      if (boardElements[k].textContent === player1) return 1;
      else if (boardElements[k].textContent === player2) return 2;
    }
  }
  return 0;
}

function checkDiagonal(boardElements) {
  if (
    boardElements[6].textContent == boardElements[4].textContent &&
    boardElements[6].textContent == boardElements[2].textContent
  ) {
    if (boardElements[4].textContent === player1) return 1;
    else if (boardElements[4].textContent === player2) return 2;
  }
  if (
    boardElements[0].textContent == boardElements[4].textContent &&
    boardElements[0].textContent == boardElements[8].textContent
  ) {
    if (boardElements[4].textContent === player1) return 1;
    else if (boardElements[4].textContent === player2) return 2;
  }
  return 0;
}

function checkForDraw(boardElements) {
  let count = 0;
  for (let el of boardElements) {
    if (el.textContent === player1 || el.textContent === player2) {
      count++;
    }
  }
  return count;
}

function restart() {
  drawAudio.pause();
  drawAudio.currentTime = 0;
  winAudio.pause();
  winAudio.currentTime = 0;
  clickAudio.play();
  let nodeElement = document.getElementById("message-para");
  nodeElement.style.fontSize = "20px";
  nodeElement.textContent = "Tap to play";
  enableButtons(boardElements);
  for (let el of boardElements) {
    el.textContent = "";
  }
  flag = true;
}
