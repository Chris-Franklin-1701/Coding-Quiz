var startButton = document.getElementById("start-btn")
var answerBtnEL = document.getElementById("answer-btn")


startButton.addEventListener("click", startGame)

function startGame() {
    console.log("Started...Yay!!!")
    startButton.classList.add("hide")
    answerBtnEL.classList.remove("hide")
}

