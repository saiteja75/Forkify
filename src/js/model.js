import { async } from 'regenerator-runtime';
import {API_KEY, API_URL,RES_PER_PAGE} from './config.js';
import {getJSON,setJSON} from './helper.js';
export const state = {
    recipe: {},
    search:{
        query:'',
        result:[],
        page:1,
        resultPerPage: RES_PER_PAGE
    },
    bookmarks:[]
};
const createRecipeObject = function(data) {
    const { recipe } = data.data;
    return {
        id: recipe.id,
        cookingTime: recipe.cooking_time,
        image: recipe.image_url,
        ingredients: recipe.ingredients,
        publisher: recipe.publisher,
        servings: recipe.servings,
        sourceUrl: recipe.source_url,
        title: recipe.title,
        ...(recipe.key && {key:recipe.key})
    }
}
export const loadRecipe = async function(id) {
    try {
        const data = await getJSON(`${API_URL}/${id}`);
        
        state.recipe = createRecipeObject(data);
        if(state.bookmarks.some(b=> b.id === state.recipe.id)) {
            state.recipe.bookmarked = true;
        } else {
            state.recipe.bookmarked = false;
        }
    } catch(err) {
        throw err;
    }
};

export const loadSearchResults = async function(query) {
    try{
        const data = await getJSON(`${API_URL}?search=${query}&key=${API_KEY}`);
        const {recipes}= data.data;
        state.search.query = query
        state.search.result = recipes.map(recipe => {
            return {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                image: recipe.image_url,
                ...(recipe.key && {key:recipe.key})
            }
        });
        state.search.page = 1;
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

export const updateServings = function(serving = state.recipe.servings) {
    
    state.recipe.ingredients = state.recipe.ingredients.map(ing => {
        ing.quantity = (ing.quantity/state.recipe.servings) * serving
        return ing;
    });

    state.recipe.servings = serving;

}

const persistBookMarks= function() {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks))
}

const addBookmark = function(recipe) {
    state.bookmarks.push(recipe)
    if(state.recipe.id === recipe.id) state.recipe.bookmarked = true;
    persistBookMarks();
}

const removeBookmark = function(recipe) {
    const index = state.bookmarks.findIndex(r => r.id === recipe.id);
    state.bookmarks.splice(index,1);
    if(state.recipe.id === recipe.id) state.recipe.bookmarked = false;
    persistBookMarks();
}

export const toggleBookmark = function(recipe) {
    if(recipe.bookmarked) {
        removeBookmark(recipe);
    } else {
        addBookmark(recipe);
    }
}

export const getBookMarks = function() {
    return state.bookmarks;
}

export const uploadRecipe = async function(newRecipe) {
    try{
        const ingredients = Object.entries(newRecipe)
        .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
        .map(ing => {
            const ingArr = ing[1].replaceAll(' ','').split(',');
            if(ingArr.length !== 3) throw new Error('Worng Ingredient Format.')

            const[quantity, unit, description] = ingArr;

            return {quantity: quantity ? +quantity : null, unit, description}
        });

        const recipe = {
            title:newRecipe.title,
            source_url:newRecipe.sourceUrl,
            image_url:newRecipe.image,
            publisher:newRecipe.publisher,
            cooking_time:newRecipe.cookingTime,
            servings:+newRecipe.servings,
            ingredients
        }
        const data = await setJSON(`${API_URL}?key=${API_KEY}`, recipe);
        state.recipe = createRecipeObject(data); 
        addBookmark(state.recipe);
    } catch(err) {
        throw err;
    }
}

const init = function() {
    state.bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
}

const clearBookmark = function() {
    localStorage.clear('bookmarks');
}
init();