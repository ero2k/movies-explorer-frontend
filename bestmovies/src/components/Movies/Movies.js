import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import {initialCards} from "../../utils/constants";

function Movies() {
    return (
        <main>
            <SearchForm/>
            {/*<Preloader/>*/}
            <MoviesCardList cards={initialCards}/>
        </main>
    )
}

export default Movies;
