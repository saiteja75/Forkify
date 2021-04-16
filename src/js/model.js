import { async } from 'regenerator-runtime';
import {API_URL,RES_PER_PAGE} from './config.js';
import {getJSON} from './helper.js';
export const state = {
    recipe: {},
    search:{
        query:'',
        result:[],
        page:1,
        resultPerPage: RES_PER_PAGE
    }
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
        throw err;
    }
};

export const loadSearchResults = async function(query) {
    try{
        const data = await getJSON(`${API_URL}?search=${query}`);
        const {recipes}= data.data;
        state.search.query = query
        state.search.result = recipes.map(recipe => {
            return {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                image: recipe.image_url
            }
        });
    } catch(err) {
        throw err;
    }
}

export const getSearchResultsPage= function(page = state.search.page) {
    state.search.page = page;
    const start = (page - 1) * state.search.resultPerPage;
    const end = page * state.search.resultPerPage;

    return state.search.result.slice(start,end);
}