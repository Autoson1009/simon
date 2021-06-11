var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

//handler for when button is clicked
$(".btn").on("click", function(event){
  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);
  buttonClick(event.target.id);
  checkAnswer(userClickedPattern.length-1);
});

//start game when a key is pressed
$(document).on("keypress", function(){
  if(level === 0){
    $("h1").text("Level 0");
    nextSequence();
  }
});

//logic for checking if the user's answer is correct
function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] !== gamePattern[currentLevel]){
    gameOver();
    return;
    // console.log("wrong");
  }
  else{
    // console.log("success");
  }
  if(currentLevel+1===level){
    userClickedPattern = [];
    setTimeout(function(){nextSequence();},1000);
  }
}

//function to play the lose sound and restart the game
function gameOver(){
  //reset variables
  level = 0;
  gamePattern = [];
  userClickedPattern = [];

  //play lose sounds, flash screen, and change header
  var sound = new Audio("sounds/wrong.mp3");
  sound.play();
  $("body").addClass("game-over");
  setTimeout(function(){$("body").removeClass("game-over");},200);
  $("h1").text("Game Over, Press Any Key to Restart");
}

//logic for getting the next color in the sequence
function nextSequence(){
  var randomNumber = Math.floor(Math.random()*4); //pick a random number between 0 and 3
  var randomChosenColor = buttonColors[randomNumber]; //get the color associated with that number
  gamePattern.push(randomChosenColor); //add color to game pattern array
  updateLevel();
  //for single new color
  // buttonDemo(randomChosenColor);

  //this timer loop code allows all the previous sequence to be played
  var i = 0;
  function timerLoop(){
    setTimeout(function(){
      buttonDemo(gamePattern[i]);
      i++;
      if(i<level){
        timerLoop();
      }
    },500);
  }
  timerLoop();
}

//increases the level counter and updates the title accordingly
function updateLevel(){
  level++;
  $("h1").text("Level " + level);
}

//function flashes (not clicks) a button and plays it's sound absed on the color
function buttonDemo(color){
  $("#"+color).fadeOut(100).fadeIn(100); //flash button
  buttonSound(color);
}

//function clicks (not flashes) a button and plays it's sound absed on the color
function buttonClick(color){
  buttonFlash($("#"+color));
  buttonSound(color);
}

//click button animation
function buttonFlash(activeButton){
  activeButton.addClass("pressed");
  setTimeout(function(){activeButton.removeClass("pressed");},100);
}

//play button sound
function buttonSound(buttonColor){
  var sound = new Audio("sounds/"+ buttonColor +".mp3");
  sound.play();
}
