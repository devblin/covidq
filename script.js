let basicMode = document.getElementById("basic");
let timerNum = document.getElementById("timer");
let mainMenu = document.getElementById("menu");
let viewReason = document.getElementById("reason");
let ansClass = document.querySelectorAll(".ans");
let nextBtn = document.getElementById("next");
let prevBtn = document.getElementById("previous");
let quesText = document.getElementById("ques");
let reasonTxt = document.getElementById("reasontxt");
let scoreArea = document.getElementById("score");
let quizMain = document.getElementById("quizarea");
let gameExit = document.getElementById("exit");
let newGame = document.getElementById("newgame");
let showQues = document.getElementById("showques");
let trackClass;
var score = 0;
let quesTrack = document.getElementById("questrack");
let quesSize = ques.length;
let ansOrNot = [];
shuffle(ques);
for (var i = 0; i < quesSize; i++) {
  ansOrNot.push([-1, -1]);
}
quesTrack.style.display = "none";
quizMain.style.display = "none";
scoreArea.innerHTML = "";
viewReason.style.display = "none";
quizArea(0);
setNP();

function upDown(val1, val2) {
  showQues.classList.remove(val1);
  showQues.classList.add(val2);
}

showQues.onclick = function () {
  var check = quesTrack.style.display;
  if (check == "none") {
    quesTrack.style.display = "flex";
    upDown("fa-caret-square-down", "fa-caret-square-up");
  } else {
    quesTrack.style.display = "none";
    upDown("fa-caret-square-up", "fa-caret-square-down");
  }
};

newGame.onclick = function () {
  quesTrack.innerText = "";
  timerNum.innerText = "Timer: 10:00";
  track();
  exitORnew();
  newTimer = setInterval(timer, 1000);
  shuffle(ques);
};
gameExit.onclick = function () {
  quesTrack.innerText = "";
  timerNum.innerText = "Timer: 10:00";
  exitORnew();
  shuffle(ques);
  viewReason.style.display = "none";
  quizMain.style.display = "none";
  mainMenu.style.display = "flex";
};
var newTimer;
basicMode.onclick = function () {
  mainMenu.style.display = "none";
  quizMain.style.display = "block";
  newTimer = setInterval(timer, 1000);
  track();
};

var quesNo;
function setNP() {
  quesNo = quesText.getAttribute("data-ques");
  quesNo = parseInt(quesNo);
  nextBtn.setAttribute("data-next", quesNo + 1);
  prevBtn.setAttribute("data-prev", quesNo - 1);
  if (quesNo == 0) {
    prevBtn.style.visibility = "hidden";
  } else if (quesNo == quesSize - 1) {
    nextBtn.style.visibility = "hidden";
  } else {
    prevBtn.style.visibility = "visible";
    nextBtn.style.visibility = "visible";
  }
}

nextBtn.addEventListener("click", pageNav);
prevBtn.addEventListener("click", pageNav);

function pageNav(e) {
  var targ;
  if (e.target.getAttribute("id") == "next") {
    targ = e.target.getAttribute("data-next");
  } else {
    targ = e.target.getAttribute("data-prev");
  }
  quizArea(targ);
  checkAnsweredOrNot(targ);
  scoreDisplay();
  setNP();
}

function removeCWclass(i) {
  ansClass[i].classList.remove("correct");
  ansClass[i].classList.remove("wrong");
}

window.onclick = function () {
  scoreDisplay();
};

function quizArea(num) {
  viewReason.style.display = "none";
  quesText.setAttribute("data-ques", num);
  quesText.innerText = parseInt(num) + 1 + ". " + ques[num][0];
  quesText.setAttribute("data-cans", ques[num][2]);
  reasonTxt.innerText = ques[num][3];
  for (var i = 0; i < 4; i++) {
    ansClass[i].innerHTML = ques[num][1][i];
    ansClass[i].setAttribute("data-ans", i);
    removeCWclass(i);
  }
}

Array.from(ansClass).forEach(e => {
  e.addEventListener("click", checkAns);
});

function checkAns(e) {
  if (ansOrNot[quesNo][0] == -1 && ansOrNot[quesNo][1] == -1) {
    checkQuesStatus(quesNo);
    var correctAns = quesText.getAttribute("data-cans");
    var answered = e.target.getAttribute("data-ans");
    if (correctAns == answered) {
      e.target.classList.add("correct");
      score += 1;
    } else {
      for (var i = 0; i < 4; i++) {
        if (correctAns == ansClass[i].getAttribute("data-ans")) {
          ansClass[i].classList.add("correct");
        }
      }
      e.target.classList.add("wrong");
    }
    ansOrNot[quesNo][0] = answered;
    ansOrNot[quesNo][1] = correctAns;
    viewReason.style.display = "block";
  }
}

function checkAnsweredOrNot(num) {
  var arr = ansOrNot[num];
  if (arr[1] != -1 || arr[0] != -1) {
    for (var i = 0; i < 4; i++) {
      if (arr[1] == ansClass[i].getAttribute("data-ans")) {
        ansClass[i].classList.add("correct");
      } else if (arr[0] == ansClass[i].getAttribute("data-ans")) {
        ansClass[i].classList.add("wrong");
      }
      reasonTxt.innerText = ques[num][3];
      viewReason.style.display = "block";
    }
  }
}

function scoreDisplay() {
  var c = 0;
  for (var i = 0; i < quesSize; i++) {
    if (ansOrNot[i][0] != -1 && ansOrNot[i][1] != -1) {
      c++;
    }
  }
  if (c == quesSize) {
    scoreArea.innerText = "Your Score is " + score;
  }
}

function exitORnew() {
  clearInterval(newTimer);
  timeMin = 10;
  timeSec = 0;
  quesNo = 0;
  scoreArea.innerText = "";
  quizArea(0);
  setNP();
  for (var i = 0; i < quesSize; i++) {
    ansOrNot[i][0] = -1;
    ansOrNot[i][1] = -1;
  }
  for (var j = 0; j < 4; j++) {
    removeCWclass(j);
  }
  score = 0;
}
var timeMin = 10;
var timeSec = 0;
function timer() {
  var tMin;
  var tSec;
  if (timeSec == 0) {
    timeSec = 60;
    timeMin -= 1;
  }
  timeSec -= 1;
  tSec = timeSec;
  if (timeSec < 10) {
    tSec = "0" + timeSec;
  }
  if (timeMin < 10) {
    tMin = "0" + timeMin;
  }
  timerNum.innerText = "Timer: " + tMin + ":" + tSec;
}

function track() {
  for (var i = 0; i < quesSize; i++) {
    var ele = document.createElement("div");
    ele.classList.add("qtrack");
    ele.setAttribute("data-ques-track", i);
    ele.innerText = i + 1;
    quesTrack.append(ele);
  }
  trackClass = document.querySelectorAll(".qtrack");
  Array.from(trackClass).forEach(e => {
    e.addEventListener("click", gotoQues);
  });
}

function gotoQues(e) {
  var targ = e.target.getAttribute("data-ques-track");
  quizArea(targ);
  checkAnsweredOrNot(targ);
  scoreDisplay();
  setNP();
}

function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function checkQuesStatus(num) {
  for (var i = 0; i < trackClass.length; i++) {
    if (num == trackClass[i].getAttribute("data-ques-track")) {
      trackClass[i].classList.add("attempted");
    }
  }
}
