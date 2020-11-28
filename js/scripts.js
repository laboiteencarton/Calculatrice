// variable globales
// elements mémorie et écran

const memoireElt = document.querySelector('#memoire');
const ecranElt = document.querySelector('#ecran');

// On stock la valeur de l'écran précédent
let precedent = 0;

// On stock l'affichage
let affichage = "";
// On stock l'operation
let operation = null;
// On initialise la mémoire
let memoire; 
window.onload=()=> {
    // On écoute les clics sur les touches 
    let touches = document.querySelectorAll("span");

    for(let touche of touches) {
        touche.addEventListener('click', gererTouches);
    }
    // on ecoute le clavier
    document.addEventListener("keydown", gererTouches);
    // on récupere la mémoire de stockage local
    memoire = (localStorage.memoire) ? parseFloat (localStorage.memoire) : 0;
    if (memoire != 0) memoireElt.style.display = "initial";
}


// CETTE FONCTION REAGIS AU CLIC SUR TOUCHES 

function gererTouches(event){
    let touche;
    // On liste les touches autorisées 
    const listeTouches = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "*", "/", ".", "Enter", "Escape"]
    // on verifie si on à levent keydown
    if(event.type === "keydown") {
        // On compare la touche appuyée aux touches autorisées
        if(listeTouches.includes(event.key)){
            // on empeche l'utilisation par defaut de la touche
            event.preventDefault();
            // on stock la touche choisie dans la variable touche
            touche = event.key;
        }
    }else {
        touche = this.innerText;
    }

    // on vérfifie si c'est un chiffre ou .
    if(parseFloat(touche) >= 0 || touche === ".") {
        
        // On met à jours la valeur d'affichage 
        // et on affiche sur l'écran

        affichage = (affichage === "") ? touche.toString(): affichage + touche.toString();
        ecranElt.innerText = affichage;
    } else {
        switch(touche) {
            // Reset 
            case "C":
                precedent = 0;
                affichage = "";
                operation = null
                ecranElt.innerText = 0;
                break;

                // Calculs 
                case "+":
                case "-":
                case "*":
                case "/":
                    // on calcule la valeur resultat de l'etape précedente

                  precedent = (precedent === 0) ? parseFloat(affichage) : 
                  calculer(precedent, parseFloat(affichage), operation);
                  // On met a jours l'écran 
                  ecranElt.innerText = precedent; 
                  // On stock l'operation
                  operation = touche;
                  // On réinitialise la variable d'affichage
                  affichage = "";
                  break;
                  case "=":
                      
                  precedent = (precedent === 0) ? parseFloat(affichage) : 
                  calculer(precedent, parseFloat(affichage), operation);
                  // On met a jours l'écran 
                  ecranElt.innerText = precedent; 
                  // On stock le resultart dans la variable d'affichage
                  affichage = precedent;
                  // On réinitialise précédent
                  precedent = 0;
                  break;

                  // On gere la mémoire
                  case "M+":
                      // On stock en additionnant à la valeur deja en mémoire
                     localStorage.memoire = (localStorage.memoire) ? parseFloat
                     (localStorage.memoire) + parseFloat(affichage): parseFloat
                     (affichage);
                     // On affiche le M 
                        memoireElt.style.display = "initial";
                      break;
                      case "MC":
                          // on efface la memoire 
                          localStorage.memoire = 0.
                          // On efface le M 
                          memoireElt.style.display = "none";
                          break;

                          case "MR":
                              // on recupere la valeur stockée
                              memoire = (localStorage.memoire) ? parseFloat(localStorage.memoire) : 0;
                              affichage = memoire;
                              ecranElt.innerText = memoire;
                              break;
        }
    }
}


/**
 * Effectue le calcul
 * @param {number} nb1 
 * @param {number} nb2 
 * @param {string} operation 
 * @returns number
 */

function calculer(nb1,nb2,operation) {
    nb1 = parseFloat(nb1);
    nb2 = parseFloat(nb2);
    if(operation === "+") return nb1 + nb2;
    if(operation === "-") return nb1 - nb2;
    if(operation === "*") return nb1 * nb2;
    if(operation === "/") return nb1 / nb2;
}