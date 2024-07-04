const choices = ["rock", "paper", "scissors"];

const getComputerChoice = () => {
  let choice = Math.floor(Math.random() * (3 - 1 + 1));

  return choices[choice];
};

const getHumanChoice = () => {
  const humanChoice = prompt(
    "Select your hand by writing rock, paper or scissors."
  ).toLowerCase();

  if (choices.some((choice) => choice === humanChoice)) {
    return humanChoice;
  }

  return getHumanChoice();
};

let humanScore = 0;
let computerScore = 0;

const winingHand = (humanChoice, computerChoice) => {
  humanScore += 1;
  return `You win! ${humanChoice} beats ${computerChoice}.`;
};

const losingHand = (humanChoice, computerChoice) => {
  computerScore += 1;
  return `You lose. ${humanChoice} loses to ${computerChoice}.`;
};

const playRound = (humanChoice, computerChoice) => {
  let result = "";

  if (humanChoice === computerChoice) {
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

    if (computerChoice === "scissors") {
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
  console.log(result);

  return result;
};

const playGame = (numberOfRounds = 5) => {
  for (let i = 0; i < numberOfRounds; i++) {
    playRound(getHumanChoice(), getComputerChoice());
    console.log(
      `Round ${i + 1}: You: ${humanScore}, computer: ${computerScore}`
    );
  }

  console.log(`Final score:  You: ${humanScore}, computer: ${computerScore}`);
  console.log(
    humanScore > computerScore
      ? "You win!"
      : humanScore === computerScore
      ? "It's a tie!"
      : "You lose!"
  );
};

playGame();
