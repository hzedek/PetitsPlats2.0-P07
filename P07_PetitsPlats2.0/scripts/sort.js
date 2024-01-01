const ingredientsBtn = document.getElementById("ingredients");
const AppareilsBtn = document.getElementById("Appareils");
const UstensilesBtn = document.getElementById("Ustensiles");
const ingredientsIcon = document.getElementById("ingredientsIcon");
const searchDOM = document.getElementById("search");

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

const nbrRecettes = document.getElementById("recetteNbr");
if (recipes.length < 2) {
  nbrRecettes.textContent = recipes.length + " Recette";
} else {
  nbrRecettes.textContent = recipes.length + " Recettes";
}

console.log(recipes);

//<li> CHANGEMENT DE STYLE AU CLICK
let li = document.querySelectorAll("li");
li.forEach((element) => {
  element.addEventListener("click", () => {
    element.style.backgroundColor =
      element.style.backgroundColor === "" ? "#ffd15b" : "";
    element.style.margin = element.style.margin === "" ? "5px auto" : "";
  });
});

searchDOM.addEventListener("input", () => {
  if (searchDOM.value.length > 2) {
    let searchTerm = searchDOM.value;
    // Utilisez la méthode filter pour créer un nouvel array avec les résultats de la recherche
    const resultatName = recipes.filter((recip) =>
      recip.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const resultatdescription = recipes.filter((recip) =>
      recip.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    let resultatIngredients = [];
      for (let index = 0; index < recipes.length; index++) {
        const element = recipes[index].ingredients;
        const resultatIngredient = element.filter((recip) =>
        recip.ingredient.toLowerCase().includes(searchTerm.toLowerCase()) 
        );
        if (resultatIngredient.length>0) {
            resultatIngredients.push(recipes[index])
        }
      }
    

    console.log(resultatName,resultatdescription);
    console.log(resultatIngredients, "ingredient");
    }
});
