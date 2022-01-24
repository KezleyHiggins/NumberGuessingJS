"use strict";

// Classes

class ScoreTracker{
    constructor(){
        this.score = 20;
        this.scoreDisplay = document.querySelector(".score");
        this.UpdateScoreDisplay();

        this.highScore = 0;
        this.highScoreDisplay = document.querySelector(".highscore");
        this.UpdateHighScoreDisplay();
    }

    UpdateScoreDisplay(){
        this.scoreDisplay.textContent = this.score;
    }

    UpdateHighScoreDisplay(){
        this.highScoreDisplay.textContent = this.highScore;
    }

    DecreaseScore(){
        this.score--;
        this.UpdateScoreDisplay();
    }

    ResetScore(){
        this.score = 20;
        this.UpdateScoreDisplay();
    }

    UpdateHighScore(){
        if(this.score > this.highScore){
            this.highScore = this.score;
            this.UpdateHighScoreDisplay();
        }
    }
}

// Variables

const body = document.querySelector("body");
const message = document.querySelector(".message");
const numberDisplayer = document.querySelector(".number");
const scoreTracker = new ScoreTracker();
let canPlay = true;
let hasWon = false;
let hasLost = false;
let secretNumber = Math.trunc(Math.random()*20)+1;

// Functions

function OnGuessClick() {
    if(canPlay == false) return;

    const guess = Number(document.querySelector(".guess").value);    

    if(!guess){
      message.textContent = "🛑 No Number!";
    }
    else if(guess === secretNumber){
      message.textContent = "🎉 Correct!"
      numberDisplayer.textContent = secretNumber;
      scoreTracker.UpdateHighScore();
      canPlay = false;
      hasWon = true;
    }
    else if(guess > secretNumber){
      message.textContent = "👆🏻 Too high!";
      scoreTracker.DecreaseScore();
    }
    else if(guess < secretNumber){
      message.textContent = "👇🏻 Too low!";
      scoreTracker.DecreaseScore();
    }
    
    if(scoreTracker.score < 1){
        canPlay = false;
        hasLost = true;
        console.log(hasLost);
        message.textContent = "💥 You lost!";
    }
}

function OnAgainClick(){
    document.querySelector(".guess").value = "";
    numberDisplayer.textContent = "?";
    message.textContent = "Start guessing...";
    scoreTracker.ResetScore();
    secretNumber = Math.trunc(Math.random()*20)+1;
    canPlay = true;
    hasWon = false;
    hasLost = false;
}

function UpdateVisuals(){
    if(canPlay == true){
        document.querySelector("#checkButton").style.backgroundColor = "#eee";
    }
    else{
        document.querySelector("#checkButton").style.backgroundColor = "#8f8c8c";
    }

    if(hasWon === true){
        body.style.backgroundColor = "#54b811";
    }
    else if(hasLost === true){
        body.style.backgroundColor = "#b81111";
    }
    else{
        body.style.backgroundColor = "#222";
    }
}

// Main

document.querySelector(".check").addEventListener("click", function()
{ OnGuessClick(); UpdateVisuals(); });

document.querySelector(".again").addEventListener("click", function()
{ OnAgainClick(); UpdateVisuals(); });

numberDisplayer.textContent = "?";
