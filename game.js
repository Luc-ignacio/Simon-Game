var buttonColours = ["red", "blue", "green", "yellow"];


function playSound(name) {
    var blue = new Audio("sounds/blue.mp3");
    var green = new Audio("sounds/green.mp3");
    var red = new Audio("sounds/red.mp3");
    var wrong = new Audio("sounds/wrong.mp3");
    var yellow = new Audio("sounds/yellow.mp3");
    
    switch (name) {
        case "blue":
            blue.play()            
            break;

        case "green":
            green.play()            
            break;

        case "red":
            red.play()            
            break;
        
        case "yellow":
            yellow.play()            
            break;
    
        case "wrong":
            wrong.play()
            break;
    }
}


function animatePress(currentColour) {
    
    $("#" + currentColour).addClass("pressed");
    
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}


var gamePattern = [];
var level = 0;

function nextSequence() {
    var randomNumber = Math.floor(Math.random()*4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    playSound(randomChosenColour);

    animatePress(randomChosenColour);

    level++;
    $("h1").text("Level " + level);
}


var userClickedPattern = [];

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
})


var started = false;

$(document).keydown(function() {
    if (started === false) {
        nextSequence();
        started = true;
    }
})

$(document).touchstart(function() {
    if (started === false) {
        nextSequence();
        started = true;
    }
})

function checkAnswer(currentLevel) {
    console.log(currentLevel);

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("Success");

        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000);
            userClickedPattern = [];
        }
    } else {
        console.log("Wrong");

        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();
    }

}

function startOver () {
    level = 0;
    userClickedPattern = [];
    gamePattern = [];
    started = false;
}
