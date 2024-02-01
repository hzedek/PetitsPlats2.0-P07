const ingredientsBtn = document.getElementById("ingredients");
const AppareilsBtn = document.getElementById("Appareils");
const UstensilesBtn = document.getElementById("Ustensiles");
const ingredientsIcon = document.getElementById("ingredientsIcon");
const searchDOM = document.getElementById("search");

//RÉCUPÉRATION DES DONNÉES PAR BOUTTONS ET CRITÈRES
searchDOM.addEventListener("input",()=>searchAlternative());
function searchAlternative() {
  if (searchDOM.value.length > 2) {
    let searchTerm = searchDOM.value;

    // Utilisez la méthode forEach pour créer un nouvel array avec les résultats de la recherche
    let resultatArray = [];
    recipes.forEach((recip) => {
      if (recip.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        resultatArray.push(recip);
      }
    
      if (recip.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        resultatArray.push(recip);
      }
    
      recip.ingredients.forEach((ingredient) => {
        if (ingredient.ingredient.toLowerCase().includes(searchTerm.toLowerCase())) {
          resultatArray.push(recip);
        }
      });
    });

    let sortedArray = sorting(resultatArray);
    init(sortedArray);
    if (sortedArray.length == 0) {
      cardContent.innerHTML = `<p>Aucune recette ne contient "${searchTerm}"vous pouvez chercher «tarte aux pommes », « poisson », etc..</p>`;
    }
    return sortedArray;
    
  } else init([...recipes]);
}
function sorting(array) {
  const uniqueElements = {};
  const sortedArray = array.filter((result) => {
    // Si l'élément n'est pas déjà présent, l'ajouter à l'objet et inclure l'élément
    if (!uniqueElements[result.id]) {
      uniqueElements[result.id] = true;
      return true;
    }
    // Sinon, l'élément est un doublon, ne pas l'inclure
    return false;
  });
  return sortedArray;
}
function createLi(ul, array) {
  let idLi = ul;
  let divLi = ul.children[2];
  divLi.innerHTML = "";
  let listLi = [];
  for (let i = 0; i < array.length; i++) {
    if (idLi === AppareilsBtn) {
      itemLi = array[i].appliance;
      listLi.push(itemLi.toLowerCase());
    }
    if (UstensilesBtn === idLi) {
      let Ustensiles = array[i].ustensils;
      for (let x = 0; x < Ustensiles.length; x++) {
        itemLi = Ustensiles[x];
        listLi.push(itemLi.toLowerCase());
      }
    }
    if (ingredientsBtn === idLi) {
      let ingredients = array[i].ingredients;
      for (let x = 0; x < ingredients.length; x++) {
        itemLi = ingredients[x].ingredient;
        listLi.push(itemLi.toLowerCase());
      }
    }
  }
  let newlistLi = [...new Set(listLi)];
  for (let index = 0; index < newlistLi.length; index++) {
    const li = newlistLi[index];
    let li_dom = document.createElement("li");
    li_dom.textContent = li;
    divLi.appendChild(li_dom);
    li_dom.addEventListener("click", clickLi());
  }
}

function btnToggle(btn) {
  btn.style.display = btn.style.display === "none" ? "block" : "none";
  let icon = document.querySelector(`.${btn.id}`);
  //SWITCH Chevron UP&DOWN -------------------------
  if (btn.style.display === "block") {
    icon.classList.remove("fa-chevron-down");
    icon.classList.add("fa-chevron-up");
  } else {
    icon.classList.remove("fa-chevron-up");
    icon.classList.add("fa-chevron-down");
  }
}

//NBR DE RECETTES
function nbrRecette(array){
const nbrRecettes = document.getElementById("recetteNbr");
if (array.length < 2) {
  nbrRecettes.textContent = array.length + " Recette";
} else {
  nbrRecettes.textContent = array.length + " Recettes";
}}

//<li> CHANGEMENT DE STYLE AU CLICK
function clickLi(){
let li = document.querySelectorAll("li");
li.forEach((element) => {
  element.addEventListener("click", () => {
    element.style.backgroundColor =
      element.style.backgroundColor === "" ? "#ffd15b" : "";
    element.style.margin = element.style.margin === "" ? "5px auto" : "";
  });
});}


//Fonction qui lance l'affichage de la page
function init(array) {
  cardContent.innerHTML = "";
  createLi(ingredientsBtn, array);
  createLi(AppareilsBtn, array);
  createLi(UstensilesBtn, array);
  nbrRecette(array);
  cardDisplay(array);
}
init([...recipes]);