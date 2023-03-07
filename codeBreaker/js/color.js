
//create the code
// length 4 array of random combo of 4 variables.
// 0 = blue , 1 = green, 2 = red, 3 = white
function generateCode() {
  let codeArray = [];
  for (let i = 0; i < 4; i++) {
    codeArray.push(getRandomNumber(4));
  }
  return codeArray;
}


function shuffleArray(arr) {
  return arr.sort(function (a, b) { return Math.random() - 0.5 })
}

function getRandomNumber(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//DOM LOADED
document.addEventListener('DOMContentLoaded', () => {
  // init(); // 

  // will need a start over function here that just hits run() again.
  let codeBoxes = document.querySelectorAll('li');
  let counter = 1;
  addUnchanged();
  addCodeBoxListener();
  const codeBlock = generateCode();
  console.log(codeBlock);

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

  const lockButton = document.getElementById('codeButton');
  lockButton.addEventListener('click', () => {
    let fixedArray = fixArray();
    let isCorrect = checkAnswer(fixedArray, codeBlock);
    console.log(codeBlock);
    let guessResult = checkGuessVsCode(fixedArray, codeBlock);
    displayGuessResult(guessResult, counter);
    console.log(guessResult);
    console.log(isCorrect);
    if (!isCorrect) {
      counter++;
      codeBoxes = document.querySelectorAll('li');
      console.log('you clicked the lock button')
      codeBoxes.forEach((codeBox) => {
        codeBox.classList.add('locked');
      });
      const codeBoxesSection = document.getElementById('codeBoxes');
      console.log(codeBoxesSection);
      const ul = document.createElement('ul');
      ul.classList.add('line-' + counter);
      console.log(ul.classList);
      const li1 = document.createElement('li');
      const li2 = document.createElement('li');
      const li3 = document.createElement('li');
      const li4 = document.createElement('li');
      codeBoxesSection.appendChild(ul);
      ul.appendChild(li1);
      ul.appendChild(li2);
      ul.appendChild(li3);
      ul.appendChild(li4);
      ul.appendChild(lockButton);
      codeBoxes = document.querySelectorAll('li');
      addUnchanged();
      addCodeBoxListener();
    } else {
      alert('you got it!');
    }

  })

  function addUnchanged() {
    codeBoxes.forEach((codeBox) => {
      if (!codeBox.classList.contains('locked')) {
        console.log('unchanged added to elements');
        codeBox.classList.add('unchanged');
      }
    });
  }

  function addCodeBoxListener() {
    codeBoxes = document.querySelectorAll('li');
    codeBoxes.forEach((codeBox) => { // maybe need to break out this func
      codeBox.addEventListener('click', () => {
        console.log(codeBox.classList);
        console.log(codeBox.classList.contains('blue'));
        if (!codeBox.classList.contains('locked')) {
          if (codeBox.classList.contains('white')) {
            console.log("you clicked a white")
            codeBox.classList.remove('white');
            codeBox.classList.add('unchanged');
            console.log(codeBox.classList);
          }
          if (codeBox.classList.contains('red')) {
            console.log("you clicked a red")
            codeBox.classList.remove('red');
            codeBox.classList.add('white');
            console.log(codeBox.classList);
          }
          if (codeBox.classList.contains('green')) {
            console.log("you clicked a green")
            codeBox.classList.remove('green')
            codeBox.classList.add('red');
            console.log(codeBox.classList);
          }
          if (codeBox.classList.contains('blue')) {
            console.log("you clicked a blue")
            codeBox.classList.remove('blue');
            codeBox.classList.add('green');
            console.log(codeBox.classList);
          }
          if (codeBox.classList.contains('unchanged')) {
            console.log("you clicked an unchanged")
            codeBox.classList.remove('unchanged');
            codeBox.classList.add('blue');
            console.log(codeBox.classList);
          }
        } else {
          alert("that element is locked now");
        }
      })
    })
  }

  function checkAnswer(fixedArray, codeBlock) {
    //ul.line-counter
    // so this will be something like [2,3,1,0]
    // need to take ulchildren and create an array. 
    // they come in like li.red, li.green, li.blue, li.white
    // for (let i = 0; i < 4; i++) {
    //   console.log(checkArray[i]);
    //   console.log(codeBlock[i]);
    //   let guess = checkArray[i];
    //   console.log(guess);
    //   if (guess.classList.contains('blue')) {
    //     fixedArray.push(0);
    //   } if (guess.classList.contains('green')) {
    //     fixedArray.push(1);
    //   } if (guess.classList.contains('red')) {
    //     fixedArray.push(2);
    //   } if (guess.classList.contains('white')) {
    //     fixedArray.push(3);
    //   }
    // }
    // checkArray.forEach((guess) => {
    //   if (guess.classList.contains('blue')) {
    //     fixedArray.push(0);
    //   } if (guess.classList.contains('green')) {
    //     fixedArray.push(1);
    //   } if (guess.classList.contains('red')) {
    //     fixedArray.push(2);
    //   } if (guess.classList.contains('white')) {
    //     fixedArray.push(3);
    //   } 
    // });
    console.log(fixedArray);
    console.log(codeBlock);
    return arraysEqual(fixedArray, codeBlock);
  }

  function fixArray() {
    let checkedUl = document.querySelector('ul.line-' + counter);
    let checkArray = Array.from(checkedUl.children);
    // let checkArray = checkedUl.children;
    let fixedArray = [];
    checkArray.pop();
    console.log(checkArray);
    for (let i = 0; i < 4; i++) {
      console.log(checkArray[i]);
      console.log(codeBlock[i]);
      let guess = checkArray[i];
      console.log(guess);
      if (guess.classList.contains('blue')) {
        fixedArray.push(0);
      } if (guess.classList.contains('green')) {
        fixedArray.push(1);
      } if (guess.classList.contains('red')) {
        fixedArray.push(2);
      } if (guess.classList.contains('white')) {
        fixedArray.push(3);
      }
    }
    return fixedArray;
  }



  // pulling from my command line version at this point, will see how this goes.
  function checkGuessVsCode(fixedArray, codeBlock) {
    let rightCount = 0;
    let wrongCount = 0;
    let nearCount = 0;
    let guessResultArray = [];
    let nearString = "";
    let codeBlockMap = createMap(codeBlock);
    let buildingMap = new Map(); // need a 'wordMap' function here...

    for (let i = 0; i < codeBlock.length; i++) {

      let guessNum = fixedArray[i];

      if (!buildingMap.has(guessNum)) {
        buildingMap.set(guessNum, 1);
      } else {
        buildingMap.set(guessNum, buildingMap.get(guessNum) + 1);
      } // line 140 in java version

      if (fixedArray[i] == codeBlock[i]) {
        rightCount++;
      } // line 145 in java version

      //continue from line 152 in original
      if (fixedArray[i] != codeBlock[i] &&
        (new String(codeBlock).indexOf(fixedArray[i]) > -1)) {

        if (buildingMap.get(guessNum) <= codeBlockMap.get(guessNum)) {
          nearCount++;
        } else {
          wrongCount++;
        }

      }

      if (fixedArray[i] != codeBlock[i] &&
        (new String(codeBlock).indexOf(fixedArray[i]) < 0)) {
        wrongCount++;
      }
    }
    guessResultArray.push(rightCount + ' in the exact right place');
    guessResultArray.push(nearCount + ' right color but wrong place');
    guessResultArray.push(wrongCount + ' just plain wrong');
    return guessResultArray;
  }

  function displayGuessResult(guessResultArray, counter) {
    const codeBoxesSection = document.getElementById('codeBoxes');
    const p = document.createElement('p');
    p.classList.add('guessResult');
    let str = "";
    for (let i = 0; i < guessResultArray.length ; i++) {
      str += guessResultArray[i] 
      if (i < 2) {
        str += " / ";
      }
    }
    p.innerText = str;
    codeBoxesSection.appendChild(p);
  }

  function createMap(intArray) {
    let output = new Map();
    for (let i = 0; i < 4; i++) {
      // console.log(intArray[i]);
      let guess = intArray[i];
      // intArray.forEach((guess) => {
      if (!output.has(guess)) { // .has instead of .contains?
        output.set(guess, 1); // set instead of put
      } else {
        output.set(guess, output.get(guess) + 1);
      }
    }
    return output;
  }

  function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }


})





