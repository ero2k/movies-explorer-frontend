import React, {useEffect, useState} from "react";
import "./SearchForm.css"

function SearchForm(props) {
    const [searchPhrase, setSearchPhrase] = useState(!!props.phraseFromLS ? props.phraseFromLS : '')
    const [isChecked, setIsChecked] = useState(props.checked || false)

    function handleCheckBox() {
        setIsChecked(!isChecked)
    }

    useEffect(()=>{
        if(!!props.savedIsShortMovie){
            props.savedIsShortMovie(isChecked)
        }
    },[isChecked])

    function handleInputChange(e) {
        setSearchPhrase(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        props.onSubmit(searchPhrase, props.checked, props.currentPage)
    }

    return (
        <section className="search-form max-width">
            <form className="search-form__form" action="" onSubmit={handleSubmit}>
                <div className="search-form__search-icon"></div>
                <input className="search-form__input" value={searchPhrase} onChange={handleInputChange}
                       placeholder="Фильм" type="text" required/>
                <button className={`search-form__btn-submit ${searchPhrase.length === 0 ? 'disabled' : ''}`}></button>
                <span className='search-form__border'></span>
                <div className='search-form__section-option'>
                    <label htmlFor="search-form__checkbox" className="search-form__label">
                        <input type="checkbox" checked={isChecked} onChange={handleCheckBox} id="search-form__checkbox"
                               className='search-form__checkbox'/>
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
