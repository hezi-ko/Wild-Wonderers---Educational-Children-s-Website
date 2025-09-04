document.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.getElementById("loading-screen");
  const element = document.querySelector(".element");
  const mainContent = document.querySelector("main.main-content");
  const navBar = document.querySelector(".navbar"); // 假設導航欄有個 class "navbar"
  const homeButton = document.querySelector("#home-btn");
  const videoButton = document.querySelector("#video-btn");
  const gameButton = document.querySelector("#game-btn");
  const infoButton = document.querySelector("#info-btn");

  element.addEventListener("animationend", (event) => {
    if (event.animationName === "spin-and-grow") {
      element.style.animation = "jump 2s ease-in-out infinite";
    }
  });

  element.addEventListener("animationiteration", (event) => {
    if (event.animationName === "jump") {
      setTimeout(() => {
        loadingScreen.classList.add("hidden");

        loadingScreen.addEventListener("transitionend", () => {
          mainContent.classList.add("active");
        });
      }, 1000);
    }
  });

  setupCarousel();
  setupCTATourGuide();
});

function setupCarousel() {
  const carouselItems = document.querySelectorAll(".carousel__item");
  let currentItem = document.querySelector(".carousel__item--main");
  const leftBtn = document.querySelector("#leftBtn");
  const rightBtn = document.querySelector("#rightBtn");

  rightBtn.addEventListener("click", function () {
    currentItem = document.querySelector(".carousel__item--right");
    const leftItem = document.querySelector(".carousel__item--main");

    carouselItems.forEach((item) => {
      item.classList = "carousel__item";
    });

    currentItem.classList.add("carousel__item--main");
    leftItem.classList.add("carousel__item--left");

    const currentId = Array.from(carouselItems).indexOf(currentItem);
    const rightItem =
      currentId === carouselItems.length - 1
        ? carouselItems[0]
        : carouselItems[currentId + 1];
    rightItem.classList.add("carousel__item--right");
  });

  leftBtn.addEventListener("click", function () {
    currentItem = document.querySelector(".carousel__item--left");
    const rightItem = document.querySelector(".carousel__item--main");

    carouselItems.forEach((item) => {
      item.classList = "carousel__item";
    });

    currentItem.classList.add("carousel__item--main");
    rightItem.classList.add("carousel__item--right");

    const currentId = Array.from(carouselItems).indexOf(currentItem);
    const leftItem =
      currentId === 0
        ? carouselItems[carouselItems.length - 1]
        : carouselItems[currentId - 1];
    leftItem.classList.add("carousel__item--left");
  });
}

// Updated CTA Tour Guide setup
function setupCTATourGuide() {
  const tourSteps = [
    {
      title: "WELCOME!",
      content:
        "Ready for an adventure? Let's dive into the wild Wonders of animals!",
      highlight: "",
    },
    {
      title: "HOME",
      content: "Need to get back to the main hub? Click here to return home!",
      highlight: "home-btn",
    },
    {
      title: "VIDEOS",
      content:
        "Watch these awesome animal videos! They can't wait to show off for you!",
      highlight: "video-btn",
    },
    {
      title: "GAMES",
      content:
        "Time for some fun! Play games and learn cool facts about animals!",
      highlight: "games-btn",
    },
    {
      title: "INFO",
      content:
        "Want to discover amazing facts about different animals? Check it out here!",
      highlight: "info-btn",
    },
    {
      title: "CAROUSEL",
      content:
        "Meet today’s featured animals! Click the arrows to see more cool creatures!",
      highlight: "carousel-main",
    },
    {
      title: "CONTACT US",
      content: "Have any questions or ideas? Get in touch with us here!",
      highlight: "contact-wrapper",
    },
  ];

  let currentStep = 0;
  const overlay = document.getElementById("cta-overlay");
  const card = document.getElementById("cta-card");
  const title = document.getElementById("cta-title");
  const content = document.querySelector(".card-content");
  const nextButton = document.getElementById("cta-next");
  const closeButton = document.querySelector("#cta-close");

  function showStep(step) {
    const currentTourStep = tourSteps[step];
    title.textContent = currentTourStep.title;
    content.textContent = currentTourStep.content;
    nextButton.textContent = step < tourSteps.length - 1 ? "NEXT" : "FINISH";

    overlay.classList.remove("hidden");
    card.classList.remove("hidden");

    // Reset status
    resetElementsState();

    // highlight
    if (currentTourStep.highlight) {
      if (currentTourStep.highlight === "carousel-main") {
        const carouselMain = document.querySelector(".carousel__item--main");
        if (carouselMain) {
          carouselMain.classList.add("highlight");
        }
      } else if (currentTourStep.highlight === "contact-wrapper") {
        const contactWrapper = document.querySelector(".contact-wrapper");
        if (contactWrapper) {
          contactWrapper.classList.add("highlight");
        }
      } else {
        const buttonToHighlight = document.querySelector(
          `#${currentTourStep.highlight} .nav-button`
        );
        if (buttonToHighlight) {
          buttonToHighlight.classList.add("on-top");
        }
      }
    }
  }

  function resetElementsState() {
    document.querySelectorAll(".nav-button").forEach((btn) => {
      btn.classList.remove("on-top");
      btn.classList.remove("active");
    });
    const carouselMain = document.querySelector(".carousel__item--main");
    if (carouselMain) {
      carouselMain.classList.remove("highlight");
    }
    const contactWrapper = document.querySelector(".contact-wrapper");
    if (contactWrapper) {
      contactWrapper.classList.remove("highlight");
    }
  }

  function hideCard() {
    overlay.classList.add("hidden");
    card.classList.add("hidden");
    resetElementsState();
  }

  nextButton.addEventListener("click", () => {
    if (currentStep < tourSteps.length - 1) {
      currentStep++;
      showStep(currentStep);
    } else {
      hideCard();
    }
  });

  closeButton.addEventListener("click", hideCard);

  //
  showStep(currentStep);
}

//
document.addEventListener("DOMContentLoaded", setupCTATourGuide);
