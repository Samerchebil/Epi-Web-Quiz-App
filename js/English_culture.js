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
question: "What is Shakespeare famous for ?", 
choice1: "His plays", 
choice2: "His operas", 
choice3: "His paintings", 
choice4: "His dance", 
answer: 1 
}, 
{ 
question: "What is the name of the river that flows in London ?", 
choice1: "Avon", 
choice2: "Ribble", 
choice3: "Thames", 
choice4: "Banas", 
answer: 3 
}, 
{ 
question: "Which of the following nationalities has the largest number of UK residents?", 
choice1: "Irish", 
choice2: "Polish", 
choice3: "Indian", 
choice4: "Tunisian",
answer: 3 
}, 
{ 
question: "What is the most prominent religion in the UK?", 
choice1: "Islam", 
choice2: "Anglicanism (Church of England)", 
choice3: "Catholicism", 
choice4: "Hinduism",
answer: 2 
},
{ 
question: "What Was the Roman Name for London?", 
choice1: "Londrarius",
choice2: "Londinium",
choice3: "Englatus", 
choice4: "Brittanica",
},
{
question: "What's the largest city in UK?", 
choice1: "London", 
choice2: "New York", 
choice3: "Los Angeles", 
choice4: "Glasgow",
answer: 1
},
{question: "In which town is Hyde Park? ", 
choice1: "Dublin", 
choice2: "London", 
choice3: "New York", 
choice4: "San Francisco", 
answer: 2
},
{question: "What is the longest river in the UK?", 
choice1: "Trent",
choice2: "Great Ouse", 
choice3: "The Thames", 
choice4: "Severn",
answer: 4
},
{question: "Who invented the sandwich?",
choice1: "Earl of Sandwich", 
choice2: "George Washington", 
choice3: "King Henry VIII", 
choice4: "Queen Victoria", 
answer: 2
},
{question: "What do they celebrate in Britain on 5th November?",
choice1: "Halloween", 
choice2: "Guy Fawkes Night", 
choice3: "Notting Hill Carnival", 
choice4: "St. Patrick's Day", 
answer: 1
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