btnColors = ['red','green','blue','yellow'];

function startOver(){
    gamePattern = [];
    userPattern = [];
    level = 0;
}

function playSound(name){
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function addingClass(selector, classname){
    $(selector).addClass(classname);
}

function changeHeading(heading){
    $('h1').text(heading);
}

function removingClass(selector, classname){
    $(selector).removeClass(classname);
}

function checkAnswer(index){
    if(userPattern[index] == gamePattern[index]){
        if(index == gamePattern.length -1){
            changeHeading( `Level ${level}`);
            userPattern = [];
            startGame();
        }
    }else{
        changeHeading('You Lose. Press enter to restart');
        playSound('wrong');
        addingClass('body','game-over');
        setTimeout(removingClass,200,'body','game-over');
        startOver();
    }
}


function startGame(){
    level++;
    changeHeading(`Level `+level);

    randomColor = btnColors[Math.floor(Math.random()*4)];
    $(`#${randomColor}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomColor);
    gamePattern.push(randomColor);
}

function btnHandler(){
    currentColor = this.id;
    addingClass(`.${currentColor}`,"pressed");
    setTimeout(removingClass,100,`.${currentColor}`,'pressed');
    playSound(currentColor);
    userPattern.push(currentColor);
    checkAnswer(userPattern.length-1);
}

startOver();

$(document).keydown(function(event) {
    if(event.key == 'Enter'){
        startGame();   
    }
});

$('.btn').click(btnHandler)
