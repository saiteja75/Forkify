import * as model from './model.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import  recipeView from './view/ReciepeView.js';
import  searchView from './view/SearchView.js';
import  resultView from './view/ResultView';
import  paginationView from './view/PaginationView.js';
import  bookmarkView from './view/BookmarkView.js';
import  addRecipeView from './view/AddRecipeView.js';
import { async } from 'regenerator-runtime';


const setRecipe = async function() {
    try {
      const id = window.location.hash.slice(1);
      if (!id) return;
      recipeView.renderSpinner();
      resultView.update(model.getSearchResultsPage());
      bookmarkView.update(model.state.bookmarks);
      await model.loadRecipe(id);

      recipeView.render(model.state.recipe);
        
    } catch (err) {
        recipeView.renderErrorMessage(err);
    }
};

const setSearchedRecipes = async function() {
    try{
        const query = searchView.getQuery();
        if(!query) return;
        resultView.renderSpinner();
        
        await model.loadSearchResults(query);
        if(!model.state.search.result.length) throw new Error('No Result Found');
        resultView.render(model.getSearchResultsPage());
        paginationView.render(model.state.search)

    } catch(err) {
        resultView.renderErrorMessage(err);
    }
}

const controlPagination = function(gotoPage) {
    resultView.render(model.getSearchResultsPage(gotoPage));
    paginationView.render(model.state.search)
}

const controlServingRecipe = function(serving) {
    if(serving<=0) return;

    model.updateServings(serving);

    recipeView.update(model.state.recipe);
}

const controlAddBookmark = function() {

    model.toggleBookmark(model.state.recipe);
    recipeView.update(model.state.recipe);
    bookmarkView.render(model.state.bookmarks);
}

const loadBookMarks = function() {
    bookmarkView.render(model.state.bookmarks);
}

const controlAddRecipe =async function(newRecipe) {
    try {
        addRecipeView.renderSpinner();
        const data = Object.fromEntries(newRecipe);
        
        await model.uploadRecipe(data);
    
        recipeView.render(model.state.recipe);

        bookmarkView.render(model.state.bookmarks);

        window.history.pushState(null,'',`#${model.state.recipe.id}`)
    
        addRecipeView.renderMessage('Recipe is Successfully Uploaded');
    } catch(err) {
        addRecipeView.renderErrorMessage(err);
    }
}

const init = function() {
    bookmarkView.addRenderHandler(loadBookMarks);
    recipeView.addRenderHandler(setRecipe);
    recipeView.addHandleServing(controlServingRecipe);
    recipeView.addBookmarkHandler(controlAddBookmark);
    searchView.addSearchHandler(setSearchedRecipes);
    paginationView.addHandlerClick(controlPagination);
    addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();