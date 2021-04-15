import * as model from './model.js'
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import  recipeView from './view/ReciepeView.js'


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
}

setRecipe();
function init() {
    recipeView.addHandlerRender(setRecipe);
}
init();