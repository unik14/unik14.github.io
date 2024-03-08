const questions = [
    "What is your name?",
    "How old are you?",
    "What is your first ever memory?",
    "How petty are you with coworkers/peers you don't like?",
    "Did you ever wish you had someone else's parents?",
    "How close does someone have to be for you to tell them their hair looks bad?",
    "What should your grandkids call you?",
    "Is who you are today disappointing someone you know?",
    "How do you escape a bad date?",
    "What are you taking to your grave, literally or metaphorically?",
    "What was your first 'favorite thing'?",
    "Are you often the villain in a story?",
    "How good of a parent will you be compared to your parents?",
    "Would 8yo you be excited for your current career?",
    "Fuck marry kill: first kiss, first love, most recent ex?",
    "How do you think you will die?",
    "How often do you think you're someone's subway crush?"
];

const questionElement = document.getElementById('question');
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let currentQuestionIndex = 0;
let answerString = '';
let stringy = [];
let displayText = '';
let lastX = 0;
let lastY = canvas.height / 2;
let directionX = 1; // 1 for right, -1 for left

function displayQuestion() {
    displayText = '';
    for (let i = 0; i < stringy.length; i ++) {
        displayText += stringy[i] + '\n';
    }
    displayText += questions[currentQuestionIndex];
    questionElement.textContent = displayText;
}

function drawSquiggle() {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.moveTo(lastX, lastY);

    const newX = lastX + 10 * directionX; // Move along x-axis
    const newY = lastY + Math.random() * 40 - 20; // Random y-axis movement with bias

    // Check if newX is beyond canvas boundaries
    if (newX < 0 || newX > canvas.width) {
        directionX *= -1; // Reverse the direction
    }

    // Check if newY is beyond canvas boundaries
    if (newY < 0 || newY > canvas.height) {
        // Reverse the direction
        lastY = canvas.height - lastY; // Move to the opposite side of the canvas
    } else {
        lastX = newX;
        lastY = newY;
    }

    // Calculate hue value based on current timestamp for rainbow effect
    const hue = (Date.now() / 10) % 360; // Modulus 360 to keep hue within valid range (0-360)
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`; // Set stroke color using HSL color model

    ctx.lineTo(lastX, lastY);
    ctx.stroke();
}


function updateAnswerString(event) {
    const key = event.key;
    drawSquiggle();
    if (key === 'Enter') {
        if (currentQuestionIndex < questions.length-1) { // if there are still questions left
            // Store the current question and answer
            stringy.push(questions[currentQuestionIndex] + ' ' + answerString + '.');
            answerString = ''; // Reset answerString for the new question
            currentQuestionIndex++;
            displayQuestion();
        }
        else {
            stringy.push(questions[currentQuestionIndex] + ' ' + answerString);
            currentQuestionIndex++;
            questionElement.textContent += ". I hope you live a long long life."
        }
    } else {
        
        if (currentQuestionIndex > 0) {
            displayText = '';
            for (let i = 0; i < stringy.length; i++) {
                displayText += stringy[i] + '\n';
            }
            answerString += key;
            displayText += questions[currentQuestionIndex] + ' ' + answerString;
            questionElement.textContent = displayText;
            d
        } else if (currentQuestionIndex < questions.length){
            answerString += key;
            questionElement.textContent = questions[currentQuestionIndex] + ' ' + answerString;
        }
    }
}




// Display the first question
displayQuestion();

// Listen for keypress events on the document
document.addEventListener('keypress', updateAnswerString);