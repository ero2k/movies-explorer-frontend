import React from "react";
import { useState, useEffect } from 'react';

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import {} from "../../utils/constants";
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

    function getWindowDimensions() {
        const { innerWidth: width} = window;
        return {
            width
        };
    }

    function useWindowDimensions() {
        const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
        useEffect(() => {
            function handleResize() {
                setWindowDimensions(getWindowDimensions());
            }
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);
        return windowDimensions;
    }

    return (
        <main>
            <SearchForm onSubmit={handleMoviesArray}/>
            <MoviesCardList cards={moviesArray} size={useWindowDimensions()}/>
        </main>
    )
}

export default Movies;
