import React from "react";
import "./SearchForm.css"

function SearchForm() {
    return (
        <section className="search-form max-width">
            <form className="search-form__form" action="">
                    <div className="search-form__search-icon"></div>
                    <input className="search-form__input" placeholder="Фильм" type="text" required/>
                    <button className='search-form__btn-submit'></button>
                    <span className='search-form__border'></span>
                <div className='search-form__section-option'>
                    <label htmlFor="search-form__checkbox" className="search-form__label">
                        <input type="checkbox" id="search-form__checkbox" className='search-form__checkbox'/>
                        <span className='search-form__checkbox-switch'></span>
                    </label>
                    <p className='search-form__paragraph'>Короткометражки</p>
                </div>
                <span className={'search-form__border-bottom'} ></span >
            </form>
        </section>
    )
}

export default SearchForm;
