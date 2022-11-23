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

question: "Wich one programming language is exclusively used for artificial intelligence?", 

choice1: "C", 

choice2: "Java", 

choice3: "J2EE", 

choice4: "Prolog", 

answer: 4 

}, 

 

{ 

question: "Number of layers in the OSI(Open Systems Interconnection) Model", 

choice1: "9", 

choice2: "3", 

choice3: "7", 

choice4: "11", 

answer: 3 

}, 

 

{ 

question: "Wich key combination is used to close a open application in Windows machine?", 

choice1: "Alt+F8", 

choice2: "CTRL+X", 

choice3: "Alt+F4", 

choice4: "Shift+P", 

answer: 3 

}, 

 

{ 

question: "The main page of a Web site is known as", 

choice1: "Home page", 

choice2: "Book mark page", 

choice3: "Content page", 

choice4: "Navigator page", 

answer: 1 

},

{ 

question: "What is the full form of PDF ", 

choice1: "Printed Document Format", 

choice2: "Public Document Format", 

choice3: "Portable Document Format", 

choice4: "Published Document Format", 

answer: 3 

},
{
question: "Linux is an example of ", 

choice1: "Software", 

choice2: "Application", 

choice3: "Operating System", 

choice4: "Browser", 

answer: 3 

},

{question: "In currently open PowerPoint presentation, a new slide is interested using shortcut key ", 

choice1: "Ctrl+N", 

choice2: "Ctrl+M", 

choice3: "Ctrl+S", 

choice4: "Shift+N", 

answer: 2

},
{question: "Generally,which language is used to contruct World Wide Web pages  ", 

choice1: "URL", 

choice2: "IRC", 

choice3: "NIH", 

choice4: "HTML", 

answer: 4


},
{question: "USB Port stands for",
choice1: "United Serial Bus Port", 

choice2: "Universal Serial Bus Port", 

choice3: "Universal Sequential Bus Port", 

choice4: "Universal Serial BIOS Port", 

answer: 2
},
{question: "The -------------- protect system from hackers ",
choice1: "Antivirus", 

choice2: "Backup", 

choice3: "Hard Disk", 

choice4: "Firewall", 

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