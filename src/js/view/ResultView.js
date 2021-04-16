import View from "./View";
import icons from '../../img/icons.svg';

class ResultView extends View {
    _parentElement = document.querySelector('.results');
    _errorMsg ='No Match Found';

    _generateMarkup() {
        return this._data.map(data => {
            return `
                <li class="preview">
                <a class="preview__link" href="#${data.id}">
                <figure class="preview__fig">
                    <img src="${data.image}" alt="${data.title}" />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__title">${data.title}</h4>
                    <p class="preview__publisher">${data.publisher}</p>
                </div>
                </a>
            </li>
            `
        }).join('');
    }
}

export default new ResultView();