import React from "react";
import {useState, useEffect} from 'react';

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import {LOADED_MOVIES} from "../../utils/constants";
import api from "../../utils/MoviesApi";

function Movies() {
    const [moviesArray, setMoviesArray] = React.useState([])
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const [searchPhrase, setSearchPhrase] = React.useState('')

    function handleInputChange(e) {
        setSearchPhrase(e.target.value)
    }

    function getCurrentDeviceScheme(windowWidth) {
        if (windowWidth > 1279) {
            return LOADED_MOVIES.desktop
        } else if (windowWidth > 479) {
            return LOADED_MOVIES.tablet
        } else {
            return LOADED_MOVIES.mobile
        }
    }

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
        const {innerWidth: width} = window;
        return {
            width
        };
    }

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <main>
            <SearchForm onSubmit={handleMoviesArray} onChange={handleInputChange} value={searchPhrase}/>
            <MoviesCardList cards={moviesArray} size={windowDimensions} schemeDevice={getCurrentDeviceScheme(windowDimensions.width)}/>
        </main>
    )
}

export default Movies;
