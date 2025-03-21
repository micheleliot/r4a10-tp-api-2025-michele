class Movie {
  constructor(data) {
    this.title = data.Title;
    this.year = data.Year;
    this.poster = data.Poster;
    this.genre = data.Genre;
    this.plot = data.Plot;
    this.runtime = data.Runtime;
    this.director = data.Director;
    this.Writer = data.Writer;
    this.actors = data.Actors;
    this.Language = data.Language;
    this.awards = data.Awards;
    this.ratings = data.Ratings;
  }

  getTitle() {
    return this.title;
  }

  getYear() {
    return this.year;
  }

  getPoster() {
    return this.poster;
  }

  getGenre() {
    return this.genre;
  }

  getPlot() {
    return this.plot;
  }

  getRuntime() {
    return this.runtime;
  }

  getDirector() {
    return this.director;
  }

  getWriter() {
    return this.Writer;
  }

  getActors() {
    return this.actors;
  }

  getLanguage() {
    return this.Language;
  }

  getAwards() {
    return this.awards;
  }

  getRatings() {
    return this.ratings;
  }
}
