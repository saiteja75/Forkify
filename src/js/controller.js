import * as model from './model.js'
import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import  recipeView from './view/ReciepeView.js'
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
      const id = window.location.hash.slice(1);
      if (!id) return;
      recipeView.renderSpinner();

      await model.loadRecipe(id);
      
      recipeView.render(model.state.recipe);
        
    } catch (err) {
        alert(err);
    }
}

getRecipe();

['hashchange','load'].forEach(ev => window.addEventListener(ev, getRecipe));