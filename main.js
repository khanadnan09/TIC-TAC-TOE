const click_sound = document.querySelector("#click_sound");
const error_sound = document.querySelector("#error_sound");
const reset_btn = document.querySelector(".reset_btn");
const block = document.querySelectorAll(".block");
const win_sound = document.querySelector("#win_sound");
const key_sound = document.querySelector("#key_sound");
const draw_sound = document.querySelector("#draw_sound");
const result = document.querySelector("#result");
let eventCount = 0;
let player_x_combination = [];
let player_o_combination = [];
const winningCombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

// play a sound when block is clicked
const playSoundEffect = (block) => {
  block.addEventListener("click", () => {
    block.textContent == ""
      ? ((click_sound.currentTime = 0), click_sound.play())
      : ((error_sound.currentTime = 0),
        error_sound.play(),
        block.classList.add("alert"));
    setTimeout(() => {
      block.classList.remove("alert");
    }, 500);
  });
};

// Function to add click event listeners to blocks
const addClickEventListeners = () => {
  block.forEach((block) => {
    block.addEventListener("click", add_X_O);
  });
};

// Function to remove click event listeners from blocks
const removeClickEventListeners = () => {
  block.forEach((block) => {
    block.removeEventListener("click", add_X_O);
  });
};

// Add "X" and "O" to the block
const add_X_O = (event) => {
  const block = event.target;
  if (block.textContent == "") {
    eventCount++;
    if (eventCount % 2 === 0) {
      block.textContent = "O";
      player_o_combination.push(parseInt(block.dataset.id));
      checkWin(player_o_combination, "Player - O");
    } else {
      block.textContent = "X";
      player_x_combination.push(parseInt(block.dataset.id));
      checkWin(player_x_combination, "Player - X");
    }
  }
};

// Function to check for win condition
const checkWin = (playerCombination, playerName) => {
  if (playerCombination.length >= 3) {
    const arrSet = new Set(playerCombination);
    const isSubset = winningCombinations.some((combination) =>
      combination.every((element) => arrSet.has(element))
    );
    if (isSubset) {
      removeClickEventListeners();
      result.style.display = "block";
      result.textContent = `${playerName} won`;
      win_sound.play();
    } else if (eventCount === 9) {
      draw_sound.play();
      removeClickEventListeners();
      result.style.display = "block";
      result.textContent = "It's a draw!";
    }
  }
};

//reset the game
const reset_game = () => {
  reset_btn.addEventListener("click", () => {
    key_sound.currentTime = 0.3;
    key_sound.play();
    result.style.display = "none";
    block.forEach((block) => {
      block.classList.add("alert");
      block.textContent = "";
    });
    setTimeout(() => {
      block.forEach((block) => {
        block.classList.remove("alert");
      });
      eventCount = 0;
      player_o_combination = [];
      player_x_combination = [];
      addClickEventListeners();
    }, 1000);
  });
};

// Initialize the game
const initializeGame = () => {
  block.forEach((block) => {
    playSoundEffect(block);
  });
  addClickEventListeners();
  reset_game();
};

initializeGame();
