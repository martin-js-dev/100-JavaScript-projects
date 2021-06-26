
// get random cocktail
function randomCocktail() {

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
        .then((response) => response.json())
        .then((cocktailData) => {
            showCocktail(cocktailData)
        })
        .catch((error) => {

        })
}


// display random cocktail
function showCocktail(cocktailData) {
    const { drinks } = cocktailData;

    //image
    const cocktailpictureElement = document.getElementById('cocktail-picture');
    let cocktailPicture = `
    <img class="drink-img" src= "${drinks[0].strDrinkThumb}">`

    cocktailpictureElement.innerHTML = cocktailPicture;

    //title
    const cocktailTitleElement = document.getElementById('cocktail-title');


    //cocktail info
    let cocktailInfo = `
    <h4 class="cocktail-name"> ${drinks[0].strDrink} </h4>
    <p class="type-glass">Type of glass:</p><p>${drinks[0].strGlass}</p>
    </br><p class="how-make">How to make:</p>`

    const cocktailInfoElement = document.getElementById('howto');
    cocktailTitleElement.innerHTML = cocktailInfo;
    let result = '';
    for (var i = 1; i <= 15; i++) {
        let measures = 'strMeasure' + i;
        let ingridients = 'strIngredient' + i;
        if ((drinks[0][measures]) && (drinks[0][ingridients]) !== "") {
            result = result + ` <p>${drinks[0][measures]} ${drinks[0][ingridients]}</p>`;

            cocktailInfoElement.innerHTML = result;
        };
    }


    //instructions
    const cocktailInstructionsElement = document.getElementById('instructions');
    let instructions = `
    </br><p>${drinks[0].strInstructions}</p>`;

    cocktailInstructionsElement.innerHTML = instructions;

}


