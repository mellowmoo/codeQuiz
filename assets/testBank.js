// Variable with array and object for storing and referencing questions 
var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in Javascript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    },

];

// Declaring score and the index for questions, questionNum tracks what question the user is on
var score = 0;
var questionNum = 0;

// Declaring Variables that use querySelectors
var timeLeft = document.querySelector("#timeLeft");
var timer = document.querySelector("#startButton");
var questionArea = document.querySelector("#questionArea");
var box = document.querySelector("#box");

// Declaring Time Variables
var seconds = 76;
var hold = 0;
var penalty = 10;
var ulNew = document.createElement("ul");

// Triggering the Timer on button press
timer.addEventListener("click", function (){
    if (hold === 0) {
        hold =setInterval(function () {
            seconds--;
            timeLeft.textContent="Time Left: " + seconds;

            if (seconds <= 0) {
                clearInterval(hold);
                finisher();
                timeLeft.textContent = "Time's Up!";
            }
        }, 1000);
    }
    render(questionNum);
})

// Displaying the Question + choices to the page
function render(questionNum) {
    // reseting the page area so the last question is cleared
    questionArea.innerHTML = "";
    ulNew.innerHTML = "";

    for (i = 0; i < questions.length; i++) {
        var newQuestion = questions[questionNum].title;
        var newChoices = questions[questionNum].choices;
        questionArea.textContent = newQuestion;
    }
    newChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionArea.appendChild(ulNew);
        ulNew.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

// Comparing user Answers to the correct Answers
function compare(event) {
    var choice = event.target;

    if (choice.matches("li")) {

        var newDiv = document.createElement("div");
        newDiv.setAttribute("id","newDiv");
        // check if correct
        if(choice.textContent == questions[questionNum].answer) {
            score++;
            newDiv.textContent == "Correct, the answer is " + questions[questionNum].answer + "!" ;
        }
        // wrong answer condition
            else {
                seconds = seconds - penalty;
                newDiv.textContent = "That was Wrong.  The answer is " + questions[questionNum].answer + ".";
            }

    }

    questionNum++;

    if (questionNum >= questions.length) {
        finisher();
        newDiv.textContent = "Congrats, you finished! Your score was " + score + "out of" + questions.length + "correct!";
    } 
        else {
            render(questionNum);
        }
        questionArea.appendChild(newDiv);

}

// finisher function will append the page
function finisher() {
    questionArea.innerHTML = "";
    timeLeft.innerHTML = "";

    var newH1 = document.createElement("h1");
    newH1.setAttribute("id", "newH1");
    newH1.textContent = "Finished!";

    questionArea.appendChild(newH1);

    var newP = document.createElement("p");
    newP.setAttribute("id","newP");

    questionArea.appendChild(newP);

    // time and score tracker
    if (seconds >= 0) {
        var remainingTime = seconds;
        var newP2 = document.createElement("p");
        clearInterval(hold);
        newP.textContent = "Your score is" + remainingTime;

        questionArea.appendChild(newP2);
    }
    // create a Label
    var newLabel = document.createElement("label");
    newLabel.setAttribute("id", "newLabel");
    newLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(newLabel);

    // input
    var newInput = document.createElement("input");
    newInput.setAttribute("type", "text");
    newInput.setAttribute("id", "initials");
    newInput.textContent = "";

    questionsDiv.appendChild(newInput);

    // create a submit button
    var newSubmit = document.createElement("button");
    newSubmit.setAttribute("type", "submit");
    newSubmit.setAttribute("id", "Submit");
    newSubmit.textContent = "Submit";

    questionArea.appendChild(newSubmit);

    // using an event listener to record initials and store the initials and score in local storage
    newSubmit.addEventListener("click", function () {
        var initials = newInput.value;

        if (initials === null) {

            console.log("No initials entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: remainingTime
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // Travels to final page
            window.location.replace("./highscore.html");
        }
    });

}