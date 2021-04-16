import View from "./View";
import icons from '../../img/icons.svg';

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');

    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function(e) {
            const btn = e.target.closest('.btn--inline');
            if(!btn) return;
            const gotoPage = +btn.dataset.goto;
            handler(gotoPage);
        })
    }
    _generateMarkup() {
        const currPage = this._data.page;
        const numOfPages = Math.ceil(this._data.result.length / this._data.resultPerPage);
        let markup = '';
        if(numOfPages > 1 && currPage === 1) {
            markup = `
                <button data-goto = "${currPage+1}" class="btn--inline pagination__btn--next">
                    <span>Page ${currPage+1}</span>
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>`
        } else if(this._data.page === numOfPages) {
            markup = `<button data-goto = "${currPage-1}" class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${currPage - 1}</span>
                </button>`
        } else if(this._data.page < numOfPages && this._data.page !== 1) {
            markup = `<button data-goto = "${currPage+1}" class="btn--inline pagination__btn--next">
                        <svg class="search__icon">
                        <use href="${icons}#icon-arrow-left"></use>
                        </svg>
                        <span>Page ${currPage + 1}</span>
                    </button>
                    <button data-goto = "${currPage-1}" class="btn--inline pagination__btn--prev">
                        <svg class="search__icon">
                        <use href="${icons}#icon-arrow-left"></use>
                        </svg>
                    <span>Page ${currPage - 1}</span>
                </button>`
        }
        return markup;
    }
}

export default new PaginationView();