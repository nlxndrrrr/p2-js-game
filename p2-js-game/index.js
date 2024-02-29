let currMeowthTile;
let currPikachuTile;
let score = 0;
let gameOver = false;
let gameStatus = false;
let meowthInterval;
let pikachuInterval;
let start = document.getElementById("start");
start.addEventListener("click", startGame);

let quit = document.getElementById("quit");
quit.addEventListener("click", function () {
  gameOver = true;
  gameStatus = false;
});

function startGame() {
  if (!gameStatus) {
    if (meowthInterval) {
      clearInterval(meowthInterval);
    }
    if (pikachuInterval) {
      clearInterval(pikachuInterval);
    }
    setGame();
    gameOver = false;
    gameStatus = true;
  }
}

for (let i = 0; i < 100; i++) {
  //i goes from 0 to 8, stops at 9
  //<div id="0-8"></div>
  let tile = document.createElement("div");
  tile.id = i.toString();
  tile.addEventListener("click", selectTile);
  document.getElementById("board").appendChild(tile);
}

function setGame() {
  //set up the grid in html

  meowthInterval = setInterval(setMeowth, 900); // 1000 miliseconds = 1 second, every 1 second call setMeowth
  pikachuInterval = setInterval(setPikachu, 600); // 2000 miliseconds = 2 seconds, every 2 second call setPikachu
}

function getRandomTile() {
  //math.random --> 0-1 --> (0-1) * 9 = (0-9) --> round down to (0-8) integers
  let num = Math.floor(Math.random() * 100);
  return num.toString();
}

function setMeowth() {
  if (gameOver) {
    return;
  }
  if (currMeowthTile) {
    currMeowthTile.innerHTML = "";
  }
  let meowth = document.createElement("img");
  meowth.src = "js-game-assets/Meowth.png";

  let num = getRandomTile();
  if (currPikachuTile && currPikachuTile.id == num) {
    return;
  }
  currMeowthTile = document.getElementById(num);
  currMeowthTile.appendChild(meowth);
}

function setPikachu() {
  if (gameOver) {
    return;
  }
  if (currPikachuTile) {
    currPikachuTile.innerHTML = "";
  }
  let pikachu = document.createElement("img");
  pikachu.src = "js-game-assets/pika.hero.png";

  let num = getRandomTile();
  if (currMeowthTile && currMeowthTile.id == num) {
    return;
  }
  currPikachuTile = document.getElementById(num);
  currPikachuTile.appendChild(pikachu);
}

function selectTile() {
  if (gameOver) {
    return;
  }
  if (this == currMeowthTile) {
    score += 10;
    document.getElementById("score").innerText = score.toString(); //update score html
  } else if (this == currPikachuTile) {
    document.getElementById("score").innerText =
      "GAME OVER: " + score.toString(); //update score html
    gameOver = true;
  }
}

// Instructions Button //

const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");

openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
  });
});

overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(".modal.active");
  modals.forEach((modal) => {
    closeModal(modal);
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

// Background Music //

let audio = document.getElementById("audio");
let playPauseBTN = document.getElementById("playPauseBTN");
let count = 0;

function playPause() {
  if (count == 0) {
    count = 1;
    audio.play();
    playPauseBTN.innerHTML = "Pause &#9208;";
  } else {
    count = 0;
    audio.pause();
    playPauseBTN.innerHTML = "Play &#9658;";
  }
}
