const recipeContainer = document.querySelector('.recipe');

const timeout = function(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const getRecipe = async function() {
    try {
        const res = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886');
        console.log(res);
        if (!res.ok) throw new Error(`Invalid Request${res.status}`);
        const data = await res.json();
        let { recipe } = data.data;
        recipe = {
            id: recipe.id,
            cookingTime: recipe.cooking_time,
            image: recipe.image_url,
            ingredients: recipe.ingredients,
            publisher: recipe.publisher,
            serving: recipe.servings,
            sourceUrl: recipe.source_url,
            title: recipe.title
        }
        console.log(recipe);
    } catch (err) {
        alert(err);
    }
}

getRecipe();