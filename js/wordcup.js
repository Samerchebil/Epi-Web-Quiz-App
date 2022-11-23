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
question: "Who won the 2018 FIFA World Cup ?", 
choice1: "Tunisia", 
choice2: "Brazil", 
choice3: "France",
choice4: "Spain",
answer: 3 
}, 
{ 
question: "How many World Cups did Pele win ?", 
choice1: "3 (in 1958, 1962 & 1974)", 
choice2: "2 (in 1958, 1962)", 
choice3: "3 (in 1958, 1962 & 1970)",
choice4: "1 (in 1958)",
answer: 3 
}, 
{ 
question: "Before Qatar 2022, how many nations have won the FIFA World Cup ?", 
choice1: "8", 
choice2: "11", 
choice3: "9", 
choice4: "5",
answer: 1
}, 
{ 
question: "How many teams qualify from the group stages to the knockout rounds ?", 
choice1: "18", 
choice2: "16", 
choice3: "8", 
choice4: "22",
answer: 2
},
{ 
question: "The 2014 final was played at which football stadium ?", 
choice1: "Wembely", 
choice2: "Maracana", 
choice3: "Estadio Castelao", 
choice4: "Camp nou",
answer: 2
},
{
question: "How many times have Italy won the World Cup so far ?", 
choice1: "2 (in 1982 & 2006)",
choice2: "4 (in 1934, 1938, 1982 & 2002)",
choice3: "4 (in 1934, 1938, 1982 & 2006)", 
choice4: "2 (1982 & 2002)",
answer: 3
},
{question: "IWhich country has appeared at every World Cup Finals since the first in 1930 ?", 
choice1: "Tunisia", 
choice2: "Brazil", 
choice3: "Germany", 
choice4: "Argentina", 
answer: 2
},
{question: "Which country won the first ever World Cup ?", 
choice1: "Spain",
choice2: "England", 
choice3: "Brazil", 
choice4: "Uruguay",
answer: 4
},
{question: "Which player to play at the World Cup Finals has scored the most International Goals ever ?",
choice1: "Lionel Messi", 
choice2: "Cristiano ronaldo", 
choice3: "Pele", 
choice4: "Ali Daei", 
answer: 2
},
{question: "Which player has the most captain appearences at the World Cup Finals ?",
choice1: "Romario", 
choice2: "Maradona", 
choice3: "Alfredo Di Stefano", 
choice4: "Lionel Messi", 
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