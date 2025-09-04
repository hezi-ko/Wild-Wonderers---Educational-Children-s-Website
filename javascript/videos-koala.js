let player;

// Dynamically adjust player dimensions to maintain a 16:9 aspect ratio
function resizePlayer() {
  const playerContainer = document.getElementById("video-area");
  const width = playerContainer.offsetWidth;
  const height = (9 / 16) * width;
  if (player && typeof player.setSize === "function") {
    player.setSize(width, height);
  }
}

// Function to initialize YouTube Player
function initializePlayer() {
  const playerElement = document.getElementById("player");

  // Check if player container exists and is not replaced
  if (!playerElement) {
    const newPlayerDiv = document.createElement("div");
    newPlayerDiv.id = "player";
    document.getElementById("video-area").appendChild(newPlayerDiv);
  }

  player = new YT.Player("player", {
    videoId: "oI3ADcDH0Uc", // Default video ID
    events: {
      onReady: onPlayerReady,
    },
  });
  resizePlayer();
}

// Automatically called when the YouTube IFrame API is loaded
function onYouTubeIframeAPIReady() {
  initializePlayer();
}

// Once the player is ready, add click events to switch videos
function onPlayerReady(event) {
  document.querySelectorAll(".related-video").forEach((video) => {
    video.addEventListener("click", function () {
      const videoId = this.getAttribute("data-video");
      player.loadVideoById(videoId);
    });
  });

  // Listen for window resize events and adjust player dimensions dynamically
  window.addEventListener("resize", resizePlayer);
}

// Destroy the player instance
function destroyPlayer() {
  if (player && typeof player.destroy === "function") {
    player.destroy();
    player = null;
  }
}

// Create a custom tooltip and show it when hovering the return button
function showCustomTooltip(event) {
  const tooltip = document.createElement("div");
  tooltip.className = "custom-tooltip";
  tooltip.innerText = "Return to animals";
  document.body.appendChild(tooltip);

  // Position the tooltip near the button
  const buttonRect = event.target.getBoundingClientRect();
  tooltip.style.left = `${buttonRect.left + window.scrollX + 50}px`;
  tooltip.style.top = `${buttonRect.top + window.scrollY - 10}px`;

  // Store the tooltip for later removal
  event.target._tooltip = tooltip;
}

function hideCustomTooltip(event) {
  if (event.target._tooltip) {
    event.target._tooltip.remove();
    event.target._tooltip = null;
  }
}

// Add event listeners to return button for custom tooltip
document.addEventListener("DOMContentLoaded", function () {
  const returnButton = document.querySelector(".return-button");
  if (returnButton) {
    returnButton.addEventListener("mouseover", showCustomTooltip);
    returnButton.addEventListener("mouseout", hideCustomTooltip);
  }
});

// Reinitialize the player when the page becomes visible again
document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "hidden") {
    destroyPlayer(); // Destroy player when page is hidden
  } else if (document.visibilityState === "visible") {
    setTimeout(() => {
      initializePlayer(); // Re-initialize the player
      resizePlayer(); // Ensure player size is correct
    }, 200); // 0.2 second delay to ensure the player loads correctly
  }
});

// Reinitialize player when coming back to this page
function onPageReturn() {
  destroyPlayer();
  initializePlayer();
}

// Call this function when navigating back to the video page
document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("video-area")) {
    onPageReturn();
  }
});
