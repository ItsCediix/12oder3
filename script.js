// --- Question Data ---
// Structure: { question: "...", answers: ["Ans 1", "Ans 2", "Ans 3"], correctAnswer: 1/2/3, explanation: "..." }
const questions = [
    {
        question: "Wie schreibt man 'User Experience Design' korrekt als zusammengesetzten Begriff?",
        answers: ["User Experience-Design", "User Experience Design", "User-Experience-Design"],
        correctAnswer: 3,
        explanation: "Bei mehrteiligen Anglizismen, die mit einem deutschen Wort verbunden werden, koppelt man alle Teile mit Bindestrichen durch. (Duden K18)"
    },
    {
        question: "Welches Zeichen verwendest du für eine Zeitspanne, z.B. 'Öffnungszeiten 9 bis 17 Uhr'?",
        answers: ["Bindestrich (-)", "Gedankenstrich (–)", "Leerzeichen"],
        correctAnswer: 2,
        explanation: "Für Zeit-, Datums- oder andere Spannen ('von ... bis') wird der Gedankenstrich (Halbgeviertstrich, –) verwendet, oft auch 'Bis-Strich' genannt. Beispiel: 9–17 Uhr."
    },
    {
        question: "Was ist korrekt für 'eine Agentur, die auf Webdesign spezialisiert ist'?",
        answers: ["Webdesign Agentur", "Webdesign-Agentur", "Webdesign–Agentur"],
        correctAnswer: 2,
        explanation: "Zusammensetzungen aus Substantiven werden in der Regel mit Bindestrich gekoppelt, um die Zusammengehörigkeit zu verdeutlichen. 'Webdesign' beschreibt die 'Agentur' näher."
    },
    {
        question: "In welchem Fall ist KEIN Bindestrich nötig?",
        answers: ["Eine Full HD Auflösung", "Ein Open Source Projekt", "Ein bekanntes Logo"],
        correctAnswer: 3,
        explanation: "Wenn ein Adjektiv ('bekanntes') ein Substantiv ('Logo') beschreibt, steht kein Bindestrich. Bei 'Full HD' und 'Open Source' handelt es sich um feste Begriffe/Abkürzungen, die als Einheit das folgende Substantiv näher bestimmen -> Kopplung."
    },
     {
        question: "Wie wird eine Wortgruppe mit einer Abkürzung korrekt verbunden? Beispiel: 'Beratung für KMU'.",
        answers: ["KMU Beratung", "KMU–Beratung", "KMU-Beratung"],
        correctAnswer: 3,
        explanation: "Abkürzungen werden mit einem Bindestrich an das zugehörige Wort gekoppelt. Beispiel: IT-Support, Social-Media-Strategie, KMU-Beratung."
    },
    {
        question: "Welches Zeichen setzt man für einen Einschub oder eine Pause im Satz?",
        answers: ["Bindestrich (-)", "Gedankenstrich (–)", "Doppelpunkt (:)"],
        correctAnswer: 2,
        explanation: "Der Gedankenstrich (–) wird paarig für Einschübe oder einzeln für eine deutliche Pause oder einen Gedankensprung verwendet. Beispiel: Das Layout – um ehrlich zu sein – gefällt mir nicht."
    },
    {
        question: "Wie schreibt man '10 Punkte Schriftgröße' korrekt als Eigenschaft?",
        answers: ["10 Punkte Schriftgröße", "10-Punkte-Schriftgröße", "10–Punkte–Schriftgröße"],
        correctAnswer: 2,
        explanation: "Zusammensetzungen mit Ziffern werden durch Bindestriche gekoppelt, wenn sie als Einheit vor einem Substantiv stehen und dieses näher beschreiben. Beispiel: 3-spaltiges Layout, 10-Punkte-Schriftgröße."
    },
     {
        question: "Welches Zeichen verbindet gleichrangige Orte oder Namen, z.B. die Zugstrecke?",
        answers: ["Bindestrich (-)", "Gedankenstrich (–)", "Schrägstrich (/)"],
        correctAnswer: 2,
        explanation: "Der Gedankenstrich (–) wird auch als Streckenstrich verwendet, um gleichrangige Begriffe (Orte, Personen, Vereine) zu verbinden. Beispiel: die Strecke Berlin–München, das Duell Müller–Schmidt."
    },
    {
        question: "Wann wird ein Bindestrich zur besseren Lesbarkeit gesetzt?",
        answers: ["Bei drei gleichen Buchstaben (z.B. See-Elefant)", "Immer bei langen Wörtern", "Nur bei Anglizismen"],
        correctAnswer: 1,
        explanation: "Zur Gliederung und besseren Lesbarkeit kann ein Bindestrich gesetzt werden, wenn drei gleiche Buchstaben aufeinandertreffen (z.B. Kaffee-Ersatz, See-Elefant) oder bei unübersichtlichen Zusammensetzungen."
    },
     {
        question: "Was ist der häufigste Fehler bei der Verwendung von Strichen in digitalen Texten?",
        answers: ["Gedankenstrich statt Bindestrich", "Bindestrich statt Gedankenstrich", "Zu viele Leerzeichen"],
        correctAnswer: 2,
        explanation: "Sehr oft wird fälschlicherweise der kurze Bindestrich (-) verwendet, wo eigentlich der längere Gedankenstrich (–) hingehört (z.B. bei Spannen, Einschüben, Pausen, Strecken). Achte auf den Unterschied!"
    }
];

// --- DOM Elements (keep as before) ---
const questionNumberEl = document.getElementById('question-number');
const questionTextEl = document.getElementById('question-text');
const answerOptionsEl = document.getElementById('answer-options');
const optionButtons = document.querySelectorAll('.option-button');
const answerTextEls = [
    document.getElementById('answer-text-1'),
    document.getElementById('answer-text-2'),
    document.getElementById('answer-text-3')
];
const feedbackAreaEl = document.getElementById('feedback-area');
const feedbackTextEl = document.getElementById('feedback-text');
const explanationTextEl = document.getElementById('explanation-text');
const nextButton = document.getElementById('next-button');
const finalScoreEl = document.getElementById('final-score');
const scoreTextEl = document.getElementById('score-text');
const restartButton = document.getElementById('restart-button');
const questionAreaEl = document.getElementById('question-area');
const gameContainerEl = document.querySelector('.game-container'); // Need container to hide/show subtitle

// --- Game State (keep as before) ---
let currentQuestionIndex = 0;
let score = 0;
let questionsData = []; // Will hold a shuffled copy

// --- Functions ---

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function loadQuestion() {
    resetStyles();
    feedbackAreaEl.style.display = 'none';
    feedbackTextEl.textContent = '';
    explanationTextEl.textContent = '';
    nextButton.style.display = 'none';

    if (currentQuestionIndex >= questionsData.length) {
        showFinalScore();
        return;
    }

    const currentQuestion = questionsData[currentQuestionIndex];

    questionNumberEl.textContent = `Frage ${currentQuestionIndex + 1} / ${questionsData.length}`; // Using slash for style
    questionTextEl.textContent = currentQuestion.question;

    answerTextEls.forEach((el, index) => {
        el.textContent = currentQuestion.answers[index];
    });

    optionButtons.forEach(button => {
        button.disabled = false;
    });
}

function resetStyles() {
    optionButtons.forEach(button => {
        button.classList.remove('selected', 'correct', 'incorrect');
        // Reset specific styles added by JS feedback
        button.style.backgroundColor = ''; // Use CSS default
        button.style.borderColor = ''; // Use CSS default
        button.style.borderWidth = ''; // Use CSS default
        button.style.color = ''; // Use CSS default
        button.style.opacity = '1';
    });
    feedbackTextEl.classList.remove('correct-feedback', 'incorrect-feedback');
}

function handleAnswer(selectedOption) {
    optionButtons.forEach(button => button.disabled = true);

    const currentQuestion = questionsData[currentQuestionIndex];
    const correctOption = currentQuestion.correctAnswer;
    const selectedButton = document.getElementById(`option${selectedOption}`);
    const correctButton = document.getElementById(`option${correctOption}`);

    selectedButton.classList.add('selected');
    feedbackAreaEl.style.display = 'block';
    explanationTextEl.textContent = currentQuestion.explanation || '';

    if (selectedOption === correctOption) {
        score++;
        feedbackTextEl.textContent = "Korrekt!";
        feedbackTextEl.className = 'correct-feedback';
        selectedButton.classList.add('correct');
    } else {
        feedbackTextEl.textContent = "Leider falsch.";
        feedbackTextEl.className = 'incorrect-feedback';
        selectedButton.classList.add('incorrect');
        // Highlight the correct answer as well
        correctButton.classList.add('correct');
    }

    if (currentQuestionIndex < questionsData.length - 1) {
        nextButton.textContent = "Nächste Frage";
    } else {
        nextButton.textContent = "Ergebnis anzeigen";
    }
    nextButton.style.display = 'inline-block';
}

function showFinalScore() {
    questionAreaEl.style.display = 'none';
    answerOptionsEl.style.display = 'none';
    feedbackAreaEl.style.display = 'none';
    gameContainerEl.querySelector('.subtitle').style.display = 'none'; // Hide subtitle
    finalScoreEl.style.display = 'block';

    scoreTextEl.textContent = `Du hast ${score} von ${questionsData.length} Fragen richtig beantwortet.`;

    let endMessage = "Typografisch fit!";
    if (score < questionsData.length * 0.5) { // Less than 50%
        endMessage = "Da geht noch was! Übung macht den Meister.";
    } else if (score < questionsData.length * 0.9) { // 50% to 89%
        endMessage = "Gute Grundlagen! Weiter so.";
    } else if (score === questionsData.length) { // Perfect score
        endMessage = "Perfekt! Ein echter Typo-Profi.";
    }
     finalScoreEl.querySelector('h2').textContent = endMessage;
}


function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

function restartGame() {
    score = 0;
    currentQuestionIndex = 0;
    questionsData = shuffleArray([...questions]);

    finalScoreEl.style.display = 'none';
    questionAreaEl.style.display = 'block';
    answerOptionsEl.style.display = 'flex'; // Use flex as defined in CSS
    feedbackAreaEl.style.display = 'none';
    gameContainerEl.querySelector('.subtitle').style.display = 'block'; // Show subtitle again

    loadQuestion();
}

// --- Event Listeners (keep as before) ---
optionButtons.forEach(button => {
    button.addEventListener('click', () => {
        handleAnswer(parseInt(button.dataset.option));
    });
});

nextButton.addEventListener('click', nextQuestion);
restartButton.addEventListener('click', restartGame);

// --- Initialisation ---
document.addEventListener('DOMContentLoaded', () => {
    // No need to call restartGame explicitly if we shuffle and load directly
    questionsData = shuffleArray([...questions]);
    loadQuestion();
});