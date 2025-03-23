// View
export class View {
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
    console.log("filmList: ", filmList);
    filmList.forEach((item) => {
      console.log("item: ", item);
      const div = document.createElement("div");
      div.textContent = `${item.Title} (${item.Year})`;
      div.style.cursor = "pointer";
      div.addEventListener("click", () => onClick(item.imdbID));
      this.resultsContainer.appendChild(div);
    });
  }

  displayDetails(movie, onBack) {
    this.resultsContainer.innerHTML = "";
    if (movie) {
      this.detailsContainer.innerHTML = `
        <h2>${movie.getTitle()} (${movie.getYear()})</h2>
        <img src="${movie.getPoster()}" alt="Affiche du film">
        <p>${movie.getPlot()}</p>
        <p><strong>Genre:</strong> ${movie.getGenre()}</p>
        <p><strong>Runtime:</strong> ${movie.getRuntime()}</p>
        <p><strong>Director:</strong> ${movie.getDirector()}</p>
        <p><strong>Writer:</strong> ${movie.getWriter()}</p>
        <p><strong>Actors:</strong> ${movie.getActors()}</p>
        <p><strong>Language:</strong> ${movie.getLanguage()}</p>
        <p><strong>Awards:</strong> ${movie.getAwards()}</p>
        <p><strong>Ratings:</strong> ${JSON.stringify(movie.getRatings())}</p>
        <button id="backButton">Retour</button>
        `;
      document.getElementById("backButton").addEventListener("click", onBack);
    } else {
      detailsContainer.innerHTML = `<p>Impossible de charger les détails.</p>`;
    }
  }

  displayPagination(firstgPage, lastPages, currentPage, onPageClick) {
    console.log("firstPage: ", firstgPage);
    console.log("lastPages: ", lastPages);
    this.paginationContainer.innerHTML = "";
    for (let i = firstgPage; i <= lastPages; i++) {
      const button = document.createElement("button");
      button.textContent = i;
      button.disabled = i === currentPage;
      button.addEventListener("click", () => onPageClick(i));
      this.paginationContainer.appendChild(button);
    }
  }
}
