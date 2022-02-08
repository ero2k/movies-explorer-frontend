import React from "react";
import "./SearchForm.css"

function SearchForm(props) {

    return (
        <section className="search-form max-width">
            <form className="search-form__form" action="" onSubmit={props.onSubmit}>
                    <div className="search-form__search-icon"></div>
                    <input className="search-form__input" value={props.value} onChange={props.onChange} placeholder="Фильм" type="text" required/>
                    <button className={`search-form__btn-submit ${props.value.length === 0 ? 'disabled' : ''}`}></button>
                    <span className='search-form__border'></span>
                <div className='search-form__section-option'>
                    <label htmlFor="search-form__checkbox" className="search-form__label">
                        <input type="checkbox" checked={props.checked} onChange={props.onChangeChecked} id="search-form__checkbox" className='search-form__checkbox'/>
                        <span className='search-form__checkbox-switch'></span>
                    </label>
                    <p className='search-form__paragraph'>Короткометражки</p>
                </div>
            </form>
            <hr className='search-form__hr'/>
        </section>
    )
}

export default SearchForm;
