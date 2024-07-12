const choices = ["rock", "paper", "scissors"];

let humanScore = 0;
let computerScore = 0;
let draw = 0;

// DOM

const selectionContainer = document.querySelector(".selection-container");
const playerScoreboard = document.querySelector(".player-score");
const computerScoreboard = document.querySelector(".computer-score");
const drawScoreboard = document.querySelector(".draw-score");
const gameLog = document.querySelector(".game-log");
const gameOver = document.querySelector(".game-over-container");
const handSelection = document.querySelector(".hand-container");
const choiceButtons = [];

const playAgain = () => {
  playerScoreboard.textContent = "0";
  computerScoreboard.textContent = "0";
  drawScoreboard.textContent = "0";
  humanScore = 0;
  computerScore = 0;
  handSelection.style.display = "block";
  gameOver.style.display = "none";
  gameLog.innerHTML = "";
};

const startOverBtn = document.createElement("button");
startOverBtn.classList.add("choice-btn");
startOverBtn.textContent = "play again";
startOverBtn.addEventListener("click", () => {
  playAgain();
});

const checkGameOver = () => {
  if (humanScore === 5 || computerScore === 5) return true;
  return false;
};

const showGameOver = () => {
  handSelection.style.display = "none";
  gameOver.style.display = "flex";
  const winner = document.createElement("p");
  winner.classList.add("text");
  winner.classList.add(humanScore > computerScore ? "win" : "lose");
  winner.textContent = humanScore > computerScore ? "You win!" : "You lose.";
  gameOver.appendChild(winner);
  gameOver.append(startOverBtn);
};

const selectHand = (hand) => {
  const result = playRound(hand, getComputerChoice());
  const log = document.createElement("li");
  log.textContent = result;
  gameLog.appendChild(log);
  if (checkGameOver()) {
    showGameOver();
    log.textContent = "Game over.";
    gameLog.appendChild(log);
  }
};

choices.forEach((choice) => {
  const choiceButton = document.createElement("button");
  choiceButton.classList.add("choice-btn");
  choiceButton.textContent = choice;
  selectionContainer.appendChild(choiceButton);
  choiceButtons.push(choiceButton);
});

choiceButtons.forEach((choice) => {
  choice.addEventListener("click", () => {
    selectHand(choice.textContent);
  });
});

// GAME LOGIC

const getComputerChoice = () => {
  let choice = Math.floor(Math.random() * (3 - 1 + 1));
  return choices[choice];
};

// DEPRECATED

// const getHumanChoice = () => {
//   const humanChoice = prompt(
//     "Select your hand by writing rock, paper or scissors."
//   ).toLowerCase();

//   if (choices.some((choice) => choice === humanChoice)) {
//     return humanChoice;
//   }

//   return getHumanChoice();
// };

const winingHand = (humanChoice, computerChoice) => {
  humanScore += 1;
  playerScoreboard.textContent = humanScore;

  return `You win! ${humanChoice} beats ${computerChoice}.`;
};

const losingHand = (humanChoice, computerChoice) => {
  computerScore += 1;
  computerScoreboard.textContent = computerScore;
  return `You lose. ${humanChoice} loses to ${computerChoice}.`;
};

const playRound = (humanChoice, computerChoice) => {
  let result = "";

  if (humanChoice === computerChoice) {
    draw += 1;
    drawScoreboard.textContent = draw;
    result = `It's a tie! ${humanChoice} and ${computerChoice} neutralize each other.`;
  }

  if (humanChoice === "rock") {
    if (computerChoice === "paper") {
      result = losingHand(humanChoice, computerChoice);
    }

    if (computerChoice === "scissors") {
      result = winingHand(humanChoice, computerChoice);
    }
  }

  if (humanChoice === "paper") {
    if (computerChoice === "scissors") {
      result = losingHand(humanChoice, computerChoice);
    }

    if (computerChoice === "rock") {
      result = winingHand(humanChoice, computerChoice);
    }
  }

  if (humanChoice === "scissors") {
    if (computerChoice === "rock") {
      result = losingHand(humanChoice, computerChoice);
    }

    if (computerChoice === "paper") {
      result = winingHand(humanChoice, computerChoice);
    }
  }

  return result;
};

// DEPRECATED

// const playGame = (numberOfRounds) => {
//   for (let i = 0; i < numberOfRounds; i++) {
//     playRound(getHumanChoice(), getComputerChoice());
//     console.log(
//       `Round ${i + 1}: You: ${humanScore}, computer: ${computerScore}`
//     );
//   }

//   console.log(`Final score:  You: ${humanScore}, computer: ${computerScore}`);
//   console.log(
//     humanScore > computerScore
//       ? "You win!"
//       : humanScore === computerScore
//       ? "It's a tie!"
//       : "You lose!"
//   );
// };

// playGame();
