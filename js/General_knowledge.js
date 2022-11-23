const question = document.getElementById("question"); 
const choices = Array.from(document.getElementsByClassName("choice-text")); 
const progressText = document.getElementById("progressText"); 
const scoreText = document.getElementById("score"); 
const progressBarFull = document.getElementById("progressBarFull"); 
const answersIndicatorContainer = document.querySelector(".answers-indicator");
let currentQuestion = {}; 
let acceptingAnswers = true; 
let score = 0; 
let questionCounter = 0; 
let availableQuestion = []; 
let questions = [ 
{ 
question: "Which country has the longest coastline in the world?", 
choice1: "Canada", 
choice2: "USA", 
choice3: "Russia",
choice4: "Australia",
answer: 1 
}, 
{ 
question: "What is the world's most populated country?", 
choice1: "India", 
choice2: "USA", 
choice3: "Chine",
choice4: "Russia",
answer: 3 
}, 
{ 
question: "What is the capital of the Philippines?", 
choice1: "London", 
choice2: "Dili", 
choice3: "Marawi", 
choice4: "Manila",
answer: 4
}, 
{ 
question: "What is the World's Smallest Country?", 
choice1: "Qatar", 
choice2: "Tunisia", 
choice3: "Vatican city", 
choice4: "Togo",
answer: 3
},
{ 
question: "What is the capital of Australia?", 
choice1: "Sydney", 
choice2: "Melbourne", 
choice3: "Adelaide", 
choice4: "Canberra",
answer: 4
},
{
question: "Where was the hottest temperature ever recorded?", 
choice1: "Peru",
choice2: "Libya",
choice3: "Mexico", 
choice4: "India",
answer: 2
},
{question: "In which ocean is the island of Madagascar?", 
choice1: "Arctic", 
choice2: "Atlantic", 
choice3: "Pacific", 
choice4: "Indian", 
answer: 4
},
{question: "What invention caused many deaths while testing it?", 
choice1: "Dynamite",
choice2: "Ladders", 
choice3: "Race cars", 
choice4: "Parachute",
answer: 4
},
{question: "What invention is credited to the Russian born American inventor Vladimir Kosma Zworykin?",
choice1: "Television", 
choice2: "Telegraph", 
choice3: "Radio", 
choice4: "Dishwasher", 
answer: 1
},
{question: "Who invented Electric Generator?",
choice1: "Sir Alexander Graham Bell", 
choice2: "Michael Faraday", 
choice3: "Alfred B. Nobel", 
choice4: "Thomas Alva Edison", 
answer: 2
}]; 
//CONSTANTS 
const CORRECT_BONUS = 10; 
const MAX_QUESTIONS = 10; 

startGame = () => { 
questionCounter = 0; 
score = 0; 
availableQuestions = [...questions]; 
getNewQuestion(); 
answersIndicator();
}; 

getNewQuestion = () => { 
if (availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS) { 
	localStorage.setItem('mostRecentScore',score);
//go to the end page 
return window.location.assign("end.html"); 
} 

questionCounter++; 
progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`; 
//Update the progress bar 
progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%` ; 
const questionIndex = Math.floor(Math.random() * availableQuestions.length); 
currentQuestion = availableQuestions[questionIndex]; 
question.innerText = currentQuestion.question; 
choices.forEach( choice => { 
const number = choice.dataset["number"]; 
choice.innerText = currentQuestion["choice" + number]; 
}); 
availableQuestions.splice(questionIndex, 1); 
acceptingAnswers = true; 
}; 
choices.forEach(choice => { 
choice.addEventListener("click",e => { 
if (!acceptingAnswers) return; 

acceptingAnswers = false; 
const selectedChoice = e.target; 
const selectedAnswer = selectedChoice.dataset["number"]; 
const classToApply = selectedAnswer == currentQuestion.answer ? 
"correct" : "incorrect"; 
if (classToApply == "correct") { 
incrementScore(CORRECT_BONUS); 
updateAnswerIndicator("correct");

} 
else if (classToApply == "incorrect")
{
	updateAnswerIndicator("incorrect");
} 
selectedChoice.parentElement.classList.add(classToApply); 
        setTimeout(() => { 
         selectedChoice.parentElement.classList.remove(classToApply); 
        getNewQuestion(); 
        }, 1000); 
}); 
}); 


answersIndicator = () => {

	for (let i=0; i<MAX_QUESTIONS; i++){
		const indicator = document.createElement("div");
		answersIndicatorContainer.appendChild(indicator);
	}
}
 

updateAnswerIndicator = (markType) => {

	answersIndicatorContainer.children[questionCounter-1].classList.add(markType)

}


incrementScore = num => { 
score += num;
scoreText.innerText = score; 
}; 
startGame(); 