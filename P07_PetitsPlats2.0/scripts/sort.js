const tagDiv = document.getElementById("tag");
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
let tagArray = [];

//RÉCUPÉRATION DES DONNÉES PAR BOUTTONS ET CRITÈRES
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
    li_dom.addEventListener("click", (event) => clickLi(event, array, ul));
  }
  return newlistLi;
}

searchIngredients.addEventListener("input", () =>
  searchLi(ingredientsBtn)
);
searchUstensiles.addEventListener("input", () =>
  searchLi(UstensilesBtn)
);
searchAppareils.addEventListener("input", () =>
  searchLi(AppareilsBtn)
);

function searchLi(ul) {
  let searchArray =recipes
  switch (tagArray.length) {
    case 0:
      if (searchCards()) {
        searchArray = searchCards();
      }
      
      break;
    default:
      let array = recipes;
      let tags = tagArray;
      if (searchCards()) {
        array = searchCards();
      }
      searchArray = array.filter((recipe) =>
        tags.every(
          (tag) =>
            recipe.ingredients.some((ing) =>
              ing.ingredient.toLowerCase().includes(tag.toLowerCase())
            ) ||
            recipe.ustensils.some((ustensil) =>
              ustensil.toLowerCase().includes(tag.toLowerCase())
            ) ||
            recipe.appliance.toLowerCase().includes(tag.toLowerCase())
        )
      );
      break;
  }
      let li = createLi(ul, searchArray);
      let searchTerm = ul.children[0].value.toLowerCase();
      let LiArray = li.filter((value) =>
        value.trim().toLowerCase().includes(searchTerm)
      );
      let trimmedLiArray = LiArray.map((value) => value.trim().toLowerCase());
      let uniqueTrimmedLiArray = [...new Set(trimmedLiArray)];
      ul.children[2].innerHTML = "";
      // Méthode filter pour créer un nouvel array avec les résultats de la recherche
      let resultatArray = [];
      for (let index = 0; index < searchArray.length; index++) {
        if (ul.id == "ingredients") {
          const element = searchArray[index].ingredients;
          const resultatIngredient = element.filter((recip) =>
            recip.ingredient.toLowerCase().includes(searchTerm.toLowerCase())
          );
          if (resultatIngredient.length > 0) {
            resultatArray.push(searchArray[index]);
          }
        }
        if (ul.id == "Appareils") {
          const element = searchArray[index].appliance;
          const resultatappareils = element
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
          if (resultatappareils === true) {
            resultatArray.push(searchArray[index]);
          }
        }
        if (ul.id == "Ustensiles") {
          const element = searchArray[index].ustensils;
          const resultatustensils = element.filter((recip) =>
            recip.toLowerCase().includes(searchTerm.toLowerCase())
          );
          if (resultatustensils.length > 0) {
            resultatArray.push(searchArray[index]);
          }
        }
      }
      let sortedArray = sorting(resultatArray);
      for (let i = 0; i < uniqueTrimmedLiArray.length; i++) {
        const li = uniqueTrimmedLiArray[i];
        let li_dom = document.createElement("li");
        li_dom.textContent = li;
        ul.children[2].appendChild(li_dom);
        li_dom.addEventListener("click", (event) =>
          clickLi(event, sortedArray, ul)
        );
      }
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
    init(sortedArray);
    if (sortedArray.length == 0) {
      cardContent.innerHTML = `<p>Aucune recette ne contient "${searchTerm}"vous pouvez chercher «tarte aux pommes », « poisson », etc..</p>`;
    }
    return sortedArray;
  } else init([...recipes]);
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
  cardContent.innerHTML = "";
  createLi(ingredientsBtn, array);
  createLi(AppareilsBtn, array);
  createLi(UstensilesBtn, array);
  nbrRecette(array);
  cardDisplay(array);
  tagList();
  console.log(array,"init");
}
init([...recipes]);

function clickLi(event, array, ul) {
  const el = event.target.innerHTML;
  if (event.target.style.backgroundColor == "rgb(255, 209, 91)") {
    event.target.style.backgroundColor = "";
    event.target.style.margin = "";
    tagArray = tagArray.filter((item) => item !== el);
    if (tagArray.length < 1) {
      init(recipes);
    } else {
      let tagArrayResult = tagSearch(tagArray);
      init(tagArrayResult);
    }
  } else {
    tagArray.push(el);
    let clickLiArray = clickSearch(el, array, ul);
    init(clickLiArray);
  }
}
function tagSearch(tags) {
  let array = recipes;
  if (searchCards()) {
    array = searchCards();
    console.log(array);
  }
  return array.filter((recipe) =>
    tags.some(
      (tag) =>
        recipe.ingredients.some((ing) =>
          ing.ingredient.toLowerCase().includes(tag.toLowerCase())
        ) ||
        recipe.ustensils.some((ustensil) =>
          ustensil.toLowerCase().includes(tag.toLowerCase())
        ) ||
        recipe.appliance.toLowerCase().includes(tag.toLowerCase())
    )
  );
}

function clickSearch(el, array, ul) {
  let resultatArray = [];
  for (let index = 0; index < array.length; index++) {
    if (ul.id == "ingredients") {
      const element = array[index].ingredients;
      const resultatIngredient = element.filter((recip) =>
        recip.ingredient.toLowerCase().includes(el.toLowerCase())
      );
      if (resultatIngredient.length > 0) {
        resultatArray.push(array[index]);
      }
    }

    if (ul.id == "Appareils") {
      const element = array[index].appliance;
      const resultatappareils = element
        .toLowerCase()
        .includes(el.toLowerCase());
      if (resultatappareils === true) {
        resultatArray.push(array[index]);
      }
    }

    if (ul.id == "Ustensiles") {
      const element = array[index].ustensils;
      const resultatustensils = element.filter((recip) =>
        recip.toLowerCase().includes(el.toLowerCase())
      );
      if (resultatustensils.length > 0) {
        resultatArray.push(array[index]);
      }
    }
  }
  
  let clickLiArray = sorting(resultatArray);
  return clickLiArray;
}


function tagList() {
  tagDiv.innerHTML = "";
  for (let index = 0; index < tagArray.length; index++) {
    const eachli = tagArray[index];
    let tag = document.createElement("div");
    tag.textContent = eachli;
    tagDiv.appendChild(tag);
    tag.addEventListener("click",(event)=>deleteTag(event))
  }
  let li = document.querySelectorAll("li");
  for (let i = 0; i < tagArray.length; i++) {
    const element = tagArray[i];
    li.forEach((eachLi) => {
      if (eachLi.innerHTML == element) {
        eachLi.style.backgroundColor = "rgb(255, 209, 91)";
        eachLi.style.margin = "5px 0px";
      }
    });
  }
}
function deleteTag(event) {
 let el = event.target.innerHTML
    tagArray = tagArray.filter((item) => item !== el);
    if (tagArray.length < 1) {
      init(recipes);
    } else {
      let tagArrayResult = tagSearch(tagArray);
      init(tagArrayResult);
    }
}