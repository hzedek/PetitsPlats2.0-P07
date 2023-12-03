let cardContent = document.getElementById("cardContent");
 
for (let index = 0; index < recipes.length; index++) {
    let article = document.createElement('article');
    const card = recipes[index];
    const portrait = (`./assets/${card.image}`)

    //création du DOM Card
    const img = document.createElement("img");
    const p_titre = document.createElement('p');
    const p_description = document.createElement('p');
    const p_recette = document.createElement('p');
    const p_ingredients = document.createElement('p');
    const div = document.createElement('div')

    img.setAttribute('src',portrait);
    img.classList.add('imgCard')
    p_titre.textContent = recipes[index].name
    p_titre.classList.add('anton')
    p_recette.textContent = "RECETTE"
    p_recette.classList.add('grey')
    p_description.textContent = recipes[index].description
    p_description.classList.add('cardText')
    p_ingredients.textContent = "INGRÉDIENTS"
    p_ingredients.classList.add('grey')
    div.classList.add('ingredients')

    cardContent.appendChild(article);
    article.appendChild(img)
    article.appendChild(p_titre)
    article.appendChild(p_recette)
    article.appendChild(p_description)
    article.appendChild(p_ingredients)
    article.appendChild(div)


    for (let i = 0; i < card.ingredients.length; i++) {
        const ingredient = card.ingredients[i];
        const p_ingredient = document.createElement("p")
        p_ingredient.classList.add('ingredient','cardText')
        const p_quantity = document.createElement("p")
        p_quantity.classList.add('cardText','grey')

        p_ingredient.textContent = ingredient.ingredient
        if(ingredient.unit){
        p_quantity.textContent = ingredient.quantity+" "+ ingredient.unit
    }
        else{
        p_quantity.textContent = ingredient.quantity
        }
        div.appendChild(p_ingredient)
        p_ingredient.appendChild(p_quantity)
    }
}
console.log(recipes);


