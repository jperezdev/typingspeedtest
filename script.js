// In Progress

var testWrapper = document.querySelector(".test-wrapper");
var testArea = document.querySelector("#test-area");
var originText = document.querySelector("#origin-text p");
var resetButton = document.querySelector("#reset");
var nextButton = document.querySelector('#nextChallenge');
var theTimer = document.querySelector(".timer");
var interval;
var textCheck;
var timerRunning = false;
var timer = [0,0,0,0];


// Text to check your speed


function newText(){
    var text = ["If you toss a can of diet soda","regular soda into water you'd be","surprised to find the diet","Boombo is a very sustainable materials","If you toss a can of diet soda and regular soda"];
    var randomeText = Math.floor(Math.random()*text.length);
    textCheck = originText.innerHTML = text[randomeText];
    return textCheck;
}

newText();


// Add leading zero to numbers 9 or below (purely for aesthetics):

function leadingZero(time){
    if(time <= 9){
        time = "0"+time;
    }
    return time;
}

// Run a standard minute/second/hundredths timer:

function runTimer(){
    var currentTime = leadingZero(timer[0])+":"+leadingZero(timer[1])+":"+leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100)-(timer[0]*60));
    timer[2] =  Math.floor(timer[3] - (timer[1]*100) - (timer[0]*6000));
}

// Match the text entered with the provided text on the page:

function spellCheck(){
    var textEntered = testArea.value;
    var originTextMatch = textCheck.substring(0,textEntered.length);

    if(textEntered == textCheck){
        clearInterval(interval);
        testWrapper.style.borderColor = "#429890"; // god job
    }

    else{
        if(textEntered == originTextMatch){
            testWrapper.style.borderColor = "#65CCF3"; //win
        }

        else{
            testWrapper.style.borderColor = "#E95D0F"; // error in the text
        }
    }

}



// Start the timer:
function start(){
    var textEnterdLength = testArea.value.length;

    if(textEnterdLength === 0 && !timerRunning){
        timerRunning = true;
        interval = setInterval(runTimer,10);
    }

    console.log(textEnterdLength);
}

// Reset everything:
function reset(){
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0];
    timerRunning = false;
    testArea.value = " ";
    theTimer.innerHTML = "00.00.00";
    testWrapper.style.borderColor = "grey";
}

//Next Challenge

function nextChallenge(){
    newText();
    reset();

}

// Event listeners for keyboard input and the reset button:

testArea.addEventListener("keypress", start,false);
testArea.addEventListener("keyup",spellCheck, false);
resetButton.addEventListener("click",reset,false);
nextButton.addEventListener("click",nextChallenge,false);
