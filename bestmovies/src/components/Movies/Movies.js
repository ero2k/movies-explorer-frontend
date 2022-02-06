import React from "react";
import {useState, useEffect} from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import {LOADED_MOVIES} from "../../utils/constants";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Movies(props) {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const [searchPhrase, setSearchPhrase] = useState('')
    const [moviesFiltered, setMoviesFiltered] = useState([])

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


    useEffect(() => {
        if(props.allMovies){
        setMoviesFiltered(props.allMovies.filter(movie =>
            movie.nameRU.includes(searchPhrase)
        ))}
    }, [props.allMovies])

    console.log(moviesFiltered)

    return (
        <>
            <Header onOpen={props.onOpen} isLoggedIn={props.isLoggedIn} page={props.page}/>
            <main>
                <SearchForm onSubmit={props.submitSearch} onChange={handleInputChange} value={searchPhrase}/>
                <MoviesCardList savedMovies={props.savedMovies} deleteMovie={props.deleteMovie}
                                allMovies={moviesFiltered} size={windowDimensions} page='movies'
                                schemeDevice={getCurrentDeviceScheme(windowDimensions.width)}
                                likedMovie={props.likedMovie}/>
            </main>
            <Footer/>
        </>
    )
}

export default Movies;
