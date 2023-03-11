// ten problems w/ 2 ints
// ints bw 0 & 9
// four possible answers (1 correct, 3 random)


let problems = [];
let currentScoreField = document.querySelector('span.currentScore');
let currentProblemField = document.querySelector('span.currentProblem');
const problemField = document.querySelector('div.expression.show-hide');
const answersFields = document.querySelectorAll('li');


function problemPopulator() {
  let problemArray = [];
  let int1 = getRandomNumber(10); // random bw 0-9
  let int2 = getRandomNumber(10); // random bw 0-9
  let answer = int1 * int2; // correct answer
  let problemString = int1 + " X " + int2; // "5 X 9"
  //change innertext of problem?
  problemArray.push(int1);
  problemArray.push(int2);
  problemArray.push(answer);
  problemArray.push(problemString);
  // [int1, int2, answer] -- 
  return problemArray;
}

// use problem generator to populate instead
function init() {
  let arrayOfProblemArrays = [];
  for (let i = 0; i < 10; i++) {
    let problemArray = problemPopulator();
    // push values to problems[]
    let answerPool = populateAnswers(problemArray[i, 2])
    let problem = { equation: problemArray[0] + ' X ' + problemArray[1], answer: problemArray[2], isCorrect: false, answers: answerPool };
    problems.push(problem);
  }
}

function populateAnswers(answer) {
  let answers = [];
  answers.push(answer); // puts the real answer in the array
  while (answers.length < 4) { // populates rest of the array
    let wrongAnswer = getRandomNumber(82); // random number between 0*0 and 9*9
    if (!answers.includes(wrongAnswer)) { // checks if numbers already in there
      answers.push(wrongAnswer); // adds it if not
    } continue; // loops again if it was
  }
  shuffleArray(answers);
  // so now we have four shuffled answers -- and need to populate li with those
  return answers;
}

function getRandomNumber(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function shuffleArray(arr) {
  return arr.sort(function (a, b) { return Math.random() - 0.5 })
}

//DOM LOADED
document.addEventListener('DOMContentLoaded', () => {
  init(); // populates all necessary problem elements

  // will need a start over function here that just hits run() again.

  let counter = 0; // so the counter's increasing but it's not working to update problem fields. but it is changing the problem.
  // if (counter < 11) {

  let problem = problems[counter];
  let currentScoreField = document.querySelector('span.currentScore');
  let currentProblemField = document.querySelector('span.currentProblem');
  const problemField = document.querySelector('div.expression.show-hide');
  const answersFields = document.querySelectorAll('li');
  console.log(problem);
  console.log(problem.equation);
  //change text to said problem's equation
  problemField.innerText = problem.equation;
  let currentProblem = parseInt(currentProblemField.innerText, 10);
  let currentScore = parseInt(currentScoreField.innerText, 10);
  // console.log(answer.innerText);
  // console.log(currentScoreField.innerText);
  // console.log(currentScore);

  //for each answer button, change to problem.answers(0-3);
  for (let i = 0; i < 4; i++) {
    answersFields[i].innerText = problem.answers[i];
  }

  answersFields.forEach((answer) => { // maybe need to break out this func
    answer.addEventListener('click', () => {
      if (answer.innerText == problem.answer) {
        // could've changed isCorrect.
        if (counter < 9) {
          counter++;
          advanceProblem();
          updateFields();
          console.log(counter);
          console.log(problems[counter]);
        } else {
          currentScore += 10;
          currentScoreField.innerText = currentScore.toString();
          problemField.innerText = "You finished - hit START OVER to go again!";
        }
      } else {
        alert("That's not the correct answer. Try again.");
      }
    })
  })

  function advanceProblem() {
    let currentScoreField = document.querySelector('span.currentScore');
    let currentProblemField = document.querySelector('span.currentProblem');
    let currentProblem = parseInt(currentProblemField.innerText, 10);
    let currentScore = parseInt(currentScoreField.innerText, 10);
    currentScore += 10;
    currentProblem += 1;
    problem = problems[counter];
    currentScoreField.innerText = currentScore.toString();
    currentProblemField.innerText = currentProblem.toString();
    // console.log(problem); // maybe this all needs to be a separate function
  }

  function updateFields() {
    let problem = problems[counter];
    const problemField = document.querySelector('div.expression.show-hide');
    const answersFields = document.querySelectorAll('li');
    problemField.innerText = problem.equation; // populating the equation field
    for (let i = 0; i < 4; i++) { // populating the answers list fields.
      answersFields[i].innerText = problem.answers[i];
    }
  }

  //start over
  const startOverButton = document.getElementById('btnStartOver');
  startOverButton.addEventListener('click', () => {
    console.log('you hit start over')
    document.location.reload();
  })

  
  //home
  const homeButton = document.getElementById('btnHome');
  homeButton.addEventListener('click', () => {
    console.log('you hit home')
    window.location = "index.html";
  })

})

