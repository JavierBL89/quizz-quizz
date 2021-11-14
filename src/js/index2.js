const welcomeWraper = document.getElementById("welcome-wraper");
const playerInput = document.getElementById("player-name-input");
const gameWraper = document.getElementById("game-wraper");
var score = document.getElementById("score");
var correctAnswers = document.getElementById("correct");
const subjectsWraper = document.getElementById("subjects-wraper");
const modalSubjectsPanel = document.getElementById("modal-subjects-panel");
const currentSubjectGame = document.getElementById("subject");
const gameCountDown = document.getElementById("countDown");
const levelStatus = document.getElementById("level-status");
const levelStatusMobile = document.getElementById("level-status-mobile");
const comodin1 = document.getElementById("comodin1");
const comodin2 = document.getElementById("comodin2");
const comodin3 = document.getElementById("comodin3");
const comodin4 = document.getElementById("comodin4");
const gameOverStatus= document.getElementById("game-over-status");

let alLevel2 = false;
const finalPlayerScore = document.getElementById("final-player-score");
const finalTopPlayers = document.getElementById("top-players-container");
const endOfGamePanel = document.getElementById("end-of-game");
const reStartButton = document.getElementById("button-restart-container");

document.addEventListener("DOMContentLoaded", function() {

  /** ADDING EVENTLISTENER TO ALL BUTTONS BASED ON ATTRIBUTTES
   AND GET HOLD OF INNERHTML OF USERS ANSWERS */
  // runGameGeneral();
  const buttons = document.getElementsByTagName("button");

  for (let button of buttons) {
    button.addEventListener("click", function() {

      if (this.getAttribute("class") === "modal-subject-1") {
        modalSubjectsPanel.style.display = "none";
        comodin2.style.display = "none";
        status.innerText;

        if (status === "1") {
          runGeneralLevel1();
        } else {
          runGeneralLevel2();
        }
      } else if (this.getAttribute("class") === "modal-subject-2") {
        comodin2.style.display = "none";
        status.innerText;
        if (status === "1") {
          runHistoryLevel1();
        } else {
          runHistoryLevel2();
        }
        modalSubjectsPanel.style.display = "none";

      } else if (this.getAttribute("class") === "modal-subject-3") {
        alert("puta");
        comodin2.style.display = "none";
        modalSubjectsPanel.style.display = "none";

      } else if (this.getAttribute("class") === "modal-subject-4") {
        alert("puta");
        comodin2.style.display = "none";
        modalSubjectsPanel.style.display = "none";

      } else if (this.getAttribute("id") === "answer1") {
        console.log(this.innerText);

        checkAnswer(this);
      } else if (this.getAttribute("id") === "answer2") {
        console.log(this.innerText);

        checkAnswer(this);
      } else if (this.getAttribute("id") === "answer3") {
        console.log(this.innerText);

        checkAnswer(this);
      } else if (this.getAttribute("id") === "comodin1") {
        setNextQuestion();
      } else if (this.getAttribute("id") === "comodin2") {
        clearInterval(timeInterval);
        modalSubjectsPanel.style.display = "block";
        // modalSubjectsPanel.classList.add("slideIn");
      } else if (this.getAttribute("id") === "comodin3") {
        clearInterval(timeInterval);
        timeExtra();
        this.style.display = "none";
        // incrementTime();
      } else if (this.getAttribute("id") === "restart-game") {
        reStartGame();
      } else {
        // alert("Unkown atribute");
        // throw `Unkown atribute}`;
      }
    });
  }
  playerInput.focus();

});






/** GETTTING HOLD OF PLAYER NAME AND PASSING IN
THE BUTTON ELEMENT SELECTED TO START THE GAME
WITH THE SUBJECT CHOOSEN **/



function handleSumit(subject) {
  //without this event.prevent the whole function does not work
  event.preventDefault();

  // Form validator
  if(playerInput.value == ""){
playerInput.setAttribute("placeholder", "Please enter player name!");
playerInput.focus();
  }else{
  subject.classList.add("button-vanishes");
  document.getElementById("current-player-name").innerText = playerInput.value;
  startCountDown(subject);
  }

}


/** HERE I GET THE BUTTON CLICKED VALUE TO RUN THE GAME
WITH THE SUBJECT CHOOSEN AFTER 3s COUNTDOWN! */
let startGameInterval;
let startGameCountDown = 4;

function startCountDown(subject) {
  /*getting hold of the elements into the current parent subject
  and its children in order to pass them as a parameters in order to
  use them dinamically later*/
  let subjectParent = subject.parentNode;
  let firstChildParentClass = subjectParent.children[0];
  let lastChildParentInner = subjectParent.children[1].innerText;

  // get hold of the nextSibling subject and set initial interval
  let nextSubjectSibling = subject.nextElementSibling;
  startGameCountDown = 4;
 //clears any previuos interval iniciated
  clearInterval(startGameInterval);

  startGameInterval = setInterval(() => {
    startGameCountDown--;
    let countDown = subjectParent.innerText = startGameCountDown;
    /*creat new elements to fill the parent subject html
    with the countdown to start game after clicking on the subject button*/
    let parentSubjectInnerHtml = `<spang id="start-countdown">${countDown}</spang>
     <h2 id="start-subject">${nextSubjectSibling.innerText}</h2`;
    subjectParent.innerHTML = parentSubjectInnerHtml;
    // When the count gets to 0 we want...
    if(subjectParent.children[0].innerText == 0 && subject.value === "GENERAL") {
      welcomeWraper.style.display = "none";
      gameWraper.style.display = "block";
      /*pass in the the variables declared earlier getting hold
      of the first elements into the parent subject*/
      resetSubjectButton(subjectParent, firstChildParentClass, lastChildParentInner);
      clearInterval(startGameInterval);
      runGeneralLevel1();
    } else if (subjectParent.children[0].innerText == 0 && subject.value === "HISTORY") {
      // console.log(currentPlayerScore);
      subjectParent.innerHTML = "";
      welcomeWraper.style.display = "none";
      gameWraper.style.display = "block";
      resetSubjectButton(subjectParent, firstChildParentClass, lastChildParentInner);
      clearInterval(startGameInterval)
      runHistoryLevel1();
    }else if (subjectParent.children[0].innerText == 0 && subject.value === "FOOTBALL") {
      // console.log(currentPlayerScore);
      subjectParent.innerHTML = "";
      welcomeWraper.style.display = "none";
      gameWraper.style.display = "block";
      resetSubjectButton(subjectParent, firstChildParentClass, lastChildParentInner);
      clearInterval(startGameInterval)
      runFootballLevel1();
    }
  }, 1000);

}

// reset HTML of the subject button selected to start
function resetSubjectButton(subjectParent, firstChildParentClass, lastChildParentInner){

  /*get hold of the initial children of the parent subject*/
  firstChildParentClass.classList.remove("button-vanishes");
  let newChildClass = firstChildParentClass.getAttribute("class");
  let newChildValue = firstChildParentClass.getAttribute("value");
  /*Resets the parent subject html to a new subject bottom
  once the count gets to 0 */
  let parentSubjectInnerHtml = `<button type="submit" class="${newChildClass}  button-shows" name ="subject-1" value="${newChildValue}" onclick="handleSumit(this)"></button>
  <h2>${lastChildParentInner}`;
  subjectParent.innerHTML = parentSubjectInnerHtml;
}


/************************ RUN GAME SUBJECTS QUESTIONS *******************/



//****** RUNNING GENERAL KNOWLEDE QUESTIONS LEVEL 1 AND 2*******

function runGeneralLevel1() {
  document.getElementById("subject").innerText = "General Knowledge";
  shuffleQuestions = generalLevel1.sort(() => Math.random() - .5)
  setNextQuestion();
}

function runGeneralLevel2() {
  atLevel2 = true;
  currentQuestionIndex = 0

  document.getElementById("subject").innerText = "General Knowledge";
  shuffleQuestions = generalLevel2.sort(() => Math.random() - .5)
  setNextQuestion();
}


/**** RUN HISTORY QUESTIONS LEVEL 1 AND 2 *********/

function runHistoryLevel1() {

  document.getElementById("subject").innerText = "History";
  shuffleQuestions = historyLevel1.sort(() => Math.random() - .5)
  setNextQuestion();
}

function runHistoryLevel2() {

  document.getElementById("subject").innerText = "General Knowledge";
  shuffleQuestions = historyLevel2.sort(() => Math.random() - .5)
  setNextQuestion();
}


//****** RUNNING GENERAL KNOWLEDE QUESTIONS LEVEL 1 AND 2*******

function runFootballLevel1() {
  document.getElementById("subject").innerText = "Football";
  shuffleQuestions = footballLevel1.sort(() => Math.random() - .5)
  setNextQuestion();
}

function runFootballLevel2() {
  atLevel2 = true;
  currentQuestionIndex = 0

  document.getElementById("subject").innerText = "Football";
  shuffleQuestions = footballLevel2.sort(() => Math.random() - .5)
  setNextQuestion();
}


/************************* GETTING NEXT QUESTION  ***********************/

//CREATE UNDEFINED VALUES FOR SHUFFLING QUESTIONS
let shuffleQuestions, currentQuestion
let currentQuestionIndex = 0;
let timeInterval;
let countDown = 10;

function setNextQuestion() {
  currentQuestionIndex++
  showQuestions(shuffleQuestions[currentQuestionIndex]);
}

function showQuestions(question) {
// Populate data to users side from subjects questions arrays
  document.getElementById("question").textContent = question.question;
  document.getElementById("answer1").textContent = question.answer1;
  document.getElementById("answer2").textContent = question.answer2;
  document.getElementById("answer3").textContent = question.answer3;

//clears the extra time interval if it exists
  clearInterval(extraTimeInterval);

  /* reset the timer to 10 for every print and
  clear any interval set, so the timer
  does not increment speed in every print */
  countDown = 10;
  clearInterval(timeInterval);
  document.getElementById("countDown").textContent = countDown;

  //set countdown interval for every new question
  timeInterval = setInterval(() => {
    countDown--;
    document.getElementById("countDown").textContent = countDown;
    if (document.getElementById("countDown").textContent == 0) {
      // console.log(currentPlayerScore);
      gameOverStatus.textContent = "Time up!";

      clearInterval(timeInterval);
      endOfGame();
      // showFinalPlayerScore();
      // showTopPlayersScore();
    }
  }, 1000);

}


/***** CHECK PLAYER ANSWER AGAINST CURRENT QUESTION CORRECT ANSWER
DEFINED IN THE CONSTRUCTOR FUNCTION ****/
function checkAnswer(userAnswer) {

  // stops the countdown when user clicks an answer
  clearInterval(timeInterval);


  let currentQuestion = shuffleQuestions[currentQuestionIndex];
  const parentP = userAnswer.parentNode;
  if (userAnswer.innerText === currentQuestion.correct) {
    console.log("correct");
    parentP.classList.add("right-answer");
    setTimeout(function() {
      setNextQuestion()
    }, 1000);
    incrementScore();
    incrementCorrectAnswers()
  } else{
    parentP.classList.add("wrong-answer");
      incrementIncorrectAnswers();
  }


  setTimeout(function() {
    parentP.classList.remove("right-answer")
    parentP.classList.remove("wrong-answer")
  }, 1000);


}

/*******************  HERE ALL THE CHANGEABLE INNER TEXTS ON THE FLOW *****************///

/**** sets subject question heading according to the subject selected
in order to use later to call next level questions ****/

function heading(headingText) {
  document.getElementById("subject").innerText = headingText;
}


/********* MANIPULATING SCORES PANEL **********/
function incrementScore() {
  let initialScore = parseInt(score.innerText);
  var currentScore = score.innerText = initialScore + 300;

}

function incrementCorrectAnswers() {
  let initialNumber = parseInt(correctAnswers.innerText);
  var correctAnswersTrack = correctAnswers.innerText = ++initialNumber;
let currentGame = document.getElementById("game-container").innerHTML;

  if (correctAnswersTrack >= "5") {

    levelStatus.innerText = "2";
    levelStatus.classList.add("status-color");
    levelStatusMobile.innerText = "2";
    levelStatusMobile.classList.add("status-color");
    /*** use dinamic subject question heading to run
    next level questions afert 1s *** */
    setInterval(()=>{
       if(currentSubjectGame === "General Knowledge"){

         runGeneralLevel2();
       }else if(currentSubjectGame === "History"){
         runHistoryLevel2();
       }else if(currentSubjectGame === "Football"){
         runFootballLevel2();
       }
    },1000)
  } else if (correctAnswersTrack >= "10") {
    alert("puta")
  }
}

function incrementIncorrectAnswers() {
  let initialNumber = parseInt(document.getElementById("incorrect").innerText);
  let incorrectAnswersTrack = document.getElementById("incorrect").innerText = ++initialNumber;

  if(incorrectAnswersTrack >= 1){
    setTimeout(() =>{
      gameOverStatus.innerText = "Incorrect answer";
      endOfGame();
  }, 1000)
}else if(gameCountDown.textContent === "0"){

    gameOverStatus.innerText = "Time Up";
  }



}

// ********  BUY EXTRA TIME FUNCTION **********

let extraTimeInterval
let newCountDown

function timeExtra(){
// clears the game interval countDown interval  from line 273
  clearInterval(timeInterval);

  newCountDown = countDown+20;
  console.log(newCountDown);

  extraTimeInterval = setInterval (() =>{
    newCountDown--;
    gameCountDown.textContent = newCountDown;
    if(document.getElementById("countDown").textContent == 0){
      gameOverStatus.textContent = "Time up!";
      clearInterval(extraTimeInterval);
      endOfGame();
    }
  },1000)
}





/***************************** END OF THE GAME SECTION **************************/

// Function to get rid of the game panel
function endOfGame() {
  welcomeWraper.style.display = "none";
  gameWraper.style.display = "none";


  endOfGamePanel.style.display = "block";
  reStartButton.style.display = "block";
  showFinalPlayerScore();
  showTopPlayersScore();

}


// Creating the final panel html with the last player scores
finalPlayerScoreInner = `
  <table style="width:100%" class="table-1">
<tr>
<th>Player</th>
<th>Score</th>
<th>Correct answers</th>
</tr>
`;

/** Arrays of the current player scores
    and the best 3 players scores */
const currentPlayerScoreArray = [];
  const topPlayersArray = [];

// const topPlayersArray = JSON.parse(localStorage.getItem("topPlayersArray")) || [];
// Function to populate the current player score table
function showFinalPlayerScore() {

  let currentGamer = document.getElementById("current-player-name").textContent;
  let currentScore = document.getElementById("score").textContent;
  let correct = document.getElementById("correct").textContent;

  const currentPlayerScore = {
    name: currentGamer,
    score: currentScore,
    correctAnswers: correct
  };
  // console.log(currentPlayerScore);
  currentPlayerScoreArray.push(currentPlayerScore);
 topPlayersArray.push(currentPlayerScore);
 console.log(topPlayersArray);

  /* Loping throught the current player score
    and creating a dinamic html table */
  currentPlayerScoreArray.forEach(function(player) {

    let playerRow = `<tr class="tr">
    <td>${player.name}</td>
    <td>${player.score}</td>
    <td>${player.correctAnswers}</td>
    </tr>`;

    finalPlayerScoreInner += playerRow += `</table>`;
  })

  return finalPlayerScore.innerHTML = finalPlayerScoreInner;
}



// Creating the top players html table
topPlayersTableInner = `<table style="width:100%">
<tr>
<th>Player</th>
<th>Score</th>
<th>Correct answers</th>
</tr>`;

// Function to populate the top player table
function showTopPlayersScore() {
  console.log(topPlayersArray);
// console.log(topPlayersArray[0]["name"]);
    // topPlayersArray.forEach( function(topPlayer){
    //   let topPlayersRow = `
    //   <tr>
    //   <td>${topPlayer.name}</td>
    //   <td>${topPlayer.score}</td>
    //   <td>${topPlayer.correctAnswers}</td>
    //   </tr>`;
    //
    //   topPlayersTableInner += topPlayersRow;
    // })

    for(let topPlayer of topPlayersArray){
        let topPlayersRow = `
        <tr>
        <td>${topPlayer.name}</td>
        <td>${topPlayer.score}</td>
        <td>${topPlayer.correctAnswers}</td>
        </tr>`;

        topPlayersTableInner += topPlayersRow;
    }

  return finalTopPlayers.innerHTML = topPlayersTableInner += `</table>`;
}





function reStartGame() {
// currentPlayerScoreArray.splice(0,currentPlayerScoreArray.length);
  endOfGamePanel.style.display = "none";
  reStartButton.style.display = "none";
  levelStatus.innerText = "1";
  levelStatus.classList.add("status-color");
  levelStatusMobile.innerText = "1";
currentQuestionIndex = 0;
  comodin1.style.display = "block";
  comodin2.style.display = "block";
  comodin3.style.display = "block";
  welcomeWraper.style.display = "grid";
  score.innerText = "0";
  correctAnswers.innerText = "0";
}

/* CONSTRUCTOR FUNCTION FOR QUESTIONS
   AND QUESTIONS ARRAYS FOR GENERAL KNOWLEGE*/
var generalLevel1 = [];
var generalLevel2 = [];

function Question(question, answer1, answer2, answer3, correct) {
  this.question = question;
  this.answer1 = answer1,
    this.answer2 = answer2,
    this.answer3 = answer3,
    this.correct = correct
}
// General questions level1
var g1q1 = new Question("What does a funambulist walk on?", "A tight rope", "A cable", "A thread", "A tight rope");
var g1q2 = new Question("Which restaurant's mascot is a clawn?", "Burguer King", "KFC", "McDonald", "McDonald");
var g1q3 = new Question("What item is the werewolf most afraid of?", "A rock", "Garlic", "Silver", "Silver");
var g1q4 = new Question("TRUE OR FALSE - An eggplant is a vegetable.", "True", "False", "    ", "False");
var g1q5 = new Question("Where did the pineapple plant originate?", "Spain", "South America", "Canary Islands", "South America");
var g1q6 = new Question("What is the nationality of Picasso", "Italian", "Portuguese", "Spanish", "Spanish");
var g1q7 = new Question("Which film involves people entering other people’s dreams?", "Jurasic Park", "Inception", "Harry Potter", "Inception");
var g1q8 = new Question("What do you call a cocktail consisting of coconut milk, rum, and pineapple?", "Mojito", "Long Island", "Piña Colada", "Piña Colada");
var g1q9 = new Question("What is James Bond’s preferred drink of choice?", "Cocktails", "Brandy", "Martini", "Martini");
var g1q10 = new Question("How many balls are on a pool table at the start of a game?", "12", "16", "20", "16");

// var p2 = new Person("Jhon", 24);
generalLevel1.push(g1q1, g1q2, g1q3, g1q4, g1q5, g1q6, g1q7, g1q8, g1q9, g1q10);


// General questions level2
var g2q1 = new Question("Area 51 is located in which US state?", "Nevada", "California", "Arkansas", "Nevada");
var g2q2 = new Question("Which American president appears on a one-dollar bill?", "Bill Clinton", "George Washington", "Abraham Lincon", "George Washington");
var g2q3 = new Question("What geometric shape is generally used for stop signs?", "A circle", "A octagon", "A square", "A octagon");
var g2q4 = new Question("What is the name of Poland in Polish?", "Polsky", "Poluska", "Polska", "Polska");
var g2q5 = new Question("What is Cynophobia the fear of?", "Dogs", "Cats", "Birds", "Dogs");
var g2q6 = new Question("Who is the author of Jurrasic Park?", "J.R Tolkin", "Maria Keyes", "Michel Crichton", "Michel Crichton");
var g2q7 = new Question("What type of nuts are a Hawaiian staple?", "Cashews", "Hawaiian nuts", "Macadamia nuts", "Macadamia nuts");
var g2q8 = new Question("In the state of Georgia, it’s illegal to eat what with a fork?", "Fried chicken", "Burguers", "Chips", "Fried chicken");
var g2q9 = new Question("What was Marilyn Monroe’s natural hair color?", "Blonde", "Red", "Brown", "Red");
var g2q10 = new Question("Who directed Terminator 2: Judgment Day?", "Martin Scorsese", "Quentin Tarantino", "James Cameron", "James Cameron");
generalLevel2.push(g2q1, g2q2, g2q3, g2q4, g2q5, g2q6, g2q7, g2q8, g2q9, g2q10);


/****** HISTORY QUESTIONS ******/
const historyLevel1 = [];
const historyLevel2 = [];

// History questions level1
var h1q1 = new Question("Where did the Olympic Games originate?", "Barcelona", "Greece", "China", "Greece");
var h1q2 = new Question("Who invented the telephone?", "Amstrong", "Thomas Edison", "Alexander Graham Bell", "Alexander Graham Bell");
var h1q3 = new Question("Who was the first American President?.", "George Washington", "Abraham Lincon", "George Bush", "George Washington");
var h1q4 = new Question("Which country first used paper money?", "China", "USA", "Russia", "China");
var h1q5 = new Question("Which country gifted the Statue of Liberty to the USA?", "Germany", "England", "France", "France");
var h1q6 = new Question("In which town was Jesus born?", "Bethlehem", "Kiryat Atat", "Jerusalem", "Bethlehem");
var h1q7 = new Question("What building is on the back of the $20 bill?", "Pizza Tower", "Prado Museum", "White House", "White House");
var h1q8 = new Question("How long did it take for Titanic to sink?", "2 hours 40 minutes", "1 hour 50 minutes", "4 hours 10 minutes", "2 hours 40 minutes");
var h1q9 = new Question("Who invented the light bulb?", "Amstrong", "Thomas Edison", "Alexander Graham Bell", "Thomas Edison");
var h1q10 = new Question("Who invented the first car?", "Henry Ford", "Carl (Karl) Friedrich Benz", "Enzo Ferrari", "Carl (Karl) Friedrich Benz");

historyLevel1.push(h1q1, h1q2, h1q3, h1q4, h1q5, h1q6, h1q7, h1q8, h1q9, h1q10);
// const correctAnswers = ["Greece", "Jimmy Hendrix", "Germany", "Denmark","1963","1945","A tight rope", "7","Tasmania","Space Shuttle Columbia","Ireland","4","McDonald", "The London Bridge","Charles Lindbergh","Silver", "China", "Alexander Graham Bell", "Carl (Karl) Friedrich Benz","Thomas Edison","2 hours 40 minutes","Bethlehem","White House","George Washington","False", "South America","Spanish", "Inception", "Piña Colada", "Martini", "16"];

// History questions level2
var h2q1 = new Question("In which year did Hitler commit suicide?", "1938", "1940", "1945", "1945");
var h2q2 = new Question("In which year was John F. Kennedy assassinated?", "1963", "1968", "1989", "1963");
var h2q3 = new Question("Greenland was a colony of which country until 1981?", "Norway", "Denmark", "Holland", "Denmark");
var h2q4 = new Question("In 1927, who became the first man to fly solo and non-stop across the Atlantic?", "John Stramagere", "Amstrong", "Charles Lindbergh", "Charles Lindbergh");
var h2q5 = new Question("Which bridge was the first to be built across the River Thames in London?", "Millennium Bridge", "Blackfriars Bridge", "The London Bridge", "The London Bridge");
var h2q6 = new Question("How many U.S. presidents have been assassinated?", "4", "2", "5", "4");
var h2q7 = new Question("In which country did the Easter Rising take place in 1916?", "Ireland", "England", "Holland", "Ireland");
var h2q8 = new Question("What was the name of the first Space Shuttle to go into space?", "Apollo", "Space Shuttle Columbia", "Endeavour", "Space Shuttle Columbia");
var h2q9 = new Question("What is the modern name for Van Diemen’s Land?", "Tanzania", "Tasmania", "Transavania", "Tasmania");
var h2q10 = new Question("The ancient city of Rome was built on how many hills?", "7", "5", "3", "7");
historyLevel2.push(h2q1, h2q2, h2q3, h2q4, h2q5, h2q6, h2q7, h2q8, h2q9, h2q10);



/****** HISTORY QUESTIONS ******/
const footballLevel1 = [];
const footballLevel2 = [];

// Football questions level1
var f1q1 = new Question("How many times have England won the World Cup?", "2", "1", "None", "None");
var f1q2 = new Question("What is the name of the player who guards the goal?", "Goalkeeper", "Shot stopper", "Center forward", "Goalkeeper");
var f1q3 = new Question("What happens if the ball goes out of play on the side of the pitch?.", "That's it-game over", "It's a throw in to the team who didn't knock it over the line", "Penalty shoot-out", "It's a throw in to the team who didn't knock it over the line");
var f1q4 = new Question("How many teams play in the Premier League?", "15", "18", "20", "20");
var f1q5 = new Question("What do you usually use to move the football?", "Foot", "Bum", "Stick", "Foot");
var f1q6 = new Question("What colour do Everton play in?", "Blue", "Red", "Green", "Blue");
var f1q7 = new Question("How many players are on the field for each team in an adult league if playing a full squad game?", "18", "20", "22", "22");
var f1q8 = new Question("If a player is sent off, what color card does the referee display?", "Orange", "Purple", "red", "Purple");
var f1q9 = new Question("To most places in the world, Soccer is known as what?", "Football", "Soccer", "European Footbal", "Football");
var f1q10 = new Question("The circumference of the ball should not be greater than what?", "70cm", "90cm", "100cm", "70cm");

footballLevel1.push(f1q1, f1q2, f1q3, f1q4, f1q5, f1q6, f1q7, f1q8, f1q9, f1q10);
// const correctAnswers = ["Greece", "Jimmy Hendrix", "Germany", "Denmark","1963","1945","A tight rope", "7","Tasmania","Space Shuttle Columbia","Ireland","4","McDonald", "The London Bridge","Charles Lindbergh","Silver", "China", "Alexander Graham Bell", "Carl (Karl) Friedrich Benz","Thomas Edison","2 hours 40 minutes","Bethlehem","White House","George Washington","False", "South America","Spanish", "Inception", "Piña Colada", "Martini", "16"];

// Footbal questions level2
var f2q1 = new Question("If an age group is U16, how old are most of the people on the team going to be?", "17", "16", "15", "15");
var f2q2 = new Question("What color jerseys did the United States have the Women's National team wear in 2007?", "Blue", "Silver", "Gold", "Gold");
var f2q3 = new Question("The goalie cannot pick the ball up outside of the what yard area?", "18", "16", "20", "18");
var f2q4 = new Question("How many blows of his whistle does the Referee give to signify the end of the game?", "1", "3", "2", "Charle", "3");
var f2q5 = new Question("What do soccer players not typically wear?", "Glooves", "Large shirts", "Helmets", "Helmets");
var f2q6 = new Question("Exactly how far away from the goal line is the penalty spot?", "10", "11", "12", "12");
var f2q7 = new Question("Which player scored the fastest hat-trick in the Premier League?", "C.Ronaldo", "Sadio Mane", "Rooney", "Sadio Mane");
var f2q8 = new Question("With 202 clean sheets, which goalkeeper has the best record in the Premier League?", "Petr Cech", "David De Gea", "Willy Caballero", "Petr Cech");
var f2q9 = new Question("In which World Cup did Diego Maradona score his infamous 'Hand of God' goal?", "Spain 1992", "Germany 1974", "Mexico 1986", "Mexico 1986");
var f2q10 = new Question("Who is the Champions League's top goalscorer of all time?", "C.Ronaldo", "Messi", "Raúl Gonzalez", "C.Ronaldo");
footballLevel2.push(f2q1, f2q2, f2q3, f2q4, f2q5, f2q6, f2q7, f2q8, f2q9, f2q10);
