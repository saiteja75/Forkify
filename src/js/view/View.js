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

    update(data) {
        this._data = data;
        const newMarkup = this._generateMarkup();

        const newDom = document.createRange().createContextualFragment(newMarkup);
        const oldElenents = Array.from(this._parentElement.querySelectorAll('*'));
        const newElements = Array.from(newDom.querySelectorAll('*'));

        newElements.forEach((ele, i) => {
            let currEle = oldElenents[i];

            if(!ele.isEqualNode(currEle)
            &&  ele.firstChild?.nodeValue.trim() !== '') {
                currEle.textContent = ele.textContent;
            }

            if(!ele.isEqualNode(currEle)) {
                Array.from(ele.attributes).forEach((attr) => currEle.setAttribute(attr.name,attr.value));
            }
        });
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

    renderMessage(msg) {
        const markup = `<div class="error">
            <div>
            <svg>
                <use href="${icons}#icon-smile"></use>
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