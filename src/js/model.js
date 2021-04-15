export const state = {
    recipe: {}
};

export const loadRecipe = async function(id) {
    try {
        const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
        const data = await res.json();
    
        if (!res.ok) throw new Error(`${res.message} (${res.status})`);
        const { recipe } = data.data;
        state.recipe = {
            id: recipe.id,
            cookingTime: recipe.cooking_time,
            image: recipe.image_url,
            ingredients: recipe.ingredients,
            publisher: recipe.publisher,
            servings: recipe.servings,
            sourceUrl: recipe.source_url,
            title: recipe.title
        }
    } catch(err) {
        alert(err);
    }
    
};