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
    this.favorisListContainer = document.getElementById("liste-favoris");
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

  displayDetails(movie, inFavoris, onBack, onAddFav, onRmvFav) {
    this.resultsContainer.innerHTML = "";
    if (movie) {
      console.log("movie in favoris: ", movie.inFavoris);
      if (!inFavoris) {
        this.resultsContainer.innerHTML = `<button id="addFav">Ajouter au favoris</button>`;
        document
          .getElementById("addFav")
          .addEventListener("click", () => onAddFav(movie.omdbID, movie.title));
      } else {
        this.resultsContainer.innerHTML = `<button id="rmvFav">Supprimer des favoris</button>`;
        document
          .getElementById("rmvFav")
          .addEventListener("click", () => onRmvFav(movie.omdbID));
      }
      this.detailsContainer.innerHTML += `
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

  /*  displayFavorisButton(movie,onClick, inFavoris) {
    this.resultsContainer.innerHTML = "";
    if (!inFavoris) {
      this.resultsContainer.innerHTML = `<button id="addFav">Ajouter au favoris</button>`;
      document
        .getElementById("addFav")
        .addEventListener("click", () => onClick(movie.omdbID, movie.title));
    } else {
      this.resultsContainer.innerHTML = `<button id="rmvFav">Supprimer des favoris</button>`;
      document
        .getElementById("rmvFav")
        .addEventListener("click", () => onClick(movie.omdbID));
    }
  }*/

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

  displayFavoris(favorislist, onRemove, onDetails) {
    this.favorisListContainer.innerHTML = "";
    console.log("favorislistlenght: ", favorislist.length);
    console.log("favorislist: ", favorislist);
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
        removeButton.src = "../../images/croix.svg";
        removeButton.addEventListener("click", () => onRemove(item.idOmdb));

        li.appendChild(link);
        li.appendChild(removeButton);
        this.favorisListContainer.appendChild(li);
      });
    }
  }

  onDetails() {
    return this.detailsContainer;
  }
}
