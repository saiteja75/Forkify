import View from "./View";
import icons from 'url:../../img/icons.svg';

class BookmarkView extends View {
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMsg ='No Match Found';

    _generateMarkup() {
        const id = window.location.hash.slice(1);
        return this._data.map(data => {
            return `
                <li class="preview">
                <a class="preview__link ${data.id === id ? 'preview__link--active':''}" href="#${data.id}">
                <figure class="preview__fig">
                    <img src="${data.image}" alt="${data.title}" />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__title">${data.title}</h4>
                    <p class="preview__publisher">${data.publisher}</p>
                    <div class="recipe__user-generated ${data.key ?'':'hidden'}">
                    <svg>
                        <use href="${icons}#icon-user"></use>
                    </svg>
                    </div>
                </div>
                </a>
            </li>
            `
        }).join('');
    }
}

export default new BookmarkView();