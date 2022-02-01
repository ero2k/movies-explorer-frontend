import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import {initialCards} from "../../utils/constants";

function Movies() {

    return (
        <main>
            <SearchForm/>
            <MoviesCardList cards={initialCards} />
        </main>
    )
}

export default Movies;
