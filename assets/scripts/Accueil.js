class Accueil {
  #_elMain;

  constructor() {
    this.#_elMain = document.querySelector("main");
    this.accueil = this.accueil.bind(this);
  }

  /**
   * Contenu de la page d'acceuil
   */
  accueil() {
    this.#_elMain.innerHTML = "<h3>Acceuil</h3>";
  }
}

export const { accueil } = new Accueil();
