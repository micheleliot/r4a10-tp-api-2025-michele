import { Movie } from "../modele/Movie.js";

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
  // récupération des données de l'API et affichage des résultats
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
      this.view.displayProblem("Aucun résultat trouvé");
      return;
    } else {
      this.savedResults = data.Search;
      this.totalResults = parseInt(data.totalResults, 10);
      this.totalPages = Math.ceil(this.totalResults / 10);
      this.view.displayResults(this.savedResults, (id) =>
        this.handleDetails(id)
      );
      this.view.disabledFavorisButton();
      this.pagination(true);
    }
  }

  async handleDetails(imdbID) {
    let data = await this.searchModel.searchById(imdbID);
    let movie = new Movie(data, this.favoris);
    this.currentMovie = movie;
    this.view.displayFavorisButton(
      movie,
      (id, title) => this.addFavoris(id, title),
      (id) => this.removeFavoris(id),
      this.favoris.isPresent(imdbID)
    );
    this.view.displayDetails(movie, () => this.handleBack());
    this.view.disabledpagination();
  }
  // retour à la liste des résultats apres affichage des détails
  handleBack() {
    this.view.displayResults(this.savedResults, (id) => this.handleDetails(id));
    this.view.disabledFavorisButton();
    this.pagination(true);
  }

  handlePageChange(page) {
    this.currentPage = page;
    this.handleSearch();
  }

  pagination() {
    let startPage = this.currentPage <= 5 ? 1 : this.currentPage - 5;
    let endPage =
      (this.totalPages <= 9) | (startPage + 9 > this.totalPages)
        ? this.totalPages
        : startPage + 9;
    this.view.displayPagination(startPage, endPage, this.currentPage, (page) =>
      this.handlePageChange(page)
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
  //réaffichage des favoris après ajout ou suppression
  refreshFavoris(inFavoris) {
    this.view.displayFavoris(
      this.favoris.getAll(),
      (id) => this.removeFavoris(id),
      (id) => this.handleDetails(id)
    );
    if (this.currentMovie) {
      this.view.displayFavorisButton(
        this.currentMovie,
        (id, title) => this.addFavoris(id, title),
        (id) => this.removeFavoris(id),
        inFavoris
      );
    }
  }
}
