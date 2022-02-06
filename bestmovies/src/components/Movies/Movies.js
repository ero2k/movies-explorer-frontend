import React from "react";
import {useState, useEffect} from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import {LOADED_MOVIES} from "../../utils/constants";
import apiMovies from "../../utils/MoviesApi";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Movies(props) {
    // const [moviesArray, setMoviesArray] = React.useState([])
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

    // async function handleMoviesArray(e) {
    //     e.preventDefault()
    //     try {
    //         const movies = await apiMovies.getInitialCards()
    //         await localStorage.setItem('movies', JSON.stringify(movies))
    //         setMoviesArray(JSON.parse(localStorage.getItem('movies')))
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // useEffect(() => {
    //     if (!!localStorage.movies) {
    //         setMoviesArray(JSON.parse(localStorage.getItem('movies')))
    //     }
    // }, [])

    console.log(JSON.parse(localStorage.movies))

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

    console.log()


    return (
        <>
            <Header onOpen={props.onOpen} isLoggedIn={props.isLoggedIn} page={props.page}/>
            <main>
                <SearchForm onSubmit={props.submitSearch} onChange={handleInputChange} value={searchPhrase}/>
                <MoviesCardList page={'movies'} savedMovies={props.savedMovies} allMovies={props.allMovies} size={windowDimensions} page='movies'
                                schemeDevice={getCurrentDeviceScheme(windowDimensions.width)}/>
            </main>
            <Footer/>
        </>
    )
}

export default Movies;
