import * as model from './model.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import  recipeView from './view/ReciepeView.js';
import  searchView from './view/SearchView.js';
import  resultView from './view/ResultView';
import  paginationView from './view/PaginationView.js';
import { async } from 'regenerator-runtime';


const setRecipe = async function() {
    try {
      const id = window.location.hash.slice(1);
      if (!id) return;
      recipeView.renderSpinner();

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

const init = function() {
    recipeView.addRenderHandler(setRecipe);
    searchView.addSearchHandler(setSearchedRecipes);
    paginationView.addHandlerClick(controlPagination);
};
init();