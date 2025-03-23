export class Favoris {
  constructor() {
    this.localStorageKey = "favoris";
  }

  add(idOmdb, titre) {
    const favoris = this.lire();
    const nouvelElement = { idOmdb, titre };
    if (!favoris.some((fav) => fav.idOmdb === idOmdb)) {
      favoris.push(nouvelElement);
      this.sauvegarder(favoris);
    }
  }

  remove(idOmdb) {
    const favoris = this.lire();
    const index = favoris.indexOf(idOmdb);
    if (index !== -1) {
      favoris.splice(index, 1);
      this.sauvegarder(favoris);
    }
  }

  getAll() {
    const favoris = localStorage.getItem(this.localStorageKey);
    return favoris ? JSON.parse(favoris) : [];
  }

  save(favoris) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(favoris));
  }
}
