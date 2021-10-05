var startButton = document.getElementById("start-btn")
var answerBtnEl = document.getElementById("answer-btn")
var questionsEl = document.getElementById("questions")
var questionContainerEl = document.getElementById("question-container")


let shuffledQuestions, currentQuestionsIndex
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


function startGame() {
    console.log("Started...Yay!!!");
    startButton.classList.add("hide");
    answerBtnEl.classList.remove("hide");
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionsIndex = 0
    showNextQuestion()
}

function showNextQuestion() {
    resetPage()
    showNewQuestion(shuffledQuestions[currentQuestionsIndex])
}

function showNewQuestion(question) {
    questionsEl.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct
        };
        button.addEventListener("click", pickAnswer);
        answerBtnEl.appendChild(button);
    });
}

function resetPage() {
    clearStatusClass(document.body)
    while (answerBtnEl.firstChild) {
        answerBtnEl.removeChild(answerBtnEl.firstChild)
    }
}

function pickAnswer(e) {
    var pickedButton = e.target
    var correct = pickedButton.dataset.answers
    setStatusClass(document.body, correct)
    Array.from(answerBtnEl.children).forEach(button => {
        setStatusClass(button, button.dataset.answers)
    })
    if (shuffledQuestions.length > currentQuestionsIndex + 1) {
        
    }else{
        startButton.innerText = "Restart"
        startButton.classList.remove("hide")
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct")
    }else{
        element.classList.add("incorrect")
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("incorrect")
}

var questions = [{
    question: "Commonly used data types do NOT include:",
    answers: [
        {text: "strings", correct: false},
        {text: "booleans", correct: false},
        {text: "alerts", correct: true},
        {text: "square brackets", correct: false}
    ]
},
{
    question: "The condition in an if/else statement is enclosed within ____.",
    answers: [
        {text: "quotes", correct: false},
        {text: "curly brackets", correct: false},
        {text: "parentheses", correct: true},
        {text: "square brackets", correct: false}
    ]
},
{
    question: "Arrays in JavaScript can be used to store _____.",
    answers: [
        {text: "numbers and strings", correct: false},
        {text: "other arrays", correct: false},
        {text: "booleans", correct: false},
        {text: "all of the above", correct: true}
    ]
},
{
    question: "String values must be enclosed within _____ when being assigned to variables.",
    answers: [
        {text: "commas", correct: false},
        {text: "curly brackets", correct: false},
        {text: "quotes", correct: true},
        {text: "parentheses", correct: false}
    ]
},
{
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: [
        {text: "JavaScript", correct: false},
        {text: "bash", correct: false},
        {text: "for loop", correct: false},
        {text: "console.log", correct: true}
    ]
},
]