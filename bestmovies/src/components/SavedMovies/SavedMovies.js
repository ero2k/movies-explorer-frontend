import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import Header from "../Header/Header";
import Footer from "../Footer/Footer";


function SavedMovies(props) {
    function handleInputChange(e) {
        props.handleInput(e.target.value)
    }

    return (
        <>
            <Header onOpen={props.onOpen} isLoggedIn={props.isLoggedIn} page={props.page}/>
            <main>

                <SearchForm onSubmit={props.onSubmitSearchForm} onChange={handleInputChange} value={props.searchPhrase}
                            checked={props.isShortMovie} onChangeChecked={props.handleCheckbox}/>

                <MoviesCardList deleteMovie={props.deleteMovie} likedMovie={props.likedMovie} isLiked={true}
                                filteredMovies={props.filteredMovies} savedMovies={props.filteredMovies}
                                schemeDevice={{'totalCards': props.filteredMovies.length}}
                />
            </main>
            <Footer/>
        </>
    )
}

export default SavedMovies;
