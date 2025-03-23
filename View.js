// View
class MovieView {
  constructor() {
    this.searchInput = document.getElementById("searchInput");
    this.yearInput = document.getElementById("yearInput");
    this.typeSelect = document.getElementById("typeSelect");
    this.searchButton = document.getElementById("searchButton");
    this.resultsContainer = document.getElementById("results");
    this.detailsContainer = document.getElementById("details");
    this.paginationContainer = document.getElementById("paginationContainer");
  }

  displayResults(filmList, onClick) {
    this.resultsContainer.innerHTML = "";
    this.detailsContainer.innerHTML = "";
    filmList.forEach((item) => {
      const div = document.createElement("div");
      div.textContent = `${item.Title} (${item.Year})`;
      div.style.cursor = "pointer";
      div.addEventListener("click", () => onClick(item.imdbID));
      this.resultsContainer.appendChild(div);
    });
  }

  displayDetails(movie, onBack) {
    this.resultsContainer.innerHTML = "";
    this.detailsContainer.innerHTML = `
      <h2>${movie.Title} (${movie.Year})</h2>

      <img src="${movie.Poster}" alt="Affiche"/>
      <p>${movie.Plot}</p>
      <button id="backButton">Retour</button>
    `;
    document.getElementById("backButton").addEventListener("click", onBack);
  }

  displayPagination(currentPage, totalPages, onPageClick) {
    this.paginationContainer.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement("button");
      button.textContent = i;
      button.disabled = i === currentPage;
      button.addEventListener("click", () => onPageClick(i));
      this.paginationContainer.appendChild(button);
    }
  }
}
