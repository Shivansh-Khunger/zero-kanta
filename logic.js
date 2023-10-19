let ifGameHasStarted = 0;
let ifCircle = 1;
const imgBoxes = document.querySelectorAll(".flex-box-element");
const gameStartButton = document.getElementById("game-start-button");
const gameStartIndicator = document.getElementById('game-start-indicator');

gameStartButton.addEventListener("click", function () {
  startGame();
  gameStartButton.style.display = "none";
  gameStartIndicator.innerHTML = "Game Has Started";
  setTimeout(function () {
    gameStartIndicator.innerHTML = "Lavda te Lasan"
  },500)
});

function startGame () {

    for (let i = 0; i < imgBoxes.length; i++) {
      const imgBox = imgBoxes[i];
      imgBox.addEventListener("click", function () {
        if (imgBox.childElementCount == 0) {
          applyImage(imgBox, i + 1);
        }
      });
    }
}

function applyImage(imgBox, i) {
  const img = document.createElement("img");
  img.style.zIndex = 1;
  if (ifCircle) {
    img.src = "assests/penis.webp";
    imgBox.appendChild(img);
    ifCircle = 0;
  } else {
    img.src = "assests/garlic.webp";
    imgBox.appendChild(img);
    ifCircle = 1;
  }
    updateArray(i);
    if (ifWon(i)) {
        if (!ifCircle) {
            circleHasWon();
        }
        else if(ifCircle) {
            crossHasWon();
        }
      highlightWinningIndexes();
      return;
    }
    if (circleIndexes.length + crossIndexes.length == 9) {
        nobodyHasWon();
    }
}

let circleIndexes = [];
let crossIndexes = [];

function updateArray(i) {
  if (!ifCircle) {
    circleIndexes.push(i);
    console.log("Circle - ", circleIndexes);
  } else {
    crossIndexes.push(i);
    console.log("Cross - ", crossIndexes);
  }
}

let winningIndexes = [];

function ifWon(i) {
  let validVerticalIndexes = validVerticalIndexesFinder(i);

  let validHorizontalIndexes = validHorizontalIndexesFinder(i);

  if (!ifCircle) {
    let circleSum = 0;
    let circleRowWise = 1;
    let circleColumnWise = 1;

    for (let j = 0; j < validHorizontalIndexes.length; j++) {
      if (!circleIndexes.includes(validHorizontalIndexes[j])) {
        circleRowWise = 0;
      }
    }

    for (
      let j = 0;
      j < validHorizontalIndexes.length && circleRowWise !== 0;
      j++
    ) {
      if (!circleIndexes.includes(validHorizontalIndexes[j])) {
        circleRowWise = 0;
      }
    }

    for (
      let j = 0;
      j < validVerticalIndexes.length && circleColumnWise !== 0;
      j++
    ) {
      if (!circleIndexes.includes(validVerticalIndexes[j])) {
        circleColumnWise = 0;
      }
    }

    for (let j = 0; j < circleIndexes.length; j++) {
      circleSum += circleIndexes[j];
    }

    if (circleColumnWise) {
        winningIndexes = validVerticalIndexes;
        winningIndexes.push(i);
    }
    
      if (circleRowWise) {
        winningIndexes = validHorizontalIndexes;
        winningIndexes.push(i);
    }  
      
    if (circleColumnWise || circleRowWise) {
      return true;
    }

    if (circleSum >= 15 && isDiagnol(circleIndexes)) {
        console.log("Diagnol");
        winningIndexes = whichDiagnol(circleIndexes);
      return true;
    }

    return false;
  } else {
    let crossSum = 0;
    let crossRowWise = 1;
    let crossColumnWise = 1;

    for (let j = 0; j < validHorizontalIndexes.length; j++) {
      if (!crossIndexes.includes(validHorizontalIndexes[j])) {
        crossRowWise = 0;
      }
    }

    for (let j = 0; j < validVerticalIndexes.length; j++) {
      if (!crossIndexes.includes(validVerticalIndexes[j])) {
        crossColumnWise = 0;
      }
    }

    for (let j = 0; j < crossIndexes.length; j++) {
      crossSum += crossIndexes[j];
    }

    if (crossColumnWise) {
        winningIndexes = validVerticalIndexes;
        winningIndexes.push(i);
    }
    
      if (crossRowWise) {
        winningIndexes = validHorizontalIndexes;
        winningIndexes.push(i);
    } 
      
    if (crossColumnWise || crossRowWise) {
          console.log(crossColumnWise);
          console.log(crossRowWise);
      return true;
    }

      if (crossSum >= 15 && isDiagnol(crossIndexes)) {
          winningIndexes = whichDiagnol(crossIndexes);
      return true;
    }

    return false;
  }
}

function isDiagnol(indexes) {
  if (
    (indexes.includes(1) && indexes.includes(5) && indexes.includes(9)) ||
    (indexes.includes(3) && indexes.includes(5) && indexes.includes(7))
  ) {
    return true;
  } else {
    return false;
  }
}

function whichDiagnol(indexes) {
  if ((indexes.includes(1) && indexes.includes(5) && indexes.includes(9))) {
    return [1, 5, 9];
  }
  if ((indexes.includes(3) && indexes.includes(5) && indexes.includes(7))) {
    return [3, 5, 7];
  }
}

function validVerticalIndexesFinder(i) {
  let verticalIndexes = [];
  if (i <= 3) {
    for (let j = 0; j < 2; j++) {
      i += 3;
      verticalIndexes.push(i);
    }
  } else if (i > 3 && i <= 6) {
    verticalIndexes.push(i - 3);
    verticalIndexes.push(i + 3);
  } else {
    for (let j = 0; j < 2; j++) {
      i -= 3;
      verticalIndexes.push(i);
    }
  }
  return verticalIndexes;
}

function validHorizontalIndexesFinder(i) {
  let horizontalIndexes = [];
  if (i == 1 || i == 4 || i == 7) {
    for (let j = 0; j < 2; j++) {
      i++;
      horizontalIndexes.push(i);
    }
  } else if (i == 2 || i == 5 || i == 8) {
    horizontalIndexes.push(i - 1);
    horizontalIndexes.push(i + 1);
  } else {
    for (let j = 0; j < 2; j++) {
      i--;
      horizontalIndexes.push(i);
    }
  }
  return horizontalIndexes;
}

function circleHasWon() {
    setTimeout(function () {
        alert("Lavda jeet gya");
    }, 200);
    setTimeout(function () {
      window.location.reload();
    }, 400);
}

function crossHasWon() {
    setTimeout(function () {
        alert("Lasan jeet gya");
    }, 200)
    setTimeout(function () {
      window.location.reload();
    }, 400);
}

function nobodyHasWon() {
    setTimeout(function () {
        alert("This is Lavda Te Lasan");
    }, 200)
  setTimeout(function () {
    window.location.reload();
  },400)
}


function highlightWinningIndexes() {
    for (let index in winningIndexes) {
        console.log(
          imgBoxes[winningIndexes[index] - 1].children[0].classList.add(
            "flex-box-element-blink"
          )
        );
    }
}