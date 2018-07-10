var backgroundColor = "#232323";
var h1Color = "steelblue";
var numSquares = 6;

var colors = generateRandomColors(numSquares); // get array of colors

var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();

// Grab h1
var h1 = document.querySelector("h1");

// Get the winning color
var colorDisplay = document.getElementById("pickedColor");

// Display the winning color
colorDisplay.textContent = pickedColor;

// Get the message to be displayed
var message = document.querySelector("#message")

// get reset button
var reset = document.querySelector("#reset");
addReset();

// Get easy/hard buttons
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");
addDifficultyButtons();

addInteractiveSquares();

// Adds event listeners to squares
function addInteractiveSquares() {
  for (var i = 0; i < squares.length; i++) {
    // add initial colors to squares
    squares[i].style.backgroundColor = colors[i];

    // add click listeners to squares
    squares[i].addEventListener("click", function () {
      // console.log(this.style.backgroundColor, pickedColor); debugging
      console.log(this.style.backgroundColor, pickedColor);
      if (this.style.backgroundColor === pickedColor) {
        message.textContent = "Correct!";
        h1.style.backgroundColor = h1Color;
        changeColors(pickedColor);
        reset.textContent = "Play Again?"
      } else {
        this.style.background = backgroundColor;
        message.textContent = "Try again";
      }
    })
  }
}

// Add functionality to easy/hard buttons
function addDifficultyButtons() {
  easyBtn.addEventListener("click", function () {
    // add a class to these buttons to change color
    this.classList.add("selected");
    hardBtn.classList.remove("selected");

    // generate three new colors and hide the other three
    numSquares = 3;
    resetGame(numSquares);

    // hide the three bottom colors
    changeDifficulty("none");
  })

  hardBtn.addEventListener("click", function () {
    this.classList.add("selected");
    easyBtn.classList.remove("selected");

    numSquares = 6;
    resetGame(numSquares);
    changeDifficulty("block");
  })
}

// Resets the state of the game
function resetGame(numColors) {
  colors = generateRandomColors(numColors);
  addInteractiveSquares();

  // Change picked color
  pickedColor = pickColor();

  // Change colorDisplay target text
  colorDisplay.textContent = pickedColor;

  // Reset header background
  h1.style.background = h1Color;
}

// Hides or reveals the bottom three blocks
function changeDifficulty(mode) {
  for (var i = squares.length / 2; i < squares.length; i++) {
    squares[i].style.display = mode;
  }
}

// Generates a new set of colors
function addReset() {
  reset.addEventListener("click", function () {
    // if clicked, change the colors array
    resetGame(numSquares);

    this.textContent = "New Colors"
  })
}

// Changes the colors of each square to the winning color
function changeColors(color) {
  var h1 = document.querySelector("h1");
  h1.style.backgroundColor = color;
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = color;
  }
}

// Picks the color from the colors array to choose as the winning color
function pickColor() {
  var index = Math.floor(Math.random() * colors.length)
  return colors[index];
}

function generateRandomColors(num) {
  // make an array
  var colorsArray = [];

  // add num random colors to array
  for (var i = 0; i < num; i++) {
    // get random color and push into array
    colorsArray.push(randomColor())
  }

  return colorsArray;
}

// Generates a random color
function randomColor() {
  // make a red from 0 - 255
  var red = generateRandomNum();

  // make a green from 0 - 255
  var green = generateRandomNum();

  // make a blue from 0 - 255
  var blue = generateRandomNum();

  return "rgb(" + red + ", " + green + ", " + blue + ")";
}

// Generate a random rgb number
function generateRandomNum() {
  return Math.floor(Math.random() * 255);
}