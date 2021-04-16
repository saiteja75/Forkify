import icons from 'url:../../img/icons.svg';
import {Fraction} from 'fractional';

export default class View {
    _data;
    _errorMsg = '';

    render(data) {
        if(!data || (Array.isArray(data) && data.length === 0)) return this.renderErrorMessage();
        this._data = data;
        this._clear(); 
        const markup = this._generateMarkup();
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }

    _clear() {
        this._parentElement.innerHTML = '';
    }

    renderSpinner() {
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', `<div class="spinner">
        <svg>
            <use href="${icons}#icon-loader"></use>
        </svg>
        </div>`);
    }

    renderErrorMessage(msg = this._errorMsg) {
        const markup = `<div class="error">
            <div>
            <svg>
                <use href="${icons}#icon-alert-triangle"></use>
            </svg>
            </div>
            <p>${msg}</p>
        </div>`
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    addRenderHandler(setRecipe) {
        ['hashchange','load'].forEach(ev => window.addEventListener(ev, setRecipe));
    }
}