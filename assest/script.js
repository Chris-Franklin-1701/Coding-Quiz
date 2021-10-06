var startButton = document.getElementById("start-btn")
var answerBtnEl = document.getElementById("answer-btn")
var questionsEl = document.getElementById("questions")
var questionContainerEl = document.getElementById("question-container")
var h2El = document.getElementById("h2")
//var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var endGameDiv = document.getElementById("endGame");
var savedScoreContainer = document.getElementById("savedScoreContainer");
var savedScoreDiv = document.getElementById("highscorePage");
var highscoreName = document.getElementById("initials");
var highscorePlayerName = document.getElementById("highscoreInitials");
var endGameBtns = document.getElementById("endGame-btns");
var submitBtn = document.getElementById("submit-btn");
var highscoreScore = document.getElementById("highscoreScore");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");
var currentQuestionsIndex = 0
var score = 0
var correct;

// quiz questions
var questions = [{
    question: "Commonly used data types do NOT include:",
    choiceA: "strings",
    choiceB: "booleans",
    choiceC: "alerts",
    choiceD: "square brackets",
    correctAnswer: "c", 
},
{
    question: "The condition in an if/else statement is enclosed within ____.",
    choiceA: "quotes",
    choiceB: "curly brackets",
    choiceC: "parentheses",
    choiceD: "square brackets",
    correctAnswer: "c",
},
{
    question: "Arrays in JavaScript can be used to store _____.",
    choiceA: "numbers and strings",
    choiceB: "other arrays",
    choiceC: "booleans",
    choiceD: "all of the above",
    correctAnswer: "d",
},
{
    question: "String values must be enclosed within _____ when being assigned to variables.",
    choiceA: "commas",
    choiceB: "curly brackets",
    choiceC: "quotes",
    choiceD: "parentheses",
    correctAnswer: "a",
},
{
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    choiceA: "JavaScript",
    choiceB: "bash",
    choiceC: "for loop",
    choiceD: "console.log",
    correctAnswer: "d",
},
];
buttonA.style.visibility = "hidden";
buttonB.style.visibility = "hidden";
buttonC.style.visibility = "hidden";
buttonD.style.visibility = "hidden";

var finalQuestionIndex = questions.length;
var timerInterval;


startButton.addEventListener("click", startGame)

var timeEl = document.querySelector(".timer");
var secondsLeft = 75;

function setTime() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = "Time left: " + secondsLeft
        
        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            //endgame somehow
        }
    }, 1000);
}

// starts the game
function startGame() {
    endGameDiv.style.display = "none";
    console.log("Started...Yay!!!");
    startButton.classList.add("hide");
    answerBtnEl.classList.remove("hide");
    h2El.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionsIndex = 0
    buttonA.style.visibility = "visible";
    buttonB.style.visibility = "visible";
    buttonC.style.visibility = "visible";
    buttonD.style.visibility = "visible";
    setTime()
    generateQuestion()
}

function generateQuestion(){
    endGameDiv.style.display = "none";
    if (currentQuestionsIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = questions[currentQuestionsIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

function checkAnswer(answer){
    correct = questions[currentQuestionsIndex].correctAnswer;

    if (answer === correct && currentQuestionsIndex !== finalQuestionIndex){
        //score++;
        alert("That Is Correct!");
        currentQuestionsIndex++;
        generateQuestion();
        //display in the results div that the answer is correct.
    }else if (answer !== correct && currentQuestionsIndex !== finalQuestionIndex){
        alert("That Is Incorrect.")
        currentQuestionsIndex++;
        generateQuestion();
        //display in the results div that the answer is wrong.
    }else{
        showScore();
    }
}

function showScore(){
    questionContainerEl.style.display = "none";
    endGameDiv.style.display = "flex";
    submitBtn.style.display = "block";
    clearInterval(timerInterval);
    highscoreName.value = "";
    finalScoreEl.innerHTML = "You got " + (score+secondsLeft) + " out of " + (questions.length+75) + " total possible points!";
}

submitBtn.addEventListener("click", function highscore(){

    if(highscoreName.value === "") {
        alert("Field cannot be blank, please enter initials");
        return false;
    }else{
        var savedScores = JSON.parse(localStorage.getItem("savedScores")) ||[];
        var currentPlayer = highscoreName.value.trim();
        var currentHighscore = {
            name: currentPlayer,
            score: score
        };
        endGameDiv.style.display = "none";
        savedScoreContainer.style.display = "flex";
        savedScoreDiv.style.display = "block";
        savedScores.push(currentHighscore);
        localStorage.setItem("savedScores", JSON.stringify(savedScores));
        generateHighscores();
    }
});

function showHighscore(){
    questionContainerEl.style.display = "none"
    endGameDiv.style.display = "none";
    savedScoreContainer.style.display = "flex";
    savedScoreDiv.style.display = "flex";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

function generateHighscores(){
    highscorePlayerName.innerHTML = "";
    highscoreScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedScores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscorePlayerName.appendChild(newNameSpan);
        highscoreScore.appendChild(newScoreSpan);
    }
}

function clearScore(){
    window.localStorage.clear();
    highscorePlayerName.textContent = "";
    highscoreScore.textContent = "";
}

function replayQuiz(){
    savedScoreContainer.style.display = "none";
    endGameDiv.style.display = "none";
    questionContainerEl.style.display = "flex";
    timeLeft = 75;
    score = 0;
    currentQuestionsIndex = 0;
}