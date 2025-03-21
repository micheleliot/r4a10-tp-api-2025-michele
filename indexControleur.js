const TOKEN = "526ecc96";

const searchInput = document.getElementById("searchInput");
const yearInput = document.getElementById("yearInput");
const typeSelect = document.getElementById("typeSelect");
const searchButton = document.getElementById("searchButton");
const resultsContainer = document.getElementById("results");
const detailsContainer = document.getElementById("details");
const paginationContainer = document.getElementById("paginationContainer");

let savedResults = []; // Sauvegarder les résultats
let currentPage = 1; // Page actuelle
let totalResults = 0; // Nombre total de résultats
let totalPages = 0; // Total des pages
let pageRangeStart = 1; // Début de la plage des pages à afficher

searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  const year = yearInput.value.trim();
  const type = typeSelect.value;

  if (!query) return;

  currentPage = 1; // Réinitialiser la page lors d'une nouvelle recherche
  searchMovies(query, year, type, currentPage);
});

function searchMovies(query, year, type, page) {
  let url = `https://www.omdbapi.com/?apikey=${TOKEN}&s=${query}&page=${page}`;
  if (year) url += `&y=${year}`;
  if (type !== "all") url += `&type=${type}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.Response === "True") {
        savedResults = data.Search; // Sauvegarde les résultats
        totalResults = parseInt(data.totalResults, 10); // Sauvegarde le nombre total de résultats
        totalPages = Math.ceil(totalResults / 10); // Calculer le nombre total de pages
        displayResults(savedResults); // Affiche les résultats
        displayPagination(totalPages); // Affiche la pagination
      } else {
        resultsContainer.innerHTML = "<p>Aucun résultat trouvé.</p>";
      }
    });
}

function displayResults(results) {
  resultsContainer.innerHTML = "";
  detailsContainer.innerHTML = "";
  results.forEach((item) => {
    const div = document.createElement("div");
    div.textContent = `${item.Title} (${item.Year})`;
    div.style.cursor = "pointer";
    div.dataset.imdbID = item.imdbID; // Ajoute l'ID de l'élément pour les détails
    div.addEventListener("click", () => fetchDetails(item.imdbID));
    resultsContainer.appendChild(div);
  });
}

function displayPagination(totalPages) {
  let paginationHTML = "";
  const maxPagesToShow = 10; // Nombre de boutons de pagination à afficher
  const endRange = Math.min(pageRangeStart + maxPagesToShow - 1, totalPages);

  // Créer les boutons de pagination pour la plage de pages actuelle
  for (let i = pageRangeStart; i <= endRange; i++) {
    paginationHTML += `<button class="paginationButton" data-page="${i}">${i}</button>`;
  }

  // Ajouter les boutons "Précédent" et "Suivant"
  paginationHTML += `<button id="prevPage" ${
    pageRangeStart === 1 ? "disabled" : ""
  }>Précédent</button>`;
  paginationHTML += `<button id="nextPage" ${
    endRange === totalPages ? "disabled" : ""
  }>Suivant</button>`;

  paginationContainer.innerHTML = paginationHTML;

  // Ajouter des événements de clic sur les boutons de pagination
  const paginationButtons = document.querySelectorAll(".paginationButton");
  paginationButtons.forEach((button) => {
    button.addEventListener("click", () => {
      currentPage = button.getAttribute("data-page");
      searchMovies(
        searchInput.value.trim(),
        yearInput.value.trim(),
        typeSelect.value,
        currentPage
      );
    });
  });

  // Ajouter des événements de clic pour les boutons "Précédent" et "Suivant"
  document.getElementById("prevPage").addEventListener("click", () => {
    if (pageRangeStart > 1) {
      pageRangeStart -= 10;
      searchMovies(
        searchInput.value.trim(),
        yearInput.value.trim(),
        typeSelect.value,
        pageRangeStart
      );
    }
  });

  document.getElementById("nextPage").addEventListener("click", () => {
    if (pageRangeStart + 10 <= totalPages) {
      pageRangeStart += 10;
      searchMovies(
        searchInput.value.trim(),
        yearInput.value.trim(),
        typeSelect.value,
        pageRangeStart
      );
    }
  });
}
// fonction de récupération des détail d'un film/serie
function fetchDetails(imdbID) {
  fetch(`https://www.omdbapi.com/?apikey=${TOKEN}&i=${imdbID}`)
    .then((response) => response.json())
    .then((data) => {
      resultsContainer.innerHTML = "";
      detailsContainer.innerHTML = `
        <h2>${data.Title} (${data.Year})</h2>
        <img src="${data.Poster}" alt="Affiche"/>
        <p>${data.Plot}</p>
        <button id="backButton">Retour</button>
      `;

      // Masquer les boutons de pagination
      paginationContainer.style.display = "none";

      // Afficher à nouveau les résultats et la pagination
      document.getElementById("backButton").addEventListener("click", () => {
        detailsContainer.innerHTML = "";
        displayResults(savedResults);
        displayPagination(totalPages);
        paginationContainer.style.display = "block";
      });
    });
}
