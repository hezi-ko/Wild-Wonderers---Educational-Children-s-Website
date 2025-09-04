// document.addEventListener("DOMContentLoaded", function () {
// Initialise variables

let listened = false;
let options = [];
let correct_option = null;
let animal_apis = {};
let animal_images = {};
let rounds = 5;
let audio = null;

let image_1 = document.getElementById("image_1");
let image_2 = document.getElementById("image_2");
let image_3 = document.getElementById("image_3");

let sound1 = document.getElementById("sound1");

// let correct_answers = document.getElementById("correct").innerHTML;
// let questions_answered = document.getElementById("completed").innerHTML;

const image_path = "media/images/sound_matching/";

// Animal Sounds
const koala_api =
  "https://biocache-ws.ala.org.au/ws/occurrences/3d3b6fd7-b154-46e3-8d3e-54b510cf1372";
const emu_api =
  "https://biocache-ws.ala.org.au/ws/occurrences/c484e77a-6460-4d9f-b92b-54956a5ed752";
const crocodile_api =
  "https://biocache-ws.ala.org.au/ws/occurrences/f67cc9bf-e059-4474-8f62-002601852c44";
const dingo_api =
  "https://biocache-ws.ala.org.au/ws/occurrences/f5f3aed7-3f5b-4815-88ad-e5c5d60af112";
const kangaroo_api =
  "https://biocache-ws.ala.org.au/ws/occurrences/8e45b3f0-73af-416c-867b-b978d6a4c627";
const possum_api =
  "https://biocache-ws.ala.org.au/ws/occurrences/8fbd02f7-ee56-43cd-a704-f5d5bc841805";
const house_gecko_api =
  "https://biocache-ws.ala.org.au/ws/occurrences/adf1a144-6fa4-4ca3-8b1e-8a09edf7c635";
const bat_api =
  "https://biocache-ws.ala.org.au/ws/occurrences/d74da8ad-1fae-4c5c-9ce8-8b39ad27a11a";
const ibis_api =
  "https://biocache-ws.ala.org.au/ws/occurrences/f483440d-1416-46d5-84b4-d032765d52de";
const crow_api =
  "https://biocache-ws.ala.org.au/ws/occurrences/4929d9ef-3508-4084-8052-bb2a61e206dc";

animal_apis[0] = koala_api;
animal_apis[1] = emu_api;
animal_apis[2] = crocodile_api;
``;
animal_apis[3] = dingo_api;
animal_apis[4] = kangaroo_api;
animal_apis[5] = possum_api;
animal_apis[6] = house_gecko_api;
animal_apis[7] = bat_api;
animal_apis[8] = ibis_api;
animal_apis[9] = crow_api;

animal_images[0] = image_path + "koala.png";
animal_images[1] = image_path + "emu.png";
animal_images[2] = image_path + "crocodile.png";
animal_images[3] = image_path + "dingo.png";
animal_images[4] = image_path + "kangaroo.png";
animal_images[5] = image_path + "possum.png";
animal_images[6] = image_path + "gecko.png";
animal_images[7] = image_path + "bat.png";
animal_images[8] = image_path + "ibis.png";
animal_images[9] = image_path + "crow.png";

// console.log(animal_apis);
// console.log(animal_images);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateOptions() {
  while (options.length < 3) {
    let randomNum = Math.floor(Math.random() * 10);

    if (!options.includes(randomNum)) {
      options.push(randomNum);
    }
  }

  return options;
}

function correctOption(options) {
  let index = Math.floor(Math.random() * options.length);
  return options[index];
}

function checkSelection(image, correct_index) {
  console.log("testing");

  let x = Number(document.getElementById("correct").innerHTML);
  let y = Number(document.getElementById("completed").innerHTML);

  if (image.alt == correct_index) {
    x += 1;
    y += 1;

    document.getElementById("correct").innerHTML = x;
    document.getElementById("completed").innerHTML = y;
    rounds--;
  } else {
    y += 1;

    document.getElementById("completed").innerHTML = y;
    rounds--;
  }

  if (rounds == 0) {
    document.getElementById("message-modal").innerHTML =
      document.getElementById("message-modal").innerHTML +
      "You got " +
      document.getElementById("correct").innerHTML +
      " questions out of 5 correct!";
    showFeedbackModal(); // Normal completion feedback for easy/medium levels
    playCongrats("media/audio/congratulation.mp3");
    return;
  }

  options = [];

  generateOptions();
  correct_option = correctOption(options);

  console.log("ROUND: " + rounds);
  console.log(options);
  console.log(correct_option);

  sound1.setAttribute("onclick", `playSound(${correct_option})`);

  image_1.src = animal_images[options[0]];
  image_1.alt = options[0];

  image_2.src = animal_images[options[1]];
  image_2.alt = options[1];

  image_3.src = animal_images[options[2]];
  image_3.alt = options[2];

  image_1.setAttribute("onclick", `checkSelection(image_1, ${correct_option})`);
  image_2.setAttribute("onclick", `checkSelection(image_2, ${correct_option})`);
  image_3.setAttribute("onclick", `checkSelection(image_3, ${correct_option})`);
}

function playSound(animal) {
  fetch(animal_apis[animal])
    .then((response) => response.json())
    .then((data) => {
      const soundUrl = data.sounds[0]?.alternativeFormats["audio/mpeg"]; // Fetch the audio file URL

      if (soundUrl) {
        audio = new Audio(soundUrl); // Create an audio object

        // Play button
        audio.play(); // Play the audio
      } else {
        console.error("No audio file found");
      }
    })
    .catch((error) => {
      console.error("API request failed:", error);
    });

  sleep(10000).then(() => {
    audio.pause();
  });

  listened = true;
  audio = null;
}

function playCongrats(src) {
  const sound = new Audio(src);
  sound.play();
}

function showFeedbackModal() {
  console.log("Normal level completed! Triggering modal...");
  const feedbackModal = document.getElementById("feedbackModal");
  feedbackModal.style.display = "block";
}

function playAgain() {
  location.reload();
}

function returnToGames() {
  window.location.href = "games.html";
}

// function playRound(image_1, image_2, image_3, options, sound1, animal_images) {
generateOptions();
correct_option = correctOption(options);

console.log(options);
console.log(correct_option);

sound1.setAttribute("onclick", `playSound(${correct_option})`);

image_1.src = animal_images[options[0]];
image_1.alt = options[0];

image_2.src = animal_images[options[1]];
image_2.alt = options[1];

image_3.src = animal_images[options[2]];
image_3.alt = options[2];

console.log(animal_images[0]);

image_1.setAttribute("onclick", `checkSelection(image_1, ${correct_option})`);
image_2.setAttribute("onclick", `checkSelection(image_2, ${correct_option})`);
image_3.setAttribute("onclick", `checkSelection(image_3, ${correct_option})`);
// }
