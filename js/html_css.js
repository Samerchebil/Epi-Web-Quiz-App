const question = document.getElementById("question"); 

const choices = Array.from(document.getElementsByClassName("choice-text")); 

const progressText = document.getElementById("progressText"); 

const scoreText = document.getElementById("score"); 

const progressBarFull= document.getElementById("progressBarFull"); 

const answersIndicatorContainer = document.querySelector(".answers-indicator");


let currentQuestion = {}; 

let acceptingAnswers = true; 

let score = 0; 

let questionCounter = 0; 

let availableQuestion = []; 

 

let questions = [ 

{ 

question: "How to put a comment in HTML5?", 

choice1: "{}", 

choice2: "// //", 

choice3: "<!-- -->", 

choice4: "/* */", 

answer: 3

}, 

 

{ 

question: "<caption> is useful for", 

choice1: "the legend of an image", 

choice2: "the legend of a link", 

choice3: "the title of a generic object", 

choice4: "the title above the table", 

answer: 4

}, 

 

{ 

question: "Which form action can transfer more than 255 characters?", 

choice1: "APPEND", 

choice2: "POST", 

choice3: "GET", 

choice4: "SEND", 

answer: 2 

}, 

 

{ 

question: "How to include a stylesheet in an html5 page?", 

choice1: '<link src="stylesheet" value="feuille.css" type="text/css">', 

choice2: '<link rel="stylesheet" href="feuille.css">', 

choice3: '<link type="text/css" href="feuille.css" >', 

choice4: '<link rel="stylesheet" src="feuille.css">', 

answer: 2 

},

{ 

question: "What does CSS stand for?", 

choice1: "Colorful Style Sheets", 

choice2: "Computer Style Sheets", 

choice3: "Cascading Style Sheets", 

choice4: "Creative Style Sheets", 

answer: 3

},
{
question: "Which HTML attribute is used to define inline styles? ", 

choice1: "font", 

choice2: "class", 

choice3: "styles", 

choice4: "style", 

answer: 4

},

{question: "How do you display hyperlinks without an underline?", 

choice1: "a{text-decoration:no-underline;}", 

choice2: "a{underline:none;}", 

choice3: "a{decoration:no-underline;}", 

choice4: "a{text-decoration:none;}", 

answer: 4

},
{question: "How do you make a list that lists its items with squares?", 

choice1: "list:square;", 

choice2: "list-type:square;", 

choice3: "list-style-type:square;", 

choice4: "list-style:square;", 

answer: 2


},
{question: "What does HTML stand for?",
choice1: "Home Tool Markup Language", 

choice2: "Hyperlinks Tool Markup Language", 

choice3: "Hyper Text Markup Language", 

choice4: "Hyperlinks and Text Markup Language", 

answer: 3
},
{question: "Which of these elements are all <table> elements? ",
choice1: "<thead><body><tr>", 

choice2: "<table><head><tfoot>", 

choice3: "<table><tr><tt>", 

choice4: "<table><tr><td>", 

answer: 4

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