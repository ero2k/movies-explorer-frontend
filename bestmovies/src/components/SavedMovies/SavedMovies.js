import React, {useEffect, useState} from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {DURATION_SHORT_MOVIE} from "../../utils/constants";


function SavedMovies(props) {
    const [isChecked, setIsChecked] = useState(false)
    const [searchPhrase, setSearchPhrase] = useState('')

    useEffect(() => {
            props.handleSearchForm(searchPhrase, isChecked)
    }, [isChecked, searchPhrase])


    useEffect(() => {
        props.setSavedMovies(props.savedMovies)
        // eslint-disable-next-line
    }, [props.savedMovies])

    return (
        <>
            <Header onOpen={props.onOpen} isLoggedIn={props.isLoggedIn} page={props.page}/>
            <main>

                <SearchForm
                    onSubmit={setSearchPhrase} handleCheckBox={setIsChecked}
                    checkbox={false}
                    phrase={''}
                />
                {
                    props.filteredMovies.length > 0 ?
                        <MoviesCardList deleteMovie={props.deleteMovie} likedMovie={props.likedMovie} isLiked={true}
                                        filteredMovies={props.filteredMovies} savedMovies={props.savedMovies}
                                        schemeDevice={{'totalCards': props.filteredMovies.length}}
                        />
                        :
                        <div className={'movies__div-error'}>Вы еще ничего не сохранили!</div>

                }

            </main>
            <Footer/>
        </>
    )
}

export default SavedMovies;
