import { IndexController } from "./controleur/indexControleur.js";
import { Search } from "./modele/Search.js";
import { View } from "./view/View.js";
import { Favoris } from "./modele/Favoris.js";

//initialisation des composants de l'application au chargement du DOM
document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "526ecc96";
  const favoris = new Favoris();
  const searchModel = new Search(apiKey);
  const view = new View();
  const controler = new IndexController(searchModel, view, favoris);

  view.displayFavoris(
    favoris.getAll(),
    (id) => controler.removeFavoris(id),
    (id) => controler.handleDetails(id)
  );
  view.searchInput.addEventListener("keydown", (event) =>
    controler.EnterSearch(event)
  );
  view.yearInput.addEventListener("keydown", (event) =>
    controler.EnterSearch(event)
  );
});
