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
    currentQuestionIndex++;
    updateProgress();
    showQuestion();
}

function showResult() {
    const userAnswer = document.querySelector('input[name="quiz"]:checked');
    
    if (userAnswer && userAnswer.value === quizData[currentQuestionIndex].correctAnswer) {
        score++;
    }

    document.getElementById('quiz-container').innerHTML = `
        <h2>Quiz Completed!</h2>
        <p>Your score: ${score}/${quizData.length}</p>
        ${score >= 4 ? '<p>Congratulations! You did great!</p>' : score === 3 ? '<p>Fair attempt! You got 3 out of 5 correct.</p>' : '<p>Try again! You can do better next time.</p>'}
        <button id="try-again">Try Again</button>
        <button id="finish-quiz">Finish</button>
    `;

    document.getElementById('try-again').addEventListener('click', tryAgain);
    document.getElementById('finish-quiz').addEventListener('click', finishQuiz);
}

function tryAgain() {
    currentQuestionIndex = 0;
    score = 0;
    startQuiz();
}

function finishQuiz() {
    document.getElementById('quiz-container').innerHTML = '<h2>Thank you for quizzing!</h2>';
}
