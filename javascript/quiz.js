// List of all questions with their possible answers and correct answers
const questions = [
  {
    question: "Where does a Carpet Snake like to live?",
    options: ["In trees", "Under rocks", "In water"],
    correct: "In trees",
  },
  {
    question: "What does a Carpet Snake usually eat?",
    options: ["Insects", "Small mammals and birds", "Plants"],
    correct: "Small mammals and birds",
  },
  {
    question: "When is a Carpet Snake most active?",
    options: ["During the day", "In the afternoon", "At night"],
    correct: "At night",
  },
  {
    question: "What kind of habitat do Dingoes prefer?",
    options: ["Deserts", "Forests", "Urban areas"],
    correct: "Deserts",
  },
  {
    question: "What is a Dingo's favorite food?",
    options: ["Fish", "Small mammals like rabbits", "Fruits"],
    correct: "Small mammals like rabbits",
  },
  {
    question: "When do Dingoes usually hunt?",
    options: ["Early morning and evening", "Midday", "Late night"],
    correct: "Early morning and evening",
  },
  {
    question: "Where do Emus usually live?",
    options: ["In rainforests", "Near rivers", "In open plains and woodlands"],
    correct: "In open plains and woodlands",
  },
  {
    question: "What do Emus like to eat?",
    options: ["Grass and insects", "Fish", "Leaves"],
    correct: "Grass and insects",
  },
  {
    question: "What time of day are Emus most active?",
    options: ["Morning", "Afternoon", "Night"],
    correct: "Morning",
  },
  {
    question: "Where do Kangaroos typically live?",
    options: ["Deserts", "Grasslands and forests", "Mountains"],
    correct: "Grasslands and forests",
  },
  {
    question: "What is a Kangaroo's main diet?",
    options: ["Leaves and grass", "Meat", "Fruits"],
    correct: "Leaves and grass",
  },
  {
    question: "When do Kangaroos usually rest?",
    options: ["Morning", "Night", "Midday"],
    correct: "Midday",
  },
  {
    question: "Where does a Koala spend most of its time?",
    options: ["On the ground", "In trees", "In caves"],
    correct: "In trees",
  },
  {
    question: "What does a Koala mainly eat?",
    options: ["Eucalyptus leaves", "Fruits", "Insects"],
    correct: "Eucalyptus leaves",
  },
  {
    question: "How many hours a day does a Koala sleep?",
    options: ["4-6 hours", "10-12 hours", "18-20 hours"],
    correct: "18-20 hours",
  },
  {
    question: "Where do Possums like to live?",
    options: ["In burrows", "In tree hollows", "Under rocks"],
    correct: "In tree hollows",
  },
  {
    question: "What is a Possum's favorite food?",
    options: ["Insects", "Fruits and leaves", "Fish"],
    correct: "Fruits and leaves",
  },
  {
    question: "When is a Possum most active?",
    options: ["Nighttime", "Daytime", "Evening"],
    correct: "Nighttime",
  },
  {
    question: "Where do Sharks mostly live?",
    options: ["In rivers", "In the ocean", "In lakes"],
    correct: "In the ocean",
  },
  {
    question: "What do Sharks like to eat?",
    options: ["Seaweed", "Plankton", "Fish and seals"],
    correct: "Fish and seals",
  },
  {
    question: "When do Sharks usually hunt?",
    options: ["During the day", "At night", "Early morning"],
    correct: "At night",
  },
  {
    question: "Which animal is known for hopping around?",
    options: ["Dingo", "Carpet Snake", "Kangaroo"],
    correct: "Kangaroo",
  },
  {
    question: "Which of these animals spends most of its time in water?",
    options: ["Possum", "Shark", "Koala"],
    correct: "Shark",
  },
  {
    question: "Which animal is known for its loud laugh-like call?",
    options: ["Koala", "Emu", "Dingo"],
    correct: "Dingo",
  },
  {
    question: "Which of these animals sleeps the most during the day?",
    options: ["Carpet Snake", "Kangaroo", "Koala"],
    correct: "Koala",
  },
];

// Randomly shuffle and select 5 questions
const selectedQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, 5);

let currentQuestion = 0;
let score = 0;

// Container for quiz
const quizContainer = document.querySelector(".content");
const quizForm = document.getElementById("quiz-form");

// Displays one question at a time
function showQuestion() {
  quizForm.innerHTML = "";
  const question = selectedQuestions[currentQuestion];

  const questionDiv = document.createElement("div");
  questionDiv.classList.add("quiz-question");

  const questionTitle = document.createElement("p");
  questionTitle.textContent = `${currentQuestion + 1}. ${question.question}`;
  questionDiv.appendChild(questionTitle);

  question.options.forEach((option) => {
    const label = document.createElement("label");
    label.innerHTML = `<input type="radio" name="option" value="${option}"> ${option}`;
    label.classList.add("option");
    questionDiv.appendChild(label);
    questionDiv.appendChild(document.createElement("br"));
  });

  quizForm.appendChild(questionDiv);
}

document.querySelector(".check-button").addEventListener("click", checkAnswer);

// Changes options colour to red if incorrect and green if correct
function checkAnswer() {
  const selectedOption = document.querySelector('input[name="option"]:checked');
  if (!selectedOption) return; // If no option is selected, do nothing

  const answer = selectedOption.value;
  const correctAnswer = selectedQuestions[currentQuestion].correct;

  // Colour-coding the answers
  const labels = document.querySelectorAll(".option");
  labels.forEach((label) => {
    if (label.textContent.includes(correctAnswer)) {
      label.style.color = "green";
    } else {
      label.style.color = "red";
    }
  });

  // Update score if the answer is correct
  if (answer === correctAnswer) {
    score++;
  }

  // Move to the next question after a short delay
  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < selectedQuestions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1500); // 1-second delay to display the colour-coding
}

function showResult() {
  quizContainer.innerHTML = ""; // Clear previous content

  const quizResultTitle = document.createElement("div");
  quizResultTitle.classList.add("quiz-result-title");

  const resultDiv = document.createElement("div");
  resultDiv.classList.add("quiz-result");

  const resultText = document.createElement("p");
  resultText.innerHTML = `You scored <span style="font-weight: bold; color: #537023;">${score}</span> out of <span style="font-weight: bold; color: #537023;">${
    selectedQuestions.length
  }</span>! ${
    score === selectedQuestions.length
      ? "You're an animal expert! 🦁"
      : "Great effort! Keep learning!"
  }`;

  const playAgainButton = document.createElement("button");
  playAgainButton.type = "button";
  playAgainButton.classList.add("play-again-button");
  playAgainButton.textContent = "Play Again";
  playAgainButton.addEventListener("click", () => location.reload());

  const goToPageButton = document.createElement("button");
  goToPageButton.type = "button";
  goToPageButton.classList.add("go-to-games-button");
  goToPageButton.textContent = "Go back to Games Page";
  goToPageButton.addEventListener("click", () => {
    window.location.href = "/games.html";
  });

  resultDiv.appendChild(resultText);
  resultDiv.appendChild(playAgainButton);
  resultDiv.appendChild(goToPageButton);

  quizContainer.appendChild(resultDiv);
}

// Start by showing the first question
showQuestion();
