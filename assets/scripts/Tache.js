export class Tache {
  #_index;
  #_elActions;
  #_tacheInfo;
  #_elTaches;
  constructor(el, { tache, description, importance }) {
    this._el = el;
    this.#_index = this._el.dataset.jsTache;
    this.#_elActions = this._el.querySelector("[data-js-actions]");
    this.#_tacheInfo = { tache, description, importance };
    this._elTaches = this._el.closest("[data-js-taches]");
    this._elTache = this._el.querySelector("[data-js-tache]");
    this.#_elTaches = document.querySelector("[data-js-tache-detail]");
    this.supprimeTache = this.supprimeTache.bind(this);
    this.afficheDetail = this.afficheDetail.bind(this);
    this.init();
  }

  /**
   * Initialise les comportements
   */
  init() {
    this.#_elActions.addEventListener(
      "click",
      function (e) {
        if (e.target.dataset.jsAction == "afficher") this.afficheDetail();
        else if (e.target.dataset.jsAction == "supprimer") this.supprimeTache();
      }.bind(this)
    );
  }

  /**
   * Affiche le détail d'une tâche
   */
  afficheDetail() {
    let elDetailDom = `<div class="detail__info">
                                <p><small>Tâche : </small>${
                                  this.#_tacheInfo.tache
                                }</p>
                                <p><small>Description : </small>${
                                  this.#_tacheInfo.description
                                    ? this.#_tacheInfo.description
                                    : "Aucune description disponible."
                                }</p>
                                <p><small>Importance : </small>${
                                  this.#_tacheInfo.importance
                                }</p>
                            </div>`;

    this.#_elTaches.innerHTML = elDetailDom;
  }

  /**
   * Supprime la tâche dans la bd et appelle la méthode pour injecter les tâches mises à jour
   */
  supprimeTache() {
    let tache = {
      id: this.#_index,
    };

    let data = {
      action: "supprimeTaches",
      tache: tache,
    };
    let oOptions = {
      method: "POST",
      headers: {
        "Content-Type": " application/json",
      },
      body: JSON.stringify(data),
    };
    fetch("requetes/requetesAsync.php", oOptions)
      .then(function (reponse) {
        if (reponse.ok) {
          return reponse.json();
        } else throw new Error("La réponse n'est pas OK");
      })
      .then(
        function (data) {
          if (data) {
            this._el.innerHTML = "";
            this.#_elTaches.innerHTML = "";
          }
        }.bind(this)
      )
      .catch(function (erreur) {
        console.log(
          `Il y a eu un problème avec l'opération fetch: ${erreur.message}`
        );
      });
  }
}
