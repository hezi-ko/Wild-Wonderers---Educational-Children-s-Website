let pieces = [];
let gridSize = 3;

function playSound(src) {
  const sound = new Audio(src);
  sound.play();
}

function createPuzzle(size) {
  gridSize = size;
  const scrambledBoard = document.getElementById("scrambledBoard");
  const puzzleBoard = document.getElementById("puzzleBoard");
  scrambledBoard.innerHTML = "";
  puzzleBoard.innerHTML = "";
  scrambledBoard.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  scrambledBoard.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  puzzleBoard.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  puzzleBoard.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  pieces = [];
  for (let i = 0; i < size * size; i++) {
    const piece = document.createElement("div");
    piece.classList.add("puzzle-piece");
    const posX = (i % size) * (100 / (size - 1));
    const posY = Math.floor(i / size) * (100 / (size - 1));

    piece.style.backgroundImage = `url('media/images/Koala-Puzzle.png')`;
    piece.style.backgroundPosition = `${posX}% ${posY}%`;
    piece.style.backgroundSize = `${size * 100}% ${size * 100}%`;

    piece.draggable = true;
    piece.addEventListener("dragstart", dragStart);
    piece.addEventListener("dragover", dragOver);
    piece.addEventListener("drop", dropPiece);
    piece.id = `piece-${i}`;
    pieces.push(piece);
  }

  shuffleArray(pieces);

  pieces.forEach((piece) => scrambledBoard.appendChild(piece));

  for (let i = 0; i < size * size; i++) {
    const emptyPiece = document.createElement("div");
    emptyPiece.classList.add("puzzle-piece");
    emptyPiece.addEventListener("dragover", dragOver);
    emptyPiece.addEventListener("drop", dropPiece);
    emptyPiece.id = `empty-${i}`; // 添加ID给空白块
    puzzleBoard.appendChild(emptyPiece);
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function dragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
  setTimeout(() => {
    event.target.style.opacity = "0.5";
  }, 0);
}

function dragOver(event) {
  event.preventDefault();
}

function dropPiece(event) {
  event.preventDefault();
  const draggedPieceId = event.dataTransfer.getData("text/plain");
  const draggedPiece = document.getElementById(draggedPieceId);
  const targetPiece = event.target.closest(".puzzle-piece");

  if (draggedPiece && targetPiece && draggedPiece !== targetPiece) {
    const tempBackgroundImage = draggedPiece.style.backgroundImage;
    const tempBackgroundPosition = draggedPiece.style.backgroundPosition;
    const tempBackgroundSize = draggedPiece.style.backgroundSize;

    draggedPiece.style.backgroundImage = targetPiece.style.backgroundImage;
    draggedPiece.style.backgroundPosition =
      targetPiece.style.backgroundPosition;
    draggedPiece.style.backgroundSize = targetPiece.style.backgroundSize;

    targetPiece.style.backgroundImage = tempBackgroundImage;
    targetPiece.style.backgroundPosition = tempBackgroundPosition;
    targetPiece.style.backgroundSize = tempBackgroundSize;

    draggedPiece.draggable = true;
    targetPiece.draggable = true;

    targetPiece.addEventListener("dragstart", dragStart);
    targetPiece.addEventListener("dragover", dragOver);
    targetPiece.addEventListener("drop", dropPiece);

    draggedPiece.addEventListener("dragstart", dragStart);
    draggedPiece.addEventListener("dragover", dragOver);
    draggedPiece.addEventListener("drop", dropPiece);

    playSound("media/audio/puzzle.mp3");

    checkPuzzleCompletion();
  }

  draggedPiece.style.opacity = "1";
}

// Compare floating point numbers with tolerance to avoid rounding errors
function floatsEqual(float1, float2, tolerance = 0.01) {
  return Math.abs(float1 - float2) < tolerance;
}

function checkPuzzleCompletion() {
  const puzzleBoard = document.getElementById("puzzleBoard");
  const pieces = puzzleBoard.querySelectorAll(".puzzle-piece");
  let isComplete = true;

  pieces.forEach((piece, index) => {
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;
    const expectedPosX = col * (100 / (gridSize - 1));
    const expectedPosY = row * (100 / (gridSize - 1));

    const [actualPosX, actualPosY] = piece.style.backgroundPosition
      .split(" ")
      .map((val) => parseFloat(val));

    // Debugging: Log the piece and its backgroundPosition
    console.log(
      `Checking piece-${index}: expected position ${expectedPosX}% ${expectedPosY}%, actual position ${actualPosX}% ${actualPosY}%`
    );

    // Use floatsEqual to check if positions are close enough
    if (
      !floatsEqual(actualPosX, expectedPosX) ||
      !floatsEqual(actualPosY, expectedPosY)
    ) {
      console.log(`Mismatch found for piece-${index}`);
      isComplete = false;
    }
  });

  if (isComplete) {
    setTimeout(() => {
      if (gridSize === 7) {
        // Trigger hard level completion feedback
        hardLevelCompleted();
      } else {
        showFeedbackModal(); // Normal completion feedback for easy/medium levels
        playSound("media/audio/congratulation.mp3");
      }
    }, 200);
  } else {
    console.log("Puzzle not complete yet.");
  }
}

function hardLevelCompleted() {
  console.log("Hard level completed! Triggering modal...");
  const hardFeedbackModal = document.getElementById("hardFeedbackModal");
  hardFeedbackModal.style.display = "block";
  // Play the same congratulatory sound for the hard level
  playSound("media/audio/congratulation.mp3");
}

function showFeedbackModal() {
  console.log("Normal level completed! Triggering modal...");
  const feedbackModal = document.getElementById("feedbackModal");
  feedbackModal.style.display = "block";
}

function playAgain() {
  const feedbackModal = document.getElementById("feedbackModal");
  const hardFeedbackModal = document.getElementById("hardFeedbackModal");
  feedbackModal.style.display = "none";
  hardFeedbackModal.style.display = "none";
  createPuzzle(gridSize);
}

function tryNextLevel() {
  const feedbackModal = document.getElementById("feedbackModal");
  const hardFeedbackModal = document.getElementById("hardFeedbackModal");
  feedbackModal.style.display = "none";
  hardFeedbackModal.style.display = "none";
  const nextSize = gridSize === 3 ? 5 : gridSize === 5 ? 7 : 3;
  createPuzzle(nextSize);
}

createPuzzle(3);
