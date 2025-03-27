// View
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

  displayResults(filmList, onClick) {
    this.resultsContainer.innerHTML = "";
    this.detailsContainer.innerHTML = "";

    this.resultsContainer.style.display = "grid";
    this.resultsContainer.style.gridTemplateColumns = "repeat(5, 1fr)";
    this.resultsContainer.style.gap = "20px";

    filmList.forEach((item) => {
      const div = document.createElement("div");
      div.style.cursor = "pointer";
      div.style.border = "1px solid #ccc";
      div.style.borderRadius = "10px";
      div.style.overflow = "hidden";
      div.style.textAlign = "center";
      div.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
      div.style.transition = "transform 0.3s ease";
      div.addEventListener(
        "mouseenter",
        () => (div.style.transform = "scale(1.05)")
      );
      div.addEventListener(
        "mouseleave",
        () => (div.style.transform = "scale(1)")
      );
      div.addEventListener("click", () => onClick(item.imdbID));

      const img = document.createElement("img");
      img.src =
        item.Poster && item.Poster !== "N/A"
          ? item.Poster
          : "../../images/affiche-non-disponible.jpg"; // Remplacez par le chemin de votre image par défaut
      img.alt = `Affiche de ${item.Title}`;
      img.style.width = "100%";
      img.style.height = "300px";
      img.style.objectFit = "cover";

      const title = document.createElement("p");
      title.textContent = item.Title;
      title.style.fontWeight = "bold";
      title.style.margin = "10px 0 5px";

      const year = document.createElement("p");
      year.textContent = `(${item.Year})`;
      year.style.color = "#555";
      year.style.marginBottom = "10px";

      div.appendChild(img);
      div.appendChild(title);
      div.appendChild(year);

      this.resultsContainer.appendChild(div);
    });
  }

  displayDetails(movie, onBack) {
    this.resultsContainer.innerHTML = "";
    if (movie) {
      this.detailsContainer.innerHTML = `
        <h2>${movie.getTitle()} (${movie.getYear()})</h2>
        <div style="display: flex; flex-direction: row;  align-items: flex-start; gap: 20px;">
          <img src="${movie.getPoster()}" alt="Affiche du film" style="max-width: 300px; height: auto;">
          <div>
            <p><strong>Genre:</strong> ${movie.getGenre()}</p>
            <p><strong>Durée:</strong> ${movie.getRuntime()}</p>
            <p><strong>Directeur:</strong> ${movie.getDirector()}</p>
            <p><strong>Scénario:</strong> ${movie.getWriter()}</p>
            <p><strong>Acteurs:</strong> ${movie.getActors()}</p>
            <p><strong>Langue:</strong> ${movie.getLanguage()}</p>
            <div id = "ratings"></div>
          </div>
        </div>
        <p>${movie.getPlot()}</p>
        <button id="backButton">Retour</button>
        `;
      document.getElementById("backButton").addEventListener("click", onBack);
      this.displayRatings(movie.ratings);
    } else {
      detailsContainer.innerHTML = `<p>Impossible de charger les détails.</p>`;
    }
  }

  displayFavorisButton(movie, onClickAdd, onClickRmv, inFavoris) {
    if (!inFavoris) {
      this.detailsFavorisBtn.innerHTML = `<button id="addFav">Ajouter au favoris</button>`;
      document
        .getElementById("addFav")
        .addEventListener("click", () => onClickAdd(movie.omdbID, movie.title));
    } else {
      this.detailsFavorisBtn.innerHTML = `<button id="rmvFav">Supprimer des favoris</button>`;
      document
        .getElementById("rmvFav")
        .addEventListener("click", () => onClickRmv(movie.omdbID));
    }
  }

  displayPagination(firstgPage, lastPages, currentPage, onPageClick) {
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

  displayRatings(ratings) {
    const ratingsDiv = document.getElementById("ratings");
    ratingsDiv.innerHTML = "<p><strong>Critique:</strong> </p>";
    if (ratings.length > 0) {
      ratings.forEach((rating) => {
        const ratingDiv = document.createElement("div");
        ratingDiv.innerHTML = `<p>${rating.Source}: ${rating.Value}</p>`;
        ratingsDiv.appendChild(ratingDiv);
      });
    } else {
      ratingsDiv.innerHTML += "<p>Pas de notes disponibles</p>";
    }
  }
}
