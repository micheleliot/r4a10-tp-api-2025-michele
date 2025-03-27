export class View {
  constructor() {
    this.searchInput = document.getElementById("searchInput");
    this.yearInput = document.getElementById("yearInput");
    this.typeSelect = document.getElementById("typeSelect");
    this.searchButton = document.getElementById("searchButton");
    this.resultsContainer = document.getElementById("results");
    this.detailsFavorisBtn = document.getElementById("detailsFavorisBtn");
    this.detailsContainer = document.getElementById("detailsContent");
    this.paginationContainer = document.getElementById("paginationContainer");
    this.favorisListContainer = document.getElementById("liste-favoris");
  }
  // affichage de la liste des films ou des series lors d'une recherche
  displayResults(filmList, onClick) {
    this.resultsContainer.innerHTML = "";
    this.detailsContainer.innerHTML = "";

    filmList.forEach((item) => {
      const div = document.createElement("div");
      div.classList.add("movie-card");
      div.addEventListener("click", () => onClick(item.imdbID));

      const img = document.createElement("img");
      img.src =
        item.Poster && item.Poster !== "N/A"
          ? item.Poster
          : "./images/affiche-non-disponible.jpg";
      img.alt = "./images/affiche-non-disponible.jpg";

      const title = document.createElement("p");
      title.textContent = item.Title;
      title.style.fontWeight = "bold";

      const year = document.createElement("p");
      year.textContent = `(${item.Year})`;
      year.classList.add("year");

      div.appendChild(img);
      div.appendChild(title);
      div.appendChild(year);
      this.resultsContainer.appendChild(div);
    });
  }

  displayDetails(movie, onBack) {
    if (movie) {
      this.resultsContainer.innerHTML = "";
      this.detailsContainer.innerHTML = `
        <h2>${movie.getTitle()} (${movie.getYear()})</h2>
        <div class="details-container">
          <img src="${movie.getPoster()}" alt="./images/affiche-non-disponible.jpg">
          <div>
            <p><strong>Genre:</strong> ${movie.getGenre()}</p>
            <p><strong>Durée:</strong> ${movie.getRuntime()}</p>
            <p><strong>Directeur:</strong> ${movie.getDirector()}</p>
            <p><strong>Scénario:</strong> ${movie.getWriter()}</p>
            <p><strong>Acteurs:</strong> ${movie.getActors()}</p>
            <p><strong>Langue:</strong> ${movie.getLanguage()}</p>
            <div id="ratings"></div>
          </div>
        </div>
        <p>${movie.getPlot()}</p>
        <button id="backButton">Retour</button>
      `;
      document.getElementById("backButton").addEventListener("click", onBack);
      this.displayRatings(movie.ratings);
    } else {
      this.displayProblem("Impossible de charger les détails.");
    }
  }

  displayFavorisButton(movie, onClickAdd, onClickRmv, inFavoris) {
    this.detailsFavorisBtn.innerHTML = "";
    console.log(inFavoris);
    if (!inFavoris) {
      console.log("add");
      this.detailsFavorisBtn.innerHTML = `
        <button id="addFav" class="favoris-btn">
          <img class ="favoris-icon" src="./images/etoile-vide.svg"> Ajouter aux favoris
        </button>`;
      document
        .getElementById("addFav")
        .addEventListener("click", () => onClickAdd(movie.omdbID, movie.title));
    } else {
      console.log("remove");
      this.detailsFavorisBtn.innerHTML = `
        <button id="rmvFav" class="favoris-btn"">
          <img class ="favoris-icon" src="./images/etoile-pleine.svg"> Supprimer des favoris
        </button>`;
      document
        .getElementById("rmvFav")
        .addEventListener("click", () => onClickRmv(movie.omdbID));
    }
  }

  disabledFavorisButton() {
    this.detailsFavorisBtn.innerHTML = "";
  }

  displayPagination(firstPage, lastPage, currentPage, onPageClick) {
    this.paginationContainer.innerHTML = "";
    for (let i = firstPage; i <= lastPage; i++) {
      const button = document.createElement("button");
      button.textContent = i;
      button.disabled = i === currentPage;
      button.addEventListener("click", () => onPageClick(i));
      this.paginationContainer.appendChild(button);
    }
  }
  disabledpagination() {
    this.paginationContainer.innerHTML = "";
  }

  displayFavoris(favorislist, onRemove, onDetails) {
    this.favorisListContainer.innerHTML = "";
    if (favorislist.length === 0) {
      this.favorisListContainer.innerHTML =
        "<p>Aucun favoris pour le moment.</p>";
    } else {
      favorislist.forEach((item) => {
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.textContent = item.titre;
        link.addEventListener("click", () => onDetails(item.idOmdb));

        const removeButton = document.createElement("img");
        removeButton.src = "./images/croix.svg";
        removeButton.addEventListener("click", () => onRemove(item.idOmdb));

        li.appendChild(link);
        li.appendChild(removeButton);
        this.favorisListContainer.appendChild(li);
      });
    }
  }

  //affichage des notes d'un film ou d'une serie
  displayRatings(ratings) {
    const ratingsDiv = document.getElementById("ratings");
    ratingsDiv.innerHTML = "<p><strong>Critique:</strong></p>";
    ratings.forEach((rating) => {
      ratingsDiv.innerHTML += `<p>${rating.Source}: ${rating.Value}</p>`;
    });
  }

  displayProblem(message) {
    alert("Aucun résultat trouvé ou erreur lors de la recherche.");
  }
}
