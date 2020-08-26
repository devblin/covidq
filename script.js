let basicMode = document.getElementById("basic");
// let hackerMode = document.getElementById("hacker");
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
var score = 0;
let quesSize = ques.length;
let ansOrNot = [
  [-1, -1],
  [-1, -1],
  [-1, -1],
  [-1, -1],
  [-1, -1],
  [-1, -1],
  [-1, -1],
  [-1, -1],
  [-1, -1],
  [-1, -1]
];

quizMain.style.display = "none";
scoreArea.innerHTML = "";
viewReason.style.display = "none";
quizArea(0);
setNP();

newGame.onclick = function () {
  exitORnew();
};
gameExit.onclick = function () {
  exitORnew();
  viewReason.style.display = "none";
  quizMain.style.display = "none";
  mainMenu.style.display = "flex";
};

basicMode.onclick = function () {
  mainMenu.style.display = "none";
  quizMain.style.display = "flex";
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
