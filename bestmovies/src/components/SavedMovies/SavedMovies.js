import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import {savedCards} from "../../utils/constants";

function SavedMovies() {
    return (
        <main>
            <SearchForm/>
            <MoviesCardList cards={savedCards}/>
        </main>
    )
}

export default SavedMovies;
