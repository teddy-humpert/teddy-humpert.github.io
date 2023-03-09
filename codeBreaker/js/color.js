
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
  // const startOverButton = document.getElementById('btnStartOver');
  // startOverButton.addEventListener('click', () => {
  //   console.log('you hit start over')
  //   document.location.reload();
  // })

  //home
  // const homeButton = document.getElementById('btnHome');
  // homeButton.addEventListener('click', () => {
  //   console.log('you hit home')
  //   window.location = "index.html";
  // })

  const lockButton = document.getElementById('codeButton');
  lockButton.addEventListener('click', () => {
    console.log(isChanged() + 'this is the changed test');
    if (isChanged()) {
      console.log('you clicked the code button')
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
    } else {
      alert('make sure to change all nodes');
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

  function isChanged() {
    let checkedUl = document.querySelector('ul.line-' + counter);
    let testLine = Array.from(checkedUl.children);
    // let checkArray = checkedUl.children;
    testLine.pop();
    console.log(testLine);
    let boolArray = [];
    for (let i = 0; i < testLine.length; i++) {
      if (testLine[i].classList.contains('unchanged')) {
        boolArray.push(false);
      } else {
        boolArray.push(true);
      }
    }
    if (boolArray.includes(false)) {
      return false;
    } return true;
  }

  // issue right now
  // with 1,3,2,1 == a guess of 1,1,1,1 is returnining 2 right, 1 near, 1 wrong
  // should be 2 right, 2 wrong.
  // map conditionals issue - needs troubleshooting
  // pulling from my command line version at this point, will see how this goes.
  //codeblock mapping correctly
  //buildingMap mapping correctly - have a feeling it's because i'm doing double duty with for loop.


  function checkGuessVsCode(fixedArray, codeBlock) {
    let rightCount = 0;
    let wrongCount = 0;
    let nearCount = 0;
    let guessResultArray = [];
    let nearString = "";
    let codeBlockMap = createMap(codeBlock);
    let buildingMap = new Map(); // need a 'wordMap' function here...
    console.log(codeBlockMap);

    for (let i = 0; i < 4; i++) {

      let guessNum = fixedArray[i];

      if (!buildingMap.has(guessNum)) {
        buildingMap.set(guessNum, 1); // if it's not in the bldgmap, put it in at val.1
      } else {
        buildingMap.set(guessNum, buildingMap.get(guessNum) + 1);
      } // line 140 in java version
      console.log('this is the map.get.guessnum' + buildingMap.get(guessNum));
    }
    console.log(buildingMap);


    // ok so this is out of control
    // need to first check if any art exact matches
    // remove from map
    // then check if any are near, and if not then pure wrong.
    let checkedCounter = 0;
    for (let j = 0; j < codeBlock.length; j++) {
      let guessNum = fixedArray[j];
      if (fixedArray[j] == codeBlock[j]) { // if they're an exact match. add to count & decrease map
        console.log(codeBlockMap);
        rightCount++;
        checkedCounter++;
        console.log(checkedCounter);
        codeBlockMap.set(guessNum, codeBlockMap.get(guessNum) - 1);
        console.log(buildingMap);
        console.log(codeBlockMap);
      }
    }

    // now check remaining
    // issue is map is potentially all 0s - so i can check if there's a near remaining, but i have no way to tell if it's 0'd out.

    for (let j = 0; j < codeBlock.length; j++) {
      let guessNum = fixedArray[j];
      if ((fixedArray[j] != codeBlock[j]) && !(codeBlockMap.get(guessNum) > 0)) { // how to make this exclusive against above condition....farts
        wrongCount++;
        checkedCounter++;
        console.log(checkedCounter);
      }
      if ((fixedArray[j] != codeBlock[j]) && (codeBlockMap.get(guessNum) > 0)) {
        console.log(codeBlockMap);
        nearCount++;
        checkedCounter++;
        console.log(checkedCounter);
        codeBlockMap.set(guessNum, codeBlockMap.get(guessNum) - 1);
        console.log(buildingMap);
        console.log(codeBlockMap);
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
    for (let i = 0; i < guessResultArray.length; i++) {
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
    output.set(0, 0);
    output.set(1, 0);
    output.set(2, 0);
    output.set(3, 0);
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





