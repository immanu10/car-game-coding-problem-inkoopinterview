//selecting the button
const btn = document.querySelector(".btn");
const container = document.querySelector(".container");
const gameOutput = document.querySelector(".game-output");

btn.addEventListener("click", function () {
  const petrolPumps = generateRandomPumps();
  // console.log(petrolPumps);
  while (gameOutput.hasChildNodes()) {
    gameOutput.removeChild(gameOutput.firstChild);
  }
  startGame(petrolPumps);
});

function startGame(pumps) {
  container.innerHTML = `<h3>Game Started!</h3><h3>Petrol pumps generated at ${pumps}</h3>`;
  let moves = 1;
  let petrolRemaining = 30;
  let carAt = 0;
  let prevposition = 0;
  let gameStatus = "";

  while (petrolRemaining >= 0 && !gameStatus) {
    let pertolFilled = "";
    let km = getRandomFrom0To6Km();
    carAt = carAt + km;
    prevposition = carAt - km;

    petrolRemaining = petrolRemaining - km;
    if (pumps.includes(carAt) || checkCarPassPump(prevposition, carAt, pumps)) {
      petrolRemaining += 20;
      pertolFilled = ", petrol got fill";
    }
    if (carAt >= 100) {
      gameStatus = ", reached";
    }
    if (petrolRemaining <= 0) {
      gameStatus = ", game over";
    }

    const pTag = document.createElement("p");
    pTag.textContent = `Move ${moves} - Car at ${carAt}, petrol remaining ${petrolRemaining} ${pertolFilled} ${gameStatus}`;

    gameOutput.appendChild(pTag);

    moves++;
  }
  console.log(gameStatus);
}

function generateRandomPumps() {
  let arr = [];
  while (arr.length < 5) {
    arr.push(getRandomFrom0To100Km());
  }
  return arr.sort((a, b) => a - b);
}

function getRandomFrom0To6Km() {
  return Math.floor(Math.random() * 7);
}
function getRandomFrom0To100Km() {
  return Math.floor(Math.random() * 101);
}

//new condition to check if car passes the petrol pump
function checkCarPassPump(prev, cur, pumps) {
  prev++;
  while (prev < cur) {
    if (pumps.includes(prev)) {
      return true;
    } else {
      prev++;
    }
  }
  return false;
}
