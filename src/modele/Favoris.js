export class Favoris {
  constructor() {
    this.localStorageKey = "favoris";
  }

  add(idOmdb, titre) {
    const favoris = this.getAll();
    const nouvelElement = { idOmdb, titre };
    if (!favoris.some((fav) => fav.idOmdb === idOmdb)) {
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
    const validFavoris = favoris.filter((fav) => fav.idOmdb && fav.titre);
    localStorage.setItem(this.localStorageKey, JSON.stringify(validFavoris));
  }

  isPresent(idOmdb) {
    const favoris = this.getAll();
    return favoris.some((fav) => {
      return fav.idOmdb === idOmdb; // Retourne vrai si les ids sont égaux
    });
  }
}
