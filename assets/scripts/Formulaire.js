import App from "./App.js";

export class Formulaire extends App {
  #_el;
  #_elsInputImportance;
  #_elInputTache;
  #_elInputDescription;
  constructor(el) {
    super();
    this._el = el;
    this.#_elInputTache = this._el.tache;
    this.#_elInputDescription = this._el.description;
    this.#_elsInputImportance = this._el.querySelectorAll(
      'input[name="importance"]'
    );
    this._elBouton = this._el.querySelector("[data-js-btn]");

    this._elTaches = document.querySelector("[data-js-taches]");

    this.init();
  }

  /**
   * Initialise les comportements
   */
  init() {
    this._elBouton.addEventListener(
      "click",
      function (e) {
        e.preventDefault();

        /* Si valide */
        let estValide = this.valideFormulaire();
        if (estValide) {
          this.ajouteTache();
          this._el.reset();
        }
      }.bind(this)
    );
  }

  /**
   * Validation du formulaire
   * @returns
   */
  valideFormulaire() {
    let estValide = true;

    /* Input 'Nouvelle tâche' */
    if (this.#_elInputTache.value == "") {
      this.#_elInputTache.parentNode.classList.add("error");
      estValide = false;
    } else {
      if (this.#_elInputTache.parentNode.classList.contains("error"))
        this.#_elInputTache.parentNode.classList.remove("error");
    }

    /* Inputs Radio 'Importance' */
    let elCheckedImportance = this._el.querySelector(
      'input[name="importance"]:checked'
    );

    if (elCheckedImportance) {
      if (this.#_elsInputImportance[0].parentNode.classList.contains("error"))
        this.#_elsInputImportance[0].parentNode.classList.remove("error");
    } else {
      this.#_elsInputImportance[0].parentNode.classList.add("error");
      estValide = false;
    }

    return estValide;
  }

  /**
   * Ajoute la tâche à la db et appelle la méthode pour injecter la nouvelle tâche
   */
  ajouteTache() {
    let tache = {
      tache: this.#_elInputTache.value,
      description: this.#_elInputDescription.value,
      importance: this._el.querySelector('input[name="importance"]:checked')
        .value,
    };

    let data = {
      action: "getTaches",
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
        if (reponse.ok) return reponse.json();
        else throw new Error("La réponse n'est pas OK");
      })
      .then(
        function (data) {
          if (data) {
            // console.log(data);
            this.injecteTache(
              data.tache,
              data.description,
              data.importance,
              data.id
            );
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
