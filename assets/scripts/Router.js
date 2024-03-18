import { accueil } from "./Accueil.js";
import { erreur404 } from "./erreur404.js";
import App from "./App.js";

export default class Router {
  #_routes;
  #_elH1;

  constructor(el) {
    // console.log(" to Dentro do construtor do Router");
    this.#_routes = [
      // ["/affiche", injecteTache],
    ];
    this._app = new App(); //
    this.#_elH1 = document.querySelector("h1");
    this._elAjouterBtn = document.querySelector("[data-js-btn]");
    this.#init();
    this.gereHashbang();
  }

  #init() {
    this.gereHashbang();

    this.#_elH1.addEventListener("click", function (e) {
      console.log("cliclou h1");
      location = "#!/accueil";
    });

    // this._elAjouterBtn.addEventListener("click", function() {
    //     console.log("Clicou no botão adicionar");
    //     location.hash = "#!/affiche";
    // }.bind(this));

    window.addEventListener(
      "hashchange",
      function () {
        this.gereHashbang();
      }.bind(this)
    );
  }

  /**
   * Gestion du fragment d'url suite à au #! pour appeler le comportement de la route correspondante.
   */
  gereHashbang() {
    let hash = location.hash.slice(2);
    let isRoute = false;

    //location : objet du window qui permet de traiter l'url.
    // console.log(hash);
    if (hash.endsWith("/")) {
      hash = hash.slice(0, -1);
    }

    /** Pour chaque route, est-ce qu'il y a une correspondance avec le hash courant */
    for (let i = 0; i < this.#_routes.length; i++) {
      let route = this.#_routes[i][0],
        isId = false,
        hashSansId;

      //   console.log(route);
      if (route.indexOf(":") > -1) {
        route = route.slice(0, route.indexOf("/:"));
        hashSansId = hash.slice(0, hash.lastIndexOf("/"));
        isId = true;
      }

      if (route == hash || route == hashSansId) {
        let hashInArray = hash.split(route);
        if (hashInArray[1]) {
          if (isId) {
            let id = hashInArray[1].slice(1);
            this.#_routes[i][1](id);
            isRoute = true;
            return id;
          }
        } else {
          if (hash == this.#_routes[i][0]) {
            console.log("pas id");
            this.#_routes[i][1]();
            isRoute = true;
          }
        }
      }
    }
  }
}
