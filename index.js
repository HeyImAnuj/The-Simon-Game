var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started =false;
var level = 0;


function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.random();
    randomNumber = Math.floor(randomNumber*4);
    var  randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $('#'+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour); 
    level++;
    $("h1").text("level "+level);
}




$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
    
    
});


$(document).keypress(
    function(){
        if (!started){
            started = true;
            nextSequence();
        }
});



function checkAnswer( currentLevel ){
    if ( userClickedPattern[currentLevel] === gamePattern[currentLevel] ){
        if ( userClickedPattern.length === gamePattern.length ){
            setTimeout(function(){ nextSequence();}, 1000);
        }
        
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}


function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");
    }, 100);
    
}


function playSound(name){
    var audio = new Audio("/sounds/"+name+".mp3");
    audio.play();
}

function startOver(){
    started = false;
    level = 0;
    gamePattern = [];
}



