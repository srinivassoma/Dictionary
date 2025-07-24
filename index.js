const input = document.getElementById("input");
const infoText = document.getElementById("info-text");
const meaningContainer = document.getElementById("meaning-container");
const titleEl = document.getElementById("title");
const meaningEl = document.getElementById("meaning");
const audioEl = document.getElementById("audio");

input.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && e.target.value.trim()) {
    fetchAPI(e.target.value.trim());
  }
});

async function fetchAPI(word) {
  try {
    infoText.style.display = "block";
    meaningContainer.style.display = "none";
    infoText.innerText = `Searching the meaning of "${word}"...`;

    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Word not found");
    }

    const result = await response.json();

    infoText.style.display = "none";
    meaningContainer.style.display = "block";
    titleEl.innerText = result[0].word;
    meaningEl.innerText =
      result[0].meanings[0].definitions[0].definition || "No meaning found";

    const audio = result[0].phonetics.find((p) => p.audio);
    if (audio && audio.audio) {
      audioEl.src = audio.audio;
      audioEl.style.display = "inline-block";
    } else {
      audioEl.style.display = "none";
    }
  } catch (error) {
    infoText.innerText = "Could not find the word. Try another.";
    meaningContainer.style.display = "none";
    audioEl.style.display = "none";
  }
}
