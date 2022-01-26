import React from "react";
import "./SearchForm.css"
import api from "../../utils/MoviesApi"

function SearchForm(props) {


    return (
        <section className="search-form__section max-width">
            <form className="search-form__form" onSubmit={props.onSubmit}>
                <div className="search-form__search-icon"></div>
                <input onChange={props.onChange} value={props.value} className="search-form__input" placeholder="Фильм" type="text"/>
                <button className='search-form__btn-submit'></button>
                <span className='search-form__border'></span>

                <div className='search-form__section-option'>
                    <label htmlFor="search-form__checkbox" className="search-form__label">
                        <input type="checkbox" id="search-form__checkbox" className='search-form__checkbox'/>
                        <span className='search-form__checkbox-switch'></span>
                    </label>
                    <p className='search-form__paragraph'>Короткометражки</p>
                </div>
            </form>
        </section>
    )
}

export default SearchForm;
