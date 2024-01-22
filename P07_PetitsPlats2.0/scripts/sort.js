const ingredientsBtn = document.getElementById("ingredients");
const AppareilsBtn = document.getElementById("Appareils");
const UstensilesBtn = document.getElementById("Ustensiles");
const ingredientsIcon = document.getElementById("ingredientsIcon");
const searchDOM = document.getElementById("search");
const searchUstensiles = document.getElementById("searchUstensiles");
const searchAppareils = document.getElementById("searchAppareils");
const searchIngredients = document.getElementById("searchIngredients");
const ingredientLi = document.getElementById("ingredientsLi");
const UstensileLi = document.getElementById("UstensilesLi");
const AppareilLi = document.getElementById("AppareilsLi");

//RÉCUPÉRATION DES DONNÉES PAR BOUTTONS ET CRITÈRES
function createLi(ul, array) {
  let idLi = ul;
  let divLi = ul.children[2];
  divLi.innerHTML = "";
  let listLi = [];
  for (let i = 0; i < array.length; i++) {
    if (idLi === AppareilsBtn) {
      itemLi = array[i].appliance;
      listLi.push(itemLi);
    }
    if (UstensilesBtn === idLi) {
      let Ustensiles = array[i].ustensils;
      for (let x = 0; x < Ustensiles.length; x++) {
        itemLi = Ustensiles[x];
        listLi.push(itemLi);
      }
    }
    if (ingredientsBtn === idLi) {
      let ingredients = array[i].ingredients;
      for (let x = 0; x < ingredients.length; x++) {
        itemLi = ingredients[x].ingredient;
        listLi.push(itemLi);
      }
    }
  }
  let newlistLi = [...new Set(listLi)];
  for (let index = 0; index < newlistLi.length; index++) {
    const li = newlistLi[index];
    let li_dom = document.createElement("li");
    li_dom.textContent = li;
    divLi.appendChild(li_dom);
    li_dom.addEventListener("click", (event) => clickLi(event));
  }

  return newlistLi;
}

searchIngredients.addEventListener("input", () => searchLi(ingredientsBtn));
searchUstensiles.addEventListener("input", () => searchLi(UstensilesBtn));
searchAppareils.addEventListener("input", () => searchLi(AppareilsBtn));

function searchLi(ul) {
if (searchCards()) {
  let searchArray = searchCards()

let newLi = createLi(ul, recipes);
    let searchTerm = ul.children[0].value.toLowerCase();
    let LiArray = newLi.filter((value) =>
      value.trim().toLowerCase().includes(searchTerm)
    );
    let trimmedLiArray = LiArray.map(value => value.trim().toLowerCase());
    let uniqueTrimmedLiArray = [...new Set(trimmedLiArray)];
    ul.children[2].innerHTML = "";
    
    for (let i = 0; i < uniqueTrimmedLiArray.length; i++) {
      const li = uniqueTrimmedLiArray[i];
      let li_dom = document.createElement("li");
      li_dom.textContent = li;
      ul.children[2].appendChild(li_dom);
      li_dom.addEventListener("click", (event) => searchClickLi(event,uniqueTrimmedLiArray,ul));
    }

    // Utilisez la méthode filter pour créer un nouvel array avec les résultats de la recherche

    let resultatArray = [];
    for (let index = 0; index < recipes.length; index++) {
      const element = recipes[index].ingredients;
      const resultatIngredient = element.filter((recip) =>
        recip.ingredient.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (resultatIngredient.length > 0) {
        resultatArray.push(recipes[index]);
      }
    }
    
    let sortedArray = sorting(resultatArray);
    cardContent.innerHTML = "";
    cardDisplay(sortedArray);
    nbrRecette(sortedArray);
}
    let newLi = createLi(ul, recipes);
    let searchTerm = ul.children[0].value.toLowerCase();
    let LiArray = newLi.filter((value) =>
      value.trim().toLowerCase().includes(searchTerm)
    );
    let trimmedLiArray = LiArray.map(value => value.trim().toLowerCase());
    let uniqueTrimmedLiArray = [...new Set(trimmedLiArray)];
    ul.children[2].innerHTML = "";
    
    for (let i = 0; i < uniqueTrimmedLiArray.length; i++) {
      const li = uniqueTrimmedLiArray[i];
      let li_dom = document.createElement("li");
      li_dom.textContent = li;
      ul.children[2].appendChild(li_dom);
      li_dom.addEventListener("click", (event) => searchClickLi(event,uniqueTrimmedLiArray,ul));
    }

    // Utilisez la méthode filter pour créer un nouvel array avec les résultats de la recherche

    let resultatArray = [];
    for (let index = 0; index < recipes.length; index++) {
      const element = recipes[index].ingredients;
      const resultatIngredient = element.filter((recip) =>
        recip.ingredient.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (resultatIngredient.length > 0) {
        resultatArray.push(recipes[index]);
      }
    }
    
    let sortedArray = sorting(resultatArray);
    cardContent.innerHTML = "";
    cardDisplay(sortedArray);
    nbrRecette(sortedArray);
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
    return sortedArray;
  } else (cardContent.innerHTML = ""), init([...recipes]);
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

searchDOM.addEventListener("input", () => searchCards());

//SWITCH Chevron UP&DOWN
function btnToggle(btn) {
  btn.style.display = btn.style.display === "none" ? "block" : "none";
  let icon = document.querySelector(`.${btn.id}`);
  if (btn.style.display === "block") {
    icon.classList.remove("fa-chevron-down");
    icon.classList.add("fa-chevron-up");
  } else {
    icon.classList.remove("fa-chevron-up");
    icon.classList.add("fa-chevron-down");
  }
}
//NBR DE RECETTES
function nbrRecette(array) {
  const nbrRecettes = document.getElementById("recetteNbr");
  if (array.length < 2) {
    nbrRecettes.textContent = array.length + " Recette";
  } else {
    nbrRecettes.textContent = array.length + " Recettes";
  }
}
//Fonction qui lance l'affichage de la page
function init(array) {
  createLi(ingredientsBtn, array);
  createLi(AppareilsBtn, array);
  createLi(UstensilesBtn, array);
  nbrRecette(array);
  cardDisplay(array);
}
init([...recipes]);

function clickLi(event) {
  let nbrReceip = document.querySelectorAll("article");
  const el = event.target.innerHTML;
  if (nbrReceip.length == recipes.length) {
    let resultatArray = [];
    let resultatName = recipes.filter((recip) =>
      recip.name.toLowerCase().includes(el.toLowerCase())
    );

    let resultatdescription = recipes.filter((recip) =>
      recip.description.toLowerCase().includes(el.toLowerCase())
    );

    for (let index = 0; index < recipes.length; index++) {
      const recette = recipes[index].ingredients;
      const resultatIngredient = recette.filter((recip) =>
        recip.ingredient.toLowerCase().includes(el.toLowerCase())
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
  } else {
    let sortedrray = searchCards(resultatrray);
    let resultatArray = [];

    let resultatName = sortedrray.filter((recip) =>
      recip.name.toLowerCase().includes(el.toLowerCase())
    );

    let resultatdescription = sortedrray.filter((recip) =>
      recip.description.toLowerCase().includes(el.toLowerCase())
    );

    for (let index = 0; index < sortedrray.length; index++) {
      const recette = sortedrray[index].ingredients;
      const resultatIngredient = recette.filter((recip) =>
        recip.ingredient.toLowerCase().includes(el.toLowerCase())
      );
      if (resultatIngredient.length > 0) {
        resultatArray.push(sortedrray[index]);
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
  }

  let li = document.querySelectorAll("li");
  li.forEach((element) => {
    if (element.innerHTML === event.target.innerHTML) {
      console.log(element);
      console.log(event.target);
      element.style.backgroundColor = element.style.backgroundColor =
        element.style.backgroundColor === "" ? "rgb(255, 209, 91)" : "";
      element.style.margin = element.style.margin === "" ? "5px 0px" : "";
    }
  });
}
function searchClickLi(event,array,ul) {
  console.log(array);
  console.log(ul);
  const el = event.target.innerHTML;
  let resultatName = array.filter((recip) =>
      recip.toLowerCase().includes(el.toLowerCase())
    );

    
    for (let index = 0; index < array.length; index++) {
      const recette = array[index].ingredients;
      console.log(array[index].ingredients);
      const resultatIngredient = recette.filter((recip) =>
        recip.ingredient.toLowerCase().includes(el.toLowerCase())
      );
      if (resultatIngredient.length > 0) {
        resultatArray.push(array[index]);
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
    init(sortedArray)
    let li = document.querySelectorAll("li");
  li.forEach((element) => {
    if (element.innerHTML === event.target.innerHTML) {
      console.log(element);
      console.log(event.target);
      element.style.backgroundColor = element.style.backgroundColor =
        element.style.backgroundColor === "" ? "rgb(255, 209, 91)" : "";
      element.style.margin = element.style.margin === "" ? "5px 0px" : "";
    }
  });
}