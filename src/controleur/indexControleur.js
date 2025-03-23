import { Movie } from "../modèle/Movie.js";
import { View } from "../view/View.js";
import { Search } from "../modèle/Search.js";

export class IndexController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.totalResults = 0;
    this.totalPages = 0;
    this.pageRangeStart = 1;
    this.currentPage = 1;
    this.savedResults = [];
    this.view.searchButton.addEventListener("click", () => this.handleSearch());
  }

  async handleSearch() {
    const query = this.view.searchInput.value.trim();
    const year = this.view.yearInput.value.trim();
    const type = this.view.typeSelect.value;
    if (!query) return;
    console.log("Bouton cliqué !");
    const data = await this.model.searchByQuery(
      query,
      year,
      type,
      this.currentPage
    );
    console.log("data: ", data);
    if (data == null || data.Response !== "True") {
      this.view.resultsContainer.innerHTML =
        "<p>Aucun résultat trouvé ou erreur lors de la recherche.</p>";
      return;
    } else {
      console.log("Données reçues:", data);
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
    console.log("Détails du film:", imdbID);
    const data = await this.model.searchById(imdbID);
    const movie = new Movie(data);
    this.view.displayDetails(movie, () => this.handleBack());
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
}

// Initialisation
document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "526ecc96";
  const searchModel = new Search(apiKey);
  const view = new View();
  const controller = new IndexController(searchModel, view);
  const favoris = new Favoris();
  view.setFavoris(favoris);
});
