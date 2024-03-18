import { Tache } from "./Tache.js";
export default class App {
  constructor() {}
  /**
   * Construit, injecte et lance les comportements de chaque nouvelle tâche
   * @param {String} tache
   * @param {String} description
   * @param {String} importance
   * @param {Int} id
   */
  injecteTache(tache, description, importance, id) {
    let dom = `<div data-js-tache=${id} >
      <p>
          <span>
              <small>Tâche : </small>${tache} 
          </span>

          <span>
              <small>Description : </small>${description}
          </span>
          <span>
              <small>Importance : </small>${importance}
          </span>
          <span data-js-actions>
              <button data-js-action="afficher">Afficher le détail</button>
              <button data-js-action="supprimer" data-js-id="${id}">Supprimer</button>
          </span>
      </p>
  </div>`;

    this._elTaches.insertAdjacentHTML("beforeend", dom);
    // Lance les comportements de la nouvelle tâche injectée
    new Tache(this._elTaches.lastElementChild, {
      tache,
      description,
      importance,
    });
  }
}
