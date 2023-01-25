let correctAnswer;
let questionNumber = 1;
let totalQuestions = 10;
let correctAnswers = 0;
let incorrectAnswers = 0;

function getQuestion() {
    fetch(`https://opentdb.com/api.php?amount=1&category=9&difficulty=easy&type=multiple&number=${questionNumber}`)
        .then(response => response.json())
        .then(data => {
            let question = data.results[0].question;
            let answers = data.results[0].incorrect_answers;
            correctAnswer = data.results[0].correct_answer;
            answers.push(correctAnswer);

            // Exiba a pergunta na página
            document.getElementById("question").innerHTML = question;

            // Embaralhe as respostas
            answers.sort(() => Math.random() - 0.5);

            // Exiba as respostas na página
            for (let i = 0; i < answers.length; i++) {
                document.getElementById("answer" + (i + 1)).innerHTML = answers[i];
            }

            // Adicione eventos de clique para as respostas
            let answerBtns = document.getElementsByClassName("answer-btn");
            for (let i = 0; i < answerBtns.length; i++) {
                answerBtns[i].addEventListener("click", checkAnswer);
            }
        });
}

getQuestion();

function checkAnswer(event) {
    let selectedAnswer = event.target.innerHTML;
    let feedback = document.getElementById("feedback");
    if (selectedAnswer === correctAnswer) {
        feedback.classList.remove("alert-danger");
        feedback.classList.add("alert-success");
        feedback.innerHTML = "Correct!";
        correctAnswers++;
        questionNumber++;
    } else {
        feedback.classList.remove("alert-success");
        feedback.classList.add("alert-danger");
        feedback.innerHTML = "Incorrect. The correct answer was " + correctAnswer + ".";
        incorrectAnswers++;
        questionNumber++;
    }
    feedback.style.display = "block";
    if (questionNumber > totalQuestions) {
        feedback.innerHTML = "Congratulations! You have completed the quiz. You have " + correctAnswers + " correct answers and " + incorrectAnswers + " incorrect answers.";
        return;
    }
    getQuestion();
}

window.onload = function () {
    getQuestion();
    document.getElementById("restart-btn").addEventListener("click", function () {
        let answerBtns = document.getElementsByClassName("answer-btn");
        for (let i = 0; i < answerBtns.length; i++) {
            answerBtns[i].removeEventListener("click", checkAnswer);
        }
        questionNumber = 1;
        correctAnswers = 0;
        incorrectAnswers = 0;
        feedback.style.display = "none";
        getQuestion();
    });
};