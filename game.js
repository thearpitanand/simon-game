var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var keyPressed = true;
var level = 0;

//Taking User Input
$(".btn").click(function (event) {
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length);
});

//Key Press to restart or start the game
$("body").keypress(function () {
  if (keyPressed) {
    keyPressed = false;
    nextSequence();
  }
});

//added button when width of the screen is lower then 991px
if ($(window).width() <= 991) {
  $(".refreshButton").removeClass("hidden");
  $("h1").text("Press Button");
}

//Refresh button will be functional when ever screen width is below 991px
if ($(window).width() <= 991) {
  $(".refreshButton").click(function () {
    if (keyPressed) {
      keyPressed = false;
      nextSequence();
      $(".refreshButton").addClass("hidden");
    }
  });
}

//function to push new values in the game pattern
function nextSequence() {
  userClickedPattern = [];
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
  $("h1").text("Level " + level);
}

//function to play sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3").play();
}

//Function to animate key press
function animatePress(currentColour) {
  $("#" + currentColour).click(function () {
    $("." + currentColour).addClass("pressed");
    setTimeout(function () {
      $("." + currentColour).removeClass("pressed");
    }, 100);
  });
}

//function to check answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel - 1] === userClickedPattern[currentLevel - 1]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    $("h1").text("Game Over, Press Any Key to Restart.");
    playSound("wrong");
    //Activating the refresh button when screen width is below 991px
    if ($(window).width() <= 991) {
      $("h1").text("Game Over,Press Button.");
      $(".refreshButton").text("Click Hear to Start The Game Again");
      $(".refreshButton").removeClass("hidden");
    }
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

//function to start the game again
function startOver() {
  keyPressed = true;
  gamePattern = [];
  level = 0;
}
