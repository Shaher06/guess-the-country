let currentIndex = 0;
let playerName = "";
let playerAge = "";
let score = 0;
let timer;
let timeLeft = 15;

const levels = {
  easy: [
    { hint: "عاصمتها القاهرة", answer: "مصر" },
    { hint: "عاصمتها باريس", answer: "فرنسا" },
    { hint: "عاصمتها الرياض", answer: "السعودية" },
  ],
  medium: [
    { hint: "عاصمتها برلين", answer: "ألمانيا" },
    { hint: "عاصمتها مدريد", answer: "إسبانيا" },
    { hint: "عاصمتها أنقرة", answer: "تركيا" },
  ],
  hard: [
    { hint: "عاصمتها نيروبي", answer: "كينيا" },
    { hint: "عاصمتها هانوي", answer: "فيتنام" },
    { hint: "عاصمتها واغادوغو", answer: "بوركينا فاسو" },
  ]
};

let currentLevel = 'easy';
let questions = [];

const correctSound = document.getElementById('correctSound');
const wrongSound = document.getElementById('wrongSound');
const result = document.getElementById('result');
const hintEl = document.getElementById('hint');
const input = document.getElementById('userGuess');
const scoreBox = document.getElementById('scoreBox');
const timerBox = document.createElement('div');
timerBox.id = 'timerBox';
timerBox.style.marginTop = '10px';
timerBox.style.fontWeight = 'bold';
document.querySelector('.game-container').appendChild(timerBox);

function setLevel(level) {
  currentLevel = level;
  questions = [...levels[level]];
  currentIndex = 0;
  score = 0;
  updateScore();
  loadQuestion();
}

function startGame() {
  playerName = document.getElementById("playerName").value.trim();
  playerAge = document.getElementById("playerAge").value.trim();

  if (playerName === "" || playerAge === "") {
    alert("من فضلك ادخل الاسم والسن.");
    return;
  }

  document.getElementById("welcome-screen").classList.add("hidden");
  document.getElementById("game-screen").classList.remove("hidden");
  document.getElementById("profileName").textContent = playerName;
  document.getElementById("profileAge").textContent = playerAge;

  setLevel('easy');
}

function checkAnswer() {
  const userAnswer = input.value.trim();
  const correctAnswer = questions[currentIndex].answer;

  clearInterval(timer);

  result.classList.remove("correct", "wrong", "show");

  if (userAnswer === correctAnswer) {
    result.textContent = "✅ إجابة صحيحة!";
    result.classList.add("correct", "show");
    correctSound.play();
    score++;
    updateScore();
  } else {
    result.textContent = `❌ غلط! الإجابة الصح: ${correctAnswer}`;
    result.classList.add("wrong", "show");
    wrongSound.play();
  }

  setTimeout(() => {
    currentIndex++;
    if (currentIndex < questions.length) {
      loadQuestion();
    } else {
      endGame();
    }
  }, 3000);
}

function loadQuestion() {
  const q = questions[currentIndex];
  hintEl.textContent = q.hint;
  input.value = "";
  result.textContent = "";
  result.classList.remove("correct", "wrong", "show");
  startTimer();
}

function startTimer() {
  timeLeft = 15;
  timerBox.textContent = `⏳ الوقت المتبقي: ${timeLeft} ثانية`;
  timer = setInterval(() => {
    timeLeft--;
    timerBox.textContent = `⏳ الوقت المتبقي: ${timeLeft} ثانية`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      result.textContent = `⏱️ انتهى الوقت! الإجابة كانت: ${questions[currentIndex].answer}`;
      result.classList.add("wrong", "show");
      wrongSound.play();
      setTimeout(() => {
        currentIndex++;
        if (currentIndex < questions.length) {
          loadQuestion();
        } else {
          endGame();
        }
      }, 3000);
    }
  }, 1000);
}

function updateScore() {
  scoreBox.textContent = `النقاط: ${score}`;
}

function endGame() {
  hintEl.textContent = "✅ انتهت الجولة! مبروك أو حظ أوفر 👏";
  input.disabled = true;
  document.querySelector("button[onclick='checkAnswer()']").disabled = true;
  timerBox.textContent = "";
}
