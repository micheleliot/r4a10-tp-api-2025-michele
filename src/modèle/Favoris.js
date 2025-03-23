export class Favoris {
  constructor() {
    this.localStorageKey = "favoris";
  }

  add(idOmdb, titre) {
    const favoris = this.getAll();
    const nouvelElement = { idOmdb, titre };
    if (!favoris.some((fav) => fav.idOmdb === idOmdb)) {
      console.log("ajout");
      favoris.push(nouvelElement);
      this.save(favoris);
    }
  }

  remove(idOmdb) {
    const favoris = this.getAll();
    const index = favoris.findIndex((fav) => fav.idOmdb === idOmdb);
    if (index !== -1) {
      favoris.splice(index, 1);
      this.save(favoris);
    }
  }

  getAll() {
    const favoris = localStorage.getItem(this.localStorageKey);
    return favoris ? JSON.parse(favoris) : [];
  }

  save(favoris) {
    console.log("favoris avant filtre: ", favoris);
    const validFavoris = favoris.filter((fav) => fav.idOmdb && fav.titre);
    console.log("favoris apres filtre: ", favoris);
    localStorage.setItem(this.localStorageKey, JSON.stringify(validFavoris));
  }

  isPresent(idOmdb) {
    const favoris = this.getAll();
    return favoris.some((fav) => {
      console.log("Vérification du favori:", fav); // Affiche chaque objet `fav` dans le tableau `favoris`
      console.log("Comparaison idOmdb:", fav.idOmdb, "avec", idOmdb); // Affiche l'idOmdb du favori et celui passé en paramètre
      return fav.idOmdb === idOmdb; // Retourne vrai si les ids sont égaux
    });
  }
}
