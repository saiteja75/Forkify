import View from "./View";
import icons from '../../img/icons.svg';

class AddRecipeView extends View {
    _parentElement = document.querySelector('.upload');

    _window = document.querySelector('.add-recipe-window');

    _overlay = document.querySelector('.overlay');

    _btnOpen = document.querySelector('.nav__btn--add-recipe');

    _btnClose = document.querySelector('.btn--close-modal');

    constructor() {
        super();
        this._addHandlerShowWindow();
        this._addHandlerHideWindow();
    }
    toggleWindowShow() {
        this._overlay.classList.toggle('hidden');
        this._window.classList.toggle('hidden');
    }
    _addHandlerShowWindow() {
        this._btnOpen.addEventListener('click',this.toggleWindowShow.bind(this));
    }

    _addHandlerHideWindow() {
        this._overlay.addEventListener('click', this.toggleWindowShow.bind(this));
        this._btnClose.addEventListener('click', this.toggleWindowShow.bind(this));
    }

    addHandlerUpload(handler) {
        this._parentElement.addEventListener('submit', function(e) {
            e.preventDefault();
            const data = [...new FormData(this)];
            handler(data);
        })
    }
}

export default new AddRecipeView();