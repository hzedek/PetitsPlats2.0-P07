const ingredientsBtn = document.getElementById("ingredients");
const AppareilsBtn = document.getElementById("Appareils");
const UstensilesBtn = document.getElementById("Ustensiles");
const ingredientsIcon = document.getElementById("ingredientsIcon");
const searchDOM = document.getElementById("search");

//RÉCUPÉRATION DES DONNÉES PAR BOUTTONS ET CRITÈRES
function createLi(array) {
  ingredientsBtn.innerHTML=`<input
  id="searchIngredients"
  type="text"
  name="search"
  class="smallSearch"
/>
<i class="fa-solid fa-magnifying-glass"></i>`;
  UstensilesBtn.innerHTML=`<input
  id="searchUstensiles"
  type="text"
  name="search"
  class="smallSearch"
/>
<i class="fa-solid fa-magnifying-glass"></i>`;
  AppareilsBtn.innerHTML=`<input
  id="searchAppareils"
  type="text"
  name="search"
  class="smallSearch"
/>
<i class="fa-solid fa-magnifying-glass"></i>`;

  let ingredientsLi = [];
for (let i = 0; i < array.length; i++) {
  let ingredients = array[i].ingredients;
  for (let x = 0; x < ingredients.length; x++) {
    let ingredient = ingredients[x].ingredient;
    ingredientsLi.push(ingredient);
  }
}
let newIngredientsLi = [...new Set(ingredientsLi)];
for (let index = 0; index < newIngredientsLi.length; index++) {
  const li = newIngredientsLi[index];
  let li_dom = document.createElement("li");
  li_dom.textContent = li;
  ingredientsBtn.appendChild(li_dom);
}

let AppareilsLi = [];
for (let i = 0; i < array.length; i++) {
  let Appareils = array[i].appliance;
  AppareilsLi.push(Appareils);
}
let newAppareilsLi = [...new Set(AppareilsLi)];
for (let index = 0; index < newAppareilsLi.length; index++) {
  const li = newAppareilsLi[index];
  let li_dom = document.createElement("li");
  li_dom.textContent = li;
  AppareilsBtn.appendChild(li_dom);
}

const UstensilesLi = [];
for (let i = 0; i < array.length; i++) {
  let Ustensiles = array[i].ustensils;
  for (let x = 0; x < Ustensiles.length; x++) {
    let Ustensile = Ustensiles[x];
    UstensilesLi.push(Ustensile);
  }
}
let newUstensilesLi = [...new Set(UstensilesLi)];
for (let index = 0; index < newUstensilesLi.length; index++) {
  const li = newUstensilesLi[index];
  let li_dom = document.createElement("li");
  li_dom.textContent = li;
  UstensilesBtn.appendChild(li_dom);
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

//<li> CHANGEMENT DE STYLE AU CLICK
let li = document.querySelectorAll("li");
li.forEach((element) => {
  element.addEventListener("click", () => {
    element.style.backgroundColor =
      element.style.backgroundColor === "" ? "#ffd15b" : "";
    element.style.margin = element.style.margin === "" ? "5px auto" : "";
  });
});

//NBR DE RECETTES
function nbrRecette(array) {
  const nbrRecettes = document.getElementById("recetteNbr");
  if (array.length < 2) {
    nbrRecettes.textContent = array.length + " Recette";
  } else {
    nbrRecettes.textContent = array.length + " Recettes";
  }
}

//Fonction pour supprimer les doublons de l'array de searchCards

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
//créer un nouvel array avec les résultats de la recherche

function searchCards() {
  if (searchDOM.value.length > 2) {
    let searchTerm = searchDOM.value;

    // Utilisez la méthode filter pour créer un nouvel array avec les résultats de la recherche

    let resultatArray = [];

    let resultatName = recipes.filter((recip) =>
      recip.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    let resultatdescription = recipes.filter((recip) =>
      recip.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    for (let index = 0; index < recipes.length; index++) {
      const element = recipes[index].ingredients;
      const resultatIngredient = element.filter((recip) =>
        recip.ingredient.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (resultatIngredient.length > 0) {
        resultatArray.push(recipes[index]);
      }
    }
    for (let x = 0; x < resultatName.length; x++) {
      const eachResult = resultatName[x];
      resultatArray.push(eachResult);
    }
    for (let i = 0; i < resultatdescription.length; i++) {
      const eachResult = resultatdescription[i];
      resultatArray.push(eachResult);
    }
    let sortedArray = sorting(resultatArray);
    cardContent.innerHTML = "";
    init(sortedArray);
  } else (cardContent.innerHTML = ""), init([...recipes]);
}

searchDOM.addEventListener("input", () => searchCards());

//Fonction qui lance l'affichage de la page

function init(array) {
  createLi(array)
  nbrRecette(array);
  cardDisplay(array);
}
init([...recipes]);
