async function fetchData(word) {
  const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
  return response.json();
}

function displayResult(data) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  if (!data || data.length === 0) {
    resultDiv.innerHTML = "<p>No results found for the entered word.</p>";
    return;
  }

  data.forEach(entry => {
    const word = entry.word;
    const meanings = entry.meanings;

    const card = document.createElement("div");
    card.className = "card my-3";

    const cardContent = `
      <div class="card-body">
        <h3 class="card-title">${word.toUpperCase()}</h3>
        <ul>
          ${meanings
            .map(
              meaning => `
                <li>
                  <strong>${meaning.partOfSpeech}</strong>: ${meaning.definitions[0].definition}
                </li>
              `
            )
            .join("")}
        </ul>
      </div>
    `;

    card.innerHTML = cardContent;
    resultDiv.appendChild(card);
  });
}

async function searchWord() {
  const wordInput = document.getElementById("wordInput");
  const word = wordInput.value.trim();

  if (word === "") {
    return;
  }

  try {
    const data = await fetchData(word);
    displayResult(data);
  } catch (error) {
    console.log("Error fetching data:", error);
    displayResult(null);
  }
}