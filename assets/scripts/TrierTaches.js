import App from "./App.js";
export class TrierTaches extends App {
  constructor(el) {
    super();
    this._el = el;
    this._elTaches = document.querySelector("[data-js-taches]");

    this.init();
  }

  /**
   * Initialise les comportements
   */
  init() {
    this._el.addEventListener(
      "click",
      function (e) {
        let ordre = e.target.dataset.jsTrier;
        this.trieTaches(ordre);
      }.bind(this)
    );
  }

  /**
   * Réordonne les elements et appelle la méthode pour injecter les tâches réordonnés
   * @param {String} propriete
   */
  trieTaches(propriete) {
    let data;
    let tache = {
      propriete: propriete,
    };
    if (propriete === "tache") {
      data = {
        action: "trierParTache",
        tache: tache,
      };
    }
    if (propriete === "importance") {
      data = {
        action: "trierParImportance",
        tache: tache,
      };
    }

    let oOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch("requetes/requetesAsync.php", oOptions)
      .then(function (reponse) {
        if (reponse.ok) return reponse.json();
        else throw new Error("La réponse n'est pas OK");
      })
      .then(
        function (data) {
          if (data) {
            this._elTaches.innerHTML = "";
            for (let i = 0; i < data.length; i++) {
              let tache = data[i];
              this.injecteTache(
                tache.tache,
                tache.description,
                tache.importance,
                data.id
              );
            }
          } else {
            console.log("error");
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
