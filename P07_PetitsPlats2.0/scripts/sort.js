const ingredientsBtn = document.getElementById("ingredients");
const AppareilsBtn = document.getElementById("Appareils");
const UstensilesBtn = document.getElementById("Ustensiles");

//RÉCUPÉRATION DES DONNÉES PAR BOUTTONS ET CRITÈRES

let ingredientsLi = [];
for (let i = 0; i < recipes.length; i++) {
  let ingredients = recipes[i].ingredients;
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
for (let i = 0; i < recipes.length; i++) {
  let Appareils = recipes[i].appliance;
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
for (let i = 0; i < recipes.length; i++) {
  let Ustensiles = recipes[i].ustensils;
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
  UstensilesBtn.style.height = "315px";
}

function btnToggle(btn) {
  btn.style.display = btn.style.display === "none" ? "block" : "none";
}

//NBR DE RECETTES

const nbrRecettes = document.getElementById("recetteNbr");
if (recipes.length < 2) {
  nbrRecettes.textContent = recipes.length + " Recette";
} else {
  nbrRecettes.textContent = recipes.length + " Recettes";
}

console.log(recipes);
