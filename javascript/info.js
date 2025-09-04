document.addEventListener("DOMContentLoaded", function () {
  const apiUrl =
    "https://biocache-ws.ala.org.au/ws/occurrences/57b8ba0c-cc22-4f45-9789-c69f4e73401a";
  let audio = null;
  let isPlaying = false;

  const pageFlipSound = new Audio(
    "media/audio/zapsplat_office_design_folder_a2_size_plastic_page_flip_finger_turn_002_99831.mp3"
  );
  pageFlipSound.preload = "auto";

  const koalaImage = document.getElementById("koala-image");
  if (!koalaImage) {
    console.error("Koala image element not found.");
    return;
  }

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const soundUrl = data.sounds?.[0]?.alternativeFormats["audio/mpeg"];
      if (soundUrl) {
        audio = new Audio(soundUrl);
        audio.preload = "auto";
        console.log("Koala audio loaded and ready to play.");

        const koalaImage = document.getElementById("test");
        if (!koalaImage) {
          console.error("Koala image element not found.");
          return;
        }

        koalaImage.addEventListener("mouseover", function () {
          console.log("are we here");

          if (isPlaying) {
            audio.pause();
            audio.currentTime = 0;
            isPlaying = false;
            console.log("Audio paused");
          } else {
            audio.play();
            isPlaying = true;
            console.log("Audio playing");
          }
        });
      } else {
        console.error("No audio file found in the API response.");
      }
    })
    .catch((error) => {
      console.error("API request failed:", error);
    });

  // GET KOALA API
  const dataApiUrl =
    'https://www.data.qld.gov.au/api/3/action/datastore_search?resource_id=ebd00c34-d5d1-4266-8f6b-d9424104a307&filters={"English":"Koala"}';

  fetch(dataApiUrl)
    .then((response) => response.json())
    .then((data) => {
      const records = data.result.records;
      const dataInfoDiv = document.getElementById("data-info");

      if (records.length > 0) {
        const yugaraName = records[0].Yugara || "No Yugara name available";
        dataInfoDiv.innerHTML = `<h2>Koala in Yugara: ${yugaraName}</h2>`;
      } else {
        dataInfoDiv.innerHTML = "<p>No data found for Koala.</p>";
      }
    })
    .catch((error) => {
      const dataInfoDiv = document.getElementById("data-info");
      dataInfoDiv.innerHTML =
        "<p>Error loading data. Please try again later.</p>";
    });

  // GET KOALA API
  const speciesApiUrl =
    "https://apps.des.qld.gov.au/species/?op=getspeciesbyid&taxonid=860&f=json";

  fetch(speciesApiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      const scientificName =
        data.Species?.ScientificName || "No scientific name available";
      const commonName =
        data.Species?.AcceptedCommonName || "No common name available";
      const kingdomName =
        data.Species?.KingdomName || "No kingdom name available";
      const className = data.Species?.ClassName || "No class name available";
      const familyName = data.Species?.FamilyName || "No family name available";
      const alternateCommonName =
        data.Species?.AlternateCommonName ||
        "No alternate common name available";

      const speciesInfoDiv = document.getElementById("species-info");

      speciesInfoDiv.innerHTML = `
        <h2>Common Name: ${commonName}</h2>
        <p>Scientific Name: ${scientificName}</p>
        <p>Kingdom Name: ${kingdomName}</p>
        <p>Class Name: ${className}</p>
        <p>Family Name: ${familyName}</p>
        <p>Alternate Common Name: ${alternateCommonName}</p>
      `;
    })
    .catch((error) => {
      const speciesInfoDiv = document.getElementById("species-info");
      speciesInfoDiv.innerHTML =
        "<p>Error loading species data. Please try again later.</p>";
    });

  const flipBook = (elBook) => {
    let currentPage = 0;
    elBook.style.setProperty("--c", currentPage);

    elBook.querySelectorAll(".page, .firstpage").forEach((page, idx) => {
      page.style.setProperty("--i", idx);
      page.addEventListener("click", (evt) => {
        if (evt.target.closest("a") || evt.target.closest("#koala-image"))
          return;
        const curr = evt.target.closest(".back") ? idx : idx + 1;
        elBook.style.setProperty("--c", curr);
        currentPage = curr;

        pageFlipSound.currentTime = 0;
        pageFlipSound.play();
        console.log(`Flipped to page ${currentPage + 1}`);
      });
    });
  };

  document.querySelectorAll(".book").forEach(flipBook);

  const animals = document.querySelectorAll("#animal-list li");
  const book = document.querySelector(".book");

  animals.forEach((animal) => {
    const pageNumber = animal.getAttribute("data-page");
    const pageSpan = document.createElement("span");
    pageSpan.textContent = `------ ${pageNumber}`;
    animal.appendChild(pageSpan);

    animal.addEventListener("click", function () {
      book.style.setProperty("--c", pageNumber - 1);
      pageFlipSound.currentTime = 0;
      pageFlipSound.play();
      console.log(`Jumped to page ${pageNumber}`);
    });
  });
});
