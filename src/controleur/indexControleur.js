import { Movie } from "../modèle/Movie.js";
import { View } from "../view/View.js";
import { Search } from "../modèle/Search.js";
import { Favoris } from "../modèle/Favoris.js";

export class IndexController {
  constructor(searchModel, view, favoris) {
    this.searchModel = searchModel;
    this.view = view;
    this.favoris = favoris;
    this.totalResults = 0;
    this.totalPages = 0;
    this.pageRangeStart = 1;
    this.currentPage = 1;
    this.savedResults = [];
    this.currentMovie = null;
    this.view.searchButton.addEventListener("click", () => this.handleSearch());
  }

  async handleSearch() {
    const query = this.view.searchInput.value.trim();
    const year = this.view.yearInput.value.trim();
    const type = this.view.typeSelect.value;
    if (!query) return;
    const data = await this.searchModel.searchByQuery(
      query,
      year,
      type,
      this.currentPage
    );
    if (data == null || data.Response !== "True") {
      this.view.resultsContainer.innerHTML =
        "<p>Aucun résultat trouvé ou erreur lors de la recherche.</p>";
      return;
    } else {
      this.savedResults = data.Search;
      this.totalResults = parseInt(data.totalResults, 10);
      this.totalPages = Math.ceil(this.totalResults / 10);
      this.view.displayResults(this.savedResults, (id) =>
        this.handleDetails(id)
      );
      this.addPagination();
    }
  }

  async handleDetails(imdbID) {
    let data = await this.searchModel.searchById(imdbID);
    let movie = new Movie(data, this.favoris);
    this.currentMovie = movie;
    let inFavoris = this.favoris.isPresent(movie.omdbID);
    this.view.displayDetails(
      movie,
      inFavoris,
      () => this.handleBack(),
      (id, title) => this.addFavoris(id, title),
      (id) => this.removeFavoris(id)
    );
  }

  handleBack() {
    console.log("Retour à la liste des résultats.", this.savedResults);
    this.view.displayResults(this.savedResults, () => this.handleDetails());
    this.addPagination();
  }

  handlePageChange(page) {
    this.currentPage = page;
    this.handleSearch();
  }

  addPagination() {
    let startPage = this.currentPage == 1 ? 1 : this.currentPage - 5;

    if (startPage > this.totalPages - 5) startPage = this.totalPages - 5;
    console.log("startPage: ", startPage);
    this.view.displayPagination(
      startPage,
      startPage + 9,
      this.currentPage,
      (page) => this.handlePageChange(page)
    );
  }

  removeFavoris(id) {
    this.favoris.remove(id);
    this.refreshFavoris(false);
  }

  addFavoris(id, title) {
    this.favoris.add(id, title);
    this.refreshFavoris(true);
  }

  refreshFavoris(inFavoris) {
    this.view.displayFavoris(
      this.favoris.getAll(),
      (id) => this.removeFavoris(id),
      (id) => this.handleDetails(id)
    );
    if (this.currentMovie) {
      this.view.onDetails(
        this.currentMovie,
        inFavoris,
        () => this.handleBack(),
        (id, title) => this.addFavoris(id, title),
        (id) => this.removeFavoris(id)
      );
    }
  }
}

// Initialisation
document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "526ecc96";
  const favoris = new Favoris();
  const searchModel = new Search(apiKey);
  const view = new View();
  const controler = new IndexController(searchModel, view, favoris);
  console.log("favoris: ", controler.favoris.getAll());
  view.displayFavoris(
    favoris.getAll(),
    (id) => controler.removeFavoris(id),
    (id) => controler.handleDetails(id)
  );
});
