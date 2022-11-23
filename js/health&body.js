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

question: "Which food does NOT contain Vitamin D?", 

choice1: "Mushrooms", 

choice2: "Tofu", 

choice3: "Caviar", 

choice4: "Kale", 

answer: 4 

}, 

 

{ 

question: "Like a fingerprint, every person has a unique ____________ print.", 

choice1: "Nose", 

choice2: "Tongue", 

choice3: "Elbow", 

choice4: "Toe", 

answer: 2

}, 

 

{ 

question: "What percentage of the human body is water?", 

choice1: "50%", 

choice2: "66%", 

choice3: "75%", 

choice4: "80%", 

answer: 2 

}, 

 

{ 

question: "The smallest bones in the human body are found in the...", 

choice1: "Feet", 

choice2: "Ears", 

choice3: "Fingers", 

choice4: "Knees", 

answer: 2 

},

{ 

question: "Calcium crystals are a normal part of what body region? ", 

choice1: "Gouty joints", 

choice2: "The ears", 

choice3: "The nasal cavity ", 

choice4: "The spine", 

answer: 2 

},
{
question: "What is the largest organ of the human body? ", 

choice1: "The brain", 

choice2: "The liver", 

choice3: "The spine", 

choice4: "The skin", 

answer: 4

},

{question: "Which food does NOT contain Vitamin C?  ", 

choice1: "Kiwi", 

choice2: "Tomates", 

choice3: "Peppers", 

choice4: "Walnuts", 

answer: 4

},
{question: "What connects your muscles to your bones", 

choice1: "Cartilage", 

choice2: "Ligaments", 

choice3: "Skin", 

choice4: "Tendons", 

answer: 4


},
{question: "How many teeth does an adult normally have?",
choice1: "16", 

choice2: "32", 

choice3: "24", 

choice4: "48", 

answer: 2
},
{question: "where in your body are new blood cells made ? ",
choice1: "The liver", 

choice2: "Bones", 

choice3: "The brain", 

choice4: "The heart", 

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