export class Search {
  constructor(apiKey) {
    this.token = apiKey;
  }

  async searchByQuery(query, year, type, page) {
    let url = `https://www.omdbapi.com/?apikey=${this.token}&s=${query}&page=${page}`;
    if (year) url += `&y=${year}`;
    if (type !== "all") url += `&type=${type}`;

    try {
      const response = await fetch(url); // Attente de la réponse

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log("Données reçues:", data);
      return data;
    } catch (error) {
      console.error("Erreur lors de la recherche des films:", error);
      return null;
    }
  }

  async searchById(imdbID) {
    const url = `https://www.omdbapi.com/?apikey=${this.token}&i=${imdbID}`;
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log("Détails du film:", data);
      return data;
    } catch (error) {
      console.error("Erreur lors de la recherche par ID:", error);
      return null;
    }
  }
}
