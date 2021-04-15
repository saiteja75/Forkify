import {API_URL} from './config.js';
import {getJSON} from './helper.js';
export const state = {
    recipe: {}
};

export const loadRecipe = async function(id) {
    try {
        const data = await getJSON(`${API_URL}/${id}`);
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
        throw new Error(err);
    }
};