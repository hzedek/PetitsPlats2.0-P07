let cardContent = document.getElementById("cardContent");
let article = document.createElement('article');

const portrait = (`./assets/${recipes[0].image}`)

//création du DOM
const img = document.createElement("img");
const p_titre = document.createElement('p');
const p_description = document.createElement('p');
const p_recette = document.createElement('p');
const p_ingredient = document.createElement('p');
const div = document.createElement('div')

img.setAttribute('src',portrait);
img.classList.add('imgCard')
p_titre.textContent = recipes[0].name
p_recette.textContent = "RECETTE"
p_description.textContent = recipes[0].description
p_ingredient.textContent = "INGRÉDIENTS"

cardContent.appendChild(article);
article.appendChild(img)
article.appendChild(p_titre)
article.appendChild(p_recette)
article.appendChild(p_description)
article.appendChild(p_ingredient)
article.appendChild(div)


console.log(recipes);
console.log(recipes[0].ingredients);


