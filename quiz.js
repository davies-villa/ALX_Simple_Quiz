const quizData = [
    {
        question: "What is 2 + 2?",
        choices: ["3", "4", "22"],
        correctAnswer: "4"
    },
    {
        question: "What is the capital of France?",
        choices: ["Berlin", "Madrid", "Paris"],
        correctAnswer: "Paris"
    },
    {
        question: "Which is the largest planet in our solar system?",
        choices: ["Earth", "Jupiter", "Mars"],
        correctAnswer: "Jupiter"
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        choices: ["Harper Lee", "J.K. Rowling", "Ernest Hemingway"],
        correctAnswer: "Harper Lee"
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        choices: ["Gold", "Oxygen", "Zinc"],
        correctAnswer: "Oxygen"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let answers = [];

document.getElementById('start-quiz').addEventListener('click', startQuiz);
document.getElementById('prev-question').addEventListener('click', prevQuestion);
document.getElementById('next-question').addEventListener('click', nextQuestion);
document.getElementById('submit-answer').addEventListener('click', showResult);

function startQuiz() {
    document.getElementById('welcome-container').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    updateProgress();
    showQuestion();
}

function showQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    document.getElementById('quiz-question').textContent = currentQuestion.question;

    const quizOptions = document.getElementById('quiz-options');
    quizOptions.innerHTML = ''; 

    currentQuestion.choices.forEach(choice => {
        const optionElement = document.createElement('div');
        optionElement.innerHTML = `
            <input type="radio" id="${choice}" name="quiz" value="${choice}">
            <label for="${choice}">${choice}</label><br>
        `;
        quizOptions.appendChild(optionElement);
    });

    document.getElementById('prev-question').style.display = currentQuestionIndex === 0 ? 'none' : 'inline-block';
    document.getElementById('next-question').style.display = currentQuestionIndex === quizData.length - 1 ? 'none' : 'inline-block';
    document.getElementById('submit-answer').style.display = currentQuestionIndex === quizData.length - 1 ? 'inline-block' : 'none';
}

function updateProgress() {
    const progressIndicator = document.getElementById('progress-indicator');
    progressIndicator.innerHTML = ''; 

    quizData.forEach((_, index) => {
        const circle = document.createElement('div');
        circle.className = 'progress-circle' + (index === currentQuestionIndex ? ' active' : '');
        progressIndicator.appendChild(circle);
    });
}

function prevQuestion() {
    currentQuestionIndex--;
    updateProgress();
    showQuestion();
}

function nextQuestion() {
    saveAnswer();
    currentQuestionIndex++;
    updateProgress();
    showQuestion();
}

function saveAnswer() {
    const userAnswer = document.querySelector('input[name="quiz"]:checked');
    if (userAnswer) {
        answers[currentQuestionIndex] = userAnswer.value;
    }
}

function showResult() {
    saveAnswer();

    const resultContainer = document.createElement('div');
    resultContainer.innerHTML = `<h2>Quiz Completed!</h2><p>Your score: ${score}/${quizData.length}</p>`;

    quizData.forEach((question, index) => {
        const answer = document.createElement('p');
        if (answers[index] === question.correctAnswer) {
            answer.innerHTML = `<span class="correct-answer">✔</span> Question: ${question.question} - Your Answer: ${answers[index]} (Correct)`;
            score++;
        } else {
            answer.innerHTML = `<span class="wrong-answer">✘</span> Question: ${question.question} - Your Answer: ${answers[index] || "None"} (Correct Answer: ${question.correctAnswer})`;
        }
        resultContainer.appendChild(answer);
    });

    document.getElementById('quiz-container').innerHTML = '';
    document.getElementById('quiz-container').appendChild(resultContainer);

    const tryAgainButton = document.createElement('button');
    tryAgainButton.id = 'try-again';
    tryAgainButton.textContent = 'Try Again';
    tryAgainButton.addEventListener('click', tryAgain);
    resultContainer.appendChild(tryAgainButton);

    const finishButton = document.createElement('button');
    finishButton.id = 'finish-quiz';
    finishButton.textContent = 'Finish';
    finishButton.addEventListener('click', finishQuiz);
    resultContainer.appendChild(finishButton);
}

function tryAgain() {
    currentQuestionIndex = 0;
    score = 0;
    answers = [];
    startQuiz();
}

function finishQuiz() {
    document.getElementById('quiz-container').innerHTML = '<h2>Thank you for quizzing!</h2>';
}
