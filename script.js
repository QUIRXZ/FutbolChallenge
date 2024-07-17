const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const endScreen = document.getElementById('end-screen');
const questionContainer = document.getElementById('question-container');
const questionImage = document.getElementById('question-image');
const questionText = document.getElementById('question-text');
const answerContainer = document.getElementById('answer-container');
const answersDiv = document.getElementById('answers');
const timerDiv = document.getElementById('timer');
const scoreText = document.getElementById('score');

let questions = [
    {
        image: 'image1.jpg',
        question: '¿Qué equipo es?',
        answers: ['Real Madrid 16/17', 'Levante', 'PSG 2019', 'Manchester United'],
        correct: 0
    },
    {
        image: 'image2.jpg',
        question: '¿Qué selección es?',
        answers: ['Inglaterra', 'España', 'Francia', 'Paises Bajos'],
        correct: 2
    },
    {
        image: 'image3.jpg',
        question: '¿Qué selección es?',
        answers: ['Uruguay', 'Chile', 'Argentina', 'Colombia'],
        correct: 2
    },
    {
        image: 'image4.jpg',
        question: '¿Qué equipo es?',
        answers: ['Real Madrid', 'Liverpool', 'Paris Saint Germain', 'Manchester City'],
        correct: 3
    },
    {
        image: 'image5.jpg',
        question: '¿Qué selección es?',
        answers: ['Alemania', 'Inglaterra', 'Portugal', 'Bélgica'],
        correct: 1
    },
    {
        image: 'image6.jpg',
        question: '¿Qué selección es?',
        answers: ['Brasil', 'Uruguay', 'Chile', 'Colombia'],
        correct: 1
    },
    {
        image: 'image7.jpg',
        question: '¿Qué selección es?',
        answers: ['Croacia', 'Italia', 'Suiza', 'Dinamarca'],
        correct: 2
    },
    {
        image: 'image8.jpg',
        question: '¿Qué selección es?',
        answers: ['Estados Unidos', 'Costa Rica', 'Canadá', 'Panamá'],
        correct: 2
    },
    {
        image: 'image9.jpg',
        question: '¿Qué selección es?',
        answers: ['Portugal', 'Bélgica', 'Austria', 'Croacia'],
        correct: 3
    },
    {
        image: 'image10.jpg',
        question: '¿Qué equipo es?',
        answers: ['Bayern Múnich', 'Bayer Leverkusen', 'RB Leipzig', 'Borussia Dortmund'],
        correct: 3
    },
    // Añade más preguntas según sea necesario
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 40;

function startGame() {
    startScreen.style.display = 'none';
    gameScreen.style.display = 'flex';
    endScreen.style.display = 'none';
    score = 0;
    currentQuestionIndex = 0;
    shuffleQuestions();
    showQuestion();
    startTimer();
}

function showQuestion() {
    clearInterval(timer);
    timeLeft = 40;
    timerDiv.textContent = timeLeft;
    const currentQuestion = questions[currentQuestionIndex];
    questionImage.src = currentQuestion.image;
    questionText.textContent = currentQuestion.question;
    answersDiv.innerHTML = '';
    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.onclick = () => selectAnswer(index, button);
        answersDiv.appendChild(button);
    });
    startTimer();
}

function selectAnswer(index, button) {
    const currentQuestion = questions[currentQuestionIndex];
    if (index === currentQuestion.correct) {
        score++;
        button.classList.add('correct');
    } else {
        button.classList.add('incorrect');
        const correctButton = answersDiv.children[currentQuestion.correct];
        correctButton.classList.add('correct');
    }
    setTimeout(nextQuestion, 1000);
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endGame();
    }
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerDiv.textContent = timeLeft;
        if (timeLeft === 0) {
            nextQuestion();
        }
    }, 1000);
}

function endGame() {
    clearInterval(timer);
    gameScreen.style.display = 'none';
    endScreen.style.display = 'flex';
    scoreText.textContent = `Aciertos: ${score}, Errores: ${questions.length - score}`;
}

function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}

startButton.onclick = startGame;
restartButton.onclick = () => {
    endScreen.style.display = 'none';
    startScreen.style.display = 'flex';
};
