import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import {initialCards} from "../../utils/constants";
import api from "../../utils/MoviesApi";

function Movies() {
    const [moviesArray, setMoviesArray] = React.useState([])

    async function handleMoviesArray(e) {
        e.preventDefault()
        try {
            const movies = await api.getInitialCards()
            setMoviesArray(movies)
        } catch (error) {
            console.log(error)
        }
    }

    console.log(moviesArray)

    return (
        <main>
            <SearchForm onSubmit={handleMoviesArray}/>
            <MoviesCardList cards={moviesArray}/>
        </main>
    )
}

export default Movies;
