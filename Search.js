class Search {
  constructor(query, year, type, page) {
    this.query = query;
    this.year = year;
    this.type = type;
    this.page = page;
  }

  searchByQuery() {
    let url = `https://www.omdbapi.com/?apikey=${TOKEN}&s=${query}&page=${page}`;
    if (year) url += `&y=${year}`;
    if (type !== "all") url += `&type=${type}`;

    let response = fetch(url);
    if (response.ok) {
      return response.json();
    } else {
      //gestion mauvaise requete
      return; //TODO
    }
  }

  searchById(imdbID) {
    let url = `https://www.omdbapi.com/?apikey=${TOKEN}&i=${imdbID}`;
    let response = fetch(url);
    if (response.ok) {
      return response.json();
    } else {
      //gestion mauvaise requete
      return; //TODO
    }
  }
}
